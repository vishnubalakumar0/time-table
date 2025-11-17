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
        setError("");

        if (!username || !password) {
            return showError("Enter username & password");
        }

        try {
            // Convert Username → Email format for Firebase
            const email = `${username}@timetable.com`;

            // 1️⃣ Firebase Authentication
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const uid = userCredential.user.uid;

            // 2️⃣ Get Role from Firestore
            const snap = await getDoc(doc(db, "users", uid));
            if (!snap.exists()) {
                return showError("User profile missing. Contact admin.");
            }

            const profile = snap.data();

            // 3️⃣ Send role to App.jsx
            onLogin({ id: uid, ...profile });

        } catch (err) {
            console.error("Login error:", err);
            showError("Invalid username or password");
        }
    };

    const showError = (msg) => {
        setError(msg);
        setTimeout(() => setError(""), 2500);
    };

    return (
        <>
            <AnimatedBackground />
            <div className="login-container">
                <div className="login-box glass">

                    <h1 className="login-title">Smart Timetable</h1>
                    <p className="login-subtitle">Premium Edition 🔥</p>

                    {error && (
                        <div className="toast toast-error" style={{ marginBottom: 20 }}>
                            ❌ {error}
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

                        <button type="submit" className="btn btn-primary" style={{ width: "100%" }}>
                            Login
                        </button>
                    </form>

                </div>
            </div>
        </>
    );
}
