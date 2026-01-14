import React from 'react';
import { useContent } from '../context/ContentContext';
import { Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Services: React.FC = () => {
  const { services } = useContent();

  return (
    <div className="min-h-screen bg-slate-50 pt-10 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 pt-10">
          <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">Our Services</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Comprehensive digital solutions designed to accelerate growth and maximize ROI for your business.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {services.map((service) => (
            <div key={service.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center">
                    {/* Placeholder for dynamic icon */}
                    <div className="font-bold text-xl">{service.title[0]}</div>
                  </div>
                  {service.price && (
                    <span className="px-3 py-1 bg-slate-100 text-slate-600 text-sm font-semibold rounded-full">
                      Starting at {service.price}
                    </span>
                  )}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{service.title}</h3>
                <p className="text-slate-600 mb-8 leading-relaxed">
                  {service.description}
                </p>
                <div className="space-y-3 mb-8">
                   {/* Mock features */}
                   <div className="flex items-center gap-3 text-slate-700 text-sm">
                     <Check size={16} className="text-green-500" /> <span>Strategy & Planning</span>
                   </div>
                   <div className="flex items-center gap-3 text-slate-700 text-sm">
                     <Check size={16} className="text-green-500" /> <span>Implementation & Execution</span>
                   </div>
                   <div className="flex items-center gap-3 text-slate-700 text-sm">
                     <Check size={16} className="text-green-500" /> <span>Monthly Reporting</span>
                   </div>
                </div>
                <Link to="/contact" className="block w-full py-3 text-center bg-slate-900 text-white rounded-lg font-semibold hover:bg-slate-800 transition-colors">
                  Get Started
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
