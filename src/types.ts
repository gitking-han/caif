// Global types for the Apex Tech & Creative Agency

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string; // Used to select Lucide icons dynamically
  details: string[]; // Deep feature lists representing structural benefits
}

export interface FiverrGigPackage {
  title: string;          // Package level, e.g. "Basic Logo", "Enterprise WAMS"
  price: string;          // e.g. "$49", "$2,499"
  deliveryTime: string;   // e.g. "3 Days Delivery"
  revisions: string;      // e.g. "Unlimited Revisions" or "3 Revisions"
  specs: string[];        // Standard gig checklists
  popular?: boolean;      // Marks high-converting choices
}

export interface ServiceGig {
  serviceId: string;
  serviceTitle: string;
  gigTitle: string;      // Marketing title, e.g. "I will manage and optimize your complete Web Application Management System"
  packages: {
    basic: FiverrGigPackage;
    standard: FiverrGigPackage;
    premium: FiverrGigPackage;
  };
}

export interface PortfolioProject {
  id: string;
  title: string;
  category: "Web" | "Mobile" | "Design" | "Editing" | "SEO";
  description: string;
  imageName: string;      // Static graphic reference or placeholder
  imageUrl?: string;      // Dynamic Cloudinary URL
  techUsed: string[];
  client: string;
  year: string;
  keyOutcome: string;
}

export interface ClientTestimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  comment: string;
  imageLetter: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  content: string; // Markdown formatted content
}

export interface PopupAlert {
  id: string;
  title: string;
  type: "Event" | "Offer" | "News";
  message: string;
  link?: string;
  active: boolean;
}
