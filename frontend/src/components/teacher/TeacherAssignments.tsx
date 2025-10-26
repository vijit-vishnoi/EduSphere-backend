import React from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

export default function TeacherAssignments() {
  return (
    <div className="p-6 h-full overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div>
          <h1 className="text-3xl neon-blue">Assignment Management</h1>
          <p className="text-muted-foreground">Manage and review all your assignments</p>
        </div>

        <Card className="glass-card border-0">
          <CardHeader>
            <CardTitle>Your Assignments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <h3 className="font-medium mb-2">Assignment Management</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Create, edit, and manage your assignments here
              </p>
              <Button className="bg-gradient-to-r from-[var(--neon-blue)] to-[var(--neon-purple)] hover:glow-blue text-background">
                Create New Assignment
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}