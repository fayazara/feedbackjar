export interface Project {
  id?: number;
  name: string;
  status: string;
  description?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
  avatar?: string | null;
  website?: string | null;
  totalFeedbacks?: number | unknown;
}

type FeedbackUser = {
  user_name: string;
  user_email: string;
  user_phone: string;
  user_avatar: string;
};

type FeedbackDeviceDetails = {
  name: string;
  type: string;
  os: string;
  os_version: string;
  browser: string;
  browser_version: string;
  user_agent: string;
  screen_resolution: string;
  orientation: string;
};

export interface Feedback {
  id?: number;
  projectId: number;
  message: string;
  origin?: string;
  user?: FeedbackUser;
  country_name?: string;
  device_details?: FeedbackDeviceDetails;
  custom_attributes?: Object;
  createdAt: Date;
  internal_notes?: string;
  updatedAt: Date;
}
