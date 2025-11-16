import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import { initializeData } from './utils/storage';

// Import dashboards dynamically to keep bundle small
const AdminDashboard = React.lazy(() => import('./components/AdminDashboard'));
const StaffDashboard = React.lazy(() => import('./components/StaffDashboard'));
const StudentDashboard = React.lazy(() => import('./components/StudentDashboard'));

export default function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        initializeData();
    }, []);

    const handleLogout = () => {
        if (confirm('Are you sure you want to logout?')) {
            setUser(null);
        }
    };

    if (!user) {
        return <Login onLogin={setUser} />;
    }

    return (
        <React.Suspense fallback={<div>Loading...</div>}>
            {user.role === 'admin' && <AdminDashboard user={user} onLogout={handleLogout} />}
            {user.role === 'staff' && <StaffDashboard user={user} onLogout={handleLogout} />}
            {user.role === 'student' && <StudentDashboard user={user} onLogout={handleLogout} />}
        </React.Suspense>
    );
}