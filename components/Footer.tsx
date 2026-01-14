import React, { useState, useEffect } from 'react';
import { Rocket, Mail, Phone, MapPin, Instagram, Linkedin, Twitter, Lock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useContent } from '../context/ContentContext';

const Footer: React.FC = () => {
  const { config, isAdmin, toggleAdmin } = useContent();
  const [imgError, setImgError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setImgError(false);
  }, [config.logo]);

  const handleAdminClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isAdmin) toggleAdmin();
    navigate('/admin');
  };

  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              {config.logo && !imgError ? (
                <div className="bg-white p-2 rounded-lg inline-block">
                  <img 
                    src={config.logo} 
                    alt="Anant Technologies" 
                    className="h-10 w-auto object-contain" 
                    onError={() => setImgError(true)}
                  />
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white">
                    <Rocket size={18} />
                  </div>
                  <div className="flex flex-col justify-center">
                    <span className="font-bold text-lg text-white tracking-tight leading-none">ANANT</span>
                    <span className="text-[0.65rem] font-bold text-slate-400 uppercase tracking-wider leading-none">Technologies</span>
                  </div>
                </div>
              )}
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Empowering businesses with cutting-edge digital strategies. We turn traffic into revenue and clicks into customers.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-white transition-colors" aria-label="Twitter"><Twitter size={20} /></a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors" aria-label="LinkedIn"><Linkedin size={20} /></a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors" aria-label="Instagram"><Instagram size={20} /></a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Services</h3>
            <ul className="space-y-3 text-slate-400 text-sm">
              <li><Link to="/services" className="hover:text-primary transition-colors">SEO Optimization</Link></li>
              <li><Link to="/services" className="hover:text-primary transition-colors">PPC Advertising</Link></li>
              <li><Link to="/services" className="hover:text-primary transition-colors">Content Marketing</Link></li>
              <li><Link to="/services" className="hover:text-primary transition-colors">Web Development</Link></li>
              <li><Link to="/services" className="hover:text-primary transition-colors">Analytics & Data</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Company</h3>
            <ul className="space-y-3 text-slate-400 text-sm">
              <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Careers</Link></li>
              <li><Link to="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
              <li><Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Contact</h3>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-primary shrink-0 mt-0.5" />
                <span>{config.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-primary shrink-0" />
                <span>{config.contactPhone}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-primary shrink-0" />
                <span>{config.contactEmail}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
          <div className="flex items-center gap-4">
            <p>&copy; {new Date().getFullYear()} Anant Technologies. All rights reserved.</p>
            <button 
              onClick={handleAdminClick}
              className="flex items-center gap-1 text-[10px] uppercase tracking-widest font-bold hover:text-white transition-colors border border-slate-700 px-2 py-1 rounded"
            >
              <Lock size={10} /> Admin Login
            </button>
          </div>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
            <Link to="/" className="hover:text-white transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;