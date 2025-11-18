import React, { useState, useEffect } from 'react';
import AnimatedBackground from './AnimatedBackground';
import StaffTimetableGrid from './StaffTimetableGrid';
import { Storage } from '../utils/storage';
import { exportToPDF } from '../utils/pdfUtils';

export default function StaffDashboard({ user, onLogout }) {
    // Get the complete timetable object
    const [timetableData] = useState(Storage.get('timetable'));

    // Extract staffTimetables from the timetable object
    const staffTimetables = timetableData?.staffTimetables || null;

    // Debug logs
    useEffect(() => {
        console.log('=== StaffDashboard Debug ===');
        console.log('User object:', user);
        console.log('User name:', user?.name);
        console.log('Timetable data:', timetableData);
        console.log('Staff timetables:', staffTimetables);
        if (staffTimetables) {
            console.log('Available staff:', Object.keys(staffTimetables));
        }
    }, [user, timetableData, staffTimetables]);

    return (
        <>
            <AnimatedBackground />
            <div className="header">
                <div className="header-content">
                    <div className="header-left">
                        <h1>👨‍🏫 Staff Dashboard</h1>
                    </div>
                    <div className="header-center">
                        {user && user.name && (
                            <div className="welcome-message">
                                <span className="welcome-text">Welcome,</span>
                                <span className="staff-name">{user.name}</span>
                            </div>
                        )}
                    </div>
                    <div className="header-actions">
                        <button className="theme-toggle">🌙</button>
                        <button className="btn btn-danger btn-sm" onClick={onLogout}>
                            Logout
                        </button>
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
                                <h3 style={{marginBottom: '10px', color: '#1e293b'}}>
                                    User Information Missing
                                </h3>
                                <p style={{color: '#64748b'}}>
                                    Please logout and login again.
                                </p>
                            </div>
                        ) : !staffTimetables ? (
                            <div style={{padding: '60px 20px', textAlign: 'center'}}>
                                <div style={{fontSize: '60px', marginBottom: '20px'}}>📋</div>
                                <h3 style={{marginBottom: '10px', color: '#1e293b'}}>
                                    No Timetable Generated
                                </h3>
                                <p style={{color: '#64748b'}}>
                                    Please contact the administrator to generate a timetable.
                                </p>
                            </div>
                        ) : (
                            <>
                                <div className="timetable-header-info">
                                    <h3>📊 Your Schedule</h3>
                                    <p>Below is your weekly teaching schedule</p>
                                </div>

                                <StaffTimetableGrid 
                                    timetable={staffTimetables} 
                                    staffName={user.name} 
                                />

                                <div 
                                    style={{
                                        marginTop: '20px', 
                                        display: 'flex', 
                                        gap: '10px',
                                        justifyContent: 'center'
                                    }} 
                                    className="no-print"
                                >
                                    <button 
                                        className="btn btn-primary btn-sm"
                                        onClick={() => exportToPDF(
                                            'staff-timetable-export', 
                                            `${user.name}_Timetable.pdf`
                                        )}
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