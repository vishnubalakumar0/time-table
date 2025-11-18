import React, { useState } from 'react';
import AnimatedBackground from './AnimatedBackground';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../utils/firebase';

export default function Login({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        if (!username || !password) {
            setLoading(false);
            return showError('Please enter username and password');
        }

        try {
            // Convert Username → Email format for Firebase
            const email = `${username}@timetable.com`;

            // Firebase Authentication
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const uid = userCredential.user.uid;

            // Get User Profile from Firestore
            const snap = await getDoc(doc(db, 'users', uid));

            if (!snap.exists()) {
                setLoading(false);
                return showError('User profile not found. Contact administrator.');
            }

            const profile = snap.data();

            // Handle different user roles
            if (profile.role === 'admin') {
                onLogin({ 
                    id: uid, 
                    name: profile.name || 'Admin',
                    role: 'admin' 
                });
            } 
            else if (profile.role === 'staff') {
                onLogin({ 
                    id: uid, 
                    name: profile.name,
                    username: profile.username || username,
                    role: 'staff' 
                });
            } 
            else if (profile.role === 'student') {
                onLogin({ 
                    id: uid, 
                    name: profile.name || username,
                    className: profile.className,
                    role: 'student' 
                });
            } 
            else {
                setLoading(false);
                return showError('Invalid user role.');
            }

        } catch (err) {
            setLoading(false);
            console.error('Login error:', err);

            if (err.code === 'auth/user-not-found') {
                showError('User not found. Check your username.');
            } else if (err.code === 'auth/wrong-password') {
                showError('Incorrect password. Please try again.');
            } else if (err.code === 'auth/invalid-email') {
                showError('Invalid username format.');
            } else if (err.code === 'auth/network-request-failed') {
                showError('Network error. Check your connection.');
            } else {
                showError('Login failed. Please check your credentials.');
            }
        }
    };

    const showError = (msg) => {
        setError(msg);
        setTimeout(() => setError(''), 4000);
    };

    return (
        <>
            <AnimatedBackground />
            <div className="login-container">
                <div className="login-card modern">
                    <div className="login-logo">
                        <div className="logo-icon">📚</div>
                    </div>

                    <div className="login-header">
                        <h1>Welcome Back</h1>
                        <p>Sign in to continue to Timetable Manager</p>
                    </div>

                    <form onSubmit={handleLogin} className="login-form">
                        <div className="form-group">
                            <label htmlFor="username">
                                <span className="label-icon">👤</span>
                                Username
                            </label>
                            <input
                                id="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter your username"
                                className="input modern"
                                autoComplete="username"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">
                                <span className="label-icon">🔒</span>
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                className="input modern"
                                autoComplete="current-password"
                                required
                            />
                        </div>

                        {error && (
                            <div className="error-message modern">
                                <span className="error-icon">⚠️</span>
                                {error}
                            </div>
                        )}

                        <button 
                            type="submit" 
                            className="btn btn-primary modern"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <span className="spinner"></span>
                                    Signing in...
                                </>
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}