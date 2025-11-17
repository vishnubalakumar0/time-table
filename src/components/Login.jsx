import React, { useState } from 'react';
import AnimatedBackground from './AnimatedBackground';
import { Storage } from '../utils/storage';

export default function Login({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('admin');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (role === 'admin') {
            // Admin login
            if (username === 'admin' && password === 'admin123') {
                onLogin({ 
                    name: 'Admin', 
                    role: 'admin' 
                });
            } else {
                setError('Invalid admin credentials');
            }
        } else if (role === 'staff') {
            // Staff login - FIX APPLIED HERE!
            const staff = Storage.get('staff') || [];

            // Find staff member by username
            const staffMember = staff.find(
                s => s && s.name && s.name.toLowerCase() === username.toLowerCase()
            );

            if (staffMember && password === 'staff123') {
                // FIX: Set user.name to the EXACT staff name from database
                onLogin({ 
                    name: staffMember.name,  // ← THIS IS THE FIX!
                    role: 'staff' 
                });
            } else if (!staffMember) {
                setError(`Staff member "${username}" not found. Check spelling.`);
            } else {
                setError('Invalid staff credentials');
            }
        } else if (role === 'student') {
            // Student login
            if (password === 'student123') {
                const classes = Storage.get('classes') || [];
                const studentClass = classes.find(c => 
                    c && c.name && c.name.toLowerCase() === username.toLowerCase()
                );

                if (studentClass) {
                    onLogin({ 
                        name: username, 
                        role: 'student', 
                        className: studentClass.name 
                    });
                } else {
                    setError('Class not found');
                }
            } else {
                setError('Invalid student credentials');
            }
        }
    };

    return (
        <>
            <AnimatedBackground />
            <div className="login-container">
                <div className="login-card">
                    <div className="login-header">
                        <h1>📚 Timetable Manager</h1>
                        <p>Intelligent Scheduling System</p>
                    </div>

                    <form onSubmit={handleSubmit} className="login-form">
                        <div className="form-group">
                            <label>Role</label>
                            <select 
                                value={role} 
                                onChange={(e) => {
                                    setRole(e.target.value);
                                    setError('');
                                }}
                                className="input"
                            >
                                <option value="admin">Admin</option>
                                <option value="staff">Staff</option>
                                <option value="student">Student</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>
                                {role === 'admin' ? 'Username' : 
                                 role === 'staff' ? 'Staff Name' : 
                                 'Class Name'}
                            </label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder={
                                    role === 'admin' ? 'Enter username' :
                                    role === 'staff' ? 'e.g., Dr. Kavitha' :
                                    'e.g., I MSCC (a1)'
                                }
                                className="input"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter password"
                                className="input"
                                required
                            />
                        </div>

                        {error && (
                            <div className="error-message">
                                {error}
                            </div>
                        )}

                        <button type="submit" className="btn btn-primary">
                            Login
                        </button>

                        <div className="login-info">
                            <h4>Demo Credentials:</h4>
                            <p><strong>Admin:</strong> admin / admin123</p>
                            <p><strong>Staff:</strong> [Staff Name] / staff123</p>
                            <p><strong>Student:</strong> [Class Name] / student123</p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}