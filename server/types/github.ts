export interface Config {
  github: {
    clientId: string;
    clientSecret: string;
  };
}

export type Code = string;

export interface GitHubUser {
  id: number;
  login?: string;
  name?: string;
  email?: string;
  avatar_url?: string;
  html_url?: string;
  twitter_username?: string;
  bio?: string;
  blog?: string;
  company?: string;
  location?: string;
}
