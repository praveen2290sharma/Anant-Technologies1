import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { Mail, Phone, MapPin, Send, Calendar } from 'lucide-react';

const Contact: React.FC = () => {
  const { config, addLead } = useContent();
  const [activeTab, setActiveTab] = useState<'message' | 'booking'>('message');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    serviceInterest: 'SEO',
    message: '',
    date: '',
    time: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addLead({
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      serviceInterest: formData.serviceInterest,
      message: formData.message,
      status: 'new',
      date: new Date().toISOString(),
      type: activeTab === 'booking' ? 'booking' : 'general',
      bookingDate: activeTab === 'booking' ? `${formData.date} ${formData.time}` : undefined
    });
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-10 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-10">
          <div>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-6">Let's Discuss Your Growth</h1>
            <p className="text-lg text-slate-600 mb-10 leading-relaxed">
              Ready to take your business to the next level? Fill out the form or schedule a direct consultation with our strategists.
            </p>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 mb-10">
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary shadow-sm shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Email Us</h3>
                    <p className="text-slate-600">{config.contactEmail}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary shadow-sm shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Call Us</h3>
                    <p className="text-slate-600">{config.contactPhone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary shadow-sm shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Visit Us</h3>
                    <p className="text-slate-600">{config.address}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 lg:p-10 rounded-3xl shadow-xl shadow-slate-200/50">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-20">
                <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-6">
                  <Send size={40} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Request Received!</h3>
                <p className="text-slate-600">
                  {activeTab === 'booking' 
                    ? `We've confirmed your request for ${formData.date} at ${formData.time}. You'll receive a calendar invite shortly.` 
                    : "Thanks for reaching out. Our team will contact you within 24 hours."}
                </p>
                <button onClick={() => setSubmitted(false)} className="mt-8 text-primary font-bold hover:underline">
                  Start Over
                </button>
              </div>
            ) : (
              <div>
                <div className="flex gap-4 mb-8 bg-slate-100 p-1 rounded-xl">
                  <button 
                    onClick={() => setActiveTab('message')}
                    className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all ${activeTab === 'message' ? 'bg-white shadow text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    Send Message
                  </button>
                  <button 
                     onClick={() => setActiveTab('booking')}
                     className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'booking' ? 'bg-white shadow text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    <Calendar size={16} /> Book Call
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                    <input
                      required
                      type="text"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                    <input
                      required
                      type="email"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      placeholder="john@company.com"
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                    />
                  </div>

                  {activeTab === 'booking' && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Date</label>
                        <input
                          required
                          type="date"
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                          value={formData.date}
                          onChange={e => setFormData({...formData, date: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Time</label>
                        <input
                          required
                          type="time"
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                          value={formData.time}
                          onChange={e => setFormData({...formData, time: e.target.value})}
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Service Interested In</label>
                    <select
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      value={formData.serviceInterest}
                      onChange={e => setFormData({...formData, serviceInterest: e.target.value})}
                    >
                      <option value="SEO">SEO Optimization</option>
                      <option value="PPC">PPC Advertising</option>
                      <option value="Content">Content Marketing</option>
                      <option value="WebDev">Web Development</option>
                      <option value="Consulting">General Consulting</option>
                    </select>
                  </div>
                  
                  {activeTab === 'message' && (
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">How can we help?</label>
                      <textarea
                        required
                        rows={4}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                        placeholder="Tell us about your project goals..."
                        value={formData.message}
                        onChange={e => setFormData({...formData, message: e.target.value})}
                      ></textarea>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full py-4 bg-primary text-white rounded-xl font-bold text-lg hover:opacity-90 transition-colors shadow-lg shadow-primary/30"
                  >
                    {activeTab === 'booking' ? 'Confirm Booking' : 'Request Consultation'}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
