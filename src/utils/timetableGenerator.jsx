/**
 * PRACTICAL TIMETABLE GENERATOR - Reliable with Good Distribution
 * 
 * Philosophy:
 * - Will ALWAYS succeed in placing all subjects
 * - Prefers period variety but doesn't force it
 * - Much more flexible constraint relaxation
 * - Optimized for real-world teacher/lab constraints
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
    this.MAX_TEACHER_HOURS = 30;
    this.globalLabDayCount = {};
    this._seed = Date.now();
    this.maxRetries = 10; // More retries
  }

  _random() {
    this._seed = (this._seed * 1664525 + 1013904223) % 4294967296;
    return this._seed / 4294967296;
  }

  _shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(this._random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  _pickRandomFromTopN(candidates, n = 5) {
    if (!candidates.length) return null;
    const topN = candidates.slice(0, Math.min(n, candidates.length));
    return topN[Math.floor(this._random() * topN.length)];
  }

  _getBaseSubjectName(name = '') {
    return name.replace(/\s+lab$/i, '').trim().toLowerCase();
  }

  _isSameBase(a = '', b = '') {
    return this._getBaseSubjectName(a) === this._getBaseSubjectName(b);
  }

  _zone(period) {
    if (period <= 1) return 'Early';
    if (period <= 3) return 'Mid';
    return 'Late';
  }

  validate() {
    const errors = [];
    if (!this.classes.length) errors.push('No classes defined');
    if (!this.staff.filter(s => s?.role === 'staff').length) errors.push('No staff defined');
    if (!this.subjects.length) errors.push('No subjects defined');

    for (const cls of this.classes) {
      const clsSubjects = this.subjects.filter(s => s?.className === cls.name);
      const total = clsSubjects.reduce((sum, s) => sum + (s.hoursPerWeek || 0), 0);
      if (total !== this.TOTAL_HOURS) {
        errors.push(`Class "${cls.name}": total hours ${total} != required ${this.TOTAL_HOURS}`);
      }
    }

    const teacherHours = {};
    for (const s of this.subjects) {
      if (s.teacher && s.teacher !== '-') {
        teacherHours[s.teacher] = (teacherHours[s.teacher] || 0) + (s.hoursPerWeek || 0);
      }
    }

    for (const [t, h] of Object.entries(teacherHours)) {
      if (h > this.MAX_TEACHER_HOURS) {
        errors.push(`Teacher "${t}" overload: ${h}h > ${this.MAX_TEACHER_HOURS}h`);
      }
    }

    return errors.length ? { valid: false, errors } : { valid: true };
  }

  _getClassComplexity(className) {
    const clsSubjects = this.subjects.filter(s => s.className === className);
    const labCount = clsSubjects.filter(s => s.isContinuous).length;
    const uniqueTeachers = new Set(clsSubjects.map(s => s.teacher)).size;
    return labCount * 10 + uniqueTeachers * 5 + clsSubjects.length;
  }

  generate() {
    console.log('TimetableGenerator: start generate (PRACTICAL MODE)');
    const v = this.validate();
    if (!v.valid) {
      console.error('Validation failed:', v.errors);
      return { success: false, error: v.errors.join('; ') };
    }

    for (let attempt = 0; attempt < this.maxRetries; attempt++) {
      console.log(`Generation attempt ${attempt + 1}/${this.maxRetries}`);
      this._seed = Date.now() + attempt * 1000;

      this.classTimetables = {};
      this.teacherSlots = {};
      this.globalLabDayCount = {};

      this.classes.forEach(c => (this.classTimetables[c.name] = this.DAYS.map(() => Array(this.PERIODS).fill(null))));
      this.staff.forEach(s => (this.teacherSlots[s.name] = {}));
      this.DAYS.forEach(d => (this.globalLabDayCount[d] = 0));

      const sortedClasses = [...this.classes].sort((a, b) => {
        return this._getClassComplexity(b.name) - this._getClassComplexity(a.name);
      });

      let ok = true;
      for (const cls of sortedClasses) {
        console.log('Generating for class', cls.name);
        const success = this._generateForClass(cls.name);
        if (!success) {
          console.error(`Failed to generate for class ${cls.name} (attempt ${attempt + 1})`);
          ok = false;
          break;
        }
      }

      if (ok) {
        this._buildStaffTimetables();
        this._validateTeacherConflicts();
        console.log('✓ Generation successful!');
        return { success: true, classTimetables: this.classTimetables, staffTimetables: this.staffTimetables };
      }
    }

    console.error('Failed to generate timetable after all attempts');
    return { success: false, error: 'Unable to generate valid timetable after multiple attempts' };
  }

  _buildStaffTimetables() {
    this.staffTimetables = {};
    for (const s of this.staff) {
      if (!s?.name) continue;
      this.staffTimetables[s.name] = this.DAYS.map(() => Array(this.PERIODS).fill({ subject: 'FREE', class: '-', type: 'free' }));
    }

    for (const [clsName, tt] of Object.entries(this.classTimetables)) {
      tt.forEach((row, dayIdx) => {
        row.forEach((slot, period) => {
          if (slot && slot.teacher && slot.teacher !== '-' && this.staffTimetables[slot.teacher]) {
            this.staffTimetables[slot.teacher][dayIdx][period] = {
              subject: slot.subject,
              class: clsName,
              type: slot.type || 'core'
            };
          }
        });
      });
    }
  }

  _validateTeacherConflicts() {
    let conflicts = 0;
    for (const [teacher, slots] of Object.entries(this.teacherSlots)) {
      const counts = {};
      for (const k of Object.keys(slots)) {
        counts[k] = (counts[k] || 0) + 1;
        if (counts[k] > 1) {
          console.error(`Teacher conflict: ${teacher} at ${k}`);
          conflicts++;
        }
      }
    }
    if (!conflicts) console.log('No teacher conflicts');
  }

  _generateForClass(className) {
    const subjects = this.subjects.filter(s => s.className === className);
    if (!subjects.length) return true;

    const labs = subjects.filter(s => !!s.isContinuous);
    const theory = subjects.filter(s => !s.isContinuous);
    const tt = this.classTimetables[className];

    const tracking = {
      daysUsed: {},
      dayPeriodMap: {},
      periodWeeklyCount: {},
      zonesUsed: {},
      hoursPlaced: {},
      lastPeriod: {},
      subjectBaseDays: {}
    };

    for (const s of theory) {
      tracking.daysUsed[s.name] = new Set();
      tracking.dayPeriodMap[s.name] = {};
      tracking.periodWeeklyCount[s.name] = Array(this.PERIODS).fill(0);
      tracking.zonesUsed[s.name] = new Set();
      tracking.hoursPlaced[s.name] = 0;
      tracking.lastPeriod[s.name] = -1;
      const baseName = this._getBaseSubjectName(s.name);
      tracking.subjectBaseDays[baseName] = tracking.subjectBaseDays[baseName] || new Set();
    }

    const labTracking = {
      daysUsedByLab: {},
      periodsUsedByLab: {},
      blockUsageCount: {},
      hoursPlaced: {},
      lastDayIdx: {}
    };

    const classLabDayCount = {};
    for (let d = 0; d < this.DAYS.length; d++) classLabDayCount[d] = 0;

    for (const lab of labs) {
      labTracking.daysUsedByLab[lab.name] = new Set();
      labTracking.periodsUsedByLab[lab.name] = new Set();
      labTracking.blockUsageCount[lab.name] = {};
      labTracking.hoursPlaced[lab.name] = 0;
      labTracking.lastDayIdx[lab.name] = -1;
    }

    // PHASE A: Place labs
    for (const lab of labs) {
      const hours = lab.hoursPerWeek || 0;
      const blocks = Math.floor(hours / 2);

      for (let b = 0; b < blocks; b++) {
        const ok = this._placeLabBlock_withMaxPerDay(className, lab, tt, labTracking, classLabDayCount);
        if (!ok) {
          console.error(`Impossible to place lab block for ${lab.name} in class ${className}`);
          return false;
        }
        labTracking.hoursPlaced[lab.name] += 2;
      }

      if (hours % 2 === 1) {
        const okSingle = this._placeLabSingle_withMaxPerDay(className, lab, tt, labTracking, classLabDayCount);
        if (okSingle) {
          labTracking.hoursPlaced[lab.name] += 1;
        }
      }
    }

    // PHASE B: Theory subjects with practical approach
    const dailyFirst = theory.filter(s => (s.hoursPerWeek || 0) >= 5);
    const otherTheory = theory.filter(s => (s.hoursPerWeek || 0) < 5);

    // Place daily subjects first
    for (const subj of dailyFirst) {
      for (let dayIdx = 0; dayIdx < this.DAYS.length; dayIdx++) {
        if (tracking.hoursPlaced[subj.name] >= subj.hoursPerWeek) break;
        const res = this._placeTheoryFlexible(className, subj, tt, tracking, labTracking, dayIdx);
        if (res) tracking.hoursPlaced[subj.name] += 1;
      }
    }

    // Place low-hour subjects
    const lowFirstSorted = [...otherTheory].sort((a, b) => (a.hoursPerWeek || 0) - (b.hoursPerWeek || 0));
    for (const s of lowFirstSorted) {
      let attempts = 0;
      while (tracking.hoursPlaced[s.name] < (s.hoursPerWeek || 0) && attempts < 100) {
        const ok = this._placeTheoryFlexible(className, s, tt, tracking, labTracking);
        if (!ok) attempts++;
        else tracking.hoursPlaced[s.name]++;
      }
    }

    // Fill remaining - all subjects
    const allTheory = [...dailyFirst, ...otherTheory];
    for (const s of allTheory) {
      let attempts = 0;
      while (tracking.hoursPlaced[s.name] < (s.hoursPerWeek || 0) && attempts < 300) {
        const ok = this._placeTheoryFlexible(className, s, tt, tracking, labTracking)
          || this._placeTheoryAny(className, s, tt, tracking, labTracking);
        if (!ok) attempts++;
        else tracking.hoursPlaced[s.name]++;
      }

      // Final fallback - just find ANY slot
      while (tracking.hoursPlaced[s.name] < (s.hoursPerWeek || 0)) {
        const placed = this._placeTheoryAny(className, s, tt, tracking, labTracking);
        if (!placed) {
          console.error(`FAILED: Cannot place ${s.name} in ${className}`);
          return false;
        }
        tracking.hoursPlaced[s.name]++;
      }
    }

    const placed = this._countPlacedHours(className);
    if (placed !== this.TOTAL_HOURS) {
      console.error(`Class ${className} final hours ${placed} != ${this.TOTAL_HOURS}`);
      return false;
    }

    return true;
  }

  _countPlacedHours(className) {
    const tt = this.classTimetables[className];
    let cnt = 0;
    for (let d = 0; d < this.DAYS.length; d++) {
      for (let p = 0; p < this.PERIODS; p++) {
        if (tt[d][p]) cnt++;
      }
    }
    return cnt;
  }

  _placeLabBlock_withMaxPerDay(className, lab, tt, labTracking, classLabDayCount) {
    const teacher = lab.teacher;
    const candidates = [];

    for (const dayIdx of this._shuffle([0, 1, 2, 3, 4])) {
      const currentLabPeriods = classLabDayCount[dayIdx] || 0;
      if (currentLabPeriods >= 2) continue;

      for (const startP of this._shuffle([0, 1, 2, 3, 4])) {
        if (startP > this.PERIODS - 2) continue;
        if (tt[dayIdx][startP] || tt[dayIdx][startP + 1]) continue;

        const slot1 = `${this.DAYS[dayIdx]}-P${startP + 1}`;
        const slot2 = `${this.DAYS[dayIdx]}-P${startP + 2}`;
        if (this.teacherSlots[teacher]?.[slot1] || this.teacherSlots[teacher]?.[slot2]) continue;

        if (labTracking.daysUsedByLab[lab.name].has(dayIdx)) continue;

        let score = 100;
        if (!labTracking.daysUsedByLab[lab.name].has(dayIdx)) score += 80;

        const blockKey = `P${startP + 1}-P${startP + 2}`;
        const blockUse = labTracking.blockUsageCount[lab.name][blockKey] || 0;
        if (blockUse === 0) score += 60;
        else score -= blockUse * 50;

        candidates.push({ dayIdx, startP, score, blockKey });
      }
    }

    if (!candidates.length) return false;

    candidates.sort((a, b) => b.score - a.score);
    const pick = this._pickRandomFromTopN(candidates, 6);
    if (!pick) return false;

    tt[pick.dayIdx][pick.startP] = { subject: lab.name, teacher, type: lab.subjectType || 'lab', isLab: true };
    tt[pick.dayIdx][pick.startP + 1] = { subject: lab.name, teacher, type: lab.subjectType || 'lab', isLab: true, isLabContinuation: true };

    const slot1 = `${this.DAYS[pick.dayIdx]}-P${pick.startP + 1}`;
    const slot2 = `${this.DAYS[pick.dayIdx]}-P${pick.startP + 2}`;
    if (!this.teacherSlots[teacher]) this.teacherSlots[teacher] = {};
    this.teacherSlots[teacher][slot1] = className;
    this.teacherSlots[teacher][slot2] = className;

    labTracking.daysUsedByLab[lab.name].add(pick.dayIdx);
    labTracking.periodsUsedByLab[lab.name].add(pick.startP);
    labTracking.blockUsageCount[lab.name][pick.blockKey] = (labTracking.blockUsageCount[lab.name][pick.blockKey] || 0) + 1;
    labTracking.lastDayIdx[lab.name] = pick.dayIdx;

    classLabDayCount[pick.dayIdx] = (classLabDayCount[pick.dayIdx] || 0) + 2;
    this.globalLabDayCount[this.DAYS[pick.dayIdx]] = (this.globalLabDayCount[this.DAYS[pick.dayIdx]] || 0) + 1;

    return true;
  }

  _placeLabSingle_withMaxPerDay(className, lab, tt, labTracking, classLabDayCount) {
    const teacher = lab.teacher;
    const candidates = [];

    for (const dayIdx of this._shuffle([0, 1, 2, 3, 4])) {
      const current = classLabDayCount[dayIdx] || 0;
      if (current + 1 > 2) continue;

      for (const p of this._shuffle([0, 1, 2, 3, 4, 5])) {
        if (tt[dayIdx][p]) continue;

        const slot = `${this.DAYS[dayIdx]}-P${p + 1}`;
        if (this.teacherSlots[teacher]?.[slot]) continue;

        if (labTracking.daysUsedByLab[lab.name].has(dayIdx)) continue;

        let score = 80;
        if (!labTracking.daysUsedByLab[lab.name].has(dayIdx)) score += 40;

        candidates.push({ dayIdx, p, score });
      }
    }

    if (!candidates.length) return false;

    candidates.sort((a, b) => b.score - a.score);
    const pick = this._pickRandomFromTopN(candidates, 6);
    if (!pick) return false;

    tt[pick.dayIdx][pick.p] = { subject: lab.name, teacher, type: lab.subjectType || 'lab', isLab: true, isLabSingle: true };

    const slotKey = `${this.DAYS[pick.dayIdx]}-P${pick.p + 1}`;
    if (!this.teacherSlots[teacher]) this.teacherSlots[teacher] = {};
    this.teacherSlots[teacher][slotKey] = className;

    labTracking.daysUsedByLab[lab.name].add(pick.dayIdx);
    labTracking.periodsUsedByLab[lab.name].add(pick.p);

    classLabDayCount[pick.dayIdx] = (classLabDayCount[pick.dayIdx] || 0) + 1;
    this.globalLabDayCount[this.DAYS[pick.dayIdx]] = (this.globalLabDayCount[this.DAYS[pick.dayIdx]] || 0) + 1;

    return true;
  }

  // ==================== PRACTICAL: Good preference with high flexibility ====================

  _placeTheoryFlexible(className, subj, tt, tracking, labTracking, preferredDayIdx = null) {
    const teacher = subj.teacher;
    const candidates = [];

    const daysToTry = preferredDayIdx !== null ? [preferredDayIdx] : this._shuffle([0, 1, 2, 3, 4]);

    for (const dayIdx of daysToTry) {
      for (const p of this._shuffle([0, 1, 2, 3, 4, 5])) {
        if (tt[dayIdx][p]) continue;

        const slotKey = `${this.DAYS[dayIdx]}-P${p + 1}`;
        if (this.teacherSlots[teacher]?.[slotKey]) continue;

        // Avoid adjacent same subject (keep this rule)
        if (p > 0 && tt[dayIdx][p - 1] && this._isSameBase(tt[dayIdx][p - 1].subject, subj.name)) continue;
        if (p < this.PERIODS - 1 && tt[dayIdx][p + 1] && this._isSameBase(tt[dayIdx][p + 1].subject, subj.name)) continue;

        let score = 100;

        // MODERATE preference for period variety (not blocking)
        const useCount = tracking.periodWeeklyCount[subj.name][p] || 0;
        if (useCount === 0) {
          score += 80; // Good bonus
        } else if (useCount === 1) {
          score -= 20; // Small penalty
        } else if (useCount === 2) {
          score -= 40; // Moderate penalty
        } else {
          score -= 60; // Larger penalty but still allows
        }

        // Bonus for new day
        if (!tracking.daysUsed[subj.name].has(dayIdx)) score += 30;

        // Bonus for new zone
        const z = this._zone(p);
        if (!tracking.zonesUsed[subj.name].has(z)) score += 20;

        // Small penalty for vertical same period
        if (dayIdx > 0 && tracking.dayPeriodMap[subj.name]?.[dayIdx - 1] === p) {
          score -= 15; // Small penalty, not blocking
        }

        // Small penalty for diagonal
        const prevP = tracking.dayPeriodMap[subj.name]?.[dayIdx - 1];
        if (prevP !== undefined && prevP !== null && (p === prevP - 1 || p === prevP + 1)) {
          score -= 10; // Small penalty, not blocking
        }

        candidates.push({ dayIdx, p, score });
      }
    }

    if (!candidates.length) return false;

    candidates.sort((a, b) => b.score - a.score);
    const pick = this._pickRandomFromTopN(candidates, 8); // Wider selection
    if (!pick) return false;

    tt[pick.dayIdx][pick.p] = { subject: subj.name, teacher, type: subj.subjectType || 'core' };

    const slotKey = `${this.DAYS[pick.dayIdx]}-P${pick.p + 1}`;
    if (!this.teacherSlots[teacher]) this.teacherSlots[teacher] = {};
    this.teacherSlots[teacher][slotKey] = className;

    tracking.daysUsed[subj.name].add(pick.dayIdx);
    tracking.dayPeriodMap[subj.name][pick.dayIdx] = pick.p;
    tracking.periodWeeklyCount[subj.name][pick.p] = (tracking.periodWeeklyCount[subj.name][pick.p] || 0) + 1;
    tracking.zonesUsed[subj.name].add(this._zone(pick.p));
    tracking.lastPeriod[subj.name] = pick.p;
    tracking.subjectBaseDays[this._getBaseSubjectName(subj.name)].add(pick.dayIdx);

    return true;
  }

  _placeTheoryAny(className, subj, tt, tracking, labTracking) {
    const teacher = subj.teacher;

    // Just find ANY available slot
    for (let dayIdx = 0; dayIdx < 5; dayIdx++) {
      for (let p = 0; p < this.PERIODS; p++) {
        if (tt[dayIdx][p]) continue;

        const slotKey = `${this.DAYS[dayIdx]}-P${p + 1}`;
        if (this.teacherSlots[teacher]?.[slotKey]) continue;

        // Only avoid adjacent same subject
        if (p > 0 && tt[dayIdx][p - 1] && this._isSameBase(tt[dayIdx][p - 1].subject, subj.name)) continue;
        if (p < this.PERIODS - 1 && tt[dayIdx][p + 1] && this._isSameBase(tt[dayIdx][p + 1].subject, subj.name)) continue;

        // Place it!
        tt[dayIdx][p] = { subject: subj.name, teacher, type: subj.subjectType || 'core' };

        if (!this.teacherSlots[teacher]) this.teacherSlots[teacher] = {};
        this.teacherSlots[teacher][slotKey] = className;

        tracking.daysUsed[subj.name].add(dayIdx);
        tracking.dayPeriodMap[subj.name][dayIdx] = p;
        tracking.periodWeeklyCount[subj.name][p] = (tracking.periodWeeklyCount[subj.name][p] || 0) + 1;
        tracking.zonesUsed[subj.name].add(this._zone(p));
        tracking.lastPeriod[subj.name] = p;
        tracking.subjectBaseDays[this._getBaseSubjectName(subj.name)].add(dayIdx);

        return true;
      }
    }

    // ULTRA desperate - allow even adjacent if needed
    for (let dayIdx = 0; dayIdx < 5; dayIdx++) {
      for (let p = 0; p < this.PERIODS; p++) {
        if (tt[dayIdx][p]) continue;

        const slotKey = `${this.DAYS[dayIdx]}-P${p + 1}`;
        if (this.teacherSlots[teacher]?.[slotKey]) continue;

        tt[dayIdx][p] = { subject: subj.name, teacher, type: subj.subjectType || 'core' };

        if (!this.teacherSlots[teacher]) this.teacherSlots[teacher] = {};
        this.teacherSlots[teacher][slotKey] = className;

        tracking.daysUsed[subj.name].add(dayIdx);
        tracking.dayPeriodMap[subj.name][dayIdx] = p;
        tracking.periodWeeklyCount[subj.name][p] = (tracking.periodWeeklyCount[subj.name][p] || 0) + 1;
        tracking.zonesUsed[subj.name].add(this._zone(p));
        tracking.lastPeriod[subj.name] = p;
        tracking.subjectBaseDays[this._getBaseSubjectName(subj.name)].add(dayIdx);

        return true;
      }
    }

    return false;
  }
}