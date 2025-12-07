/**
 * ══════════════════════════════════════════════════════════════
 * TIMETABLE GENERATOR - FINAL VERSION
 * All rules + Random lab positions + Aggressive placement
 * ══════════════════════════════════════════════════════════════
 */

export class TimetableGenerator {
    constructor(classes, staff, subjects) {
        this.classes = classes || [];
        this.staff = staff || [];
        this.subjects = subjects || [];

        this.classTimetables = {};
        this.staffTimetables = {};
        this.teacherSlots = {};

        this.DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
        this.PERIODS = 6;
        this.TOTAL_HOURS = 30;

        this.labPositionsUsed = {};
        this._seed = Date.now();
    }

    _random() {
        this._seed = (this._seed * 1664525 + 1013904223) % 4294967296;
        return this._seed / 4294967296;
    }

    _shuffle(array) {
        const arr = [...array];
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(this._random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    validate() {
        const errors = [];

        if (!this.classes?.length) errors.push('No classes defined');
        if (!this.staff?.filter(s => s?.role === 'staff').length) errors.push('No staff defined');
        if (!this.subjects?.length) errors.push('No subjects defined');

        this.classes.forEach(cls => {
            const classSubjects = this.subjects.filter(s => s?.className === cls.name);
            const totalHours = classSubjects.reduce((sum, s) => sum + (s.hoursPerWeek || 0), 0);

            if (totalHours !== this.TOTAL_HOURS) {
                errors.push(`Class "${cls.name}": Total hours = ${totalHours}, MUST be ${this.TOTAL_HOURS}!`);
            }
        });

        return errors.length ? { valid: false, errors } : { valid: true };
    }

    generate() {
        console.log('🚀 TIMETABLE GENERATOR - FINAL VERSION');
        console.log('='.repeat(60));

        const validation = this.validate();
        if (!validation.valid) {
            console.error('❌ VALIDATION FAILED:');
            validation.errors.forEach(e => console.error(`  • ${e}`));
            return {
                success: false,
                error: validation.errors.join('; '),
                classTimetables: {},
                staffTimetables: {}
            };
        }

        this._initialize();

        let allSuccess = true;
        for (const cls of this.classes) {
            if (!cls?.name) continue;
            console.log(`\n📚 Generating: ${cls.name}`);
            this.labPositionsUsed[cls.name] = [];
            const success = this._generateForClass(cls.name);
            if (!success) allSuccess = false;
        }

        this._buildStaffTimetables();

        return {
            success: allSuccess,
            classTimetables: this.classTimetables,
            staffTimetables: this.staffTimetables
        };
    }

    _initialize() {
        this.classes.forEach(cls => {
            if (cls?.name) {
                this.classTimetables[cls.name] = this.DAYS.map(() => Array(this.PERIODS).fill(null));
            }
        });

        this.staff.forEach(s => {
            if (s?.name) this.teacherSlots[s.name] = {};
        });
    }

    _generateForClass(className) {
        const subjects = this.subjects.filter(s => s?.className === className);
        if (!subjects.length) return true;

        const labs = subjects.filter(s => s.isContinuous);
        const theory = subjects.filter(s => !s.isContinuous);

        const tracking = {
            daysUsed: {},
            dayPeriodMap: {},
            periodWeeklyCount: {},
            periodGlobalUsage: Array(6).fill(0),
            hoursPlaced: {},
        };

        theory.forEach(s => {
            tracking.daysUsed[s.name] = new Set();
            tracking.dayPeriodMap[s.name] = {};
            tracking.periodWeeklyCount[s.name] = Array(6).fill(0);
            tracking.hoursPlaced[s.name] = 0;
        });

        const labTracking = {
            lastDay: {},
            dayLabCount: {},
            hoursPlaced: {}
        };
        this.DAYS.forEach(d => labTracking.dayLabCount[d] = 0);
        labs.forEach(lab => labTracking.hoursPlaced[lab.name] = 0);

        const daySubjectCount = {};
        this.DAYS.forEach(d => daySubjectCount[d] = new Set());

        // PHASE 1: LABS
        console.log('\n  🔬 Phase 1: Labs (random positions)...');
        for (const lab of labs) {
            const hoursNeeded = lab.hoursPerWeek || 0;
            const blocksNeeded = Math.floor(hoursNeeded / 2);

            for (let i = 0; i < blocksNeeded; i++) {
                const success = this._placeLabBlock(className, lab, labTracking, daySubjectCount);
                if (!success) {
                    console.error(`  ❌ Failed to place lab: ${lab.name}`);
                    return false;
                }
                labTracking.hoursPlaced[lab.name] += 2;
            }
        }

        // PHASE 2: THEORY FIRST-PASS
        console.log('\n  📖 Phase 2: Theory spread (one per day)...');
        const sortedTheory = [...theory].sort((a, b) => (b.hoursPerWeek || 0) - (a.hoursPerWeek || 0));

        for (const subj of sortedTheory) {
            const hours = subj.hoursPerWeek || 0;
            const targetDays = Math.min(hours, 5);

            for (let dayIdx = 0; dayIdx < 5 && tracking.hoursPlaced[subj.name] < targetDays; dayIdx++) {
                if (tracking.daysUsed[subj.name].has(dayIdx)) continue;

                const success = this._placeTheory(className, subj, tracking, dayIdx, daySubjectCount, 'strict');
                if (success) {
                    tracking.hoursPlaced[subj.name]++;
                }
            }
        }

        this._logProgress('After Phase 2', sortedTheory, tracking);

        // PHASE 3: REMAINING (strict frequency)
        console.log('\n  📝 Phase 3: Remaining (with frequency limits)...');
        for (const subj of sortedTheory) {
            const target = subj.hoursPerWeek || 0;
            let attempts = 0;
            const maxAttempts = 50;

            while (tracking.hoursPlaced[subj.name] < target && attempts < maxAttempts) {
                const success = this._placeTheory(className, subj, tracking, null, daySubjectCount, 'strict');
                if (success) {
                    tracking.hoursPlaced[subj.name]++;
                } else {
                    attempts++;
                }
            }
        }

        this._logProgress('After Phase 3', sortedTheory, tracking);

        // PHASE 4: RELAXED (remove frequency limits)
        console.log('\n  ⚡ Phase 4: Relaxed (no frequency limits)...');
        for (const subj of sortedTheory) {
            const target = subj.hoursPerWeek || 0;
            let attempts = 0;
            const maxAttempts = 50;

            while (tracking.hoursPlaced[subj.name] < target && attempts < maxAttempts) {
                const success = this._placeTheory(className, subj, tracking, null, daySubjectCount, 'relaxed');
                if (success) {
                    tracking.hoursPlaced[subj.name]++;
                    console.log(`    ⚡ ${subj.name}: ${tracking.hoursPlaced[subj.name]}/${target}`);
                } else {
                    attempts++;
                }
            }
        }

        this._logProgress('After Phase 4', sortedTheory, tracking);

        // PHASE 5: FORCE (only hard constraints)
        console.log('\n  🔥 Phase 5: Force placement...');
        for (const subj of sortedTheory) {
            const target = subj.hoursPerWeek || 0;
            let attempts = 0;
            const maxAttempts = 100;

            while (tracking.hoursPlaced[subj.name] < target && attempts < maxAttempts) {
                const success = this._forcePlaceTheory(className, subj, tracking, daySubjectCount);
                if (success) {
                    tracking.hoursPlaced[subj.name]++;
                    console.log(`    🔥 ${subj.name}: FORCED ${tracking.hoursPlaced[subj.name]}/${target}`);
                } else {
                    attempts++;
                }
            }

            // Final check
            if (tracking.hoursPlaced[subj.name] < target) {
                console.error(`  ❌ FAILED: ${subj.name} only ${tracking.hoursPlaced[subj.name]}/${target}`);
            }
        }

        const totalPlaced = this._countPlacedHours(className);
        console.log(`\n  ✓ Total: ${totalPlaced}/${this.TOTAL_HOURS} hours`);

        if (totalPlaced < this.TOTAL_HOURS) {
            console.error(`  ❌ WARNING: Missing ${this.TOTAL_HOURS - totalPlaced} hours!`);
        }

        this._checkDayVariety(daySubjectCount);

        return totalPlaced === this.TOTAL_HOURS;
    }

    _logProgress(phase, subjects, tracking) {
        console.log(`\n  📊 ${phase}:`);
        subjects.forEach(subj => {
            const target = subj.hoursPerWeek || 0;
            const placed = tracking.hoursPlaced[subj.name];
            const status = placed === target ? '✓' : '⚠️';
            console.log(`    ${status} ${subj.name}: ${placed}/${target}`);
        });
    }

    _countPlacedHours(className) {
        const tt = this.classTimetables[className];
        let count = 0;
        for (let dayIdx = 0; dayIdx < 5; dayIdx++) {
            for (let period = 0; period < this.PERIODS; period++) {
                if (tt[dayIdx][period]) count++;
            }
        }
        return count;
    }

    _checkDayVariety(daySubjectCount) {
        this.DAYS.forEach(day => {
            const count = daySubjectCount[day].size;
            if (count < 3) {
                console.warn(`    ⚠️ ${day}: Only ${count} different subjects`);
            }
        });
    }

    _placeLabBlock(className, lab, labTracking, daySubjectCount) {
        const teacher = lab.teacher;
        const tt = this.classTimetables[className];
        const candidates = [];

        const labStartPositions = [0, 1, 2, 3, 4];
        const shuffledPositions = this._shuffle([...labStartPositions]);

        for (let dayIdx = 0; dayIdx < 5; dayIdx++) {
            const day = this.DAYS[dayIdx];
            let dayScore = 100;

            if (labTracking.lastDay[lab.name] !== undefined) {
                const gap = Math.abs(dayIdx - labTracking.lastDay[lab.name]);
                if (gap >= 2) dayScore += 50;
                else if (gap === 1) dayScore -= 20;
            }

            for (const startP of shuffledPositions) {
                if (startP > this.PERIODS - 2) continue;
                if (tt[dayIdx][startP] || tt[dayIdx][startP + 1]) continue;

                const slot1 = `${day}-P${startP + 1}`;
                const slot2 = `${day}-P${startP + 2}`;
                if (this.teacherSlots[teacher]?.[slot1]) continue;
                if (this.teacherSlots[teacher]?.[slot2]) continue;

                let score = dayScore;

                if (labTracking.dayLabCount[day] === 0) {
                    score += 40;
                } else if (labTracking.dayLabCount[day] === 1) {
                    score -= 20;
                }

                const positionsUsed = this.labPositionsUsed[className] || [];
                const positionUseCount = positionsUsed.filter(p => p === startP).length;

                if (positionUseCount === 0) {
                    score += 30;
                } else {
                    score -= 15 * positionUseCount;
                }

                if (startP >= 1 && startP <= 3) score += 10;

                candidates.push({ dayIdx, startP, score, day });
            }
        }

        if (candidates.length === 0) {
            console.error(`      ❌ No slots for ${lab.name}`);
            return false;
        }

        candidates.sort((a, b) => b.score - a.score);
        const pick = candidates[0];

        tt[pick.dayIdx][pick.startP] = {
            subject: lab.name,
            teacher: teacher,
            type: lab.subjectType || 'lab',
            isLab: true
        };
        tt[pick.dayIdx][pick.startP + 1] = {
            subject: lab.name,
            teacher: teacher,
            type: lab.subjectType || 'lab',
            isLab: true,
            isLabContinuation: true
        };

        const slot1 = `${pick.day}-P${pick.startP + 1}`;
        const slot2 = `${pick.day}-P${pick.startP + 2}`;
        if (!this.teacherSlots[teacher]) this.teacherSlots[teacher] = {};
        this.teacherSlots[teacher][slot1] = className;
        this.teacherSlots[teacher][slot2] = className;

        this.labPositionsUsed[className].push(pick.startP);
        labTracking.lastDay[lab.name] = pick.dayIdx;
        labTracking.dayLabCount[pick.day]++;
        daySubjectCount[pick.day].add(lab.name);

        console.log(`      ✓ ${lab.name}: ${pick.day} P${pick.startP + 1}-P${pick.startP + 2}`);
        return true;
    }

    _placeTheory(className, subj, tracking, targetDayIdx, daySubjectCount, mode) {
        const teacher = subj.teacher;
        const tt = this.classTimetables[className];
        const candidates = [];

        const daysToTry = targetDayIdx !== null ? [targetDayIdx] : [0, 1, 2, 3, 4];

        for (const dayIdx of daysToTry) {
            const day = this.DAYS[dayIdx];

            for (let period = 0; period < this.PERIODS; period++) {
                if (tt[dayIdx][period]) continue;

                const slotKey = `${day}-P${period + 1}`;
                if (this.teacherSlots[teacher]?.[slotKey]) continue;

                // Avoid same period as previous day
                if (dayIdx > 0) {
                    const prevPeriod = tracking.dayPeriodMap[subj.name]?.[dayIdx - 1];
                    if (prevPeriod === period) continue;
                }

                // Max 2 continuous
                if (this._wouldExceedContinuous(tt, dayIdx, period, subj.name, 2)) continue;

                // Strict mode only: Max 2 in same period per week
                if (mode === 'strict') {
                    if (tracking.periodWeeklyCount[subj.name][period] >= 2) continue;
                }

                let score = 100;

                if (!tracking.daysUsed[subj.name].has(dayIdx)) score += 40;

                const weeklyUse = tracking.periodWeeklyCount[subj.name][period];
                if (weeklyUse === 0) score += 30;
                else score -= 25 * weeklyUse;

                score -= tracking.periodGlobalUsage[period] * 5;

                if (!daySubjectCount[day].has(subj.name)) score += 20;

                if (dayIdx > 0) {
                    const prevPeriod = tracking.dayPeriodMap[subj.name]?.[dayIdx - 1];
                    if (prevPeriod !== undefined && prevPeriod !== period) {
                        score += 15;
                    }
                }

                if (period >= 1 && period <= 4) score += 10;

                candidates.push({ dayIdx, period, score, day });
            }
        }

        if (candidates.length === 0) return false;

        candidates.sort((a, b) => b.score - a.score);
        const pick = candidates[0];

        const slotKey = `${pick.day}-P${pick.period + 1}`;
        tt[pick.dayIdx][pick.period] = {
            subject: subj.name,
            teacher: teacher,
            type: subj.subjectType || 'core'
        };

        if (!this.teacherSlots[teacher]) this.teacherSlots[teacher] = {};
        this.teacherSlots[teacher][slotKey] = className;

        tracking.daysUsed[subj.name].add(pick.dayIdx);
        tracking.dayPeriodMap[subj.name][pick.dayIdx] = pick.period;
        tracking.periodWeeklyCount[subj.name][pick.period]++;
        tracking.periodGlobalUsage[pick.period]++;
        daySubjectCount[pick.day].add(subj.name);

        return true;
    }

    _wouldExceedContinuous(tt, dayIdx, period, subjectName, max) {
        let count = 1;
        for (let p = period - 1; p >= 0; p--) {
            if (tt[dayIdx][p]?.subject === subjectName) count++;
            else break;
        }
        for (let p = period + 1; p < this.PERIODS; p++) {
            if (tt[dayIdx][p]?.subject === subjectName) count++;
            else break;
        }
        return count > max;
    }

    _forcePlaceTheory(className, subj, tracking, daySubjectCount) {
        const teacher = subj.teacher;
        const tt = this.classTimetables[className];

        // Try all possible slots
        for (let dayIdx = 0; dayIdx < 5; dayIdx++) {
            const day = this.DAYS[dayIdx];

            for (let period = 0; period < this.PERIODS; period++) {
                if (tt[dayIdx][period]) continue;

                const slotKey = `${day}-P${period + 1}`;
                if (this.teacherSlots[teacher]?.[slotKey]) continue;

                // Only check max 2 continuous (hard constraint)
                if (this._wouldExceedContinuous(tt, dayIdx, period, subj.name, 2)) continue;

                // PLACE IT
                tt[dayIdx][period] = {
                    subject: subj.name,
                    teacher: teacher,
                    type: subj.subjectType || 'core',
                    isForced: true
                };

                if (!this.teacherSlots[teacher]) this.teacherSlots[teacher] = {};
                this.teacherSlots[teacher][slotKey] = className;

                tracking.daysUsed[subj.name].add(dayIdx);
                tracking.dayPeriodMap[subj.name][dayIdx] = period;
                tracking.periodWeeklyCount[subj.name][period]++;
                tracking.periodGlobalUsage[period]++;
                daySubjectCount[day].add(subj.name);

                return true;
            }
        }

        return false;
    }

    _buildStaffTimetables() {
        this.staff.forEach(teacher => {
            if (!teacher?.name) return;
            this.staffTimetables[teacher.name] = this.DAYS.map(() =>
                Array(this.PERIODS).fill(null).map(() => ({
                    subject: 'FREE',
                    class: '-',
                    type: 'free'
                }))
            );
        });

        Object.keys(this.classTimetables).forEach(className => {
            const tt = this.classTimetables[className];
            this.DAYS.forEach((day, dayIdx) => {
                tt[dayIdx].forEach((slot, period) => {
                    if (slot?.teacher && slot.teacher !== '-' && this.staffTimetables[slot.teacher]) {
                        this.staffTimetables[slot.teacher][dayIdx][period] = {
                            subject: slot.subject,
                            class: className,
                            type: slot.type
                        };
                    }
                });
            });
        });
    }
}