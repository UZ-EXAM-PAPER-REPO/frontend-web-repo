import React, { useState } from 'react';
import logo from '../assets/logo.svg';

export function Navigation({ currentPage, onNavigate, isLoggedIn, isAdmin, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const handleNav = (e, target) => {
    e.preventDefault();
    setMenuOpen(false);
    onNavigate(target);
  };

  return (
    <header className="nav-root">
      <div className="nav-inner">
        <div className="brand" onClick={() => onNavigate('landing')}>
          <img src={logo} alt="ExamRepo" style={{height: 34, marginRight: 10}} />
          <span className="brand-name">ExamRepo</span>
        </div>
        <button className={`nav-toggle ${menuOpen ? 'open' : ''}`} aria-expanded={menuOpen} aria-label="Toggle navigation menu" onClick={() => setMenuOpen(!menuOpen)}>
          <span className="hamburger" />
        </button>
        <nav className={`nav-links ${menuOpen ? 'open' : ''}`} role="navigation">
          <a href="#home" className={`nav-link ${currentPage === 'landing' ? 'active' : ''}`} onClick={(e) => handleNav(e, 'landing')}>Home</a>
          <a href="#browse" className={`nav-link ${currentPage === 'browse' ? 'active' : ''}`} onClick={(e) => handleNav(e, 'browse')}>Browse Papers</a>
          <a href="#upload" className={`nav-link ${currentPage === 'upload' ? 'active' : ''}`} onClick={(e) => handleNav(e, 'upload')}>Upload</a>
          <a href="#login" className={`nav-link ${currentPage === 'auth' ? 'active' : ''}`} onClick={(e) => handleNav(e, 'auth')}>Login</a>
        </nav>
        <div className="nav-actions">
          {!isLoggedIn && (
            <a href="#register" className="btn small" style={{marginRight: '8px'}} onClick={(e) => handleNav(e, 'register')}>Sign up</a>
          )}
          {isLoggedIn ? (
            <button className="btn small" onClick={onLogout}>Logout</button>
          ) : (
            <a href="#login" className="btn primary" onClick={(e) => handleNav(e, 'auth')}>Login</a>
          )}
          {isAdmin && <button className="btn small" style={{marginLeft: '8px'}} onClick={() => onNavigate('admin')}>Admin</button>}
        </div>
      </div>
    </header>
  );
}
