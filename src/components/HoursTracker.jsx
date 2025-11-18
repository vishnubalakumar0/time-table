import React from 'react';

export default function HoursTracker({ timetable, staff }) {
  if (!timetable || !timetable.staffTimetables) {
    return null;
  }

  const teachers = staff.filter(s => s.role === 'staff');

  return (
    <div style={{ marginBottom: '30px' }}>
      <h3 style={{ marginBottom: '15px' }}>📊 Staff Hours Summary</h3>
      <table className="data-table">
        <thead>
          <tr>
            <th>Staff Name</th>
            <th>Teaching Hours</th>
            <th>Free Periods</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher) => {
            const staffTT = timetable.staffTimetables[teacher.name];
            if (!staffTT) {
              return (
                <tr key={teacher.id}>
                  <td>{teacher.name}</td>
                  <td>0</td>
                  <td>30</td>
                  <td>⚠️ Not Assigned</td>
                </tr>
              );
            }

            // Count teaching hours
            let teachingHours = 0;
            let freePeriods = 0;

            staffTT.forEach(day => {
              day.forEach(period => {
                if (period && period.type !== 'free') {
                  teachingHours++;
                } else {
                  freePeriods++;
                }
              });
            });

            const status = teachingHours >= 24 ? '✅ Full Load' :
                          teachingHours >= 18 ? '⚡ Good' :
                          teachingHours > 0 ? '⚠️ Low Load' :
                          '❌ No Classes';

            return (
              <tr key={teacher.id}>
                <td>{teacher.name}</td>
                <td>{teachingHours}/30</td>
                <td>{freePeriods}/30</td>
                <td>{status}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}