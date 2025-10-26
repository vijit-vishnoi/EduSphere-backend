import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Sidebar from './Sidebar';
import StudentOverview from './student/StudentOverview';
import StudentAssignments from './student/StudentAssignments';
import StudentComments from './student/StudentComments';
import StudentNotifications from './student/StudentNotifications';
import StudentProfile from './student/StudentProfile';

interface StudentDashboardProps {
  onLogout: () => void;
}

export default function StudentDashboard({ onLogout }: StudentDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [notificationCount] = useState(5);

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <StudentOverview />;
      case 'assignments':
        return <StudentAssignments />;
      case 'comments':
        return <StudentComments />;
      case 'notifications':
        return <StudentNotifications />;
      case 'profile':
        return <StudentProfile />;
      default:
        return <StudentOverview />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        userRole="student"
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onLogout={onLogout}
        notificationCount={notificationCount}
      />
      
      <main className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}