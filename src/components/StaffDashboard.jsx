import React, { useState } from 'react';
import AnimatedBackground from './AnimatedBackground';
import StaffTimetableGrid from './StaffTimetableGrid';
import { Storage } from '../utils/storage';
import { exportToPDF } from '../utils/pdfUtils';

export default function StaffDashboard({ user, onLogout }) {
    // FIX 1: Get the complete timetable object
    const [timetableData] = useState(Storage.get('timetable'));

    // FIX 2: Extract staffTimetables from the timetable object
    const staffTimetables = timetableData?.staffTimetables || null;

    return (
        <>
            <AnimatedBackground />
            <div className="header">
                <div className="header-content">
                    <h1>👨‍🏫 Staff Dashboard</h1>
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
                        {!staffTimetables ? (
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
                                {/* FIX 3: Pass staffTimetables correctly */}
                                <StaffTimetableGrid 
                                    timetable={staffTimetables} 
                                    staffName={user.name} 
                                />
                                <div 
                                    style={{marginTop: '20px', display: 'flex', gap: '10px'}} 
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