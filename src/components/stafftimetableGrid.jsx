import React from 'react';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

export default function StaffTimetableGrid({ timetable, staffName }) {
    // Debug logging
    console.log('=== StaffTimetableGrid Debug ===');
    console.log('Received timetable:', timetable);
    console.log('Received staffName:', staffName);
    console.log('timetable keys:', timetable ? Object.keys(timetable) : 'timetable is null');

    // Check if timetable exists
    if (!timetable) {
        console.warn('No timetable data received');
        return (
            <div style={{padding: '40px', textAlign: 'center', color: '#64748b'}}>
                <p>No timetable data available</p>
                <p style={{fontSize: '14px', marginTop: '10px'}}>
                    Please generate a timetable first from the Admin Dashboard
                </p>
            </div>
        );
    }

    // Check if staff timetable exists
    if (!timetable[staffName]) {
        console.warn(`No timetable found for staff: ${staffName}`);
        console.log('Available staff timetables:', Object.keys(timetable));
        return (
            <div style={{padding: '40px', textAlign: 'center', color: '#64748b'}}>
                <p>No timetable available for {staffName}</p>
                <p style={{fontSize: '14px', marginTop: '10px'}}>
                    Timetable may not have been generated yet or you are not assigned any classes.
                </p>
            </div>
        );
    }

    const grid = timetable[staffName];

    // Validate grid structure
    console.log('Grid data:', grid);
    console.log('Grid is array?', Array.isArray(grid));
    console.log('Grid length:', grid ? grid.length : 0);

    if (!Array.isArray(grid) || grid.length === 0) {
        console.error('Invalid grid structure');
        return (
            <div style={{padding: '40px', textAlign: 'center', color: '#64748b'}}>
                <p>Invalid timetable format</p>
                <p style={{fontSize: '14px', marginTop: '10px'}}>
                    Please regenerate the timetable from Admin Dashboard
                </p>
            </div>
        );
    }

    console.log('Rendering timetable grid...');

    return (
        <div id="staff-timetable-export" className="timetable-grid">
            {/* Header Row */}
            <div className="timetable-header">Day/Period</div>
            {[...Array(6)].map((_, i) => (
                <div key={i} className="timetable-header">P{i + 1}</div>
            ))}

            {/* Timetable Rows */}
            {DAYS.map((day, dayIndex) => {
                // Safety check for each day
                if (!grid[dayIndex] || !Array.isArray(grid[dayIndex])) {
                    console.warn(`Invalid data for day ${day} (index ${dayIndex})`);
                    return null;
                }

                return (
                    <React.Fragment key={day}>
                        <div className="timetable-day">{day}</div>
                        {grid[dayIndex].map((slot, periodIndex) => {
                            // Safety check for slot
                            if (!slot) {
                                return (
                                    <div key={periodIndex} className="timetable-cell subject-free">
                                        <div style={{ color: '#94a3b8' }}>FREE</div>
                                    </div>
                                );
                            }

                            const subjectType = slot.type ? slot.type.toLowerCase() : 'free';
                            const isFree = slot.subject === 'FREE' || !slot.subject;

                            return (
                                <div 
                                    key={periodIndex} 
                                    className={`timetable-cell subject-${subjectType}`}
                                >
                                    {!isFree ? (
                                        <>
                                            <div className="subject-name">
                                                {slot.subject}
                                            </div>
                                            <div className="teacher-name">
                                                {slot.class || '-'}
                                            </div>
                                        </>
                                    ) : (
                                        <div style={{ color: '#94a3b8', fontWeight: '500' }}>
                                            FREE
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </React.Fragment>
                );
            })}
        </div>
    );
}