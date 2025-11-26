import React, { useState } from 'react';

const FACULTIES = ['Computer Science', 'Engineering', 'Medicine', 'Law', 'Business'];
const USERS_KEY = 'examrepo_users';

function loadUsers() {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.warn('Failed to load users', err);
    return [];
  }
}

function saveUsers(users) {
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  } catch (err) {
    console.warn('Failed to save users', err);
  }
}

export default function RegisterPage({ onRegistered, onNavigate }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [faculty, setFaculty] = useState(FACULTIES[0]);
  const [error, setError] = useState(null);
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  function clearForm() {
    setName('');
    setEmail('');
    setPassword('');
    setConfirm('');
    setFaculty(FACULTIES[0]);
  }

  function submitRegistration(e) {
    e.preventDefault();
    setError(null);
    setInfo(null);
    const users = loadUsers();

    if (!name.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (!email || !password) {
      setError('Email and password are required.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }

    const existing = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      setError('An account with that email already exists. Please login.');
      return;
    }

    setLoading(true);
    const newUser = {
      id: Date.now(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password,
      faculty,
      role: email.toLowerCase().includes('admin') ? 'admin' : 'user',
    };

    users.push(newUser);
    saveUsers(users);
    setLoading(false);
    setInfo('Account created successfully. Please login.');
    clearForm();

    // call callback if the parent wants to auto-navigate/login
    if (onRegistered) onRegistered(newUser);
    if (onNavigate) onNavigate('auth');
  }

  return (
    <div className="page auth-page">
      <div className="auth-box">
        <div className="auth-header">
          <h2>Create an Account</h2>
        </div>

        {error && <div className="form-error" role="alert">{error}</div>}
        {info && <div className="form-success">{info}</div>}

        <form onSubmit={submitRegistration} className="auth-form">
          <label>
            Full Name
            <input value={name} onChange={(e) => setName(e.target.value)} className="input" required />
          </label>
          <label>
            Email
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input" required />
          </label>
          <label>
            Password
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input" required />
          </label>
          <label>
            Confirm Password
            <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} className="input" required />
          </label>
          <label>
            Faculty
            <select className="input" value={faculty} onChange={(e) => setFaculty(e.target.value)}>
              {FACULTIES.map((f) => <option key={f} value={f}>{f}</option>)}
            </select>
          </label>

          <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', alignItems: 'center' }}>
            <a href="#login" className="muted" onClick={(e) => { e.preventDefault(); if (onNavigate) onNavigate('auth'); }}>Already have an account? Login</a>
            <button className="btn primary" type="submit" disabled={loading}>{loading ? 'Signing up...' : 'Create Account'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
