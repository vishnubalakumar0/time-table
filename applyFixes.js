const fs = require('fs');
const path = require('path');

const filePath = 'src/components/AdminDashboard.jsx';
let file = fs.readFileSync(filePath, 'utf8');

// FIX 2 & 3: Replace entire deleteClassTimetable function
const oldFunc = \  // Delete Class Timetable (like class/staff/subject delete)
  const deleteClassTimetable = async (className) => {
    if (!window.confirm(\\\Delete timetable for \?\nThis will only delete the class timetable, not staff timetables.\\\)) return;

    try {
      if (!timetable || !timetable.classTimetables || !timetable.classTimetables[className]) {
        return showToast('Timetable not found', 'error');
      }

      // Save for undo
      const deletedTimetableData = timetable.classTimetables[className];
      const undoItem = {
        type: 'classTimetable',
        className: className,
        data: deletedTimetableData
      };

      // Remove from timetable
      const updatedClassTimetables = { ...timetable.classTimetables };
      delete updatedClassTimetables[className];

      // Update Firebase
      const ttRef = collection(db, 'timetable');
      const existing = await getDocs(ttRef);

      if (!existing.empty) {
        await updateDoc(doc(db, 'timetable', existing.docs[0].id), {
          classTimetables: updatedClassTimetables
        });
      }

      // Update state
      setTimetable({
        ...timetable,
        classTimetables: updatedClassTimetables
      });

      showToast(\\\Timetable for \ deleted\\\, 'success', 5000, () => restoreFromUndo(undoItem));
    } catch (error) {
      console.error('Delete timetable error:', error);
      showToast('Failed to delete timetable', 'error');
    }
  };\;

const newFunc = \  // Delete Class Timetable (like class/staff/subject delete)
  const deleteClassTimetable = async (className) => {
    if (!window.confirm(\\\Delete timetable for \?\nThis will also clean up references in staff timetables.\\\)) return;

    try {
      if (!timetable || !timetable.classTimetables || !timetable.classTimetables[className]) {
        return showToast('Timetable not found', 'error');
      }

      // Save for undo
      const deletedTimetableData = timetable.classTimetables[className];
      const undoItem = {
        type: 'classTimetable',
        className: className,
        data: deletedTimetableData
      };

      // Remove from class timetables
      const updatedClassTimetables = { ...timetable.classTimetables };
      delete updatedClassTimetables[className];

      // FIX 3: Clean up staff timetables - remove references to deleted class
      const updatedStaffTimetables = { ...timetable.staffTimetables };
      Object.keys(updatedStaffTimetables).forEach(staff => {
        updatedStaffTimetables[staff] = updatedStaffTimetables[staff].map(day =>
          day.map(p =>
            p?.class === className ? { subject: 'FREE', class: '-', type: 'free' } : p
          )
        );
      });

      // FIX 2: Convert to flat format before saving to Firestore
      const flatClassTimetables = {};
      Object.keys(updatedClassTimetables).forEach(cls => {
        const nestedData = updatedClassTimetables[cls];
        if (Array.isArray(nestedData) && Array.isArray(nestedData[0])) {
          // Nested format - convert to flat
          flatClassTimetables[cls] = nestedData.flatMap((day, d) =>
            day.map((p, i) => ({
              day: d,
              period: i,
              subject: p?.subject || null,
              teacher: p?.teacher || null,
              type: p?.type || null
            }))
          );
        } else {
          // Already flat or empty
          flatClassTimetables[cls] = nestedData || [];
        }
      });

      const flatStaffTimetables = {};
      Object.keys(updatedStaffTimetables).forEach(staff => {
        flatStaffTimetables[staff] = updatedStaffTimetables[staff].flatMap((day, d) =>
          day.map((p, i) => ({
            day: d,
            period: i,
            subject: p?.subject || null,
            class: p?.class || null,
            type: p?.type || null
          }))
        );
      });

      // Update Firebase with flat format
      const ttRef = collection(db, 'timetable');
      const existing = await getDocs(ttRef);

      if (!existing.empty) {
        await updateDoc(doc(db, 'timetable', existing.docs[0].id), {
          classTimetables: flatClassTimetables,
          staffTimetables: flatStaffTimetables
        });
      }

      // Update state with nested format for UI
      setTimetable({
        classTimetables: updatedClassTimetables,
        staffTimetables: updatedStaffTimetables
      });

      showToast(\\\Timetable for \ deleted\\\, 'success', 5000, () => restoreFromUndo(undoItem));
    } catch (error) {
      console.error('Delete timetable error:', error);
      showToast('Failed to delete timetable', 'error');
    }
  };\;

if (file.includes(oldFunc)) {
  file = file.replace(oldFunc, newFunc);
  console.log(' FIX 2 applied: Convert to flat format before saving to Firestore');
  console.log(' FIX 3 applied: Clean up staff timetable references when deleting class timetable');
  fs.writeFileSync(filePath, file, 'utf8');
  console.log('\n All fixes applied successfully!');
} else {
  console.log(' Could not find exact match for deleteClassTimetable function');
  console.log('File may need manual update');
}
