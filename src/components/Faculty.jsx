import React from 'react';

const FACULTIES = [
  { id: 'cs', name: 'Computer Science', papers: 224 },
  { id: 'eng', name: 'Engineering', papers: 198 },
  { id: 'med', name: 'Medicine', papers: 165 },
  { id: 'law', name: 'Law', papers: 92 },
];

export function Faculty() {
  return (
    <section className="faculty">
      <h2>Browse by Faculty</h2>
      <p className="sub">Explore exam papers organized by field of study</p>

      <div className="faculty-grid">
        {FACULTIES.map((f) => (
          <div className="faculty-card" key={f.id}>
            <div className="faculty-icon">📘</div>
            <div className="faculty-info">
              <div className="faculty-name">{f.name}</div>
              <div className="faculty-papers">{f.papers} papers</div>
            </div>
            <div className="faculty-arrow">›</div>
          </div>
        ))}
      </div>
    </section>
  );
}
