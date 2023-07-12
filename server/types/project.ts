export interface Project {
  id: number;
  name: string;
  status: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  avatar: string | null;
  website: string | null;
  totalFeedbacks?: number | unknown;
}

export interface Feedback {
  id: number;
  projectId: number | null;
  feedback: string | null;
  userId?: number | null;
  userEmail?: string | null;
  userName?: string | null;
  category: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  origin: string;
}
