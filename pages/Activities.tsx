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
    <div className="animate-fade-in bg-[#F0F2F5] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Main Content: Activity Timeline */}
          <div className="lg:w-2/3">
            <div className="mb-8 flex items-center space-x-3">
               <div className="p-3 bg-teal-600 rounded-2xl shadow-lg shadow-teal-600/20">
                  <ActivityIcon className="text-white" size={24} />
               </div>
               <h2 className="text-3xl font-display font-bold text-slate-900">New Feed</h2>
            </div>

            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-8 before:-translate-x-px md:before:ml-8 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-teal-200 before:via-gray-200 before:to-transparent z-0">
              {ACTIVITIES.map((activity, idx) => {
                const user = USERS.find(u => u.id === activity.userId);
                if (!user) return null;

                return (
                  <div key={activity.id} className="relative pl-20 group">
                    {/* Timeline Connector */}
                    <div className="absolute left-4 top-0 -ml-px h-full w-0.5 bg-transparent"></div>
                    <div className="absolute left-2 top-0 mt-3 h-12 w-12 rounded-full border-4 border-[#F0F2F5] bg-white shadow-md flex items-center justify-center z-10 overflow-hidden">
                       <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
                    </div>

                    <div className="bg-white rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-300 border border-white p-6 relative overflow-hidden">
                      {/* Decorative BG */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-gray-50 to-teal-50 rounded-bl-[100px] -z-0 opacity-50"></div>

                      <div className="flex justify-between items-start mb-4 relative z-10">
                        <div>
                          <div className="flex items-center space-x-2">
                             <h3 className="font-bold text-slate-900 text-lg hover:text-teal-700 transition-colors cursor-pointer">{user.firstName} {user.lastName}</h3>
                             {user.level >= 5 && <Zap size={14} className="text-yellow-500 fill-current" />}
                          </div>
                          <p className="text-xs text-slate-400 font-medium mt-0.5 flex items-center">
                             {new Date(activity.date).toLocaleString('vi-VN', { hour: '2-digit', minute:'2-digit', day: 'numeric', month: 'numeric' })}
                             <span className="mx-2">•</span>
                             {activity.type === 'Run' ? 'Chạy bộ' : 'Trail'}
                          </p>
                        </div>
                        <div className="bg-slate-100 px-3 py-1 rounded-full text-xs font-bold text-slate-600">
                           {activity.name}
                        </div>
                      </div>

                      {/* Main Stats Row */}
                      <div className="flex items-end space-x-1 mb-6">
                         <span className="text-5xl font-display font-bold text-slate-800 tracking-tight">{activity.distance}</span>
                         <span className="text-sm font-bold text-slate-400 mb-2 uppercase">km</span>
                      </div>

                      {/* Secondary Stats Grid */}
                      <div className="grid grid-cols-3 gap-2 mb-6">
                         <div className="p-3 bg-[#F8FAFC] rounded-2xl">
                            <div className="flex items-center text-slate-400 text-xs font-bold uppercase mb-1">
                               <Clock size={12} className="mr-1" /> Time
                            </div>
                            <div className="font-mono font-bold text-slate-700">{formatTime(activity.movingTime)}</div>
                         </div>
                         <div className="p-3 bg-[#F8FAFC] rounded-2xl">
                            <div className="flex items-center text-slate-400 text-xs font-bold uppercase mb-1">
                               <Zap size={12} className="mr-1" /> Pace
                            </div>
                            <div className="font-mono font-bold text-slate-700">
                               {Math.floor(activity.averagePace / 60)}:{(activity.averagePace % 60).toString().padStart(2, '0')}
                            </div>
                         </div>
                         <div className="p-3 bg-[#F8FAFC] rounded-2xl">
                            <div className="flex items-center text-slate-400 text-xs font-bold uppercase mb-1">
                               <Mountain size={12} className="mr-1" /> Elev
                            </div>
                            <div className="font-mono font-bold text-slate-700">{activity.elevationGain}m</div>
                         </div>
                      </div>

                      {/* Interactive Footer */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                         <div className="flex -space-x-2">
                            {[1,2,3].map(i => (
                               <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-gray-200" />
                            ))}
                            <div className="pl-3 text-xs text-slate-400 flex items-center">+{activity.kudos} người khác</div>
                         </div>
                         
                         <div className="flex space-x-3">
                            <button className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${activity.kudos > 0 ? 'bg-red-50 text-red-500' : 'bg-gray-50 text-slate-400 hover:bg-red-50 hover:text-red-500'}`}>
                               <Heart size={20} className={activity.kudos > 0 ? 'fill-current' : ''} />
                            </button>
                            <button className="w-10 h-10 rounded-full bg-gray-50 text-slate-400 flex items-center justify-center hover:bg-teal-50 hover:text-teal-600 transition-all">
                               <MessageCircle size={20} />
                            </button>
                         </div>
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
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[2rem] p-8 text-white relative overflow-hidden shadow-2xl">
               <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500 rounded-full blur-[80px] opacity-20 -mr-16 -mt-16 pointer-events-none"></div>
               
               <div className="relative z-10">
                  <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6">
                     <Trophy className="text-yellow-400" size={24} />
                  </div>
                  <h3 className="text-2xl font-display font-bold mb-2">Thử thách tháng 11</h3>
                  <p className="text-slate-400 mb-6 text-sm leading-relaxed">Hoàn thành 100km để nhận huy hiệu "Iron Legs" độc quyền.</p>
                  
                  <div className="w-full bg-white/10 rounded-full h-2 mb-2">
                     <div className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full w-2/3"></div>
                  </div>
                  <div className="flex justify-between text-xs text-slate-400 mb-6">
                     <span>Tiến độ chung</span>
                     <span>65%</span>
                  </div>

                  <button onClick={() => onNavigate('challenges')} className="w-full py-3 bg-white text-slate-900 font-bold rounded-xl hover:bg-teal-50 transition-colors">
                     Tham gia ngay
                  </button>
               </div>
            </div>

            {/* Upcoming Events List */}
            <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100">
               <h3 className="font-bold text-slate-900 mb-4 flex items-center">
                  <Calendar className="mr-2 text-teal-600" size={20} /> Sắp diễn ra
               </h3>
               <div className="space-y-1">
                  {EVENTS.slice(0, 3).map((event, i) => (
                     <div key={event.id} className="flex items-center p-3 hover:bg-slate-50 rounded-2xl transition-colors cursor-pointer group" onClick={() => onNavigate('events')}>
                        <div className="text-center mr-4 min-w-[50px]">
                           <div className="text-xs font-bold text-slate-400 uppercase">{new Date(event.date).toLocaleString('en-US', { month: 'short' })}</div>
                           <div className="text-xl font-bold text-slate-900 group-hover:text-teal-600 transition-colors">{new Date(event.date).getDate()}</div>
                        </div>
                        <div className="flex-1 border-l border-gray-100 pl-4">
                           <h4 className="font-bold text-slate-800 text-sm line-clamp-1">{event.name}</h4>
                           <p className="text-xs text-slate-500 mt-0.5">{event.location}</p>
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

export default Activities;