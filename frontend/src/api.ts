import axios from 'axios';

const API_BASE = 'http://localhost:5000/api/v1'; // backend URL
axios.defaults.withCredentials = true;

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: 'student' | 'teacher';
}
// Auth
export const login = (email: string, password: string) =>
  axios.post(`${API_BASE}/auth/login`, { email, password }, { withCredentials: true });

export const register = (data:RegisterData) =>
  axios.post(`${API_BASE}/auth/register`, data, { withCredentials: true });
// Profile
export const fetchProfile = () =>
  axios.get(`${API_BASE}/auth/profile`, { withCredentials: true });

// Assignments
export const getAssignmentsByClassroom = (classroomId: string) =>
  axios.get(`${API_BASE}/assignments/${classroomId}`, {
    withCredentials: true,
  });

export const createAssignment = (data: any) =>
  axios.post(`${API_BASE}/assignments`, data, { withCredentials: true });

// Classrooms
export const createClassroom = (data: any) =>
  axios.post(`${API_BASE}/classrooms`, data, { withCredentials: true });

export const joinClassroom = (code: string) =>
  axios.post(`${API_BASE}/classrooms/join`, { code }, { withCredentials: true });

export const getMyClassrooms = () =>
  axios.get(`${API_BASE}/classrooms/my`, { withCredentials: true });
export const getClassroomById = (classroomId: string) =>
  axios.get(`${API_BASE}/classrooms/${classroomId}`, {
    withCredentials: true,
  });

// Submissions
export const submitAssignment = (data: any) =>
  axios.post(`${API_BASE}/submissions`, data, { withCredentials: true });

export const getMySubmissions = (assignmentId: string) =>
  axios.get(`${API_BASE}/submissions/${assignmentId}/mine`, { withCredentials: true });

export const gradeSubmission = (submissionId: string, grade: number) =>
  axios.patch(`${API_BASE}/submissions/${submissionId}/grade`, { grade }, { withCredentials: true });

// Comments
export const addComment = (data: any) =>
  axios.post(`${API_BASE}/comments`, data, { withCredentials: true });

export const getComments = (assignmentId: string) =>
  axios.get(`${API_BASE}/comments/${assignmentId}`, { withCredentials: true });
