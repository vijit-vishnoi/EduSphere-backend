import React from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { BarChart3 } from 'lucide-react';

export default function TeacherAnalytics() {
  return (
    <div className="p-6 h-full overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div>
          <h1 className="text-3xl neon-purple">Analytics & Reports</h1>
          <p className="text-muted-foreground">Track student performance and engagement</p>
        </div>

        <Card className="glass-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 neon-purple" />
              <span>Performance Analytics</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <BarChart3 className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="font-medium mb-2">Coming Soon</h3>
              <p className="text-sm text-muted-foreground">
                Advanced analytics and performance tracking features are being developed
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}