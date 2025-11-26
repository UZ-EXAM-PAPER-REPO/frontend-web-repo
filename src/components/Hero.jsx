import React from 'react';
import heroImg from '../assets/hero.svg';

export function Hero({ onSearch }) {
  return (
    <section className="hero">
      <div className="hero-left">
        <h3 className="eyebrow">University of Zimbabwe Exam Repository</h3>
        <h1 className="hero-title">Find UEZ Exam Papers in Seconds</h1>
        <p className="hero-desc">Access thousands of past exam papers from all faculties at the University of Zimbabwe. Study smarter, collaborate with fellow students, and ace your exams.</p>

        <div className="search-row">
          <input className="search-input" placeholder="Search by subject, course code, or faculty" />
          <button className="btn primary" onClick={onSearch}>Search</button>
        </div>

        <div className="hero-actions">
          <button className="btn ghost">Browse Papers</button>
          <button className="btn" style={{marginLeft: '8px'}}>Upload Paper</button>
        </div>

        <div className="stats-row">
          <div className="stat">
            <div className="stat-number">10,000+</div>
            <div className="stat-label">Papers</div>
          </div>
          <div className="stat">
            <div className="stat-number">20,000+</div>
            <div className="stat-label">Students</div>
          </div>
          <div className="stat">
            <div className="stat-number">90%</div>
            <div className="stat-label">Success Rate</div>
          </div>
        </div>
      </div>
      <div className="hero-right">
        <div className="hero-card">
          <img src={heroImg} alt="hero" className="hero-image" />
          <div className="badge">10,000+ Papers Available</div>
        </div>
      </div>
    </section>
  );
}
