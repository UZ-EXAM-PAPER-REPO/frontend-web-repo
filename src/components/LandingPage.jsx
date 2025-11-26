import React from 'react';
import { Hero } from './Hero';
import { Faculty } from './Faculty';
import { StatsCard } from './StatsCard';

export function LandingPage({ onNavigate }) {
  return (
    <div className="landing-page">
      <Hero onSearch={() => onNavigate('browse')} onNavigate={onNavigate} />
      <section className="browse-stats">
        <StatsCard icon="📚" value="10,000+" label="Exam Papers" />
        <StatsCard icon="👥" value="20,000+" label="Students" />
        <StatsCard icon="📈" value="90%" label="Success Rate" />
      </section>

      <Faculty />
    </div>
  );
}
