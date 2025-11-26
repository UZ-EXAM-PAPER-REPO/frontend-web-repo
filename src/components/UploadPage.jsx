import React, { useRef, useState, useEffect } from "react";

const PAPER_TYPES = [
  { id: 1, name: "Exam Paper" },
  { id: 2, name: "Assignment" },
  { id: 3, name: "Exercise" },
  { id: 4, name: "Test" },
  { id: 5, name: "Tutorial" }
];

// TODO: Replace with real backend courses API
const COURSES = [
  { id: 1, name: "Course 1" },
  { id: 2, name: "Course 2" }
];

export function UploadPage({ isLoggedIn, onNavigate }) {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState(new Date().getFullYear());
  const [courseId, setCourseId] = useState("");
  const [paperTypeId, setPaperTypeId] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const [message, setMessage] = useState(null);
  const [progress, setProgress] = useState(0);

  const fileInputRef = useRef(null);

  useEffect(() => {
    // Cleanup preview URL
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  function handleFileSelect(e) {
    const selected = e.target.files[0];
    setFile(selected);
    if (selected && selected.type.startsWith("image/")) {
      setPreview(URL.createObjectURL(selected));
    } else {
      setPreview(null);
    }
  }

  async function handleUpload(e) {
    e.preventDefault();

    if (!isLoggedIn) {
      setMessage({ type: "error", text: "Please log in to upload." });
      return;
    }

    if (!title.trim()) {
      setMessage({ type: "error", text: "Title is required." });
      return;
    }

    if (!courseId) {
      setMessage({ type: "error", text: "Select a course." });
      return;
    }

    if (!paperTypeId) {
      setMessage({ type: "error", text: "Select a paper type." });
      return;
    }

    if (!file) {
      setMessage({ type: "error", text: "Upload a file." });
      return;
    }

    setMessage({ type: "info", text: "Uploading..." });

    const token = localStorage.getItem("token");
    if (!token) {
      setMessage({ type: "error", text: "You are not logged in." });
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("year", year);
    formData.append("courseId", courseId);
    formData.append("paperTypeId", paperTypeId);
    formData.append("file", file);

    try {
      // Fake progress bar simulation
      setProgress(10);
      const progressInterval = setInterval(() => {
        setProgress((p) => Math.min(90, p + 10));
      }, 300);

      const res = await fetch(
        "https://backend-repo-2-aqtm.onrender.com/api/papers/upload",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`
          },
          body: formData
        }
      );

      clearInterval(progressInterval);

      const data = await res.json();

      if (!res.ok) {
        setProgress(0);
        setMessage({ type: "error", text: data.error || "Upload failed" });
        return;
      }

      setProgress(100);
      setMessage({ type: "success", text: "Upload successful!" });

      // Reset form
      setTitle("");
      setYear(new Date().getFullYear());
      setCourseId("");
      setPaperTypeId("");
      setFile(null);
      setPreview(null);

    } catch (error) {
      setMessage({ type: "error", text: "Network error." });
    }
  }

  return (
    <div className="page upload-page">
      <h2>Upload Paper</h2>

      {!isLoggedIn && (
        <div className="auth-warning">
          <p>Please log in to continue.</p>
          <button className="btn primary" onClick={() => onNavigate("auth")}>
            Login
          </button>
        </div>
      )}

      {isLoggedIn && (
        <form className="upload-form" onSubmit={handleUpload}>
          <label>
            Title
            <input
              className="input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>

          <label>
            Year
            <input
              className="input"
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
          </label>

          <label>
            Course
            <select
              className="input"
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
            >
              <option value="">Select course</option>
              {COURSES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </label>

          <label>
            Paper Type
            <select
              className="input"
              value={paperTypeId}
              onChange={(e) => setPaperTypeId(e.target.value)}
            >
              <option value="">Select type</option>
              {PAPER_TYPES.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </label>

          <label>
            Upload File
            <input
              ref={fileInputRef}
              className="input"
              type="file"
              accept=".pdf,image/*"
              onChange={handleFileSelect}
            />
          </label>

          {preview && (
            <div className="preview">
              <img src={preview} height={120} alt="preview" />
            </div>
          )}

          {progress > 0 && (
            <div className="progress">
              <div
                className="progress-bar"
                style={{ width: progress + "%" }}
              />
            </div>
          )}

          <button className="btn primary" type="submit">
            Upload
          </button>

          {message && (
            <div className={`upload-message ${message.type}`}>
              {`this: ${message.text}`}
            </div>
          )}
        </form>
      )}
    </div>
  );
}
