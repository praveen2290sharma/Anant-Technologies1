
import React, { useState, useEffect } from 'react';
import { useContent } from '../context/ContentContext';
import { generateMarketingContent } from '../services/geminiService';
import { LayoutDashboard, Users, FileText, Settings, Sparkles, Plus, Trash, Save, Briefcase, HelpCircle, Palette, Globe, Image, Check, DollarSign, Edit, ExternalLink, CreditCard, Star, X, Eye, AlertCircle, Info } from 'lucide-react';
import { Service, BlogPost, CaseStudy, FAQItem, Page, PricingPlan } from '../types';
import { Link } from 'react-router-dom';

const Admin: React.FC = () => {
  const { 
    isAdmin, leads, services, addService, deleteService, 
    pricingPlans, addPricingPlan, deletePricingPlan,
    updateConfig, config, blogPosts, addBlogPost,
    caseStudies, addCaseStudy, deleteCaseStudy,
    faqs, addFAQ, deleteFAQ, pages, addPage, updatePage, deletePage
  } = useContent();

  const [activeTab, setActiveTab] = useState<'leads' | 'services' | 'pricing' | 'content' | 'settings'>('leads');
  const [contentSubTab, setContentSubTab] = useState<'pages' | 'blog' | 'caseStudies' | 'faqs'>('pages');
  
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiGenerating, setAiGenerating] = useState(false);
  const [aiResult, setAiResult] = useState('');
  const [showSavedMessage, setShowSavedMessage] = useState(false);

  // Check if API Key is configured
  const isApiKeyConfigured = !!process.env.API_KEY && process.env.API_KEY !== 'undefined' && process.env.API_KEY.length > 10;

  // Forms State
  const [newService, setNewService] = useState<Partial<Service>>({ title: '', description: '', price: '' });
  const [newPlan, setNewPlan] = useState<Partial<PricingPlan>>({ name: '', description: '', price: '', period: 'mo', features: [], isPopular: false, buttonText: 'Get Started' });
  const [newFeature, setNewFeature] = useState('');

  const [editingPageId, setEditingPageId] = useState<string | null>(null);
  const [editPageData, setEditPageData] = useState<Partial<Page>>({});
  const [isNewPage, setIsNewPage] = useState(false);

  if (!isAdmin) return <div className="p-20 text-center">Access Denied. Enable Admin Mode in Nav.</div>;

  const handleAddPricingPlan = () => {
    if (newPlan.name && newPlan.price) {
      addPricingPlan({ ...newPlan, id: Date.now().toString(), features: newPlan.features || [] } as PricingPlan);
      setNewPlan({ name: '', description: '', price: '', period: 'mo', features: [], isPopular: false, buttonText: 'Get Started' });
    }
  };

  const handleEditPage = (page: Page) => {
    setEditingPageId(page.id);
    setEditPageData({ ...page });
    setIsNewPage(false);
    setAiResult('');
  };

  const handleCreatePage = () => {
    const newId = Date.now().toString();
    setEditingPageId(newId);
    setEditPageData({ id: newId, title: '', slug: '', content: '', status: 'draft', type: 'custom' });
    setIsNewPage(true);
    setAiResult('');
  };

  const handleSavePage = () => {
    if (!editPageData.title || !editPageData.slug) return;
    
    if (isNewPage) {
      addPage(editPageData as Page);
    } else {
      updatePage(editingPageId!, editPageData);
    }
    setEditingPageId(null);
    setEditPageData({});
  };

  const handleGenerateAI = async (type: 'blog' | 'service_description' | 'case_study' | 'page_content') => {
    if (!aiPrompt) return;
    if (!isApiKeyConfigured) {
      alert("API Key is not configured correctly.");
      return;
    }
    setAiGenerating(true);
    const text = await generateMarketingContent({
      topic: aiPrompt,
      type: type,
      tone: 'Professional and Persuasive'
    });
    setAiResult(text);
    if (editingPageId) {
      setEditPageData(prev => ({ ...prev, content: (prev.content || '') + '\n\n' + text }));
    }
    setAiGenerating(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      <aside className="w-64 bg-slate-900 text-white hidden md:block shrink-0 h-screen sticky top-0 overflow-y-auto">
        <div className="p-6 text-center border-b border-slate-800">
          <h2 className="text-xl font-bold tracking-tight">Anant Admin</h2>
          <p className="text-[10px] text-slate-500 uppercase mt-1 font-bold">Growth Engine v1.0</p>
        </div>
        <nav className="mt-6 px-4 space-y-2">
          {[
            { id: 'leads', icon: Users, label: 'Leads' },
            { id: 'services', icon: LayoutDashboard, label: 'Services' },
            { id: 'pricing', icon: CreditCard, label: 'Pricing' },
            { id: 'content', icon: FileText, label: 'CMS' },
            { id: 'settings', icon: Settings, label: 'Settings' }
          ].map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)} 
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === tab.id ? 'bg-primary text-white' : 'hover:bg-slate-800 text-slate-400'}`}
            >
              <tab.icon size={20} /> <span className="font-bold text-sm">{tab.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto h-screen">
        <div className="max-w-6xl mx-auto">
          
          {/* Enhanced API Key Warning */}
          {!isApiKeyConfigured && (
            <div className="mb-10 p-6 bg-white border-2 border-amber-400 rounded-2xl shadow-xl shadow-amber-100 flex flex-col md:flex-row gap-6 animate-pulse-slow">
              <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-600 shrink-0">
                <AlertCircle size={32} />
              </div>
              <div>
                <h4 className="font-bold text-xl text-slate-900 mb-2">Netlify Configuration Required</h4>
                <p className="text-slate-600 mb-4">You put the long key in the "Key" box, which is why Netlify gave an error. Follow these exact steps:</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                    <p className="text-xs font-bold text-slate-400 uppercase mb-1">Step 1: In "Key" box</p>
                    <code className="text-sm font-bold text-primary bg-indigo-50 px-2 py-1 rounded">API_KEY</code>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                    <p className="text-xs font-bold text-slate-400 uppercase mb-1">Step 2: In "Value" box</p>
                    <code className="text-sm font-bold text-slate-600 bg-slate-200 px-2 py-1 rounded">Paste your long key here</code>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm font-medium text-amber-700 bg-amber-50 p-2 rounded-lg">
                  <Info size={16} />
                  <span>Important: After saving, click "Trigger deploy" in the Deploys tab.</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'leads' && (
             <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                  <h2 className="text-xl font-bold text-slate-900">Recent Leads</h2>
                  <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold">{leads.length} Total</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 font-bold border-b border-slate-200 text-slate-600 uppercase tracking-wider text-[10px]">
                      <tr>
                        <th className="px-6 py-4">Name</th>
                        <th className="px-6 py-4">Interest</th>
                        <th className="px-6 py-4">Type</th>
                        <th className="px-6 py-4">Date</th>
                        <th className="px-6 py-4">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leads.length === 0 ? (
                        <tr><td colSpan={5} className="px-6 py-12 text-center text-slate-400 font-medium">No leads captured yet. Your marketing engine is ready for traffic!</td></tr>
                      ) : (
                        leads.map(l => (
                          <tr key={l.id} className="border-b hover:bg-slate-50 transition-colors">
                            <td className="px-6 py-4">
                              <div className="font-bold text-slate-900">{l.name}</div>
                              <div className="text-xs text-slate-500">{l.email}</div>
                            </td>
                            <td className="px-6 py-4 font-medium">{l.serviceInterest}</td>
                            <td className="px-6 py-4">
                              <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${l.type === 'booking' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                                {l.type}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-slate-500 font-medium">{new Date(l.date).toLocaleDateString()}</td>
                            <td className="px-6 py-4">
                              <span className="flex items-center gap-1.5 font-bold text-green-600">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div> New
                              </span>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
             </div>
          )}

          {activeTab === 'pricing' && (
            <div>
               <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-slate-900">Pricing Plans</h2>
                <p className="text-sm text-slate-500 font-medium italic">These plans appear on your public /pricing page</p>
               </div>
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    {pricingPlans.map(plan => (
                      <div key={plan.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex justify-between items-center group hover:border-primary/50 transition-colors">
                         <div>
                            <h4 className="font-bold flex items-center gap-2 text-slate-900">
                              {plan.name} {plan.isPopular && <span className="text-[10px] bg-yellow-100 text-yellow-700 px-2 rounded-full font-bold">POPULAR</span>}
                            </h4>
                            <p className="text-xs text-slate-500 font-bold">{config.currency}{plan.price}/{plan.period}</p>
                         </div>
                         <button onClick={() => deletePricingPlan(plan.id)} className="text-red-400 p-2 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"><Trash size={18}/></button>
                      </div>
                    ))}
                  </div>

                  <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm h-fit sticky top-8">
                     <h3 className="font-bold mb-4 text-slate-900">Add New Plan</h3>
                     <div className="space-y-4">
                        <input type="text" placeholder="Plan Name (e.g. Basic)" className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none font-medium" value={newPlan.name} onChange={e => setNewPlan({...newPlan, name: e.target.value})} />
                        <input type="text" placeholder="Price (Numeric only, e.g. 5000)" className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none font-medium" value={newPlan.price} onChange={e => setNewPlan({...newPlan, price: e.target.value})} />
                        <select className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none font-bold text-slate-700" value={newPlan.period} onChange={e => setNewPlan({...newPlan, period: e.target.value as any})}>
                           <option value="mo">Per Month</option>
                           <option value="yr">Per Year</option>
                           <option value="once">One-time Payment</option>
                        </select>
                        <div className="flex gap-2">
                           <input type="text" placeholder="Add a feature..." className="flex-1 p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none" value={newFeature} onChange={e => setNewFeature(e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), newFeature && (setNewPlan({...newPlan, features: [...(newPlan.features || []), newFeature]}), setNewFeature('')))} />
                           <button onClick={() => {if(newFeature){setNewPlan({...newPlan, features: [...(newPlan.features || []), newFeature]}); setNewFeature('')}}} className="p-3 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors text-slate-600"><Plus size={20}/></button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                           {newPlan.features?.map((f, i) => <span key={i} className="bg-indigo-50 text-indigo-700 px-2 py-1 rounded text-xs flex items-center gap-1 font-bold border border-indigo-100">{f} <X size={12} className="cursor-pointer hover:text-red-500" onClick={() => setNewPlan({...newPlan, features: newPlan.features?.filter((_, idx) => idx !== i)})} /></span>)}
                        </div>
                        <label className="flex items-center gap-2 cursor-pointer group p-2 rounded-lg hover:bg-slate-50">
                           <input type="checkbox" className="w-4 h-4 text-primary rounded border-slate-300 focus:ring-primary/20" checked={newPlan.isPopular} onChange={e => setNewPlan({...newPlan, isPopular: e.target.checked})} />
                           <span className="text-sm font-bold text-slate-700 group-hover:text-primary transition-colors">Mark as Most Popular</span>
                        </label>
                        <button onClick={handleAddPricingPlan} className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg">Publish Plan</button>
                     </div>
                  </div>
               </div>
            </div>
          )}

          {activeTab === 'services' && (
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Service Offerings</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  {services.map(service => (
                    <div key={service.id} className="bg-white p-6 rounded-xl border border-slate-200 flex justify-between items-center shadow-sm hover:shadow-md transition-all group">
                      <div>
                        <h3 className="font-bold text-slate-900">{service.title}</h3>
                        <p className="text-xs text-slate-500 font-bold uppercase tracking-wide">{service.price}</p>
                      </div>
                      <button onClick={() => deleteService(service.id)} className="text-red-400 p-2 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"><Trash size={18} /></button>
                    </div>
                  ))}
                </div>
                <div className="bg-white p-8 rounded-xl border border-slate-200 h-fit sticky top-8 shadow-sm">
                   <h3 className="font-bold mb-4 text-slate-900">Add Service</h3>
                   <div className="space-y-4">
                     <input type="text" placeholder="Service Title" className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none font-medium" value={newService.title} onChange={e => setNewService({...newService, title: e.target.value})} />
                     <textarea placeholder="Compelling Description" className="w-full p-3 border border-slate-200 rounded-lg h-32 resize-none focus:ring-2 focus:ring-primary/20 outline-none text-sm" value={newService.description} onChange={e => setNewService({...newService, description: e.target.value})}></textarea>
                     <input type="text" placeholder="Price (e.g. ₹20,000/mo)" className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none font-medium" value={newService.price} onChange={e => setNewService({...newService, price: e.target.value})} />
                     <button onClick={() => {if(newService.title){addService({...newService, id: Date.now().toString(), icon: 'Star'} as Service); setNewService({title:'',description:'',price:''})}}} className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg">Save Service</button>
                   </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'content' && (
            <div>
               <div className="flex gap-4 mb-8 bg-slate-100 p-1 rounded-xl w-fit overflow-x-auto border border-slate-200">
                  <button onClick={() => setContentSubTab('pages')} className={`px-6 py-2.5 rounded-lg font-bold text-sm whitespace-nowrap transition-all ${contentSubTab === 'pages' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}>Pages</button>
                  <button onClick={() => setContentSubTab('blog')} className={`px-6 py-2.5 rounded-lg font-bold text-sm whitespace-nowrap transition-all ${contentSubTab === 'blog' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}>Blog</button>
                  <button onClick={() => setContentSubTab('caseStudies')} className={`px-6 py-2.5 rounded-lg font-bold text-sm whitespace-nowrap transition-all ${contentSubTab === 'caseStudies' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}>Case Studies</button>
                  <button onClick={() => setContentSubTab('faqs')} className={`px-6 py-2.5 rounded-lg font-bold text-sm whitespace-nowrap transition-all ${contentSubTab === 'faqs' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}>FAQs</button>
               </div>

               {contentSubTab === 'pages' && (
                 <div>
                    {editingPageId ? (
                      <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm animate-fade-in">
                        <div className="flex justify-between items-center mb-8 pb-4 border-b border-slate-100">
                           <div className="flex items-center gap-2">
                             <div className="p-2 bg-primary/10 text-primary rounded-lg"><Edit size={20}/></div>
                             <h3 className="font-bold text-xl text-slate-900">{isNewPage ? 'Create New Page' : 'Edit Page Content'}</h3>
                           </div>
                           <button onClick={() => {setEditingPageId(null); setAiResult('')}} className="text-sm text-slate-500 hover:text-red-500 font-bold flex items-center gap-1 transition-colors"><X size={16}/> Cancel</button>
                        </div>
                        
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                          <div className="lg:col-span-2 space-y-8">
                             <div className="flex flex-col md:flex-row gap-6">
                               <div className="flex-1">
                                 <label className="block text-xs font-bold text-slate-400 uppercase mb-2 tracking-widest">Page Name</label>
                                 <input 
                                   type="text" 
                                   className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none font-bold text-slate-900" 
                                   value={editPageData.title || ''} 
                                   onChange={e => {
                                     const title = e.target.value;
                                     const slug = isNewPage ? title.toLowerCase().replace(/[^a-z0-9]+/g, '-') : editPageData.slug;
                                     setEditPageData(prev => ({ ...prev, title, slug }));
                                   }}
                                 />
                               </div>
                               <div className="w-full md:w-48">
                                 <label className="block text-xs font-bold text-slate-400 uppercase mb-2 tracking-widest">Visibility</label>
                                 <select 
                                   className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none font-bold text-slate-700"
                                   value={editPageData.status || 'draft'}
                                   onChange={e => setEditPageData(prev => ({ ...prev, status: e.target.value as 'draft' | 'published' }))}
                                 >
                                   <option value="draft">Draft (Hidden)</option>
                                   <option value="published">Live (Visible)</option>
                                 </select>
                               </div>
                             </div>
                             <div>
                               <label className="block text-xs font-bold text-slate-400 uppercase mb-2 tracking-widest">Permanent URL</label>
                               <div className="flex items-center">
                                 <span className="bg-slate-50 border border-r-0 border-slate-200 p-3 rounded-l-lg text-slate-400 text-xs font-bold">/page/</span>
                                 <input 
                                   type="text" 
                                   disabled={editPageData.type === 'system'}
                                   className={`w-full p-3 border border-slate-200 rounded-r-lg focus:ring-2 focus:ring-primary/20 outline-none font-mono text-sm ${editPageData.type === 'system' ? 'bg-slate-50 text-slate-400' : 'text-primary'}`}
                                   value={editPageData.slug || ''} 
                                   onChange={e => setEditPageData(prev => ({ ...prev, slug: e.target.value }))}
                                 />
                               </div>
                             </div>
                             <div>
                               <label className="block text-xs font-bold text-slate-400 uppercase mb-2 tracking-widest">Editor (Supports Markdown)</label>
                               <textarea 
                                 className="w-full p-6 border border-slate-200 rounded-xl h-96 font-mono text-sm focus:ring-2 focus:ring-primary/20 outline-none resize-none leading-relaxed text-slate-700" 
                                 value={editPageData.content || ''} 
                                 onChange={e => setEditPageData(prev => ({ ...prev, content: e.target.value }))}
                                 placeholder="# Main Heading..."
                               ></textarea>
                             </div>
                             <div className="flex gap-4">
                                <button onClick={handleSavePage} className="px-8 py-4 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-all flex items-center gap-2 shadow-lg shadow-green-100">
                                   <Save size={18} /> Commit Changes
                                </button>
                                <Link to={editPageData.type === 'system' ? `/${editPageData.slug === 'home' ? '' : editPageData.slug}` : `/page/${editPageData.slug}`} target="_blank" className="px-8 py-4 bg-slate-100 text-slate-700 border border-slate-200 rounded-xl font-bold hover:bg-slate-200 transition-all flex items-center gap-2">
                                   <Eye size={18} /> Preview Live
                                </Link>
                             </div>
                          </div>
                          
                          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 h-fit sticky top-8 shadow-sm">
                             <div className="flex items-center gap-2 mb-4 text-purple-700 font-bold">
                               <Sparkles size={20} />
                               <span className="text-sm">AI Drafting Tool</span>
                             </div>
                             <p className="text-[11px] text-slate-500 mb-4 leading-relaxed font-bold uppercase tracking-tight">Generate professional copy for this page automatically.</p>
                             <textarea 
                               className="w-full p-3 border border-slate-200 rounded-xl h-32 mb-4 resize-none text-sm focus:ring-2 focus:ring-primary/20 outline-none font-medium text-slate-600"
                               placeholder="What should this page be about? (e.g. A privacy policy for an agency based in India...)"
                               value={aiPrompt}
                               onChange={e => setAiPrompt(e.target.value)}
                             ></textarea>
                             <button 
                                onClick={() => handleGenerateAI('page_content')} 
                                disabled={aiGenerating || !aiPrompt || !isApiKeyConfigured}
                                className="w-full py-3 bg-purple-600 text-white rounded-xl font-bold text-sm hover:bg-purple-700 disabled:opacity-50 transition-all shadow-lg shadow-purple-100"
                              >
                                {aiGenerating ? 'AI is Thinking...' : 'Generate with Gemini'}
                              </button>
                              {!isApiKeyConfigured && (
                                <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-lg text-[10px] font-bold border border-red-100 flex items-start gap-2">
                                  <AlertCircle size={14} className="shrink-0" />
                                  <span>KEY REQUIRED: Please fix the Netlify error shown at the top of the screen.</span>
                                </div>
                              )}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <div className="flex justify-between items-center">
                          <h3 className="font-bold text-lg text-slate-900">Site Architecture</h3>
                          <button onClick={handleCreatePage} className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-md">
                            <Plus size={18} /> New Page
                          </button>
                        </div>
                        
                        <div className="grid grid-cols-1 gap-4">
                          {pages.map(page => (
                             <div key={page.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:shadow-md hover:border-primary/30 transition-all">
                                <div className="flex-1">
                                   <div className="flex items-center gap-3">
                                     <h4 className="font-bold text-lg text-slate-900 leading-none">
                                       {page.title} 
                                     </h4>
                                     {page.type === 'system' && <span className="text-[9px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full uppercase tracking-widest font-extrabold border border-slate-200">System</span>}
                                     <span className={`text-[9px] px-2 py-0.5 rounded-full uppercase tracking-widest font-extrabold border ${page.status === 'published' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-slate-50 text-slate-400 border-slate-200'}`}>
                                       {page.status || 'draft'}
                                     </span>
                                   </div>
                                   <div className="text-xs text-primary font-bold flex items-center gap-1 mt-2 font-mono">
                                      /{page.slug}
                                   </div>
                                </div>
                                <div className="flex items-center gap-2">
                                   <button onClick={() => handleEditPage(page)} className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors">
                                      <Edit size={14} /> Edit
                                   </button>
                                   {page.type !== 'system' && (
                                     <button onClick={() => deletePage(page.id)} className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition-colors">
                                        <Trash size={16} />
                                     </button>
                                   )}
                                </div>
                             </div>
                          ))}
                        </div>
                      </div>
                    )}
                 </div>
               )}

               {contentSubTab === 'blog' && (
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                   <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm h-fit sticky top-8">
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-xl text-slate-900">AI Article Generator</h3>
                        <div className="flex items-center gap-1.5 bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                          <Sparkles size={12}/> Gemini Pro 2.0
                        </div>
                      </div>
                      <textarea 
                        className="w-full p-4 border border-slate-200 rounded-xl h-40 mb-4 resize-none focus:ring-2 focus:ring-primary/20 outline-none text-sm leading-relaxed font-medium text-slate-700"
                        placeholder="What's the topic? (e.g. Why SEO matters for small businesses in 2025...)"
                        value={aiPrompt}
                        onChange={(e) => setAiPrompt(e.target.value)}
                      ></textarea>
                      <button 
                        onClick={() => handleGenerateAI('blog')} 
                        disabled={aiGenerating || !aiPrompt || !isApiKeyConfigured}
                        className="w-full py-4 bg-primary text-white rounded-xl font-bold hover:opacity-90 disabled:opacity-50 transition-all shadow-lg shadow-primary/20"
                      >
                        {aiGenerating ? 'AI is Writing Article...' : 'Draft Full Article'}
                      </button>
                      
                      {aiResult && (
                        <div className="mt-8 p-6 bg-slate-50 rounded-2xl border border-slate-200 animate-fade-in">
                          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 border-b border-slate-200 pb-2">Generated Draft</h4>
                          <p className="text-sm text-slate-600 whitespace-pre-wrap max-h-60 overflow-y-auto leading-relaxed font-serif">{aiResult}</p>
                          <button 
                            onClick={() => {
                              addBlogPost({
                                id: Date.now().toString(),
                                title: aiPrompt.length > 50 ? aiPrompt.substring(0, 47) + '...' : aiPrompt,
                                excerpt: aiResult.substring(0, 120) + '...',
                                content: aiResult,
                                author: 'Anant Team',
                                date: new Date().toISOString().split('T')[0],
                                imageUrl: `https://picsum.photos/800/400?random=${Date.now()}`,
                                status: 'published'
                              });
                              setAiResult('');
                              setAiPrompt('');
                            }}
                            className="w-full mt-6 py-3 bg-green-600 text-white rounded-xl font-bold text-sm hover:bg-green-700 transition-all shadow-md"
                          >
                            Publish Now
                          </button>
                        </div>
                      )}
                   </div>
                   
                   <div className="space-y-6">
                      <h3 className="font-bold text-lg text-slate-900">Current Articles</h3>
                      {blogPosts.length === 0 ? (
                        <div className="bg-white p-10 rounded-2xl border border-dashed border-slate-300 text-center text-slate-400 font-bold">No articles yet. Start by generating one on the left.</div>
                      ) : (
                        <div className="space-y-4">
                          {blogPosts.map(post => (
                            <div key={post.id} className="bg-white p-4 rounded-xl border border-slate-200 flex gap-4 hover:shadow-md transition-all group">
                              <img src={post.imageUrl} className="w-20 h-20 rounded-lg object-cover bg-slate-100 shrink-0" alt={post.title} />
                              <div className="flex-1 min-w-0">
                                <h4 className="font-bold text-slate-900 truncate group-hover:text-primary transition-colors">{post.title}</h4>
                                <p className="text-[10px] text-slate-400 mt-1 font-bold uppercase tracking-wider">{post.date} • {post.author}</p>
                                <p className="text-[11px] text-slate-500 mt-2 line-clamp-1 italic">"{post.excerpt}"</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                   </div>
                 </div>
               )}
               
               {contentSubTab === 'faqs' && (
                 <div>
                    <h3 className="font-bold text-lg mb-6 text-slate-900">Question & Answer Database</h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                       <div className="space-y-4">
                          {faqs.map(faq => (
                            <div key={faq.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex justify-between items-start gap-4 group">
                               <div className="flex-1">
                                  <h4 className="font-bold text-slate-900 mb-2 leading-snug">{faq.question}</h4>
                                  <p className="text-sm text-slate-500 line-clamp-2 italic">{faq.answer}</p>
                               </div>
                               <button onClick={() => deleteFAQ(faq.id)} className="text-red-400 p-2 hover:bg-red-50 rounded-lg shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"><Trash size={16}/></button>
                            </div>
                          ))}
                       </div>
                       <div className="bg-white p-8 rounded-2xl border border-slate-200 h-fit sticky top-8 shadow-sm">
                          <h4 className="font-bold mb-4 text-slate-900">Add New FAQ</h4>
                          <div className="space-y-4">
                             <input type="text" placeholder="The Question..." className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none font-bold text-slate-700" id="faq-q" />
                             <textarea placeholder="The Answer..." className="w-full p-3 border border-slate-200 rounded-lg h-32 resize-none focus:ring-2 focus:ring-primary/20 outline-none text-sm text-slate-600" id="faq-a"></textarea>
                             <button 
                                onClick={() => {
                                  const q = (document.getElementById('faq-q') as HTMLInputElement).value;
                                  const a = (document.getElementById('faq-a') as HTMLTextAreaElement).value;
                                  if(q && a) {
                                    addFAQ({id: Date.now().toString(), question: q, answer: a});
                                    (document.getElementById('faq-q') as HTMLInputElement).value = '';
                                    (document.getElementById('faq-a') as HTMLTextAreaElement).value = '';
                                  }
                                }}
                                className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-md"
                             >
                               Save to FAQ List
                             </button>
                          </div>
                       </div>
                    </div>
                 </div>
               )}
            </div>
          )}

          {activeTab === 'settings' && (
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-8">Brand & Global Settings</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                
                <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm h-fit">
                  <h3 className="font-bold text-lg mb-8 flex items-center gap-2 text-slate-900 border-b border-slate-100 pb-4"><Palette size={20} className="text-primary"/> Design System</h3>
                  <div className="space-y-8">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase mb-3 tracking-widest">Primary Brand Color</label>
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <input 
                            type="color" 
                            className="h-14 w-14 rounded-2xl cursor-pointer border-4 border-slate-100 p-0 overflow-hidden shadow-sm"
                            value={config.themeColor}
                            onChange={(e) => updateConfig({ themeColor: e.target.value })}
                          />
                        </div>
                        <input 
                          type="text" 
                          className="flex-1 px-4 py-3 border border-slate-200 rounded-xl uppercase font-mono text-sm font-bold text-slate-600 focus:ring-2 focus:ring-primary/20 outline-none"
                          value={config.themeColor}
                          onChange={(e) => updateConfig({ themeColor: e.target.value })}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase mb-3 tracking-widest">Logo Image Source</label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none font-medium text-slate-600 text-sm" 
                        value={config.logo || ''} 
                        onChange={(e) => updateConfig({ logo: e.target.value })} 
                        placeholder="https://example.com/logo.png"
                      />
                    </div>
                     <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase mb-3 tracking-widest">Currency Icon</label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none font-bold text-slate-900" 
                        value={config.currency || '₹'} 
                        onChange={(e) => updateConfig({ currency: e.target.value })} 
                        placeholder="₹, $, €..."
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm h-fit">
                   <h3 className="font-bold text-lg mb-8 flex items-center gap-2 text-slate-900 border-b border-slate-100 pb-4"><Globe size={20} className="text-primary"/> Search & Identity</h3>
                   <div className="space-y-8">
                      <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase mb-3 tracking-widest">Site Title Template</label>
                        <input type="text" className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none font-bold text-slate-900" value={config.seoTitle} onChange={(e) => updateConfig({ seoTitle: e.target.value })} />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase mb-3 tracking-widest">Global Description</label>
                        <textarea className="w-full px-4 py-3 border border-slate-200 rounded-xl h-32 focus:ring-2 focus:ring-primary/20 outline-none resize-none text-sm leading-relaxed text-slate-600 font-medium" value={config.seoDescription} onChange={(e) => updateConfig({ seoDescription: e.target.value })}></textarea>
                      </div>
                      <div className="pt-6">
                        <button 
                          onClick={() => {
                            setShowSavedMessage(true);
                            setTimeout(() => setShowSavedMessage(false), 2000);
                          }}
                          className={`flex items-center justify-center gap-2 w-full py-5 rounded-2xl font-bold transition-all shadow-xl ${
                            showSavedMessage ? 'bg-green-500 text-white shadow-green-100' : 'bg-slate-900 text-white hover:bg-slate-800 shadow-slate-100'
                          }`}
                        >
                          {showSavedMessage ? <Check size={24} /> : <Save size={24} />}
                          <span className="text-lg">{showSavedMessage ? 'Configuration Locked!' : 'Save All Changes'}</span>
                        </button>
                      </div>
                   </div>
                </div>

              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
};

export default Admin;
