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
        this.DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
        this.PERIODS = 6;
        this.MAX_PERIODS_PER_WEEK = 30;
        this.MIN_PERIODS_PER_WEEK = 24; // More flexible
        this.MAX_SAME_SUBJECT_PER_DAY = 2;
        this.MAX_CONSECUTIVE_PERIODS = 3;
        this.MAX_TEACHER_HOURS_PER_DAY = 5;
        this.MAX_TEACHER_HOURS_PER_WEEK = 24;

        // College best practices: Day patterns
        this.MWF_DAYS = [0, 2, 4]; // Monday, Wednesday, Friday
        this.TR_DAYS = [1, 3]; // Tuesday, Thursday

        // Time slot preferences (period indices)
        this.MORNING_SLOTS = [0, 1]; // 8-10 AM
        this.PEAK_SLOTS = [2, 3]; // 10 AM-2 PM
        this.AFTERNOON_SLOTS = [4, 5]; // 2-5 PM
    }

    validate() {
        const errors = [];

        if (!this.classes || this.classes.length === 0) errors.push('No classes added');
        if (!this.staff || this.staff.filter(s => s.role === 'staff').length === 0) errors.push('No staff added');
        if (!this.subjects || this.subjects.length === 0) errors.push('No subjects added');

        if (errors.length > 0) return { valid: false, errors };

        // Flexible validation: Allow 24-30 hours per class
        const classHours = {};
        this.subjects.forEach(subject => {
            classHours[subject.className] = (classHours[subject.className] || 0) + subject.hoursPerWeek;
        });

        this.classes.forEach(cls => {
            const hours = classHours[cls.name] || 0;
            if (hours < this.MIN_PERIODS_PER_WEEK || hours > this.MAX_PERIODS_PER_WEEK) {
                errors.push(`Class \${cls.name}: Has \${hours} hours, needs between \${this.MIN_PERIODS_PER_WEEK}-\${this.MAX_PERIODS_PER_WEEK}`);
            }
        });

        // Validate teacher workload
        const teacherHours = {};
        this.subjects.forEach(subject => {
            teacherHours[subject.teacher] = (teacherHours[subject.teacher] || 0) + subject.hoursPerWeek;
        });

        Object.entries(teacherHours).forEach(([teacher, hours]) => {
            if (hours > this.MAX_TEACHER_HOURS_PER_WEEK) {
                errors.push(`Teacher \${teacher}: Assigned \${hours} hours, maximum is \${this.MAX_TEACHER_HOURS_PER_WEEK}`);
            }
        });

        return { valid: errors.length === 0, errors };
    }

    generate() {
        try {
            this._initialize();

            for (const cls of this.classes) {
                if (!this._generateClassTimetable(cls.name)) {
                    return { success: false, error: `Failed to generate timetable for \${cls.name}` };
                }
            }

            this._generateStaffTimetables();
            const validation = this._validateGenerated();

            return {
                success: true,
                classTimetables: this.classTimetables,
                staffTimetables: this.staffTimetables,
                warnings: validation.warnings || []
            };
        } catch (error) {
            console.error('Error generating timetable:', error);
            return {
                success: false,
                error: error.message || 'Unknown error occurred'
            };
        }
    }

    _initialize() {
        this.classes.forEach(cls => {
            this.classTimetables[cls.name] = this.DAYS.map(() => Array(this.PERIODS).fill(null));
        });

        this.staff.filter(s => s.role === 'staff').forEach(teacher => {
            this.teacherBusySlots[teacher.name] = {};
            this.teacherWeeklyCount[teacher.name] = 0;
            this.teacherDailyCount[teacher.name] = this.DAYS.reduce((acc, day) => {
                acc[day] = 0;
                return acc;
            }, {});
        });
    }

    _generateClassTimetable(className) {
        const classSubjects = this.subjects.filter(s => s.className === className);
        classSubjects.forEach(s => s.placedHours = 0);

        // PHASE 1: Place Labs (Priority 1)
        const labs = classSubjects.filter(s => s.isContinuous);
        labs.sort((a, b) => b.hoursPerWeek - a.hoursPerWeek);

        for (const lab of labs) {
            if (!this._placeLab(className, lab)) {
                console.error(`Cannot place lab \${lab.name}`);
                return false;
            }
        }

        // PHASE 2: Place High-Hour Core Subjects (Priority 2)
        const highHourSubjects = classSubjects.filter(s => !s.isContinuous && s.hoursPerWeek >= 5);
        highHourSubjects.sort((a, b) => b.hoursPerWeek - a.hoursPerWeek);

        for (const subject of highHourSubjects) {
            if (!this._placeHighHourSubject(className, subject)) {
                console.error(`Cannot place high-hour subject \${subject.name}`);
                return false;
            }
        }

        // PHASE 3: Place Low-Hour Subjects (Priority 3)
        const lowHourSubjects = classSubjects.filter(s => !s.isContinuous && s.hoursPerWeek < 5);
        lowHourSubjects.sort((a, b) => b.hoursPerWeek - a.hoursPerWeek);

        for (const subject of lowHourSubjects) {
            if (!this._placeLowHourSubject(className, subject)) {
                console.error(`Cannot place low-hour subject \${subject.name}`);
                return false;
            }
        }

        return true;
    }

    _placeLab(className, subject) {
        const blocksNeeded = subject.hoursPerWeek / subject.blockSize;
        let blocksPlaced = 0;

        // Prefer afternoon slots for labs
        const possibleSlots = [];
        this.DAYS.forEach((day, dayIdx) => {
            for (let start = 0; start <= this.PERIODS - subject.blockSize; start++) {
                // Avoid first period, prefer afternoon
                if (start === 0) continue;

                const isAfternoon = this.AFTERNOON_SLOTS.includes(start);
                const priority = isAfternoon ? 1 : 2;

                possibleSlots.push({ day, dayIdx, start, priority });
            }
        });

        // Sort by priority
        possibleSlots.sort((a, b) => a.priority - b.priority);

        for (const {day, dayIdx, start} of possibleSlots) {
            if (blocksPlaced >= blocksNeeded) break;

            let canPlace = true;
            for (let i = 0; i < subject.blockSize; i++) {
                const period = start + i;
                if (!this._canPlaceAt(className, dayIdx, period, subject)) {
                    canPlace = false;
                    break;
                }
            }

            if (canPlace) {
                for (let i = 0; i < subject.blockSize; i++) {
                    const period = start + i;
                    this._placeAt(className, dayIdx, period, subject);
                }
                subject.placedHours += subject.blockSize;
                blocksPlaced++;
            }
        }

        return blocksPlaced === blocksNeeded;
    }

    _placeHighHourSubject(className, subject) {
        const hoursToPlace = subject.hoursPerWeek;
        let placed = 0;
        const dailyCount = {};
        this.DAYS.forEach(day => dailyCount[day] = 0);

        // Strategy: Use MWF or TR pattern for distribution
        const useMWF = hoursToPlace >= 5;
        const preferredDays = useMWF ? this.MWF_DAYS : [...this.MWF_DAYS, ...this.TR_DAYS];

        // First pass: One per preferred day, in peak/morning slots
        for (const dayIdx of preferredDays) {
            if (placed >= hoursToPlace) break;

            const day = this.DAYS[dayIdx];
            if (dailyCount[day] >= this.MAX_SAME_SUBJECT_PER_DAY) continue;

            const periods = this._getPreferredPeriods(className, dayIdx, subject, [...this.PEAK_SLOTS, ...this.MORNING_SLOTS]);

            if (periods.length > 0) {
                const period = periods[Math.floor(Math.random() * periods.length)];
                this._placeAt(className, dayIdx, period, subject);
                dailyCount[day]++;
                subject.placedHours++;
                placed++;
            }
        }

        // Second pass: Fill remaining hours
        while (placed < hoursToPlace) {
            const availableSlots = [];

            for (let dayIdx = 0; dayIdx < this.DAYS.length; dayIdx++) {
                const day = this.DAYS[dayIdx];
                if (dailyCount[day] >= this.MAX_SAME_SUBJECT_PER_DAY) continue;

                const periods = this._getAvailablePeriods(className, dayIdx, subject);
                periods.forEach(period => {
                    availableSlots.push({ dayIdx, period, day });
                });
            }

            if (availableSlots.length === 0) {
                console.warn(`Cannot fully place \${subject.name}: \${placed}/\${hoursToPlace} placed`);
                return placed > 0; // Partial success
            }

            const slot = availableSlots[Math.floor(Math.random() * availableSlots.length)];
            this._placeAt(className, slot.dayIdx, slot.period, subject);
            dailyCount[slot.day]++;
            subject.placedHours++;
            placed++;
        }

        return true;
    }

    _placeLowHourSubject(className, subject) {
        const hoursToPlace = subject.hoursPerWeek;
        let placed = 0;
        const dailyCount = {};
        this.DAYS.forEach(day => dailyCount[day] = 0);

        // Use TR pattern for 2-hour subjects, spread for 3-4 hours
        const preferredDays = hoursToPlace === 2 ? this.TR_DAYS : 
                            hoursToPlace === 3 ? this.MWF_DAYS.slice(0, 3) :
                            [...this.DAYS.keys()];

        const allSlots = [];
        preferredDays.forEach(dayIdx => {
            const day = this.DAYS[dayIdx];
            for (let period = 0; period < this.PERIODS; period++) {
                allSlots.push({ day, dayIdx, period });
            }
        });

        this._shuffle(allSlots);

        for (const {day, dayIdx, period} of allSlots) {
            if (placed >= hoursToPlace) break;
            if (dailyCount[day] >= this.MAX_SAME_SUBJECT_PER_DAY) continue;
            if (!this._canPlaceAt(className, dayIdx, period, subject)) continue;

            // Avoid consecutive same subjects
            if (period > 0) {
                const prev = this.classTimetables[className][dayIdx][period - 1];
                if (prev?.subject === subject.name) continue;
            }

            this._placeAt(className, dayIdx, period, subject);
            dailyCount[day]++;
            subject.placedHours++;
            placed++;
        }

        return placed === hoursToPlace;
    }

    _getPreferredPeriods(className, dayIdx, subject, preferredSlots) {
        const available = [];

        for (const period of preferredSlots) {
            if (this._canPlaceAt(className, dayIdx, period, subject)) {
                if (period > 0) {
                    const prev = this.classTimetables[className][dayIdx][period - 1];
                    if (prev?.subject === subject.name) continue;
                }
                available.push(period);
            }
        }

        return available;
    }

    _getAvailablePeriods(className, dayIdx, subject) {
        const available = [];

        for (let period = 0; period < this.PERIODS; period++) {
            if (this._canPlaceAt(className, dayIdx, period, subject)) {
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
        const slotKey = `\${day}-P\${period + 1}`;

        if (!this.classTimetables[className] || !this.classTimetables[className][dayIdx]) {
            return false;
        }

        // Check class slot
        if (this.classTimetables[className][dayIdx][period]) return false;

        // Check teacher availability
        if (this.teacherBusySlots[subject.teacher]?.[slotKey]) return false;

        // Check teacher daily limit
        if (this.teacherDailyCount[subject.teacher][day] >= this.MAX_TEACHER_HOURS_PER_DAY) return false;

        // Check teacher weekly limit
        if (this.teacherWeeklyCount[subject.teacher] >= this.MAX_TEACHER_HOURS_PER_WEEK) return false;

        // Check for too many consecutive periods
        if (period >= this.MAX_CONSECUTIVE_PERIODS) {
            let consecutive = 0;
            for (let p = period - 1; p >= 0; p--) {
                const slot = this.classTimetables[className][dayIdx][p];
                if (slot?.teacher === subject.teacher) {
                    consecutive++;
                } else {
                    break;
                }
            }
            if (consecutive >= this.MAX_CONSECUTIVE_PERIODS - 1) return false;
        }

        return true;
    }

    _placeAt(className, dayIdx, period, subject) {
        const day = this.DAYS[dayIdx];
        const slotKey = `\${day}-P\${period + 1}`;

        this.classTimetables[className][dayIdx][period] = {
            subject: subject.name,
            teacher: subject.teacher,
            type: subject.subjectType
        };

        if (!this.teacherBusySlots[subject.teacher]) {
            this.teacherBusySlots[subject.teacher] = {};
        }
        this.teacherBusySlots[subject.teacher][slotKey] = true;
        this.teacherWeeklyCount[subject.teacher]++;
        this.teacherDailyCount[subject.teacher][day]++;
    }

    _generateStaffTimetables() {
        this.staff.filter(s => s.role === 'staff').forEach(teacher => {
            this.staffTimetables[teacher.name] = this.DAYS.map(() => 
                Array(this.PERIODS).fill(null).map(() => ({ 
                    subject: 'FREE', 
                    class: '-', 
                    type: 'free' 
                }))
            );
        });

        this.classes.forEach(cls => {
            if (!this.classTimetables[cls.name]) return;

            this.DAYS.forEach((day, dayIndex) => {
                if (!this.classTimetables[cls.name][dayIndex]) return;

                this.classTimetables[cls.name][dayIndex].forEach((slot, period) => {
                    if (slot && slot.teacher && this.staffTimetables[slot.teacher]) {
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

    _validateGenerated() {
        const warnings = [];

        this.classes.forEach(cls => {
            if (!this.classTimetables[cls.name]) {
                warnings.push(`Class \${cls.name}: No timetable generated`);
                return;
            }

            let totalSlots = 0;
            let emptySlots = 0;

            this.DAYS.forEach((day, dayIdx) => {
                if (this.classTimetables[cls.name][dayIdx]) {
                    this.classTimetables[cls.name][dayIdx].forEach((slot, period) => {
                        totalSlots++;
                        if (!slot) {
                            // Fill empty slots with FREE period
                            this.classTimetables[cls.name][dayIdx][period] = {
                                subject: 'FREE',
                                teacher: '-',
                                type: 'free'
                            };
                            emptySlots++;
                        }
                    });
                }
            });

            if (emptySlots > 0) {
                warnings.push(`Class \${cls.name}: Had \${emptySlots} empty slots, filled with FREE periods`);
            }
        });

        return { valid: warnings.length === 0, warnings };
    }

    _shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
}