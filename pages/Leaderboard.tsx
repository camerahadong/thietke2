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
    <div className="bg-black min-h-screen bg-grid text-white pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in">
        
        {/* Page Title */}
        <div className="text-center mb-16 border-b-4 border-white pb-8">
          <h1 className="text-6xl md:text-8xl font-oswald font-bold uppercase tracking-tighter text-neon leading-none">
            Leaderboard
          </h1>
          <p className="text-zinc-400 mt-4 text-lg md:text-xl font-inter uppercase tracking-widest font-bold">
            Honor the relentless warriors of VN RunClub.
          </p>
        </div>

        {/* Main Controls - Brutalist Tabs */}
        <div className="flex flex-col md:flex-row justify-center items-center mb-24 space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex flex-wrap justify-center gap-2">
            {(['week', 'month', 'quarter', 'year'] as const).map((p) => {
              const labels: Record<string, string> = { week: 'This Week', month: 'This Month', quarter: 'This Quarter', year: 'This Year' };
              const isActive = filterPeriod === p;
              return (
                <button
                  key={p}
                  onClick={() => setFilterPeriod(p)}
                  className={`px-6 py-3 font-oswald font-bold uppercase tracking-wider text-sm transition-all duration-300 border-2 ${
                    isActive 
                      ? 'bg-neon text-black border-neon athletic-shadow' 
                      : 'bg-black text-zinc-400 border-zinc-800 hover:border-white hover:text-white'
                  }`}
                >
                  {labels[p]}
                </button>
              );
            })}
          </div>
        </div>

        {/* PODIUM SECTION - Brutalist Redesign */}
        <div className="relative mb-32 px-4">
          <div className="flex flex-row items-end justify-center gap-2 md:gap-6 h-[400px] md:h-auto">
            
            {/* Rank 2 (Silver) */}
            {top3[1] && (
              <div className="order-1 flex-1 max-w-[280px] flex flex-col justify-end group cursor-pointer">
                <div className="text-center mb-4 transition-transform duration-300 group-hover:-translate-y-2">
                  <div className="relative inline-block">
                    <div className="w-20 h-20 md:w-28 md:h-28 border-4 border-zinc-400 overflow-hidden mx-auto bg-black athletic-shadow">
                      <img src={top3[1].avatar} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" alt="Rank 2" loading="lazy" />
                    </div>
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-zinc-400 text-black text-xs md:text-sm font-oswald font-bold px-4 py-1 uppercase tracking-widest border-2 border-black">
                      Rank 2
                    </div>
                  </div>
                  <div className="mt-8">
                    <h3 className="font-oswald font-bold text-white text-lg md:text-2xl uppercase tracking-tight truncate px-1">{top3[1].firstName} <span className="hidden md:inline">{top3[1].lastName}</span></h3>
                    <div className="hidden md:flex items-center justify-center text-zinc-500 text-sm font-inter mt-1">
                      <MapPinIcon className="w-4 h-4 mr-1" /> {top3[1].city}
                    </div>
                  </div>
                </div>
                
                {/* Pedestal 2 */}
                <div className="h-40 md:h-56 bg-zinc-900 border-t-8 border-zinc-400 relative flex flex-col items-center justify-center p-2 md:p-4 transition-all athletic-shadow">
                  <div className="text-3xl md:text-5xl font-oswald font-bold text-white tracking-tighter">{top3[1].totalDistance}</div>
                  <div className="text-xs md:text-sm uppercase tracking-widest text-zinc-500 font-oswald font-bold mb-2">km</div>
                  <div className="bg-zinc-800 text-zinc-300 px-3 py-1 text-xs font-oswald font-bold uppercase tracking-widest border border-zinc-700">
                     Silver
                  </div>
                </div>
              </div>
            )}

            {/* Rank 1 (Gold) */}
            {top3[0] && (
              <div className="order-2 flex-1 max-w-[320px] z-10 flex flex-col justify-end group cursor-pointer -mt-8 md:mt-0">
                <div className="text-center mb-6 transition-transform duration-300 group-hover:-translate-y-3">
                  <div className="relative inline-block">
                    <div className="absolute -top-10 md:-top-14 left-1/2 -translate-x-1/2 text-brand-orange drop-shadow-xl animate-bounce-slow">
                      <Crown size={48} className="md:w-[64px] md:h-[64px]" fill="currentColor" strokeWidth={1.5} />
                    </div>
                    <div className="w-28 h-28 md:w-40 md:h-40 border-4 border-brand-orange overflow-hidden mx-auto bg-black athletic-shadow">
                      <img src={top3[0].avatar} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" alt="Rank 1" loading="lazy" />
                    </div>
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-brand-orange text-black text-xs md:text-sm font-oswald font-bold px-6 py-1 border-2 border-black uppercase tracking-widest whitespace-nowrap">
                      Champion
                    </div>
                  </div>
                  <div className="mt-10">
                    <h3 className="font-oswald font-bold text-white text-xl md:text-3xl uppercase tracking-tight truncate px-1">{top3[0].firstName} <span className="hidden md:inline">{top3[0].lastName}</span></h3>
                    <div className="flex items-center justify-center text-neon text-xs md:text-sm font-oswald font-bold uppercase tracking-widest bg-zinc-900 border border-zinc-800 inline-block px-3 py-1 mt-2">
                      <Flame size={14} className="mr-1 fill-current text-brand-orange inline" /> {top3[0].streak} Day Streak
                    </div>
                  </div>
                </div>

                {/* Pedestal 1 */}
                <div className="h-56 md:h-72 bg-zinc-900 border-t-8 border-brand-orange relative flex flex-col items-center justify-center p-4 md:p-6 transition-all athletic-shadow">
                  <div className="text-5xl md:text-7xl font-oswald font-bold text-white tracking-tighter leading-none">{top3[0].totalDistance}</div>
                  <div className="text-sm md:text-base uppercase tracking-widest text-brand-orange font-oswald font-bold mb-6 mt-2">Kilometers</div>
                  
                  <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
                     <div className="px-3 py-1.5 bg-black border border-zinc-800 text-xs text-zinc-400 font-oswald font-bold uppercase tracking-widest whitespace-nowrap">
                       Pace {top3[0].badges.length > 0 ? '4:30' : '5:00'}
                     </div>
                     <div className="px-3 py-1.5 bg-black border border-zinc-800 text-xs text-zinc-400 font-oswald font-bold uppercase tracking-widest whitespace-nowrap">
                       {Math.floor(top3[0].totalDistance * 12)}m Elev
                     </div>
                  </div>
                </div>
              </div>
            )}

            {/* Rank 3 (Bronze) */}
            {top3[2] && (
              <div className="order-3 flex-1 max-w-[280px] flex flex-col justify-end group cursor-pointer">
                <div className="text-center mb-4 transition-transform duration-300 group-hover:-translate-y-2">
                  <div className="relative inline-block">
                    <div className="w-20 h-20 md:w-28 md:h-28 border-4 border-amber-700 overflow-hidden mx-auto bg-black athletic-shadow">
                      <img src={top3[2].avatar} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" alt="Rank 3" loading="lazy" />
                    </div>
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-amber-700 text-white text-xs md:text-sm font-oswald font-bold px-4 py-1 uppercase tracking-widest border-2 border-black">
                      Rank 3
                    </div>
                  </div>
                  <div className="mt-8">
                    <h3 className="font-oswald font-bold text-white text-lg md:text-2xl uppercase tracking-tight truncate px-1">{top3[2].firstName} <span className="hidden md:inline">{top3[2].lastName}</span></h3>
                    <div className="hidden md:flex items-center justify-center text-zinc-500 text-sm font-inter mt-1">
                      <MapPinIcon className="w-4 h-4 mr-1" /> {top3[2].city}
                    </div>
                  </div>
                </div>

                {/* Pedestal 3 */}
                <div className="h-32 md:h-44 bg-zinc-900 border-t-8 border-amber-700 relative flex flex-col items-center justify-center p-2 md:p-4 transition-all athletic-shadow">
                  <div className="text-3xl md:text-5xl font-oswald font-bold text-white tracking-tighter">{top3[2].totalDistance}</div>
                  <div className="text-xs md:text-sm uppercase tracking-widest text-zinc-500 font-oswald font-bold mb-2">km</div>
                  <div className="bg-zinc-800 text-zinc-300 px-3 py-1 text-xs font-oswald font-bold uppercase tracking-widest border border-zinc-700">
                     Bronze
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Secondary Controls & Table */}
        <div className="flex flex-col sm:flex-row justify-between items-end mb-8 px-2 gap-4 border-b-2 border-zinc-800 pb-4">
           <div>
              <h2 className="text-3xl font-oswald font-bold text-white uppercase tracking-tight">Full Standings</h2>
              <p className="text-sm text-zinc-500 font-inter mt-1">Updated 15 mins ago</p>
           </div>
           <div className="flex space-x-2 w-full sm:w-auto">
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full sm:w-auto bg-black border-2 border-zinc-800 text-white py-2 px-4 font-oswald font-bold uppercase tracking-wider text-sm outline-none focus:border-neon transition-colors appearance-none cursor-pointer"
              >
                <option value="distance">Sort: Distance</option>
                <option value="performance">Sort: Performance</option>
                <option value="elevation">Sort: Elevation</option>
              </select>
           </div>
        </div>

        <div className="bg-zinc-950 border-2 border-zinc-800 overflow-hidden athletic-shadow">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead className="bg-zinc-900 border-b-2 border-zinc-800">
                <tr>
                  <th className="px-4 md:px-6 py-4 text-xs font-oswald font-bold text-zinc-400 uppercase tracking-widest w-12 md:w-16 text-center">#</th>
                  <th className="px-4 md:px-6 py-4 text-xs font-oswald font-bold text-zinc-400 uppercase tracking-widest text-left">Athlete</th>
                  <th className="px-4 md:px-6 py-4 text-xs font-oswald font-bold text-zinc-400 uppercase tracking-widest text-right">Distance</th>
                  <th className="px-4 md:px-6 py-4 text-xs font-oswald font-bold text-zinc-400 uppercase tracking-widest text-right hidden md:table-cell">Elevation</th>
                  <th className="px-4 md:px-6 py-4 text-xs font-oswald font-bold text-zinc-400 uppercase tracking-widest text-right hidden sm:table-cell">Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {restRunners.map((user) => (
                  <tr key={user.id} className="hover:bg-zinc-900 transition-colors group">
                    <td className="px-4 md:px-6 py-4 whitespace-nowrap text-center">
                      <span className="font-oswald font-bold text-zinc-500 text-lg group-hover:text-neon transition-colors">{user.rank}</span>
                    </td>
                    <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img className="h-10 w-10 md:h-12 md:w-12 border border-zinc-700 group-hover:border-neon transition-colors object-cover grayscale group-hover:grayscale-0" src={user.avatar} alt="" loading="lazy" />
                        <div className="ml-4">
                          <div className="text-base font-oswald font-bold text-white uppercase tracking-wide group-hover:text-neon transition-colors">{user.firstName} {user.lastName}</div>
                          <div className="text-xs text-zinc-500 font-inter flex items-center mt-0.5">
                             {user.city}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 md:px-6 py-4 whitespace-nowrap text-right">
                      <span className="text-xl font-oswald font-bold text-white">{user.totalDistance}</span> <span className="text-xs font-oswald font-bold text-brand-orange uppercase">km</span>
                    </td>
                    <td className="px-4 md:px-6 py-4 whitespace-nowrap text-right hidden md:table-cell text-sm font-oswald font-bold text-zinc-400">
                      {user.elevation} m
                    </td>
                    <td className="px-4 md:px-6 py-4 whitespace-nowrap text-right hidden sm:table-cell">
                      <span className="inline-flex items-center px-3 py-1 text-xs font-oswald font-bold uppercase tracking-widest bg-black border border-zinc-800 text-zinc-400 group-hover:border-neon group-hover:text-neon transition-colors">
                        {user.performanceScore} pts
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination Mock */}
          <div className="bg-zinc-900 px-6 py-4 border-t-2 border-zinc-800 flex justify-between items-center">
             <span className="text-xs font-oswald font-bold uppercase tracking-widest text-zinc-500">Showing {leaderboardData.length} results</span>
             <div className="flex space-x-2">
                <button className="px-4 py-2 bg-black border border-zinc-800 text-xs font-oswald font-bold uppercase tracking-widest text-zinc-600 cursor-not-allowed">Prev</button>
                <button className="px-4 py-2 bg-black border border-zinc-800 text-xs font-oswald font-bold uppercase tracking-widest text-white hover:border-neon hover:text-neon transition-colors">Next</button>
             </div>
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