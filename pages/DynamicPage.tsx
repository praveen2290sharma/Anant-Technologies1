
import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useContent } from '../context/ContentContext';
import { ArrowLeft, AlertTriangle } from 'lucide-react';

const DynamicPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { pages, isAdmin } = useContent();
  
  const page = pages.find(p => p.slug === slug);

  // Check if page exists and if it's published. 
  // Allow Admins to see drafts for preview purposes.
  if (!page || (page.status === 'draft' && !isAdmin)) {
    return (
       <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">404 - Page Not Found</h1>
        <p className="text-slate-600 mb-8">The page you are looking for does not exist or is currently a draft.</p>
        <Link to="/" className="px-6 py-3 bg-primary text-white rounded-lg font-bold">Go Home</Link>
      </div>
    );
  }

  // Helper to render simple markdown-like content (Headers and Paragraphs)
  const renderContent = (content: string) => {
    return content.split('\n').map((line, idx) => {
      const trimmed = line.trim();
      if (!trimmed) return <div key={idx} className="h-4"></div>;
      
      if (trimmed.startsWith('###')) {
        return <h3 key={idx} className="text-xl font-bold text-slate-900 mt-6 mb-3">{trimmed.replace(/^###\s+/, '')}</h3>;
      }
      if (trimmed.startsWith('##')) {
        return <h2 key={idx} className="text-2xl font-bold text-slate-900 mt-8 mb-4">{trimmed.replace(/^##\s+/, '')}</h2>;
      }
      if (trimmed.startsWith('#')) {
        return <h1 key={idx} className="text-3xl font-bold text-slate-900 mt-10 mb-6">{trimmed.replace(/^#\s+/, '')}</h1>;
      }
      if (trimmed.startsWith('*') || trimmed.startsWith('-')) {
        return <li key={idx} className="ml-4 list-disc text-slate-600 mb-2">{trimmed.replace(/^[\*\-]\s+/, '')}</li>;
      }
      
      return <p key={idx} className="mb-4 text-slate-600 leading-relaxed">{trimmed}</p>;
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-10 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {page.status === 'draft' && isAdmin && (
          <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-xl mb-6 flex items-center gap-3">
            <AlertTriangle size={20} className="text-amber-500" />
            <span className="text-sm font-bold uppercase tracking-wide">Preview Mode: This page is currently a Draft and not visible to the public.</span>
          </div>
        )}
        
        <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-sm border border-slate-100">
           <div className="border-b border-slate-100 pb-8 mb-8">
             <h1 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-4">{page.title}</h1>
           </div>
           
           <div className="prose prose-slate max-w-none">
              {renderContent(page.content)}
           </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicPage;
