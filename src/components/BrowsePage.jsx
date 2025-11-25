import React from 'react';
import { PaperCard } from './PaperCard';

export function BrowsePage() {
  return (
    <div className="page browse-page">
      <h2>Browse Papers</h2>
      <p>Search and browse all exam papers here — you can filter by faculty, course or year.</p>
      <div className="browse-list">
        <PaperCard title="CS101 - Intro to Programming" faculty="Computer Science" year={2022} fileCount={3} />
        <PaperCard title="ENG201 - Statics" faculty="Engineering" year={2021} fileCount={5} />
        <PaperCard title="MED301 - Anatomy" faculty="Medicine" year={2020} fileCount={2} />
      </div>
    </div>
  );
}
