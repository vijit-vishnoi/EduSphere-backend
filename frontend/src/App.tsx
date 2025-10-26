import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ParticleBackground from './components/ParticleBackground';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import ForgotPasswordPage from './components/ForgotPasswordPage';
import StudentDashboard from './components/StudentDashboard';
import TeacherDashboard from './components/TeacherDashboard';

type Page = 'login' | 'signup' | 'forgot-password' | 'student-dashboard' | 'teacher-dashboard';
type UserRole = 'student' | 'teacher' | null;

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('login');
  const [userRole, setUserRole] = useState<UserRole>(null);

  const handleLogin = (role: 'student' | 'teacher') => {
    setUserRole(role);
    setCurrentPage(role === 'student' ? 'student-dashboard' : 'teacher-dashboard');
  };

  const handleLogout = () => {
    setUserRole(null);
    setCurrentPage('login');
  };

  const pageVariants = {
    initial: { opacity: 0, x: 50 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: -50 }
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.5
  };

  return (
    <div className="dark min-h-screen overflow-hidden">
      <ParticleBackground />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
          className="min-h-screen"
        >
          {currentPage === 'login' && (
            <LoginPage
              onLogin={handleLogin}
              onNavigateToSignup={() => setCurrentPage('signup')}
              onNavigateToForgotPassword={() => setCurrentPage('forgot-password')}
            />
          )}
          
          {currentPage === 'signup' && (
            <SignupPage
              onSignup={handleLogin}
              onNavigateToLogin={() => setCurrentPage('login')}
            />
          )}
          
          {currentPage === 'forgot-password' && (
            <ForgotPasswordPage
              onNavigateToLogin={() => setCurrentPage('login')}
            />
          )}
          
          {currentPage === 'student-dashboard' && (
            <StudentDashboard onLogout={handleLogout} />
          )}
          
          {currentPage === 'teacher-dashboard' && (
            <TeacherDashboard onLogout={handleLogout} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}