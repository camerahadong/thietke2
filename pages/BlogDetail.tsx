import React from 'react';
import { BlogPost } from '../types';
import { User, Calendar, Clock, Facebook, Twitter, Link } from 'lucide-react';

interface BlogDetailProps {
  post: BlogPost;
  onNavigate: (page: string) => void;
}

const BlogDetail: React.FC<BlogDetailProps> = ({ post, onNavigate }) => {
  return (
    <div className="animate-fade-in bg-white w-full">
        {/* Article Header */}
        <div className="bg-slate-900 text-white py-20 relative overflow-hidden">
            <div className="absolute inset-0">
                <img src={post.imageUrl} className="w-full h-full object-cover opacity-20" alt={post.title} />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
            </div>
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                <span className="inline-block px-3 py-1 bg-orange-600 text-white text-xs font-bold uppercase tracking-wider rounded-md mb-6">{post.category}</span>
                <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">{post.title}</h1>
                <div className="flex items-center justify-center space-x-6 text-slate-300 text-sm">
                    <div className="flex items-center"><User className="w-4 h-4 mr-2" /> {post.author}</div>
                    <div className="flex items-center"><Calendar className="w-4 h-4 mr-2" /> {post.date}</div>
                    <div className="flex items-center"><Clock className="w-4 h-4 mr-2" /> 5 phút đọc</div>
                </div>
            </div>
        </div>

        {/* Article Body (Mock Content) */}
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="prose prose-lg max-w-none text-slate-700 leading-relaxed">
                <p className="lead text-xl text-slate-600 font-medium italic border-l-4 border-orange-500 pl-4 mb-8">
                    {post.excerpt}
                </p>

                <p className="mb-6">Chinh phục cự ly 10K với một thành tích tốt (PR - Personal Record) là mục tiêu của rất nhiều runner phong trào. Tuy nhiên, chỉ chạy dài (Long Run) là chưa đủ. Để cải thiện tốc độ, bạn cần những bài tập chuyên biệt.</p>

                <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4 font-display">1. Bài tập Interval (Biến tốc)</h2>
                <p className="mb-4">Interval là phương pháp chạy xen kẽ giữa các đoạn chạy nhanh ở cường độ cao và các đoạn chạy chậm phục hồi. Ví dụ:</p>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li>Khởi động 15 phút chạy nhẹ.</li>
                    <li>Chạy 800m ở pace 5K (rất mệt).</li>
                    <li>Nghỉ đi bộ hoặc chạy chậm 400m.</li>
                    <li>Lặp lại 6-8 lần.</li>
                    <li>Chạy thả lỏng 10 phút.</li>
                </ul>

                <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4 font-display">2. Bài tập Tempo Run</h2>
                <p className="mb-6">Tempo run giúp cơ thể bạn làm quen với việc xử lý axit lactic, từ đó duy trì tốc độ cao lâu hơn mà không bị mỏi cơ. Pace Tempo thường chậm hơn pace thi đấu 10K khoảng 10-15 giây/km.</p>

                <figure className="my-8">
                    <img src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=80" alt="Gym training" className="rounded-xl shadow-lg w-full mb-2" />
                    <figcaption className="text-center text-sm text-slate-500 italic">Tập bổ trợ là chìa khóa cho đôi chân bền bỉ.</figcaption>
                </figure>

                <hr className="my-12 border-gray-200" />
                
                <div className="flex items-center justify-between">
                    <div className="font-bold text-slate-900">Chia sẻ bài viết:</div>
                    <div className="flex space-x-2">
                        <button className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700"><Facebook className="w-4 h-4" /></button>
                        <button className="p-2 bg-sky-500 text-white rounded hover:bg-sky-600"><Twitter className="w-4 h-4" /></button>
                        <button className="p-2 bg-slate-800 text-white rounded hover:bg-slate-900"><Link className="w-4 h-4" /></button>
                    </div>
                </div>
            </div>
            
            <div className="mt-12 text-center">
                <button onClick={() => onNavigate('blog')} className="text-orange-600 font-bold hover:underline">← Quay lại danh sách Blog</button>
            </div>
        </article>
    </div>
  );
};

export default BlogDetail;