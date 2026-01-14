import React from 'react';
import { useContent } from '../context/ContentContext';
import { Calendar, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const Blog: React.FC = () => {
  const { blogPosts } = useContent();

  return (
    <div className="min-h-screen bg-slate-50 pt-10 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 pt-10">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-6">Insights & News</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Latest trends in digital marketing, SEO strategies, and technology updates.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article key={post.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <Link to={`/blog/${post.id}`} className="block h-48 bg-slate-200 bg-cover bg-center" style={{ backgroundImage: `url(${post.imageUrl})` }}>
                <span className="sr-only">Read {post.title}</span>
              </Link>
              <div className="p-6">
                <div className="flex items-center gap-4 text-xs text-slate-500 mb-3 font-medium uppercase tracking-wider">
                  <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
                  <span className="flex items-center gap-1"><User size={12} /> {post.author}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2 hover:text-primary transition-colors">
                  <Link to={`/blog/${post.id}`}>{post.title}</Link>
                </h3>
                <p className="text-slate-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
                <Link to={`/blog/${post.id}`} className="text-primary font-bold text-sm hover:underline decoration-2 underline-offset-4">Read Article</Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
