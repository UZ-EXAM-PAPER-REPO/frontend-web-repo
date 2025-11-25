import React from 'react';
import logo from '../assets/logo.svg';

export function Navigation({ currentPage, onNavigate, isLoggedIn, isAdmin, onLogout }) {
  return (
    <header className="nav-root">
      <div className="nav-inner">
        <div className="brand" onClick={() => onNavigate('landing')}>
          <img src={logo} alt="ExamRepo" style={{height: 34, marginRight: 10}} />
          <span className="brand-name">ExamRepo</span>
        </div>
        <nav className="nav-links">
          <button className={`nav-link ${currentPage === 'landing' ? 'active' : ''}`} onClick={() => onNavigate('landing')}>Home</button>
          <button className={`nav-link ${currentPage === 'browse' ? 'active' : ''}`} onClick={() => onNavigate('browse')}>Browse Papers</button>
          <button className={`nav-link ${currentPage === 'upload' ? 'active' : ''}`} onClick={() => onNavigate('upload')}>Upload</button>
          <button className={`nav-link ${currentPage === 'auth' ? 'active' : ''}`} onClick={() => onNavigate('auth')}>Login</button>
        </nav>
        <div className="nav-actions">
          {isLoggedIn ? (
            <button className="btn small" onClick={onLogout}>Logout</button>
          ) : (
            <button className="btn primary" onClick={() => onNavigate('auth')}>Login</button>
          )}
          {isAdmin && <button className="btn small" style={{marginLeft: '8px'}} onClick={() => onNavigate('admin')}>Admin</button>}
        </div>
      </div>
    </header>
  );
}
