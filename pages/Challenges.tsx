import React from 'react';
import { CHALLENGES } from '../constants';
import { Target, Calendar, Users, ChevronRight, Zap } from 'lucide-react';

interface ChallengesProps {
  onNavigate: (page: string, params?: any) => void;
}

const Challenges: React.FC<ChallengesProps> = ({ onNavigate }) => {
  const activeChallenges = CHALLENGES.filter(c => c.status === 'Active');
  
  return (
    <div className="bg-black min-h-screen pb-20 bg-grid text-white">
      {/* Dark Hero Header */}
      <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden border-b-4 border-white">
         <div className="absolute top-0 right-0 w-full h-full track-lines opacity-20 pointer-events-none"></div>
         
         <div className="max-w-7xl mx-auto relative z-10">
            <div className="inline-flex items-center justify-center p-4 bg-neon text-black mb-8 athletic-shadow">
               <Target size={32} />
            </div>
            <h1 className="text-6xl md:text-8xl font-oswald font-bold text-white mb-6 tracking-tighter uppercase leading-none">
               Push Your <br/><span className="text-neon">Limits</span>
            </h1>
            <p className="text-xl text-zinc-400 max-w-2xl font-inter">
               Join exclusive challenges to build discipline, crush your goals, and earn the ultimate bragging rights.
            </p>
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 relative z-20">
         
         {/* Featured Challenge (First Active) */}
         {activeChallenges.length > 0 && (
            <div className="bg-zinc-900 border-4 border-white p-2 mb-24 cursor-pointer group athletic-shadow-hover transition-all duration-300" onClick={() => onNavigate('challenge-detail', { id: activeChallenges[0].id })}>
               <div className="relative h-[500px] overflow-hidden border-2 border-zinc-800">
                  <img src={activeChallenges[0].imageUrl} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transform group-hover:scale-105 transition-all duration-700" alt="Featured" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                  
                  <div className="absolute top-6 left-6 flex items-center space-x-3">
                     <span className="bg-brand-orange text-black font-oswald font-bold px-4 py-2 text-sm uppercase tracking-widest">Featured</span>
                     <span className="bg-black/50 backdrop-blur-sm border border-white/20 text-white font-oswald font-bold px-4 py-2 text-sm uppercase tracking-widest flex items-center"><Calendar size={16} className="mr-2 text-neon" /> Ends {activeChallenges[0].endDate}</span>
                  </div>

                  <div className="absolute bottom-0 left-0 w-full p-8 md:p-12">
                     <h2 className="text-5xl md:text-7xl font-oswald font-bold text-white mb-6 uppercase tracking-tighter leading-none group-hover:text-neon transition-colors">{activeChallenges[0].title}</h2>
                     <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                           <div className="flex -space-x-4">
                              {[1,2,3,4].map(i => <div key={i} className="w-12 h-12 rounded-none border-2 border-black bg-zinc-800" />)}
                              <div className="w-12 h-12 rounded-none border-2 border-black bg-neon text-black flex items-center justify-center font-oswald font-bold text-sm">+{activeChallenges[0].participants}</div>
                           </div>
                           <span className="text-zinc-400 font-oswald font-bold uppercase tracking-wider text-sm">Athletes Joined</span>
                        </div>
                        <button className="skew-container bg-white text-black hover:bg-brand-orange transition-colors">
                           <div className="skew-content px-8 py-4 font-oswald font-bold uppercase tracking-wider flex items-center text-lg">
                              View Details <ChevronRight size={24} className="ml-2" />
                           </div>
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         )}

         {/* Other Challenges Grid */}
         <div className="mb-24">
            <h3 className="text-4xl font-oswald font-bold text-white mb-12 uppercase tracking-tighter flex items-center border-b-4 border-zinc-800 pb-6">
               <Zap className="text-brand-orange mr-4" size={36} /> More Challenges
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {CHALLENGES.slice(1).map(challenge => (
                  <div key={challenge.id} className="bg-black border-2 border-zinc-800 hover:border-neon transition-all duration-300 overflow-hidden flex flex-col group cursor-pointer athletic-shadow-hover" onClick={() => onNavigate('challenge-detail', { id: challenge.id })}>
                     <div className="h-64 relative overflow-hidden border-b-2 border-zinc-800">
                        <img src={challenge.imageUrl} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transform group-hover:scale-110 transition-all duration-700" alt={challenge.title} />
                        <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 font-oswald font-bold uppercase text-xs tracking-widest border border-zinc-800">
                           {challenge.type}
                        </div>
                        {challenge.status === 'Completed' && (
                           <div className="absolute inset-0 bg-black/80 flex items-center justify-center backdrop-blur-sm">
                              <span className="text-white font-oswald font-bold border-4 border-white px-6 py-3 text-xl uppercase tracking-widest rotate-[-10deg]">Ended</span>
                           </div>
                        )}
                     </div>
                     <div className="p-8 flex-1 flex flex-col bg-zinc-950">
                        <h4 className="text-2xl font-oswald font-bold text-white mb-4 uppercase tracking-tight leading-none group-hover:text-neon transition-colors">{challenge.title}</h4>
                        <p className="text-zinc-400 font-inter mb-8 flex-1 line-clamp-3">{challenge.description}</p>
                        
                        <div className="grid grid-cols-2 gap-4 pt-6 border-t-2 border-zinc-800 mt-auto">
                           <div className="flex flex-col">
                              <span className="text-zinc-600 font-oswald font-bold uppercase text-xs tracking-widest mb-1">Target</span>
                              <div className="flex items-center font-oswald font-bold text-white text-lg">
                                 <Target size={18} className="mr-2 text-brand-orange" /> {challenge.targetDistance} km
                              </div>
                           </div>
                           <div className="flex flex-col">
                              <span className="text-zinc-600 font-oswald font-bold uppercase text-xs tracking-widest mb-1">Athletes</span>
                              <div className="flex items-center font-oswald font-bold text-white text-lg">
                                 <Users size={18} className="mr-2 text-neon" /> {challenge.participants}
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>

      </div>
    </div>
  );
};

export default Challenges;