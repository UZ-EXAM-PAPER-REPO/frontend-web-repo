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

export default function AuthPage({ onLogin }) {
  const [mode, setMode] = useState('login'); // 'login' or 'register'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [faculty, setFaculty] = useState(FACULTIES[0]);
  const [error, setError] = useState(null);
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  async function submitForm(e) {
    e.preventDefault();
    setError(null);
    setInfo(null);

    const users = loadUsers();

    if (mode === 'login') {
      setLoading(true);
      if (!email || !password) {
        setError('Email and password are required.');
        setLoading(false);
        return;
      }

      const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
      if (!user) {
        setError('User not found. Please register first.');
        setLoading(false);
        return;
      }

      if (user.password !== password) {
        setError('Invalid password.');
        setLoading(false);
        return;
      }

      try {
        await onLogin(email, password);
        setInfo(`Welcome back, ${user.name.split(' ')[0]}!`);
      } catch (err) {
        console.warn('Login failed', err);
        setError('Failed to log in.');
      }

      setLoading(false);
      return;
    }

    // Register
    setLoading(true);
    if (!name.trim()) {
      setError('Please enter your full name.');
      setLoading(false);
      return;
    }
    if (!email || !password) {
      setError('Email and password are required.');
      setLoading(false);
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      setLoading(false);
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }

    const existing = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      setError('An account with that email already exists. Please login.');
      setLoading(false);
      setMode('login');
      return;
    }

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

    setInfo('Account created successfully. Please login.');
    setLoading(false);
    setMode('login');
    setPassword('');
    setConfirm('');
  }

  return (
    <div className="page auth-page">
      <div className="auth-box">
          <div className="auth-header">
          <h2>{mode === 'login' ? 'Login' : 'Create an Account'}</h2>
          <div className="auth-switch">
            <button type="button" className={`btn small ${mode === 'login' ? 'ghost' : ''}`} onClick={() => { setMode('login'); setError(null); setInfo(null); }}>Login</button>
            <button type="button" className={`btn small ${mode === 'register' ? 'ghost' : ''}`} onClick={() => { setMode('register'); setError(null); setInfo(null); }}>Register</button>
          </div>
        </div>

        {error && <div className="form-error" role="alert">{error}</div>}
        {info && <div className="form-success">{info}</div>}

        {mode === 'login' && (
          <form onSubmit={submitForm} className="auth-form">
            <label>
              Email
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input" required />
            </label>
            <label>
              Password
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input" required />
            </label>
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
              <a href="#register" className="muted" onClick={(e) => { e.preventDefault(); setMode('register'); }}>Need an account? Sign up</a>
              <button className="btn primary" type="submit" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
            </div>
          </form>
        )}

        {mode === 'register' && (
          <form onSubmit={submitForm} className="auth-form">
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
              <a href="#login" className="muted" onClick={(e) => { e.preventDefault(); setMode('login'); }}>Already have an account? Login</a>
              <button className="btn primary" type="submit" disabled={loading}>{loading ? 'Signing up...' : 'Create Account'}</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
