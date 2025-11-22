import { useState, useEffect, useRef } from 'react';
import AnimatedBackground from './AnimatedBackground';
import { ToastContainer } from './Toast';
import HoursTracker from './HoursTracker';
import TimetableGrid from './timetableGrid';
import StaffTimetableGrid from './StaffTimetableGrid';
import { exportToPDF } from '../utils/pdfUtils';
import { TimetableGenerator } from '../utils/timetableGenerator';

import { auth, db } from '../utils/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
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

    // ✅ NEW: Toggle states for collapsible forms
    const [showClassForm, setShowClassForm] = useState(false);
    const [showStaffForm, setShowStaffForm] = useState(false);
    const [showSubjectForm, setShowSubjectForm] = useState(false);

    // Refs for scrolling and PDF export
    const staffFormRef = useRef(null);
    const subjectFormRef = useRef(null);
    const classFormRef = useRef(null);

    // Undo stack for deleted items
    const undoStackRef = useRef([]);

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

    // Toast system with undo support
    const showToast = (message, type, undoAction = null, duration = 3000) => {
        const newToast = { 
            message, 
            type, 
            id: Date.now(),
            undoAction: undoAction || null
        };
        setToasts(prev => [...prev, newToast]);
        setTimeout(() => removeToast(newToast.id), duration);
    };

    const removeToast = (id) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    };

    // Helper function to convert Firebase flat format to nested arrays
    const convertFlatToNested = (flatTimetable) => {
        if (!flatTimetable) return null;

        const nested = {};

        Object.keys(flatTimetable).forEach(key => {
            const slots = flatTimetable[key];

            // Check if already nested (array of arrays)
            if (Array.isArray(slots) && slots.length > 0 && Array.isArray(slots[0])) {
                nested[key] = slots;
            } else if (Array.isArray(slots)) {
                // Flat format - convert to nested
                const days = [[], [], [], [], []]; // 5 days

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

                // Fill empty periods
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

    // Optimized data fetching
    useEffect(() => {
        const fetchAll = async () => {
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
                showToast('❌ Error: ' + error.message, 'error');
            } finally {
                setLoading(false);
            }
        };

        fetchAll();
    }, []);

    // ==================== CLASS CRUD ==================== 
    const addClass = async () => {
        if (!newClass.name) return showToast("Enter class name", "error");
        if (classes.find(c => c.name === newClass.name && !newClass.id))
            return showToast("Class already exists", "error");

        try {
            if (newClass.id) {
                // Update existing
                await updateDoc(doc(db, 'classes', newClass.id), { 
                    name: newClass.name, 
                    hallNumber: newClass.hallNumber 
                });
                setClasses(classes.map(c => c.id === newClass.id ? { ...newClass } : c));
                showToast("✅ Class updated!", "success");
            } else {
                // Add new
                const docRef = await addDoc(collection(db, 'classes'), { 
                    name: newClass.name, 
                    hallNumber: newClass.hallNumber || '' 
                });
                setClasses([...classes, { id: docRef.id, name: newClass.name, hallNumber: newClass.hallNumber || '' }]);
                showToast("✅ Class added!", "success");
            }
            setNewClass({ name: '', hallNumber: '' });
            setShowClassForm(false); // ✅ Collapse form after success
        } catch (error) {
            showToast("❌ Operation failed", "error");
        }
    };

    // ✅ IMPROVED: Edit scrolls and expands form
    const editClass = (cls) => {
        setNewClass({ id: cls.id, name: cls.name, hallNumber: cls.hallNumber || '' });
        setShowClassForm(true); // ✅ Expand form
        setTimeout(() => {
            classFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
    };

    const deleteClass = async (id) => {
        if (!window.confirm("Delete this class?")) return;

        const classToDelete = classes.find(c => c.id === id);
        if (!classToDelete) return;

        try {
            await deleteDoc(doc(db, 'classes', id));
            setClasses(classes.filter(c => c.id !== id));

            const undoEntry = {
                type: 'class',
                data: classToDelete,
                timestamp: Date.now()
            };
            undoStackRef.current.push(undoEntry);

            const undoAction = async () => {
                try {
                    await setDoc(doc(db, 'classes', classToDelete.id), {
                        name: classToDelete.name,
                        hallNumber: classToDelete.hallNumber || ''
                    });

                    setClasses(prev => [...prev, classToDelete]);
                    undoStackRef.current = undoStackRef.current.filter(
                        entry => entry.timestamp !== undoEntry.timestamp
                    );

                    showToast("✅ Class restored", "success");
                } catch (error) {
                    showToast("❌ Failed to restore", "error");
                }
            };

            showToast("Class deleted — Undo?", "success", undoAction, 5000);
        } catch (error) {
            showToast("❌ Failed to delete", "error");
        }
    };

    // ==================== STAFF CRUD ==================== 
    const addOrUpdateStaff = async () => {
        if (!newStaff.name || !newStaff.username)
            return showToast("Fill all required fields", "error");

        try {
            if (newStaff.id) {
                const { password, ...updateData } = newStaff;
                await updateDoc(doc(db, 'staff', newStaff.id), updateData);
                setStaff(staff.map(s => s.id === newStaff.id ? { ...s, ...updateData } : s));
                resetStaffForm();
                setShowStaffForm(false); // ✅ Collapse after success
                return showToast("✅ Staff updated!", "success");
            }

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
            setShowStaffForm(false); // ✅ Collapse after success
            showToast("✅ Staff added!", "success");

        } catch (error) {
            showToast("❌ Operation failed: " + error.message, "error");
        }
    };

    // ✅ IMPROVED: Edit opens form automatically
    const editStaff = (staffMember) => {
        setNewStaff({ ...staffMember, password: '' });
        setShowStaffForm(true); // ✅ Expand form
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

        const staffToDelete = staff.find(x => x.id === id);
        if (!staffToDelete) return;

        try {
            await deleteDoc(doc(db, 'staff', id));
            setStaff(staff.filter(x => x.id !== id));

            const undoEntry = {
                type: 'staff',
                data: staffToDelete,
                timestamp: Date.now()
            };
            undoStackRef.current.push(undoEntry);

            const undoAction = async () => {
                try {
                    await setDoc(doc(db, 'staff', staffToDelete.id), {
                        name: staffToDelete.name,
                        username: staffToDelete.username,
                        freePeriodMode: staffToDelete.freePeriodMode,
                        manualFreePeriods: staffToDelete.manualFreePeriods || 0,
                        role: staffToDelete.role || 'staff',
                        firebaseUid: staffToDelete.firebaseUid || null
                    });

                    setStaff(prev => [...prev, staffToDelete]);
                    undoStackRef.current = undoStackRef.current.filter(
                        entry => entry.timestamp !== undoEntry.timestamp
                    );

                    showToast("✅ Staff restored", "success");
                } catch (error) {
                    showToast("❌ Failed to restore", "error");
                }
            };

            showToast("Staff deleted — Undo?", "success", undoAction, 5000);
        } catch (error) {
            showToast("❌ Failed to delete", "error");
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
            setShowSubjectForm(false); // ✅ Collapse after success
        } catch (error) {
            showToast("❌ Operation failed", "error");
            console.error(error);
        }
    };

    // ✅ IMPROVED: Edit opens form automatically
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
        setShowSubjectForm(true); // ✅ Expand form
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

        const subjectToDelete = subjects.find(s => s.id === id);
        if (!subjectToDelete) return;

        try {
            await deleteDoc(doc(db, 'subjects', id));
            setSubjects(subjects.filter(s => s.id !== id));

            const undoEntry = {
                type: 'subject',
                data: subjectToDelete,
                timestamp: Date.now()
            };
            undoStackRef.current.push(undoEntry);

            const undoAction = async () => {
                try {
                    await setDoc(doc(db, 'subjects', subjectToDelete.id), {
                        className: subjectToDelete.className,
                        name: subjectToDelete.name,
                        subjectType: subjectToDelete.subjectType,
                        hoursPerWeek: subjectToDelete.hoursPerWeek,
                        isContinuous: subjectToDelete.isContinuous || false,
                        blockSize: subjectToDelete.blockSize || 2,
                        teacher: subjectToDelete.teacher
                    });

                    setSubjects(prev => [...prev, subjectToDelete]);
                    undoStackRef.current = undoStackRef.current.filter(
                        entry => entry.timestamp !== undoEntry.timestamp
                    );

                    showToast("✅ Subject restored", "success");
                } catch (error) {
                    showToast("❌ Failed to restore", "error");
                }
            };

            showToast("Subject deleted — Undo?", "success", undoAction, 5000);
        } catch (error) {
            showToast("❌ Failed to delete", "error");
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
                // Convert nested arrays to Firebase-friendly format
                const serializableClassTimetables = {};
                const serializableStaffTimetables = {};

                // Flatten class timetables
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

                // Flatten staff timetables
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

                // Save to Firebase
                const ttRef = collection(db, 'timetable');
                const existing = await getDocs(ttRef);

                if (!existing.empty) {
                    await updateDoc(doc(db, 'timetable', existing.docs[0].id), timetableData);
                } else {
                    await addDoc(ttRef, timetableData);
                }

                // Save individual staff timetables
                const teachersList = staff.filter(s => s.role === 'staff');
                for (const teacher of teachersList) {
                    const staffTT = serializableStaffTimetables[teacher.name];
                    if (staffTT) {
                        await setDoc(doc(db, 'staffTimetables', teacher.id), {
                            staffName: teacher.name,
                            timetable: staffTT,
                            generatedAt: new Date().toISOString()
                        });
                    }
                }

                // Convert back to nested arrays for display
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
            <AnimatedBackground />

            <div className="header">
                <div className="header-content">
                    <h1>🏫 Admin Dashboard</h1>
                    <div className="header-actions">
                        <button className="btn btn-danger btn-sm" onClick={onLogout}>
                            Logout
                        </button>
                    </div>
                </div>
            </div>

            <div className="content">

                {/* ==================== IMPROVEMENT 1: MANAGE CLASSES SECTION ==================== */}
                <div className="section">
                    <div className="section-header">
                        <span className="section-icon">📚</span>
                        <h2 className="section-title">Manage Classes</h2>
                    </div>

                    {/* ✅ FIRST: Show existing classes */}
                    <div className="card">
                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
                            <h3>Existing Classes ({classes.length})</h3>
                            <button 
                                className="btn btn-primary btn-sm" 
                                onClick={() => {
                                    setShowClassForm(!showClassForm);
                                    if (!showClassForm && newClass.id) {
                                        setNewClass({ name: '', hallNumber: '' });
                                    }
                                }}
                            >
                                {showClassForm ? '❌ Cancel' : '➕ Add New Class'}
                            </button>
                        </div>

                        {classes.length === 0 ? (
                            <p style={{color: '#64748b', textAlign: 'center', padding: '20px'}}>
                                No classes added yet. Click "Add New Class" to start.
                            </p>
                        ) : (
                            <>
                                <div className="desktop-table">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Class Name</th>
                                                <th>Hall Number</th>
                                                <th>Subjects</th>
                                                <th>Hours</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {classes.map((cls, idx) => {
                                                const classSubjects = subjects.filter(s => s.className === cls.name);
                                                const totalHours = classSubjects.reduce((sum, s) => sum + s.hoursPerWeek, 0);

                                                return (
                                                    <tr key={cls.id}>
                                                        <td>{idx + 1}</td>
                                                        <td><strong>{cls.name}</strong></td>
                                                        <td>{cls.hallNumber || '-'}</td>
                                                        <td>{classSubjects.length}</td>
                                                        <td>
                                                            <span className={`badge ${totalHours === 30 ? 'badge-success' : 'badge-danger'}`}>
                                                                {totalHours}/30h
                                                            </span>
                                                        </td>
                                                        <td>
                                                            <div className="action-buttons">
                                                                <button 
                                                                    className="btn-icon btn-icon-primary"
                                                                    onClick={() => editClass(cls)}
                                                                    title="Edit"
                                                                >
                                                                    ✏️
                                                                </button>
                                                                <button 
                                                                    className="btn-icon btn-icon-danger"
                                                                    onClick={() => deleteClass(cls.id)}
                                                                    title="Delete"
                                                                >
                                                                    🗑️
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>

                                <div className="mobile-cards">
                                    {classes.map((cls, idx) => {
                                        const classSubjects = subjects.filter(s => s.className === cls.name);
                                        const totalHours = classSubjects.reduce((sum, s) => sum + s.hoursPerWeek, 0);

                                        return (
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
                                                    <button className="btn btn-primary btn-sm" onClick={() => editClass(cls)}>
                                                        ✏️ Edit
                                                    </button>
                                                    <button className="btn btn-danger btn-sm" onClick={() => deleteClass(cls.id)}>
                                                        🗑️ Delete
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </>
                        )}
                    </div>

                    {/* ✅ SECOND: Collapsible Add/Edit Form */}
                    {showClassForm && (
                        <div className="card" ref={classFormRef} style={{
                            animation: 'slideIn 0.3s ease-out',
                            border: '2px solid #3b82f6'
                        }}>
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
                                <button 
                                    className="btn btn-secondary" 
                                    onClick={() => {
                                        setNewClass({ name: '', hallNumber: '' });
                                        setShowClassForm(false);
                                    }}
                                >
                                    ❌ Cancel
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* ==================== IMPROVEMENT 2: MANAGE STAFF SECTION ==================== */}
                <div className="section">
                    <div className="section-header">
                        <span className="section-icon">👥</span>
                        <h2 className="section-title">Manage Staff</h2>
                    </div>

                    {/* ✅ FIRST: Show existing staff */}
                    <div className="card">
                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
                            <h3>Existing Staff ({teachers.length})</h3>
                            <button 
                                className="btn btn-primary btn-sm" 
                                onClick={() => {
                                    setShowStaffForm(!showStaffForm);
                                    if (!showStaffForm && newStaff.id) {
                                        resetStaffForm();
                                    }
                                }}
                            >
                                {showStaffForm ? '❌ Cancel' : '➕ Add Staff'}
                            </button>
                        </div>

                        {teachers.length === 0 ? (
                            <p style={{color: '#64748b', textAlign: 'center', padding: '20px'}}>
                                No staff added yet. Click "Add Staff" to start.
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
                                                <th>Mode</th>
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
                                                            ? `Manual (${s.manualFreePeriods})` 
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
                                                    <span className="mobile-card-label">Mode:</span>
                                                    <span className="mobile-card-value">
                                                        {s.freePeriodMode === 'manual' 
                                                            ? `Manual (${s.manualFreePeriods})` 
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
                    </div>

                    {/* ✅ SECOND: Collapsible Add/Edit Form */}
                    {showStaffForm && (
                        <div className="card" ref={staffFormRef} style={{
                            animation: 'slideIn 0.3s ease-out',
                            border: '2px solid #3b82f6'
                        }}>
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
                                        disabled={!!newStaff.id}
                                        value={newStaff.username}
                                        onChange={e => setNewStaff({ ...newStaff, username: e.target.value })}
                                        style={newStaff.id ? {background: '#f1f5f9', cursor: 'not-allowed'} : {}}
                                    />
                                </div>
                                {!newStaff.id && (
                                    <div className="form-group">
                                        <label>Password *</label>
                                        <input
                                            type="password"
                                            placeholder="Password"
                                            value={newStaff.password}
                                            onChange={e => setNewStaff({ ...newStaff, password: e.target.value })}
                                        />
                                    </div>
                                )}
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
                                <button 
                                    className="btn btn-secondary" 
                                    onClick={() => {
                                        resetStaffForm();
                                        setShowStaffForm(false);
                                    }}
                                >
                                    ❌ Cancel
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* ==================== IMPROVEMENT 3: MANAGE SUBJECTS SECTION ==================== */}
                <div className="section" id="subject-section">
                    <div className="section-header">
                        <span className="section-icon">📖</span>
                        <h2 className="section-title">Manage Subjects</h2>
                    </div>

                    {/* ✅ FIRST: Show existing subjects grouped by class with hours tracker */}
                    <div className="card">
                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
                            <h3>Existing Subjects ({subjects.length})</h3>
                            <button 
                                className="btn btn-primary btn-sm" 
                                onClick={() => {
                                    setShowSubjectForm(!showSubjectForm);
                                    if (!showSubjectForm && newSubject.id) {
                                        resetSubjectForm();
                                    }
                                }}
                            >
                                {showSubjectForm ? '❌ Cancel' : '➕ Add Subject'}
                            </button>
                        </div>

                        {subjects.length === 0 ? (
                            <p style={{color: '#64748b', textAlign: 'center', padding: '20px'}}>
                                No subjects added yet. Click "Add Subject" to start.
                            </p>
                        ) : (
                            <>
                                {classes.map(cls => {
                                    const classSubjects = subjects.filter(s => s.className === cls.name);
                                    if (classSubjects.length === 0) return null;

                                    const totalHours = classSubjects.reduce((sum, s) => sum + s.hoursPerWeek, 0);
                                    const remainingHours = 30 - totalHours;
                                    const progressPercent = (totalHours / 30) * 100;

                                    return (
                                        <div key={cls.id} style={{
                                            marginBottom: '30px',
                                            padding: '20px',
                                            background: '#f8fafc',
                                            borderRadius: '12px',
                                            border: '1px solid #e2e8f0'
                                        }}>
                                            {/* ✅ Class header with hours progress */}
                                            <div style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                marginBottom: '15px',
                                                flexWrap: 'wrap',
                                                gap: '10px'
                                            }}>
                                                <h4 style={{
                                                    margin: 0,
                                                    color: '#1e293b',
                                                    fontSize: '18px',
                                                    fontWeight: '600'
                                                }}>
                                                    📚 Class: {cls.name}
                                                </h4>
                                                <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                                                    <span className={`badge ${totalHours === 30 ? 'badge-success' : totalHours > 30 ? 'badge-danger' : 'badge-warning'}`}>
                                                        {totalHours}/30 hours
                                                    </span>
                                                    {remainingHours > 0 && (
                                                        <span className="badge badge-info">
                                                            {remainingHours}h remaining
                                                        </span>
                                                    )}
                                                    {totalHours > 30 && (
                                                        <span className="badge badge-danger">
                                                            ⚠️ {totalHours - 30}h overflow!
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            {/* ✅ Visual progress bar */}
                                            <div style={{
                                                width: '100%',
                                                height: '12px',
                                                background: '#e2e8f0',
                                                borderRadius: '6px',
                                                overflow: 'hidden',
                                                marginBottom: '15px'
                                            }}>
                                                <div style={{
                                                    width: `${Math.min(progressPercent, 100)}%`,
                                                    height: '100%',
                                                    background: totalHours === 30 ? '#10b981' : totalHours > 30 ? '#ef4444' : '#f59e0b',
                                                    transition: 'width 0.3s ease'
                                                }} />
                                            </div>

                                            {/* ✅ Subjects table */}
                                            <div className="desktop-table">
                                                <table>
                                                    <thead>
                                                        <tr>
                                                            <th>Subject</th>
                                                            <th>Type</th>
                                                            <th>Hours/Week</th>
                                                            <th>Teacher</th>
                                                            <th>Continuous</th>
                                                            <th>Actions</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {classSubjects.map(sub => (
                                                            <tr key={sub.id}>
                                                                <td><strong>{sub.name}</strong></td>
                                                                <td>
                                                                    <span className={`badge badge-${
                                                                        sub.subjectType === 'Lab' ? 'info' :
                                                                        sub.subjectType === 'Core' ? 'primary' : 'secondary'
                                                                    }`}>
                                                                        {sub.subjectType}
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <span style={{fontWeight: '600', color: '#3b82f6'}}>
                                                                        {sub.hoursPerWeek}h
                                                                    </span>
                                                                </td>
                                                                <td>{sub.teacher}</td>
                                                                <td>
                                                                    {sub.isContinuous ? (
                                                                        <span className="badge badge-success">
                                                                            ✓ {sub.blockSize}p blocks
                                                                        </span>
                                                                    ) : (
                                                                        <span style={{color: '#64748b'}}>No</span>
                                                                    )}
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

                                            {/* Mobile cards for subjects */}
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
                    </div>

                    {/* ✅ SECOND: Collapsible Add/Edit Form */}
                    {showSubjectForm && (
                        <div className="card" ref={subjectFormRef} style={{
                            animation: 'slideIn 0.3s ease-out',
                            border: '2px solid #3b82f6'
                        }}>
                            <h3>{newSubject.id ? '✏️ Edit Subject' : '➕ Add New Subject'}</h3>

                            {/* ✅ Show hours tracker when class is selected */}
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
                                <button 
                                    className="btn btn-secondary" 
                                    onClick={() => {
                                        resetSubjectForm();
                                        setShowSubjectForm(false);
                                    }}
                                >
                                    ❌ Cancel
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* ==================== GENERATE TIMETABLE ==================== */}
                <div className="section">
                    <div className="section-header">
                        <span className="section-icon">⚡</span>
                        <h2 className="section-title">Generate Timetable</h2>
                    </div>

                    <div className="card">
                        <h3>Ready to Generate</h3>
                        <div className="info-box">
                            <p style={{marginBottom: '15px', fontSize: '15px', lineHeight: '1.6'}}>
                                The smart algorithm will create an optimized timetable:
                            </p>
                            <ul style={{marginLeft: '25px', lineHeight: '1.8'}}>
                                <li>✅ No free periods (all 30 filled)</li>
                                <li>✅ High-hour subjects (≥5h) appear daily</li>
                                <li>✅ Labs in continuous blocks</li>
                                <li>✅ No teacher conflicts</li>
                                <li>✅ Balanced workload</li>
                            </ul>
                        </div>

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

                {/* ==================== IMPROVEMENT 4: VIEW TIMETABLES WITH FIXED PDF EXPORT ==================== */}
                {timetable && (
                    <div className="section" id="view-timetables">
                        <div className="section-header">
                            <span className="section-icon">📊</span>
                            <h2 className="section-title">Generated Timetables</h2>
                        </div>

                        {/* Class-wise Timetables */}
                        <div className="card">
                            <h3>Class-wise Timetables</h3>
                            {classes.map(cls => (
                                <div key={cls.id} className="timetable-container" style={{marginBottom: '40px'}}>
                                    <h4 className="timetable-title">
                                        Class: {cls.name} {cls.hallNumber && `(${cls.hallNumber})`}
                                    </h4>

                                    {/* ✅ FIXED: Wrapper for PDF export with unique ID */}
                                    <div 
                                        id={`timetable-${cls.name}`} 
                                        className="timetable-export-wrapper"
                                        style={{
                                            width: '100%',
                                            overflow: 'visible',
                                            background: 'white',
                                            padding: '20px',
                                            marginBottom: '15px'
                                        }}
                                    >
                                        <TimetableGrid 
                                            timetable={timetable.classTimetables} 
                                            className={cls.name} 
                                        />
                                    </div>

                                    <div className="timetable-actions no-print">
                                        <button 
                                            className="btn btn-primary btn-sm"
                                            onClick={() => {
                                                // ✅ IMPROVED: Export specific timetable by ID
                                                const element = document.getElementById(`timetable-${cls.name}`);
                                                if (element) {
                                                    exportToPDF(
                                                        `timetable-${cls.name}`, 
                                                        `${cls.name}_Timetable.pdf`,
                                                        {
                                                            filename: `${cls.name}_Timetable.pdf`,
                                                            html2canvas: { 
                                                                scale: 2,
                                                                useCORS: true,
                                                                logging: false,
                                                                width: element.scrollWidth,
                                                                height: element.scrollHeight
                                                            },
                                                            jsPDF: { 
                                                                unit: 'mm', 
                                                                format: 'a4', 
                                                                orientation: 'landscape' 
                                                            }
                                                        }
                                                    );
                                                }
                                            }}
                                        >
                                            📄 Download PDF
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Staff-wise Timetables */}
                        <div className="card">
                            <h3>Staff-wise Timetables</h3>
                            {teachers.map(teacher => (
                                <div key={teacher.id} className="timetable-container" style={{marginBottom: '40px'}}>
                                    <h4 className="timetable-title">
                                        Teacher: {teacher.name}
                                    </h4>

                                    {/* ✅ FIXED: Wrapper for PDF export with unique ID */}
                                    <div 
                                        id={`staff-timetable-${teacher.name.replace(/\s+/g, '-')}`}
                                        className="timetable-export-wrapper"
                                        style={{
                                            width: '100%',
                                            overflow: 'visible',
                                            background: 'white',
                                            padding: '20px',
                                            marginBottom: '15px'
                                        }}
                                    >
                                        <StaffTimetableGrid 
                                            timetable={timetable.staffTimetables} 
                                            staffName={teacher.name} 
                                        />
                                    </div>

                                    <div className="timetable-actions no-print">
                                        <button 
                                            className="btn btn-primary btn-sm"
                                            onClick={() => {
                                                // ✅ IMPROVED: Export specific staff timetable by ID
                                                const safeName = teacher.name.replace(/\s+/g, '-');
                                                const element = document.getElementById(`staff-timetable-${safeName}`);
                                                if (element) {
                                                    exportToPDF(
                                                        `staff-timetable-${safeName}`, 
                                                        `${teacher.name}_Timetable.pdf`,
                                                        {
                                                            filename: `${teacher.name}_Timetable.pdf`,
                                                            html2canvas: { 
                                                                scale: 2,
                                                                useCORS: true,
                                                                logging: false,
                                                                width: element.scrollWidth,
                                                                height: element.scrollHeight
                                                            },
                                                            jsPDF: { 
                                                                unit: 'mm', 
                                                                format: 'a4', 
                                                                orientation: 'landscape' 
                                                            }
                                                        }
                                                    );
                                                }
                                            }}
                                        >
                                            📄 Download PDF
                                        </button>
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