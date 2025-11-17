import React, { useState, useEffect } from 'react';
import AnimatedBackground from './AnimatedBackground';
import { ToastContainer } from './Toast';
import HoursTracker from './HoursTracker';
import TimetableGrid from './TimetableGrid';
import StaffTimetableGrid from './StaffTimetableGrid';
import { Storage } from '../utils/storage';
import { TimetableGenerator } from '../utils/timetableGenerator';
import { exportToPDF } from '../utils/pdfUtils';

// 🔥 Firebase imports
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc, collection, addDoc, getDocs, deleteDoc } from 'firebase/firestore';
import { auth, db } from '../utils/firebase';

export default function AdminDashboard({ user, onLogout }) {
    const [classes, setClasses] = useState(Storage.get('classes') || []);
    const [staff, setStaff] = useState(Storage.get('staff') || []);
    const [subjects, setSubjects] = useState(Storage.get('subjects') || []);
    const [timetable, setTimetable] = useState(Storage.get('timetable') || null);
    const [toasts, setToasts] = useState([]);

    const teachers = staff.filter(s => s.role === 'staff');

    const [newClass, setNewClass] = useState({ name: '' });
    const [newStaff, setNewStaff] = useState({
        name: '',
        username: '',
        password: '',
        freePeriodMode: 'auto',
        manualFreePeriods: 0
    });
    const [newSubject, setNewSubject] = useState({
        className: '',
        name: '',
        subjectType: '',
        hoursPerWeek: 6,
        isContinuous: false,
        blockSize: 2,
        teacher: ''
    });

    // 🔔 Toast helpers
    const showToast = (message, type) => {
        setToasts(prev => [...prev, { message, type }]);
    };

    const removeToast = (index) => {
        setToasts(prev => prev.filter((_, i) => i !== index));
    };

    // 🔥 Load data from Firestore on mount (classes + staff + subjects)
    useEffect(() => {
        const loadData = async () => {
            try {
                // CLASSES
                const classSnap = await getDocs(collection(db, 'classes'));
                const cloudClasses = classSnap.docs.map(d => ({
                    id: d.id,
                    ...d.data(),
                }));

                // STAFF
                const staffSnap = await getDocs(collection(db, 'staff'));
                const cloudStaff = staffSnap.docs.map(d => ({
                    id: d.id,
                    ...d.data(),
                }));

                // SUBJECTS
                const subjectSnap = await getDocs(collection(db, 'subjects'));
                const cloudSubjects = subjectSnap.docs.map(d => ({
                    id: d.id,
                    ...d.data(),
                }));

                if (cloudClasses.length) {
                    setClasses(cloudClasses);
                    Storage.set('classes', cloudClasses);
                }
                if (cloudStaff.length) {
                    setStaff(cloudStaff);
                    Storage.set('staff', cloudStaff);
                }
                if (cloudSubjects.length) {
                    setSubjects(cloudSubjects);
                    Storage.set('subjects', cloudSubjects);
                }
            } catch (err) {
                console.error('Error loading data from Firestore:', err);
                showToast('Could not load data from server', 'error');
            }
        };

        loadData();
    }, []);

    // ================== CLASS MANAGEMENT (Firestore + Local) ==================
    const addClass = async () => {
        if (!newClass.name) {
            showToast('Please enter class name', 'error');
            return;
        }
        if (classes.find(c => c.name === newClass.name)) {
            showToast('Class already exists', 'error');
            return;
        }

        try {
            // Save in Firestore
            const docRef = await addDoc(collection(db, 'classes'), {
                name: newClass.name,
                createdAt: new Date(),
            });

            const newCls = { id: docRef.id, name: newClass.name };

            // Update UI + LocalStorage
            const updated = [...classes, newCls];
            setClasses(updated);
            Storage.set('classes', updated);

            setNewClass({ name: '' });
            showToast('Class added successfully!', 'success');
        } catch (err) {
            console.error('Error adding class to Firestore:', err);
            showToast('Could not save class online', 'error');
        }
    };

    const deleteClass = async (id) => {
        if (!window.confirm('Delete this class?')) return;

        try {
            await deleteDoc(doc(db, 'classes', id));
        } catch (err) {
            console.error('Error deleting class from Firestore:', err);
            showToast('Could not delete class online', 'error');
        }

        const updated = classes.filter(c => c.id !== id);
        setClasses(updated);
        Storage.set('classes', updated);
        showToast('Class deleted', 'success');
    };

    // ================== STAFF (Auth + Firestore + Local) ==================
    // Create staff in Firebase (Auth + Firestore `users` collection)
    const createStaffInFirebase = async (staffObj) => {
        try {
            // Email = username@timetable.com
            const email = `${staffObj.username}@timetable.com`;
            const password = staffObj.password || 'Staff@123';

            console.log('Creating Firebase user:', email);

            // 1️⃣ Create Auth user
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const uid = userCredential.user.uid;

            console.log('Staff Firebase UID:', uid);

            // 2️⃣ Create Firestore user document (users collection)
            await setDoc(doc(db, 'users', uid), {
                fullName: staffObj.name || staffObj.fullName || '',
                username: staffObj.username,
                role: 'staff',
                department: staffObj.department || staffObj.dept || '',
                createdAt: new Date(),
            });

            return uid;
        } catch (error) {
            const code = error.code || 'no-code';
            const msg = error.message || 'no-message';

            alert(`Firebase staff creation error:\n${code}\n${msg}`);
            return null;
        }
    };

    const addStaff = async () => {
        if (!newStaff.name || !newStaff.username || !newStaff.password) {
            showToast('Please fill all fields', 'error');
            return;
        }
        if (staff.find(s => s.username === newStaff.username)) {
            showToast('Username already exists', 'error');
            return;
        }

        // 1️⃣ Create in Firebase Auth + users collection
        const uid = await createStaffInFirebase(newStaff);
        if (!uid) {
            showToast('Firebase error: could not create staff account', 'error');
            return;
        }

        // 2️⃣ Save to staff collection
        try {
            const staffDoc = {
                name: newStaff.name,
                username: newStaff.username,
                password: newStaff.password, // ⚠️ for production, don't store plain passwords
                freePeriodMode: newStaff.freePeriodMode,
                manualFreePeriods: newStaff.manualFreePeriods,
                role: 'staff',
                firebaseUid: uid,
                createdAt: new Date(),
            };

            const docRef = await addDoc(collection(db, 'staff'), staffDoc);
            const staffWithId = { id: docRef.id, ...staffDoc };

            const updated = [...staff, staffWithId];
            setStaff(updated);
            Storage.set('staff', updated);

            // Reset form
            setNewStaff({
                name: '',
                username: '',
                password: '',
                freePeriodMode: 'auto',
                manualFreePeriods: 0
            });

            showToast('Staff added successfully!', 'success');
        } catch (err) {
            console.error('Error saving staff to Firestore:', err);
            showToast('Could not save staff online', 'error');
        }
    };

    const deleteStaff = async (id) => {
        if (!window.confirm('Delete this staff member?')) return;

        try {
            await deleteDoc(doc(db, 'staff', id));
        } catch (err) {
            console.error('Error deleting staff from Firestore:', err);
            showToast('Could not delete staff online', 'error');
        }

        const updated = staff.filter(s => s.id !== id);
        setStaff(updated);
        Storage.set('staff', updated);
        showToast('Staff deleted', 'success');
    };

    // ================== SUBJECT MANAGEMENT (Firestore + Local) ==================
    const addSubject = async () => {
        if (!newSubject.className || !newSubject.name || !newSubject.subjectType || !newSubject.teacher) {
            showToast('Please fill all required fields', 'error');
            return;
        }

        const subjectToSave = {
            className: newSubject.className,
            name: newSubject.name,
            subjectType: newSubject.subjectType,
            hoursPerWeek: Number(newSubject.hoursPerWeek) || 6,
            isContinuous: !!newSubject.isContinuous,
            blockSize: newSubject.isContinuous
                ? Number(newSubject.blockSize) || 2
                : 1,
            teacher: newSubject.teacher,
            createdAt: new Date(),
        };

        try {
            const docRef = await addDoc(collection(db, 'subjects'), subjectToSave);
            const subWithId = { id: docRef.id, ...subjectToSave };

            const updated = [...subjects, subWithId];
            setSubjects(updated);
            Storage.set('subjects', updated);

            setNewSubject({
                className: '',
                name: '',
                subjectType: '',
                hoursPerWeek: 6,
                isContinuous: false,
                blockSize: 2,
                teacher: ''
            });

            showToast('Subject added successfully!', 'success');
        } catch (err) {
            console.error('Error adding subject to Firestore:', err);
            showToast('Could not save subject online', 'error');
        }
    };

    const deleteSubject = async (id) => {
        if (!window.confirm('Delete this subject?')) return;

        try {
            await deleteDoc(doc(db, 'subjects', id));
        } catch (err) {
            console.error('Error deleting subject from Firestore:', err);
            showToast('Could not delete subject online', 'error');
        }

        const updated = subjects.filter(s => s.id !== id);
        setSubjects(updated);
        Storage.set('subjects', updated);
        showToast('Subject deleted', 'success');
    };

    // ================== TIMETABLE GENERATION ==================
    const generateTimetable = () => {
        const generator = new TimetableGenerator(classes, teachers, subjects);
        const validation = generator.validate();

        if (!validation.valid) {
            showToast('Validation errors: ' + validation.errors.join('; '), 'error');
            return;
        }

        const result = generator.generate();

        if (result.success) {
            const timetableData = {
                classTimetables: result.classTimetables,
                staffTimetables: result.staffTimetables
            };
            setTimetable(timetableData);
            Storage.set('timetable', timetableData);
            showToast('Timetable generated successfully!', 'success');

            setTimeout(() => {
                document.getElementById('view-timetables')?.scrollIntoView({
                    behavior: 'smooth'
                });
            }, 1000);
        } else {
            showToast('Generation failed: ' + result.error, 'error');
        }
    };

    // ================== RENDER ==================
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

                {/* CLASSES SECTION */}
                <div className="section">
                    <div className="section-header">
                        <span className="section-icon">📚</span>
                        <h2 className="section-title">Manage Classes</h2>
                    </div>

                    <div className="card">
                        <h3>Add New Class</h3>
                        <div className="form-group">
                            <label>Class Name (e.g., CS3A, EE2B)</label>
                            <input
                                type="text"
                                value={newClass.name}
                                onChange={(e) => setNewClass({ name: e.target.value.toUpperCase() })}
                                placeholder="Enter class name"
                            />
                        </div>
                        <button className="btn btn-primary" onClick={addClass}>
                            Add Class
                        </button>
                    </div>

                    <div className="card">
                        <h3>Existing Classes ({classes.length})</h3>
                        {classes.length === 0 ? (
                            <p style={{ color: '#64748b' }}>No classes added yet</p>
                        ) : (
                            <>
                                <div className="desktop-table">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Class Name</th>
                                                <th>Subjects</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {classes.map((cls, idx) => (
                                                <tr key={cls.id}>
                                                    <td>{idx + 1}</td>
                                                    <td><strong>{cls.name}</strong></td>
                                                    <td>{subjects.filter(s => s.className === cls.name).length}</td>
                                                    <td>
                                                        <button
                                                            className="btn btn-danger btn-sm"
                                                            onClick={() => deleteClass(cls.id)}
                                                        >
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                <div className="mobile-cards">
                                    {classes.map((cls, idx) => (
                                        <div key={cls.id} className="mobile-card">
                                            <div className="mobile-card-header">
                                                <span className="mobile-card-title">{cls.name}</span>
                                                <span className="mobile-card-badge">#{idx + 1}</span>
                                            </div>
                                            <div className="mobile-card-body">
                                                <div className="mobile-card-row">
                                                    <span className="mobile-card-label">Subjects:</span>
                                                    <span className="mobile-card-value">
                                                        {subjects.filter(s => s.className === cls.name).length}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="mobile-card-actions">
                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() => deleteClass(cls.id)}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* STAFF SECTION */}
                <div className="section">
                    <div className="section-header">
                        <span className="section-icon">👥</span>
                        <h2 className="section-title">Manage Staff</h2>
                    </div>

                    <div className="card">
                        <h3>Add New Staff</h3>
                        <div className="grid-2">
                            <div className="form-group">
                                <label>Full Name *</label>
                                <input
                                    type="text"
                                    value={newStaff.name}
                                    onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
                                    placeholder="Dr. John Doe"
                                />
                            </div>
                            <div className="form-group">
                                <label>Username *</label>
                                <input
                                    type="text"
                                    value={newStaff.username}
                                    onChange={(e) => setNewStaff({ ...newStaff, username: e.target.value })}
                                    placeholder="john"
                                />
                            </div>
                            <div className="form-group">
                                <label>Password *</label>
                                <input
                                    type="password"
                                    value={newStaff.password}
                                    onChange={(e) => setNewStaff({ ...newStaff, password: e.target.value })}
                                    placeholder="Password"
                                />
                            </div>
                            <div className="form-group">
                                <label>Free Period Mode</label>
                                <select
                                    value={newStaff.freePeriodMode}
                                    onChange={(e) => setNewStaff({ ...newStaff, freePeriodMode: e.target.value })}
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
                                    onChange={(e) => setNewStaff({
                                        ...newStaff,
                                        manualFreePeriods: parseInt(e.target.value, 10) || 0
                                    })}
                                />
                            </div>
                        )}
                        <button className="btn btn-primary" onClick={addStaff}>
                            Add Staff
                        </button>
                    </div>

                    <div className="card">
                        <h3>Existing Staff ({teachers.length})</h3>
                        {teachers.length === 0 ? (
                            <p style={{ color: '#64748b' }}>No staff added yet</p>
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
                                                            ? `Manual (${s.manualFreePeriods} free)`
                                                            : 'Auto'}
                                                    </td>
                                                    <td>
                                                        <button
                                                            className="btn btn-danger btn-sm"
                                                            onClick={() => deleteStaff(s.id)}
                                                        >
                                                            Delete
                                                        </button>
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
                                                            ? `Manual (${s.manualFreePeriods} free)`
                                                            : 'Auto'}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="mobile-card-actions">
                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() => deleteStaff(s.id)}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* SUBJECTS SECTION */}
                <div className="section">
                    <div className="section-header">
                        <span className="section-icon">📖</span>
                        <h2 className="section-title">Manage Subjects</h2>
                    </div>

                    {newSubject.className && (
                        <HoursTracker className={newSubject.className} subjects={subjects} />
                    )}

                    <div className="card">
                        <h3>Add New Subject</h3>
                        <div className="grid-2">
                            <div className="form-group">
                                <label>Select Class *</label>
                                <select
                                    value={newSubject.className}
                                    onChange={(e) => setNewSubject({ ...newSubject, className: e.target.value })}
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
                                    onChange={(e) => setNewSubject({ ...newSubject, name: e.target.value })}
                                    placeholder="DBMS, AI Lab, etc."
                                />
                            </div>
                            <div className="form-group">
                                <label>Subject Type *</label>
                                <select
                                    value={newSubject.subjectType}
                                    onChange={(e) => setNewSubject({ ...newSubject, subjectType: e.target.value })}
                                >
                                    <option value="">-- Select Type --</option>
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
                                    onChange={(e) => setNewSubject({
                                        ...newSubject,
                                        hoursPerWeek: parseInt(e.target.value, 10) || 6
                                    })}
                                />
                            </div>
                            <div className="form-group">
                                <label>Teacher *</label>
                                <select
                                    value={newSubject.teacher}
                                    onChange={(e) => setNewSubject({ ...newSubject, teacher: e.target.value })}
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
                                onChange={(e) => setNewSubject({ ...newSubject, isContinuous: e.target.checked })}
                            />
                            <label htmlFor="continuous" style={{ marginBottom: 0 }}>
                                Continuous Lab Block
                            </label>
                        </div>

                        {newSubject.isContinuous && (
                            <div className="form-group">
                                <label>Block Size</label>
                                <select
                                    value={newSubject.blockSize}
                                    onChange={(e) => setNewSubject({
                                        ...newSubject,
                                        blockSize: parseInt(e.target.value, 10)
                                    })}
                                >
                                    <option value={2}>2 Periods</option>
                                    <option value={3}>3 Periods</option>
                                </select>
                            </div>
                        )}

                        <button className="btn btn-primary" onClick={addSubject}>
                            Add Subject
                        </button>
                    </div>

                    <div className="card">
                        <h3>Existing Subjects ({subjects.length})</h3>
                        {subjects.length === 0 ? (
                            <p style={{ color: '#64748b' }}>No subjects added yet</p>
                        ) : (
                            <>
                                {classes.map(cls => {
                                    const classSubjects = subjects.filter(s => s.className === cls.name);
                                    if (classSubjects.length === 0) return null;

                                    const totalHours = classSubjects.reduce((sum, s) => sum + s.hoursPerWeek, 0);

                                    return (
                                        <div key={cls.id} style={{ marginBottom: '30px' }}>
                                            <h4 style={{
                                                marginBottom: '15px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '10px',
                                                color: '#1e293b'
                                            }}>
                                                Class: {cls.name}
                                                <span style={{
                                                    padding: '4px 12px',
                                                    borderRadius: '12px',
                                                    fontSize: '12px',
                                                    fontWeight: 600,
                                                    background: totalHours === 30 ? '#10b981' : '#ef4444',
                                                    color: 'white'
                                                }}>
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
                                                                    <button
                                                                        className="btn btn-danger btn-sm"
                                                                        onClick={() => deleteSubject(sub.id)}
                                                                    >
                                                                        Delete
                                                                    </button>
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
                                                        </div>
                                                        <div className="mobile-card-actions">
                                                            <button
                                                                className="btn btn-danger btn-sm"
                                                                onClick={() => deleteSubject(sub.id)}
                                                            >
                                                                Delete
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

                {/* GENERATION SECTION */}
                <div className="section">
                    <div className="section-header">
                        <span className="section-icon">⚡</span>
                        <h2 className="section-title">Generate Timetable</h2>
                    </div>

                    <div className="card">
                        <h3>Ready to Generate</h3>
                        <div style={{
                            marginBottom: '25px',
                            padding: '20px',
                            background: '#f8fafc',
                            borderRadius: '12px',
                            color: '#475569'
                        }}>
                            <p style={{ marginBottom: '15px', fontSize: '15px', lineHeight: '1.6' }}>
                                The smart algorithm will create an optimized timetable ensuring:
                            </p>
                            <ul style={{ marginLeft: '25px', lineHeight: '1.8' }}>
                                <li>✅ No free periods (all 30 filled)</li>
                                <li>✅ Each subject appears at least once per day</li>
                                <li>✅ Labs in continuous blocks</li>
                                <li>✅ Core subjects distributed evenly</li>
                                <li>✅ No teacher conflicts</li>
                                <li>✅ Balanced teacher workload</li>
                            </ul>
                        </div>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                            gap: '15px',
                            marginBottom: '25px'
                        }}>
                            <div style={{
                                padding: '15px',
                                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                                borderRadius: '12px',
                                color: 'white',
                                textAlign: 'center'
                            }}>
                                <div style={{ fontSize: '13px', opacity: 0.9 }}>Classes</div>
                                <div style={{ fontSize: '2em', fontWeight: 'bold' }}>{classes.length}</div>
                            </div>
                            <div style={{
                                padding: '15px',
                                background: 'linear-gradient(135deg, #10b981, #059669)',
                                borderRadius: '12px',
                                color: 'white',
                                textAlign: 'center'
                            }}>
                                <div style={{ fontSize: '13px', opacity: 0.9 }}>Teachers</div>
                                <div style={{ fontSize: '2em', fontWeight: 'bold' }}>{teachers.length}</div>
                            </div>
                            <div style={{
                                padding: '15px',
                                background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                                borderRadius: '12px',
                                color: 'white',
                                textAlign: 'center'
                            }}>
                                <div style={{ fontSize: '13px', opacity: 0.9 }}>Subjects</div>
                                <div style={{ fontSize: '2em', fontWeight: 'bold' }}>{subjects.length}</div>
                            </div>
                        </div>

                        <button
                            className="btn btn-success"
                            onClick={generateTimetable}
                            style={{ width: '100%', fontSize: '18px', padding: '18px 40px' }}
                        >
                            Generate Timetable
                        </button>
                    </div>
                </div>

                {/* VIEW TIMETABLES SECTION */}
                {timetable && (
                    <div className="section" id="view-timetables">
                        <div className="section-header">
                            <span className="section-icon">📊</span>
                            <h2 className="section-title">Generated Timetables</h2>
                        </div>

                        <div className="card">
                            <h3>Class-wise Timetables</h3>
                            {classes.map(cls => (
                                <div key={cls.id} style={{ marginBottom: '40px' }}>
                                    <h4 style={{
                                        marginBottom: '15px',
                                        fontSize: '1.2em',
                                        color: '#1e293b'
                                    }}>
                                        Class: {cls.name}
                                    </h4>
                                    <TimetableGrid
                                        timetable={timetable.classTimetables}
                                        className={cls.name}
                                    />
                                    <div
                                        style={{ marginTop: '15px', display: 'flex', gap: '10px' }}
                                        className="no-print"
                                    >
                                        <button
                                            className="btn btn-primary btn-sm"
                                            onClick={() => exportToPDF(
                                                'timetable-export',
                                                `${cls.name}_Timetable.pdf`
                                            )}
                                        >
                                            Download PDF
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="card">
                            <h3>Staff-wise Timetables</h3>
                            {teachers.map(teacher => (
                                <div key={teacher.id} style={{ marginBottom: '40px' }}>
                                    <h4 style={{
                                        marginBottom: '15px',
                                        fontSize: '1.2em',
                                        color: '#1e293b'
                                    }}>
                                        Teacher: {teacher.name}
                                    </h4>
                                    <StaffTimetableGrid
                                        timetable={timetable.staffTimetables}
                                        staffName={teacher.name}
                                    />
                                    <div
                                        style={{ marginTop: '15px', display: 'flex', gap: '10px' }}
                                        className="no-print"
                                    >
                                        <button
                                            className="btn btn-primary btn-sm"
                                            onClick={() => exportToPDF(
                                                'staff-timetable-export',
                                                `${teacher.name}_Timetable.pdf`
                                            )}
                                        >
                                            Download PDF
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
