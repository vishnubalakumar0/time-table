import React, { useState, useEffect } from 'react';
import AnimatedBackground from './AnimatedBackground';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../utils/firebase';

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!username || !password) {
      setLoading(false);
      return showError('Please enter username and password');
    }

    try {
      const email = `${username}@timetable.com`;
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;
      const snap = await getDoc(doc(db, 'users', uid));

      if (!snap.exists()) {
        setLoading(false);
        return showError('User profile not found');
      }

      const profile = snap.data();

      if (profile.role === 'admin') {
        onLogin({ id: uid, name: profile.name || 'Admin', role: 'admin' });
      } else if (profile.role === 'staff') {
        onLogin({
          id: uid,
          name: profile.name,
          username: profile.username || username,
          role: 'staff'
        });
      } else if (profile.role === 'student') {
        onLogin({ id: uid, name: profile.name || username, className: profile.className, role: 'student' });
      } else {
        setLoading(false);
        return showError('Invalid user role');
      }
    } catch (err) {
      setLoading(false);
      console.error('Login error:', err);
      if (err.code === 'auth/user-not-found') {
        showError('User not found');
      } else if (err.code === 'auth/wrong-password') {
        showError('Incorrect password');
      } else {
        showError('Login failed. Check credentials.');
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
        <div className={`login-card enhanced ${mounted ? 'mounted' : ''}`}>
          {/* Animated Logo Section */}
          <div className="login-logo-section">
            {/* Floating particles */}
            <div className="header-particle"></div>
            <div className="header-particle"></div>
            <div className="header-particle"></div>
            <div className="header-particle"></div>
            
            <div className="logo-circle">
              <span className="logo-icon">📅</span>
            </div>
            <h1 className="login-main-title">Timetable Generator</h1>
            <p className="login-tagline">Smart Scheduling Made Simple</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="login-form-enhanced">
            <div className="form-header">
              <h2 className="form-title">Welcome Back</h2>
              <p className="form-subtitle">Sign in to continue</p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="error-alert animated">
                <span className="error-icon">⚠️</span>
                <span className="error-text">{error}</span>
              </div>
            )}

            {/* Username Input */}
            <div className="input-group enhanced">
              <div className="input-icon-wrapper">
                <span className="input-icon">👤</span>
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="input-field"
                required
                disabled={loading}
              />
              <label className={`floating-label ${username ? 'active' : ''}`}>
                Username
              </label>
              <div className="input-underline"></div>
            </div>

            {/* Password Input */}
            <div className="input-group enhanced">
              <div className="input-icon-wrapper">
                <span className="input-icon">🔒</span>
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                required
                disabled={loading}
              />
              <label className={`floating-label ${password ? 'active' : ''}`}>
                Password
              </label>
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                disabled={loading}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
              <div className="input-underline"></div>
            </div>

           
            {/* Submit Button */}
            <button
              type="submit"
              className={`btn-login enhanced ${loading ? 'loading' : ''}`}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-circle"></span>
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <span className="btn-arrow">→</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}