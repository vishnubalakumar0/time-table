import React, { useState } from 'react';
import AnimatedBackground from './AnimatedBackground';
import TimetableGrid from './timetableGrid';
import { Storage } from '../utils/storage';
import { exportToPDF } from '../utils/pdfUtils';

export default function StudentDashboard({ user, onLogout }) {
    const [timetable] = useState(Storage.get('timetable'));
    const [classes] = useState(Storage.get('classes') || []);
    const [selectedClass, setSelectedClass] = useState(classes[0]?.name || '');

    return (
        <>
            <AnimatedBackground />
            <div className="header">
                <div className="header-content">
                    <h1>🎓 Student Dashboard</h1>
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
                        <h2 className="section-title">Class Timetable</h2>
                    </div>

                    {classes.length > 0 && (
                        <div className="card">
                            <div className="form-group" style={{maxWidth: '400px'}}>
                                <label>Select Your Class</label>
                                <select
                                    value={selectedClass}
                                    onChange={(e) => setSelectedClass(e.target.value)}
                                    style={{fontSize: '16px', padding: '15px'}}
                                >
                                    {classes.map(cls => (
                                        <option key={cls.id} value={cls.name}>
                                            {cls.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    )}

                    <div className="card">
                        {!timetable ? (
                            <div style={{padding: '60px 20px', textAlign: 'center'}}>
                                <div style={{fontSize: '60px', marginBottom: '20px'}}>📋</div>
                                <h3 style={{marginBottom: '10px', color: '#1e293b'}}>
                                    No Timetable Generated
                                </h3>
                                <p style={{color: '#64748b'}}>
                                    Please contact the administrator.
                                </p>
                            </div>
                        ) : (
                            <>
                                <TimetableGrid 
                                    timetable={timetable.classTimetables} 
                                    className={selectedClass} 
                                />
                                <div 
                                    style={{marginTop: '20px', display: 'flex', gap: '10px'}} 
                                    className="no-print no-export"
                                >
                                    <button 
                                        className="btn btn-primary btn-sm"
                                        onClick={() => exportToPDF(
                                            'class-timetable-export', 
                                            `${selectedClass}_Timetable.pdf`,
                                            { title: selectedClass }
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