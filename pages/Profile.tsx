import React from 'react';
import { User } from '../types';
import { MapPin, Calendar, Settings, Edit3, TrendingUp, Award, Zap, Activity, Footprints } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer, Tooltip, XAxis } from 'recharts';

interface ProfileProps {
  user: User;
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
  const paceData = [
    { month: 'J', pace: 6.5 }, { month: 'F', pace: 6.2 }, { month: 'M', pace: 6.0 },
    { month: 'A', pace: 5.8 }, { month: 'M', pace: 5.5 }, { month: 'J', pace: 5.2 },
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-8 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header Card */}
        <div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-full h-32 bg-gradient-to-b from-teal-50 to-transparent opacity-50 pointer-events-none"></div>
           
           <div className="relative z-10 flex-shrink-0">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full p-1.5 bg-gradient-to-br from-teal-400 via-emerald-500 to-teal-600 shadow-xl mx-auto">
                 <img src={user.avatar} className="w-full h-full rounded-full border-4 border-white object-cover" alt="Avatar" />
              </div>
              <div className="absolute bottom-2 right-2 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded-lg border-2 border-white shadow-sm">
                 LVL {user.level}
              </div>
           </div>

           <div className="flex-1 text-center md:text-left relative z-10 w-full">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                 <div>
                    <h1 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-2">{user.firstName} {user.lastName}</h1>
                    <div className="flex items-center justify-center md:justify-start space-x-4 text-slate-500 text-sm font-medium mb-6">
                       <span className="flex items-center px-3 py-1 bg-slate-100 rounded-full"><MapPin size={14} className="mr-1.5" /> {user.city}</span>
                       <span className="flex items-center px-3 py-1 bg-slate-100 rounded-full"><Calendar size={14} className="mr-1.5" /> Since 2021</span>
                    </div>
                 </div>
                 <div className="flex space-x-3 justify-center md:justify-end mb-6 md:mb-0">
                    <button className="p-3 rounded-xl border border-gray-200 hover:bg-gray-50 text-slate-600 transition-colors"><Settings size={20} /></button>
                    <button className="px-6 py-3 rounded-xl bg-slate-900 text-white font-bold text-sm hover:bg-slate-800 transition-shadow shadow-lg shadow-slate-900/20 flex items-center">
                       <Edit3 size={16} className="mr-2" /> <span className="hidden sm:inline">Edit Profile</span><span className="sm:hidden">Edit</span>
                    </button>
                 </div>
              </div>

              {/* XP Progress */}
              <div className="w-full bg-slate-100 h-4 rounded-full overflow-hidden relative group">
                 <div className="bg-gradient-to-r from-yellow-400 to-orange-500 h-full rounded-full w-[65%] relative">
                    <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                 </div>
                 <div className="absolute inset-0 flex items-center justify-between px-3 text-[9px] font-bold text-slate-500 uppercase tracking-wider">
                    <span>Current XP: {user.xp}</span>
                    <span>Next Level: 10,000</span>
                 </div>
              </div>
           </div>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 grid-rows-[auto]">
           
           {/* Stat Card 1: Distance */}
           <div className="bg-slate-900 text-white p-6 rounded-[2rem] shadow-xl md:col-span-1 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500 rounded-full blur-[60px] opacity-20 group-hover:opacity-30 transition-opacity"></div>
              <div className="relative z-10">
                 <div className="flex justify-between items-start mb-8">
                    <div className="p-3 bg-white/10 rounded-2xl"><Activity size={24} className="text-teal-400" /></div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total</span>
                 </div>
                 <div className="text-4xl font-display font-bold mb-1">{user.totalDistance.toLocaleString()}</div>
                 <div className="text-slate-400 text-sm font-medium">Kilometers Run</div>
              </div>
           </div>

           {/* Stat Card 2: Streak */}
           <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 md:col-span-1 flex flex-col justify-between group hover:border-orange-200 transition-colors">
              <div className="flex justify-between items-start">
                 <div className="p-3 bg-orange-50 text-orange-500 rounded-2xl group-hover:bg-orange-100 transition-colors"><Zap size={24} className="fill-current" /></div>
                 <div className="text-right">
                    <div className="text-3xl font-display font-bold text-slate-900">{user.streak}</div>
                    <div className="text-xs font-bold text-slate-400 uppercase">Day Streak</div>
                 </div>
              </div>
              <div className="mt-6 text-sm text-slate-500">
                 Keep it up! You are on fire 🔥
              </div>
           </div>

           {/* Large Chart Card */}
           <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 md:col-span-2 row-span-2">
              <div className="flex justify-between items-center mb-8">
                 <h3 className="font-bold text-slate-900 text-lg flex items-center">
                    <TrendingUp className="mr-2 text-teal-600" size={20} /> Pace Progression
                 </h3>
                 <select className="bg-gray-50 border-none text-xs font-bold rounded-lg py-1 px-3 outline-none cursor-pointer">
                    <option>Last 6 Months</option>
                    <option>This Year</option>
                 </select>
              </div>
              <div className="h-64 w-full">
                 <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={paceData}>
                       <defs>
                          <linearGradient id="colorPace" x1="0" y1="0" x2="0" y2="1">
                             <stop offset="5%" stopColor="#0d9488" stopOpacity={0.1}/>
                             <stop offset="95%" stopColor="#0d9488" stopOpacity={0}/>
                          </linearGradient>
                       </defs>
                       <Tooltip 
                          contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                          itemStyle={{color: '#0f172a', fontWeight: 'bold'}}
                       />
                       <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                       <Area type="monotone" dataKey="pace" stroke="#0d9488" strokeWidth={3} fillOpacity={1} fill="url(#colorPace)" />
                    </AreaChart>
                 </ResponsiveContainer>
              </div>
           </div>

           {/* Badges Box */}
           <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-[2rem] md:col-span-2 border border-orange-100">
              <div className="flex justify-between items-center mb-6">
                 <h3 className="font-bold text-orange-900 flex items-center"><Award className="mr-2" size={20} /> Recent Achievements</h3>
                 <button className="text-xs font-bold text-orange-700 hover:underline">View All</button>
              </div>
              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                 {user.badges.slice(0, 4).map(badge => (
                    <div key={badge.id} className="flex-shrink-0 w-20 h-24 bg-white rounded-2xl flex flex-col items-center justify-center shadow-sm p-2">
                       <div className="text-3xl mb-2">{badge.icon}</div>
                       <div className="text-[10px] font-bold text-center leading-tight text-slate-600 line-clamp-2">{badge.name}</div>
                    </div>
                 ))}
                 <div className="flex-shrink-0 w-20 h-24 bg-white/50 rounded-2xl flex flex-col items-center justify-center border-2 border-dashed border-orange-200">
                    <span className="text-xs font-bold text-orange-300">Next</span>
                 </div>
              </div>
           </div>

           {/* Gear / Shoes (Mock) */}
           <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 md:col-span-2 flex items-center justify-between">
              <div>
                 <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Primary Gear</div>
                 <div className="font-bold text-slate-900 text-lg">Nike Alphafly 3</div>
                 <div className="text-xs text-teal-600 font-medium mt-1">340km / 800km</div>
              </div>
              <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-slate-300">
                 <Footprints size={32} />
              </div>
           </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;