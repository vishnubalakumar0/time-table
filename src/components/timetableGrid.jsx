import React from 'react';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

export default function StaffTimetableGrid({ timetable, staffName }) {
    if (!timetable || !timetable[staffName]) {
        return (
            <div style={{padding: '40px', textAlign: 'center', color: '#64748b'}}>
                No timetable available
            </div>
        );
    }

    const grid = timetable[staffName];

    // Safety check: if grid is not an array or not nested properly
    if (!Array.isArray(grid) || grid.length === 0) {
        return (
            <div style={{padding: '40px', textAlign: 'center', color: '#64748b'}}>
                Invalid timetable format
            </div>
        );
    }

    return (
        <div className="timetable-grid">
            <div className="timetable-header">Day/Period</div>
            {[...Array(6)].map((_, i) => (
                <div key={i} className="timetable-header">P{i + 1}</div>
            ))}

            {DAYS.map((day, dayIndex) => {
                // Safety check for each day
                if (!grid[dayIndex] || !Array.isArray(grid[dayIndex])) {
                    return null;
                }

                return (
                    <React.Fragment key={day}>
                        <div className="timetable-day">{day}</div>
                        {grid[dayIndex].map((slot, periodIndex) => (
                            <div 
                                key={periodIndex} 
                                className={`timetable-cell subject-${slot && slot.type ? slot.type.toLowerCase() : 'free'}`}
                            >
                                {slot && slot.subject !== 'FREE' ? (
                                    <>
                                        <div className="subject-name">{slot.subject}</div>
                                        <div className="class-name">{slot.class}</div>
                                    </>
                                ) : (
                                    <div className="free-period">FREE</div>
                                )}
                            </div>
                        ))}
                    </React.Fragment>
                );
            })}
        </div>
    );
}