import React, { useMemo } from 'react';
import { Challenge, User } from '../types';
import { USERS } from '../constants';
import { Calendar, Users, Target, ArrowLeft, Info, CheckCircle, Zap, Activity } from 'lucide-react';

interface ChallengeDetailProps {
  challenge: Challenge;
  onNavigate: (page: string) => void;
}

const ChallengeDetail: React.FC<ChallengeDetailProps> = ({ challenge, onNavigate }) => {
  // Generate random leaderboard data based on USERS constant
  const leaderboard = useMemo(() => {
    // Deterministic random generator based on seed (challenge.id)
    const seededRandom = (seed: number) => {
        const x = Math.sin(seed++) * 10000;
        return x - Math.floor(x);
    };

    return USERS.map((user, index) => {
        // Base seed on user and challenge
        const seed = user.id.charCodeAt(0) + challenge.id.charCodeAt(1);
        const rand = seededRandom(seed);
        
        // Random Stats
        const runs = Math.floor(rand * 20) + 5; // 5 to 25 runs
        const paceMin = 3 + Math.floor(rand * 4); // 3 to 6
        const paceSec = Math.floor(rand * 60);
        const paceStr = `${paceMin}:${paceSec.toString().padStart(2, '0')}`;
        
        // Distance Logic (some beat target heavily, some under)
        // Ensure top users beat it
        let totalKm = 0;
        if (index < 5) {
             totalKm = challenge.targetDistance + (rand * 200); // Top 5 always beat + extra
        } else {
             totalKm = challenge.targetDistance * (rand * 1.5); // Others random
        }
        
        const percent = Math.floor((totalKm / challenge.targetDistance) * 100);
        const isCompleted = totalKm >= challenge.targetDistance;
        const surplus = totalKm - challenge.targetDistance;

        return {
            user,
            runs,
            pace: paceStr,
            totalKm: parseFloat(totalKm.toFixed(1)),
            percent,
            isCompleted,
            surplus: parseFloat(surplus.toFixed(1))
        };
    }).sort((a, b) => b.totalKm - a.totalKm); // Sort by distance DESC
  }, [challenge]);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = 'https://images.unsplash.com/photo-1552674605-469523f9bc9d?auto=format&fit=crop&q=80&w=800';
  };

  return (
    <div className="animate-fade-in bg-gray-50 min-h-screen pb-12">
      {/* Back Button */}
      <div className="bg-white border-b border-gray-100 sticky top-0 md:top-16 z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
              <button onClick={() => onNavigate('challenges')} className="flex items-center text-slate-500 hover:text-orange-600 transition-colors font-medium text-sm md:text-base">
                  <ArrowLeft size={20} className="mr-2" /> Quay lại danh sách
              </button>
          </div>
      </div>

      {/* Hero Header */}
      <div className="relative min-h-[300px] h-auto md:h-96 overflow-hidden">
          <img 
            src={challenge.imageUrl} 
            alt={challenge.title} 
            className="w-full h-full object-cover absolute inset-0"
            onError={handleImageError}
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 max-w-7xl mx-auto text-white relative z-10">
              <span className={`inline-block px-3 py-1 rounded-md text-[10px] md:text-xs font-bold uppercase tracking-wider mb-2 md:mb-3 ${challenge.status === 'Active' ? 'bg-green-500' : 'bg-gray-500'}`}>
                  {challenge.status === 'Active' ? 'Đang diễn ra' : 'Đã kết thúc'}
              </span>
              <h1 className="text-2xl md:text-5xl lg:text-6xl font-display font-bold mb-3 md:mb-4 leading-tight">{challenge.title}</h1>
              <div className="flex flex-wrap gap-4 md:gap-6 text-xs md:text-lg text-slate-200 font-light">
                  <span className="flex items-center"><Calendar size={16} className="mr-1.5 md:mr-2 text-orange-400" /> {challenge.startDate} - {challenge.endDate}</span>
                  <span className="flex items-center"><Target size={16} className="mr-1.5 md:mr-2 text-orange-400" /> Mục tiêu: <strong className="ml-1 text-white">{challenge.targetDistance} km</strong></span>
                  <span className="flex items-center"><Users size={16} className="mr-1.5 md:mr-2 text-orange-400" /> {challenge.participants.toLocaleString()}</span>
              </div>
          </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 md:-mt-10 relative z-10 space-y-6 md:space-y-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
              {/* Left Column: Rules & Info */}
              <div className="lg:col-span-1 space-y-6 md:space-y-8">
                  <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-5 md:p-8">
                      <div className="flex items-center mb-4 md:mb-6">
                          <Info className="text-orange-600 mr-2 md:mr-3" size={24} />
                          <h2 className="text-xl md:text-2xl font-bold text-slate-900">Thông tin</h2>
                      </div>
                      <p className="text-slate-600 mb-6 md:mb-8 leading-relaxed text-sm md:text-base">{challenge.description}</p>
                      
                      {challenge.rules && challenge.rules.length > 0 && (
                          <div className="bg-orange-50 rounded-xl p-4 md:p-6 border border-orange-100">
                              <h3 className="font-bold text-orange-800 mb-3 md:mb-4 text-xs md:text-sm uppercase tracking-wide flex items-center">
                                  <Activity size={16} className="mr-2" /> Quy định thử thách
                              </h3>
                              <ul className="space-y-2 md:space-y-3">
                                  {challenge.rules.map((rule, idx) => (
                                      <li key={idx} className="flex items-start text-xs md:text-sm text-slate-700">
                                          <span className="mr-2 mt-1.5 w-1.5 h-1.5 bg-orange-500 rounded-full flex-shrink-0"></span>
                                          <span>{rule}</span>
                                      </li>
                                  ))}
                              </ul>
                          </div>
                      )}
                  </div>
              </div>

              {/* Right Column: Leaderboard */}
              <div className="lg:col-span-2">
                  <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                      <div className="p-4 md:p-6 border-b border-gray-100 bg-slate-50 flex flex-col sm:flex-row justify-between items-center gap-3">
                          <h2 className="text-lg md:text-2xl font-bold text-slate-900 flex items-center w-full sm:w-auto">
                              <Activity className="mr-2 md:mr-3 text-orange-600" /> Bảng Xếp Hạng
                          </h2>
                          <div className="flex items-center space-x-3 w-full sm:w-auto">
                              <select className="w-full sm:w-auto bg-white border border-gray-200 text-slate-700 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block p-2 outline-none">
                                  <option>Quãng đường (KM)</option>
                                  <option>Pace tốt nhất</option>
                              </select>
                          </div>
                      </div>

                      <div className="divide-y divide-gray-100">
                          {leaderboard.map((item, idx) => (
                              <div key={item.user.id} className="p-4 md:p-5 hover:bg-orange-50/30 transition-all duration-200 group">
                                  <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
                                      
                                      {/* Rank & User Info (Mobile optimized) */}
                                      <div className="flex items-center md:w-1/3 min-w-0">
                                          <div className={`
                                              flex-shrink-0 w-8 h-8 md:w-12 md:h-12 rounded-full flex items-center justify-center font-bold text-sm md:text-lg mr-3 md:mr-4 shadow-sm
                                              ${idx === 0 ? 'bg-yellow-100 text-yellow-700 border border-yellow-300' : 
                                                idx === 1 ? 'bg-gray-100 text-slate-700 border border-gray-300' : 
                                                idx === 2 ? 'bg-orange-100 text-orange-800 border border-orange-300' : 'bg-white text-slate-500 border border-gray-200'}
                                          `}>
                                              {idx + 1}
                                          </div>
                                          <img src={item.user.avatar} alt="Avatar" loading="lazy" className="w-10 h-10 md:w-14 md:h-14 rounded-full border-2 border-white shadow-md mr-3 md:mr-4 object-cover flex-shrink-0" />
                                          <div className="flex-grow min-w-0 overflow-hidden">
                                              <div className="font-bold text-slate-900 text-sm md:text-lg truncate group-hover:text-orange-600 transition-colors">
                                                  {item.user.firstName} {item.user.lastName}
                                              </div>
                                              <div className="flex items-center text-[10px] md:text-xs text-slate-500 mt-0.5 md:mt-1 space-x-2">
                                                  <span className="flex items-center bg-slate-100 px-1.5 py-0.5 rounded text-slate-600 font-medium whitespace-nowrap">
                                                      {item.user.id.charCodeAt(1) % 2 === 0 ? '👨 Nam' : '👩 Nữ'}
                                                  </span>
                                              </div>
                                          </div>
                                      </div>

                                      {/* Stats Grid (Mobile 2 cols, Desktop wider) */}
                                      <div className="flex-grow grid grid-cols-2 md:grid-cols-12 gap-3 md:gap-4 items-center">
                                          
                                          {/* Pace & Runs */}
                                          <div className="md:col-span-3 flex flex-col md:items-center justify-center pl-2 md:pl-0 border-l-2 md:border-l-0 border-slate-100">
                                              <div className="flex items-center mb-0.5 md:mb-1">
                                                  <Zap size={12} className="text-orange-500 mr-1 md:mr-1.5" />
                                                  <span className="text-[10px] md:text-xs text-slate-400 uppercase font-semibold">Pace TB</span>
                                              </div>
                                              <div className="font-bold text-slate-700 text-sm md:text-base">{item.pace} <span className="text-[10px] md:text-xs font-normal text-slate-400">/km</span></div>
                                          </div>
                                          
                                          <div className="md:col-span-3 flex flex-col md:items-center justify-center">
                                              <div className="flex items-center mb-0.5 md:mb-1">
                                                  <Activity size={12} className="text-blue-500 mr-1 md:mr-1.5" />
                                                  <span className="text-[10px] md:text-xs text-slate-400 uppercase font-semibold">Hoạt động</span>
                                              </div>
                                              <div className="font-bold text-slate-700 text-sm md:text-base">{item.runs} <span className="text-[10px] md:text-xs font-normal text-slate-400">lần</span></div>
                                          </div>

                                          {/* Progress Bar Area - Full width on mobile row 2 */}
                                          <div className="col-span-2 md:col-span-6 pl-0 md:pl-4 border-t md:border-t-0 md:border-l border-gray-100 pt-3 md:pt-0">
                                              <div className="flex justify-between items-end mb-1 md:mb-2">
                                                  <div className="text-sm">
                                                      <span className="font-display font-bold text-slate-900 text-lg md:text-xl">{item.totalKm}</span>
                                                      <span className="text-slate-400 text-[10px] md:text-xs ml-1">/ {challenge.targetDistance} km</span>
                                                  </div>
                                                  <div className={`text-xs md:text-sm font-bold ${item.isCompleted ? 'text-green-600' : 'text-slate-500'}`}>
                                                      {item.percent}%
                                                  </div>
                                              </div>
                                              
                                              <div className="relative w-full bg-gray-100 rounded-full h-2 md:h-3 overflow-hidden shadow-inner">
                                                  <div 
                                                      className={`h-full rounded-full transition-all duration-1000 ${item.isCompleted ? 'bg-gradient-to-r from-green-500 to-green-600' : 'bg-gradient-to-r from-orange-400 to-orange-600'}`}
                                                      style={{ width: `${Math.min(item.percent, 100)}%` }}
                                                  ></div>
                                              </div>
                                              
                                              {item.isCompleted && (
                                                  <div className="mt-1.5 md:mt-2 text-[10px] md:text-xs font-bold text-green-600 flex items-center bg-green-50 px-2 py-0.5 md:py-1 rounded-md w-fit">
                                                      <CheckCircle size={10} className="mr-1 md:mr-1.5" />
                                                      Đã vượt mức +{item.surplus} km!
                                                  </div>
                                              )}
                                          </div>
                                      </div>

                                  </div>
                              </div>
                          ))}
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
};

export default ChallengeDetail;