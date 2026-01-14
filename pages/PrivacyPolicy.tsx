import React from 'react';
import { useContent } from '../context/ContentContext';
import { Link } from 'react-router-dom';

const PrivacyPolicy: React.FC = () => {
  const { pages, config } = useContent();
  const page = pages.find(p => p.slug === 'privacy');
  
  // Helper to render simple markdown-like content (Same as DynamicPage)
  const renderContent = (content: string) => {
    return content.split('\n').map((line, idx) => {
      const trimmed = line.trim();
      if (!trimmed) return <div key={idx} className="h-4"></div>;
      if (trimmed.startsWith('###')) {
        return <h3 key={idx} className="text-xl font-bold text-slate-900 mt-6 mb-3">{trimmed.replace(/^###\s+/, '')}</h3>;
      }
      if (trimmed.startsWith('*') || trimmed.startsWith('-')) {
        return <li key={idx} className="ml-4 list-disc text-slate-600 mb-2">{trimmed.replace(/^[\*\-]\s+/, '')}</li>;
      }
      return <p key={idx} className="mb-4 text-slate-600 leading-relaxed">{trimmed}</p>;
    });
  };

  if (!page) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-slate-50 pt-10 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-sm border border-slate-100">
          <div className="border-b border-slate-100 pb-8 mb-8">
            <h1 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-4">{page.title}</h1>
            <p className="text-slate-500">Last Updated: {new Date().toLocaleDateString()}</p>
          </div>

          <div className="prose prose-slate max-w-none text-slate-600">
             {renderContent(page.content)}

             <div className="mt-12 bg-slate-50 p-6 rounded-xl border border-slate-200 not-prose">
              <p className="font-bold text-slate-900">Contact Us</p>
              <p className="text-slate-600">{config.address}</p>
              <p className="text-slate-600">Email: <a href={`mailto:${config.contactEmail}`} className="text-primary hover:underline">{config.contactEmail}</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
