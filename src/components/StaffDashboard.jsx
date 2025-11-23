import React, { useState, useEffect } from 'react';
import AnimatedBackground from './AnimatedBackground';
import StaffTimetableGrid from './StaffTimetableGrid';
import { exportToPDF } from '../utils/pdfUtils';
import { db } from '../utils/firebase';
import { collection, getDocs } from 'firebase/firestore';

export default function StaffDashboard({ user, onLogout }) {
    const [timetableData, setTimetableData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTimetable = async () => {
            try {
                const ttSnap = await getDocs(collection(db, 'timetable'));

                if (!ttSnap.empty) {
                    const ttData = ttSnap.docs[0].data();
                    const staffTimetables = {};

                    if (ttData.staffTimetables) {
                        Object.keys(ttData.staffTimetables).forEach(staffName => {
                            const slots = ttData.staffTimetables[staffName];
                            const days = [[], [], [], [], []];

                            slots.forEach(slot => {
                                if (slot && typeof slot.day === 'number' && typeof slot.period === 'number') {
                                    if (!days[slot.day]) days[slot.day] = [];
                                    days[slot.day][slot.period] = {
                                        subject: slot.subject,
                                        class: slot.class,
                                        type: slot.type
                                    };
                                }
                            });

                            days.forEach((day, idx) => {
                                if (!days[idx]) days[idx] = [];
                                for (let p = 0; p < 6; p++) {
                                    if (!days[idx][p]) {
                                        days[idx][p] = { subject: 'FREE', class: '-', type: 'free' };
                                    }
                                }
                            });

                            staffTimetables[staffName] = days;
                        });
                    }

                    setTimetableData(staffTimetables);
                }
            } catch (error) {
                console.error('Error fetching timetable:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTimetable();
    }, [user]);

    if (loading) {
        return (
            <>
                <AnimatedBackground />
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh'}}>
                    <div style={{textAlign: 'center'}}>
                        <div style={{fontSize: '48px', marginBottom: '20px'}}>⏳</div>
                        <h2>Loading...</h2>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <AnimatedBackground />
            <div className="header">
                <div className="header-content">
                    <h1>📘 Staff Dashboard</h1>

                    {user && user.name && (
                        <span className="greeting">👋 Welcome, {user.name}</span>
                    )}

                    <div className="header-actions">
                        <button className="btn btn-danger btn-sm" onClick={onLogout}>Logout</button>
                    </div>
                </div>
            </div>

            <div className="content">
                <div className="section">
                    <div className="section-header">
                        <span className="section-icon">📅</span>
                        <h2 className="section-title">My Timetable</h2>
                    </div>

                    <div className="card">
                        {!user || !user.name ? (
                            <div style={{padding: '60px 20px', textAlign: 'center'}}>
                                <div style={{fontSize: '60px', marginBottom: '20px'}}>⚠️</div>
                                <h3>User Information Missing</h3>
                                <p style={{color: '#64748b'}}>Please logout and login again</p>
                            </div>
                        ) : !timetableData || Object.keys(timetableData).length === 0 ? (
                            <div style={{padding: '60px 20px', textAlign: 'center'}}>
                                <div style={{fontSize: '60px', marginBottom: '20px'}}>📋</div>
                                <h3>No Timetable Generated</h3>
                                <p style={{color: '#64748b'}}>Contact administrator to generate timetable</p>
                            </div>
                        ) : (
                            <>
                                <div className="timetable-info">
                                    <h3>📊 Your Weekly Schedule</h3>
                                    <p>Your teaching timetable for the week</p>
                                </div>

                                <StaffTimetableGrid 
                                    timetable={timetableData} 
                                    staffName={user.name} 
                                />

                                <div style={{marginTop: '20px', display: 'flex', gap: '10px', justifyContent: 'center'}} className="no-print no-export">
                                    <button 
                                        className="btn btn-primary btn-sm"
                                        onClick={() => exportToPDF('staff-timetable-export', `${user.name}_Timetable.pdf`, { title: `Staff Timetable — ${user.name}` })}
                                    >
                                        📄 Download PDF
                                    </button>
                                    <button 
                                        className="btn btn-primary btn-sm"
                                        onClick={() => window.print()}
                                    >
                                        🖨️ Print
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}


    