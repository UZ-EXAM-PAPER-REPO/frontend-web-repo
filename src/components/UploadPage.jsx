import React, { useRef, useState, useEffect } from 'react';

const FACULTIES = [
  'Computer Science',
  'Engineering',
  'Medicine',
  'Law',
  'Business',
];

const COURSES = [
  { id: 'cs101', name: 'CS101 — Intro to CS' },
  { id: 'eng201', name: 'ENG201 — Engineering Math' },
  { id: 'med101', name: 'MED101 — Anatomy' },
];

const PAPER_TYPES = [
  { id: 'past', name: 'Past Exam' },
  { id: 'sheet', name: 'Lecture Sheet' },
  { id: 'assignment', name: 'Assignment' },
];

export function UploadPage({ isLoggedIn, onNavigate }) {
  const [title, setTitle] = useState('');
  const [faculty, setFaculty] = useState(FACULTIES[0])
  const [courseId, setCourseId] = useState('');
  const [paperTypeId, setPaperTypeId] = useState('');
  const [year, setYear] = useState(new Date().getFullYear());
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState([]); // {id, file, url, progress, status}
  const [message, setMessage] = useState(null);
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    return () => {
      // cleanup object urls
      files.forEach((f) => { if (f.url) URL.revokeObjectURL(f.url); });
    };
  }, [files]);

  function onFilesSelected(list) {
    const newFiles = Array.from(list).map((file) => ({
      id: Math.random().toString(36).slice(2),
      file,
      url: file.type.startsWith('image/') ? URL.createObjectURL(file) : null,
      progress: 0,
      status: 'queued',
    }));
    setFiles((prev) => [...prev, ...newFiles]);
  }

  function removeFile(id) {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  }

  function clearAll() {
    files.forEach((f) => { if (f.url) URL.revokeObjectURL(f.url); });
    setFiles([]);
  }

  function handleDrop(e) {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length) {
      onFilesSelected(e.dataTransfer.files);
    }
  }

  function handleDragEnter(e) { e.preventDefault(); setIsDragging(true); }
  function handleDragLeave(e) { e.preventDefault(); setIsDragging(false); }

  function handleUpload(e) {
    e.preventDefault();
    setMessage(null);

    if (!isLoggedIn) { setMessage({ type: 'error', text: 'You must be logged in to upload.' }); return; }
    if (!title.trim()) { setMessage({ type: 'error', text: 'Please provide a title.'}); return; }
    if (!courseId) { setMessage({ type: 'error', text: 'Select a course.'}); return; }
    if (!paperTypeId) { setMessage({ type: 'error', text: 'Select a paper type.'}); return; }
    if (!files.length) { setMessage({ type: 'error', text: 'Please add at least one file to upload.' }); return; }

    setMessage({ type: 'info', text: 'Uploading...' });
    files.forEach((f, idx) => {
      setTimeout(() => {
        const timer = setInterval(() => {
          setFiles((prev) => prev.map((p) => {
            if (p.id !== f.id) return p;
            const next = Math.min(100, p.progress + Math.ceil(Math.random() * 25));
            return { ...p, progress: next, status: next === 100 ? 'done' : 'uploading' };
          }));
        }, 300);
        setTimeout(() => {
          clearInterval(timer);
          setFiles((prev) => prev.map((p) => p.id === f.id ? { ...p, progress: 100, status: 'done' } : p));
        }, 3000 + Math.random() * 2000);
      }, idx * 150);
    });
    setTimeout(() => {
      setMessage({ type: 'success', text: 'Upload completed — thank you!' });
      // reset fields
      setTitle(''); setDescription(''); setFaculty(FACULTIES[0]); setCourseId(''); setPaperTypeId('');
    }, 4200);
  }

  return (
    <div className="page upload-page">
      <h2>Upload a Paper</h2>
      {!isLoggedIn && (
        <div className="auth-warning">
          <p>Please log in to upload papers.</p>
          <div>
            <button className="btn primary" onClick={() => onNavigate('auth')}>Login</button>
          </div>
        </div>
      )}

      {isLoggedIn && (
        <form className="upload-form" onSubmit={handleUpload} onDragOver={(e) => e.preventDefault()}>
          <div className="upload-row">
            <div className="upload-col form-col">
              <label>
                Title
                <input className="input" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Paper title or course name" />
              </label>

              <label>
                Faculty
                <select className="input" value={faculty} onChange={(e) => setFaculty(e.target.value)}>
                  {FACULTIES.map((f) => <option key={f} value={f}>{f}</option>)}
                </select>
              </label>

              <label>
                Course
                <select className="input" value={courseId} onChange={(e) => setCourseId(e.target.value)}>
                  <option value="">Select course</option>
                  {COURSES.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </label>

              <label>
                Paper Type
                <select className="input" value={paperTypeId} onChange={(e) => setPaperTypeId(e.target.value)}>
                  <option value="">Select type</option>
                  {PAPER_TYPES.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
                </select>
              </label>

              <label>
                Year
                <input className="input" type="number" value={year} onChange={(e) => setYear(e.target.value)} min="1970" max={new Date().getFullYear()} />
              </label>

              <label>
                Description (optional)
                <textarea className="input" rows={4} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Optional notes or keywords" />
              </label>

              <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                <button className="btn primary" type="submit">Upload</button>
                <button className="btn" type="button" onClick={() => { fileInputRef.current?.click(); }}>Add files</button>
                <button className="btn" type="button" onClick={clearAll}>Clear</button>
              </div>
            </div>

            <div className="upload-col files-col">
              <div className={`drag-area ${isDragging ? 'drag-over' : ''}`} onClick={() => fileInputRef.current?.click()} onDragEnter={handleDragEnter} onDragLeave={handleDragLeave} onDrop={handleDrop} role="button" aria-label="Upload files dropzone">
                <div className="drag-icon">📤</div>
                <div className="drag-text">Drag & drop files here, or click to select</div>
                <div className="drag-sub">PDF or Image files only</div>
                <input ref={fileInputRef} style={{ display: 'none' }} type="file" multiple onChange={(e) => onFilesSelected(e.target.files)} accept="application/pdf,image/*" />
              </div>

              <div className="file-list">
                {files.length === 0 && <div className="muted">No files selected</div>}
                {files.map((f) => (
                  <div key={f.id} className="file-row">
                    <div className="file-info">
                      <div className="file-thumb">{f.url ? <img src={f.url} alt={f.file.name} /> : '📄'}</div>
                      <div>
                        <div className="file-name">{f.file.name}</div>
                        <div className="file-meta">{(f.file.size / 1024).toFixed(0)} KB • {f.file.type}</div>
                      </div>
                    </div>
                    <div className="file-actions">
                      <div className="progress" aria-hidden>
                        <div className="progress-bar" style={{ width: f.progress + '%' }} />
                      </div>
                      <div className="file-actions-row"><button className="btn small" onClick={() => removeFile(f.id)}>Remove</button></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {message && <div className={`upload-message ${message.type}`}>{message.text}</div>}
        </form>
      )}
    </div>
  );
}
