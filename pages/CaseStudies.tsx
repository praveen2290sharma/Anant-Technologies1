import React from 'react';
import { useContent } from '../context/ContentContext';
import { Link } from 'react-router-dom';
import { ArrowRight, BarChart2 } from 'lucide-react';

const CaseStudies: React.FC = () => {
  const { caseStudies } = useContent();

  return (
    <div className="min-h-screen bg-slate-50 pt-10 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 pt-10">
          <h1 className="text-4xl lg:text-6xl font-extrabold text-slate-900 mb-6">Our Work</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            We don't just promise results. We prove them. Explore our recent success stories across various industries.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12">
          {caseStudies.map((study, index) => (
            <div key={study.id} className={`flex flex-col lg:flex-row gap-10 items-center bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-xl transition-shadow ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
              <div className="w-full lg:w-1/2 h-64 lg:h-96 rounded-2xl overflow-hidden shadow-lg relative group">
                <img src={study.image} alt={study.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute top-4 left-4 px-4 py-2 bg-white/90 backdrop-blur rounded-full text-sm font-bold text-primary shadow-sm">
                  {study.category}
                </div>
              </div>
              <div className="w-full lg:w-1/2 lg:p-4">
                <h3 className="text-slate-500 font-bold mb-2 uppercase tracking-wide text-sm">{study.client}</h3>
                <h2 className="text-3xl font-bold text-slate-900 mb-6 leading-tight">{study.title}</h2>
                
                <div className="flex flex-wrap gap-2 mb-8">
                  {study.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-sm font-medium">
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="mb-8 p-6 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                       <BarChart2 size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 font-medium">Key Result</p>
                      <p className="text-xl font-bold text-slate-900">{study.result}</p>
                    </div>
                  </div>
                </div>

                <Link to="/contact" className="inline-flex items-center text-primary font-bold text-lg hover:underline decoration-2 underline-offset-4">
                  Request a similar strategy <ArrowRight size={20} className="ml-2" />
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-20 text-center">
          <h3 className="text-2xl font-bold text-slate-900 mb-6">Want results like these?</h3>
          <Link to="/contact" className="inline-block px-10 py-4 bg-primary text-white rounded-xl font-bold text-lg hover:opacity-90 transition-all shadow-xl shadow-primary/30">
            Start Your Project
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CaseStudies;
