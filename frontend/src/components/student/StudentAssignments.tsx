import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  Upload, 
  Calendar,
  User,
  MessageSquare,
  ArrowLeft,
  Paperclip,
  Send
} from 'lucide-react';

export default function StudentAssignments() {
  const [selectedAssignment, setSelectedAssignment] = useState<any>(null);
  const [submissionText, setSubmissionText] = useState('');

  const assignments = [
    {
      id: 1,
      title: 'React Fundamentals Project',
      subject: 'Web Development',
      teacher: 'Prof. Johnson',
      dueDate: '2025-01-15',
      status: 'pending',
      priority: 'high',
      description: 'Build a complete React application with components, state management, and routing.',
      requirements: [
        'Create at least 5 functional components',
        'Implement React Router for navigation',
        'Use React hooks for state management',
        'Include responsive design with CSS'
      ],
      submissions: 0,
      maxSubmissions: 3,
      points: 100
    },
    {
      id: 2,
      title: 'Database Design Assignment',
      subject: 'Computer Science',
      teacher: 'Dr. Smith',
      dueDate: '2025-01-18',
      status: 'in-progress',
      priority: 'medium',
      description: 'Design a normalized database schema for an e-commerce application.',
      requirements: [
        'Create ERD diagram',
        'Normalize to 3NF',
        'Write SQL queries',
        'Document relationships'
      ],
      submissions: 1,
      maxSubmissions: 2,
      points: 75
    },
    {
      id: 3,
      title: 'Algorithm Analysis',
      subject: 'Mathematics',
      teacher: 'Dr. Wilson',
      dueDate: '2025-01-20',
      status: 'pending',
      priority: 'low',
      description: 'Analyze time and space complexity of various sorting algorithms.',
      requirements: [
        'Big O notation analysis',
        'Performance comparison',
        'Implementation in Python',
        'Written report'
      ],
      submissions: 0,
      maxSubmissions: 1,
      points: 50
    },
    {
      id: 4,
      title: 'UI/UX Design Principles',
      subject: 'Design',
      teacher: 'Prof. Brown',
      dueDate: '2025-01-12',
      status: 'submitted',
      priority: 'high',
      description: 'Create a mobile app design following modern UX principles.',
      requirements: [
        'User research',
        'Wireframes',
        'High-fidelity mockups',
        'Prototype'
      ],
      submissions: 1,
      maxSubmissions: 1,
      points: 90,
      grade: 85
    }
  ];

  const handleSubmit = () => {
    // Simulate submission
    console.log('Submitting assignment:', submissionText);
    setSubmissionText('');
  };

  if (selectedAssignment) {
    return (
      <div className="p-6 h-full overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          {/* Back Button */}
          <Button
            onClick={() => setSelectedAssignment(null)}
            variant="ghost"
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Assignments
          </Button>

          {/* Assignment Header */}
          <Card className="glass-card border-0">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <CardTitle className="text-2xl neon-blue">{selectedAssignment.title}</CardTitle>
                  <CardDescription className="flex items-center space-x-4">
                    <span className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>{selectedAssignment.teacher}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>Due: {selectedAssignment.dueDate}</span>
                    </span>
                    <span className="neon-purple">{selectedAssignment.points} points</span>
                  </CardDescription>
                </div>
                <div className="space-x-2">
                  <Badge 
                    variant={selectedAssignment.status === 'pending' ? 'secondary' : 'default'}
                    className={`${
                      selectedAssignment.status === 'in-progress' 
                        ? 'bg-gradient-to-r from-[var(--neon-orange)] to-[var(--neon-pink)] text-background' 
                        : selectedAssignment.status === 'submitted'
                        ? 'bg-gradient-to-r from-[var(--neon-green)] to-[var(--neon-blue)] text-background'
                        : ''
                    }`}
                  >
                    {selectedAssignment.status}
                  </Badge>
                  <Badge 
                    variant="outline"
                    className={`${
                      selectedAssignment.priority === 'high' 
                        ? 'border-[var(--neon-pink)] text-[var(--neon-pink)]'
                        : selectedAssignment.priority === 'medium'
                        ? 'border-[var(--neon-orange)] text-[var(--neon-orange)]'
                        : 'border-[var(--neon-green)] text-[var(--neon-green)]'
                    }`}
                  >
                    {selectedAssignment.priority} priority
                  </Badge>
                </div>
              </div>
            </CardHeader>
          </Card>

          <Tabs defaultValue="details" className="space-y-6">
            <TabsList className="glass border border-[var(--glass-border)]">
              <TabsTrigger value="details">Assignment Details</TabsTrigger>
              <TabsTrigger value="submit">Submit Work</TabsTrigger>
              <TabsTrigger value="comments">Comments</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-6">
              <Card className="glass-card border-0">
                <CardHeader>
                  <CardTitle>Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">{selectedAssignment.description}</p>
                  
                  <h4 className="font-medium mb-4">Requirements:</h4>
                  <ul className="space-y-2">
                    {selectedAssignment.requirements.map((req: string, index: number) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center space-x-3"
                      >
                        <CheckCircle className="w-4 h-4 neon-green" />
                        <span>{req}</span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="glass-card border-0">
                <CardHeader>
                  <CardTitle>Submission Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <span>Submissions: {selectedAssignment.submissions}/{selectedAssignment.maxSubmissions}</span>
                    {selectedAssignment.grade && (
                      <span className="neon-green">Grade: {selectedAssignment.grade}%</span>
                    )}
                  </div>
                  <div className="mt-4 w-full bg-muted rounded-lg h-2">
                    <div 
                      className="bg-gradient-to-r from-[var(--neon-blue)] to-[var(--neon-purple)] h-2 rounded-lg"
                      style={{ width: `${(selectedAssignment.submissions / selectedAssignment.maxSubmissions) * 100}%` }}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="submit" className="space-y-6">
              <Card className="glass-card border-0">
                <CardHeader>
                  <CardTitle>Submit Your Work</CardTitle>
                  <CardDescription>
                    Upload files or provide text submission for this assignment
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Text Submission</label>
                      <Textarea
                        placeholder="Enter your assignment submission here..."
                        value={submissionText}
                        onChange={(e) => setSubmissionText(e.target.value)}
                        className="min-h-32 glass border-[var(--glass-border)] focus:glow-blue"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">File Attachments</label>
                      <div className="border-2 border-dashed border-[var(--glass-border)] rounded-lg p-8 text-center glass">
                        <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                        <p className="text-muted-foreground mb-2">Drag & drop files here, or click to browse</p>
                        <Button variant="outline" className="glass border-[var(--glass-border)]">
                          <Paperclip className="w-4 h-4 mr-2" />
                          Choose Files
                        </Button>
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      <Button 
                        onClick={handleSubmit}
                        className="bg-gradient-to-r from-[var(--neon-blue)] to-[var(--neon-purple)] hover:glow-blue text-background"
                        disabled={selectedAssignment.status === 'submitted'}
                      >
                        <Send className="w-4 h-4 mr-2" />
                        Submit Assignment
                      </Button>
                      <Button variant="outline" className="glass border-[var(--glass-border)]">
                        Save Draft
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="comments" className="space-y-6">
              <Card className="glass-card border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MessageSquare className="w-5 h-5 neon-green" />
                    <span>Comments & Feedback</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="p-4 glass border border-[var(--glass-border)] rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-medium">{selectedAssignment.teacher}</span>
                        <span className="text-sm text-muted-foreground">2 days ago</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Great start on the project! Make sure to focus on the component structure and state management. Let me know if you need any clarification on the requirements.
                      </p>
                    </div>
                    
                    <div className="p-4 glass border border-[var(--glass-border)] rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-medium">You</span>
                        <span className="text-sm text-muted-foreground">1 day ago</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Thank you for the feedback! I have a question about the routing implementation. Should I use React Router v6 or is v5 acceptable?
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Textarea
                      placeholder="Add a comment or ask a question..."
                      className="glass border-[var(--glass-border)] focus:glow-green"
                    />
                    <Button className="bg-gradient-to-r from-[var(--neon-green)] to-[var(--neon-blue)] hover:glow-green text-background">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Post Comment
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="p-6 h-full overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl neon-blue">Assignments</h1>
            <p className="text-muted-foreground">Manage your coursework and submissions</p>
          </div>
          <div className="flex space-x-2">
            <Input placeholder="Search assignments..." className="w-64 glass border-[var(--glass-border)] focus:glow-blue" />
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="glass border border-[var(--glass-border)]">
            <TabsTrigger value="all">All Assignments</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="in-progress">In Progress</TabsTrigger>
            <TabsTrigger value="submitted">Submitted</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {assignments.map((assignment, index) => (
              <motion.div
                key={assignment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -2 }}
                onClick={() => setSelectedAssignment(assignment)}
                className="cursor-pointer"
              >
                <Card className="glass-card border-0 card-hover">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-medium text-lg">{assignment.title}</h3>
                          <Badge 
                            variant={assignment.status === 'pending' ? 'secondary' : 'default'}
                            className={`${
                              assignment.status === 'in-progress' 
                                ? 'bg-gradient-to-r from-[var(--neon-orange)] to-[var(--neon-pink)] text-background' 
                                : assignment.status === 'submitted'
                                ? 'bg-gradient-to-r from-[var(--neon-green)] to-[var(--neon-blue)] text-background'
                                : ''
                            }`}
                          >
                            {assignment.status}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground">{assignment.subject} • {assignment.teacher}</p>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>Due: {assignment.dueDate}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <FileText className="w-4 h-4" />
                            <span>{assignment.points} points</span>
                          </span>
                          {assignment.grade && (
                            <span className="neon-green">Grade: {assignment.grade}%</span>
                          )}
                        </div>
                      </div>
                      <Badge 
                        variant="outline"
                        className={`${
                          assignment.priority === 'high' 
                            ? 'border-[var(--neon-pink)] text-[var(--neon-pink)]'
                            : assignment.priority === 'medium'
                            ? 'border-[var(--neon-orange)] text-[var(--neon-orange)]'
                            : 'border-[var(--neon-green)] text-[var(--neon-green)]'
                        }`}
                      >
                        {assignment.priority}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </TabsContent>

          <TabsContent value="pending">
            {assignments.filter(a => a.status === 'pending').map((assignment, index) => (
              <motion.div
                key={assignment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedAssignment(assignment)}
                className="cursor-pointer"
              >
                <Card className="glass-card border-0 card-hover">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <h3 className="font-medium text-lg">{assignment.title}</h3>
                        <p className="text-muted-foreground">{assignment.subject} • {assignment.teacher}</p>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>Due: {assignment.dueDate}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <FileText className="w-4 h-4" />
                            <span>{assignment.points} points</span>
                          </span>
                        </div>
                      </div>
                      <Badge 
                        variant="outline"
                        className={`${
                          assignment.priority === 'high' 
                            ? 'border-[var(--neon-pink)] text-[var(--neon-pink)]'
                            : assignment.priority === 'medium'
                            ? 'border-[var(--neon-orange)] text-[var(--neon-orange)]'
                            : 'border-[var(--neon-green)] text-[var(--neon-green)]'
                        }`}
                      >
                        {assignment.priority}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </TabsContent>

          <TabsContent value="in-progress">
            {assignments.filter(a => a.status === 'in-progress').map((assignment, index) => (
              <motion.div
                key={assignment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedAssignment(assignment)}
                className="cursor-pointer"
              >
                <Card className="glass-card border-0 card-hover">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <h3 className="font-medium text-lg">{assignment.title}</h3>
                        <p className="text-muted-foreground">{assignment.subject} • {assignment.teacher}</p>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>Due: {assignment.dueDate}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <FileText className="w-4 h-4" />
                            <span>{assignment.points} points</span>
                          </span>
                        </div>
                      </div>
                      <Badge 
                        className="bg-gradient-to-r from-[var(--neon-orange)] to-[var(--neon-pink)] text-background"
                      >
                        in-progress
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </TabsContent>

          <TabsContent value="submitted">
            {assignments.filter(a => a.status === 'submitted').map((assignment, index) => (
              <motion.div
                key={assignment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedAssignment(assignment)}
                className="cursor-pointer"
              >
                <Card className="glass-card border-0 card-hover">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <h3 className="font-medium text-lg">{assignment.title}</h3>
                        <p className="text-muted-foreground">{assignment.subject} • {assignment.teacher}</p>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span className="flex items-center space-x-1">
                            <CheckCircle className="w-4 h-4 neon-green" />
                            <span>Submitted</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <FileText className="w-4 h-4" />
                            <span>{assignment.points} points</span>
                          </span>
                          {assignment.grade && (
                            <span className="neon-green">Grade: {assignment.grade}%</span>
                          )}
                        </div>
                      </div>
                      <Badge 
                        className="bg-gradient-to-r from-[var(--neon-green)] to-[var(--neon-blue)] text-background"
                      >
                        submitted
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}