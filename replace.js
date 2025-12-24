const fs = require('fs');
const filePath = 'd:\\Files\\timetable\\src\\components\\AdminDashboard.jsx';
const content = fs.readFileSync(filePath, 'utf-8');
const lines = content.split('\n');

console.log('Total lines:', lines.length);
console.log('Line 434 (index 433):', lines[433] ? lines[433].substring(0, 80) : 'N/A');
console.log('Line 483 (index 482):', lines[482] ? lines[482].substring(0, 80) : 'N/A');
console.log('Line 484 (index 483):', lines[483] ? lines[483].substring(0, 80) : 'N/A');