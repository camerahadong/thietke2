import React from 'react';
import { ACTIVITIES, EVENTS, USERS } from '../constants';
import { Calendar, MapPin, Clock, Trophy, ChevronRight, Heart, MessageCircle, Share2, Activity as ActivityIcon, Zap, Mountain } from 'lucide-react';

interface ActivitiesProps {
  onJoin: () => void;
  onNavigate: (page: string) => void;
}

const Activities: React.FC<ActivitiesProps> = ({ onJoin, onNavigate }) => {
  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    return h > 0 ? `${h}h ${m}m` : `${m}m`;
  };

  return (
    <div className="animate-fade-in bg-black min-h-screen bg-grid text-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="mb-12 border-b-4 border-white pb-6">
          <h1 className="text-5xl md:text-7xl font-oswald font-bold uppercase tracking-tighter text-neon">
            Activity Feed
          </h1>
          <p className="text-zinc-400 font-inter mt-2 text-lg">
            See what the club is up to. Track, cheer, and dominate.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Main Content: Activity Timeline */}
          <div className="lg:w-2/3">
            <div className="space-y-12 relative before:absolute before:inset-0 before:ml-[3.5rem] md:before:ml-[3.5rem] before:h-full before:w-1 before:bg-zinc-800 z-0">
              {ACTIVITIES.map((activity, idx) => {
                const user = USERS.find(u => u.id === activity.userId);
                if (!user) return null;

                return (
                  <div key={activity.id} className="relative pl-24 md:pl-32 group">
                    {/* Timeline Node */}
                    <div className="absolute left-10 md:left-10 top-0 mt-4 h-8 w-8 rounded-none border-4 border-black bg-neon shadow-[0_0_15px_rgba(204,255,0,0.5)] z-10 rotate-45"></div>

                    <div className="bg-zinc-900 border-2 border-zinc-800 hover:border-neon transition-colors duration-300 p-6 relative overflow-hidden athletic-shadow">
                      {/* Decorative Track Lines */}
                      <div className="absolute top-0 right-0 w-32 h-full track-lines opacity-10 pointer-events-none"></div>

                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-6 relative z-10 gap-4">
                        <div className="flex items-center gap-4">
                          <img src={user.avatar} alt="Avatar" className="w-12 h-12 border-2 border-white object-cover grayscale group-hover:grayscale-0 transition-all" />
                          <div>
                            <div className="flex items-center space-x-2">
                               <h3 className="font-oswald font-bold text-white text-xl uppercase tracking-wide hover:text-neon transition-colors cursor-pointer">
                                 {user.firstName} {user.lastName}
                               </h3>
                               {user.level >= 5 && <Zap size={16} className="text-brand-orange fill-current" />}
                            </div>
                            <p className="text-sm text-zinc-400 font-inter mt-1 flex items-center">
                               {new Date(activity.date).toLocaleString('vi-VN', { hour: '2-digit', minute:'2-digit', day: 'numeric', month: 'numeric' })}
                               <span className="mx-2 text-zinc-600">/</span>
                               <span className="text-neon uppercase font-bold text-xs">{activity.type === 'Run' ? 'Run' : 'Trail'}</span>
                            </p>
                          </div>
                        </div>
                        <div className="bg-white text-black px-3 py-1 font-oswald font-bold uppercase text-sm inline-block self-start">
                           {activity.name}
                        </div>
                      </div>

                      {/* Main Stats Row */}
                      <div className="flex items-end space-x-2 mb-8 border-b-2 border-zinc-800 pb-6">
                         <span className="text-6xl md:text-7xl font-oswald font-bold text-white tracking-tighter leading-none">{activity.distance}</span>
                         <span className="text-xl font-oswald font-bold text-brand-orange uppercase mb-2">km</span>
                      </div>

                      {/* Secondary Stats Grid */}
                      <div className="grid grid-cols-3 gap-4 mb-8">
                         <div className="p-4 bg-black border border-zinc-800">
                            <div className="flex items-center text-zinc-500 text-xs font-oswald font-bold uppercase tracking-wider mb-2">
                               <Clock size={14} className="mr-2 text-neon" /> Time
                            </div>
                            <div className="font-oswald font-bold text-2xl text-white">{formatTime(activity.movingTime)}</div>
                         </div>
                         <div className="p-4 bg-black border border-zinc-800">
                            <div className="flex items-center text-zinc-500 text-xs font-oswald font-bold uppercase tracking-wider mb-2">
                               <Zap size={14} className="mr-2 text-neon" /> Pace
                            </div>
                            <div className="font-oswald font-bold text-2xl text-white">
                               {Math.floor(activity.averagePace / 60)}:{(activity.averagePace % 60).toString().padStart(2, '0')}
                            </div>
                         </div>
                         <div className="p-4 bg-black border border-zinc-800">
                            <div className="flex items-center text-zinc-500 text-xs font-oswald font-bold uppercase tracking-wider mb-2">
                               <Mountain size={14} className="mr-2 text-neon" /> Elev
                            </div>
                            <div className="font-oswald font-bold text-2xl text-white">{activity.elevationGain}m</div>
                         </div>
                      </div>

                      {/* Interactive Footer */}
                      <div className="flex items-center justify-between pt-2">
                         <div className="flex items-center gap-3">
                            <button className={`flex items-center gap-2 font-oswald font-bold uppercase text-sm transition-colors ${activity.kudos > 0 ? 'text-brand-orange' : 'text-zinc-500 hover:text-brand-orange'}`}>
                               <Heart size={20} className={activity.kudos > 0 ? 'fill-current' : ''} />
                               <span>{activity.kudos} Kudos</span>
                            </button>
                         </div>
                         
                         <button className="flex items-center gap-2 text-zinc-500 hover:text-white font-oswald font-bold uppercase text-sm transition-colors">
                            <MessageCircle size={20} />
                            <span>Comment</span>
                         </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sidebar - Sticky */}
          <div className="lg:w-1/3 space-y-8 lg:sticky lg:top-24 h-fit">
            
            {/* Promo Card */}
            <div className="bg-brand-orange p-8 text-black relative overflow-hidden athletic-shadow">
               <div className="absolute top-0 right-0 w-full h-full track-lines opacity-20 pointer-events-none"></div>
               
               <div className="relative z-10">
                  <div className="inline-flex items-center justify-center bg-black text-white p-3 mb-6">
                     <Trophy size={24} />
                  </div>
                  <h3 className="text-3xl font-oswald font-bold uppercase tracking-tight mb-2">November Challenge</h3>
                  <p className="text-black/80 font-inter mb-6 font-medium">Crush 100km this month to earn the exclusive "Iron Legs" badge.</p>
                  
                  <div className="w-full bg-black/20 h-3 mb-2">
                     <div className="bg-black h-full w-2/3"></div>
                  </div>
                  <div className="flex justify-between text-sm font-oswald font-bold uppercase mb-8">
                     <span>Global Progress</span>
                     <span>65%</span>
                  </div>

                  <button onClick={() => onNavigate('challenges')} className="skew-container w-full bg-black text-white hover:bg-neon hover:text-black transition-colors">
                     <div className="skew-content py-4 font-oswald font-bold uppercase tracking-wider text-center w-full">
                        Join the Fight
                     </div>
                  </button>
               </div>
            </div>

            {/* Upcoming Events List */}
            <div className="bg-zinc-900 border-2 border-zinc-800 p-6 athletic-shadow">
               <h3 className="font-oswald font-bold text-2xl text-white uppercase tracking-tight mb-6 flex items-center border-b-2 border-zinc-800 pb-4">
                  <Calendar className="mr-3 text-neon" size={24} /> Upcoming
               </h3>
               <div className="space-y-4">
                  {EVENTS.slice(0, 3).map((event, i) => (
                     <div key={event.id} className="flex items-center p-4 bg-black border border-zinc-800 hover:border-neon transition-colors cursor-pointer group" onClick={() => onNavigate('events')}>
                        <div className="text-center mr-4 min-w-[60px] border-r-2 border-zinc-800 pr-4">
                           <div className="text-sm font-oswald font-bold text-neon uppercase">{new Date(event.date).toLocaleString('en-US', { month: 'short' })}</div>
                           <div className="text-2xl font-oswald font-bold text-white">{new Date(event.date).getDate()}</div>
                        </div>
                        <div className="flex-1">
                           <h4 className="font-oswald font-bold text-white text-lg uppercase tracking-wide group-hover:text-neon transition-colors line-clamp-1">{event.name}</h4>
                           <p className="text-sm text-zinc-500 font-inter mt-1 flex items-center">
                             <MapPin size={12} className="mr-1" /> {event.location}
                           </p>
                        </div>
                     </div>
                  ))}
               </div>
               <button onClick={() => onNavigate('events')} className="w-full mt-6 py-3 border-2 border-white text-white font-oswald font-bold uppercase hover:bg-white hover:text-black transition-colors">
                 View All Events
               </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Activities;