import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Switch } from '../ui/switch';
import { Badge } from '../ui/badge';
import { Calendar } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { 
  PlusCircle, 
  Save, 
  Eye, 
  FileText, 
  Calendar as CalendarIcon,
  Clock, 
  Users,
  Settings,
  X,
  Plus,
  GripVertical,
  AlertCircle
} from 'lucide-react';
import { format } from 'date-fns';

export default function TeacherCreateAssignment() {
  const [assignment, setAssignment] = useState({
    title: '',
    description: '',
    subject: '',
    points: 100,
    dueDate: undefined as Date | undefined,
    instructions: '',
    allowLateSubmissions: false,
    maxSubmissions: 1,
    groupAssignment: false,
    requireTextSubmission: true,
    requireFileUpload: false
  });

  const [requirements, setRequirements] = useState<string[]>(['']);
  const [rubricCriteria, setRubricCriteria] = useState([
    { name: 'Content Quality', points: 40, description: 'Quality and accuracy of content' },
    { name: 'Organization', points: 30, description: 'Structure and flow of work' },
    { name: 'Presentation', points: 30, description: 'Visual presentation and formatting' }
  ]);

  const [previewMode, setPreviewMode] = useState(false);

  const subjects = [
    'Web Development',
    'Computer Science',
    'Mathematics',
    'Data Science',
    'Machine Learning',
    'Cybersecurity',
    'Database Design',
    'Software Engineering'
  ];

  const addRequirement = () => {
    setRequirements([...requirements, '']);
  };

  const updateRequirement = (index: number, value: string) => {
    const newRequirements = [...requirements];
    newRequirements[index] = value;
    setRequirements(newRequirements);
  };

  const removeRequirement = (index: number) => {
    setRequirements(requirements.filter((_, i) => i !== index));
  };

  const addRubricCriterion = () => {
    setRubricCriteria([
      ...rubricCriteria,
      { name: '', points: 0, description: '' }
    ]);
  };

  const updateRubricCriterion = (index: number, field: string, value: string | number) => {
    const newCriteria = [...rubricCriteria];
    newCriteria[index] = { ...newCriteria[index], [field]: value };
    setRubricCriteria(newCriteria);
  };

  const removeRubricCriterion = (index: number) => {
    setRubricCriteria(rubricCriteria.filter((_, i) => i !== index));
  };

  const totalRubricPoints = rubricCriteria.reduce((sum, criterion) => sum + criterion.points, 0);

  const handleSave = () => {
    console.log('Saving assignment:', { assignment, requirements, rubricCriteria });
  };

  const handlePublish = () => {
    console.log('Publishing assignment:', { assignment, requirements, rubricCriteria });
  };

  if (previewMode) {
    return (
      <div className="p-6 h-full overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Preview Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl neon-blue">Assignment Preview</h1>
              <p className="text-muted-foreground">How students will see this assignment</p>
            </div>
            <Button
              onClick={() => setPreviewMode(false)}
              variant="outline"
              className="glass border-[var(--glass-border)]"
            >
              Back to Editor
            </Button>
          </div>

          {/* Preview Content */}
          <Card className="glass-card border-0">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <CardTitle className="text-2xl neon-blue">{assignment.title || 'Untitled Assignment'}</CardTitle>
                  <CardDescription className="flex items-center space-x-4">
                    <span className="flex items-center space-x-1">
                      <FileText className="w-4 h-4" />
                      <span>{assignment.subject || 'No Subject'}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <CalendarIcon className="w-4 h-4" />
                      <span>Due: {assignment.dueDate ? format(assignment.dueDate, 'PPP') : 'No due date'}</span>
                    </span>
                    <span className="neon-purple">{assignment.points} points</span>
                  </CardDescription>
                </div>
                <Badge variant="outline" className="border-[var(--neon-green)] text-[var(--neon-green)]">
                  Draft
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-medium mb-2">Description</h3>
                <p className="text-muted-foreground">{assignment.description || 'No description provided'}</p>
              </div>

              <div>
                <h3 className="font-medium mb-2">Instructions</h3>
                <p className="text-muted-foreground">{assignment.instructions || 'No instructions provided'}</p>
              </div>

              {requirements.filter(req => req.trim()).length > 0 && (
                <div>
                  <h3 className="font-medium mb-2">Requirements</h3>
                  <ul className="space-y-1">
                    {requirements.filter(req => req.trim()).map((req, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-[var(--neon-blue)] rounded-full"></div>
                        <span className="text-muted-foreground">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {rubricCriteria.filter(criteria => criteria.name).length > 0 && (
                <div>
                  <h3 className="font-medium mb-2">Grading Rubric</h3>
                  <div className="space-y-2">
                    {rubricCriteria.filter(criteria => criteria.name).map((criterion, index) => (
                      <div key={index} className="p-3 glass border border-[var(--glass-border)] rounded-lg">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">{criterion.name}</h4>
                            <p className="text-sm text-muted-foreground">{criterion.description}</p>
                          </div>
                          <Badge variant="outline" className="neon-purple">
                            {criterion.points} pts
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="flex space-x-4">
            <Button
              onClick={handlePublish}
              className="bg-gradient-to-r from-[var(--neon-green)] to-[var(--neon-blue)] hover:glow-green text-background"
            >
              Publish Assignment
            </Button>
            <Button
              onClick={handleSave}
              variant="outline"
              className="glass border-[var(--glass-border)]"
            >
              Save Draft
            </Button>
          </div>
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
            <h1 className="text-3xl neon-green">Create Assignment</h1>
            <p className="text-muted-foreground">Design engaging assignments for your students</p>
          </div>
          <div className="flex space-x-2">
            <Button
              onClick={() => setPreviewMode(true)}
              variant="outline"
              className="glass border-[var(--glass-border)] hover:glow-blue"
            >
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
            <Button
              onClick={handleSave}
              variant="outline"
              className="glass border-[var(--glass-border)] hover:glow-orange"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Draft
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="glass-card border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="w-5 h-5 neon-green" />
                    <span>Basic Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Assignment Title *</Label>
                      <Input
                        id="title"
                        placeholder="e.g., React Fundamentals Project"
                        value={assignment.title}
                        onChange={(e) => setAssignment({ ...assignment, title: e.target.value })}
                        className="glass border-[var(--glass-border)] focus:glow-green"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject *</Label>
                      <Select value={assignment.subject} onValueChange={(value) => setAssignment({ ...assignment, subject: value })}>
                        <SelectTrigger className="glass border-[var(--glass-border)] hover:glow-green">
                          <SelectValue placeholder="Select subject" />
                        </SelectTrigger>
                        <SelectContent className="glass-card border-[var(--glass-border)]">
                          {subjects.map((subject) => (
                            <SelectItem key={subject} value={subject}>
                              {subject}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Brief description of the assignment..."
                      value={assignment.description}
                      onChange={(e) => setAssignment({ ...assignment, description: e.target.value })}
                      className="glass border-[var(--glass-border)] focus:glow-green"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="instructions">Detailed Instructions</Label>
                    <Textarea
                      id="instructions"
                      placeholder="Provide detailed instructions for students..."
                      value={assignment.instructions}
                      onChange={(e) => setAssignment({ ...assignment, instructions: e.target.value })}
                      className="min-h-32 glass border-[var(--glass-border)] focus:glow-green"
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Requirements */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="glass-card border-0">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Settings className="w-5 h-5 neon-blue" />
                      <span>Requirements</span>
                    </div>
                    <Button
                      onClick={addRequirement}
                      size="sm"
                      variant="outline"
                      className="glass border-[var(--glass-border)] hover:glow-blue"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Add
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <AnimatePresence>
                    {requirements.map((requirement, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex items-center space-x-2"
                      >
                        <GripVertical className="w-4 h-4 text-muted-foreground" />
                        <Input
                          placeholder="Enter requirement..."
                          value={requirement}
                          onChange={(e) => updateRequirement(index, e.target.value)}
                          className="flex-1 glass border-[var(--glass-border)] focus:glow-blue"
                        />
                        <Button
                          onClick={() => removeRequirement(index)}
                          size="sm"
                          variant="ghost"
                          className="hover:glow-pink"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>

            {/* Grading Rubric */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="glass-card border-0">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <FileText className="w-5 h-5 neon-purple" />
                      <span>Grading Rubric</span>
                      {totalRubricPoints !== assignment.points && (
                        <Badge variant="outline" className="border-[var(--neon-orange)] text-[var(--neon-orange)]">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          {totalRubricPoints}/{assignment.points}
                        </Badge>
                      )}
                    </div>
                    <Button
                      onClick={addRubricCriterion}
                      size="sm"
                      variant="outline"
                      className="glass border-[var(--glass-border)] hover:glow-purple"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Add Criterion
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <AnimatePresence>
                    {rubricCriteria.map((criterion, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="p-4 glass border border-[var(--glass-border)] rounded-lg space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <Input
                            placeholder="Criterion name..."
                            value={criterion.name}
                            onChange={(e) => updateRubricCriterion(index, 'name', e.target.value)}
                            className="flex-1 glass border-[var(--glass-border)] focus:glow-purple"
                          />
                          <div className="flex items-center space-x-2 ml-4">
                            <Input
                              type="number"
                              placeholder="Points"
                              value={criterion.points}
                              onChange={(e) => updateRubricCriterion(index, 'points', parseInt(e.target.value) || 0)}
                              className="w-20 glass border-[var(--glass-border)] focus:glow-purple"
                            />
                            <Button
                              onClick={() => removeRubricCriterion(index)}
                              size="sm"
                              variant="ghost"
                              className="hover:glow-pink"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        <Textarea
                          placeholder="Description of this criterion..."
                          value={criterion.description}
                          onChange={(e) => updateRubricCriterion(index, 'description', e.target.value)}
                          className="glass border-[var(--glass-border)] focus:glow-purple"
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Settings Sidebar */}
          <div className="space-y-6">
            {/* Assignment Settings */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="glass-card border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 neon-orange" />
                    <span>Settings</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="points">Total Points</Label>
                    <Input
                      id="points"
                      type="number"
                      value={assignment.points}
                      onChange={(e) => setAssignment({ ...assignment, points: parseInt(e.target.value) || 0 })}
                      className="glass border-[var(--glass-border)] focus:glow-orange"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Due Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start glass border-[var(--glass-border)] hover:glow-orange"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {assignment.dueDate ? format(assignment.dueDate, 'PPP') : 'Select date'}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 glass-card border-[var(--glass-border)]">
                        <Calendar
                          mode="single"
                          selected={assignment.dueDate}
                          onSelect={(date) => setAssignment({ ...assignment, dueDate: date })}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="maxSubmissions">Max Submissions</Label>
                    <Input
                      id="maxSubmissions"
                      type="number"
                      min="1"
                      value={assignment.maxSubmissions}
                      onChange={(e) => setAssignment({ ...assignment, maxSubmissions: parseInt(e.target.value) || 1 })}
                      className="glass border-[var(--glass-border)] focus:glow-orange"
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Submission Options */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="glass-card border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="w-5 h-5 neon-pink" />
                    <span>Options</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Allow Late Submissions</Label>
                      <p className="text-xs text-muted-foreground">Students can submit after deadline</p>
                    </div>
                    <Switch
                      checked={assignment.allowLateSubmissions}
                      onCheckedChange={(checked) => setAssignment({ ...assignment, allowLateSubmissions: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Group Assignment</Label>
                      <p className="text-xs text-muted-foreground">Allow collaborative work</p>
                    </div>
                    <Switch
                      checked={assignment.groupAssignment}
                      onCheckedChange={(checked) => setAssignment({ ...assignment, groupAssignment: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Text Submission</Label>
                      <p className="text-xs text-muted-foreground">Require text entry</p>
                    </div>
                    <Switch
                      checked={assignment.requireTextSubmission}
                      onCheckedChange={(checked) => setAssignment({ ...assignment, requireTextSubmission: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>File Upload</Label>
                      <p className="text-xs text-muted-foreground">Allow file attachments</p>
                    </div>
                    <Switch
                      checked={assignment.requireFileUpload}
                      onCheckedChange={(checked) => setAssignment({ ...assignment, requireFileUpload: checked })}
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-3"
            >
              <Button
                onClick={handlePublish}
                className="w-full bg-gradient-to-r from-[var(--neon-green)] to-[var(--neon-blue)] hover:glow-green text-background"
              >
                <PlusCircle className="w-4 h-4 mr-2" />
                Publish Assignment
              </Button>
              <Button
                onClick={handleSave}
                variant="outline"
                className="w-full glass border-[var(--glass-border)] hover:glow-orange"
              >
                <Save className="w-4 h-4 mr-2" />
                Save as Draft
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}