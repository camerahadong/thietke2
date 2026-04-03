import React, { useState, useEffect } from 'react';
import { Menu, X, Home, Trophy, Calendar, User as UserIcon, LogIn, Activity, BookOpen, Image as ImageIcon, Info, Mail, Target, ArrowRight } from 'lucide-react';
import { User } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
  user: User | null;
  onLogin: () => void;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentPage, onNavigate, user, onLogin, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMobileMenuOpen]);

  const NavItem = ({ page, icon: Icon, label }: { page: string; icon: any; label: string }) => (
    <button
      onClick={() => {
        onNavigate(page);
        setIsMobileMenuOpen(false);
      }}
      className={`flex items-center space-x-2 px-4 py-2 transition-all duration-300 font-display text-lg uppercase tracking-wider ${
        currentPage === page
          ? 'text-white bg-zinc-950 skew-container'
          : 'text-zinc-500 hover:text-zinc-950 hover:bg-zinc-100 skew-container'
      }`}
    >
      <div className="skew-content flex items-center space-x-2">
        <Icon size={18} className={currentPage === page ? 'text-[#ccff00]' : 'text-zinc-400'} />
        <span>{label}</span>
      </div>
    </button>
  );

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans text-zinc-950 selection:bg-[#ccff00] selection:text-zinc-950">
      
      {/* Top Marquee */}
      <div className="bg-[#ff4600] text-white py-1 overflow-hidden border-b-4 border-zinc-950">
        <div className="marquee-track font-display text-sm tracking-widest uppercase">
          <span className="mx-4">🔥 NEXT RUN: SUNDAY 5AM • 15KM • HOAN KIEM LAKE</span>
          <span className="mx-4">🔥 NEW MERCH DROP: 15.11.2024</span>
          <span className="mx-4">🔥 JOIN THE 100KM CHALLENGE THIS MONTH</span>
          <span className="mx-4">🔥 NEXT RUN: SUNDAY 5AM • 15KM • HOAN KIEM LAKE</span>
          <span className="mx-4">🔥 NEW MERCH DROP: 15.11.2024</span>
          <span className="mx-4">🔥 JOIN THE 100KM CHALLENGE THIS MONTH</span>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b-4 border-zinc-950 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div 
              className="flex items-center space-x-3 cursor-pointer group" 
              onClick={() => onNavigate('home')}
            >
              <div className="w-12 h-12 bg-[#ccff00] athletic-border flex items-center justify-center skew-container group-hover:bg-[#ff4600] transition-colors">
                <Activity className="text-zinc-950 skew-content" size={28} strokeWidth={3} />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-3xl font-display font-bold text-zinc-950 tracking-tight uppercase">
                  VN<span className="text-[#ff4600]">RunClub</span>
                </span>
                <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-bold">No Excuses</span>
              </div>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden xl:flex items-center space-x-2">
              <NavItem page="home" icon={Home} label="Trang chủ" />
              <NavItem page="activities" icon={Activity} label="Hoạt động" />
              <NavItem page="challenges" icon={Target} label="Thử thách" />
              <NavItem page="leaderboard" icon={Trophy} label="BXH" />
              <NavItem page="events" icon={Calendar} label="Sự kiện" />
              <NavItem page="blog" icon={BookOpen} label="Blog" />
            </nav>
            
            {/* User / Login */}
            <div className="hidden lg:flex items-center pl-4 border-l-4 border-zinc-950 h-full ml-4">
              {user ? (
                <div className="flex items-center space-x-4 ml-4">
                  <button 
                    onClick={() => onNavigate('profile')}
                    className="flex items-center space-x-3 px-2 py-1 bg-zinc-100 athletic-border hover:bg-[#ccff00] transition-colors group skew-container"
                  >
                    <div className="skew-content flex items-center space-x-3">
                        <img src={user.avatar} alt="Avatar" className="w-8 h-8 rounded-none border-2 border-zinc-950 object-cover" />
                        <span className="text-sm font-display font-bold text-zinc-950 uppercase pr-2">{user.firstName}</span>
                    </div>
                  </button>
                </div>
              ) : (
                <button
                  onClick={onLogin}
                  className="ml-4 px-6 py-2 bg-zinc-950 text-white font-display font-bold uppercase tracking-wider skew-container hover:bg-[#ff4600] transition-colors athletic-shadow-hover"
                >
                  <div className="skew-content flex items-center space-x-2">
                    <LogIn size={18} />
                    <span>Tham gia</span>
                  </div>
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="xl:hidden p-2 text-zinc-950 hover:bg-[#ccff00] athletic-border transition-colors bg-white relative z-50 skew-container"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <div className="skew-content">
                {isMobileMenuOpen ? <X size={24} strokeWidth={3} /> : <Menu size={24} strokeWidth={3} />}
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Nav Overlay */}
        {isMobileMenuOpen && (
          <div className="xl:hidden fixed inset-0 z-40 bg-zinc-950 pt-24 px-6 flex flex-col h-screen overflow-y-auto">
            <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none"></div>
            <div className="grid grid-cols-1 gap-4 relative z-10">
                <button onClick={() => { onNavigate('home'); setIsMobileMenuOpen(false); }} className="text-left font-display text-4xl text-white uppercase hover:text-[#ccff00] transition-colors border-b-2 border-zinc-800 pb-2">Trang chủ</button>
                <button onClick={() => { onNavigate('activities'); setIsMobileMenuOpen(false); }} className="text-left font-display text-4xl text-white uppercase hover:text-[#ccff00] transition-colors border-b-2 border-zinc-800 pb-2">Hoạt động</button>
                <button onClick={() => { onNavigate('challenges'); setIsMobileMenuOpen(false); }} className="text-left font-display text-4xl text-white uppercase hover:text-[#ccff00] transition-colors border-b-2 border-zinc-800 pb-2">Thử thách</button>
                <button onClick={() => { onNavigate('leaderboard'); setIsMobileMenuOpen(false); }} className="text-left font-display text-4xl text-white uppercase hover:text-[#ccff00] transition-colors border-b-2 border-zinc-800 pb-2">Bảng Xếp Hạng</button>
                <button onClick={() => { onNavigate('events'); setIsMobileMenuOpen(false); }} className="text-left font-display text-4xl text-white uppercase hover:text-[#ccff00] transition-colors border-b-2 border-zinc-800 pb-2">Sự kiện</button>
                <button onClick={() => { onNavigate('blog'); setIsMobileMenuOpen(false); }} className="text-left font-display text-4xl text-white uppercase hover:text-[#ccff00] transition-colors border-b-2 border-zinc-800 pb-2">Blog</button>
            </div>
            
            <div className="pt-8 mt-auto mb-10 relative z-10">
               {user ? (
                <>
                  <button 
                    onClick={() => { onNavigate('profile'); setIsMobileMenuOpen(false); }}
                    className="flex items-center space-x-4 w-full p-4 bg-[#ccff00] athletic-border mb-4 skew-container"
                  >
                    <div className="skew-content flex items-center space-x-4 w-full">
                        <img src={user.avatar} alt="Avatar" className="w-12 h-12 border-2 border-zinc-950" />
                        <div className="text-left">
                            <div className="font-display text-xl text-zinc-950 uppercase">{user.firstName} {user.lastName}</div>
                            <div className="text-xs text-zinc-700 font-bold uppercase tracking-widest">Hồ sơ cá nhân</div>
                        </div>
                    </div>
                  </button>
                  <button onClick={() => { onLogout(); setIsMobileMenuOpen(false); }} className="w-full py-4 text-white font-display text-xl uppercase tracking-widest hover:bg-zinc-900 athletic-border skew-container">
                    <div className="skew-content">Đăng xuất</div>
                  </button>
                </>
              ) : (
                <button
                  onClick={() => { onLogin(); setIsMobileMenuOpen(false); }}
                  className="w-full flex items-center justify-center space-x-2 bg-[#ff4600] text-white p-4 athletic-border font-display text-2xl uppercase tracking-wider skew-container"
                >
                  <div className="skew-content flex items-center space-x-2">
                    <LogIn size={24} />
                    <span>Tham gia ngay</span>
                  </div>
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow bg-white relative">
        <div className="absolute inset-0 bg-grid opacity-[0.03] pointer-events-none"></div>
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-zinc-950 text-white pt-20 pb-10 border-t-8 border-[#ccff00] relative overflow-hidden">
        {/* Track Lines Background */}
        <div className="absolute inset-0 track-lines opacity-10 pointer-events-none transform -skew-x-12 scale-110"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
            <div className="col-span-1 md:col-span-4">
               <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-[#ccff00] flex items-center justify-center skew-container">
                  <Activity className="text-zinc-950 skew-content" size={28} strokeWidth={3} />
                </div>
                <div>
                  <span className="block text-3xl font-display font-bold text-white leading-none tracking-tight uppercase">VN RunClub</span>
                  <span className="text-[10px] uppercase tracking-[0.3em] text-[#ff4600] font-bold">No Excuses</span>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-zinc-400 font-medium mb-8">
                Sân chơi chuyên nghiệp dành cho cộng đồng Runner Việt Nam. Nơi kết nối đam mê, chia sẻ kiến thức và chinh phục những cung đường mới.
              </p>
              <div className="flex space-x-4">
                 <a href="#" className="w-10 h-10 bg-zinc-900 flex items-center justify-center hover:bg-[#ccff00] hover:text-zinc-950 transition-colors skew-container"><Activity size={20} className="skew-content" /></a>
                 <a href="#" className="w-10 h-10 bg-zinc-900 flex items-center justify-center hover:bg-[#ccff00] hover:text-zinc-950 transition-colors skew-container"><Target size={20} className="skew-content" /></a>
              </div>
            </div>
            
            <div className="col-span-1 md:col-span-2 md:col-start-6">
              <h3 className="text-white font-display text-xl mb-6 uppercase tracking-wider text-[#ccff00]">Khám phá</h3>
              <ul className="space-y-4 text-sm font-bold uppercase tracking-wider text-zinc-400">
                <li><button onClick={() => onNavigate('home')} className="hover:text-white transition-colors flex items-center group"><ArrowRight size={14} className="mr-2 opacity-0 group-hover:opacity-100 group-hover:text-[#ff4600] transition-all -ml-6 group-hover:ml-0" />Trang chủ</button></li>
                <li><button onClick={() => onNavigate('events')} className="hover:text-white transition-colors flex items-center group"><ArrowRight size={14} className="mr-2 opacity-0 group-hover:opacity-100 group-hover:text-[#ff4600] transition-all -ml-6 group-hover:ml-0" />Giải chạy</button></li>
                <li><button onClick={() => onNavigate('leaderboard')} className="hover:text-white transition-colors flex items-center group"><ArrowRight size={14} className="mr-2 opacity-0 group-hover:opacity-100 group-hover:text-[#ff4600] transition-all -ml-6 group-hover:ml-0" />Bảng xếp hạng</button></li>
                <li><button onClick={() => onNavigate('blog')} className="hover:text-white transition-colors flex items-center group"><ArrowRight size={14} className="mr-2 opacity-0 group-hover:opacity-100 group-hover:text-[#ff4600] transition-all -ml-6 group-hover:ml-0" />Blog chia sẻ</button></li>
              </ul>
            </div>

            <div className="col-span-1 md:col-span-2">
              <h3 className="text-white font-display text-xl mb-6 uppercase tracking-wider text-[#ccff00]">Cộng đồng</h3>
              <ul className="space-y-4 text-sm font-bold uppercase tracking-wider text-zinc-400">
                <li><button onClick={() => onNavigate('about')} className="hover:text-white transition-colors flex items-center group"><ArrowRight size={14} className="mr-2 opacity-0 group-hover:opacity-100 group-hover:text-[#ff4600] transition-all -ml-6 group-hover:ml-0" />Về chúng tôi</button></li>
                <li><button onClick={() => onNavigate('rules')} className="hover:text-white transition-colors flex items-center group"><ArrowRight size={14} className="mr-2 opacity-0 group-hover:opacity-100 group-hover:text-[#ff4600] transition-all -ml-6 group-hover:ml-0" />Quy chế</button></li>
                <li><button onClick={() => onNavigate('partners')} className="hover:text-white transition-colors flex items-center group"><ArrowRight size={14} className="mr-2 opacity-0 group-hover:opacity-100 group-hover:text-[#ff4600] transition-all -ml-6 group-hover:ml-0" />Đối tác</button></li>
                <li><button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors flex items-center group"><ArrowRight size={14} className="mr-2 opacity-0 group-hover:opacity-100 group-hover:text-[#ff4600] transition-all -ml-6 group-hover:ml-0" />Liên hệ</button></li>
              </ul>
            </div>

            <div className="col-span-1 md:col-span-3">
              <h3 className="text-white font-display text-xl mb-6 uppercase tracking-wider text-[#ccff00]">Newsletter</h3>
              <p className="text-sm text-zinc-400 mb-4 font-medium">Nhận thông tin giải chạy và training plan mới nhất.</p>
              <div className="flex athletic-border bg-white p-1 skew-container">
                  <input type="email" placeholder="Email của bạn" className="bg-transparent px-3 py-2 w-full text-zinc-950 text-sm font-bold outline-none placeholder-zinc-400 skew-content" />
                  <button className="bg-[#ff4600] text-white px-4 py-2 font-display uppercase tracking-wider hover:bg-zinc-950 transition-colors skew-content">Gửi</button>
              </div>
            </div>
          </div>
          
          <div className="border-t-2 border-zinc-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-zinc-500 font-bold uppercase tracking-widest">
            <p>© 2024 VN RUNCLUB. ALL RIGHTS RESERVED.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <span className="hover:text-white cursor-pointer transition-colors">Privacy</span>
              <span className="hover:text-white cursor-pointer transition-colors">Terms</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;