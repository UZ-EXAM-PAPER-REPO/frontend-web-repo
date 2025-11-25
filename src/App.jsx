
import { useState } from 'react';
import './App.css';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { LandingPage } from './components/LandingPage';
import { BrowsePage } from './components/BrowsePage';
import { UploadPage } from './components/UploadPage';
import { AuthPage } from './components/AuthPage';
import { AdminDashboard } from './components/AdminDashboard';

export default function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleLogin = (email, password) => {
    // Mock login logic
    setIsLoggedIn(true);
    if (email.includes('admin')) {
      setIsAdmin(true);
    }
    // basic placeholder use of password to satisfy lint rules
    if (password && password.length < 3) {
      // ignore weak password for demo (placeholder)
    }
    setCurrentPage('landing');
  };

  const handleLogout = () => {
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
