import React from 'react';
import { Hero } from './Hero';
import { Faculty } from './Faculty';

export function LandingPage({ onNavigate }) {
  return (
    <div className="landing-page">
      <Hero onSearch={() => onNavigate('browse')} />
      <section className="browse-stats">
        <div className="stat-card">
          <div className="stat-title">10,000+</div>
          <div className="stat-sub">Exam Papers</div>
        </div>
        <div className="stat-card">
          <div className="stat-title">20,000+</div>
          <div className="stat-sub">Students</div>
        </div>
        <div className="stat-card">
          <div className="stat-title">90%</div>
          <div className="stat-sub">Success Rate</div>
        </div>
      </section>

      <Faculty />
    </div>
  );
}
