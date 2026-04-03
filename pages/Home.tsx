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
      
      {/* 1. HERO SECTION - Athletic Brutalist */}
      <div className="relative bg-white overflow-hidden min-h-[600px] lg:h-[85vh] flex items-center pt-20 lg:pt-0 border-b-4 border-zinc-950">
        {/* Background Graphic */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#ccff00] hidden lg:block border-l-4 border-zinc-950 skew-container translate-x-12"></div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-grid opacity-20 hidden lg:block skew-container translate-x-12 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Text Content */}
            <div className="lg:col-span-7 space-y-6 md:space-y-8 animate-fade-in">
              <div className="inline-flex items-center space-x-2 bg-zinc-950 text-white px-4 py-1.5 skew-container">
                <span className="relative flex h-2.5 w-2.5 skew-content">
                  <span className="animate-ping absolute inline-flex h-full w-full bg-[#ccff00] opacity-75"></span>
                  <span className="relative inline-flex h-2.5 w-2.5 bg-[#ccff00]"></span>
                </span>
                <span className="text-xs font-bold uppercase tracking-widest skew-content">Hanoi, Vietnam • Est. 2020</span>
              </div>
              
              <h1 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-display font-bold text-zinc-950 leading-[0.9] tracking-tight uppercase">
                Chinh phục <br/>
                <span className="text-[#ff4600] inline-block skew-container"><span className="skew-content inline-block">giới hạn</span></span>
              </h1>
              
              <p className="text-base md:text-xl text-zinc-600 font-medium max-w-lg leading-relaxed border-l-4 border-[#ff4600] pl-4">
                Cộng đồng chạy bộ chuyên nghiệp. Kết nối đam mê, rèn luyện sức khỏe và cùng nhau vươn tới những kỷ lục mới.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button onClick={onJoin} className="group relative px-8 py-4 bg-[#ff4600] text-white font-display text-xl uppercase tracking-wider athletic-border athletic-shadow-hover skew-container transition-all">
                  <div className="skew-content flex items-center justify-center">
                    Tham gia ngay <ArrowRight size={24} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
                
                <button onClick={() => onNavigate('about')} className="px-8 py-4 bg-white text-zinc-950 font-display text-xl uppercase tracking-wider athletic-border athletic-shadow-hover skew-container transition-all hover:bg-zinc-100">
                  <div className="skew-content">Về chúng tôi</div>
                </button>
              </div>

              {/* Mini Social Proof */}
              <div className="flex items-center space-x-4 pt-6">
                 <div className="flex -space-x-3">
                    {[1,2,3,4].map(i => (
                        <img key={i} className="w-12 h-12 border-2 border-zinc-950 object-cover grayscale hover:grayscale-0 transition-all" src={`https://i.pravatar.cc/100?img=${i+10}`} alt="user" />
                    ))}
                 </div>
                 <div className="text-sm">
                    <p className="font-display font-bold text-zinc-950 text-2xl leading-none">2,500+</p>
                    <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider">Runners đã tham gia</p>
                 </div>
              </div>
            </div>

            {/* Hero Image / Graphic */}
            <div className="lg:col-span-5 relative lg:h-[650px] flex items-center justify-center mt-8 lg:mt-0 pb-10 lg:pb-0">
               <div className="relative w-full aspect-[3/4] lg:aspect-auto lg:h-full athletic-border athletic-shadow overflow-hidden skew-container bg-zinc-950">
                  <img 
                    src="https://images.unsplash.com/photo-1552674605-469523f9bc9d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" 
                    className="w-full h-full object-cover skew-content scale-125 opacity-90 hover:opacity-100 transition-opacity" 
                    alt="Runners" 
                    loading="eager"
                  />
                  
                  {/* Floating Cards */}
                  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[90%] bg-white p-4 athletic-border skew-content">
                     <p className="text-[10px] font-bold text-[#ff4600] uppercase tracking-widest mb-1">Sự kiện sắp tới</p>
                     <h3 className="text-lg font-display font-bold text-zinc-950 mb-2 uppercase">VnExpress Marathon Midnight</h3>
                     <div className="inline-block bg-[#ccff00] text-zinc-950 px-3 py-1 text-xs font-bold tracking-wider border-2 border-zinc-950">
                        26 NOV 2024
                     </div>
                  </div>
               </div>
            </div>

          </div>
        </div>
      </div>

      {/* 2. STATS SECTION - Ticker Style */}
      <div className="py-12 bg-zinc-950 border-b-4 border-[#ccff00] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 divide-x-4 divide-zinc-800">
              {[
                { label: 'Thành viên', value: '2.5K+', icon: Users },
                { label: 'Tổng Cự Ly', value: '150K', icon: MapPin },
                { label: 'Giải thưởng', value: '45+', icon: Trophy },
                { label: 'Năm hoạt động', value: '04', icon: Calendar },
              ].map((stat, idx) => (
                <div key={idx} className={`flex flex-col items-center text-center ${idx % 2 !== 0 ? 'pl-4' : ''} group`}>
                   <div className="text-5xl md:text-6xl font-display font-bold text-[#ccff00] mb-2 group-hover:scale-110 transition-transform">{stat.value}</div>
                   <div className="flex items-center space-x-2 text-white">
                      <stat.icon size={16} className="text-[#ff4600]" />
                      <span className="text-sm font-bold uppercase tracking-widest">{stat.label}</span>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </div>

      {/* 3. LEADERBOARD HIGHLIGHT - Track Style */}
      <section className="py-24 bg-white relative border-b-4 border-zinc-950 overflow-hidden">
        <div className="absolute inset-0 track-lines opacity-20 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b-4 border-zinc-950 pb-6">
               <div>
                  <h2 className="text-[#ff4600] font-bold tracking-widest uppercase text-sm mb-2">Bảng vàng thành tích</h2>
                  <h3 className="text-5xl md:text-6xl font-display font-bold text-zinc-950 uppercase">TOP RUNNERS THÁNG 10</h3>
               </div>
               <button onClick={() => onNavigate('leaderboard')} className="hidden md:flex items-center text-zinc-950 hover:text-[#ff4600] font-display text-xl uppercase transition-colors">
                  Xem toàn bộ BXH <ArrowRight size={24} className="ml-2" />
               </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
               {/* Podium */}
               <div className="lg:col-span-7 flex items-end justify-center space-x-4 h-[450px]">
                  
                  {/* Rank 2 */}
                  <div className="w-1/3 flex flex-col justify-end group">
                     <div className="text-center mb-4 transition-transform group-hover:-translate-y-2">
                        <img src={podium[0].avatar} className="w-20 h-20 rounded-none athletic-border mx-auto object-cover grayscale group-hover:grayscale-0 transition-all" loading="lazy" />
                        <div className="mt-3 font-display font-bold text-zinc-950 text-xl truncate px-1 uppercase">{podium[0].firstName}</div>
                     </div>
                     <div className="h-48 bg-zinc-100 athletic-border border-b-0 relative flex flex-col items-center justify-start pt-6 skew-container">
                        <div className="skew-content flex flex-col items-center w-full">
                            <div className="font-display font-bold text-5xl text-zinc-300">02</div>
                            <div className="font-display font-bold text-zinc-950 text-2xl mt-auto mb-6">{podium[0].totalDistance}km</div>
                        </div>
                     </div>
                  </div>

                  {/* Rank 1 */}
                  <div className="w-1/3 flex flex-col justify-end group z-10 -mt-8">
                     <div className="text-center mb-4 transition-transform group-hover:-translate-y-2 relative">
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-[#ff4600]">
                           <Crown size={40} fill="currentColor" strokeWidth={0} />
                        </div>
                        <img src={podium[1].avatar} className="w-28 h-28 rounded-none athletic-border mx-auto object-cover grayscale group-hover:grayscale-0 transition-all" loading="lazy" />
                        <div className="mt-3 font-display font-bold text-zinc-950 text-2xl truncate px-1 uppercase">{podium[1].firstName}</div>
                     </div>
                     <div className="h-64 bg-[#ccff00] athletic-border border-b-0 relative flex flex-col items-center justify-start pt-6 skew-container">
                        <div className="skew-content flex flex-col items-center w-full">
                            <div className="font-display font-bold text-6xl text-zinc-950">01</div>
                            <div className="font-display font-bold text-zinc-950 text-4xl mt-auto mb-2">{podium[1].totalDistance}</div>
                            <div className="text-zinc-950 text-xs font-bold uppercase tracking-widest mb-8">Kilometers</div>
                        </div>
                     </div>
                  </div>

                  {/* Rank 3 */}
                  <div className="w-1/3 flex flex-col justify-end group">
                     <div className="text-center mb-4 transition-transform group-hover:-translate-y-2">
                        <img src={podium[2].avatar} className="w-20 h-20 rounded-none athletic-border mx-auto object-cover grayscale group-hover:grayscale-0 transition-all" loading="lazy" />
                        <div className="mt-3 font-display font-bold text-zinc-950 text-xl truncate px-1 uppercase">{podium[2].firstName}</div>
                     </div>
                     <div className="h-36 bg-zinc-100 athletic-border border-b-0 relative flex flex-col items-center justify-start pt-6 skew-container">
                        <div className="skew-content flex flex-col items-center w-full">
                            <div className="font-display font-bold text-5xl text-zinc-300">03</div>
                            <div className="font-display font-bold text-zinc-950 text-2xl mt-auto mb-6">{podium[2].totalDistance}km</div>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Top List (Rest) */}
               <div className="lg:col-span-5 flex flex-col justify-center">
                  <div className="bg-zinc-950 athletic-border p-8 athletic-shadow">
                     <h4 className="font-display font-bold text-[#ccff00] text-2xl mb-6 border-b-2 border-zinc-800 pb-4 uppercase">Runner-ups</h4>
                     <div className="space-y-4">
                        {listRunners.slice(0, 5).map((runner, idx) => (
                           <div key={runner.id} className="flex items-center justify-between group cursor-pointer bg-zinc-900 p-3 athletic-border hover:bg-[#ff4600] transition-colors skew-container" onClick={() => onNavigate('leaderboard')}>
                              <div className="skew-content flex items-center space-x-4">
                                 <span className="w-8 text-zinc-500 font-display font-bold text-xl group-hover:text-white">0{idx + 4}</span>
                                 <img src={runner.avatar} className="w-10 h-10 rounded-none border-2 border-zinc-950 object-cover grayscale group-hover:grayscale-0" loading="lazy" />
                                 <span className="font-bold text-white uppercase tracking-wide">{runner.firstName} {runner.lastName}</span>
                              </div>
                              <div className="skew-content font-display font-bold text-2xl text-[#ccff00] group-hover:text-zinc-950">{runner.totalDistance} <span className="text-sm font-sans">km</span></div>
                           </div>
                        ))}
                     </div>
                  </div>
                  <button onClick={() => onNavigate('leaderboard')} className="md:hidden w-full mt-8 py-4 bg-zinc-950 text-white font-display text-xl uppercase athletic-border skew-container">
                     <div className="skew-content">Xem toàn bộ BXH</div>
                  </button>
               </div>
            </div>
        </div>
      </section>

      {/* 4. CLUB IDENTITY - Gritty Athletic */}
      <section className="bg-zinc-950 py-24 relative overflow-hidden border-b-4 border-[#ccff00]">
         <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none"></div>
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
               <div className="order-2 lg:order-1 relative">
                  <div className="absolute inset-0 bg-[#ff4600] translate-x-4 translate-y-4 athletic-border skew-container"></div>
                  <div className="relative athletic-border overflow-hidden aspect-square max-w-md mx-auto skew-container bg-zinc-900">
                     <img 
                       src="https://images.unsplash.com/photo-1530143311094-34d807799e8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80" 
                       alt="Club Jersey" 
                       loading="lazy"
                       className="w-full h-full object-cover skew-content scale-125 grayscale hover:grayscale-0 transition-all duration-500 opacity-80 hover:opacity-100" 
                     />
                  </div>
               </div>

               <div className="order-1 lg:order-2">
                  <div className="inline-flex items-center space-x-2 bg-[#ccff00] text-zinc-950 px-3 py-1 font-bold text-sm uppercase tracking-widest mb-6 skew-container athletic-border">
                     <div className="skew-content flex items-center space-x-2">
                        <Shirt size={16} />
                        <span>Official Kit 2024</span>
                     </div>
                  </div>
                  <h2 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 leading-[0.9] uppercase">
                     MÀU CỦA <br/> 
                     <span className="text-[#ff4600]">ĐAM MÊ</span>
                  </h2>
                  <p className="text-zinc-400 text-lg mb-10 leading-relaxed font-medium border-l-4 border-[#ccff00] pl-4">
                     Lấy cảm hứng từ ánh mặt trời lúc bình minh. Màu áo Cam của VN RunClub không chỉ là đồng phục, đó là niềm tự hào khi chúng ta cùng nhau chinh phục các cung đường.
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                     <div className="bg-zinc-900 p-6 athletic-border skew-container hover:bg-[#ff4600] group transition-colors">
                        <div className="skew-content">
                            <Target className="text-[#ccff00] mb-4 group-hover:text-zinc-950" size={32} strokeWidth={2} />
                            <h4 className="text-white font-display text-2xl mb-2 uppercase group-hover:text-zinc-950">Kỷ Luật</h4>
                            <p className="text-zinc-500 text-sm font-bold group-hover:text-zinc-900">Sự nhất quán tạo nên kết quả phi thường.</p>
                        </div>
                     </div>
                     <div className="bg-zinc-900 p-6 athletic-border skew-container hover:bg-[#ccff00] group transition-colors">
                        <div className="skew-content">
                            <Heart className="text-[#ff4600] mb-4 group-hover:text-zinc-950" size={32} strokeWidth={2} />
                            <h4 className="text-white font-display text-2xl mb-2 uppercase group-hover:text-zinc-950">Đồng Đội</h4>
                            <p className="text-zinc-500 text-sm font-bold group-hover:text-zinc-900">Không ai bị bỏ lại phía sau.</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 5. NEWS GRID - Brutalist Cards */}
      <section className="py-24 bg-white border-b-4 border-zinc-950">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-end mb-16 border-b-4 border-zinc-950 pb-6">
               <div>
                  <h2 className="text-5xl md:text-6xl font-display font-bold text-zinc-950 uppercase">BẢN TIN RUNCLUB</h2>
                  <p className="text-zinc-500 mt-2 font-bold text-lg uppercase tracking-wider">Cập nhật kiến thức và sự kiện</p>
               </div>
               <button onClick={() => onNavigate('blog')} className="text-zinc-950 font-display text-xl uppercase hover:text-[#ff4600] hidden md:flex items-center transition-colors">
                  Xem tất cả <ArrowRight size={24} className="ml-2" />
               </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
               {BLOG_POSTS.slice(0, 3).map((post) => (
                  <div key={post.id} className="group cursor-pointer flex flex-col h-full bg-white athletic-border athletic-shadow-hover transition-all" onClick={() => onNavigate('blog-detail', { id: post.id })}>
                     <div className="relative aspect-[4/3] overflow-hidden border-b-4 border-zinc-950 bg-zinc-100">
                        <img src={post.imageUrl} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" alt={post.title} loading="lazy" />
                        <div className="absolute top-4 left-4 bg-[#ccff00] px-3 py-1 text-xs font-bold text-zinc-950 uppercase tracking-widest athletic-border skew-container">
                           <span className="skew-content block">{post.category}</span>
                        </div>
                     </div>
                     <div className="flex flex-col flex-1 p-6">
                        <div className="text-xs text-zinc-500 font-bold mb-3 uppercase tracking-wider flex items-center">
                           <Calendar size={14} className="mr-2 text-[#ff4600]" /> {post.date}
                        </div>
                        <h3 className="text-2xl font-display font-bold text-zinc-950 mb-3 group-hover:text-[#ff4600] transition-colors leading-tight uppercase">{post.title}</h3>
                        <p className="text-zinc-600 text-sm line-clamp-2 mb-6 flex-1 font-medium">{post.excerpt}</p>
                        <div className="mt-auto inline-flex items-center text-zinc-950 font-display text-lg uppercase group-hover:text-[#ff4600] transition-colors">
                            Đọc tiếp <ArrowRight size={18} className="ml-2 group-hover:translate-x-2 transition-transform" />
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* 6. CTA - High Energy */}
      <section className="py-32 bg-[#ff4600] relative overflow-hidden">
         <div className="absolute inset-0 track-lines opacity-20 pointer-events-none transform skew-y-6 scale-150"></div>
         <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <h2 className="text-6xl md:text-8xl font-display font-bold text-zinc-950 mb-6 tracking-tight uppercase leading-none">
               Đừng chạy <br/><span className="text-white">một mình</span>
            </h2>
            <p className="text-xl text-zinc-950 mb-10 font-bold max-w-2xl mx-auto uppercase tracking-wide">
               Gia nhập VN RunClub ngay hôm nay để kết nối với hàng nghìn runners, chia sẻ đam mê và bứt phá giới hạn.
            </p>
            <button onClick={onJoin} className="px-12 py-6 bg-zinc-950 text-[#ccff00] font-display text-2xl uppercase tracking-widest athletic-border athletic-shadow-hover skew-container hover:bg-white hover:text-zinc-950 transition-all">
               <div className="skew-content">Đăng Ký Thành Viên</div>
            </button>
         </div>
      </section>

    </div>
  );
};

export default Home;