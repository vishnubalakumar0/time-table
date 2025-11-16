import React from 'react';

export default function HoursTracker({ className, subjects }) {
    const allocated = subjects
        .filter(s => s.className === className)
        .reduce((sum, s) => sum + s.hoursPerWeek, 0);

    const remaining = 30 - allocated;
    const percentage = (allocated / 30) * 100;

    return (
        <div className="hours-tracker">
            <div className="hours-grid">
                <div className="hours-item">
                    <div className="hours-label">Allocated</div>
                    <div className="hours-value">{allocated}</div>
                </div>
                <div className="hours-item">
                    <div className="hours-label">Remaining</div>
                    <div className="hours-value">{remaining}</div>
                </div>
                <div className="hours-item">
                    <div className="hours-label">Total</div>
                    <div className="hours-value">30</div>
                </div>
            </div>
            <div className="progress-bar">
                <div 
                    className="progress-fill" 
                    style={{ width: `${Math.min(percentage, 100)}%` }} 
                />
            </div>
            {remaining === 0 && (
                <div style={{ marginTop: '12px', textAlign: 'center', fontWeight: 'bold' }}>
                    ✓ Perfect! No free periods.
                </div>
            )}
            {remaining < 0 && (
                <div style={{ marginTop: '12px', textAlign: 'center', fontWeight: 'bold', color: '#ef4444' }}>
                    ⚠ Over by {Math.abs(remaining)} hours!
                </div>
            )}
        </div>
    );
}