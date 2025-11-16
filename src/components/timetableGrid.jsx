import React from 'react';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

export default function TimetableGrid({ timetable, className }) {
    if (!timetable || !timetable[className]) {
        return (
            <div style={{padding: '40px', textAlign: 'center', color: '#64748b'}}>
                No timetable generated yet
            </div>
        );
    }

    const grid = timetable[className];

    return (
        <div id="timetable-export" className="timetable-grid">
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
                            className={`timetable-cell subject-${slot ? slot.type.toLowerCase() : 'other'}`}
                        >
                            {slot ? (
                                <>
                                    <div className="subject-name">{slot.subject}</div>
                                    <div className="teacher-name">{slot.teacher}</div>
                                </>
                            ) : (
                                <div>-</div>
                            )}
                        </div>
                    ))}
                </React.Fragment>
            ))}
        </div>
    );
}