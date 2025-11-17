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
        this.MAX_PERIODS_PER_DAY = 30;
        this.MAX_SAME_SUBJECT_PER_DAY = 2;
        this.MAX_CONSECUTIVE_PERIODS = 6;
    }

    validate() {
        const errors = [];

        if (!this.classes || this.classes.length === 0) errors.push('No classes added');
        if (!this.staff || this.staff.filter(s => s.role === 'staff').length === 0) errors.push('No staff added');
        if (!this.subjects || this.subjects.length === 0) errors.push('No subjects added');

        if (errors.length > 0) return { valid: false, errors };

        const classHours = {};
        this.subjects.forEach(subject => {
            classHours[subject.className] = (classHours[subject.className] || 0) + subject.hoursPerWeek;
        });

        this.classes.forEach(cls => {
            const hours = classHours[cls.name] || 0;
            if (hours !== this.MAX_PERIODS_PER_DAY) {
                errors.push(`Class ${cls.name}: Has ${hours} hours, needs exactly ${this.MAX_PERIODS_PER_DAY}`);
            }
        });

        this.subjects.forEach(subject => {
            if (subject.isContinuous) {
                if (subject.hoursPerWeek % subject.blockSize !== 0) {
                    errors.push(`Subject ${subject.name}: ${subject.hoursPerWeek} hours cannot be evenly divided into ${subject.blockSize}-period blocks`);
                }
            }
        });

        return { valid: errors.length === 0, errors };
    }

    generate() {
        try {
            this._initialize();

            for (const cls of this.classes) {
                if (!this._generateClassTimetable(cls.name)) {
                    return { success: false, error: `Failed to generate timetable for ${cls.name}` };
                }
            }

            this._generateStaffTimetables();

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
            this.teacherConsecutiveCount[teacher.name] = {};
        });
    }

    _generateClassTimetable(className) {
        const classSubjects = this.subjects.filter(s => s.className === className);
        classSubjects.forEach(s => s.placedHours = 0);

        const labs = classSubjects.filter(s => s.isContinuous);
        labs.sort((a, b) => b.hoursPerWeek - a.hoursPerWeek);

        for (const lab of labs) {
            if (!this._placeLab(className, lab)) {
                console.error(`Cannot place lab ${lab.name}`);
                return false;
            }
        }

        const highHourSubjects = classSubjects.filter(s => !s.isContinuous && s.hoursPerWeek >= 5);
        highHourSubjects.sort((a, b) => b.hoursPerWeek - a.hoursPerWeek);

        for (const subject of highHourSubjects) {
            if (!this._placeHighHourSubject(className, subject)) {
                console.error(`Cannot place high-hour subject ${subject.name}`);
                return false;
            }
        }

        const lowHourSubjects = classSubjects.filter(s => !s.isContinuous && s.hoursPerWeek < 5);
        lowHourSubjects.sort((a, b) => b.hoursPerWeek - a.hoursPerWeek);

        for (const subject of lowHourSubjects) {
            if (!this._placeLowHourSubject(className, subject)) {
                console.error(`Cannot place low-hour subject ${subject.name}`);
                return false;
            }
        }

        return true;
    }

    _placeLab(className, subject) {
        const blocksNeeded = subject.hoursPerWeek / subject.blockSize;
        let blocksPlaced = 0;

        const possibleSlots = [];
        this.DAYS.forEach(day => {
            for (let start = 0; start <= this.PERIODS - subject.blockSize; start++) {
                if (start === 0 && Math.random() < 0.7) continue;
                possibleSlots.push({ day, start });
            }
        });

        this._shuffle(possibleSlots);

        for (const {day, start} of possibleSlots) {
            if (blocksPlaced >= blocksNeeded) break;

            let canPlace = true;
            for (let i = 0; i < subject.blockSize; i++) {
                const period = start + i;
                const dayIndex = this.DAYS.indexOf(day);

                if (this.classTimetables[className][dayIndex][period]) {
                    canPlace = false;
                    break;
                }

                const slotKey = `${day}-P${period + 1}`;
                if (this.teacherBusySlots[subject.teacher]?.[slotKey]) {
                    canPlace = false;
                    break;
                }

                if (!this._checkTeacherLimit(subject.teacher)) {
                    canPlace = false;
                    break;
                }

                if (this.teacherDailyCount[subject.teacher][day] >= this.MAX_CONSECUTIVE_PERIODS) {
                    canPlace = false;
                    break;
                }
            }

            if (canPlace) {
                for (let i = 0; i < subject.blockSize; i++) {
                    const period = start + i;
                    const dayIndex = this.DAYS.indexOf(day);
                    this._placeAt(className, dayIndex, period, subject);
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

        for (let dayIdx = 0; dayIdx < this.DAYS.length; dayIdx++) {
            if (placed >= hoursToPlace) break;

            const day = this.DAYS[dayIdx];
            const periods = this._getAvailablePeriods(className, dayIdx, subject);

            if (periods.length > 0) {
                const period = periods[Math.floor(Math.random() * periods.length)];
                this._placeAt(className, dayIdx, period, subject);
                dailyCount[day]++;
                subject.placedHours++;
                placed++;
            }
        }

        while (placed < hoursToPlace) {
            let availableSlots = [];

            for (let dayIdx = 0; dayIdx < this.DAYS.length; dayIdx++) {
                const day = this.DAYS[dayIdx];
                if (dailyCount[day] >= this.MAX_SAME_SUBJECT_PER_DAY) continue;

                const periods = this._getAvailablePeriods(className, dayIdx, subject);
                periods.forEach(period => {
                    availableSlots.push({ dayIdx, period, day });
                });
            }

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

            if (availableSlots.length === 0) {
                const emergencySlots = [];

                for (let dayIdx = 0; dayIdx < this.DAYS.length; dayIdx++) {
                    for (let period = 0; period < this.PERIODS; period++) {
                        if (this._canPlaceAt(className, dayIdx, period, subject)) {
                            emergencySlots.push({ dayIdx, period, day: this.DAYS[dayIdx] });
                        }
                    }
                }

                if (emergencySlots.length === 0) {
                    console.warn(`Cannot fully place ${subject.name}: ${placed}/${hoursToPlace} placed.`);
                    return true;
                }

                const slot = emergencySlots[Math.floor(Math.random() * emergencySlots.length)];
                this._placeAt(className, slot.dayIdx, slot.period, subject);
                dailyCount[slot.day]++;
                subject.placedHours++;
                placed++;
                continue;
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

        const allSlots = [];
        this.DAYS.forEach((day, dayIdx) => {
            for (let period = 0; period < this.PERIODS; period++) {
                allSlots.push({ day, dayIdx, period });
            }
        });

        this._shuffle(allSlots);

        for (const {day, dayIdx, period} of allSlots) {
            if (placed >= hoursToPlace) break;
            if (dailyCount[day] >= this.MAX_SAME_SUBJECT_PER_DAY) continue;
            if (!this._canPlaceAt(className, dayIdx, period, subject)) continue;

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
        const slotKey = `${day}-P${period + 1}`;

        if (!this.classTimetables[className] || !this.classTimetables[className][dayIdx]) {
            return false;
        }

        if (this.classTimetables[className][dayIdx][period]) return false;
        if (this.teacherBusySlots[subject.teacher]?.[slotKey]) return false;
        if (!this._checkTeacherLimit(subject.teacher)) return false;
        if (this.teacherDailyCount[subject.teacher][day] >= this.MAX_CONSECUTIVE_PERIODS) return false;

        return true;
    }

    _placeAt(className, dayIdx, period, subject) {
        const day = this.DAYS[dayIdx];
        const slotKey = `${day}-P${period + 1}`;

        if (!this.classTimetables[className] || !this.classTimetables[className][dayIdx]) {
            console.error(`Invalid timetable structure for ${className}`);
            return;
        }

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

    _checkTeacherLimit(teacherName) {
        const teacher = this.staff.find(s => s.name === teacherName);
        if (!teacher) return false;

        const maxHours = teacher.freePeriodMode === 'manual' 
            ? this.MAX_PERIODS_PER_DAY - teacher.manualFreePeriods 
            : this.MAX_PERIODS_PER_DAY;

        return this.teacherWeeklyCount[teacherName] < maxHours;
    }

    _generateStaffTimetables() {
        this.staff.filter(s => s.role === 'staff').forEach(teacher => {
            this.staffTimetables[teacher.name] = this.DAYS.map(() => 
                Array(this.PERIODS).fill({ subject: 'FREE', class: '-', type: 'free' })
            );
        });

        this.classes.forEach(cls => {
            if (!this.classTimetables[cls.name]) {
                console.warn(`No timetable found for class ${cls.name}`);
                return;
            }

            this.DAYS.forEach((day, dayIndex) => {
                if (!this.classTimetables[cls.name][dayIndex]) {
                    console.warn(`No timetable found for ${cls.name} on ${day}`);
                    return;
                }

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
                warnings.push(`Class ${cls.name}: No timetable generated`);
                return;
            }

            let totalSlots = 0;
            let emptySlots = 0;

            this.DAYS.forEach((day, dayIdx) => {
                if (this.classTimetables[cls.name][dayIdx]) {
                    this.classTimetables[cls.name][dayIdx].forEach(slot => {
                        totalSlots++;
                        if (!slot) emptySlots++;
                    });
                }
            });

            if (emptySlots > 0) {
                warnings.push(`Class ${cls.name}: Has ${emptySlots} empty slots`);
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