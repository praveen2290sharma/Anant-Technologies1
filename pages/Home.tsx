import React from 'react';
import { ArrowRight, CheckCircle, BarChart2, Users, Globe, Zap, MessageSquare, Briefcase, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useContent } from '../context/ContentContext';

const Home: React.FC = () => {
  const { config, services, testimonials, caseStudies, faqs } = useContent();

  const [openFaq, setOpenFaq] = React.useState<string | null>(null);

  const toggleFaq = (id: string) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-slate-50 overflow-hidden pt-20 pb-28 lg:pt-32 lg:pb-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 text-primary text-sm font-bold mb-8 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Accepting New Clients for {new Date().getFullYear()}
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 tracking-tight mb-8 leading-[1.1]">
              {config.heroHeadline}
            </h1>
            <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              {config.heroSubheadline}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/contact" className="px-8 py-4 bg-primary text-white rounded-xl font-bold text-lg hover:opacity-90 transition-all shadow-xl shadow-primary/30 flex items-center justify-center gap-2 transform hover:-translate-y-1">
                Get Your Free Audit <ArrowRight size={20} />
              </Link>
              <Link to="/services" className="px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-xl font-bold text-lg hover:bg-slate-50 transition-all flex items-center justify-center hover:shadow-lg transform hover:-translate-y-1">
                Explore Services
              </Link>
            </div>
          </div>
        </div>
        
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl opacity-60 mix-blend-multiply"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-200 rounded-full blur-3xl opacity-60 mix-blend-multiply"></div>
        </div>
      </section>

      {/* Trust Stats */}
      <section className="bg-white py-12 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-slate-100">
            <div>
              <p className="text-4xl font-extrabold text-primary mb-1">500+</p>
              <p className="text-sm text-slate-500 uppercase tracking-wide font-bold">Clients Served</p>
            </div>
            <div>
              <p className="text-4xl font-extrabold text-primary mb-1">98%</p>
              <p className="text-sm text-slate-500 uppercase tracking-wide font-bold">Retention Rate</p>
            </div>
            <div>
              <p className="text-4xl font-extrabold text-primary mb-1">10x</p>
              <p className="text-sm text-slate-500 uppercase tracking-wide font-bold">Average ROI</p>
            </div>
            <div>
              <p className="text-4xl font-extrabold text-primary mb-1">24/7</p>
              <p className="text-sm text-slate-500 uppercase tracking-wide font-bold">Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Snippet */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">Our Core Solutions</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">We don't just offer services; we provide integrated growth systems tailored to your business needs.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.slice(0, 3).map((service, idx) => (
              <div key={service.id} className="group p-8 rounded-2xl border border-slate-100 bg-white hover:border-primary hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 transform hover:-translate-y-1">
                <div className="w-14 h-14 bg-slate-50 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                  {/* Dynamic icon mapping placeholder */}
                  {idx === 0 ? <Globe size={28} /> : idx === 1 ? <BarChart2 size={28} /> : <Zap size={28} />}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                <p className="text-slate-600 leading-relaxed mb-6">{service.description}</p>
                <Link to="/services" className="inline-flex items-center text-primary font-bold hover:text-indigo-800 transition-colors">
                  Learn more <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mb-16 md:text-center max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">Our Proven Methodology</h2>
            <p className="text-slate-400 text-lg">We've refined our process over a decade to deliver consistent, predictable results for our partners.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { title: 'Discovery', desc: 'We audit your current status and define clear KPIs.', icon: <Users /> },
              { title: 'Strategy', desc: 'We build a custom roadmap to hit your targets.', icon: <Briefcase /> },
              { title: 'Execution', desc: 'Our experts launch campaigns and optimize code.', icon: <Zap /> },
              { title: 'Optimization', desc: 'Continuous testing to maximize ROI.', icon: <BarChart2 /> }
            ].map((step, i) => (
              <div key={i} className="relative">
                <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center text-primary mb-6 border border-slate-700">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-slate-400 leading-relaxed text-sm">{step.desc}</p>
                {i < 3 && <div className="hidden md:block absolute top-8 left-20 w-full h-[2px] bg-slate-800 -z-10"></div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Snippet */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
               <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">Recent Case Studies</h2>
               <p className="text-slate-600">See how we've helped companies just like yours.</p>
            </div>
            <Link to="/case-studies" className="text-primary font-bold flex items-center hover:underline">
              View All Work <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {caseStudies.slice(0, 2).map((study) => (
              <div key={study.id} className="group relative rounded-2xl overflow-hidden aspect-[4/3] cursor-pointer shadow-lg">
                <img src={study.image} alt={study.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent flex flex-col justify-end p-8">
                  <div className="text-primary font-bold text-sm mb-2 uppercase tracking-wider">{study.category}</div>
                  <h3 className="text-2xl font-bold text-white mb-2">{study.title}</h3>
                  <p className="text-slate-300 mb-4 text-sm font-medium">{study.client}</p>
                  <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-md rounded-lg text-white font-bold border border-white/20">
                    <BarChart2 size={16} className="mr-2 text-green-400" /> {study.result}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">Client Success Stories</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((t) => (
              <div key={t.id} className="bg-white p-10 rounded-2xl shadow-sm border border-slate-100 relative">
                <div className="flex items-center gap-4 mb-6">
                  <img src={t.avatar} alt={t.name} className="w-16 h-16 rounded-full object-cover border-4 border-slate-50" />
                  <div>
                    <p className="font-bold text-slate-900 text-lg">{t.name}</p>
                    <p className="text-sm text-slate-500 font-medium">{t.role}, {t.company}</p>
                  </div>
                </div>
                <div className="flex text-yellow-400 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                  ))}
                </div>
                <p className="text-slate-700 italic text-lg leading-relaxed">"{t.content}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.id} className="border border-slate-200 rounded-xl overflow-hidden transition-all duration-200 hover:border-slate-300">
                <button 
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full flex items-center justify-between p-6 text-left bg-white hover:bg-slate-50 transition-colors"
                >
                  <span className="font-bold text-slate-900 text-lg">{faq.question}</span>
                  <Plus className={`text-slate-400 transition-transform duration-300 ${openFaq === faq.id ? 'rotate-45' : ''}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaq === faq.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="p-6 pt-0 text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900 rounded-[2.5rem] p-12 lg:p-20 text-center text-white relative overflow-hidden shadow-2xl">
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-3xl lg:text-5xl font-bold mb-8 leading-tight">Ready to dominate your market?</h2>
              <p className="text-slate-300 text-xl mb-12 leading-relaxed">
                Book a free 30-minute strategy call with our experts. No hard selling, just actionable advice to scale your revenue.
              </p>
              <Link to="/contact" className="inline-block px-12 py-5 bg-white text-slate-900 rounded-full font-bold text-lg hover:bg-primary hover:text-white transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1">
                Schedule My Call
              </Link>
            </div>
             <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-primary rounded-full opacity-20 blur-[100px]"></div>
             <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-purple-600 rounded-full opacity-20 blur-[100px]"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
