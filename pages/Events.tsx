import React, { useState } from 'react';
import { EVENTS, USERS } from '../constants';
import { Event, EventRegistrant } from '../types';
import { Calendar, MapPin, Users, ArrowRight, Filter, Search, X, CheckCircle, Clock, Check, User as UserIcon } from 'lucide-react';

const Events: React.FC = () => {
  const [filter, setFilter] = useState('all');
  
  // Modal State
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [registrants, setRegistrants] = useState<EventRegistrant[]>([]);
  const [isRegistering, setIsRegistering] = useState(false);
  const [hasJoined, setHasJoined] = useState(false);

  const filteredEvents = EVENTS.filter(e => filter === 'all' || e.type === filter);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = 'https://images.unsplash.com/photo-1552674605-469523f9bc9d?auto=format&fit=crop&q=80&w=800';
  };

  const openModal = (event: Event) => {
    setSelectedEvent(event);
    setHasJoined(false);
    setIsRegistering(false);
    
    // Mock registrants specific to event
    const distances = event.distance.split(',').map(d => d.trim());
    const mockRegistrants: EventRegistrant[] = USERS.slice(0, 15).map((user, index) => {
        // Randomly decide if user joined this event
        if ((index + event.id.length) % 3 === 0) {
            return {
                user: user,
                distance: distances[index % distances.length],
                bib: `${(index + 1) * 100 + 55}`,
                registrationDate: '2023-10-15',
                status: 'Confirmed'
            };
        }
        return null;
    }).filter((item): item is EventRegistrant => item !== null);
    
    setRegistrants(mockRegistrants);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedEvent(null);
    document.body.style.overflow = 'unset';
  };

  const handleJoinEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEvent) return;
    
    // Add current user to list (Mocking USERS[0] as logged in user)
    const currentUser = USERS[0];
    const distances = selectedEvent.distance.split(',').map(d => d.trim());
    const selectedDistance = (document.getElementById('distance-select') as HTMLSelectElement)?.value || distances[0];

    const newRegistrant: EventRegistrant = {
        user: currentUser,
        distance: selectedDistance,
        bib: 'PENDING',
        registrationDate: new Date().toISOString().split('T')[0],
        status: 'Confirmed'
    };

    setRegistrants([newRegistrant, ...registrants]);
    setHasJoined(true);
    setIsRegistering(false);
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Header */}
      <div className="bg-[#0F172A] py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-teal-900/30 rounded-full blur-[100px] pointer-events-none translate-x-1/3 -translate-y-1/3"></div>
         <div className="max-w-7xl mx-auto relative z-10">
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6">GIẢI ĐẤU <br/> & SỰ KIỆN</h1>
            <p className="text-slate-400 text-lg max-w-2xl font-light">
               Cập nhật lịch thi đấu, đăng ký tham gia và cùng nhau chinh phục những cung đường đẹp nhất Việt Nam.
            </p>
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
         {/* Controls */}
         <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
            <div className="flex space-x-2 bg-gray-100 p-1.5 rounded-xl">
               {['all', 'Official', 'Training'].map((f) => (
                  <button
                     key={f}
                     onClick={() => setFilter(f)}
                     className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${
                        filter === f 
                        ? 'bg-white text-slate-900 shadow-md' 
                        : 'text-slate-500 hover:text-slate-900'
                     }`}
                  >
                     {f === 'all' ? 'Tất cả' : f === 'Official' ? 'Giải đấu' : 'Training'}
                  </button>
               ))}
            </div>
            
            <div className="relative group">
               <input type="text" placeholder="Tìm kiếm sự kiện..." className="pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 w-full md:w-64 transition-all focus:bg-white" />
               <Search className="absolute left-3 top-3.5 text-slate-400 group-hover:text-teal-500 transition-colors" size={18} />
            </div>
         </div>

         {/* Grid Layout */}
         <div className="grid grid-cols-1 gap-8">
            {filteredEvents.map((event) => (
               <div key={event.id} onClick={() => openModal(event)} className="group relative bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col md:flex-row h-auto md:h-80 cursor-pointer">
                  
                  {/* Date Ticket (Left Side) */}
                  <div className="hidden md:flex flex-col items-center justify-center w-32 bg-slate-50 border-r border-gray-100 p-4 flex-shrink-0">
                     <span className="text-sm font-bold text-slate-400 uppercase tracking-widest rotate-180 writing-vertical mb-4">
                        {new Date(event.date).toLocaleString('en-US', { weekday: 'long' })}
                     </span>
                     <div className="text-4xl font-display font-bold text-slate-900">{new Date(event.date).getDate()}</div>
                     <div className="text-teal-600 font-bold uppercase text-sm mt-1">{new Date(event.date).toLocaleString('en-US', { month: 'short' })}</div>
                  </div>

                  {/* Image (Middle/Top) */}
                  <div className="relative md:w-2/5 h-48 md:h-full overflow-hidden">
                     <div className="absolute inset-0 bg-teal-900/20 group-hover:bg-transparent transition-colors z-10"></div>
                     <img 
                        src={event.imageUrl} 
                        alt={event.name} 
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
                        onError={handleImageError}
                     />
                     <div className="absolute top-4 left-4 z-20 md:hidden bg-white/90 backdrop-blur px-3 py-1 rounded-lg text-xs font-bold uppercase">
                        {new Date(event.date).getDate()} {new Date(event.date).toLocaleString('en-US', { month: 'short' })}
                     </div>
                  </div>

                  {/* Content (Right/Bottom) */}
                  <div className="flex-1 p-8 flex flex-col justify-between relative">
                     {/* Floating Badge */}
                     <div className="absolute top-8 right-8">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                           event.type === 'Official' 
                           ? 'bg-yellow-50 text-yellow-700 border-yellow-200' 
                           : 'bg-blue-50 text-blue-700 border-blue-200'
                        }`}>
                           {event.type}
                        </span>
                     </div>

                     <div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-teal-700 transition-colors leading-tight max-w-md">
                           {event.name}
                        </h3>
                        <div className="space-y-3">
                           <div className="flex items-center text-slate-500 text-sm">
                              <MapPin size={18} className="mr-3 text-slate-400" /> {event.location}
                           </div>
                           <div className="flex items-center text-slate-500 text-sm">
                              <div className="w-4 h-4 mr-3.5 flex items-center justify-center text-[9px] font-bold border border-slate-400 rounded text-slate-400">KM</div> 
                              {event.distance}
                           </div>
                           <div className="flex items-center text-slate-500 text-sm">
                              <Users size={18} className="mr-3 text-slate-400" /> {event.registeredCount} members
                           </div>
                        </div>
                     </div>

                     <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
                        <div className="flex -space-x-2">
                           {[1,2,3,4].map(i => (
                              <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200" />
                           ))}
                        </div>
                        <button className="flex items-center space-x-2 text-slate-900 font-bold text-sm group/btn hover:text-teal-600 transition-colors">
                           <span>Đăng ký ngay</span>
                           <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center group-hover/btn:bg-teal-100 transition-colors">
                              <ArrowRight size={16} />
                           </div>
                        </button>
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </div>

      {/* EVENT DETAIL MODAL */}
      {selectedEvent && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={closeModal}></div>
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col animate-fade-in-up">
            
            <div className="relative h-64 sm:h-72 flex-shrink-0">
               <img src={selectedEvent.imageUrl} className="w-full h-full object-cover" onError={handleImageError} />
               <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent"></div>
               <button onClick={closeModal} className="absolute top-6 right-6 bg-black/20 hover:bg-black/40 text-white p-2 rounded-full backdrop-blur-md transition-colors border border-white/10">
                  <X size={24} />
               </button>
               <div className="absolute bottom-0 left-0 p-8 text-white w-full">
                  <div className="flex items-center space-x-3 mb-3">
                     <span className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider shadow-sm ${selectedEvent.type === 'Official' ? 'bg-yellow-500 text-slate-900' : 'bg-teal-500 text-white'}`}>{selectedEvent.type}</span>
                     <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center"><Calendar size={12} className="mr-1" /> {new Date(selectedEvent.date).toLocaleDateString('vi-VN')}</span>
                  </div>
                  <h2 className="text-3xl sm:text-5xl font-display font-bold leading-tight mb-2">{selectedEvent.name}</h2>
                  <div className="flex items-center text-slate-300 font-medium">
                     <MapPin size={18} className="mr-1.5 text-teal-400" /> {selectedEvent.location}
                  </div>
               </div>
            </div>

            <div className="flex flex-col md:flex-row flex-grow overflow-hidden">
               {/* Left: Info & Action */}
               <div className="w-full md:w-1/3 bg-slate-50 p-8 overflow-y-auto border-r border-gray-100">
                  <div className="space-y-6">
                     <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                        <div className="text-xs text-slate-400 uppercase tracking-wider font-bold mb-1">Cự ly thi đấu</div>
                        <div className="font-display font-bold text-slate-900 text-xl">{selectedEvent.distance}</div>
                     </div>
                     <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                        <div className="text-xs text-slate-400 uppercase tracking-wider font-bold mb-1">Thành viên tham gia</div>
                        <div className="font-display font-bold text-slate-900 text-xl flex items-center">
                           {registrants.length} <span className="text-sm font-sans font-normal text-slate-500 ml-1">runner</span>
                        </div>
                        <div className="flex -space-x-2 mt-3">
                           {registrants.slice(0, 5).map((reg, i) => (
                              <img key={i} src={reg.user.avatar} className="w-8 h-8 rounded-full border-2 border-white object-cover" />
                           ))}
                           {registrants.length > 5 && <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500">+{registrants.length - 5}</div>}
                        </div>
                     </div>
                  </div>

                  <div className="mt-8">
                    {!hasJoined ? (
                       !isRegistering ? (
                         <button onClick={() => setIsRegistering(true)} className="w-full py-4 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-bold rounded-xl shadow-xl shadow-orange-500/20 transition-all transform hover:-translate-y-1">
                            Đăng ký tham gia ngay
                         </button>
                       ) : (
                         <form onSubmit={handleJoinEvent} className="bg-white p-6 rounded-2xl shadow-lg border border-teal-100 animate-fade-in">
                            <h4 className="font-bold text-slate-900 mb-4 text-lg">Xác nhận đăng ký</h4>
                            <div className="mb-4">
                               <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Chọn cự ly</label>
                               <select id="distance-select" className="w-full bg-slate-50 border border-gray-200 rounded-xl p-3 text-sm font-medium focus:ring-2 focus:ring-teal-500 outline-none">
                                  {selectedEvent.distance.split(',').map(d => (
                                     <option key={d} value={d.trim()}>{d.trim()}</option>
                                  ))}
                               </select>
                            </div>
                            <div className="flex space-x-3">
                               <button type="button" onClick={() => setIsRegistering(false)} className="flex-1 py-3 bg-slate-100 text-slate-600 font-bold rounded-xl text-sm hover:bg-slate-200">Hủy</button>
                               <button type="submit" className="flex-1 py-3 bg-teal-600 text-white font-bold rounded-xl text-sm hover:bg-teal-700 shadow-md">Xác nhận</button>
                            </div>
                         </form>
                       )
                    ) : (
                       <div className="bg-green-50 border border-green-200 p-6 rounded-2xl text-center">
                          <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                             <CheckCircle size={24} />
                          </div>
                          <h4 className="font-bold text-green-800 text-lg">Đã đăng ký!</h4>
                          <p className="text-green-600 text-sm mt-1">Hẹn gặp bạn tại vạch xuất phát.</p>
                       </div>
                    )}
                  </div>
               </div>

               {/* Right: List */}
               <div className="w-full md:w-2/3 bg-white flex flex-col">
                  <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                     <h3 className="font-bold text-slate-900 flex items-center text-lg">
                        Danh sách vận động viên
                     </h3>
                     <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input type="text" placeholder="Tìm tên, BIB..." className="pl-9 pr-4 py-2 bg-slate-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 w-48 transition-all" />
                     </div>
                  </div>
                  
                  <div className="overflow-y-auto flex-grow p-0 h-[400px] md:h-auto">
                     <table className="w-full text-left">
                        <thead className="bg-slate-50 sticky top-0 z-10">
                           <tr>
                              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">VĐV</th>
                              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Cự ly</th>
                              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">BIB</th>
                              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Trạng thái</th>
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                           {registrants.length > 0 ? registrants.map((reg, idx) => (
                              <tr key={`${reg.user.id}-${idx}`} className="hover:bg-slate-50 transition-colors">
                                 <td className="px-6 py-4">
                                    <div className="flex items-center">
                                       <img className="h-10 w-10 rounded-full border border-gray-200 object-cover" src={reg.user.avatar} alt="" />
                                       <div className="ml-3">
                                          <div className="text-sm font-bold text-slate-900">{reg.user.firstName} {reg.user.lastName}</div>
                                          <div className="text-xs text-teal-600 font-medium">Level {reg.user.level}</div>
                                       </div>
                                    </div>
                                 </td>
                                 <td className="px-6 py-4 text-center">
                                    <span className="inline-block px-2.5 py-1 rounded-md text-xs font-bold bg-slate-100 text-slate-600 border border-slate-200">
                                       {reg.distance}
                                    </span>
                                 </td>
                                 <td className="px-6 py-4 text-center font-mono text-sm font-medium text-slate-500">
                                    {reg.bib}
                                 </td>
                                 <td className="px-6 py-4 text-right">
                                    {reg.status === 'Confirmed' ? (
                                       <span className="inline-flex items-center text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full"><Check size={12} className="mr-1"/> Đã xác nhận</span>
                                    ) : (
                                       <span className="inline-flex items-center text-xs font-bold text-yellow-600 bg-yellow-50 px-2 py-1 rounded-full"><Clock size={12} className="mr-1"/> Chờ duyệt</span>
                                    )}
                                 </td>
                              </tr>
                           )) : (
                              <tr><td colSpan={4} className="px-6 py-12 text-center text-slate-500">Chưa có ai đăng ký.</td></tr>
                           )}
                        </tbody>
                     </table>
                  </div>
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;