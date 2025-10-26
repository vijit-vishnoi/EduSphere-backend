import React from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Users } from 'lucide-react';

export default function TeacherStudents() {
  return (
    <div className="p-6 h-full overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div>
          <h1 className="text-3xl neon-green">Student Management</h1>
          <p className="text-muted-foreground">View and manage your students</p>
        </div>

        <Card className="glass-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-5 h-5 neon-green" />
              <span>Your Students</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <Users className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="font-medium mb-2">Student Management</h3>
              <p className="text-sm text-muted-foreground">
                Manage your students, view their progress, and track performance
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}