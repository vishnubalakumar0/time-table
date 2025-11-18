import React from 'react';

export default function StaffTimetableGrid({ timetable, staffName }) {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const periods = ['P1', 'P2', 'P3', 'P4', 'P5', 'P6'];

    const staffSchedule = timetable[staffName];

    console.log('StaffTimetableGrid - Staff:', staffName);
    console.log('StaffTimetableGrid - Available:', Object.keys(timetable));

    if (!staffSchedule) {
        return (
            <div style={{ padding: '40px', textAlign: 'center' }}>
                <div style={{ fontSize: '48px', marginBottom: '20px' }}>⚠️</div>
                <h3>No Timetable Found</h3>
                <p style={{color: '#64748b'}}>No timetable for "{staffName}"</p>
                <p style={{color: '#64748b', fontSize: '14px'}}>Available: {Object.keys(timetable).join(', ')}</p>
            </div>
        );
    }

    return (
        <div className="timetable-container" id="staff-timetable-export">
            <table className="timetable">
                <thead>
                    <tr>
                        <th className="day-header">DAY/PERIOD</th>
                        {periods.map(p => <th key={p} className="period-header">{p}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {days.map((day, dayIdx) => (
                        <tr key={day}>
                            <td className="day-cell">{day}</td>
                            {periods.map((period, periodIdx) => {
                                const slot = staffSchedule[dayIdx]?.[periodIdx];
                                const isFree = !slot || slot.type === 'free' || slot.subject === 'FREE';

                                return (
                                    <td key={period} className={`period-cell ${isFree ? 'free-period' : 'class-period'}`}>
                                        {isFree ? (
                                            <div className="period-content free">
                                                <span className="subject-name">FREE</span>
                                            </div>
                                        ) : (
                                            <div className="period-content">
                                                <span className="subject-name">{slot.subject}</span>
                                                <span className="class-name">{slot.class}</span>
                                            </div>
                                        )}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}