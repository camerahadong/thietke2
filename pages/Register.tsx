import React from 'react';
import { UserPlus, Activity, Zap, ArrowLeft, Mail, Lock, User } from 'lucide-react';

interface RegisterProps {
  onNavigate: (page: string) => void;
}

const Register: React.FC<RegisterProps> = ({ onNavigate }) => {
  return (
    <div className="flex min-h-screen bg-white font-sans">
        {/* Left: Branding & Visual */}
        <div className="hidden lg:flex w-5/12 bg-[#0F172A] relative flex-col justify-between p-12 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full">
                <img src="https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?auto=format&fit=crop&q=80&w=1600" className="w-full h-full object-cover opacity-20 mix-blend-overlay" />
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
                    Push your <br/>
                    <span className="text-teal-400">Limits</span>.
                </h1>
                <p className="text-slate-400 text-lg max-w-sm">
                    Create an account to access exclusive training plans, events, and leaderboards.
                </p>
            </div>

            <div className="relative z-10 text-slate-500 text-xs">
                © 2024 VN RunClub Inc.
            </div>
        </div>

        {/* Right: Form */}
        <div className="w-full lg:w-7/12 flex items-center justify-center p-8 bg-gray-50">
            <div className="max-w-md w-full bg-white p-10 rounded-3xl shadow-xl border border-gray-100">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-slate-900 mb-2">Create Account</h2>
                    <p className="text-slate-500">Join the community today.</p>
                </div>

                <div className="space-y-4 mb-8">
                    <button className="w-full py-3 px-4 bg-[#FC4C02] text-white rounded-xl font-bold flex items-center justify-center hover:bg-[#E34402] transition-all transform active:scale-95 shadow-lg shadow-orange-500/20">
                        <Zap size={20} className="mr-2 fill-current" />
                        Sign up with Strava
                    </button>
                    <div className="relative flex py-2 items-center">
                        <div className="flex-grow border-t border-gray-200"></div>
                        <span className="flex-shrink-0 mx-4 text-gray-400 text-xs uppercase font-bold">Or</span>
                        <div className="flex-grow border-t border-gray-200"></div>
                    </div>
                </div>

                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert("Mock Register"); }}>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-700 uppercase ml-1">First Name</label>
                            <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none transition-all font-medium text-slate-900" placeholder="Van" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-700 uppercase ml-1">Last Name</label>
                            <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none transition-all font-medium text-slate-900" placeholder="Nguyen" />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700 uppercase ml-1">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-3.5 text-slate-400" size={18} />
                            <input type="email" className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none transition-all font-medium text-slate-900" placeholder="runner@example.com" />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700 uppercase ml-1">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-3.5 text-slate-400" size={18} />
                            <input type="password" className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none transition-all font-medium text-slate-900" placeholder="Min 8 chars" />
                        </div>
                    </div>
                    
                    <button type="submit" className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold text-lg hover:bg-slate-800 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 mt-4">
                        Register
                    </button>
                </form>

                <p className="mt-8 text-center text-slate-500 font-medium">
                    Already a member? <button onClick={() => onNavigate('login')} className="text-teal-600 font-bold hover:underline">Sign In</button>
                </p>
                
                <button onClick={() => onNavigate('home')} className="mt-8 mx-auto flex items-center text-slate-400 hover:text-slate-600 text-sm transition-colors">
                    <ArrowLeft size={16} className="mr-1" /> Back to Home
                </button>
            </div>
        </div>
    </div>
  );
};

export default Register;