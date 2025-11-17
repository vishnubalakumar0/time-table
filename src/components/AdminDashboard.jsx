import React, { useState, useEffect, useRef } from 'react';
import AnimatedBackground from './AnimatedBackground';
import { ToastContainer } from './Toast';
import HoursTracker from './HoursTracker';
import TimetableGrid from './TimetableGrid';
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

    // Refs for scrolling
    const staffFormRef = useRef(null);
    const subjectFormRef = useRef(null);

    // Form Models - FIX 3: Added hallNumber for classes
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

    // FIX 7: Toast duration reduced to 3 seconds
    const showToast = (message, type) => {
        const newToast = { message, type, id: Date.now() };
        setToasts(prev => [...prev, newToast]);
        setTimeout(() => removeToast(newToast.id), 3000);
    };

    const removeToast = (id) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    };

    // FIX 1: Faster loading - optimized data fetching
    useEffect(() => {
        const fetchAll = async () => {
            try {
                const [cls, st, sb, tt] = await Promise.all([
                    getDocs(collection(db, 'classes')),
                    getDocs(collection(db, 'staff')),
                    getDocs(collection(db, 'subjects')),
                    getDocs(collection(db, 'timetable'))
                ]);

                setClasses(cls.docs.map(d => ({ id: d.id, ...d.data() })));
                setStaff(st.docs.map(d => ({ id: d.id, ...d.data() })));
                setSubjects(sb.docs.map(d => ({ id: d.id, ...d.data() })));
                if (!tt.empty) setTimetable(tt.docs[0].data());

            } catch (error) {
                showToast("⚠ Could not load data", "error");
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchAll();
    }, []);

    // ------------------- CLASS CRUD - FIX 3: Added hallNumber & edit -------------------
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
        } catch (error) {
            showToast("❌ Operation failed", "error");
        }
    };

    const editClass = (cls) => {
        setNewClass({ id: cls.id, name: cls.name, hallNumber: cls.hallNumber || '' });
    };

    const deleteClass = async (id) => {
        if (!window.confirm("Delete this class?")) return;

        try {
            await deleteDoc(doc(db, 'classes', id));
            setClasses(classes.filter(c => c.id !== id));
            showToast("✅ Class deleted", "success");
        } catch (error) {
            showToast("❌ Failed to delete", "error");
        }
    };

    // ------------------- STAFF CRUD - FIX 4: Scroll to form -------------------
    const addOrUpdateStaff = async () => {
        if (!newStaff.name || !newStaff.username)
            return showToast("Fill all required fields", "error");

        try {
            if (newStaff.id) {
                const { password, ...updateData } = newStaff;
                await updateDoc(doc(db, 'staff', newStaff.id), updateData);
                setStaff(staff.map(s => s.id === newStaff.id ? { ...s, ...updateData } : s));
                resetStaffForm();
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
                fullName: newStaff.name,
                username: newStaff.username,
                role: 'staff'
            });

            setStaff([...staff, { id: docRef.id, ...staffData }]);
            resetStaffForm();
            showToast("✅ Staff added!", "success");

        } catch (error) {
            showToast("❌ Operation failed: " + error.message, "error");
        }
    };

    const editStaff = (staffMember) => {
        setNewStaff({ ...staffMember, password: '' });
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
            await deleteDoc(doc(db, 'staff', id));
            setStaff(staff.filter(x => x.id !== id));
            showToast("✅ Staff deleted", "success");
        } catch (error) {
            showToast("❌ Failed to delete", "error");
        }
    };

    // ------------------- SUBJECT CRUD - FIX 5: Fixed edit/delete, scroll -------------------
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
            await deleteDoc(doc(db, 'subjects', id));
            setSubjects(subjects.filter(s => s.id !== id));
            showToast("✅ Subject deleted", "success");
        } catch (error) {
            showToast("❌ Failed to delete", "error");
        }
    };

    // ------------------- TIMETABLE GENERATION - FIX 6: Save to staff -------------------
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
            const teachers = staff.filter(s => s.role === 'staff');
            for (const teacher of teachers) {
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
                // Fill empty periods with null
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
                // Fill empty periods with FREE
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
};;

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
                        <button className="theme-toggle">🌙</button>
                        <button className="btn btn-danger btn-sm" onClick={onLogout}>
                            Logout
                        </button>
                    </div>
                </div>
            </div>

            <div className="content">

                {/* ==================== CLASSES SECTION - FIX 3 ==================== */}
                <div className="section">
                    <div className="section-header">
                        <span className="section-icon">📚</span>
                        <h2 className="section-title">Manage Classes</h2>
                    </div>

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
                            {newClass.id && (
                                <button className="btn btn-secondary" onClick={() => setNewClass({ name: '', hallNumber: '' })}>
                                    ❌ Cancel
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="card">
                        <h3>Existing Classes ({classes.length})</h3>
                        {classes.length === 0 ? (
                            <p style={{color: '#64748b', textAlign: 'center', padding: '20px'}}>
                                No classes added yet
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
                </div>

                {/* ==================== STAFF SECTION - FIX 4 ==================== */}
                <div className="section">
                    <div className="section-header">
                        <span className="section-icon">👥</span>
                        <h2 className="section-title">Manage Staff</h2>
                    </div>

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
                            {newStaff.id && (
                                <button className="btn btn-secondary" onClick={resetStaffForm}>
                                    ❌ Cancel
                                </button>
                            )}
                        </div>
                    </div>

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
                </div>

                {/* ==================== SUBJECTS SECTION - FIX 5 ==================== */}
                <div className="section" id="subject-section">
                    <div className="section-header">
                        <span className="section-icon">📖</span>
                        <h2 className="section-title">Manage Subjects</h2>
                    </div>

                    {newSubject.className && (
                        <HoursTracker className={newSubject.className} subjects={subjects} />
                    )}

                    <div className="card" ref={subjectFormRef}>
                        <h3>{newSubject.id ? '✏️ Edit Subject' : '➕ Add New Subject'}</h3>
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
                            {newSubject.id && (
                                <button className="btn btn-secondary" onClick={resetSubjectForm}>
                                    ❌ Cancel
                                </button>
                            )}
                        </div>
                    </div>

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

                                    return (
                                        <div key={cls.id} style={{marginBottom: '30px'}}>
                                            <h4 style={{
                                                marginBottom: '15px', 
                                                display: 'flex', 
                                                alignItems: 'center', 
                                                gap: '10px', 
                                                color: '#1e293b',
                                                flexWrap: 'wrap'
                                            }}>
                                                Class: {cls.name}
                                                <span className={`badge ${totalHours === 30 ? 'badge-success' : 'badge-danger'}`}>
                                                    {totalHours}/30 hours
                                                </span>
                                            </h4>

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
                    </div>
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

                {/* ==================== VIEW TIMETABLES - FIX 6 ==================== */}
                {timetable && (
                    <div className="section" id="view-timetables">
                        <div className="section-header">
                            <span className="section-icon">📊</span>
                            <h2 className="section-title">Generated Timetables</h2>
                        </div>

                        <div className="card">
                            <h3>Class-wise Timetables</h3>
                            {classes.map(cls => (
                                <div key={cls.id} className="timetable-container">
                                    <h4 className="timetable-title">
                                        Class: {cls.name} {cls.hallNumber && `(${cls.hallNumber})`}
                                    </h4>
                                    <div className="timetable-scroll">
                                        <TimetableGrid 
                                            timetable={timetable.classTimetables} 
                                            className={cls.name} 
                                        />
                                    </div>
                                    <div className="timetable-actions no-print">
                                        <button 
                                            className="btn btn-primary btn-sm"
                                            onClick={() => exportToPDF('timetable-export', `${cls.name}_Timetable.pdf`)}
                                        >
                                            📄 Download PDF
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="card">
                            <h3>Staff-wise Timetables</h3>
                            {teachers.map(teacher => (
                                <div key={teacher.id} className="timetable-container">
                                    <h4 className="timetable-title">
                                        Teacher: {teacher.name}
                                    </h4>
                                    <div className="timetable-scroll">
                                        <StaffTimetableGrid 
                                            timetable={timetable.staffTimetables} 
                                            staffName={teacher.name} 
                                        />
                                    </div>
                                    <div className="timetable-actions no-print">
                                        <button 
                                            className="btn btn-primary btn-sm"
                                            onClick={() => exportToPDF('staff-timetable-export', `${teacher.name}_Timetable.pdf`)}
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

            <ToastContainer toasts={toasts} removeToast={removeToast} />
        </>
    );
}