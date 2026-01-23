import React, { useState, useEffect } from 'react';
import { Menu, X, Home, Trophy, Calendar, User as UserIcon, LogIn, Activity, BookOpen, Image as ImageIcon, Info, Mail, Target } from 'lucide-react';
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
      className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 font-bold text-sm ${
        currentPage === page
          ? 'text-teal-800 bg-teal-50 shadow-inner'
          : 'text-slate-500 hover:text-teal-600 hover:bg-white'
      }`}
    >
      <Icon size={18} className={currentPage === page ? 'text-teal-600' : 'text-slate-400'} />
      <span>{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#F3F4F6] font-sans text-slate-800 selection:bg-teal-100 selection:text-teal-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl shadow-sm border-b border-white/50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div 
              className="flex items-center space-x-3 cursor-pointer group" 
              onClick={() => onNavigate('home')}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-400 to-emerald-600 rounded-xl blur-sm opacity-40 group-hover:opacity-60 transition-opacity"></div>
                <div className="relative w-10 h-10 bg-gradient-to-br from-teal-600 to-emerald-800 rounded-xl flex items-center justify-center shadow-lg">
                  <Activity className="text-white" size={22} strokeWidth={2.5} />
                </div>
              </div>
              <div>
                <span className="block text-2xl font-display font-bold text-slate-900 leading-none tracking-tight group-hover:text-teal-700 transition-colors">
                  VN<span className="text-teal-600">RunClub</span>
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold">Limitless</span>
              </div>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden xl:flex items-center bg-gray-100/50 p-1.5 rounded-full border border-gray-200/50 backdrop-blur-sm">
              <NavItem page="home" icon={Home} label="Trang chủ" />
              <NavItem page="activities" icon={Activity} label="Hoạt động" />
              <NavItem page="challenges" icon={Target} label="Thử thách" />
              <NavItem page="leaderboard" icon={Trophy} label="BXH" />
              <NavItem page="events" icon={Calendar} label="Sự kiện" />
              <NavItem page="blog" icon={BookOpen} label="Blog" />
              <NavItem page="gallery" icon={ImageIcon} label="Ảnh" />
            </nav>
            
            {/* User / Login */}
            <div className="hidden lg:flex items-center pl-4">
              {user ? (
                <div className="flex items-center space-x-4">
                  <button 
                    onClick={() => onNavigate('profile')}
                    className="flex items-center space-x-3 pl-1 pr-4 py-1 rounded-full border border-gray-100 hover:border-teal-200 bg-white shadow-sm hover:shadow-md transition-all group"
                  >
                    <div className="relative">
                        <img src={user.avatar} alt="Avatar" className="w-9 h-9 rounded-full border-2 border-white shadow-sm object-cover" />
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-teal-500 border-2 border-white rounded-full"></div>
                    </div>
                    <span className="text-sm font-bold text-slate-700 group-hover:text-teal-700 transition-colors">{user.firstName}</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={onLogin}
                  className="relative overflow-hidden group rounded-full shadow-lg shadow-yellow-500/20"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 group-hover:scale-105 transition-transform duration-300"></div>
                  <div className="relative flex items-center space-x-2 px-6 py-2.5 text-white font-bold text-sm">
                    <LogIn size={18} />
                    <span>Tham gia ngay</span>
                  </div>
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="xl:hidden p-2 text-slate-600 hover:text-teal-600 transition-colors bg-gray-50 rounded-lg relative z-50"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Overlay */}
        {isMobileMenuOpen && (
          <div className="xl:hidden fixed inset-0 z-40 bg-white/95 backdrop-blur-xl pt-24 px-6 animate-fade-in flex flex-col h-screen overflow-y-auto">
            <div className="grid grid-cols-1 gap-3">
                <NavItem page="home" icon={Home} label="Trang chủ" />
                <NavItem page="activities" icon={Activity} label="Hoạt động" />
                <NavItem page="challenges" icon={Target} label="Thử thách" />
                <NavItem page="leaderboard" icon={Trophy} label="Bảng Xếp Hạng" />
                <NavItem page="events" icon={Calendar} label="Sự kiện & Giải đấu" />
                <NavItem page="blog" icon={BookOpen} label="Blog & Tin tức" />
                <NavItem page="gallery" icon={ImageIcon} label="Thư viện ảnh" />
                <NavItem page="about" icon={Info} label="Về CLB" />
                <NavItem page="contact" icon={Mail} label="Liên Hệ" />
            </div>
            
            <div className="pt-6 border-t border-gray-100 mt-6 mb-10">
               {user ? (
                <>
                  <button 
                    onClick={() => { onNavigate('profile'); setIsMobileMenuOpen(false); }}
                    className="flex items-center space-x-3 w-full px-4 py-4 bg-teal-50 rounded-xl border border-teal-100 mb-3"
                  >
                    <img src={user.avatar} alt="Avatar" className="w-10 h-10 rounded-full border border-teal-200" />
                    <div className="text-left">
                        <div className="font-bold text-teal-900">{user.firstName} {user.lastName}</div>
                        <div className="text-xs text-teal-600">Xem trang cá nhân</div>
                    </div>
                  </button>
                  <button onClick={() => { onLogout(); setIsMobileMenuOpen(false); }} className="w-full py-3 text-slate-500 font-bold text-sm hover:bg-gray-100 rounded-xl">Đăng xuất</button>
                </>
              ) : (
                <button
                  onClick={() => { onLogin(); setIsMobileMenuOpen(false); }}
                  className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-4 rounded-xl font-bold shadow-md"
                >
                  <LogIn size={20} />
                  <span>Đăng nhập / Đăng ký</span>
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-16 border-t border-slate-800 relative overflow-hidden">
        {/* Footer Background Pattern */}
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <pattern id="footer-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
                </pattern>
                <rect width="100%" height="100%" fill="url(#footer-grid)" />
            </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-1">
               <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-teal-600 to-emerald-700 rounded-xl flex items-center justify-center shadow-lg shadow-teal-900/50">
                  <Activity className="text-white" size={24} />
                </div>
                <div>
                  <span className="block text-xl font-bold text-white leading-none tracking-tight">VN RunClub</span>
                  <span className="text-[10px] uppercase tracking-widest text-teal-500 font-bold">Breaking Limits</span>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-slate-400">
                Sân chơi chuyên nghiệp dành cho cộng đồng Runner Việt Nam. Nơi kết nối đam mê, chia sẻ kiến thức và chinh phục những cung đường mới.
              </p>
            </div>
            
            <div>
              <h3 className="text-white font-bold mb-6 text-sm uppercase tracking-wider border-b-2 border-teal-700 inline-block pb-1">Khám phá</h3>
              <ul className="space-y-3 text-sm">
                <li><button onClick={() => onNavigate('home')} className="hover:text-teal-400 transition-colors flex items-center group"><span className="w-1.5 h-1.5 bg-slate-600 group-hover:bg-teal-400 rounded-full mr-2 transition-colors"></span>Trang chủ</button></li>
                <li><button onClick={() => onNavigate('events')} className="hover:text-teal-400 transition-colors flex items-center group"><span className="w-1.5 h-1.5 bg-slate-600 group-hover:bg-teal-400 rounded-full mr-2 transition-colors"></span>Giải chạy</button></li>
                <li><button onClick={() => onNavigate('leaderboard')} className="hover:text-teal-400 transition-colors flex items-center group"><span className="w-1.5 h-1.5 bg-slate-600 group-hover:bg-teal-400 rounded-full mr-2 transition-colors"></span>Bảng xếp hạng</button></li>
                <li><button onClick={() => onNavigate('blog')} className="hover:text-teal-400 transition-colors flex items-center group"><span className="w-1.5 h-1.5 bg-slate-600 group-hover:bg-teal-400 rounded-full mr-2 transition-colors"></span>Blog chia sẻ</button></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold mb-6 text-sm uppercase tracking-wider border-b-2 border-yellow-500 inline-block pb-1">Cộng đồng</h3>
              <ul className="space-y-3 text-sm">
                <li><button onClick={() => onNavigate('about')} className="hover:text-yellow-400 transition-colors flex items-center group"><span className="w-1.5 h-1.5 bg-slate-600 group-hover:bg-yellow-400 rounded-full mr-2 transition-colors"></span>Về chúng tôi</button></li>
                <li><button onClick={() => onNavigate('rules')} className="hover:text-yellow-400 transition-colors flex items-center group"><span className="w-1.5 h-1.5 bg-slate-600 group-hover:bg-yellow-400 rounded-full mr-2 transition-colors"></span>Quy chế</button></li>
                <li><button onClick={() => onNavigate('partners')} className="hover:text-yellow-400 transition-colors flex items-center group"><span className="w-1.5 h-1.5 bg-slate-600 group-hover:bg-yellow-400 rounded-full mr-2 transition-colors"></span>Đối tác</button></li>
                <li><button onClick={() => onNavigate('contact')} className="hover:text-yellow-400 transition-colors flex items-center group"><span className="w-1.5 h-1.5 bg-slate-600 group-hover:bg-yellow-400 rounded-full mr-2 transition-colors"></span>Liên hệ</button></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">Newsletter</h3>
              <div className="text-xs text-slate-500 mb-4">
                <p>Đăng ký để nhận thông tin giải chạy mới nhất.</p>
              </div>
              <div className="flex">
                  <input type="email" placeholder="Email của bạn" className="bg-slate-800 border border-slate-700 rounded-l-lg px-3 py-2 w-full text-white text-xs focus:ring-1 focus:ring-teal-500 outline-none transition-all placeholder-slate-500" />
                  <button className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white px-4 py-2 rounded-r-lg font-bold text-xs hover:brightness-110 transition-all">Gửi</button>
              </div>
              
              <div className="flex space-x-4 mt-6">
                 {/* Social Links with Security Attributes */}
                 <a href="#" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white cursor-pointer transition-colors text-slate-500" aria-label="Facebook"><Activity size={16} /></a>
                 <a href="#" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center hover:bg-pink-600 hover:text-white cursor-pointer transition-colors text-slate-500" aria-label="Instagram"><Activity size={16} /></a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 font-medium">
            <p>© 2024 VN RunClub. Designed for performance.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
              <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;