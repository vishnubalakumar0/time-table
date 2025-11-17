import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../utils/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!username || !password) {
      setError("Enter username & password");
      return;
    }

    // Convert username → email for Firebase Auth
    const email = `${username}@timetable.com`;

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const uid = userCredential.user.uid;

      // Fetch role from Firestore
      const snap = await getDoc(doc(db, "users", uid));

      let role = "staff"; // default
      if (snap.exists() && snap.data().role) {
        role = snap.data().role;
      }

      onLogin({ uid, role, username });

    } catch (err) {
      console.error(err);
      setError("Invalid username or password!");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="form-group">
        <label>Username</label>
        <input
          type="text"
          placeholder="admin / john..."
          value={username}
          onChange={(e) => setUsername(e.target.value.toLowerCase())}
        />
      </div>

      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          placeholder="********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button className="btn btn-primary" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}
