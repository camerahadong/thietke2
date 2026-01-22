import React, { useState } from 'react';
import { BLOG_POSTS } from '../constants';
import { Search, ArrowUpRight } from 'lucide-react';

interface BlogProps {
  onNavigate: (page: string, params?: any) => void;
}

const Blog: React.FC<BlogProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = ['All', ...Array.from(new Set(BLOG_POSTS.map(p => p.category)))];
  
  const filteredPosts = selectedCategory === 'All' 
    ? BLOG_POSTS 
    : BLOG_POSTS.filter(p => p.category === selectedCategory);

  return (
    <div className="bg-white min-h-screen font-sans">
      {/* Minimal Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-b border-gray-100">
         <h1 className="text-6xl md:text-8xl font-display font-bold text-slate-900 mb-8 tracking-tighter">
            THE <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-500">JOURNAL</span>.
         </h1>
         <div className="flex flex-col md:flex-row justify-between items-end gap-6">
            <p className="text-xl text-slate-500 max-w-xl leading-relaxed">
               Những câu chuyện về chạy bộ, lời khuyên từ chuyên gia và cảm hứng bất tận từ cộng đồng VN RunClub.
            </p>
            
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
               {categories.map(cat => (
                  <button 
                     key={cat}
                     onClick={() => setSelectedCategory(cat)}
                     className={`px-4 py-2 rounded-full text-sm font-bold border transition-all ${selectedCategory === cat ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-500 border-gray-200 hover:border-slate-400'}`}
                  >
                     {cat}
                  </button>
               ))}
            </div>
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
         {/* Masonry-ish Grid */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {filteredPosts.map((post, idx) => {
               // First item is huge
               if (idx === 0) {
                  return (
                     <div key={post.id} className="md:col-span-2 lg:col-span-3 group cursor-pointer mb-8" onClick={() => onNavigate('blog-detail', { id: post.id })}>
                        <div className="relative h-[500px] rounded-[2rem] overflow-hidden mb-6">
                           <img src={post.imageUrl} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Cover" />
                           <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                        </div>
                        <div className="max-w-4xl">
                           <div className="flex items-center space-x-3 mb-3 text-sm font-bold uppercase tracking-wider">
                              <span className="text-teal-600">{post.category}</span>
                              <span className="text-slate-300">•</span>
                              <span className="text-slate-500">{post.date}</span>
                           </div>
                           <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-4 group-hover:text-teal-700 transition-colors leading-tight">{post.title}</h2>
                           <p className="text-xl text-slate-500 line-clamp-2 leading-relaxed">{post.excerpt}</p>
                        </div>
                     </div>
                  )
               }
               
               // Standard items
               return (
                  <div key={post.id} className="group cursor-pointer flex flex-col" onClick={() => onNavigate('blog-detail', { id: post.id })}>
                     <div className="relative h-64 rounded-2xl overflow-hidden mb-5">
                        <img src={post.imageUrl} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Thumb" />
                        <div className="absolute top-4 right-4 bg-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                           <ArrowUpRight size={20} />
                        </div>
                     </div>
                     <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-3 text-xs font-bold uppercase tracking-wider">
                           <span className="text-teal-600">{post.category}</span>
                           <span className="text-slate-300">•</span>
                           <span className="text-slate-400">{post.date}</span>
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-3 leading-snug group-hover:text-teal-700 transition-colors">{post.title}</h3>
                        <p className="text-slate-500 text-sm line-clamp-3 leading-relaxed">{post.excerpt}</p>
                     </div>
                  </div>
               )
            })}
         </div>
      </div>
    </div>
  );
};

export default Blog;