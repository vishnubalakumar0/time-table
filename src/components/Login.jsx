import React, { useState } from 'react';
import AnimatedBackground from './AnimatedBackground';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../utils/firebase';

export default function Login({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        if (!username || !password) {
            setError('Please enter username and password');
            setTimeout(() => setError(''), 3000);
            return;
        }

        try {
            const email = `${username}@timetable.com`;

            // 1️⃣ Sign in with Firebase Auth
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const uid = userCredential.user.uid;

            // 2️⃣ Fetch user profile from Firestore
            const snap = await getDoc(doc(db, 'users', uid));

            if (!snap.exists()) {
                setError('User profile not found. Contact admin.');
                setTimeout(() => setError(''), 3000);
                return;
            }

            const userData = { id: uid, ...snap.data() };

            // 3️⃣ Pass data up to App (role-based dashboard)
            onLogin(userData);
        } catch (err) {
            console.error('Login error:', err);
            setError('Invalid credentials!');
            setTimeout(() => setError(''), 3000);
        }
    };

    return (
        <>
            <AnimatedBackground />
            <div className="login-container">
                <div className="login-box glass">
                    <div className="login-logo">🏫</div>
                    <h1 className="login-title">Smart Timetable</h1>
                    <p className="login-subtitle">Premium Edition</p>

                    {error && (
                        <div className="toast toast-error" style={{marginBottom: '20px'}}>
                            <span className="toast-icon">❌</span>
                            <span className="toast-text">{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleLogin}>
                        <div className="input-wrapper">
                            <span className="input-icon">👤</span>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Username"
                                required
                            />
                        </div>

                        <div className="input-wrapper">
                            <span className="input-icon">🔒</span>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                required
                            />
                        </div>

                        <button type="submit" className="btn btn-primary">
                            Login
                        </button>
                    </form>

                    <div style={{
                        marginTop: '25px',
                        padding: '16px',
                        background: '#f8fafc',
                        borderRadius: '12px',
                        fontSize: '13px',
                        color: '#64748b'
                    }}>
                        <strong style={{color: '#1e293b'}}>Demo Credentials:</strong><br/>
                        <div style={{marginTop: '8px', lineHeight: '1.6'}}>
                            Admin: admin / admin123<br/>
                            Staff: alice / staff123<br/>
                            Student: student / student123
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
