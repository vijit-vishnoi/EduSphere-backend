import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Sidebar from './Sidebar';
import TeacherOverview from './teacher/TeacherOverview';
import TeacherAssignments from './teacher/TeacherAssignments';
import TeacherCreateAssignment from './teacher/TeacherCreateAssignment';
import TeacherStudents from './teacher/TeacherStudents';
import TeacherComments from './teacher/TeacherComments';
import TeacherAnalytics from './teacher/TeacherAnalytics';
import TeacherNotifications from './teacher/TeacherNotifications';
import TeacherProfile from './teacher/TeacherProfile';

interface TeacherDashboardProps {
  onLogout: () => void;
}

export default function TeacherDashboard({ onLogout }: TeacherDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [notificationCount] = useState(8);

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <TeacherOverview />;
      case 'assignments':
        return <TeacherAssignments />;
      case 'create':
        return <TeacherCreateAssignment />;
      case 'students':
        return <TeacherStudents />;
      case 'comments':
        return <TeacherComments />;
      case 'analytics':
        return <TeacherAnalytics />;
      case 'notifications':
        return <TeacherNotifications />;
      case 'profile':
        return <TeacherProfile />;
      default:
        return <TeacherOverview />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        userRole="teacher"
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