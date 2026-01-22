import React from 'react';
import { Activity, Zap, ArrowLeft } from 'lucide-react';

interface LoginProps {
  onNavigate: (page: string) => void;
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onNavigate, onLogin }) => {
  return (
    <div className="flex min-h-screen bg-white font-sans">
        {/* Left: Branding & Visual */}
        <div className="hidden lg:flex w-5/12 bg-[#0F172A] relative flex-col justify-between p-12 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full">
                <img src="https://images.unsplash.com/photo-1552674605-469523f9bc9d?auto=format&fit=crop&q=80&w=1600" className="w-full h-full object-cover opacity-20 mix-blend-overlay" />
                <div className="absolute inset-0 bg-gradient-to-b from-teal-900/50 to-[#0F172A]"></div>
            </div>
            
            <div className="relative z-10">
                <div className="flex items-center space-x-2 text-white mb-8">
                    <Activity className="text-teal-400" size={32} />
                    <span className="font-display font-bold text-2xl">VN RunClub</span>
                </div>
            </div>

            <div className="relative z-10">
                <h1 className="text-5xl font-display font-bold text-white mb-6 leading-tight">
                    Start your <br/>
                    <span className="text-teal-400">Journey</span> today.
                </h1>
                <p className="text-slate-400 text-lg max-w-sm">
                    Join thousands of runners in Vietnam. Track progress, compete, and grow together.
                </p>
            </div>

            <div className="relative z-10 text-slate-500 text-xs">
                © 2024 VN RunClub Inc.
            </div>
        </div>

        {/* Right: Form */}
        <div className="w-full lg:w-7/12 flex items-center justify-center p-8 bg-gray-50">
            <div className="max-w-md w-full bg-white p-10 rounded-3xl shadow-xl border border-gray-100 flex flex-col justify-center min-h-[450px]">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-slate-900 mb-3">Welcome Back!</h2>
                    <p className="text-slate-500">Please connect with Strava to continue.</p>
                </div>

                <div className="space-y-8 mb-8">
                    <button onClick={onLogin} className="w-full py-4 px-4 bg-[#FC4C02] text-white rounded-xl font-bold flex items-center justify-center hover:bg-[#E34402] transition-all transform active:scale-95 shadow-lg shadow-orange-500/20 text-lg">
                        <Zap size={24} className="mr-2 fill-current" />
                        Connect with Strava
                    </button>
                    
                    <div className="bg-slate-50 p-4 rounded-xl text-center">
                        <p className="text-xs text-slate-400 leading-relaxed">
                           We use Strava to sync your activities, verify your achievements, and update leaderboards automatically. We do not post anything to your feed without permission.
                        </p>
                    </div>
                </div>
                
                <div className="mt-auto pt-8 border-t border-gray-100">
                    <button onClick={() => onNavigate('home')} className="mx-auto flex items-center text-slate-400 hover:text-slate-600 text-sm transition-colors">
                        <ArrowLeft size={16} className="mr-1" /> Back to Home
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Login;