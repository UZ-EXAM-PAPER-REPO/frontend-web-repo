import React, { useState } from 'react';

export function AuthPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="page auth-page">
      <div className="auth-box">
        <h2>Login</h2>
        <form onSubmit={(e) => {e.preventDefault(); onLogin(email, password);}}>
          <label>
            Email
            <input value={email} onChange={(e) => setEmail(e.target.value)} className="input" />
          </label>
          <label>
            Password
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input" />
          </label>
          <div style={{display: 'flex', gap: '8px', justifyContent: 'flex-end'}}>
            <button className="btn primary" type="submit">Login</button>
            <button className="btn" onClick={(e) => {e.preventDefault(); alert('Signup placeholder');}}>Signup</button>
          </div>
        </form>
      </div>
    </div>
  );
}
