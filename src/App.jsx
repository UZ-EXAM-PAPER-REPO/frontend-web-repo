import { useState } from 'react';
import './App.css';
import axios from 'axios';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { LandingPage } from './components/LandingPage';
import { BrowsePage } from './components/BrowsePage';
import { UploadPage } from './components/UploadPage';
import { AuthPage } from './components/AuthPage';
import { AdminDashboard } from './components/AdminDashboard';

const API_URL = "https://backend-repo-2-aqtm.onrender.com/api/auth";

export default function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleLogin = async (email, password) => {
    try {
      const res = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });
      console.log(res);

      // Save JWT token
      localStorage.setItem("token", res.data.token);

      setIsLoggedIn(true);

      if (res.data.user?.role === "admin") {
        setIsAdmin(true);
      }

      setCurrentPage("landing");
      alert("Login successful!");

    } catch (err) {
      console.log("Login error:", err.response?.data || err);
      alert("Invalid credentials. Pleaseeee", err );
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setIsAdmin(false);
    setCurrentPage('landing');
  };

  return (
    <div className="app-root">
      <div className="page-title">ExamRepo Web Platform Design</div>

      <Navigation
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        isLoggedIn={isLoggedIn}
        isAdmin={isAdmin}
        onLogout={handleLogout}
      />

      <main className="flex-1">
        {currentPage === 'landing' && <LandingPage onNavigate={setCurrentPage} />}
        {currentPage === 'browse' && <BrowsePage />}
        {currentPage === 'upload' && <UploadPage isLoggedIn={isLoggedIn} onNavigate={setCurrentPage} />}
        {currentPage === 'auth' && <AuthPage onLogin={handleLogin} />}
        {currentPage === 'admin' && isAdmin && <AdminDashboard />}
      </main>

      <Footer />
    </div>
  );
}
