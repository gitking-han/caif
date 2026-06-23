export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string;
  details: string[];
}

export interface Portfolio {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  techUsed: string[];
  client: string;
  year: string;
  keyOutcome: string;
}

export interface Popup {
  id: string;
  title: string;
  type: string;
  message: string;
  link?: string;
  active: boolean;
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  content: string;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  service: string;
  message: string;
  intent: string;
  submittedAt: string;
}
