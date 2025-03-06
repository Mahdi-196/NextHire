import "./index.css";

export interface Candidate {
    name: string;
    username: string;
    location: string;
    avatar_url: string;
    email: string | null;
    html_url: string;
    company: string | null;
  }
  