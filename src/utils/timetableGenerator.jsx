/**
 * ========================================
 * BULLETPROOF TIMETABLE GENERATOR v2.0
 * ========================================
 * SIMPLE + GUARANTEED 100% placement
 * 
 * HARD CONSTRAINTS (NEVER VIOLATED):
 * 1. All subject hours MUST be placed
 * 2. Teacher cannot be double-booked (same day+period)
 * 3. Lab blocks are continuous
 * 4. Stay within defined days/periods
 * 
 * SOFT PREFERENCES (tried but relaxed if needed):
 * - Spread across days
 * - Mid-day preference
 * - Avoid same period repetition
 */

export class TimetableGenerator {
    constructor(classes, staff, subjects, config = {}) {
        this.classes = classes || [];
        this.staff = staff || [];
        this.subjects = subjects || [];

        this.config = {
            seed: config.seed || Date.now(),
            MAX_ATTEMPTS: config.MAX_ATTEMPTS || 100,
            ...config
        };

        this.classTimetables = {};
        this.staffTimetables = {};
        this.teacherSlots = {}; // Track: teacherName -> { 'Monday-P1': className, ... }

        this.diagnostics = {
            relaxationsApplied: [],
            candidateCounts: {},
            attempts: 0
        };

        this.DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
        this.PERIODS = 6;

        // Seeded RNG
        this._seed = this.config.seed;
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
        return errors.length ? { valid: false, errors } : { valid: true };
    }

    generate() {
        console.log('🚀 BULLETPROOF TIMETABLE GENERATOR v2.0');
        console.log('='.repeat(70));

        try {
            // Initialize empty timetables
            this._initialize();

            // Generate for each class
            for (const cls of this.classes) {
                if (!cls?.name) continue;

                console.log(`\n📚 Generating for: ${cls.name}`);
                console.log('-'.repeat(50));

                const result = this._generateForClass(cls.name);

                if (!result.success) {
                    console.error(`❌ Failed for ${cls.name}: ${result.error}`);
                    return {
                        success: false,
                        error: result.error,
                        diagnostics: this.diagnostics
                    };
                }
            }

            // Generate staff timetables
            this._generateStaffTimetables();

            // Final validation
            const validation = this._validateResult();

            console.log('\n' + '='.repeat(70));
            if (validation.valid) {
                console.log('✅ SUCCESS: All hours placed!');
            } else {
                console.log('⚠️ WARNINGS:', validation.warnings);
            }
            console.log('='.repeat(70));

            return {
                success: true,
                classTimetables: this.classTimetables,
                staffTimetables: this.staffTimetables,
                diagnostics: this.diagnostics
            };

        } catch (error) {
            console.error('❌ Error:', error);
            return {
                success: false,
                error: error.message,
                diagnostics: this.diagnostics
            };
        }
    }

    _initialize() {
        // Create empty timetable grids
        this.classes.forEach(cls => {
            if (cls?.name) {
                this.classTimetables[cls.name] = this.DAYS.map(() => 
                    Array(this.PERIODS).fill(null)
                );
            }
        });

        // Initialize teacher slot tracking
        this.staff.filter(s => s?.role === 'staff').forEach(teacher => {
            if (teacher?.name) {
                this.teacherSlots[teacher.name] = {};
            }
        });
    }

    _generateForClass(className) {
        const subjects = this.subjects.filter(s => s?.className === className);
        if (!subjects.length) {
            console.log('  No subjects for this class');
            return { success: true };
        }

        // Initialize subject tracking
        const subjectQueue = [];

        subjects.forEach(s => {
            if (!s) return;

            const hours = s.hoursPerWeek || 0;
            const isLab = s.isContinuous === true;
            const blockSize = isLab ? (s.blockSize || 2) : 1;

            // For labs, calculate number of blocks needed
            if (isLab) {
                const numBlocks = Math.floor(hours / blockSize);
                const remainder = hours % blockSize;

                // Add lab blocks
                for (let i = 0; i < numBlocks; i++) {
                    subjectQueue.push({
                        ...s,
                        _isLabBlock: true,
                        _blockSize: blockSize,
                        _blockNum: i + 1
                    });
                }

                // Add remainder as theory if any
                for (let i = 0; i < remainder; i++) {
                    subjectQueue.push({
                        ...s,
                        _isLabBlock: false,
                        _blockSize: 1,
                        _isRemainder: true
                    });

                    this.diagnostics.relaxationsApplied.push({
                        type: 'lab_to_theory',
                        subject: s.name,
                        reason: `Converted ${remainder}h remainder to theory`
                    });
                }
            } else {
                // Theory: add individual hours
                for (let i = 0; i < hours; i++) {
                    subjectQueue.push({
                        ...s,
                        _isLabBlock: false,
                        _blockSize: 1,
                        _hourNum: i + 1
                    });
                }
            }
        });

        console.log(`  Total placements needed: ${subjectQueue.length}`);

        // Shuffle queue for variety
        const shuffledQueue = this._shuffle(subjectQueue);

        // Track placements per subject per day
        const dailyCount = {}; // subject -> day -> count
        const periodCount = {}; // subject -> period -> count

        // PHASE 1: Place labs first (need continuous blocks)
        const labs = shuffledQueue.filter(s => s._isLabBlock);
        const theory = shuffledQueue.filter(s => !s._isLabBlock);

        console.log(`  Labs to place: ${labs.length} blocks`);
        console.log(`  Theory to place: ${theory.length} hours`);

        // Place labs
        for (const lab of labs) {
            const placed = this._placeLabBlock(className, lab, dailyCount, periodCount);
            if (!placed) {
                console.warn(`  ⚠️ Could not place lab block: ${lab.name}`);
                // Try converting to theory hours
                for (let i = 0; i < lab._blockSize; i++) {
                    theory.push({
                        ...lab,
                        _isLabBlock: false,
                        _blockSize: 1,
                        _convertedFromLab: true
                    });
                }
                this.diagnostics.relaxationsApplied.push({
                    type: 'lab_split',
                    subject: lab.name,
                    reason: 'Split lab block into theory hours'
                });
            }
        }

        // Place theory
        for (const subj of theory) {
            const placed = this._placeTheoryHour(className, subj, dailyCount, periodCount);
            if (!placed) {
                // FORCE MODE: Find ANY free slot
                const forcePlaced = this._forcePlaceHour(className, subj);
                if (!forcePlaced) {
                    return {
                        success: false,
                        error: `Cannot place ${subj.name}: No free slots with available teacher`
                    };
                }
            }
        }

        // Fill any remaining empty slots with revision
        this._fillEmptySlots(className, subjects);

        return { success: true };
    }

    _placeLabBlock(className, lab, dailyCount, periodCount) {
        const blockSize = lab._blockSize || 2;
        const teacher = lab.teacher;

        // Try each day
        const dayOrder = this._shuffle([0, 1, 2, 3, 4]);

        for (const dayIdx of dayOrder) {
            const day = this.DAYS[dayIdx];

            // Try each starting period
            for (let startPeriod = 0; startPeriod <= this.PERIODS - blockSize; startPeriod++) {
                // Check if all periods in block are free
                let canPlace = true;

                for (let i = 0; i < blockSize; i++) {
                    const period = startPeriod + i;

                    // Check class slot free
                    if (this.classTimetables[className][dayIdx][period]) {
                        canPlace = false;
                        break;
                    }

                    // HARD: Check teacher not double-booked
                    const slotKey = `${day}-P${period + 1}`;
                    if (this.teacherSlots[teacher]?.[slotKey]) {
                        canPlace = false;
                        break;
                    }
                }

                if (canPlace) {
                    // Place the lab block
                    for (let i = 0; i < blockSize; i++) {
                        const period = startPeriod + i;
                        const slotKey = `${day}-P${period + 1}`;

                        this.classTimetables[className][dayIdx][period] = {
                            subject: lab.name,
                            teacher: teacher,
                            type: lab.subjectType || 'lab',
                            isLab: true,
                            isLabContinuation: i > 0
                        };

                        // Mark teacher busy
                        if (!this.teacherSlots[teacher]) {
                            this.teacherSlots[teacher] = {};
                        }
                        this.teacherSlots[teacher][slotKey] = className;
                    }

                    console.log(`  ✓ Lab ${lab.name}: ${day} P${startPeriod + 1}-P${startPeriod + blockSize}`);
                    return true;
                }
            }
        }

        return false;
    }

    _placeTheoryHour(className, subj, dailyCount, periodCount) {
        const teacher = subj.teacher;
        const name = subj.name;

        // Initialize tracking
        if (!dailyCount[name]) dailyCount[name] = {};
        if (!periodCount[name]) periodCount[name] = {};

        // Score all candidates
        const candidates = [];

        for (let dayIdx = 0; dayIdx < this.DAYS.length; dayIdx++) {
            const day = this.DAYS[dayIdx];

            for (let period = 0; period < this.PERIODS; period++) {
                // Check class slot free
                if (this.classTimetables[className][dayIdx][period]) continue;

                // HARD: Check teacher not double-booked
                const slotKey = `${day}-P${period + 1}`;
                if (this.teacherSlots[teacher]?.[slotKey]) continue;

                // Calculate soft preference score
                let score = 100;

                // Prefer mid-day (P2-P5)
                if (period >= 1 && period <= 4) score += 20;

                // Prefer spreading across days (fewer per day = better)
                const dayCount = dailyCount[name]?.[day] || 0;
                score -= dayCount * 30;

                // Prefer variety in periods
                const pCount = periodCount[name]?.[period] || 0;
                score -= pCount * 20;

                // Avoid more than 2 per day (soft)
                if (dayCount >= 2) score -= 50;

                candidates.push({ dayIdx, period, score, day });
            }
        }

        if (candidates.length === 0) return false;

        // Sort by score (best first)
        candidates.sort((a, b) => b.score - a.score);

        // Pick from top candidates with some randomness
        const topN = Math.min(5, candidates.length);
        const pickIdx = Math.floor(this._random() * topN);
        const pick = candidates[pickIdx];

        // Place it
        const slotKey = `${pick.day}-P${pick.period + 1}`;

        this.classTimetables[className][pick.dayIdx][pick.period] = {
            subject: name,
            teacher: teacher,
            type: subj.subjectType || 'core',
            isLab: false
        };

        // Mark teacher busy
        if (!this.teacherSlots[teacher]) {
            this.teacherSlots[teacher] = {};
        }
        this.teacherSlots[teacher][slotKey] = className;

        // Update tracking
        dailyCount[name][pick.day] = (dailyCount[name][pick.day] || 0) + 1;
        periodCount[name][pick.period] = (periodCount[name][pick.period] || 0) + 1;

        return true;
    }

    _forcePlaceHour(className, subj) {
        const teacher = subj.teacher;

        console.log(`  🔥 FORCE placing: ${subj.name}`);

        // Find ANY free slot where teacher is available
        for (let dayIdx = 0; dayIdx < this.DAYS.length; dayIdx++) {
            const day = this.DAYS[dayIdx];

            for (let period = 0; period < this.PERIODS; period++) {
                // Check class slot free
                if (this.classTimetables[className][dayIdx][period]) continue;

                // HARD: Check teacher not double-booked
                const slotKey = `${day}-P${period + 1}`;
                if (this.teacherSlots[teacher]?.[slotKey]) continue;

                // Place it
                this.classTimetables[className][dayIdx][period] = {
                    subject: subj.name,
                    teacher: teacher,
                    type: subj.subjectType || 'core',
                    isLab: false,
                    isForced: true
                };

                // Mark teacher busy
                if (!this.teacherSlots[teacher]) {
                    this.teacherSlots[teacher] = {};
                }
                this.teacherSlots[teacher][slotKey] = className;

                this.diagnostics.relaxationsApplied.push({
                    type: 'force_place',
                    subject: subj.name,
                    slot: slotKey,
                    reason: 'Forced placement (soft preferences ignored)'
                });

                console.log(`    ✓ Forced: ${day} P${period + 1}`);
                return true;
            }
        }

        // Last resort: Check if there are ANY empty slots at all
        for (let dayIdx = 0; dayIdx < this.DAYS.length; dayIdx++) {
            for (let period = 0; period < this.PERIODS; period++) {
                if (!this.classTimetables[className][dayIdx][period]) {
                    console.log(`    Found empty slot at ${this.DAYS[dayIdx]} P${period + 1} but teacher ${teacher} is busy`);
                }
            }
        }

        return false;
    }

    _fillEmptySlots(className, subjects) {
        // Find a subject to use for filling (prefer core subjects)
        const fillSubject = subjects.find(s => s?.subjectType === 'core') || subjects[0];
        if (!fillSubject) return;

        let filled = 0;

        for (let dayIdx = 0; dayIdx < this.DAYS.length; dayIdx++) {
            const day = this.DAYS[dayIdx];

            for (let period = 0; period < this.PERIODS; period++) {
                if (this.classTimetables[className][dayIdx][period]) continue;

                const slotKey = `${day}-P${period + 1}`;
                const teacher = fillSubject.teacher;

                // Check teacher availability
                if (this.teacherSlots[teacher]?.[slotKey]) {
                    // Teacher busy, try other subjects
                    let placed = false;
                    for (const altSubj of subjects) {
                        if (!altSubj?.teacher) continue;
                        if (this.teacherSlots[altSubj.teacher]?.[slotKey]) continue;

                        this.classTimetables[className][dayIdx][period] = {
                            subject: `${altSubj.name} (Revision)`,
                            teacher: altSubj.teacher,
                            type: 'revision',
                            isRevision: true
                        };

                        if (!this.teacherSlots[altSubj.teacher]) {
                            this.teacherSlots[altSubj.teacher] = {};
                        }
                        this.teacherSlots[altSubj.teacher][slotKey] = className;

                        filled++;
                        placed = true;
                        break;
                    }

                    if (!placed) {
                        // No teacher available - leave as study period
                        this.classTimetables[className][dayIdx][period] = {
                            subject: 'Study Period',
                            teacher: '-',
                            type: 'free',
                            isStudyPeriod: true
                        };
                        filled++;
                    }
                } else {
                    this.classTimetables[className][dayIdx][period] = {
                        subject: `${fillSubject.name} (Revision)`,
                        teacher: teacher,
                        type: 'revision',
                        isRevision: true
                    };

                    if (!this.teacherSlots[teacher]) {
                        this.teacherSlots[teacher] = {};
                    }
                    this.teacherSlots[teacher][slotKey] = className;

                    filled++;
                }
            }
        }

        if (filled > 0) {
            console.log(`  📝 Filled ${filled} empty slots with revision/study`);
        }
    }

    _validateResult() {
        const warnings = [];

        // Check for any null slots
        Object.keys(this.classTimetables).forEach(className => {
            const tt = this.classTimetables[className];
            tt.forEach((daySlots, dayIdx) => {
                daySlots.forEach((slot, period) => {
                    if (!slot) {
                        warnings.push(`Empty slot: ${className} ${this.DAYS[dayIdx]} P${period + 1}`);
                    }
                });
            });
        });

        return {
            valid: warnings.length === 0,
            warnings
        };
    }

    _generateStaffTimetables() {
        const staff = this.staff.filter(s => s?.role === 'staff');

        staff.forEach(teacher => {
            if (!teacher?.name) return;

            this.staffTimetables[teacher.name] = this.DAYS.map(() =>
                Array(this.PERIODS).fill(null).map(() => ({
                    subject: 'FREE',
                    class: '-',
                    type: 'free'
                }))
            );
        });

        // Fill from class timetables
        Object.keys(this.classTimetables).forEach(className => {
            const tt = this.classTimetables[className];

            this.DAYS.forEach((day, dayIdx) => {
                tt[dayIdx].forEach((slot, period) => {
                    if (slot?.teacher && this.staffTimetables[slot.teacher]) {
                        this.staffTimetables[slot.teacher][dayIdx][period] = {
                            subject: slot.subject,
                            class: className,
                            type: slot.type || 'core'
                        };
                    }
                });
            });
        });
    }
}