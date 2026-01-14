import { Service, Testimonial, BlogPost, SiteConfig, CaseStudy, FAQItem, Page, PricingPlan } from './types';

export const INITIAL_CONFIG: SiteConfig = {
  heroHeadline: "Scale Your Business with Data-Driven Digital Marketing",
  heroSubheadline: "Anant Technologies delivers high-impact strategies to generate leads, increase sales, and build authority for your brand.",
  contactEmail: "info@ananttechnologies.in",
  contactPhone: "7827536636",
  address: "NO 3A, Near Sarathi Nursing Home, Paramesh Nagar, MettuKazhani Street, Adambakkam, Chennai-600088",
  themeColor: "#4f46e5", // Indigo-600
  seoTitle: "Anant Technologies - Digital Growth Agency",
  seoDescription: "Top-rated digital marketing agency specializing in SEO, PPC, and Web Development.",
  logo: "/logo.png",
  currency: "₹"
};

export const INITIAL_PRICING_PLANS: PricingPlan[] = [
  {
    id: '1',
    name: 'Starter',
    description: 'Perfect for small businesses starting their digital journey.',
    price: '15,000',
    period: 'mo',
    features: ['Basic SEO Audit', '5 Social Media Posts', 'Email Support', 'Monthly Report'],
    isPopular: false,
    buttonText: 'Get Started'
  },
  {
    id: '2',
    name: 'Growth',
    description: 'Our most popular plan for rapidly scaling brands.',
    price: '45,000',
    period: 'mo',
    features: ['Full SEO Strategy', '15 Social Media Posts', 'Google Ads Management', 'Priority Support', 'Bi-weekly Strategy Calls'],
    isPopular: true,
    buttonText: 'Start Growing'
  },
  {
    id: '3',
    name: 'Enterprise',
    description: 'Advanced solutions for large-scale market domination.',
    price: '99,000',
    period: 'mo',
    features: ['Custom Digital Roadmap', 'Unlimited Content', 'Full Multi-channel Ads', 'Dedicated Account Manager', '24/7 Priority Access'],
    isPopular: false,
    buttonText: 'Contact Sales'
  }
];

export const INITIAL_SERVICES: Service[] = [
  {
    id: '1',
    title: 'SEO Optimization',
    description: 'Rank higher on Google and drive organic traffic with our technical and content-led SEO strategies.',
    icon: 'Search',
    price: '₹25,000/mo'
  },
  {
    id: '2',
    title: 'PPC Advertising',
    description: 'Maximize ROI with targeted paid campaigns on Google Ads, Meta, and LinkedIn.',
    icon: 'Target',
    price: '₹50,000/mo'
  },
  {
    id: '3',
    title: 'Content Marketing',
    description: 'Establish authority with high-quality blog posts, whitepapers, and video content.',
    icon: 'PenTool',
    price: '₹20,000/mo'
  },
  {
    id: '4',
    title: 'Web Development',
    description: 'High-performance, conversion-optimized websites built with the latest technologies.',
    icon: 'Code',
    price: 'Custom'
  }
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Jenkins',
    role: 'CEO',
    company: 'Nexus Innovations',
    content: 'Anant Technologies transformed our lead generation pipeline. We saw a 300% increase in qualified leads within 3 months.',
    avatar: 'https://picsum.photos/100/100?random=1'
  },
  {
    id: '2',
    name: 'Michael Chen',
    role: 'Founder',
    company: 'GrowthBox',
    content: 'Professional, data-driven, and incredibly transparent. The best agency partner we have worked with.',
    avatar: 'https://picsum.photos/100/100?random=2'
  }
];

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'The Future of SEO in 2025',
    excerpt: 'How AI and machine learning are reshaping search engine algorithms.',
    content: 'Full content would go here...',
    author: 'Anant Team',
    date: '2024-05-15',
    imageUrl: 'https://picsum.photos/800/400?random=10',
    status: 'published'
  },
  {
    id: '2',
    title: 'Maximizing ROI on LinkedIn Ads',
    excerpt: 'Strategies for B2B businesses to lower CPL and close more deals.',
    content: 'Full content would go here...',
    author: 'Anant Team',
    date: '2024-05-10',
    imageUrl: 'https://picsum.photos/800/400?random=11',
    status: 'published'
  }
];

export const INITIAL_CASE_STUDIES: CaseStudy[] = [
  {
    id: '1',
    client: 'FinTech Plus',
    title: 'Scaling User Acquisition by 200%',
    result: '+200% ARR',
    image: 'https://picsum.photos/800/600?random=20',
    category: 'PPC',
    tags: ['SaaS', 'Paid Search', 'Growth']
  },
  {
    id: '2',
    client: 'EcoWare',
    title: 'Dominating Organic Search for Sustainable Goods',
    result: '150k Monthly Visits',
    image: 'https://picsum.photos/800/600?random=21',
    category: 'SEO',
    tags: ['E-commerce', 'SEO', 'Content']
  }
];

export const INITIAL_FAQS: FAQItem[] = [
  {
    id: '1',
    question: 'How long does it take to see results from SEO?',
    answer: 'Typically, SEO is a long-term strategy. You can expect to see significant improvements in rankings and traffic within 3 to 6 months, depending on your industry and competition.'
  },
  {
    id: '2',
    question: 'Do you offer custom packages?',
    answer: 'Yes! We understand every business is unique. We start with an audit and then tailor a strategy and pricing package that fits your specific goals and budget.'
  },
  {
    id: '3',
    question: 'What is your reporting process?',
    answer: 'We provide transparent, real-time dashboards and hold monthly strategy calls to review performance, discuss insights, and plan the next steps.'
  }
];

export const INITIAL_PAGES: Page[] = [
  {
    id: 'privacy',
    title: 'Privacy Policy',
    slug: 'privacy',
    type: 'system',
    status: 'published',
    content: `...`
  },
  {
    id: 'terms',
    title: 'Terms of Service',
    slug: 'terms',
    type: 'system',
    status: 'published',
    content: `...`
  }
];
