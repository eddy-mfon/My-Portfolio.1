
export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  techStack: string[];
  imageUrl: string;
  link: string;
  status?: 'Live' | 'In Development';
}

export interface Experiment {
  id: string;
  title: string;
  type: string;
  description: string;
  date: string;
  imageUrl: string;
  tech: string[];
}

export interface Skill {
  category: string;
  items: string[];
}

export interface MasteryItem {
  id: string;
  title: string;
  description: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface SectionProps {
  id: string;
  className?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface ProcessStep {
  id: string;
  number: string;
  title: string;
  description: string;
}

export interface Article {
  id: string;
  title: string;
  summary: string;
  readTime: string;
  date: string;
  link: string;
}
