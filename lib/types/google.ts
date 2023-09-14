export interface Config {
  [x: string]: any;
  google: {
    clientId: string;
  };
}

export interface GithubUser {
  id: number;
  login?: string;
  name?: string;
  email?: string;
  avatarUrl?: string;
  githubUrl?: string;
  twitterUsername?: string;
  bio?: string;
  blog?: string;
  company?: string;
  location?: string;
}
