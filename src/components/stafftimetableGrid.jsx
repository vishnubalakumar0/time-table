import React from 'react';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

export default function StaffTimetableGrid({ timetable, staffName }) {
    if (!timetable || !timetable[staffName]) {
        return (
            <div style={{padding: '40px', textAlign: 'center', color: '#64748b'}}>
                No timetable generated yet
            </div>
        );
    }

    const grid = timetable[staffName];

    // Debug code - placed BEFORE return statement
    console.log('StaffTimetableGrid - staffName:', staffName);
    console.log('StaffTimetableGrid - grid:', grid);
    console.log('StaffTimetableGrid - grid is array?', Array.isArray(grid));
    if (Array.isArray(grid)) {
        console.log('Grid length:', grid.length);
        console.log('First element:', grid[0]);
    }

    return (
        <div id="staff-timetable-export" className="timetable-grid">
            <div className="timetable-header">Day/Period</div>
            {[...Array(6)].map((_, i) => (
                <div key={i} className="timetable-header">P{i + 1}</div>
            ))}

            {DAYS.map((day, dayIndex) => (
                <React.Fragment key={day}>
                    <div className="timetable-day">{day}</div>
                    {grid[dayIndex].map((slot, periodIndex) => (
                        <div 
                            key={periodIndex} 
                            className={`timetable-cell subject-${slot.type.toLowerCase()}`}
                        >
                            {slot.subject !== 'FREE' ? (
                                <>
                                    <div className="subject-name">{slot.subject}</div>
                                    <div className="teacher-name">{slot.class}</div>
                                </>
                            ) : (
                                <div style={{ color: '#94a3b8' }}>FREE</div>
                            )}
                        </div>
                    ))}
                </React.Fragment>
            ))}
        </div>
    );
}
