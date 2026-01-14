import React, { useState, useEffect } from 'react';
import { Menu, X, Rocket, ShieldCheck, LayoutDashboard } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useContent } from '../context/ContentContext';

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { config, isAdmin, toggleAdmin } = useContent();
  const location = useLocation();
  const [imgError, setImgError] = useState(false);

  useEffect(() => { setImgError(false); }, [config.logo]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Case Studies', path: '/case-studies' },
    { name: 'Blog', path: '/blog' },
  ];

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2">
              <span className="font-bold text-lg text-slate-900 tracking-tight">ANANT</span>
            </Link>
          </div>
          
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-semibold transition-colors duration-200 ${location.pathname === link.path ? 'text-primary' : 'text-slate-600 hover:text-primary'}`}
              >
                {link.name}
              </Link>
            ))}
            
            {isAdmin && (
              <Link
                to="/admin"
                className={`text-sm font-bold flex items-center gap-1 transition-colors duration-200 ${location.pathname === '/admin' ? 'text-red-600' : 'text-red-500 hover:text-red-700'}`}
              >
                <LayoutDashboard size={16} /> Dashboard
              </Link>
            )}

            <Link to="/contact" className="px-6 py-2.5 rounded-full bg-slate-900 text-white text-sm font-bold hover:bg-slate-800 transition-all">
              Book Strategy Call
            </Link>

            <button 
              onClick={toggleAdmin} 
              title={isAdmin ? "Exit Admin Mode" : "Enter Admin Mode"}
              className={`p-2 rounded-full transition-all border ${isAdmin ? 'bg-red-50 text-red-600 border-red-200' : 'bg-slate-50 text-slate-400 border-slate-200 hover:text-slate-600'}`}
            >
              <ShieldCheck size={20} />
            </button>
          </div>

          <div className="lg:hidden flex items-center gap-4">
            <button 
              onClick={toggleAdmin} 
              className={`p-2 rounded-full border ${isAdmin ? 'bg-red-50 text-red-600 border-red-200' : 'bg-slate-50 text-slate-400 border-slate-200'}`}
            >
              <ShieldCheck size={18} />
            </button>
            <button onClick={() => setIsOpen(!isOpen)}>{isOpen ? <X /> : <Menu />}</button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-b border-slate-100 animate-fade-in">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-4 text-base font-semibold text-slate-700 hover:bg-slate-50 rounded-xl"
              >
                {link.name}
              </Link>
            ))}
            {isAdmin && (
              <Link
                to="/admin"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-4 text-base font-bold text-red-600 hover:bg-red-50 rounded-xl"
              >
                Admin Dashboard
              </Link>
            )}
            <Link 
              to="/contact" 
              onClick={() => setIsOpen(false)}
              className="block px-3 py-4 text-base font-bold text-primary"
            >
              Book Strategy Call
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;