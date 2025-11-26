import { useState } from 'react';
import './App.css';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { LandingPage } from './components/LandingPage';
import { BrowsePage } from './components/BrowsePage';
import { UploadPage } from './components/UploadPage';
import AuthPage from './components/AuthPageClean';
import RegisterPage from './components/RegisterPage';
import { AdminDashboard } from './components/AdminDashboard';

// Note: authentication is implemented locally using `localStorage` in this example.
const USERS_KEY = 'examrepo_users';

export default function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleLogin = async (email, password) => {
    // Read local users – this app supports local registration via the Auth page.
    const raw = localStorage.getItem(USERS_KEY);
    const users = raw ? JSON.parse(raw) : [];

    const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      throw new Error('User not found');
    }
    if (user.password !== password) {
      throw new Error('Invalid password');
    }

    // Save a simple token for illustration
    localStorage.setItem('token', `local-${user.id}`);
    setIsLoggedIn(true);
    setIsAdmin(user.role === 'admin');
    setCurrentPage('landing');
    return { user };
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
        {currentPage === 'register' && <RegisterPage onRegistered={() => { /* optional: auto-login or show success */ }} onNavigate={setCurrentPage} />}
        {currentPage === 'admin' && isAdmin && <AdminDashboard />}
      </main>

      <Footer />
    </div>
  );
}
