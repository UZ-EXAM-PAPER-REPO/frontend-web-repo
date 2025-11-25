import React, { useState } from 'react';

export function AuthPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submitForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await onLogin(email, password);  // Calls backend
    } catch (err) {
      setError("Invalid login credentials.");
    }

    setLoading(false);
  };

  return (
    <div className="page auth-page">
      <div className="auth-box">
        <h2>Login</h2>

        {error && (
          <p style={{ color: "red", marginBottom: "10px" }}>
            {error}
          </p>
        )}

        <form onSubmit={submitForm}>
          <label>
            Email
            <input 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              required
            />
          </label>

          <label>
            Password
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              required
            />
          </label>

          <div style={{display: 'flex', gap: '8px', justifyContent: 'flex-end'}}>
            <button className="btn primary" type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>

            <button className="btn" onClick={(e) => {e.preventDefault(); alert('Signup coming soon!')}}>
              Signup
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
