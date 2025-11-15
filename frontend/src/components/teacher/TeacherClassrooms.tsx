import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Copy ,Globe, Cpu, Sigma, Atom, FlaskRound,PlusCircle} from 'lucide-react';
import { Users, FileText, Clock, BookOpen } from 'lucide-react';
import { getMyClassrooms } from "../../api";


// TeacherClassrooms - UI-first component (no backend calls yet)
// - Top stats (4 cards)
// - Grid of classroom cards (minimal info per spec)
// - Empty state when no classrooms exist

export default function TeacherClassrooms({ onTabChange }: { onTabChange: (tab: string) => void }) {
  // Placeholder stats — replace with real backend values later

const [stats] = useState([
  { label: 'Total Classrooms', value: 3, icon: BookOpen },
  { label: 'Total Students', value: 124, icon: Users },
  { label: 'Assignments Created', value: 18, icon: FileText },
  { label: 'Pending Submissions', value: 23, icon: Clock }
]);
const [loading, setLoading] = useState(false);

const subjectColors: Record<string, string> = {
  "Web Development": "text-edu-blue",
  "Computer Science": "text-edu-green",
  "Mathematics": "text-edu-purple",
  "Physics": "text-edu-amber",
  "Chemistry": "text-edu-red",
};
const subjectIcons: Record<string, any> = {
  "Web Development": Globe,
  "Computer Science": Cpu,
  "Mathematics": Sigma,
  "Physics": Atom,
  "Chemistry": FlaskRound,
};

const LoadingSkeleton = () => (
  <div className="animate-pulse p-6 glass border border-[var(--edu-border)] rounded-2xl">
    <div className="h-5 w-2/3 bg-edu-blue/20 rounded mb-3"></div>
    <div className="h-4 w-1/3 bg-edu-blue/10 rounded mb-6"></div>

    <div className="h-4 w-1/4 bg-edu-blue/20 mb-2 rounded"></div>
    <div className="h-3 w-1/4 bg-edu-blue/10 rounded"></div>
  </div>
);
const EmptyState = () => (
  <div className="py-16 flex flex-col items-center justify-center">
    <svg
      width="180"
      height="180"
      viewBox="0 0 200 200"
      className="opacity-70 mb-6"
    >
      <circle cx="100" cy="100" r="80" fill="var(--edu-blue-light)" />
      <rect x="65" y="70" width="70" height="50" rx="6" fill="white" opacity="0.9" />
      <rect x="75" y="80" width="50" height="6" rx="3" fill="var(--edu-blue)" />
      <rect x="75" y="95" width="35" height="6" rx="3" fill="var(--edu-purple)" />
    </svg>

    <h2 className="text-xl text-edu-blue mb-2 font-semibold">No Classrooms Yet</h2>
    <p className="text-sm text-muted-foreground max-w-xs text-center">
      Create your first classroom from the sidebar and start organizing your students.
    </p>
  </div>
);

  // Example classrooms array — replace with API data later
  const [classrooms, setClassrooms] = useState<any[]>([]);


  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;
  const userName = user ? `${user.name}` : 'Teacher';

  // copy classroom code helper
  const handleCopy = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      // you can replace this with a toast/snackbar
      alert(`Classroom code ${code} copied to clipboard`);
    } catch (e) {
      console.error('copy failed', e);
    }
  };

  // placeholder open handler — replace with router push / navigation
  const handleOpen = (classroomId: string) => {
    // TODO: integrate navigation to classroom detail page
    // e.g. router.push(`/dashboard/classrooms/${classroomId}`)
    alert(`Open classroom ${classroomId}`);
  };

  // If you later fetch from backend, call setClassrooms(fetchedData)
  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);

        const res = await getMyClassrooms();
        console.log("Fetched classrooms:", res.data);

        setClassrooms(res.data.classrooms || res.data || []);
      } catch (err) {
        console.error("Error fetching classrooms:", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <div className="p-6 h-full overflow-y-auto bg-[var(--edu-bg-primary)]">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <h1 className="text-3xl text-edu-blue">Your Classrooms</h1>
            <p className="text-[var(--edu-text-secondary)]">Manage the classrooms you created</p>
          </div>

          <Button
            onClick={() => onTabChange("create-classroom")}
            className="edu-button-primary"
          >
            <PlusCircle className="w-4 h-4 mr-2" />
            Create Classroom
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -2 }}
            >
              <Card className="edu-card glass-hover border-[var(--edu-border)]">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <stat.icon className="w-8 h-8 text-edu-blue" />
                    <div className="text-right">
                      <p className="text-2xl text-edu-blue">{stat.value}</p>
                    </div>
                  </div>
                  <p className="text-sm text-[var(--edu-text-secondary)] mb-1">{stat.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>


        {/* Classroom List */}
        {classrooms.length === 0 ? (
          <Card className="glass-card border-0">
            <CardContent className="text-center py-12">
              <h3 className="font-medium mb-2">No Classrooms Found</h3>
              <p className="text-sm text-muted-foreground mb-4">Create a classroom from the sidebar to get started.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading
              ? Array.from({ length: 6 }).map((_, i) => <LoadingSkeleton key={i} />)
              : classrooms.length === 0
              ? <EmptyState />
              : classrooms.map((cls) => {
                  const Icon = subjectIcons[cls.subject] || BookOpen;
                  const colorClass = subjectColors[cls.subject] || "text-edu-blue";

                  return (
                    <motion.div
                      key={cls.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 }}
                    >
                      <div
                        onClick={() => handleOpen(cls.id)}
                        className="cursor-pointer p-6 glass border border-[var(--edu-border)]
                        rounded-2xl hover:glow-blue hover:border-edu-blue transition-all group"
                      >
                        {/* Subject icon */}
                        <div className="flex items-center gap-3 mb-4">
                          <Icon className={`w-6 h-6 ${colorClass}`} />
                          <span className={`text-sm ${colorClass}`}>{cls.subject}</span>
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-semibold text-[var(--edu-text-primary)]
                        group-hover:text-edu-blue transition-colors">
                          {cls.name}
                        </h3>

                        {/* Students count */}
                        <p className="text-sm text-[var(--edu-text-secondary)] mt-1">
                          {cls.studentCount || 0} Students
                        </p>

                        {/* Code + Copy */}
                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex items-center gap-2 text-sm font-mono text-edu-blue">
                            Code: {cls.code}
                          </div>

                          <button
                          aria-label='Copy classroom code'
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCopy(cls.code);
                            }}
                            className="text-muted-foreground hover:text-edu-blue transition"
                          >
                            <Copy className="w-5 h-5" />
                          </button>
                        </div>

                        {/* Date */}
                        <p className="mt-3 text-xs text-[var(--edu-text-secondary)]">
                          Created on: {cls.createdAt}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
          </div>
        )}
      </motion.div>
    </div>
  );
}
