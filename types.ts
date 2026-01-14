export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  price?: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: string;
  period: 'mo' | 'yr' | 'once';
  features: string[];
  isPopular: boolean;
  buttonText: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  imageUrl: string;
  status: 'draft' | 'published';
}

export interface CaseStudy {
  id: string;
  client: string;
  title: string;
  result: string;
  image: string;
  category: string;
  tags: string[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  serviceInterest: string;
  message: string;
  status: 'new' | 'contacted' | 'closed';
  date: string;
  type: 'general' | 'booking';
  bookingDate?: string;
}

export interface Page {
  id: string;
  title: string;
  slug: string;
  content: string;
  status: 'draft' | 'published';
  type: 'system' | 'custom';
}

export interface SiteConfig {
  heroHeadline: string;
  heroSubheadline: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  themeColor: string;
  seoTitle: string;
  seoDescription: string;
  logo?: string;
  currency: string;
}

export interface AIContentRequest {
  topic: string;
  tone: string;
  type: 'blog' | 'service_description' | 'social_post' | 'case_study' | 'page_content';
}
