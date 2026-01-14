import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ContentProvider } from './context/ContentContext';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import CaseStudies from './pages/CaseStudies';
import About from './pages/About';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import DynamicPage from './pages/DynamicPage';
import Pricing from './pages/Pricing';

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  React.useEffect(() => { window.scrollTo(0, 0); }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen font-sans text-slate-900">
      <style>{`
        :root { --primary: #4f46e5; }
        .text-primary { color: var(--primary) !important; }
        .bg-primary { background-color: var(--primary) !important; }
        .border-primary { border-color: var(--primary) !important; }
      `}</style>
      
      {!isAdminRoute && <Navigation />}
      <div className="flex-grow">{children}</div>
      {!isAdminRoute && <Footer />}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ContentProvider>
      <Router>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/case-studies" element={<CaseStudies />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/page/:slug" element={<DynamicPage />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </AppLayout>
      </Router>
    </ContentProvider>
  );
};

export default App;
