import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Service, Testimonial, BlogPost, SiteConfig, Lead, CaseStudy, FAQItem, Page, PricingPlan } from '../types';
import { INITIAL_CONFIG, INITIAL_SERVICES, INITIAL_TESTIMONIALS, INITIAL_BLOG_POSTS, INITIAL_CASE_STUDIES, INITIAL_FAQS, INITIAL_PAGES, INITIAL_PRICING_PLANS } from '../constants';

interface ContentContextType {
  config: SiteConfig;
  updateConfig: (newConfig: Partial<SiteConfig>) => void;
  services: Service[];
  updateService: (id: string, service: Partial<Service>) => void;
  addService: (service: Service) => void;
  deleteService: (id: string) => void;
  pricingPlans: PricingPlan[];
  addPricingPlan: (plan: PricingPlan) => void;
  updatePricingPlan: (id: string, plan: Partial<PricingPlan>) => void;
  deletePricingPlan: (id: string) => void;
  testimonials: Testimonial[];
  blogPosts: BlogPost[];
  addBlogPost: (post: BlogPost) => void;
  caseStudies: CaseStudy[];
  addCaseStudy: (study: CaseStudy) => void;
  deleteCaseStudy: (id: string) => void;
  faqs: FAQItem[];
  addFAQ: (faq: FAQItem) => void;
  deleteFAQ: (id: string) => void;
  pages: Page[];
  addPage: (page: Page) => void;
  updatePage: (id: string, page: Partial<Page>) => void;
  deletePage: (id: string) => void;
  leads: Lead[];
  addLead: (lead: Lead) => void;
  isAdmin: boolean;
  toggleAdmin: () => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

const loadState = <T,>(key: string, defaultValue: T): T => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : defaultValue;
  } catch (e) {
    console.error(`Failed to load ${key}`, e);
    return defaultValue;
  }
};

export const ContentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<SiteConfig>(() => {
    const saved = loadState('anant_config', INITIAL_CONFIG);
    return { ...INITIAL_CONFIG, ...saved };
  });
  
  const [services, setServices] = useState<Service[]>(() => loadState('anant_services', INITIAL_SERVICES));
  const [pricingPlans, setPricingPlans] = useState<PricingPlan[]>(() => loadState('anant_pricing', INITIAL_PRICING_PLANS));
  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => loadState('anant_testimonials', INITIAL_TESTIMONIALS));
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(() => loadState('anant_blog_posts', INITIAL_BLOG_POSTS));
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>(() => loadState('anant_case_studies', INITIAL_CASE_STUDIES));
  const [faqs, setFaqs] = useState<FAQItem[]>(() => loadState('anant_faqs', INITIAL_FAQS));
  const [pages, setPages] = useState<Page[]>(() => loadState('anant_pages', INITIAL_PAGES));
  const [leads, setLeads] = useState<Lead[]>(() => loadState('anant_leads', []));
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => { localStorage.setItem('anant_config', JSON.stringify(config)); }, [config]);
  useEffect(() => { localStorage.setItem('anant_services', JSON.stringify(services)); }, [services]);
  useEffect(() => { localStorage.setItem('anant_pricing', JSON.stringify(pricingPlans)); }, [pricingPlans]);
  useEffect(() => { localStorage.setItem('anant_testimonials', JSON.stringify(testimonials)); }, [testimonials]);
  useEffect(() => { localStorage.setItem('anant_blog_posts', JSON.stringify(blogPosts)); }, [blogPosts]);
  useEffect(() => { localStorage.setItem('anant_case_studies', JSON.stringify(caseStudies)); }, [caseStudies]);
  useEffect(() => { localStorage.setItem('anant_faqs', JSON.stringify(faqs)); }, [faqs]);
  useEffect(() => { localStorage.setItem('anant_pages', JSON.stringify(pages)); }, [pages]);
  useEffect(() => { localStorage.setItem('anant_leads', JSON.stringify(leads)); }, [leads]);

  useEffect(() => {
    document.title = config.seoTitle;
    const root = document.documentElement;
    root.style.setProperty('--primary', config.themeColor);
  }, [config]);

  const updateConfig = (newConfig: Partial<SiteConfig>) => setConfig(prev => ({ ...prev, ...newConfig }));
  
  const updateService = (id: string, updated: Partial<Service>) => setServices(prev => prev.map(s => s.id === id ? { ...s, ...updated } : s));
  const addService = (service: Service) => setServices(prev => [...prev, service]);
  const deleteService = (id: string) => setServices(prev => prev.filter(s => s.id !== id));

  const addPricingPlan = (plan: PricingPlan) => setPricingPlans(prev => [...prev, plan]);
  const updatePricingPlan = (id: string, updated: Partial<PricingPlan>) => setPricingPlans(prev => prev.map(p => p.id === id ? { ...p, ...updated } : p));
  const deletePricingPlan = (id: string) => setPricingPlans(prev => prev.filter(p => p.id !== id));

  const addBlogPost = (post: BlogPost) => setBlogPosts(prev => [post, ...prev]);
  const addCaseStudy = (study: CaseStudy) => setCaseStudies(prev => [study, ...prev]);
  const deleteCaseStudy = (id: string) => setCaseStudies(prev => prev.filter(c => c.id !== id));
  const addFAQ = (faq: FAQItem) => setFaqs(prev => [...prev, faq]);
  const deleteFAQ = (id: string) => setFaqs(prev => prev.filter(f => f.id !== id));
  const addPage = (page: Page) => setPages(prev => [...prev, page]);
  const updatePage = (id: string, updated: Partial<Page>) => setPages(prev => prev.map(p => p.id === id ? { ...p, ...updated } : p));
  const deletePage = (id: string) => setPages(prev => prev.filter(p => p.id !== id));
  const addLead = (lead: Lead) => setLeads(prev => [lead, ...prev]);
  const toggleAdmin = () => setIsAdmin(prev => !prev);

  return (
    <ContentContext.Provider value={{
      config, updateConfig, services, updateService, addService, deleteService,
      pricingPlans, addPricingPlan, updatePricingPlan, deletePricingPlan,
      testimonials, blogPosts, addBlogPost, caseStudies, addCaseStudy, deleteCaseStudy,
      faqs, addFAQ, deleteFAQ, pages, addPage, updatePage, deletePage, leads, addLead, isAdmin, toggleAdmin
    }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) throw new Error('useContent must be used within a ContentProvider');
  return context;
};
