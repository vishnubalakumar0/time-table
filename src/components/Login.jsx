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
            showError("Please enter username and password");
            return;
        }

        try {
            // Convert username → email for Firebase login
            const email = `${username}@timetable.com`;

            // 1️⃣ Firebase Authentication
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const uid = userCredential.user.uid;

            // 2️⃣ Firestore user profile
            const snap = await getDoc(doc(db, 'users', uid));
            if (!snap.exists()) {
                showError("User profile not found. Contact admin.");
                return;
            }

            // 3️⃣ Send user profile to App.jsx (role decides dashboard)
            onLogin({ id: uid, ...snap.data() });

        } catch (err) {
            console.error("Login Error:", err);
            showError("Invalid username or password");
        }
    };

    const showError = (msg) => {
        setError(msg);
        setTimeout(() => setError(""), 3000);
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
                        <div className="toast toast-error" style={{ marginBottom: '20px' }}>
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

                </div>
            </div>
        </>
    );
}
