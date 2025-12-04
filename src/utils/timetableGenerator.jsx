/**
 * Timetable Generator - CLEAN VERSION 2025-12-04
 * NO TYPOS - PRODUCTION READY
 * Generates intelligent timetables based on defined rules
 */

export class TimetableGenerator {
    constructor(classes, staff, subjects, options = {}) {
        this.classes = classes || [];
        this.staff = staff || [];
        this.subjects = subjects || [];
        this.options = options || {};

        // Output structures
        this.classTimetables = {};
        this.staffTimetables = {};

        // Tracking structures
        this.teacherBusySlots = {};
        this.teacherWeeklyHours = {};
        this.teacherDailyHours = {};
        this.teacherExpectedWeeklyHours = {};
        this.subjectPlacementTracker = {};
        this.placements = [];
        this.subjectPeriodUsage = {};
        this.labStartPositions = {};

        this.DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
        
        this.PERIODS = 6;
        this.TOTAL_WEEKLY_HOURS = 30;

        this.dailyMaxPerSubject = typeof this.options.dailyMaxPerSubject === 'number' ? this.options.dailyMaxPerSubject : 2;
        const seed = typeof this.options.seed === 'number' ? this.options.seed : 123456789;
        this._rng = (() => {
            let a = seed >>> 0;
            return () => {
                a += 0x6D2B79F5;
                let t = a;
                t = Math.imul(t ^ (t >>> 15), t | 1);
                t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
                return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
            };
        })();
    }

    /**
     * Validate input data before generation
     */
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

        // Check if each class has exactly 30 hours per week
        const classHours = {};
        this.subjects.forEach(subject => {
            if (subject && subject.className && subject.hoursPerWeek) {
                classHours[subject.className] = (classHours[subject.className] || 0) + subject.hoursPerWeek;
            }
        });

        this.classes.forEach(cls => {
            if (cls && cls.name) {
                const hours = classHours[cls.name] || 0;
                if (hours !== this.TOTAL_WEEKLY_HOURS) {
                    errors.push(`Class ${cls.name} must have exactly ${this.TOTAL_WEEKLY_HOURS} hours (current: ${hours}).`);
                }
            }
        });

        if (errors.length > 0) {
            return { valid: false, errors };
        }

        return { valid: true, warnings: [] };
    }

    /**
     * Main generation method
     */
    generate() {
        try {
            console.log('🚀 Starting intelligent timetable generation...');

            this._initialize();

            // Generate timetable for each class
            for (const cls of this.classes) {
                if (!cls || !cls.name) continue;

                console.log(`\n📋 Generating timetable for ${cls.name}`);
                const success = this._generateClassTimetable(cls.name);

                if (!success) {
                    return {
                        success: false,
                        error: `Failed to generate complete timetable for ${cls.name}`
                    };
                }
            }

            // Generate staff timetables
            this._generateStaffTimetables();

            const warnings = [];

            // Post-validate teacher weekly totals
            Object.keys(this.teacherExpectedWeeklyHours).forEach(t => {
                const expected = this.teacherExpectedWeeklyHours[t] || 0;
                const actual = this.teacherWeeklyHours[t] || 0;
                if (actual !== expected) {
                    warnings.push(`Teacher ${t} scheduled ${actual}/${expected} hours.`);
                }
            });

            // Post-validate class filled hours
            this.classes.forEach(cls => {
                if (!cls || !cls.name) return;
                let filled = 0;
                this.DAYS.forEach((_, d) => {
                    const row = this.classTimetables[cls.name]?.[d] || [];
                    row.forEach(s => { if (s) filled++; });
                });
                if (filled !== this.TOTAL_WEEKLY_HOURS) {
                    warnings.push(`Class ${cls.name} filled ${filled}/${this.TOTAL_WEEKLY_HOURS} periods.`);
                }
            });

            console.log('\n✅ Timetable generation completed successfully');

            const diag = this._computeDiagnosticsAndScore();
            return {
                success: true,
                classTimetables: this.classTimetables,
                staffTimetables: this.staffTimetables,
                placements: this.placements,
                score: diag.score,
                diagnostics: diag.diagnostics,
                warnings
            };

        } catch (error) {
            console.error('❌ Error generating timetable:', error);
            return {
                success: false,
                error: `Error: ${error.message || 'Unknown error'}`
            };
        }
    }

    _computeDiagnosticsAndScore() {
        let violations = [];
        let notes = [];

        // Subject weekly hours
        Object.keys(this.subjectPlacementTracker).forEach(k => {
            const t = this.subjectPlacementTracker[k];
            if (!t) return;
            if (t.remaining !== 0) {
                violations.push(`Subject ${k} remaining ${t.remaining}`);
            }
        });

        // Daily max per subject
        let sameSubjectExcesses = 0;
        Object.keys(this.subjectPlacementTracker).forEach(k => {
            const t = this.subjectPlacementTracker[k];
            if (!t) return;
            this.DAYS.forEach(d => {
                const c = t.dailyCount[d] || 0;
                if (c > this.dailyMaxPerSubject) sameSubjectExcesses += (c - this.dailyMaxPerSubject);
            });
        });

        // Labs at edges
        let labsAtEdges = 0;
        for (const p of this.placements) {
            if (p.type === 'lab') {
                if (p.period === 1 || p.period === this.PERIODS) labsAtEdges++;
            }
        }

        // Preferred spread
        let insufficientSpread = 0;
        const bySubject = {};
        for (const p of this.placements) {
            const key = `${p.className}-${p.subject}`;
            bySubject[key] = bySubject[key] || new Set();
            bySubject[key].add(p.day);
        }
        this.subjects.forEach(s => {
            if (!s || !s.name) return;
            if ((s.hoursPerWeek || 0) >= 4) {
                const key = `${s.className}-${s.name}`;
                const usedDays = bySubject[key]?.size || 0;
                if (usedDays < 3) insufficientSpread++;
            }
        });

        // Teacher continuous periods over 3
        let teacherOver3 = 0;
        const teachers = Object.keys(this.staffTimetables);
        teachers.forEach(t => {
            const tt = this.staffTimetables[t];
            if (!tt) return;
            for (let d = 0; d < this.DAYS.length; d++) {
                let run = 0;
                for (let p = 0; p < this.PERIODS; p++) {
                    const slot = tt[d][p];
                    if (slot && slot.subject !== 'FREE') {
                        run++;
                    } else {
                        if (run > 3) teacherOver3 += (run - 3);
                        run = 0;
                    }
                }
                if (run > 3) teacherOver3 += (run - 3);
            }
        });

        let score = 1000;
        score -= 500 * (violations.length);
        score -= 10 * sameSubjectExcesses;
        score -= 5 * labsAtEdges;
        score -= 2 * insufficientSpread;
        score -= 1 * teacherOver3;

        const diagnostics = { violations, notes };
        return { score, diagnostics };
    }

    /**
     * Initialize all data structures
     */
    _initialize() {
        console.log('⚙️ Initializing timetables...');

        // Initialize class timetables
        this.classes.forEach(cls => {
            if (cls && cls.name) {
                this.classTimetables[cls.name] = this.DAYS.map(() => 
                    Array(this.PERIODS).fill(null)
                );
            }
        });

        // Initialize teacher tracking
        const staffMembers = this.staff.filter(s => s && s.role === 'staff');
        staffMembers.forEach(teacher => {
            if (teacher && teacher.name) {
                this.teacherBusySlots[teacher.name] = {};
                this.teacherWeeklyHours[teacher.name] = 0;
                this.teacherDailyHours[teacher.name] = {};

                this.DAYS.forEach(day => {
                    this.teacherDailyHours[teacher.name][day] = 0;
                });
            }
        });

        // Compute expected weekly hours per teacher
        this.teacherExpectedWeeklyHours = {};
        this.subjects.forEach(subject => {
            if (subject && subject.teacher && subject.hoursPerWeek) {
                this.teacherExpectedWeeklyHours[subject.teacher] = (this.teacherExpectedWeeklyHours[subject.teacher] || 0) + subject.hoursPerWeek;
            }
        });
    }

    /**
     * Generate timetable for a specific class
     */
    _generateClassTimetable(className) {
        try {
            const classSubjects = this.subjects.filter(s => 
                s && s.className === className
            );

            if (classSubjects.length === 0) {
                console.warn(`No subjects found for ${className}`);
                return true;
            }

            // Initialize subject tracking
            classSubjects.forEach(subject => {
                if (subject) {
                    const key = `${className}-${subject.name}`;
                    this.subjectPlacementTracker[key] = {
                        placed: 0,
                        remaining: subject.hoursPerWeek || 0,
                        dailyCount: {},
                        lastPlacedSlot: -1
                    };

                    this.DAYS.forEach(day => {
                        this.subjectPlacementTracker[key].dailyCount[day] = 0;
                    });
                }
            });

            // Initialize usage trackers for anti-pattern rules
            if (!this.subjectPeriodUsage[className]) this.subjectPeriodUsage[className] = {};
            if (!this.labStartPositions[className]) this.labStartPositions[className] = {};

            // Pre-place labs before theories
            this._prePlaceLabs(className, classSubjects);

            // Fill timetable slot by slot
            for (let dayIdx = 0; dayIdx < this.DAYS.length; dayIdx++) {
                const day = this.DAYS[dayIdx];
                console.log(`  📅 ${day}:`);

                for (let period = 0; period < this.PERIODS; period++) {
                    // Check if we're in the middle of a lab block
                    if (period > 0) {
                        const prevSlot = this.classTimetables[className][dayIdx][period - 1];
                        if (prevSlot && prevSlot.isLabContinuation && prevSlot.blockRemaining > 0) {
                            // Continue the lab block
                            const subject = classSubjects.find(s => s.name === prevSlot.subject);
                            if (subject) {
                                this._placeSubject(className, dayIdx, period, subject, true, prevSlot.blockRemaining - 1);
                                console.log(`    P${period + 1}: ${subject.name} (Lab continuation)`);
                                continue;
                            }
                        }
                    }

                    // Find best subject for this slot
                    const bestSubject = this._findBestSubject(className, dayIdx, period, classSubjects);

                    if (bestSubject) {
                        // Check if it's a lab and needs multiple periods
                        if (bestSubject.isContinuous) {
                            const blockSize = bestSubject.blockSize || 2;

                            // Check if we have enough consecutive periods
                            if (period + blockSize <= this.PERIODS) {
                                // Check if all periods are free and teacher is available
                                let canPlaceLab = true;
                                
                                for (let i = 0; i < blockSize; i++) {
                                    if (this.classTimetables[className][dayIdx][period + i] !== null) {
                                        canPlaceLab = false;
                                        break;
                                    }

                                    const slotKey = `${day}-P${period + 1 + i}`;
                                    if (this.teacherBusySlots[bestSubject.teacher]?.[slotKey]) {
                                        canPlaceLab = false;
                                        break;
                                    }
                                    if (!this._isTeacherAvailable(bestSubject.teacher, dayIdx, period + i)) {
                                        canPlaceLab = false;
                                        break;
                                    }
                                }

                                if (canPlaceLab) {
                                    // Place the entire lab block
                                    for (let i = 0; i < blockSize; i++) {
                                        this._placeSubject(
                                            className, 
                                            dayIdx, 
                                            period + i, 
                                            bestSubject, 
                                            true, 
                                            blockSize - i - 1
                                        );
                                    }
                                    console.log(`    P${period + 1}-P${period + blockSize}: ${bestSubject.name} (Lab block)`);
                                    period += blockSize - 1; // Skip the periods we just filled
                                    continue;
                                } else {
                                    console.log(`    P${period + 1}: Cannot place ${bestSubject.name} lab (not enough space or teacher busy)`);
                                }
                            }
                        } else {
                            // Place theory subject
                            this._placeSubject(className, dayIdx, period, bestSubject, false, 0);
                            console.log(`    P${period + 1}: ${bestSubject.name}`);
                        }
                    } else {
                        console.log(`    P${period + 1}: No suitable subject found (will remain empty)`);
                    }
                }
            }

            return true;

        } catch (error) {
            console.error(`❌ Error generating timetable for ${className}:`, error);
            return false;
        }
    }

    _prePlaceLabs(className, classSubjects) {
        const labs = classSubjects.filter(s => s && s.isContinuous);
        if (labs.length === 0) return;

        const dayLabCount = {};
        this.DAYS.forEach(d => { dayLabCount[d] = 0; });

        const lastLabDay = {};

        for (const subject of labs) {
            const blockSize = subject.blockSize || 2;
            let remaining = subject.hoursPerWeek || 0;
            const staffMember = this.staff.find(s => s.name === subject.teacher);

            while (remaining >= blockSize) {
                let placed = false;
                const choices = [];
                for (let dayIdx = 0; dayIdx < this.DAYS.length; dayIdx++) {
                    const day = this.DAYS[dayIdx];
                    for (let period = 0; period <= this.PERIODS - blockSize; period++) {
                        let canPlace = true;
                        for (let i = 0; i < blockSize; i++) {
                            if (this.classTimetables[className][dayIdx][period + i] !== null) { canPlace = false; break; }
                            const slotKey = `${day}-P${period + 1 + i}`;
                            if (this.teacherBusySlots[subject.teacher]?.[slotKey]) { canPlace = false; break; }
                            if (!this._isTeacherAvailable(subject.teacher, dayIdx, period + i)) { canPlace = false; break; }
                        }
                        if (canPlace) {
                            let w = 100;
                            if (period === 0 || period + blockSize - 1 === this.PERIODS - 1) w -= 25;
                            if (dayLabCount[day] >= 1) w -= 30;
                            if (lastLabDay[subject.name] !== undefined && Math.abs(dayIdx - lastLabDay[subject.name]) < 1) w -= 20;
                            const teacherDaily = this.teacherDailyHours[subject.teacher]?.[this.DAYS[dayIdx]] || 0;
                            if (teacherDaily >= 3) w -= 15;
                            const startsUsed = this.labStartPositions[className][subject.name] || new Set();
                            if (startsUsed.has(period)) continue; // avoid repeating same start block across days
                            choices.push({ dayIdx, period, weight: Math.max(1, w) });
                        }
                    }
                }

                if (choices.length > 0) {
                    const pick = this._weightedPick(choices);
                    for (let i = 0; i < blockSize; i++) {
                        this._placeSubject(className, pick.dayIdx, pick.period + i, subject, true, blockSize - i - 1);
                    }
                    const day = this.DAYS[pick.dayIdx];
                    dayLabCount[day] += 1;
                    lastLabDay[subject.name] = pick.dayIdx;
                    remaining -= blockSize;
                    placed = true;
                    const s = this.labStartPositions[className][subject.name] || new Set();
                    s.add(pick.period);
                    this.labStartPositions[className][subject.name] = s;
                }

                if (!placed) {
                    for (let dayIdx = 0; dayIdx < this.DAYS.length && !placed; dayIdx++) {
                        const day = this.DAYS[dayIdx];
                        for (let period = 0; period <= this.PERIODS - blockSize; period++) {
                            let canPlace = true;
                            for (let i = 0; i < blockSize; i++) {
                                if (this.classTimetables[className][dayIdx][period + i] !== null) { canPlace = false; break; }
                                const slotKey = `${day}-P${period + 1 + i}`;
                                if (this.teacherBusySlots[subject.teacher]?.[slotKey]) { canPlace = false; break; }
                                if (!this._isTeacherAvailable(subject.teacher, dayIdx, period + i)) { canPlace = false; break; }
                            }
                            if (canPlace) {
                                for (let i = 0; i < blockSize; i++) {
                                    this._placeSubject(className, dayIdx, period + i, subject, true, blockSize - i - 1);
                                }
                                dayLabCount[day] += 1;
                                lastLabDay[subject.name] = dayIdx;
                                remaining -= blockSize;
                                placed = true;
                                const s2 = this.labStartPositions[className][subject.name] || new Set();
                                s2.add(period);
                                this.labStartPositions[className][subject.name] = s2;
                                break;
                            }
                        }
                    }
                }

                if (!placed) break;
            }
        }
    }

    /**
     * Find the best subject to place in a given slot
     */
    _findBestSubject(className, dayIdx, period, classSubjects) {
        const day = this.DAYS[dayIdx];
        const slotKey = `${day}-P${period + 1}`;
        const candidates = [];

        for (const subject of classSubjects) {
            if (!subject || !subject.name) continue;

            const trackingKey = `${className}-${subject.name}`;
            const tracker = this.subjectPlacementTracker[trackingKey];

            // Skip if no hours remaining
            if (!tracker || tracker.remaining <= 0) continue;

            // Check teacher availability (Rule: teacher not in two classes at once)
            if (this.teacherBusySlots[subject.teacher]?.[slotKey]) {
                continue;
            }
            if (!this._isTeacherAvailable(subject.teacher, dayIdx, period)) {
                continue;
            }

            // Hard cap: do not exceed teacher's expected weekly hours
            const expectedWeekly = this.teacherExpectedWeeklyHours[subject.teacher] || 0;
            const currentWeekly = this.teacherWeeklyHours[subject.teacher] || 0;
            if (expectedWeekly > 0 && currentWeekly >= expectedWeekly) {
                continue;
            }

            let score = 100;
            const reasons = [];

            const dailyCount = tracker.dailyCount[day] || 0;
            if (!subject.isContinuous) {
                if (dailyCount >= this.dailyMaxPerSubject) {
                    continue;
                } else if (dailyCount === 1) {
                    score -= 25;
                    reasons.push('Second usage same day -25');
                }
            }

            // Vertical pattern avoidance: limit same subject in the same period across days to 2
            const usageMap = this.subjectPeriodUsage[className][subject.name] || {};
            const usedCountSamePeriod = usageMap[period] || 0;
            if (!subject.isContinuous) {
                if (usedCountSamePeriod >= 2) {
                    continue;
                } else if (usedCountSamePeriod === 1) {
                    score -= 20;
                    reasons.push('Repeat same period across days -20');
                } else {
                    score += 10;
                    reasons.push('Prefer unused period slot +10');
                }
            }

            // Daily variety anti-pattern: avoid same 2/3 subject order across days
            if (!subject.isContinuous) {
                // Check pair
                if (period >= 1) {
                    const prevSubj = this.classTimetables[className][dayIdx][period - 1]?.subject || null;
                    if (prevSubj) {
                        for (let d = 0; d < this.DAYS.length; d++) {
                            if (d === dayIdx) continue;
                            const s1 = this.classTimetables[className][d]?.[period - 1]?.subject || null;
                            const s2 = this.classTimetables[className][d]?.[period]?.subject || null;
                            if (s1 === prevSubj && s2 === subject.name) {
                                score -= 25;
                                reasons.push('Avoid repeating pair order across days -25');
                                break;
                            }
                        }
                    }
                }
                // Check triple
                if (period >= 2) {
                    const ps2 = this.classTimetables[className][dayIdx][period - 2]?.subject || null;
                    const ps1 = this.classTimetables[className][dayIdx][period - 1]?.subject || null;
                    if (ps2 && ps1) {
                        for (let d = 0; d < this.DAYS.length; d++) {
                            if (d === dayIdx) continue;
                            const t0 = this.classTimetables[className][d]?.[period - 2]?.subject || null;
                            const t1 = this.classTimetables[className][d]?.[period - 1]?.subject || null;
                            const t2 = this.classTimetables[className][d]?.[period]?.subject || null;
                            if (t0 === ps2 && t1 === ps1 && t2 === subject.name) {
                                score -= 40;
                                reasons.push('Avoid repeating triple order across days -40');
                                break;
                            }
                        }
                    }
                }
            }

            if (!subject.isContinuous && period >= 2) {
                let continuousCount = 0;
                for (let i = 1; i <= 2; i++) {
                    const prevSlot = this.classTimetables[className][dayIdx][period - i];
                    if (prevSlot && prevSlot.subject === subject.name && !prevSlot.isLabContinuation) {
                        continuousCount++;
                    } else {
                        break;
                    }
                }
                if (continuousCount >= 2) {
                    continue;
                } else if (continuousCount === 1) {
                    score -= 25;
                    reasons.push('Avoid back-to-back theory -25');
                }
            }

            if (!subject.isContinuous) {
                if (period >= 1 && period <= 4) {
                    score += 20;
                    reasons.push('Middle period theory +20');
                } else {
                    score -= 25;
                    reasons.push('Edge period theory -25');
                }
            }

            // RULE: Labs prefer afternoon (period 3-5)
            if (subject.isContinuous) {
                const blockSize = subject.blockSize || 2;

                // Check if lab can fit
                if (period + blockSize > this.PERIODS) {
                    score -= 1000;
                    reasons.push('Lab cannot fit -1000');
                } else {
                    if (period >= 2) {
                        score += 25;
                        reasons.push('Lab in afternoon +25');
                    }

                    // RULE: Avoid last period for labs
                    if (period + blockSize === this.PERIODS + 1) {
                        score -= 20;
                        reasons.push('Lab at last period -20');
                    }

                    // Count labs already placed today
                    let labsToday = 0;
                    for (let p = 0; p < period; p++) {
                        const slot = this.classTimetables[className][dayIdx][p];
                        if (slot && slot.isLabContinuation && slot.blockRemaining === (slot.blockSize || 2) - 1) {
                            labsToday++;
                        }
                    }

                    // Prefer 1 lab per day; second only if necessary
                    if (labsToday >= 1) {
                        score -= 50;
                        reasons.push('Second lab same day -50');
                    }
                }
            }

            // Weekly distribution preference: prefer unused days for the subject
            if (!subject.isContinuous) {
                const uniqueDaysUsed = this.DAYS.reduce((acc, d) => acc + ((tracker.dailyCount[d] || 0) > 0 ? 1 : 0), 0);
                if (tracker.dailyCount[day] === 0) {
                    score += 15;
                    reasons.push('Prefer spreading to new day +15');
                }
            }

            // Daily diversity: prefer at least 3 different subjects per day
            if (!subject.isContinuous) {
                const existingSlots = this.classTimetables[className][dayIdx];
                const distinctSubjects = new Set();
                for (let p = 0; p < existingSlots.length; p++) {
                    const sl = existingSlots[p];
                    if (sl && !sl.isLabContinuation) {
                        distinctSubjects.add(sl.subject);
                    }
                }
                const distinctCount = distinctSubjects.size;
                if (distinctCount < 3) {
                    if (distinctSubjects.has(subject.name)) {
                        score -= 30;
                        reasons.push('Improve daily mix -30');
                    } else {
                        score += 30;
                        reasons.push('New subject improves mix +30');
                    }
                }
            }

            // Teacher dominance control per day
            if (!subject.isContinuous) {
                const teacherDaily = (this.teacherDailyHours[subject.teacher]?.[day]) || 0;
                if (teacherDaily >= 3) {
                    score -= 25;
                    reasons.push('Teacher day dominance -25');
                } else if (teacherDaily >= 2) {
                    score -= 10;
                    reasons.push('Teacher appearing often -10');
                }
            }

            // Priority to subjects with more remaining hours
            const remainingRatio = tracker.remaining / (subject.hoursPerWeek || 1);
            score += remainingRatio * 20;
            reasons.push(`Remaining priority +${Math.round(remainingRatio * 20)}`);

            // Teacher free period rules
            const staffMember = this.staff.find(s => s.name === subject.teacher);
            if (staffMember) {
                const dailyHours = (this.teacherDailyHours[subject.teacher]?.[day]) || 0;

                if (staffMember.freePeriodMode === 'manual') {
                    const maxDailyHours = this.PERIODS - (staffMember.manualFreePeriods || 0);
                    if (dailyHours >= maxDailyHours) {
                        continue;
                    }
                } else {
                    // Auto mode: try to leave at least 1 free period per day
                    if (dailyHours >= this.PERIODS - 1) {
                        score -= 50;
                        reasons.push('Auto: prefer leaving free period -50');
                    }
                }
            }

            // Teacher load: avoid creating >3 consecutive teaching periods
            const dayName = this.DAYS[dayIdx];
            let prevRun = 0;
            for (let p = period - 1; p >= 0; p--) {
                const keyPrev = `${dayName}-P${p + 1}`;
                if (this.teacherBusySlots[subject.teacher]?.[keyPrev]) prevRun++; else break;
            }
            let nextRun = 0;
            for (let p = period + 1; p < this.PERIODS; p++) {
                const keyNext = `${dayName}-P${p + 1}`;
                if (this.teacherBusySlots[subject.teacher]?.[keyNext]) nextRun++; else break;
            }
            if (prevRun + 1 + nextRun > 3) {
                score -= 40;
                reasons.push('Avoid >3 consecutive teacher load -40');
            }

            candidates.push({ subject, score, reasons });
        }

        if (candidates.length > 0) {
            const weighted = candidates.map(c => ({ item: c.subject, weight: Math.max(1, Math.round(c.score)) }));
            const pick = this._weightedPick(weighted);
            if (pick) return pick.item;
        }

        // Fallback: return any subject with remaining hours
        const fallback = classSubjects.find(s => {
            const key = `${className}-${s.name}`;
            return s && this.subjectPlacementTracker[key]?.remaining > 0;
        });

        return fallback || null;
    }

    /**
     * Place a subject in a specific slot
     */
    _placeSubject(className, dayIdx, period, subject, isLab, blockRemaining) {
        if (!className || !subject || !subject.name || !subject.teacher) return;

        const day = this.DAYS[dayIdx];
        const slotKey = `${day}-P${period + 1}`;
        const trackingKey = `${className}-${subject.name}`;

        // Place in timetable
        this.classTimetables[className][dayIdx][period] = {
            subject: subject.name,
            teacher: subject.teacher,
            type: subject.subjectType || 'Core',
            isLabContinuation: isLab,
            blockRemaining: blockRemaining,
            blockSize: subject.blockSize || 2
        };

        // Update tracking only once per lab block
        if (!isLab || blockRemaining === (subject.blockSize || 2) - 1) {
            const tracker = this.subjectPlacementTracker[trackingKey];
            if (tracker) {
                if (isLab) {
                    tracker.remaining -= (subject.blockSize || 2);
                    tracker.placed += (subject.blockSize || 2);
                } else {
                    tracker.remaining -= 1;
                    tracker.placed += 1;
                }
                tracker.dailyCount[day] = (tracker.dailyCount[day] || 0) + 1;
                tracker.lastPlacedSlot = dayIdx * this.PERIODS + period;
            }
        }

        // Ensure teacher tracking is initialized
        if (!this.teacherBusySlots[subject.teacher]) {
            this.teacherBusySlots[subject.teacher] = {};
        }
        if (!this.teacherWeeklyHours[subject.teacher]) {
            this.teacherWeeklyHours[subject.teacher] = 0;
        }
        if (!this.teacherDailyHours[subject.teacher]) {
            this.teacherDailyHours[subject.teacher] = {};
            this.DAYS.forEach(d => {
                if (this.teacherDailyHours[subject.teacher][d] === undefined) {
                    this.teacherDailyHours[subject.teacher][d] = 0;
                }
            });
        }

        // Mark teacher as busy
        this.teacherBusySlots[subject.teacher][slotKey] = true;

        // Update teacher hours
        this.teacherWeeklyHours[subject.teacher] = (this.teacherWeeklyHours[subject.teacher] || 0) + 1;
        this.teacherDailyHours[subject.teacher][day] = (this.teacherDailyHours[subject.teacher][day] || 0) + 1;

        // Update subject period usage for vertical anti-pattern control
        const subjUsage = this.subjectPeriodUsage[className][subject.name] || {};
        subjUsage[period] = (subjUsage[period] || 0) + 1;
        this.subjectPeriodUsage[className][subject.name] = subjUsage;

        this.placements.push({
            day: this.DAYS[dayIdx],
            period: period + 1,
            subject: subject.name,
            teacher: subject.teacher,
            type: isLab ? 'lab' : 'theory',
            className
        });
    }

    _isTeacherAvailable(teacherName, dayIdx, period) {
        const day = this.DAYS[dayIdx];
        const staffMember = this.staff.find(s => s.name === teacherName);
        const availability = staffMember?.availability;
        if (!availability) return true;
        const daySlots = availability[day];
        if (!Array.isArray(daySlots)) return true;
        const v = daySlots[period];
        if (v === undefined) return true;
        return !!v;
    }

    _weightedPick(items) {
        let total = 0;
        for (const it of items) total += it.weight;
        if (total <= 0) return null;
        let r = this._rng() * total;
        for (const it of items) {
            if (r < it.weight) return it;
            r -= it.weight;
        }
        return items[items.length - 1] || null;
    }

    /**
     * Generate staff timetables from class timetables
     */
    _generateStaffTimetables() {
        console.log('\n👨‍🏫 Generating staff timetables...');

        const staffMembers = this.staff.filter(s => s && s.role === 'staff');

        // Initialize staff timetables with FREE periods
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

        // Fill in scheduled periods from class timetables
        this.classes.forEach(cls => {
            if (!cls || !cls.name || !this.classTimetables[cls.name]) return;

            this.DAYS.forEach((day, dayIdx) => {
                const daySchedule = this.classTimetables[cls.name][dayIdx];
                if (!daySchedule) return;

                daySchedule.forEach((slot, period) => {
                    if (slot && slot.teacher && this.staffTimetables[slot.teacher]) {
                        this.staffTimetables[slot.teacher][dayIdx][period] = {
                            subject: slot.subject,
                            class: cls.name,
                            type: slot.type
                        };
                    }
                });
            });
        });

        console.log('✅ Staff timetables generated');
    }
}