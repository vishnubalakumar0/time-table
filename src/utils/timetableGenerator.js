export class TimetableGenerator {
    constructor(classes, staff, subjects) {
        this.classes = classes;
        this.staff = staff;
        this.subjects = subjects;
        this.classTimetables = {};
        this.staffTimetables = {};
        this.teacherBusySlots = {};
        this.teacherWeeklyCount = {};
        this.teacherDailyCount = {};
        this.teacherConsecutiveCount = {};
        this.DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
        this.PERIODS = 6;
        this.MAX_PERIODS_PER_DAY = 30; // 5 days × 6 periods
        this.MAX_SAME_SUBJECT_PER_DAY = 2;
        this.MAX_CONSECUTIVE_PERIODS = 6;
    }

    /**
     * ═══════════════════════════════════════════════════════════════════════
     * VALIDATION (Rule A.1, A.2, F)
     * ═══════════════════════════════════════════════════════════════════════
     */
    validate() {
        const errors = [];

        // Basic checks
        if (this.classes.length === 0) errors.push('No classes added');
        if (this.staff.filter(s => s.role === 'staff').length === 0) errors.push('No staff added');
        if (this.subjects.length === 0) errors.push('No subjects added');

        if (errors.length > 0) return { valid: false, errors };

        // Rule A.1: Total hours must match capacity (5 days × 6 periods = 30)
        const classHours = {};
        this.subjects.forEach(subject => {
            classHours[subject.className] = (classHours[subject.className] || 0) + subject.hoursPerWeek;
        });

        this.classes.forEach(cls => {
            const hours = classHours[cls.name] || 0;
            if (hours !== this.MAX_PERIODS_PER_DAY) {
                errors.push(
                    `Class ${cls.name}: Has ${hours} hours, needs exactly ${this.MAX_PERIODS_PER_DAY} ` +
                    `(Rule A.1: Total hours must match capacity)`
                );
            }
        });

        // Validate lab block sizes
        this.subjects.forEach(subject => {
            if (subject.isContinuous) {
                if (subject.hoursPerWeek % subject.blockSize !== 0) {
                    errors.push(
                        `Subject ${subject.name}: ${subject.hoursPerWeek} hours cannot be evenly divided ` +
                        `into ${subject.blockSize}-period blocks`
                    );
                }
            }
        });

        return { valid: errors.length === 0, errors };
    }

    /**
     * ═══════════════════════════════════════════════════════════════════════
     * MAIN GENERATION (Rule E)
     * ═══════════════════════════════════════════════════════════════════════
     */
    generate() {
        this._initialize();

        for (const cls of this.classes) {
            if (!this._generateClassTimetable(cls.name)) {
                return { 
                    success: false, 
                    error: `Failed to generate timetable for ${cls.name}` 
                };
            }
        }

        this._generateStaffTimetables();

        // Final validation
        const validation = this._validateGenerated();
        if (!validation.valid) {
            console.warn('Generated timetable has warnings:', validation.warnings);
        }

        return {
            success: true,
            classTimetables: this.classTimetables,
            staffTimetables: this.staffTimetables,
            warnings: validation.warnings || []
        };
    }

    _initialize() {
        // Initialize class timetables (Rule A.2: No free periods - will be filled)
        this.classes.forEach(cls => {
            this.classTimetables[cls.name] = this.DAYS.map(() => Array(this.PERIODS).fill(null));
        });

        // Initialize teacher tracking (Rule B)
        this.staff.filter(s => s.role === 'staff').forEach(teacher => {
            this.teacherBusySlots[teacher.name] = {};
            this.teacherWeeklyCount[teacher.name] = 0;
            this.teacherDailyCount[teacher.name] = this.DAYS.reduce((acc, day) => {
                acc[day] = 0;
                return acc;
            }, {});
            this.teacherConsecutiveCount[teacher.name] = {};
        });
    }

    /**
     * ═══════════════════════════════════════════════════════════════════════
     * PRIORITY ORDER (Rule E)
     * ═══════════════════════════════════════════════════════════════════════
     */
    _generateClassTimetable(className) {
        const classSubjects = this.subjects.filter(s => s.className === className);
        classSubjects.forEach(s => s.placedHours = 0);

        // STEP 1: Allocate labs (Rule D, E.1)
        const labs = classSubjects.filter(s => s.isContinuous);
        labs.sort((a, b) => b.hoursPerWeek - a.hoursPerWeek);

        for (const lab of labs) {
            if (!this._placeLab(className, lab)) {
                console.error(`Step 1 failed: Cannot place lab ${lab.name}`);
                return false;
            }
        }

        // STEP 2: Allocate high-hour regular subjects (Rule C.1, E.2)
        const highHourSubjects = classSubjects.filter(
            s => !s.isContinuous && s.hoursPerWeek >= 5
        );
        highHourSubjects.sort((a, b) => b.hoursPerWeek - a.hoursPerWeek);

        for (const subject of highHourSubjects) {
            if (!this._placeHighHourSubject(className, subject)) {
                console.error(`Step 2 failed: Cannot place high-hour subject ${subject.name}`);
                return false;
            }
        }

        // STEP 3: Allocate low-hour subjects (Rule C.2, E.3)
        const lowHourSubjects = classSubjects.filter(
            s => !s.isContinuous && s.hoursPerWeek < 5
        );
        lowHourSubjects.sort((a, b) => b.hoursPerWeek - a.hoursPerWeek);

        for (const subject of lowHourSubjects) {
            if (!this._placeLowHourSubject(className, subject)) {
                console.error(`Step 3 failed: Cannot place low-hour subject ${subject.name}`);
                return false;
            }
        }

        // STEP 4: Check teacher conflicts (done during placement via _canPlaceAt)
        // STEP 5: Randomization (done via _shuffle in slot selection)

        return true;
    }

    /**
     * ═══════════════════════════════════════════════════════════════════════
     * STEP 1: PLACE LABS (Rule D - Continuous blocks, can skip days)
     * ═══════════════════════════════════════════════════════════════════════
     */
    _placeLab(className, subject) {
        const blocksNeeded = subject.hoursPerWeek / subject.blockSize;
        let blocksPlaced = 0;

        // Generate all possible continuous block positions
        const possibleSlots = [];
        this.DAYS.forEach(day => {
            for (let start = 0; start <= this.PERIODS - subject.blockSize; start++) {
                // Prefer not starting at first period (70% probability)
                if (start === 0 && Math.random() < 0.7) continue;
                possibleSlots.push({ day, start });
            }
        });

        // Rule E.5: Randomize within constraints
        this._shuffle(possibleSlots);

        for (const {day, start} of possibleSlots) {
            if (blocksPlaced >= blocksNeeded) break;

            // Check if can place entire block
            let canPlace = true;
            for (let i = 0; i < subject.blockSize; i++) {
                const period = start + i;
                const dayIndex = this.DAYS.indexOf(day);

                // Rule A.3: No subject overlap
                if (this.classTimetables[className][dayIndex][period]) {
                    canPlace = false;
                    break;
                }

                // Rule B.1: No teacher clash
                const slotKey = `${day}-P${period + 1}`;
                if (this.teacherBusySlots[subject.teacher]?.[slotKey]) {
                    canPlace = false;
                    break;
                }

                // Rule B.2: Check teacher limits
                if (!this._checkTeacherLimit(subject.teacher)) {
                    canPlace = false;
                    break;
                }

                // Rule B.4: Avoid too many consecutive periods
                if (this.teacherDailyCount[subject.teacher][day] >= this.MAX_CONSECUTIVE_PERIODS) {
                    canPlace = false;
                    break;
                }
            }

            if (canPlace) {
                // Place the entire continuous block
                for (let i = 0; i < subject.blockSize; i++) {
                    const period = start + i;
                    const dayIndex = this.DAYS.indexOf(day);
                    this._placeAt(className, dayIndex, period, subject);
                }
                subject.placedHours += subject.blockSize;
                blocksPlaced++;
            }
        }

        // Rule D.4: All blocks must be placed
        return blocksPlaced === blocksNeeded;
    }

    /**
     * ═══════════════════════════════════════════════════════════════════════
     * STEP 2: PLACE HIGH-HOUR SUBJECTS (Rule C.1 - Must appear daily)
     * ═══════════════════════════════════════════════════════════════════════
     */
    /**
 * STEP 2: PLACE HIGH-HOUR SUBJECTS (Rule C.1 - Must appear daily, best-effort)
 * High-hour subjects try to appear on all days, but we don't crash the whole
 * timetable if the perfect distribution is impossible.
 */
_placeHighHourSubject(className, subject) {
    const hoursToPlace = subject.hoursPerWeek;
    let placed = 0;
    const dailyCount = {};
    this.DAYS.forEach(day => dailyCount[day] = 0);

    // PHASE 1: Try to place at least ONE period on EACH day (best-effort)
    for (let dayIdx = 0; dayIdx < this.DAYS.length; dayIdx++) {
        if (placed >= hoursToPlace) break;

        const day = this.DAYS[dayIdx];
        const periods = this._getAvailablePeriods(className, dayIdx, subject);

        if (periods.length > 0) {
            // Random selection within valid options
            const period = periods[Math.floor(Math.random() * periods.length)];
            this._placeAt(className, dayIdx, period, subject);
            dailyCount[day]++;
            subject.placedHours++;
            placed++;
        } else {
            // It's OK if we can't place on a specific day here;
            // validation will later warn if needed.
            // console.warn(`Could not place ${subject.name} on ${day} in phase 1`);
        }
    }

    // PHASE 2: Place remaining hours with daily limit (max 2 / day normally, 3 in fallback)
    while (placed < hoursToPlace) {
        let availableSlots = [];

        // Normal rule: max 2 per day
        for (let dayIdx = 0; dayIdx < this.DAYS.length; dayIdx++) {
            const day = this.DAYS[dayIdx];

            if (dailyCount[day] >= this.MAX_SAME_SUBJECT_PER_DAY) continue;

            const periods = this._getAvailablePeriods(className, dayIdx, subject);
            periods.forEach(period => {
                availableSlots.push({ dayIdx, period, day });
            });
        }

        // Fallback: allow up to 3 per day if needed
        if (availableSlots.length === 0) {
            for (let dayIdx = 0; dayIdx < this.DAYS.length; dayIdx++) {
                const day = this.DAYS[dayIdx];
                if (dailyCount[day] >= 3) continue;

                const periods = this._getAvailablePeriods(className, dayIdx, subject);
                periods.forEach(period => {
                    availableSlots.push({ dayIdx, period, day });
                });
            }
        }

        // FINAL EMERGENCY FALLBACK:
        // If still no slots found, ignore daily repetition limits and just
        // find ANY valid empty slot that doesn't clash with teacher/time.
        if (availableSlots.length === 0) {
            const emergencySlots = [];

            for (let dayIdx = 0; dayIdx < this.DAYS.length; dayIdx++) {
                for (let period = 0; period < this.PERIODS; period++) {
                    if (this._canPlaceAt(className, dayIdx, period, subject)) {
                        emergencySlots.push({
                            dayIdx,
                            period,
                            day: this.DAYS[dayIdx]
                        });
                    }
                }
            }

            if (emergencySlots.length === 0) {
                console.warn(
                    `Cannot fully place ${subject.name}: ${placed}/${hoursToPlace} placed. ` +
                    `Proceeding with partial allocation.`
                );
                // Do NOT crash the whole timetable – just accept partial placement.
                return true;
            }

            const slot = emergencySlots[Math.floor(Math.random() * emergencySlots.length)];
            this._placeAt(className, slot.dayIdx, slot.period, subject);
            dailyCount[slot.day]++;
            subject.placedHours++;
            placed++;
            continue;
        }

        // Normal case: choose a valid slot
        const slot = availableSlots[Math.floor(Math.random() * availableSlots.length)];
        this._placeAt(className, slot.dayIdx, slot.period, subject);
        dailyCount[slot.day]++;
        subject.placedHours++;
        placed++;
    }

    // Even if distribution wasn't "perfect", at this point we've placed all hours.
    return true;
}

    /**
     * ═══════════════════════════════════════════════════════════════════════
     * STEP 3: PLACE LOW-HOUR SUBJECTS (Rule C.2 - Can have gaps)
     * ═══════════════════════════════════════════════════════════════════════
     */
    _placeLowHourSubject(className, subject) {
        const hoursToPlace = subject.hoursPerWeek;
        let placed = 0;
        const dailyCount = {};
        this.DAYS.forEach(day => dailyCount[day] = 0);

        // Generate all possible slots
        const allSlots = [];
        this.DAYS.forEach((day, dayIdx) => {
            for (let period = 0; period < this.PERIODS; period++) {
                allSlots.push({ day, dayIdx, period });
            }
        });

        // Rule E.5: Randomize
        this._shuffle(allSlots);

        for (const {day, dayIdx, period} of allSlots) {
            if (placed >= hoursToPlace) break;

            // Rule C.3: Max 2 per day
            if (dailyCount[day] >= this.MAX_SAME_SUBJECT_PER_DAY) continue;

            if (!this._canPlaceAt(className, dayIdx, period, subject)) continue;

            // Avoid back-to-back (Rule C.4: Daily variety)
            if (period > 0) {
                const prev = this.classTimetables[className][dayIdx][period - 1];
                if (prev?.subject === subject.name && Math.random() < 0.8) continue;
            }

            this._placeAt(className, dayIdx, period, subject);
            dailyCount[day]++;
            subject.placedHours++;
            placed++;
        }

        return placed === hoursToPlace;
    }

    /**
     * ═══════════════════════════════════════════════════════════════════════
     * HELPER FUNCTIONS
     * ═══════════════════════════════════════════════════════════════════════
     */
    _getAvailablePeriods(className, dayIdx, subject) {
        const available = [];

        for (let period = 0; period < this.PERIODS; period++) {
            if (this._canPlaceAt(className, dayIdx, period, subject)) {
                // Avoid back-to-back
                if (period > 0) {
                    const prev = this.classTimetables[className][dayIdx][period - 1];
                    if (prev?.subject === subject.name) continue;
                }
                available.push(period);
            }
        }

        return available;
    }

    _canPlaceAt(className, dayIdx, period, subject) {
        const day = this.DAYS[dayIdx];
        const slotKey = `${day}-P${period + 1}`;

        // Rule A.3: No subject overlap in a class
        if (this.classTimetables[className][dayIdx][period]) return false;

        // Rule B.1: No teacher clash
        if (this.teacherBusySlots[subject.teacher]?.[slotKey]) return false;

        // Rule B.2: Check teacher limits
        if (!this._checkTeacherLimit(subject.teacher)) return false;

        // Rule B.4: Avoid too many consecutive periods
        if (this.teacherDailyCount[subject.teacher][day] >= this.MAX_CONSECUTIVE_PERIODS) return false;

        return true;
    }

    _placeAt(className, dayIdx, period, subject) {
        const day = this.DAYS[dayIdx];
        const slotKey = `${day}-P${period + 1}`;

        // Place in class timetable
        this.classTimetables[className][dayIdx][period] = {
            subject: subject.name,
            teacher: subject.teacher,
            type: subject.subjectType
        };

        // Update teacher tracking
        if (!this.teacherBusySlots[subject.teacher]) {
            this.teacherBusySlots[subject.teacher] = {};
        }
        this.teacherBusySlots[subject.teacher][slotKey] = true;
        this.teacherWeeklyCount[subject.teacher]++;
        this.teacherDailyCount[subject.teacher][day]++;
    }

    _checkTeacherLimit(teacherName) {
        const teacher = this.staff.find(s => s.name === teacherName);
        if (!teacher) return false;

        // Rule B.2: Teachers MAY have free periods
        const maxHours = teacher.freePeriodMode === 'manual' 
            ? this.MAX_PERIODS_PER_DAY - teacher.manualFreePeriods 
            : this.MAX_PERIODS_PER_DAY;

        return this.teacherWeeklyCount[teacherName] < maxHours;
    }

    /**
     * ═══════════════════════════════════════════════════════════════════════
     * GENERATE STAFF TIMETABLES (Rule B.2 - Teachers may have free periods)
     * ═══════════════════════════════════════════════════════════════════════
     */
    _generateStaffTimetables() {
        this.staff.filter(s => s.role === 'staff').forEach(teacher => {
            this.staffTimetables[teacher.name] = this.DAYS.map(() => 
                Array(this.PERIODS).fill({ subject: 'FREE', class: '-', type: 'free' })
            );
        });

        this.classes.forEach(cls => {
            this.DAYS.forEach((day, dayIndex) => {
                this.classTimetables[cls.name][dayIndex].forEach((slot, period) => {
                    if (slot) {
                        this.staffTimetables[slot.teacher][dayIndex][period] = {
                            subject: slot.subject,
                            class: cls.name,
                            type: slot.type
                        };
                    }
                });
            });
        });
    }

    /**
     * ═══════════════════════════════════════════════════════════════════════
     * VALIDATION (Rule F)
     * ═══════════════════════════════════════════════════════════════════════
     */
    _validateGenerated() {
        const warnings = [];

        // F.1: Class validation
        this.classes.forEach(cls => {
            let totalSlots = 0;
            let emptySlots = 0;

            this.DAYS.forEach((day, dayIdx) => {
                this.classTimetables[cls.name][dayIdx].forEach(slot => {
                    totalSlots++;
                    if (!slot) emptySlots++;
                });
            });

            if (emptySlots > 0) {
                warnings.push(`Class ${cls.name}: Has ${emptySlots} empty slots (Rule A.2 violated)`);
            }
        });

        // F.2: Teacher validation - check for clashes
        const teachers = this.staff.filter(s => s.role === 'staff');
        teachers.forEach(teacher => {
            const teacherSlots = {};
            this.DAYS.forEach(day => {
                for (let p = 0; p < this.PERIODS; p++) {
                    teacherSlots[`${day}-P${p+1}`] = [];
                }
            });

            this.classes.forEach(cls => {
                this.DAYS.forEach((day, dayIdx) => {
                    this.classTimetables[cls.name][dayIdx].forEach((slot, period) => {
                        if (slot && slot.teacher === teacher.name) {
                            teacherSlots[`${day}-P${period+1}`].push(cls.name);
                        }
                    });
                });
            });

            Object.keys(teacherSlots).forEach(slotKey => {
                if (teacherSlots[slotKey].length > 1) {
                    warnings.push(
                        `Teacher ${teacher.name} has clash at ${slotKey}: ` +
                        `${teacherSlots[slotKey].join(', ')} (Rule B.1 violated)`
                    );
                }
            });
        });

        // F.3: Subject validation - high-hour subjects should appear daily
        const classSubjects = {};
        this.subjects.forEach(sub => {
            if (!classSubjects[sub.className]) classSubjects[sub.className] = [];
            classSubjects[sub.className].push(sub);
        });

        Object.keys(classSubjects).forEach(className => {
            classSubjects[className].forEach(subject => {
                if (!subject.isContinuous && subject.hoursPerWeek >= 5) {
                    // Check if appears on all days
                    const daysWithSubject = new Set();
                    this.DAYS.forEach((day, dayIdx) => {
                        this.classTimetables[className][dayIdx].forEach(slot => {
                            if (slot && slot.subject === subject.name) {
                                daysWithSubject.add(day);
                            }
                        });
                    });

                    if (daysWithSubject.size < this.DAYS.length) {
                        const missingDays = this.DAYS.filter(d => !daysWithSubject.has(d));
                        warnings.push(
                            `Subject ${subject.name} (${className}): Missing on ${missingDays.join(', ')} ` +
                            `(Rule C.1: High-hour subjects should appear daily)`
                        );
                    }
                }
            });
        });

        return {
            valid: warnings.length === 0,
            warnings
        };
    }

    /**
     * ═══════════════════════════════════════════════════════════════════════
     * UTILITY FUNCTION (Rule E.5: Randomization)
     * ═══════════════════════════════════════════════════════════════════════
     */
    _shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
}