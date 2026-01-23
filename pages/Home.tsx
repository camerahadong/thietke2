import React from 'react';
import { ArrowRight, Calendar, Users, Trophy, MapPin, Shirt, Clock, ChevronRight, Zap, Target, Heart, TrendingUp, Crown, Star } from 'lucide-react';
import { BLOG_POSTS, USERS } from '../constants';

interface HomeProps {
  onJoin: () => void;
  onNavigate: (page: string, params?: any) => void;
}

const Home: React.FC<HomeProps> = ({ onJoin, onNavigate }) => {
  const topRunners = USERS.slice(0, 10);
  const podium = [topRunners[1], topRunners[0], topRunners[2]];
  const listRunners = topRunners.slice(3);

  return (
    <div className="font-sans w-full">
      
      {/* 1. HERO SECTION - Modern Asymmetric Design */}
      <div className="relative bg-white overflow-hidden min-h-[600px] lg:h-[85vh] flex items-center pt-20 lg:pt-0">
        {/* Background Graphic */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50 hidden lg:block" style={{ clipPath: 'polygon(20% 0%, 100% 0, 100% 100%, 0% 100%)' }}></div>
        <div className="absolute top-[-10%] right-[-5%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-teal-50 rounded-full blur-[100px] opacity-60 pointer-events-none"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-yellow-50 rounded-full blur-[80px] opacity-60 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Text Content */}
            <div className="space-y-6 md:space-y-8 animate-fade-in">
              <div className="inline-flex items-center space-x-2 bg-white border border-teal-100 shadow-sm px-4 py-1.5 rounded-full">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-teal-500"></span>
                </span>
                <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Hanoi, Vietnam • Est. 2020</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-display font-bold text-slate-900 leading-[1.1] tracking-tight">
                CHINH PHỤC <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-500">GIỚI HẠN</span> CỦA BẠN
              </h1>
              
              <p className="text-base md:text-lg text-slate-500 font-light max-w-lg leading-relaxed border-l-4 border-yellow-400 pl-6">
                Cộng đồng chạy bộ chuyên nghiệp. Kết nối đam mê, rèn luyện sức khỏe và cùng nhau vươn tới những kỷ lục mới.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <button onClick={onJoin} className="group relative px-8 py-4 bg-slate-900 rounded-2xl text-white font-bold shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative flex items-center justify-center">
                    Tham gia ngay <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
                
                <button onClick={() => onNavigate('about')} className="px-8 py-4 bg-white border border-slate-200 text-slate-700 font-bold rounded-2xl hover:border-teal-500 hover:text-teal-600 transition-colors shadow-sm hover:shadow-md">
                  Về chúng tôi
                </button>
              </div>

              {/* Mini Social Proof */}
              <div className="flex items-center space-x-4 pt-4">
                 <div className="flex -space-x-3">
                    {[1,2,3,4].map(i => (
                        <img key={i} className="w-10 h-10 rounded-full border-2 border-white shadow-sm" src={`https://i.pravatar.cc/100?img=${i+10}`} alt="user" />
                    ))}
                 </div>
                 <div className="text-sm">
                    <p className="font-bold text-slate-900">2,500+ Runners</p>
                    <p className="text-slate-500 text-xs">đã tham gia CLB</p>
                 </div>
              </div>
            </div>

            {/* Hero Image / Graphic */}
            <div className="relative lg:h-[600px] flex items-center justify-center mt-8 lg:mt-0 pb-10 lg:pb-0">
               {/* Fixed width/rotation for mobile to prevent overflow */}
               <div className="relative w-full aspect-[4/5] lg:aspect-auto lg:h-full rounded-[2.5rem] overflow-hidden shadow-2xl lg:rotate-2 hover:rotate-0 transition-transform duration-700 ease-out border-8 border-white">
                  <img 
                    src="https://images.unsplash.com/photo-1552674605-469523f9bc9d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" 
                    className="w-full h-full object-cover" 
                    alt="Runners" 
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
                  
                  {/* Floating Cards */}
                  <div className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-8 bg-white/90 backdrop-blur-md p-4 md:p-6 rounded-2xl shadow-lg border border-white/50">
                     <div className="flex justify-between items-end">
                        <div>
                           <p className="text-[10px] md:text-xs font-bold text-teal-600 uppercase tracking-wider mb-1">Sự kiện sắp tới</p>
                           <h3 className="text-sm md:text-lg font-bold text-slate-900">VnExpress Marathon Midnight</h3>
                        </div>
                        <div className="bg-slate-900 text-white px-2 py-1 md:px-3 rounded-lg text-[10px] md:text-xs font-bold whitespace-nowrap">
                           26 NOV
                        </div>
                     </div>
                  </div>
               </div>
            </div>

          </div>
        </div>
      </div>

      {/* 2. STATS SECTION - Floating Cards */}
      <div className="py-16 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {[
                { label: 'Thành viên', value: '2.5K+', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
                { label: 'Tổng Cự Ly', value: '150K', icon: MapPin, color: 'text-teal-600', bg: 'bg-teal-50' },
                { label: 'Giải thưởng', value: '45+', icon: Trophy, color: 'text-yellow-600', bg: 'bg-yellow-50' },
                { label: 'Năm hoạt động', value: '04', icon: Calendar, color: 'text-indigo-600', bg: 'bg-indigo-50' },
              ].map((stat, idx) => (
                <div key={idx} className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
                   <div className={`w-10 h-10 md:w-12 md:h-12 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <stat.icon size={20} className="md:w-6 md:h-6" />
                   </div>
                   <div className="text-2xl md:text-3xl font-display font-bold text-slate-900 mb-1">{stat.value}</div>
                   <div className="text-xs md:text-sm text-slate-500 font-medium uppercase tracking-wide">{stat.label}</div>
                </div>
              ))}
           </div>
        </div>
      </div>

      {/* 3. LEADERBOARD HIGHLIGHT - Clean & Premium */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16">
               <div>
                  <h2 className="text-teal-600 font-bold tracking-widest uppercase text-sm mb-2">Bảng vàng thành tích</h2>
                  <h3 className="text-3xl md:text-4xl font-display font-bold text-slate-900">TOP RUNNERS THÁNG 10</h3>
               </div>
               <button onClick={() => onNavigate('leaderboard')} className="hidden md:flex items-center text-slate-500 hover:text-teal-600 font-bold transition-colors">
                  Xem toàn bộ BXH <ArrowRight size={18} className="ml-2" />
               </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
               {/* Podium */}
               <div className="lg:col-span-7 flex items-end justify-center space-x-2 md:space-x-4 h-[350px] md:h-[400px]">
                  
                  {/* Rank 2 */}
                  <div className="w-1/3 flex flex-col justify-end group">
                     <div className="text-center mb-4 transition-transform group-hover:-translate-y-2">
                        <img src={podium[0].avatar} className="w-14 h-14 md:w-20 md:h-20 rounded-full border-4 border-slate-200 mx-auto shadow-md object-cover" loading="lazy" />
                        <div className="mt-2 font-bold text-slate-700 text-xs md:text-base truncate px-1">{podium[0].firstName}</div>
                        <div className="text-slate-400 text-[10px] md:text-xs font-bold">2nd Place</div>
                     </div>
                     <div className="h-32 md:h-40 bg-gradient-to-b from-slate-100 to-white rounded-t-2xl border-t-4 border-slate-300 relative shadow-inner flex flex-col items-center justify-start pt-4">
                        <div className="font-display font-bold text-xl md:text-2xl text-slate-400 opacity-30">02</div>
                        <div className="font-bold text-slate-800 text-sm md:text-lg mt-auto mb-4">{podium[0].totalDistance}km</div>
                     </div>
                  </div>

                  {/* Rank 1 */}
                  <div className="w-1/3 flex flex-col justify-end group z-10 -mt-8">
                     <div className="text-center mb-4 transition-transform group-hover:-translate-y-2 relative">
                        <div className="absolute -top-6 md:-top-8 left-1/2 -translate-x-1/2 text-yellow-500 animate-bounce-slow">
                           <Crown size={24} className="md:w-8 md:h-8" fill="url(#gold-gradient)" strokeWidth={0} />
                           <svg width="0" height="0">
                              <linearGradient id="gold-gradient" x1="100%" y1="100%" x2="0%" y2="0%">
                                 <stop stopColor="#eab308" offset="0%" />
                                 <stop stopColor="#f97316" offset="100%" />
                              </linearGradient>
                           </svg>
                        </div>
                        <img src={podium[1].avatar} className="w-16 h-16 md:w-24 md:h-24 rounded-full border-4 border-yellow-400 mx-auto shadow-xl object-cover ring-4 ring-yellow-400/20" loading="lazy" />
                        <div className="mt-2 font-bold text-slate-900 text-sm md:text-lg truncate px-1">{podium[1].firstName}</div>
                        <div className="text-yellow-600 text-[10px] md:text-xs font-bold uppercase tracking-wider">Champion</div>
                     </div>
                     <div className="h-44 md:h-56 bg-gradient-to-b from-yellow-50 to-white rounded-t-2xl border-t-4 border-yellow-400 relative shadow-xl flex flex-col items-center justify-start pt-4">
                        <div className="font-display font-bold text-2xl md:text-3xl text-yellow-500 opacity-30">01</div>
                        <div className="font-display font-bold text-slate-900 text-xl md:text-3xl mt-auto mb-2">{podium[1].totalDistance}</div>
                        <div className="text-slate-400 text-[10px] md:text-xs font-bold uppercase mb-6">Kilometers</div>
                     </div>
                  </div>

                  {/* Rank 3 */}
                  <div className="w-1/3 flex flex-col justify-end group">
                     <div className="text-center mb-4 transition-transform group-hover:-translate-y-2">
                        <img src={podium[2].avatar} className="w-14 h-14 md:w-20 md:h-20 rounded-full border-4 border-orange-200 mx-auto shadow-md object-cover" loading="lazy" />
                        <div className="mt-2 font-bold text-slate-700 text-xs md:text-base truncate px-1">{podium[2].firstName}</div>
                        <div className="text-orange-400 text-[10px] md:text-xs font-bold">3rd Place</div>
                     </div>
                     <div className="h-24 md:h-32 bg-gradient-to-b from-orange-50 to-white rounded-t-2xl border-t-4 border-orange-300 relative shadow-inner flex flex-col items-center justify-start pt-4">
                        <div className="font-display font-bold text-xl md:text-2xl text-orange-300 opacity-30">03</div>
                        <div className="font-bold text-slate-800 text-sm md:text-lg mt-auto mb-4">{podium[2].totalDistance}km</div>
                     </div>
                  </div>
               </div>

               {/* Top List (Rest) */}
               <div className="lg:col-span-5 flex flex-col justify-center">
                  <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                     <h4 className="font-bold text-slate-500 text-xs uppercase tracking-wider mb-4">Runner-ups</h4>
                     <div className="space-y-4">
                        {listRunners.slice(0, 5).map((runner, idx) => (
                           <div key={runner.id} className="flex items-center justify-between group cursor-pointer" onClick={() => onNavigate('leaderboard')}>
                              <div className="flex items-center space-x-3">
                                 <span className="w-6 text-slate-400 font-bold text-sm">0{idx + 4}</span>
                                 <img src={runner.avatar} className="w-10 h-10 rounded-full border border-white shadow-sm" loading="lazy" />
                                 <span className="font-bold text-slate-700 group-hover:text-teal-600 transition-colors">{runner.firstName} {runner.lastName}</span>
                              </div>
                              <div className="font-bold text-slate-900">{runner.totalDistance} <span className="text-slate-400 text-xs font-normal">km</span></div>
                           </div>
                        ))}
                     </div>
                  </div>
                  <button onClick={() => onNavigate('leaderboard')} className="md:hidden w-full mt-4 py-3 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl text-sm">
                     Xem toàn bộ BXH
                  </button>
               </div>
            </div>
        </div>
      </section>

      {/* 4. CLUB IDENTITY - Specific Color Section */}
      <section className="bg-slate-900 py-24 relative overflow-hidden">
         {/* Decorative jersey pattern in background */}
         <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#14b8a6 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
         
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
               <div>
                  <div className="flex items-center space-x-2 text-teal-400 font-bold text-sm uppercase tracking-widest mb-4">
                     <Shirt size={18} />
                     <span>Official Kit 2024</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 leading-tight">
                     MÀU XANH CỦA <br/> 
                     <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">CHIẾN BINH</span>
                  </h2>
                  <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                     Lấy cảm hứng từ sự bền bỉ của rừng già và tốc độ của gió. Màu áo Teal của VN RunClub không chỉ là đồng phục, đó là niềm tự hào khi chúng ta cùng nhau chinh phục các cung đường.
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                     <div className="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                        <Target className="text-yellow-400 mb-3" size={28} />
                        <h4 className="text-white font-bold mb-1">Kỷ Luật</h4>
                        <p className="text-slate-400 text-sm">Sự nhất quán tạo nên kết quả phi thường.</p>
                     </div>
                     <div className="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                        <Heart className="text-pink-500 mb-3" size={28} />
                        <h4 className="text-white font-bold mb-1">Đồng Đội</h4>
                        <p className="text-slate-400 text-sm">Không ai bị bỏ lại phía sau.</p>
                     </div>
                  </div>
               </div>
               
               <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-teal-500 to-emerald-600 rounded-[2rem] opacity-30 blur-2xl"></div>
                  <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border-4 border-slate-800">
                     <img 
                       src="https://images.unsplash.com/photo-1530143311094-34d807799e8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80" 
                       alt="Club Jersey" 
                       loading="lazy"
                       className="w-full h-auto transform hover:scale-105 transition-transform duration-700" 
                     />
                     <div className="absolute bottom-6 left-6 bg-slate-900/80 backdrop-blur-md px-4 py-2 rounded-lg border border-slate-700">
                        <span className="text-teal-400 font-bold text-xs uppercase">Limited Edition</span>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 5. NEWS GRID - Card Design */}
      <section className="py-24 bg-gray-50">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-end mb-12">
               <div>
                  <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900">BẢN TIN RUNCLUB</h2>
                  <p className="text-slate-500 mt-2">Cập nhật kiến thức và sự kiện mới nhất</p>
               </div>
               <button onClick={() => onNavigate('blog')} className="text-teal-700 font-bold hover:underline hidden md:block">Xem tất cả tin tức</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {BLOG_POSTS.slice(0, 3).map((post) => (
                  <div key={post.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col h-full border border-gray-100" onClick={() => onNavigate('blog-detail', { id: post.id })}>
                     <div className="relative h-56 overflow-hidden">
                        <img src={post.imageUrl} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" alt={post.title} loading="lazy" />
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur rounded-lg px-3 py-1 text-xs font-bold text-slate-800 shadow-sm uppercase tracking-wider">
                           {post.category}
                        </div>
                     </div>
                     <div className="p-6 flex-1 flex flex-col">
                        <div className="text-xs text-slate-400 font-medium mb-3 flex items-center">
                           <Calendar size={12} className="mr-1" /> {post.date}
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-teal-700 transition-colors leading-snug">{post.title}</h3>
                        <p className="text-slate-500 text-sm line-clamp-2 mb-4 flex-1">{post.excerpt}</p>
                        <div className="flex items-center text-teal-600 font-bold text-sm mt-auto">
                           Đọc tiếp <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* 6. CTA - Gradient Background */}
      <section className="relative py-24 overflow-hidden">
         <div className="absolute inset-0 bg-gradient-to-br from-teal-900 via-slate-900 to-slate-900"></div>
         {/* Abstract glow */}
         <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-teal-500 rounded-full blur-[120px] opacity-20"></div>
         
         <div className="relative max-w-4xl mx-auto px-4 text-center z-10">
            <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 tracking-tight">ĐỪNG CHẠY MỘT MÌNH</h2>
            <p className="text-xl text-teal-100 mb-10 font-light max-w-2xl mx-auto">
               Gia nhập VN RunClub ngay hôm nay để kết nối với hàng nghìn runners, chia sẻ đam mê và bứt phá giới hạn.
            </p>
            <button onClick={onJoin} className="px-10 py-5 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold rounded-2xl text-lg shadow-[0_0_30px_rgba(234,179,8,0.4)] hover:shadow-[0_0_50px_rgba(234,179,8,0.6)] transition-all transform hover:-translate-y-1">
               Đăng Ký Thành Viên (Miễn Phí)
            </button>
         </div>
      </section>

    </div>
  );
};

export default Home;