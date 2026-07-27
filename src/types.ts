export interface Course {
  id: string;
  title: string;
  category: 'scratch' | 'ai' | 'programming' | 'ict' | 'other';
  shortDescription: string;
  fullDescription: string;
  image: string;
  ageGroup: string;
  duration: string;
  sessionsCount: string;
  stage?: string;
  language?: string;
  features: string[];
  skillsLearned: string[];
  badge?: string;
  popular?: boolean;
  levels?: string[];
}

export interface Booking {
  id: string;
  parentName: string;
  childName: string;
  childAge: string;
  phone: string;
  email?: string;
  courseId: string;
  courseTitle: string;
  deviceType?: string;
  studyMode?: string;
  preferredTime: string;
  schoolStage?: string;
  schoolName?: string;
  courseLanguage?: string;
  notes?: string;
  status: 'pending' | 'confirmed' | 'contacted';
  createdAt: string;
}

export interface Testimonial {
  id: string;
  parentName: string;
  childInfo: string;
  rating: number;
  text: string;
  courseName: string;
  avatar: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface SiteConfig {
  siteName: string;
  googleFormUrl: string;
  whatsappNumber: string;
  email: string;
  facebookUrl: string;
  instagramUrl: string;
  heroTitle: string;
  heroSubtitle: string;
  aboutText: string;
  heroBannerImage: string;
}
