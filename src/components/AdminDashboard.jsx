import { useState, useEffect, useRef } from 'react';
import AnimatedBackground from './AnimatedBackground';
import { ToastContainer } from './Toast';
import HoursTracker from './HoursTracker';
import TimetableGrid from './timetableGrid';
import StaffTimetableGrid from './StaffTimetableGrid';
import { exportToPDF } from '../utils/pdfUtils';
import { TimetableGenerator } from '../utils/timetableGenerator';

import { auth, db } from '../utils/firebase';
import { createUserWithEmailAndPassword, updatePassword, signInWithEmailAndPassword } from 'firebase/auth';
import {
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    updateDoc,
    doc,
    setDoc,
} from 'firebase/firestore';


export default function AdminDashboard({ user, onLogout }) {
    const [classes, setClasses] = useState([]);
    const [staff, setStaff] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [timetable, setTimetable] = useState(null);
    const [toasts, setToasts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddStaffForm, setShowAddStaffForm] = useState(false);
    const [showAddSubjectForm, setShowAddSubjectForm] = useState(false);
    const [showAddClassForm, setShowAddClassForm] = useState(false);
    const [activeTab, setActiveTab] = useState('classes');

    // Refs for scrolling
    const staffFormRef = useRef(null);
    const subjectFormRef = useRef(null);

    // Form Models
    const [newClass, setNewClass] = useState({ name: '', hallNumber: '' });
    const [newStaff, setNewStaff] = useState({
        id: null,
        name: '',
        username: '',
        password: '',
        freePeriodMode: 'auto',
        manualFreePeriods: 0
    });
    const [newSubject, setNewSubject] = useState({
        id: null,
        className: '',
        name: '',
        subjectType: 'Core',
        hoursPerWeek: 6,
        isContinuous: false,
        blockSize: 2,
        teacher: ''
    });


    const teachers = staff.filter(s => s.role === "staff");

    const showToast = (message, type, duration = 3000, undoAction = null) => {
        const newToast = { message, type, id: Date.now(), undoAction };
        setToasts(prev => [...prev, newToast]);
        setTimeout(() => removeToast(newToast.id), duration);
    };

    const removeToast = (id) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    };

    const convertFlatToNested = (flatTimetable) => {
        if (!flatTimetable) return null;

        const nested = {};

        Object.keys(flatTimetable).forEach(key => {
            const slots = flatTimetable[key];

            if (Array.isArray(slots) && slots.length > 0 && Array.isArray(slots[0])) {
                nested[key] = slots;
            } else if (Array.isArray(slots)) {
                const days = [[], [], [], [], []];

                slots.forEach(slot => {
                    if (slot && typeof slot.day === 'number' && typeof slot.period === 'number') {
                        if (!days[slot.day]) days[slot.day] = [];
                        days[slot.day][slot.period] = {
                            subject: slot.subject,
                            teacher: slot.teacher,
                            class: slot.class,
                            type: slot.type
                        };
                    }
                });

                days.forEach((day, idx) => {
                    if (!days[idx]) days[idx] = [];
                    for (let p = 0; p < 6; p++) {
                        if (!days[idx][p]) {
                            days[idx][p] = slots[0]?.class !== undefined 
                                ? { subject: 'FREE', class: '-', type: 'free' }
                                : null;
                        }
                    }
                });

                nested[key] = days;
            }
        });

        return nested;
    };

    const fetchData = async () => {
        setLoading(true);

        try {
            const [cls, st, sb, tt] = await Promise.all([
                getDocs(collection(db, 'classes')),
                getDocs(collection(db, 'staff')),
                getDocs(collection(db, 'subjects')),
                getDocs(collection(db, 'timetable'))
            ]);

            setClasses(cls.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            setStaff(st.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            setSubjects(sb.docs.map(doc => ({ id: doc.id, ...doc.data() })));

            if (!tt.empty) {
                const ttData = tt.docs[0].data();
                const convertedData = {
                    classTimetables: convertFlatToNested(ttData.classTimetables),
                    staffTimetables: convertFlatToNested(ttData.staffTimetables)
                };
                setTimetable(convertedData);
            }
        } catch (error) {
            showToast('❌ Error loading data: ' + error.message, 'error');
            console.error(error);
        }

        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    // ==================== UNDO HANDLER ====================
  

// Undo handler: correctly restore by document id—no duplicates!
// ==================== UNDO HANDLER ====================
  const restoreFromUndo = async (undoItem) => {
    try {
      if (undoItem.type === 'class') {
        const { id, ...classData } = undoItem.data;
        await setDoc(doc(db, 'classes', id), classData);
      } else if (undoItem.type === 'staff') {
        const { id, ...staffData } = undoItem.data;
        await setDoc(doc(db, 'staff', id), staffData);
        if (undoItem.data.firebaseUid) {
          await setDoc(doc(db, 'users', undoItem.data.firebaseUid), {
            name: undoItem.data.name,
            username: undoItem.data.username,
            role: 'staff'
          });
        }
      } else if (undoItem.type === 'subject') {
        const { id, ...subjectData } = undoItem.data;
        await setDoc(doc(db, 'subjects', id), subjectData);
      }
      await fetchData(); // reload UI
      showToast('✅ Data restored!', 'success');
    } catch (error) {
      console.error('Restore error:', error);
      showToast('❌ Restore failed: ' + error.message, 'error');
    }
    };



    // ==================== CLASS CRUD ====================
    const addClass = async () => {
        if (!newClass.name) return showToast("Enter class name", "error");
        if (classes.find(c => c.name === newClass.name && !newClass.id))
            return showToast("Class already exists", "error");

        try {
            if (newClass.id) {
                await updateDoc(doc(db, 'classes', newClass.id), { 
                    name: newClass.name, 
                    hallNumber: newClass.hallNumber
                });
                setClasses(classes.map(c => c.id === newClass.id ? { id: newClass.id, ...newClass } : c));
                showToast("✅ Class updated!", "success");
            } else {
                const docRef = await addDoc(collection(db, 'classes'), { 
                    name: newClass.name, 
                    hallNumber: newClass.hallNumber || ''
                });
                setClasses([...classes, { id: docRef.id, name: newClass.name, hallNumber: newClass.hallNumber || '' }]);
                showToast("✅ Class added!", "success");
            }
            setNewClass({ name: '', hallNumber: '' });
        } catch (error) {
            showToast("❌ Operation failed", "error");
        }
    };

    const editClass = (cls) => {
        setNewClass({ id: cls.id, name: cls.name, hallNumber: cls.hallNumber || '' });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Department features removed

// ==================== CLASS CRUD ====================
  const deleteClass = async (id) => {
    if (!window.confirm("Delete this class?")) return;
    try {
      const classToDelete = classes.find(c => c.id === id);
      if (!classToDelete) return;
      const undoItem = { type: 'class', data: { ...classToDelete } };
      await deleteDoc(doc(db, 'classes', id));
      setClasses(classes.filter(c => c.id !== id));
      showToast(
        `✅ Class deleted`,
        'success',
        5000,
        () => restoreFromUndo(undoItem)
      );
    } catch (error) {
      console.error('Delete error:', error);
      showToast("❌ Failed to delete", "error");
    }
  };

    // ==================== STAFF CRUD ====================
    const addOrUpdateStaff = async () => {
        if (!newStaff.name || !newStaff.username)
            return showToast("Fill all required fields", "error");

        try {
            if (newStaff.id) {
                // Editing existing staff
                const staffToUpdate = staff.find(s => s.id === newStaff.id);
                const { password, ...updateData } = newStaff;
                
                // Update Firestore staff document with name, freePeriodMode, manualFreePeriods
                const firestoreUpdateData = {
                    name: updateData.name,
                    freePeriodMode: updateData.freePeriodMode,
                    manualFreePeriods: updateData.manualFreePeriods
                };
                
                // Include username if it changed
                if (staffToUpdate.username !== updateData.username) {
                    firestoreUpdateData.username = updateData.username;
                }
                
                await updateDoc(doc(db, 'staff', newStaff.id), firestoreUpdateData);
                
                // Update users collection with new data
                if (staffToUpdate.firebaseUid) {
                    await updateDoc(doc(db, 'users', staffToUpdate.firebaseUid), {
                        name: newStaff.name,
                        username: newStaff.username,
                        role: 'staff'
                    });
                }
                
                // Handle password change if provided
                if (password && password.trim()) {
                    await updateDoc(doc(db, 'staff', newStaff.id), {
                        tempPassword: password,
                        passwordLastChanged: new Date().toISOString(),
                        needsPasswordChange: true
                    });
                    showToast("✅ Temporary password set. Share it with staff.", "success");
                } else {
                    showToast("✅ Staff updated!", "success");
                }
                
                setStaff(staff.map(s => s.id === newStaff.id ? { ...s, ...firestoreUpdateData } : s));
                resetStaffForm();
                setShowAddStaffForm(false);
                return;
            }

            // Adding new staff
            if (!newStaff.password) return showToast("Password required", "error");

            const email = `${newStaff.username}@timetable.com`;
            const userCredential = await createUserWithEmailAndPassword(auth, email, newStaff.password);
            const uid = userCredential.user.uid;

            const staffData = {
                name: newStaff.name,
                username: newStaff.username,
                freePeriodMode: newStaff.freePeriodMode,
                manualFreePeriods: newStaff.manualFreePeriods,
                role: "staff",
                firebaseUid: uid,
            };

            const docRef = await addDoc(collection(db, 'staff'), staffData);
            await setDoc(doc(db, 'users', uid), {
                name: newStaff.name,
                username: newStaff.username,
                role: 'staff'
            });

            setStaff([...staff, { id: docRef.id, ...staffData }]);
            resetStaffForm();
            setShowAddStaffForm(false);
            showToast("✅ Staff added!", "success");

        } catch (error) {
            showToast("❌ Operation failed: " + error.message, "error");
            console.error(error);
        }
    };

    const editStaff = (staffMember) => {
        setNewStaff({ ...staffMember, password: '' });
        setShowAddStaffForm(true);
        setTimeout(() => {
            staffFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
    };

    const resetStaffForm = () => {
        setNewStaff({ 
            id: null, 
            name: '', 
            username: '', 
            password: '', 
            freePeriodMode: 'auto', 
            manualFreePeriods: 0 
        });
    };

const deleteStaff = async (id) => {
    if (!window.confirm("Delete this staff member?")) return;
    try {
      const staffToDelete = staff.find(s => s.id === id);
      if (!staffToDelete) return;
      const undoItem = { type: 'staff', data: { ...staffToDelete } };
      await deleteDoc(doc(db, 'staff', id));
      if (staffToDelete.firebaseUid) {
        await deleteDoc(doc(db, 'users', staffToDelete.firebaseUid));
      }
      setStaff(staff.filter(x => x.id !== id));
      showToast(
        '✅ Staff deleted',
        'success',
        5000,
        () => restoreFromUndo(undoItem)
      );
    } catch (error) {
      console.error('Delete staff error:', error);
      showToast('❌ Failed to delete', 'error');
    }
  };


    // ==================== SUBJECT CRUD ====================
    const addOrUpdateSubject = async () => {
        if (!newSubject.className || !newSubject.name || !newSubject.teacher)
            return showToast("Fill all required fields", "error");

        try {
            const subjectData = {
                className: newSubject.className,
                name: newSubject.name,
                subjectType: newSubject.subjectType,
                hoursPerWeek: newSubject.hoursPerWeek,
                isContinuous: newSubject.isContinuous,
                blockSize: newSubject.blockSize,
                teacher: newSubject.teacher
            };

            if (newSubject.id) {
                await updateDoc(doc(db, 'subjects', newSubject.id), subjectData);
                setSubjects(subjects.map(s => s.id === newSubject.id ? { id: newSubject.id, ...subjectData } : s));
                showToast("✅ Subject updated!", "success");
            } else {
                const docRef = await addDoc(collection(db, 'subjects'), subjectData);
                setSubjects([...subjects, { id: docRef.id, ...subjectData }]);
                showToast("✅ Subject added!", "success");
            }
            resetSubjectForm();
            setShowAddSubjectForm(false);
        } catch (error) {
            showToast("❌ Operation failed", "error");
            console.error(error);
        }
    };

    const editSubject = (subject) => {
        setNewSubject({
            id: subject.id,
            className: subject.className,
            name: subject.name,
            subjectType: subject.subjectType,
            hoursPerWeek: subject.hoursPerWeek,
            isContinuous: subject.isContinuous || false,
            blockSize: subject.blockSize || 2,
            teacher: subject.teacher
        });
        setShowAddSubjectForm(true);
        setTimeout(() => {
            subjectFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
    };

    const resetSubjectForm = () => {
        setNewSubject({ 
            id: null, 
            className: '', 
            name: '', 
            subjectType: 'Core', 
            hoursPerWeek: 6, 
            isContinuous: false, 
            blockSize: 2, 
            teacher: '' 
        });
    };

  const deleteSubject = async (id) => {
    if (!window.confirm("Delete this subject?")) return;
    try {
      const subjectToDelete = subjects.find(s => s.id === id);
      if (!subjectToDelete) return;
      const undoItem = { type: 'subject', data: { ...subjectToDelete } };
      await deleteDoc(doc(db, 'subjects', id));
      setSubjects(subjects.filter(s => s.id !== id));
      showToast(
        '✅ Subject deleted',
        'success',
        5000,
        () => restoreFromUndo(undoItem)
      );
    } catch (error) {
      console.error('Delete subject error:', error);
      showToast('❌ Failed to delete', 'error');
    }
  };



    // ==================== TIMETABLE GENERATION ====================
    const generateTimetable = async () => {
        setLoading(true);

        try {
            const generator = new TimetableGenerator(classes, staff.filter(s => s.role === 'staff'), subjects);
            const validation = generator.validate();

            if (!validation.valid) {
                showToast('❌ Validation: ' + validation.errors[0], 'error');
                setLoading(false);
                return;
            }

            const result = generator.generate();

            if (result.success) {
                const serializableClassTimetables = {};
                const serializableStaffTimetables = {};

                Object.keys(result.classTimetables).forEach(className => {
                    serializableClassTimetables[className] = result.classTimetables[className].map((day, dayIndex) => {
                        return day.map((period, periodIndex) => ({
                            day: dayIndex,
                            period: periodIndex,
                            subject: period?.subject || null,
                            teacher: period?.teacher || null,
                            type: period?.type || null
                        }));
                    }).flat();
                });

                Object.keys(result.staffTimetables).forEach(staffName => {
                    serializableStaffTimetables[staffName] = result.staffTimetables[staffName].map((day, dayIndex) => {
                        return day.map((period, periodIndex) => ({
                            day: dayIndex,
                            period: periodIndex,
                            subject: period?.subject || null,
                            class: period?.class || null,
                            type: period?.type || null
                        }));
                    }).flat();
                });

                const timetableData = {
                    classTimetables: serializableClassTimetables,
                    staffTimetables: serializableStaffTimetables,
                    generatedAt: new Date().toISOString()
                };

                const ttRef = collection(db, 'timetable');
                const existing = await getDocs(ttRef);

                if (!existing.empty) {
                    await updateDoc(doc(db, 'timetable', existing.docs[0].id), timetableData);
                } else {
                    await addDoc(ttRef, timetableData);
                }

                const teacherList = staff.filter(s => s.role === 'staff');
                for (const teacher of teacherList) {
                    const staffTT = serializableStaffTimetables[teacher.name];
                    if (staffTT) {
                        await setDoc(doc(db, 'staffTimetables', teacher.id), {
                            staffName: teacher.name,
                            timetable: staffTT,
                            generatedAt: new Date().toISOString()
                        });
                    }
                }

                const displayClassTimetables = {};
                Object.keys(serializableClassTimetables).forEach(className => {
                    const days = [[], [], [], [], []];
                    serializableClassTimetables[className].forEach(slot => {
                        if (!days[slot.day]) days[slot.day] = [];
                        days[slot.day][slot.period] = {
                            subject: slot.subject,
                            teacher: slot.teacher,
                            type: slot.type
                        };
                    });
                    days.forEach((day, idx) => {
                        if (!days[idx]) days[idx] = [];
                        for (let p = 0; p < 6; p++) {
                            if (!days[idx][p]) days[idx][p] = null;
                        }
                    });
                    displayClassTimetables[className] = days;
                });

                const displayStaffTimetables = {};
                Object.keys(serializableStaffTimetables).forEach(staffName => {
                    const days = [[], [], [], [], []];
                    serializableStaffTimetables[staffName].forEach(slot => {
                        if (!days[slot.day]) days[slot.day] = [];
                        days[slot.day][slot.period] = {
                            subject: slot.subject,
                            class: slot.class,
                            type: slot.type
                        };
                    });
                    days.forEach((day, idx) => {
                        if (!days[idx]) days[idx] = [];
                        for (let p = 0; p < 6; p++) {
                            if (!days[idx][p]) {
                                days[idx][p] = { subject: 'FREE', class: '-', type: 'free' };
                            }
                        }
                    });
                    displayStaffTimetables[staffName] = days;
                });

                setTimetable({
                    classTimetables: displayClassTimetables,
                    staffTimetables: displayStaffTimetables
                });

                showToast('✅ Timetable generated & saved!', 'success');

                setTimeout(() => {
                    document.getElementById('view-timetables')?.scrollIntoView({ behavior: 'smooth' });
                }, 1000);
            } else {
                showToast('❌ Failed: ' + result.error, 'error');
            }
        } catch (error) {
            showToast('❌ Error: ' + error.message, 'error');
            console.error(error);
        }

        setLoading(false);
    };

    if (loading) {
        return (
            <>
                <AnimatedBackground />
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    color: 'white',
                    fontSize: '24px',
                    gap: '20px'
                }}>
                    <div className="spinner"></div>
                    <div>Loading...</div>
                </div>
            </>
        );
    }

return (
  <>
    <AnimatedBackground forceFull />

    {/* Global wrapper - DO NOT close this early */}
    <div className="min-h-screen relative z-10 text-white">

      {/* HEADER */}
                <div className="header-content">
                    <h1>🏫 Admin Dashboard</h1>
                    <div className="header-actions">
                        <button className="btn btn-danger btn-sm" onClick={onLogout}>
                            Logout
                        </button>
                    </div>
                </div>

                {/* Top segmented navigation */}
                <div className="segmented-nav">
                    <button
                        className={`segmented-item ${activeTab === 'classes' ? 'active' : ''}`}
                        onClick={() => { setActiveTab('classes'); document.getElementById('classes-section')?.scrollIntoView({ behavior: 'smooth' }); }}
                        title="Classes"
                    >
                        🎓 Classes
                    </button>
                    <button
                        className={`segmented-item ${activeTab === 'staff' ? 'active' : ''}`}
                        onClick={() => { setActiveTab('staff'); document.getElementById('staff-section')?.scrollIntoView({ behavior: 'smooth' }); }}
                        title="Staff"
                    >
                        👥 Staff
                    </button>
                    <button
                        className={`segmented-item ${activeTab === 'subjects' ? 'active' : ''}`}
                        onClick={() => { setActiveTab('subjects'); document.getElementById('subject-section')?.scrollIntoView({ behavior: 'smooth' }); }}
                        title="Subjects"
                    >
                        📖 Subjects
                    </button>
                    <button
                        className={`segmented-item ${activeTab === 'generate' ? 'active' : ''}`}
                        onClick={() => { setActiveTab('generate'); document.getElementById('generate-section')?.scrollIntoView({ behavior: 'smooth' }); }}
                        title="Generate"
                    >
                        🔄 Generate
                    </button>
                    <button
                        className={`segmented-item ${activeTab === 'results' ? 'active' : ''}`}
                        onClick={() => { setActiveTab('results'); document.getElementById('view-timetables')?.scrollIntoView({ behavior: 'smooth' }); }}
                        title="Results"
                    >
                        📅 Results
                    </button>
                </div>
            </div>

            <div className="content">
                {/* Departments section removed */}

                {/* ==================== CLASSES SECTION ==================== */}
                <div className="section" id="classes-section">
                    <div className="section-header">
                        <span className="section-icon">📚</span>
                        <h2 className="section-title">Manage Classes</h2>
                    </div>

                    {/* EXISTING CLASSES - FIRST */}
                    <div className="card">
                        <h3>Existing Classes ({classes.length})</h3>
                        {classes.length === 0 ? (
                            <p style={{color: '#64748b', textAlign: 'center', padding: '20px'}}>
                                No classes added yet
                            </p>
                        ) : (
                            <>
                                {(() => {
                                    const sorted = [...classes].sort((a, b) => a.name.localeCompare(b.name));
                                    return sorted.map((cls, idx) => (
                                        <div key={`class-${cls.id}`} className="dept-group">
                                            {sorted[idx] && <div className="dept-chip">Class</div>}
                                            {[
                                                cls
                                            ].map((cls, idx2) => {
                                                const classSubjects = subjects.filter(s => s.className === cls.name);
                                                const totalHours = classSubjects.reduce((sum, s) => sum + s.hoursPerWeek, 0);
                                                const progress = (totalHours / 30) * 100;
                                                return (
                                                    <div key={`${cls.id}-${idx2}`} className="class-box">
                                                        <div style={{
                                                            marginBottom: '8px',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'space-between',
                                                            gap: '10px',
                                                            color: '#1e293b',
                                                            flexWrap: 'wrap'
                                                        }}>
                                                            <h4 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                                Class: <strong>{cls.name}</strong>
                                                            </h4>
                                                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: '#64748b', fontWeight: 600 }}>
                                                                <span>{totalHours}/30 hours</span>
                                                                <span>{Math.max(30 - totalHours, 0)}h remaining</span>
                                                            </div>
                                                        </div>
                                                        <div style={{
                                                            width: '100%',
                                                            height: '8px',
                                                            backgroundColor: '#e2e8f0',
                                                            borderRadius: '4px',
                                                            overflow: 'hidden',
                                                            marginBottom: '15px'
                                                        }}>
                                                            <div style={{
                                                                height: '100%',
                                                                width: `${Math.min(progress, 100)}%`,
                                                                backgroundColor: totalHours === 30 ? '#10b981' : '#f59e0b',
                                                                transition: 'width 0.3s ease'
                                                            }}></div>
                                                        </div>
                                                        <div className="desktop-table">
                                                            <table>
                                                                <thead>
                                                                    <tr>
                                                                        <th>Hall Number</th>
                                                                        <th>Subjects</th>
                                                                        <th>Hours</th>
                                                                        <th>Actions</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr>
                                                                        <td>{cls.hallNumber || '-'}</td>
                                                                        <td>{classSubjects.length}</td>
                                                                        <td>
                                                                            <span className={`badge ${totalHours === 30 ? 'badge-success' : 'badge-danger'}`}>{totalHours}/30h</span>
                                                                        </td>
                                                                        <td>
                                                                            <div className="action-buttons">
                                                                                <button className="btn-icon btn-icon-primary" onClick={() => { editClass(cls); setShowAddClassForm(true); }} title="Edit">✏️</button>
                                                                                <button className="btn-icon btn-icon-danger" onClick={() => deleteClass(cls.id)} title="Delete">🗑️</button>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    ));
                                })()}

                                <div className="mobile-cards">
                                    {(() => {
                                        const sorted = [...classes].sort((a, b) => a.name.localeCompare(b.name));
                                        const cards = [];
                                        sorted.forEach((cls, idx) => {
                                            const classSubjects = subjects.filter(s => s.className === cls.name);
                                            const totalHours = classSubjects.reduce((sum, s) => sum + s.hoursPerWeek, 0);
                                            cards.push(
                                                <div key={cls.id} className="mobile-card">
                                                    <div className="mobile-card-header">
                                                        <span className="mobile-card-title">{cls.name}</span>
                                                        <span className="mobile-card-badge">#{idx + 1}</span>
                                                    </div>
                                                    <div className="mobile-card-body">
                                                        
                                                        <div className="mobile-card-row">
                                                            <span className="mobile-card-label">Hall:</span>
                                                            <span className="mobile-card-value">{cls.hallNumber || '-'}</span>
                                                        </div>
                                                        <div className="mobile-card-row">
                                                            <span className="mobile-card-label">Subjects:</span>
                                                            <span className="mobile-card-value">{classSubjects.length}</span>
                                                        </div>
                                                        <div className="mobile-card-row">
                                                            <span className="mobile-card-label">Hours:</span>
                                                            <span className="mobile-card-value">{totalHours}/30h</span>
                                                        </div>
                                                    </div>
                                                    <div className="mobile-card-actions">
                                                        <button className="btn btn-primary btn-sm" onClick={() => { editClass(cls); setShowAddClassForm(true); }}>✏️ Edit</button>
                                                        <button className="btn btn-danger btn-sm" onClick={() => deleteClass(cls.id)}>🗑️ Delete</button>
                                                    </div>
                                                </div>
                                            );
                                        });
                                        return cards;
                                    })()}
                                </div>
                            </>
                        )}
                        <button 
                            className="btn btn-success btn-sm" 
                            onClick={() => { setShowAddClassForm(true); setNewClass({ id: null, name: '', hallNumber: '' }); }}
                            style={{marginTop: '15px'}}
                        >
                            ➕ Add Class
                        </button>
                    </div>

                    {/* ADD/EDIT CLASS - SECOND (COLLAPSIBLE) */}
                    {showAddClassForm && (
                    <div className="card">
                        <h3>{newClass.id ? '✏️ Edit Class' : '➕ Add New Class'}</h3>
                        <div className="grid-2">
                            <div className="form-group">
                                <label>Class Name *</label>
                                <input
                                    type="text"
                                    value={newClass.name}
                                    onChange={e => setNewClass({ ...newClass, name: e.target.value.toUpperCase() })}
                                    placeholder="CS3A, EE2B"
                                />
                            </div>
                            <div className="form-group">
                                <label>Hall Number (Optional)</label>
                                <input
                                    type="text"
                                    value={newClass.hallNumber}
                                    onChange={e => setNewClass({ ...newClass, hallNumber: e.target.value })}
                                    placeholder="Hall 101"
                                />
                            </div>
                            
                        </div>
                        <div style={{display: 'flex', gap: '10px'}}>
                            <button className="btn btn-primary" onClick={addClass}>
                                {newClass.id ? '💾 Update Class' : '➕ Add Class'}
                            </button>
                            <button className="btn btn-secondary" onClick={() => { setNewClass({ name: '', hallNumber: '' }); setShowAddClassForm(false); }}>
                                ❌ Cancel
                            </button>
                        </div>
                    </div>
                    )}
                </div>

                {/* ==================== STAFF SECTION ==================== */}
                <div className="section" id="staff-section">
                    <div className="section-header">
                        <span className="section-icon">👥</span>
                        <h2 className="section-title">Manage Staff</h2>
                    </div>

                    {/* EXISTING STAFF - FIRST */}
                    <div className="card">
                        <h3>Existing Staff ({teachers.length})</h3>
                        {teachers.length === 0 ? (
                            <p style={{color: '#64748b', textAlign: 'center', padding: '20px'}}>
                                No staff added yet
                            </p>
                        ) : (
                            <>
                                <div className="desktop-table">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>S.No</th>
                                                <th>Name</th>
                                                <th>Username</th>
                                                <th>Free Periods</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {teachers.map((s, idx) => (
                                                <tr key={s.id}>
                                                    <td><span className="staff-badge">S{idx + 1}</span></td>
                                                    <td><strong>{s.name}</strong></td>
                                                    <td>{s.username}</td>
                                                    <td>
                                                        {s.freePeriodMode === 'manual' 
                                                            ? `Manual (${s.manualFreePeriods} free periods)` 
                                                            : 'Auto'}
                                                    </td>
                                                    <td>
                                                        <div className="action-buttons">
                                                            <button 
                                                                className="btn-icon btn-icon-primary"
                                                                onClick={() => editStaff(s)}
                                                                title="Edit"
                                                            >
                                                                ✏️
                                                            </button>
                                                            <button 
                                                                className="btn-icon btn-icon-danger"
                                                                onClick={() => deleteStaff(s.id)}
                                                                title="Delete"
                                                            >
                                                                🗑️
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                <div className="mobile-cards">
                                    {teachers.map((s, idx) => (
                                        <div key={s.id} className="mobile-card">
                                            <div className="mobile-card-header">
                                                <span className="mobile-card-title">{s.name}</span>
                                                <span className="mobile-card-badge">S{idx + 1}</span>
                                            </div>
                                            <div className="mobile-card-body">
                                                <div className="mobile-card-row">
                                                    <span className="mobile-card-label">Username:</span>
                                                    <span className="mobile-card-value">{s.username}</span>
                                                </div>
                                                <div className="mobile-card-row">
                                                    <span className="mobile-card-label">Free Periods:</span>
                                                    <span className="mobile-card-value">
                                                        {s.freePeriodMode === 'manual' 
                                                            ? `Manual (${s.manualFreePeriods} free periods)` 
                                                            : 'Auto'}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="mobile-card-actions">
                                                <button className="btn btn-primary btn-sm" onClick={() => editStaff(s)}>
                                                    ✏️ Edit
                                                </button>
                                                <button className="btn btn-danger btn-sm" onClick={() => deleteStaff(s.id)}>
                                                    🗑️ Delete
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                        <button 
                            className="btn btn-success btn-sm" 
                            onClick={() => {setShowAddStaffForm(true); resetStaffForm()}}
                            style={{marginTop: '15px'}}
                        >
                            ➕ Add Staff
                        </button>
                    </div>

                    {/* ADD/EDIT STAFF - SECOND (COLLAPSIBLE) */}
                    {showAddStaffForm && (
                        <div className="card" ref={staffFormRef}>
                            <h3>{newStaff.id ? '✏️ Edit Staff' : '➕ Add New Staff'}</h3>
                            <div className="grid-2">
                                <div className="form-group">
                                    <label>Full Name *</label>
                                    <input
                                        type="text"
                                        placeholder="Dr. John Doe"
                                        value={newStaff.name}
                                        onChange={e => setNewStaff({ ...newStaff, name: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Username *</label>
                                    <input
                                        type="text"
                                        placeholder="john"
                                        value={newStaff.username}
                                        onChange={e => setNewStaff({ ...newStaff, username: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>{newStaff.id ? 'New Password (Optional)' : 'Password'} *</label>
                                    <input
                                        type="password"
                                        placeholder={newStaff.id ? "Leave blank to keep current" : "Enter password"}
                                        value={newStaff.password}
                                        onChange={e => setNewStaff({ ...newStaff, password: e.target.value })}
                                    />
                                    {newStaff.id && (
                                        <small style={{color: '#64748b', display: 'block', marginTop: '4px'}}>
                                            ✓ Staff can use new password immediately on next login
                                        </small>
                                    )}
                                </div>
                                <div className="form-group">
                                    <label>Free Period Mode</label>
                                    <select
                                        value={newStaff.freePeriodMode}
                                        onChange={e => setNewStaff({ ...newStaff, freePeriodMode: e.target.value })}
                                    >
                                        <option value="auto">Auto</option>
                                        <option value="manual">Manual</option>
                                    </select>
                                </div>
                            </div>

                            {newStaff.freePeriodMode === 'manual' && (
                                <div className="form-group">
                                    <label>Free Periods per Week</label>
                                    <input
                                        type="number"
                                        min="0"
                                        max="30"
                                        value={newStaff.manualFreePeriods}
                                        onChange={e => setNewStaff({ 
                                            ...newStaff, 
                                            manualFreePeriods: parseInt(e.target.value) || 0 
                                        })}
                                    />
                                </div>
                            )}

                            <div className="button-group">
                                <button className="btn btn-primary" onClick={addOrUpdateStaff}>
                                    {newStaff.id ? '💾 Save Changes' : '➕ Add Staff'}
                                </button>
                                <button className="btn btn-secondary" onClick={() => {resetStaffForm(); setShowAddStaffForm(false);}}>
                                    ❌ Cancel
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* ==================== SUBJECTS SECTION ==================== */}
                <div className="section" id="subject-section">
                    <div className="section-header">
                        <span className="section-icon">📖</span>
                        <h2 className="section-title">Manage Subjects</h2>
                    </div>

                    {/* EXISTING SUBJECTS - FIRST */}
                    <div className="card">
                        <h3>Existing Subjects ({subjects.length})</h3>
                        {subjects.length === 0 ? (
                            <p style={{color: '#64748b', textAlign: 'center', padding: '20px'}}>
                                No subjects added yet
                            </p>
                        ) : (
                            <>
                                {classes.map(cls => {
                                    const classSubjects = subjects.filter(s => s.className === cls.name);
                                    if (classSubjects.length === 0) return null;

                                    const totalHours = classSubjects.reduce((sum, s) => sum + s.hoursPerWeek, 0);
                                    const progress = (totalHours / 30) * 100;

                                    return (
                                        <div key={cls.id} style={{marginBottom: '30px'}}>
                                            <div style={{
                                                marginBottom: '8px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                gap: '10px',
                                                color: '#1e293b',
                                                flexWrap: 'wrap'
                                            }}>
                                                <h4 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                    Class: <strong>{cls.name}</strong>
                                                </h4>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: '#64748b', fontWeight: 600 }}>
                                                    <span>{totalHours}/30 hours</span>
                                                    <span>{Math.max(30 - totalHours, 0)}h remaining</span>
                                                </div>
                                            </div>

                                            {/* Progress Bar */}
                                            <div style={{
                                                width: '100%',
                                                height: '8px',
                                                backgroundColor: '#e2e8f0',
                                                borderRadius: '4px',
                                                overflow: 'hidden',
                                                marginBottom: '15px'
                                            }}>
                                                <div style={{
                                                    height: '100%',
                                                    width: `${Math.min(progress, 100)}%`,
                                                    backgroundColor: totalHours === 30 ? '#10b981' : '#f59e0b',
                                                    transition: 'width 0.3s ease'
                                                }}></div>
                                            </div>

                                            <div className="desktop-table">
                                                <table>
                                                    <thead>
                                                        <tr>
                                                            <th>Subject</th>
                                                            <th>Type</th>
                                                            <th>Hours</th>
                                                            <th>Teacher</th>
                                                            <th>Continuous</th>
                                                            <th>Actions</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {classSubjects.map(sub => (
                                                            <tr key={sub.id}>
                                                                <td><strong>{sub.name}</strong></td>
                                                                <td>{sub.subjectType}</td>
                                                                <td>{sub.hoursPerWeek}h</td>
                                                                <td>{sub.teacher}</td>
                                                                <td>
                                                                    {sub.isContinuous ? `Yes (${sub.blockSize}p)` : 'No'}
                                                                </td>
                                                                <td>
                                                                    <div className="action-buttons">
                                                                        <button 
                                                                            className="btn-icon btn-icon-primary"
                                                                            onClick={() => editSubject(sub)}
                                                                            title="Edit"
                                                                        >
                                                                            ✏️
                                                                        </button>
                                                                        <button 
                                                                            className="btn-icon btn-icon-danger"
                                                                            onClick={() => deleteSubject(sub.id)}
                                                                            title="Delete"
                                                                        >
                                                                            🗑️
                                                                        </button>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>

                                            <div className="mobile-cards">
                                                {classSubjects.map(sub => (
                                                    <div key={sub.id} className="mobile-card">
                                                        <div className="mobile-card-header">
                                                            <span className="mobile-card-title">{sub.name}</span>
                                                            <span className="mobile-card-badge">{sub.subjectType}</span>
                                                        </div>
                                                        <div className="mobile-card-body">
                                                            <div className="mobile-card-row">
                                                                <span className="mobile-card-label">Hours:</span>
                                                                <span className="mobile-card-value">{sub.hoursPerWeek}h</span>
                                                            </div>
                                                            <div className="mobile-card-row">
                                                                <span className="mobile-card-label">Teacher:</span>
                                                                <span className="mobile-card-value">{sub.teacher}</span>
                                                            </div>
                                                            <div className="mobile-card-row">
                                                                <span className="mobile-card-label">Continuous:</span>
                                                                <span className="mobile-card-value">
                                                                    {sub.isContinuous ? `Yes (${sub.blockSize}p)` : 'No'}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="mobile-card-actions">
                                                            <button className="btn btn-primary btn-sm" onClick={() => editSubject(sub)}>
                                                                ✏️ Edit
                                                            </button>
                                                            <button className="btn btn-danger btn-sm" onClick={() => deleteSubject(sub.id)}>
                                                                🗑️ Delete
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })}
                            </>
                        )}
                        <button 
                            className="btn btn-success btn-sm" 
                            onClick={() => {setShowAddSubjectForm(true); resetSubjectForm()}}
                            style={{marginTop: '15px'}}
                        >
                            ➕ Add Subject
                        </button>
                    </div>

                    {/* ADD/EDIT SUBJECT - SECOND (COLLAPSIBLE) */}
                    {showAddSubjectForm && (
                        <div className="card" ref={subjectFormRef}>
                            <h3>{newSubject.id ? '✏️ Edit Subject' : '➕ Add New Subject'}</h3>
                            
                            {newSubject.className && (
                                <HoursTracker className={newSubject.className} subjects={subjects} />
                            )}

                            <div className="grid-2">
                                <div className="form-group">
                                    <label>Select Class *</label>
                                    <select
                                        value={newSubject.className}
                                        onChange={e => setNewSubject({ ...newSubject, className: e.target.value })}
                                    >
                                        <option value="">-- Select Class --</option>
                                        {classes.map(cls => (
                                            <option key={cls.id} value={cls.name}>{cls.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Subject Name *</label>
                                    <input
                                        type="text"
                                        value={newSubject.name}
                                        onChange={e => setNewSubject({ ...newSubject, name: e.target.value })}
                                        placeholder="DBMS, AI Lab, etc."
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Subject Type *</label>
                                    <select
                                        value={newSubject.subjectType}
                                        onChange={e => setNewSubject({ ...newSubject, subjectType: e.target.value })}
                                    >
                                        <option value="Core">Core</option>
                                        <option value="Elective">Elective</option>
                                        <option value="Lab">Lab</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Hours per Week *</label>
                                    <input
                                        type="number"
                                        min="1"
                                        max="30"
                                        value={newSubject.hoursPerWeek}
                                        onChange={e => setNewSubject({ 
                                            ...newSubject, 
                                            hoursPerWeek: parseInt(e.target.value) || 6 
                                        })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Teacher *</label>
                                    <select
                                        value={newSubject.teacher}
                                        onChange={e => setNewSubject({ ...newSubject, teacher: e.target.value })}
                                    >
                                        <option value="">-- Select Teacher --</option>
                                        {teachers.map(t => (
                                            <option key={t.id} value={t.name}>{t.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="checkbox-group">
                                <input
                                    type="checkbox"
                                    id="continuous"
                                    checked={newSubject.isContinuous}
                                    onChange={e => setNewSubject({ ...newSubject, isContinuous: e.target.checked })}
                                />
                                <label htmlFor="continuous" style={{marginBottom: 0}}>
                                    Continuous Period (Lab)
                                </label>
                            </div>

                            {newSubject.isContinuous && (
                                <div className="form-group">
                                    <label>Block Size</label>
                                    <select
                                        value={newSubject.blockSize}
                                        onChange={e => setNewSubject({ 
                                            ...newSubject, 
                                            blockSize: parseInt(e.target.value) 
                                        })}
                                    >
                                        <option value={2}>2 Periods</option>
                                        <option value={3}>3 Periods</option>
                                    </select>
                                </div>
                            )}

                            <div className="button-group">
                                <button className="btn btn-primary" onClick={addOrUpdateSubject}>
                                    {newSubject.id ? '💾 Save Changes' : '➕ Add Subject'}
                                </button>
                                <button className="btn btn-secondary" onClick={() => {resetSubjectForm(); setShowAddSubjectForm(false);}}>
                                    ❌ Cancel
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* ==================== GENERATE TIMETABLE ==================== */}
                <div className="section" id="generate-section">
                    <div className="section-header">
                        <span className="section-icon">⚡</span>
                        <h2 className="section-title">Generate Timetable</h2>
                    </div>

                    <div className="card">
                        <h3>Ready to Generate</h3>
                        <div className="stats-grid">
                            <div className="stat-card stat-primary">
                                <div className="stat-label">Classes</div>
                                <div className="stat-value">{classes.length}</div>
                            </div>
                            <div className="stat-card stat-success">
                                <div className="stat-label">Teachers</div>
                                <div className="stat-value">{teachers.length}</div>
                            </div>
                            <div className="stat-card stat-warning">
                                <div className="stat-label">Subjects</div>
                                <div className="stat-value">{subjects.length}</div>
                            </div>
                        </div>

                        <button 
                            className="btn btn-success btn-lg"
                            onClick={generateTimetable}
                            disabled={loading}
                        >
                            {loading ? '⏳ Generating...' : '⚡ Generate Timetable'}
                        </button>
                    </div>
                </div>

                {/* ==================== VIEW TIMETABLES ==================== */}
                {timetable && (
                    <div className="section" id="view-timetables">
                        <div className="section-header">
                            <span className="section-icon">📊</span>
                            <h2 className="section-title">Generated Timetables</h2>
                        </div>

                        <div className="card">
                            <h3>Time Tables</h3>
                            {([...classes].sort((a, b) => a.name.localeCompare(b.name))).map(cls => (
                                <div key={cls.id} className="timetable-container" id={`timetable-export-${cls.id}`}>
                                    <h4 className="timetable-title">{cls.name}</h4>
                                    <div className="timetable-scroll">
                                        <TimetableGrid timetable={timetable.classTimetables} className={cls.name} />
                                    </div>
                                    <div className="timetable-actions no-print no-export">
                                        <button className="btn btn-primary btn-sm" onClick={() => exportToPDF(`timetable-export-${cls.id}`, `${cls.name}_Timetable.pdf`, { title: cls.name })}>📄 Download PDF</button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="card">
                            <h3>Staff-wise Timetables</h3>
                            {[...teachers].sort((a, b) => a.name.localeCompare(b.name)).map(teacher => (
                                <div key={teacher.id} className="timetable-container" id={`staff-timetable-export-${teacher.id}`}>
                                    <h4 className="timetable-title">Teacher: {teacher.name}</h4>
                                    <div className="timetable-scroll">
                                        <StaffTimetableGrid timetable={timetable.staffTimetables} staffName={teacher.name} />
                                    </div>
                                    <div className="timetable-actions no-print no-export">
                                        <button className="btn btn-primary btn-sm" onClick={() => exportToPDF(`staff-timetable-export-${teacher.id}`, `${teacher.name}_Timetable.pdf`, { title: `Staff Timetable — ${teacher.name}` })}>📄 Download PDF</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </div>

          <ToastContainer toasts={toasts} onRemove={removeToast} />

          
        </>
    );
}
