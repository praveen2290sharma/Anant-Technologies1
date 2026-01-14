import React from 'react';
import { useContent } from '../context/ContentContext';
import { Check, ArrowRight, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const Pricing: React.FC = () => {
  const { pricingPlans, config } = useContent();

  return (
    <div className="min-h-screen bg-slate-50 pt-20 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h1 className="text-4xl lg:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">Simple, Transparent Pricing</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Choose a plan that fits your business stage. No hidden fees, no long-term contracts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pricingPlans.map((plan) => (
            <div 
              key={plan.id} 
              className={`relative bg-white rounded-[2rem] p-8 lg:p-10 border shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-2 ${
                plan.isPopular ? 'border-primary ring-4 ring-primary/5' : 'border-slate-100'
              }`}
            >
              {plan.isPopular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg flex items-center gap-1">
                  <Zap size={12} fill="currentColor" /> Most Popular
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{plan.description}</p>
              </div>

              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-4xl font-extrabold text-slate-900">{config.currency}{plan.price}</span>
                {plan.period !== 'once' && <span className="text-slate-500 font-medium">/{plan.period}</span>}
              </div>

              <div className="space-y-4 mb-10">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3 text-slate-600 text-sm font-medium">
                    <div className="mt-0.5 p-0.5 bg-green-100 rounded-full text-green-600 shrink-0">
                      <Check size={14} strokeWidth={3} />
                    </div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <Link 
                to="/contact" 
                className={`block w-full py-4 text-center rounded-xl font-bold transition-all shadow-lg ${
                  plan.isPopular 
                    ? 'bg-primary text-white hover:opacity-90 shadow-primary/20' 
                    : 'bg-slate-900 text-white hover:bg-slate-800'
                }`}
              >
                {plan.buttonText}
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-24 bg-white rounded-[2.5rem] p-10 lg:p-16 border border-slate-100 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="max-w-xl">
             <h2 className="text-3xl font-bold text-slate-900 mb-4">Need a custom solution?</h2>
             <p className="text-slate-600">We work with large enterprises to build bespoke growth engines tailored to complex market requirements.</p>
          </div>
          <Link to="/contact" className="px-8 py-4 bg-slate-100 text-slate-900 rounded-xl font-bold hover:bg-slate-200 transition-colors flex items-center gap-2">
            Talk to an Expert <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
