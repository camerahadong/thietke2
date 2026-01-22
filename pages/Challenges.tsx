import React from 'react';
import { CHALLENGES } from '../constants';
import { Target, Calendar, Users, ChevronRight, Zap } from 'lucide-react';

interface ChallengesProps {
  onNavigate: (page: string, params?: any) => void;
}

const Challenges: React.FC<ChallengesProps> = ({ onNavigate }) => {
  const activeChallenges = CHALLENGES.filter(c => c.status === 'Active');
  
  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Dark Hero Header */}
      <div className="bg-[#0F172A] pt-24 pb-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden rounded-b-[3rem]">
         <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
         <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-teal-600 to-transparent opacity-20 rounded-full blur-[80px] pointer-events-none"></div>
         
         <div className="max-w-7xl mx-auto relative z-10 text-center">
            <div className="inline-flex items-center justify-center p-3 bg-white/10 backdrop-blur-md rounded-xl mb-6 border border-white/10">
               <Target className="text-teal-400" size={24} />
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 tracking-tight">
               VƯỢT QUA <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">GIỚI HẠN</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto font-light">
               Tham gia các thử thách độc quyền để rèn luyện kỷ luật và nhận những phần thưởng giá trị.
            </p>
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20">
         
         {/* Featured Challenge (First Active) */}
         {activeChallenges.length > 0 && (
            <div className="bg-white rounded-[2.5rem] shadow-2xl p-2 mb-16 border border-gray-100 cursor-pointer group" onClick={() => onNavigate('challenge-detail', { id: activeChallenges[0].id })}>
               <div className="relative h-[400px] rounded-[2rem] overflow-hidden">
                  <img src={activeChallenges[0].imageUrl} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" alt="Featured" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  
                  <div className="absolute bottom-0 left-0 w-full p-8 md:p-12">
                     <div className="flex items-center space-x-3 mb-4">
                        <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-lg uppercase tracking-wider shadow-lg animate-pulse">Featured</span>
                        <span className="text-white/80 text-sm font-medium flex items-center"><Calendar size={14} className="mr-1" /> Ends {activeChallenges[0].endDate}</span>
                     </div>
                     <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">{activeChallenges[0].title}</h2>
                     <div className="flex items-center justify-between">
                        <div className="flex -space-x-3">
                           {[1,2,3,4].map(i => <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-300" />)}
                           <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-900 text-white flex items-center justify-center text-xs font-bold">+{activeChallenges[0].participants}</div>
                        </div>
                        <button className="bg-white text-slate-900 px-6 py-3 rounded-xl font-bold flex items-center hover:bg-teal-50 transition-colors">
                           Chi tiết <ChevronRight size={18} className="ml-2" />
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         )}

         {/* Other Challenges Grid */}
         <div className="mb-8">
            <h3 className="text-2xl font-bold text-slate-900 mb-8 flex items-center">
               <Zap className="text-yellow-500 mr-2 fill-current" /> Thử thách khác
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {CHALLENGES.slice(1).map(challenge => (
                  <div key={challenge.id} className="bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group cursor-pointer" onClick={() => onNavigate('challenge-detail', { id: challenge.id })}>
                     <div className="h-48 relative overflow-hidden">
                        <img src={challenge.imageUrl} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" alt={challenge.title} />
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-lg text-xs font-bold text-slate-900 uppercase">
                           {challenge.type}
                        </div>
                        {challenge.status === 'Completed' && (
                           <div className="absolute inset-0 bg-slate-900/60 flex items-center justify-center">
                              <span className="text-white font-bold border-2 border-white px-4 py-2 rounded-lg uppercase tracking-widest">Ended</span>
                           </div>
                        )}
                     </div>
                     <div className="p-6 flex-1 flex flex-col">
                        <h4 className="text-xl font-bold text-slate-900 mb-2 leading-tight group-hover:text-teal-700 transition-colors">{challenge.title}</h4>
                        <div className="text-sm text-slate-500 mb-6 flex-1">{challenge.description}</div>
                        
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
                           <div className="flex items-center text-xs font-bold text-slate-400">
                              <Target size={14} className="mr-1 text-teal-500" /> {challenge.targetDistance} km
                           </div>
                           <div className="flex items-center text-xs font-bold text-slate-400">
                              <Users size={14} className="mr-1 text-blue-500" /> {challenge.participants}
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