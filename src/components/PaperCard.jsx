import React from 'react';

export function PaperCard({ title, faculty, year, fileCount }) {
  return (
    <div className="paper-card">
      <div className="paper-content">
        <div className="paper-meta">
          <div className="paper-faculty">{faculty}</div>
          <div className="paper-year">{year}</div>
        </div>
        <h3 className="paper-title">{title}</h3>
        <div className="paper-footer">
          <div className="paper-count">{fileCount} papers</div>
          <button className="btn small">View</button>
        </div>
      </div>
    </div>
  );
}
