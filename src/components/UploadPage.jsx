import React from 'react';

export function UploadPage({ isLoggedIn, onNavigate }) {
  return (
    <div className="page upload-page">
      <h2>Upload a Paper</h2>
      {isLoggedIn ? (
        <p>Use the form to upload exam papers (placeholder).</p>
      ) : (
        <p>Please log in to upload papers. <button className="btn primary" onClick={() => onNavigate('auth')}>Login</button></p>
      )}
    </div>
  );
}
