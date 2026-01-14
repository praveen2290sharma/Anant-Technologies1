import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useContent } from '../context/ContentContext';
import { ArrowLeft, Calendar, User } from 'lucide-react';

const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { blogPosts } = useContent();
  const post = blogPosts.find(p => p.id === id);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 pt-20">
        <h1 className="text-2xl font-bold text-slate-900 mb-4">Post not found</h1>
        <Link to="/blog" className="text-primary font-bold hover:underline flex items-center gap-2">
          <ArrowLeft size={20} /> Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-10 pb-20">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/blog" className="inline-flex items-center text-slate-500 hover:text-primary transition-colors mb-8 font-medium">
          <ArrowLeft size={20} className="mr-2" /> Back to Insights
        </Link>
        
        <div className="aspect-video rounded-3xl overflow-hidden mb-10 bg-slate-100 shadow-lg">
           <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
        </div>

        <div className="flex items-center gap-6 text-sm text-slate-500 mb-6 font-medium uppercase tracking-wider">
          <span className="flex items-center gap-2"><Calendar size={16} /> {post.date}</span>
          <span className="flex items-center gap-2"><User size={16} /> {post.author}</span>
        </div>

        <h1 className="text-3xl lg:text-5xl font-extrabold text-slate-900 mb-8 leading-tight">{post.title}</h1>
        
        <div className="prose prose-lg prose-slate max-w-none text-slate-600 leading-relaxed">
          {post.content ? (
            post.content.split('\n').map((paragraph, idx) => (
               <p key={idx} className="mb-6">{paragraph}</p>
            ))
          ) : (
            <p>No content available.</p>
          )}
        </div>

        <div className="mt-12 pt-8 border-t border-slate-100">
           <h3 className="text-lg font-bold text-slate-900 mb-4">Share this article</h3>
           <div className="flex gap-4">
              <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 font-medium transition-colors">Twitter</button>
              <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 font-medium transition-colors">LinkedIn</button>
              <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 font-medium transition-colors">Facebook</button>
           </div>
        </div>
      </article>
    </div>
  );
};

export default BlogDetail;
