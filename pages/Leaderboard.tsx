import React, { useMemo, useState } from 'react';
import { USERS } from '../constants';
import { LeaderboardEntry } from '../types';
import { Trophy, Filter, Medal, Download, Crown, ChevronUp, Flame } from 'lucide-react';

const Leaderboard: React.FC = () => {
  const [filterPeriod, setFilterPeriod] = useState<'week' | 'month' | 'quarter' | 'year'>('month');
  const [sortBy, setSortBy] = useState<'distance' | 'performance' | 'elevation'>('distance');

  // Calculate scores/stats
  const leaderboardData: LeaderboardEntry[] = useMemo(() => {
    return USERS.map(user => {
      // Mock stats logic based on filter to create variation
      let multiplier = 1;
      if (filterPeriod === 'week') multiplier = 0.12;
      else if (filterPeriod === 'month') multiplier = 0.45;
      else if (filterPeriod === 'quarter') multiplier = 1.2;
      else multiplier = 4.5; // year

      // Add some randomness so the leaderboard changes between tabs
      const randomVar = (user.id.charCodeAt(0) % 10) * 0.05; 
      const distance = user.totalDistance * (multiplier + randomVar);
      const elevation = Math.floor(distance * 12); 
      const consistencyMult = user.streak > 7 ? 1.2 : 1.0;
      const score = Math.floor((distance * 10 * consistencyMult) + (elevation / 100 * 5));

      return {
        ...user,
        totalDistance: parseFloat(distance.toFixed(1)),
        rank: 0, 
        performanceScore: score,
        elevation: elevation,
        paceStr: '5:30', 
      };
    }).sort((a, b) => {
        if (sortBy === 'distance') return b.totalDistance - a.totalDistance;
        if (sortBy === 'elevation') return b.elevation - a.elevation;
        return b.performanceScore - a.performanceScore;
    }).map((entry, index) => ({ ...entry, rank: index + 1 }));
  }, [filterPeriod, sortBy]);

  const top3 = leaderboardData.slice(0, 3);
  const restRunners = leaderboardData.slice(3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
      {/* Page Title */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-display font-bold text-slate-900">BẢNG VÀNG THÀNH TÍCH</h1>
        <p className="text-slate-500 mt-2 text-lg">Vinh danh những chiến binh không mỏi của VN RunClub.</p>
      </div>

      {/* Main Controls - Pill shape tabs */}
      <div className="flex flex-col md:flex-row justify-center items-center mb-16 space-y-4 md:space-y-0 md:space-x-4">
        <div className="bg-white p-1.5 rounded-full shadow-sm border border-gray-200 flex space-x-1">
          {(['week', 'month', 'quarter', 'year'] as const).map((p) => {
            const labels: Record<string, string> = { week: 'Tuần này', month: 'Tháng này', quarter: 'Quý này', year: 'Năm nay' };
            const isActive = filterPeriod === p;
            return (
              <button
                key={p}
                onClick={() => setFilterPeriod(p)}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                  isActive 
                    ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-md transform scale-105' 
                    : 'text-slate-500 hover:text-slate-900 hover:bg-gray-100'
                }`}
              >
                {labels[p]}
              </button>
            );
          })}
        </div>
      </div>

      {/* PODIUM SECTION - Redesigned with Trophy Metaphor */}
      <div className="relative mb-20 px-4">
        {/* Background Glow - Teal/Gold */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-64 bg-gradient-to-r from-teal-50 via-yellow-50 to-teal-50 rounded-[100%] blur-3xl opacity-60 -z-10"></div>

        <div className="flex flex-col md:flex-row items-end justify-center gap-4 md:gap-8">
          
          {/* Rank 2 (Silver) */}
          {top3[1] && (
            <div className="order-2 md:order-1 flex-1 max-w-[280px] flex flex-col justify-end group cursor-pointer" onClick={() => {}}>
              <div className="text-center mb-3 transition-transform duration-300 group-hover:-translate-y-2">
                <div className="relative inline-block">
                  <div className="w-24 h-24 rounded-full border-4 border-slate-300 overflow-hidden shadow-lg mx-auto bg-white">
                    <img src={top3[1].avatar} className="w-full h-full object-cover" alt="Rank 2" />
                  </div>
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-slate-200 text-slate-700 text-xs font-bold px-3 py-0.5 rounded-full border border-white shadow-sm">
                    Rank 2
                  </div>
                </div>
                <div className="mt-5">
                  <h3 className="font-bold text-slate-900 text-lg truncate px-2">{top3[1].firstName} {top3[1].lastName}</h3>
                  <div className="flex items-center justify-center text-slate-500 text-sm font-medium">
                    <MapPinIcon className="w-3 h-3 mr-1" /> {top3[1].city}
                  </div>
                </div>
              </div>
              
              {/* Pedestal 2 */}
              <div className="h-44 bg-gradient-to-b from-slate-100 to-white rounded-t-2xl border-t-4 border-slate-300 shadow-md relative flex flex-col items-center justify-center p-4 transform transition-all group-hover:shadow-xl">
                <div className="text-3xl font-display font-bold text-slate-800">{top3[1].totalDistance}</div>
                <div className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-2">Kilometers</div>
                <div className="bg-slate-200 text-slate-600 px-3 py-1 rounded-full text-xs font-bold flex items-center">
                   🥈 Silver
                </div>
              </div>
            </div>
          )}

          {/* Rank 1 (Gold) */}
          {top3[0] && (
            <div className="order-1 md:order-2 flex-1 max-w-[320px] z-10 flex flex-col justify-end group cursor-pointer -mt-8 md:mt-0" onClick={() => {}}>
              <div className="text-center mb-4 transition-transform duration-300 group-hover:-translate-y-3">
                <div className="relative inline-block">
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 text-yellow-500 drop-shadow-xl animate-bounce-slow">
                    {/* SVG Gradient Definition */}
                    <svg width="0" height="0">
                        <linearGradient id="crown-gradient" x1="100%" y1="100%" x2="0%" y2="0%">
                        <stop stopColor="#eab308" offset="0%" />
                        <stop stopColor="#f97316" offset="100%" />
                        </linearGradient>
                    </svg>
                    <Crown size={56} fill="url(#crown-gradient)" strokeWidth={1.5} className="text-orange-500" />
                  </div>
                  <div className="w-32 h-32 rounded-full border-4 border-yellow-400 overflow-hidden shadow-2xl mx-auto ring-4 ring-yellow-400/20 bg-white">
                    <img src={top3[0].avatar} className="w-full h-full object-cover" alt="Rank 1" />
                  </div>
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-4 py-1 rounded-full shadow-sm border border-white uppercase tracking-wider">
                    Champion
                  </div>
                </div>
                <div className="mt-6">
                  <h3 className="font-bold text-slate-900 text-xl truncate px-2">{top3[0].firstName} {top3[0].lastName}</h3>
                  <div className="flex items-center justify-center text-teal-600 text-sm font-bold bg-teal-50 inline-block px-3 py-0.5 rounded-full mt-1">
                    <Flame size={14} className="mr-1 fill-current text-orange-500 inline" /> {top3[0].streak} ngày streak
                  </div>
                </div>
              </div>

              {/* Pedestal 1 */}
              <div className="h-60 bg-gradient-to-b from-yellow-50 to-white rounded-t-2xl border-t-4 border-yellow-400 shadow-xl relative flex flex-col items-center justify-center p-6 transform transition-all group-hover:shadow-2xl hover:bg-yellow-50/30">
                <div className="text-5xl font-display font-bold text-slate-900 tracking-tight">{top3[0].totalDistance}</div>
                <div className="text-sm uppercase tracking-wider text-orange-600/80 font-bold mb-4">Kilometers</div>
                
                <div className="flex space-x-2">
                   <div className="px-3 py-1.5 bg-white border border-yellow-100 rounded-lg text-xs text-slate-500 font-bold shadow-sm">
                     Pace {top3[0].badges.length > 0 ? '4:30' : '5:00'}
                   </div>
                   <div className="px-3 py-1.5 bg-white border border-yellow-100 rounded-lg text-xs text-slate-500 font-bold shadow-sm">
                     {Math.floor(top3[0].totalDistance * 12)}m Elev
                   </div>
                </div>
              </div>
            </div>
          )}

          {/* Rank 3 (Bronze) */}
          {top3[2] && (
            <div className="order-3 md:order-3 flex-1 max-w-[280px] flex flex-col justify-end group cursor-pointer" onClick={() => {}}>
              <div className="text-center mb-3 transition-transform duration-300 group-hover:-translate-y-2">
                <div className="relative inline-block">
                  <div className="w-24 h-24 rounded-full border-4 border-amber-600 overflow-hidden shadow-lg mx-auto bg-white">
                    <img src={top3[2].avatar} className="w-full h-full object-cover" alt="Rank 3" />
                  </div>
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-amber-100 text-amber-800 text-xs font-bold px-3 py-0.5 rounded-full border border-white shadow-sm">
                    Rank 3
                  </div>
                </div>
                <div className="mt-5">
                  <h3 className="font-bold text-slate-900 text-lg truncate px-2">{top3[2].firstName} {top3[2].lastName}</h3>
                  <div className="flex items-center justify-center text-slate-500 text-sm font-medium">
                    <MapPinIcon className="w-3 h-3 mr-1" /> {top3[2].city}
                  </div>
                </div>
              </div>

              {/* Pedestal 3 */}
              <div className="h-36 bg-gradient-to-b from-orange-50 to-white rounded-t-2xl border-t-4 border-amber-600 shadow-md relative flex flex-col items-center justify-center p-4 transform transition-all group-hover:shadow-xl">
                <div className="text-3xl font-display font-bold text-slate-800">{top3[2].totalDistance}</div>
                <div className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-2">Kilometers</div>
                <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-xs font-bold flex items-center">
                   🥉 Bronze
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Secondary Controls & Table */}
      <div className="flex flex-col sm:flex-row justify-between items-end mb-6 px-2 gap-4">
         <div>
            <h2 className="text-xl font-bold text-slate-800">Bảng xếp hạng chi tiết</h2>
            <p className="text-sm text-slate-500">Cập nhật 15 phút trước</p>
         </div>
         <div className="flex space-x-2">
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white border border-gray-200 text-slate-700 py-2 px-4 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-teal-500 shadow-sm"
            >
              <option value="distance">Sắp xếp: Quãng đường</option>
              <option value="performance">Sắp xếp: Điểm hiệu suất</option>
              <option value="elevation">Sắp xếp: Leo núi (Gain)</option>
            </select>
         </div>
      </div>

      <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider w-16 text-center">#</th>
                <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Vận động viên</th>
                <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Quãng đường</th>
                <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider text-right hidden md:table-cell">Độ cao</th>
                <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider text-right hidden sm:table-cell">Điểm</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {restRunners.map((user) => (
                <tr key={user.id} className="hover:bg-teal-50/30 transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="font-bold text-slate-400 group-hover:text-teal-600 transition-colors">{user.rank}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img className="h-10 w-10 rounded-full border border-gray-200 group-hover:border-teal-300 transition-colors object-cover" src={user.avatar} alt="" />
                      <div className="ml-4">
                        <div className="text-sm font-bold text-slate-900 group-hover:text-teal-700 transition-colors">{user.firstName} {user.lastName}</div>
                        <div className="text-xs text-slate-500 flex items-center">
                           {user.city}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <span className="text-base font-bold text-slate-800">{user.totalDistance}</span> <span className="text-xs text-slate-400">km</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right hidden md:table-cell text-sm text-slate-600">
                    {user.elevation} m
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right hidden sm:table-cell">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-600 group-hover:bg-yellow-100 group-hover:text-yellow-800 transition-colors">
                      {user.performanceScore} pts
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Mock */}
        <div className="bg-slate-50 px-6 py-4 border-t border-gray-100 flex justify-between items-center">
           <span className="text-xs text-slate-500">Hiển thị {leaderboardData.length} kết quả</span>
           <div className="flex space-x-2">
              <button className="px-3 py-1 bg-white border border-gray-200 rounded-lg text-sm text-slate-400 cursor-not-allowed">Trước</button>
              <button className="px-3 py-1 bg-white border border-gray-200 rounded-lg text-sm text-slate-600 hover:bg-white hover:text-teal-600 hover:border-teal-200 transition-colors">Sau</button>
           </div>
        </div>
      </div>
    </div>
  );
};

// Helper component for icon
const MapPinIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
);

export default Leaderboard;