import React from 'react';
import { CheckCircle, Users, Award, TrendingUp, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="pt-20 pb-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
           <h1 className="text-4xl lg:text-6xl font-extrabold text-slate-900 mb-8">We Build Digital Engines<br className="hidden lg:block"/> That Drive Revenue</h1>
           <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
             Anant Technologies is a new-breed agency. We combine creative storytelling with rigorous data science to help ambitious brands scale faster.
           </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
             <div className="relative">
               <img src="https://picsum.photos/800/1000?random=50" alt="Our Team" className="rounded-2xl shadow-2xl" />
               <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-primary rounded-2xl -z-10 hidden lg:block"></div>
             </div>
             <div>
               <h3 className="text-primary font-bold uppercase tracking-wider mb-2">Our Story</h3>
               <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">From a small room to a global partner</h2>
               <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
                 <p>
                   Founded in 2020, we noticed a gap in the market. Agencies were either "all creative" or "all numbers." No one was bridging the gap effectively.
                 </p>
                 <p>
                   We built Anant to be that bridge. We believe that beautiful design is useless if it doesn't convert, and traffic is meaningless if it doesn't build a brand.
                 </p>
                 <p>
                   Today, we partner with industry leaders to act as their growth engine, providing end-to-end support from strategy to execution.
                 </p>
               </div>
               
               <div className="grid grid-cols-2 gap-6 mt-10">
                 <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <Users className="text-primary mb-3" size={32} />
                    <div className="font-bold text-2xl text-slate-900">50+</div>
                    <div className="text-sm text-slate-500">Experts</div>
                 </div>
                 <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <Award className="text-primary mb-3" size={32} />
                    <div className="font-bold text-2xl text-slate-900">12</div>
                    <div className="text-sm text-slate-500">Awards Won</div>
                 </div>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-16">
             <h2 className="text-3xl font-bold">Our Core Values</h2>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="p-8 bg-slate-800 rounded-2xl border border-slate-700">
                <div className="w-12 h-12 bg-primary/20 text-primary rounded-lg flex items-center justify-center mb-6">
                  <TrendingUp />
                </div>
                <h3 className="text-xl font-bold mb-3">Results First</h3>
                <p className="text-slate-400">We don't hide behind vanity metrics. We focus on revenue, profit, and growth.</p>
              </div>
              <div className="p-8 bg-slate-800 rounded-2xl border border-slate-700">
                <div className="w-12 h-12 bg-primary/20 text-primary rounded-lg flex items-center justify-center mb-6">
                  <CheckCircle />
                </div>
                <h3 className="text-xl font-bold mb-3">Radical Transparency</h3>
                <p className="text-slate-400">You own your data. We provide clear, honest reporting every single month.</p>
              </div>
              <div className="p-8 bg-slate-800 rounded-2xl border border-slate-700">
                <div className="w-12 h-12 bg-primary/20 text-primary rounded-lg flex items-center justify-center mb-6">
                  <Zap />
                </div>
                <h3 className="text-xl font-bold mb-3">Agile Execution</h3>
                <p className="text-slate-400">The digital landscape moves fast. So do we. We test, learn, and iterate rapidly.</p>
              </div>
           </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center">
         <h2 className="text-3xl font-bold text-slate-900 mb-6">Join the winning team</h2>
         <Link to="/contact" className="inline-block px-10 py-4 bg-primary text-white rounded-xl font-bold text-lg hover:opacity-90 transition-all shadow-xl shadow-primary/30">
            Work With Us
         </Link>
      </section>
    </div>
  );
};

export default About;