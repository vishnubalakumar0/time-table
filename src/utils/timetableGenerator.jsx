export class TimetableGenerator {
    constructor(classes, staff, subjects) {
        this.classes = classes || [];
        this.staff = staff || [];
        this.subjects = subjects || [];
        this.classTimetables = {};
        this.staffTimetables = {};
        this.teacherBusySlots = {};
        this.teacherWeeklyCount = {};
        this.teacherDailyCount = {};
        this.subjectLastUsed = {}; // Track when subject was last used
        this.classDailyLabCount = {};
        this.staffSettings = {};
        this.DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
        this.PERIODS = 6;
        this.MAX_TEACHER_HOURS_PER_DAY = 6;
        this.MAX_TEACHER_HOURS_PER_WEEK = 30;
    }

    validate() {
        const errors = [];

        if (!this.classes || this.classes.length === 0) {
            errors.push('No classes added');
        }
        if (!this.staff || this.staff.filter(s => s.role === 'staff').length === 0) {
            errors.push('No staff added');
        }
        if (!this.subjects || this.subjects.length === 0) {
            errors.push('No subjects added');
        }

        if (errors.length > 0) {
            return { valid: false, errors };
        }

        const classHours = {};
        this.subjects.forEach(subject => {
            if (subject && subject.className && subject.hoursPerWeek) {
                classHours[subject.className] = (classHours[subject.className] || 0) + subject.hoursPerWeek;
            }
        });

        this.classes.forEach(cls => {
            if (cls && cls.name) {
                const hours = classHours[cls.name] || 0;
                const totalSlots = this.DAYS.length * this.PERIODS;
                if (hours < totalSlots) {
                    console.warn(`Class ${cls.name}: Has ${hours} hours, target is ${totalSlots}. Will fill remaining with revision.`);
                }
            }
        });

        return { valid: true, warnings: [] };
    }

    generate() {
        try {
            console.log('🚀 Starting INTELLIGENT timetable generation with 12 priority-based rules...');

            this._initialize();

            for (const cls of this.classes) {
                if (!cls || !cls.name) continue;

                console.log(`\n📋 Generating timetable for ${cls.name}`);
                this._generateIntelligentTimetable(cls.name);
            }

            this._generateStaffTimetables();
            const validation = this._validateFinal();

            console.log('\n✅ Timetable generation completed successfully');

            return {
                success: true,
                classTimetables: this.classTimetables,
                staffTimetables: this.staffTimetables,
                warnings: validation.warnings || []
            };
        } catch (error) {
            console.error('❌ Error generating timetable:', error);
            return {
                success: false,
                error: `Error: ${error.message || 'Unknown error'}`
            };
        }
    }

    _initialize() {
        console.log('⚙️ Initializing timetables...');

        this.classes.forEach(cls => {
            if (cls && cls.name) {
                this.classTimetables[cls.name] = this.DAYS.map(() => 
                    Array(this.PERIODS).fill(null)
                );
                this.classDailyLabCount[cls.name] = {};
                this.DAYS.forEach(day => { this.classDailyLabCount[cls.name][day] = 0; });
            }
        });

        const staffMembers = this.staff.filter(s => s && s.role === 'staff');
        staffMembers.forEach(teacher => {
            if (teacher && teacher.name) {
                this.teacherBusySlots[teacher.name] = {};
                this.teacherWeeklyCount[teacher.name] = 0;
                this.teacherDailyCount[teacher.name] = {};
                this.DAYS.forEach(day => {
                    this.teacherDailyCount[teacher.name][day] = 0;
                });
                this.staffSettings[teacher.name] = {
                    freePeriodMode: teacher.freePeriodMode || 'auto',
                    manualFreePeriods: typeof teacher.manualFreePeriods === 'number' ? teacher.manualFreePeriods : 0
                };
            }
        });
    }

    _generateIntelligentTimetable(className) {
        try {
            const classSubjects = this.subjects.filter(s => 
                s && s.className === className
            );

            if (classSubjects.length === 0) return true;

            // Initialize tracking
            classSubjects.forEach(s => {
                if (s) {
                    s.placedHours = 0;
                    s.remainingHours = s.hoursPerWeek || 0;
                    s.dailyCount = {};
                    s.lastPlacedDay = -1;
                    this.DAYS.forEach(day => { s.dailyCount[day] = 0; });
                }
            });

            // Fill timetable period by period, day by day
            this.DAYS.forEach((day, dayIdx) => {
                console.log(`\n  📅 ${day}:`);

                for (let period = 0; period < this.PERIODS; period++) {
                    // Rule 1: Check if continuing a lab block
                    if (period > 0) {
                        const prevSlot = this.classTimetables[className][dayIdx][period - 1];
                        if (prevSlot && prevSlot.isLabContinuation) {
                            const labSubject = classSubjects.find(s => s.name === prevSlot.subject);
                            if (labSubject && labSubject.currentBlockRemaining > 0) {
                                const tName = labSubject.teacher;
                                const slotKey = `${day}-P${period + 1}`;
                                if (this.teacherBusySlots[tName]?.[slotKey]) {
                                    console.log(`    P${period + 1}: Teacher ${tName} busy, cannot continue lab block`);
                                } else {
                                    this._placeAt(className, dayIdx, period, labSubject, true);
                                    labSubject.currentBlockRemaining--;
                                    console.log(`    P${period + 1}: ${labSubject.name} (continuing lab block)`);
                                    continue;
                                }
                            }
                        }
                    }

                    // Find best subject for this slot using intelligent rules
                    const bestSubject = this._findBestSubjectForSlot(
                        className, dayIdx, period, classSubjects
                    );

                    if (bestSubject) {
                        // Check if starting a lab block
                        const isLabStart = bestSubject.isContinuous && 
                                          period <= this.PERIODS - (bestSubject.blockSize || 2);

                        if (isLabStart) {
                            // Enforce teacher availability for all consecutive periods
                            const blockSize = bestSubject.blockSize || 2;
                            let teacherFreeForBlock = true;
                            for (let i = 0; i < blockSize; i++) {
                                const k = `${day}-P${period + 1 + i}`;
                                if (this.teacherBusySlots[bestSubject.teacher]?.[k]) {
                                    teacherFreeForBlock = false;
                                    break;
                                }
                            }
                            if (!teacherFreeForBlock) {
                                console.log(`    P${period + 1}: Cannot start lab, teacher busy in block`);
                            } else {
                                bestSubject.currentBlockRemaining = blockSize - 1;
                                this._placeAt(className, dayIdx, period, bestSubject, true);
                                console.log(`    P${period + 1}: ${bestSubject.name} (lab start)`);
                                continue;
                            }
                        }

                        if (!bestSubject.isContinuous) {
                            this._placeAt(className, dayIdx, period, bestSubject, false);
                            console.log(`    P${period + 1}: ${bestSubject.name}`);
                        }
                    } else {
                        // Rule 12: Revision period if no subject available
                        const revisionSubject = this._getRevisionSubject(classSubjects);
                        if (revisionSubject) {
                            this.classTimetables[className][dayIdx][period] = {
                                subject: `${revisionSubject.name} (Revision)`,
                                teacher: revisionSubject.teacher,
                                type: revisionSubject.subjectType || 'core'
                            };
                            console.log(`    P${period + 1}: ${revisionSubject.name} (Revision)`);
                        }
                    }
                }
            });

            return true;
        } catch (error) {
            console.error(`❌ Error generating for ${className}:`, error);
            return false;
        }
    }

    _findBestSubjectForSlot(className, dayIdx, period, classSubjects) {
        const day = this.DAYS[dayIdx];
        const candidates = [];

        // Get previous day's same period for Rule 2
        const prevDaySlot = dayIdx > 0 ? 
            this.classTimetables[className][dayIdx - 1][period] : null;

        for (const subject of classSubjects) {
            if (!subject || !subject.name) continue;

            // Skip if no hours remaining
            if (subject.remainingHours <= 0) continue;

            // Skip if teacher unavailable (Rule 10 - but continue for class)
            const slotKey = `${day}-P${period + 1}`;
            const teacherBusy = this.teacherBusySlots[subject.teacher]?.[slotKey];
            if (teacherBusy) {
                // Hard constraint: teacher cannot teach two classes in same period
                continue;
            }

            let score = 100; // Start with high score
            const reasons = [];

            // RULE 2: Do not place same subject as previous day same period (CRITICAL)
            if (prevDaySlot && prevDaySlot.subject === subject.name) {
                score -= 50;
                reasons.push('Same period as yesterday -50');
            }

            // RULE 3: Check daily usage limit
            const usedToday = subject.dailyCount[day] || 0;
            if (usedToday >= 2) {
                score -= 40;
                reasons.push('Used too many times today -40');
            }

            // RULE 4: High-hour subjects must appear daily
            if (subject.hoursPerWeek >= 5) {
                const appearedToday = subject.dailyCount[day] > 0;
                if (!appearedToday) {
                    score += 20;
                    reasons.push('High-hour subject needs daily appearance +20');
                }
            }

            // RULE 5: Low-hour subjects avoid Mon/Fri if possible
            if (subject.hoursPerWeek <= 2) {
                if (dayIdx === 0 || dayIdx === 4) { // Monday or Friday
                    const canPlaceMidWeek = this._hasAvailableMidWeekSlots(
                        className, subject, classSubjects
                    );
                    if (canPlaceMidWeek) {
                        score -= 30;
                        reasons.push('Low-hour on Mon/Fri -30');
                    }
                }
            }

            // RULE 6: Mix tough and easy subjects
            if (period > 0) {
                const prevSlot = this.classTimetables[className][dayIdx][period - 1];
                if (prevSlot) {
                    // Avoid same difficulty level back-to-back
                    if (prevSlot.type === subject.subjectType) {
                        score -= 15;
                        reasons.push('Same difficulty as previous -15');
                    } else {
                        score += 10;
                        reasons.push('Different difficulty +10');
                    }
                    // Avoid >3 continuous theory of same subject
                    if (!subject.isContinuous) {
                        let sameStreak = 0;
                        for (let i = 1; i <= 3; i++) {
                            const ps = this.classTimetables[className][dayIdx][period - i];
                            if (ps && ps.subject === subject.name && !ps.isLabContinuation) sameStreak++;
                            else break;
                        }
                        if (sameStreak >= 3) {
                            score -= 50;
                            reasons.push('Too many continuous theory periods -50');
                        }
                    }
                }
            }

            // RULE 7: Priority to subjects with more remaining hours
            const remainingRatio = subject.remainingHours / (subject.hoursPerWeek || 1);
            score += (remainingRatio * 15);
            reasons.push(`Remaining hours priority +${Math.round(remainingRatio * 15)}`);

            // RULE 8: Avoid recent repetition
            const lastUsedInfo = this.subjectLastUsed[`${className}-${subject.name}`];
            if (lastUsedInfo) {
                const slotsSinceLastUse = (dayIdx * this.PERIODS + period) - lastUsedInfo.slot;
                if (slotsSinceLastUse < 3) {
                    score -= 25;
                    reasons.push('Used recently -25');
                } else if (slotsSinceLastUse > 5) {
                    score += 15;
                    reasons.push('Not used recently +15');
                }
            }

            // Teacher availability check (warn but don't block - Rule 10)
            // Enforced above

            // Lab placement logic
            if (subject.isContinuous) {
                const blockSize = subject.blockSize || 2;
                const canFitBlock = period <= this.PERIODS - blockSize;

                if (!canFitBlock) {
                    score = -1000; // Cannot place lab here
                    reasons.push('Cannot fit lab block');
                } else {
                    // Check if all periods in block are free
                    let blockFree = true;
                    for (let i = 0; i < blockSize; i++) {
                        if (this.classTimetables[className][dayIdx][period + i]) {
                            blockFree = false;
                            break;
                        }
                    }
                    if (!blockFree) {
                        score = -1000;
                        reasons.push('Lab block periods not all free');
                    } else {
                        // Prefer afternoon for labs
                        if (period >= 3) {
                            score += 20;
                            reasons.push('Lab in afternoon +20');
                        }
                        // Avoid last period if possible
                        if (period === this.PERIODS - 1) {
                            score -= 30;
                            reasons.push('Avoid lab at last period -30');
                        }
                        // Prefer only 1 lab per day, allow 2 with penalty
                        const labsToday = this.classDailyLabCount[className][day] || 0;
                        if (labsToday >= 1) {
                            score -= 25;
                            reasons.push('Second lab same day -25');
                        }
                    }
                }
            }

            // Core subjects prefer morning, electives prefer afternoon
            if (subject.subjectType === 'core' && period <= 2) {
                score += 5;
                reasons.push('Core in morning +5');
            }
            if (subject.subjectType === 'elective' && period >= 3) {
                score += 10;
                reasons.push('Elective in afternoon +10');
            }

            // Prefer middle periods for theory (2–5)
            if (!subject.isContinuous) {
                if (period === 0 || period === this.PERIODS - 1) {
                    score -= 10;
                    reasons.push('Avoid edge periods for theory -10');
                } else {
                    score += 5;
                    reasons.push('Middle period for theory +5');
                }
            }

            // Teacher free period rules (auto/manual)
            const tSettings = this.staffSettings[subject.teacher] || { freePeriodMode: 'auto', manualFreePeriods: 0 };
            const usedTodayByTeacher = this.teacherDailyCount[subject.teacher][day] || 0;
            if (tSettings.freePeriodMode === 'manual') {
                const maxDaily = this.PERIODS - (tSettings.manualFreePeriods || 0);
                if (usedTodayByTeacher >= maxDaily) {
                    score = -1000;
                    reasons.push('Manual free periods reached');
                }
            } else {
                // Auto: prefer leaving one free period per day when possible
                if (usedTodayByTeacher >= this.PERIODS - 1) {
                    score -= 40;
                    reasons.push('Prefer leaving one free period -40');
                }
            }

            candidates.push({ subject, score, reasons });
        }

        // Sort by score (highest first)
        candidates.sort((a, b) => b.score - a.score);

        // RULE 11: Fallback - allow repeating from previous day if necessary
        if (candidates.length === 0 || candidates[0].score < 0) {
            console.log(`    ⚠️ P${period + 1}: No ideal subject, using fallback`);
            // Find any subject with remaining hours
            const fallback = classSubjects.find(s => 
                s && s.remainingHours > 0 && !s.isContinuous
            );
            return fallback || null;
        }

        // Log top candidate decision
        const winner = candidates[0];
        if (winner.score > 0) {
            // console.log(`    → Selected: ${winner.subject.name} (score: ${winner.score.toFixed(1)})`);
            return winner.subject;
        }

        return null;
    }

    _hasAvailableMidWeekSlots(className, subject, allSubjects) {
        // Check if mid-week (Tue-Thu) has available slots
        for (let dayIdx = 1; dayIdx <= 3; dayIdx++) {
            for (let period = 0; period < this.PERIODS; period++) {
                if (!this.classTimetables[className][dayIdx][period]) {
                    return true;
                }
            }
        }
        return false;
    }

    _getRevisionSubject(classSubjects) {
        // Rule 12: Get important subject for revision
        const coreSubjects = classSubjects.filter(s => 
            s && s.subjectType === 'core'
        );

        if (coreSubjects.length > 0) {
            // Pick subject with most hours (most important)
            coreSubjects.sort((a, b) => b.hoursPerWeek - a.hoursPerWeek);
            return coreSubjects[0];
        }

        return classSubjects[0] || null;
    }

    _placeAt(className, dayIdx, period, subject, isLabContinuation = false) {
        if (!className || !subject || !subject.name || !subject.teacher) return;

        const day = this.DAYS[dayIdx];
        const slotKey = `${day}-P${period + 1}`;

        this.classTimetables[className][dayIdx][period] = {
            subject: subject.name,
            teacher: subject.teacher,
            type: subject.subjectType || 'core',
            isLabContinuation: isLabContinuation
        };

        // Update tracking
        subject.remainingHours--;
        subject.placedHours++;
        subject.dailyCount[day] = (subject.dailyCount[day] || 0) + 1;
        subject.lastPlacedDay = dayIdx;

        this.subjectLastUsed[`${className}-${subject.name}`] = {
            day: dayIdx,
            period: period,
            slot: dayIdx * this.PERIODS + period
        };

        // Mark teacher as busy (for reference, but Rule 10 allows class without teacher)
        if (!this.teacherBusySlots[subject.teacher]) {
            this.teacherBusySlots[subject.teacher] = {};
        }
        this.teacherBusySlots[subject.teacher][slotKey] = true;

        this.teacherWeeklyCount[subject.teacher] = 
            (this.teacherWeeklyCount[subject.teacher] || 0) + 1;

        if (!this.teacherDailyCount[subject.teacher]) {
            this.teacherDailyCount[subject.teacher] = {};
        }
        if (!this.teacherDailyCount[subject.teacher][day]) {
            this.teacherDailyCount[subject.teacher][day] = 0;
        }
        this.teacherDailyCount[subject.teacher][day]++;

        // Track lab count per day when starting
        if (subject.isContinuous && isLabContinuation) {
            this.classDailyLabCount[className][day] = (this.classDailyLabCount[className][day] || 0) + 1;
        }
    }

    _generateStaffTimetables() {
        console.log('\n👨‍🏫 Generating staff timetables (free periods allowed)...');

        const staffMembers = this.staff.filter(s => s && s.role === 'staff');
        staffMembers.forEach(teacher => {
            if (teacher && teacher.name) {
                this.staffTimetables[teacher.name] = this.DAYS.map(() => 
                    Array(this.PERIODS).fill(null).map(() => ({ 
                        subject: 'FREE', 
                        class: '-', 
                        type: 'free' 
                    }))
                );
            }
        });

        this.classes.forEach(cls => {
            if (!cls || !cls.name || !this.classTimetables[cls.name]) return;

            this.DAYS.forEach((day, dayIndex) => {
                const daySchedule = this.classTimetables[cls.name][dayIndex];
                if (!daySchedule) return;

                daySchedule.forEach((slot, period) => {
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

    _validateFinal() {
        console.log('\n✔️ Validating all rules...');
        const warnings = [];

        this.classes.forEach(cls => {
            if (!cls || !cls.name || !this.classTimetables[cls.name]) return;

            let emptySlots = 0;
            this.DAYS.forEach((day, dayIdx) => {
                const daySchedule = this.classTimetables[cls.name][dayIdx];
                if (!daySchedule) return;

                daySchedule.forEach((slot) => {
                    if (!slot) emptySlots++;
                });
            });

            if (emptySlots > 0) {
                warnings.push(`${cls.name}: ${emptySlots} empty periods (Rule 9 - should be filled)`);
            }
        });

        // Weekly teacher hours should match assigned subject hours
        const expectedTeacherHours = {};
        this.subjects.forEach(s => {
            if (!s || !s.teacher || !s.hoursPerWeek) return;
            expectedTeacherHours[s.teacher] = (expectedTeacherHours[s.teacher] || 0) + s.hoursPerWeek;
        });
        Object.keys(expectedTeacherHours).forEach(t => {
            const expected = expectedTeacherHours[t];
            const actual = this.teacherWeeklyCount[t] || 0;
            if (actual !== expected) {
                warnings.push(`${t}: expected ${expected} hours, scheduled ${actual}`);
            }
        });

        return { valid: warnings.length === 0, warnings };
    }
}