import React, { useState, useEffect, useCallback } from 'react';
import { GALLERY_ALBUMS } from '../constants';
import { Album } from '../types';
import { Image as ImageIcon, X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

const Gallery: React.FC = () => {
  const [filter, setFilter] = useState<'All' | 'Race' | 'Training' | 'Social'>('All');
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const filteredAlbums = filter === 'All' ? GALLERY_ALBUMS : GALLERY_ALBUMS.filter(a => a.tag === filter);

  const openAlbum = (album: Album) => {
    setSelectedAlbum(album);
    setCurrentImageIndex(0);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    setSelectedAlbum(null);
  };

  const navigateImage = (direction: number) => {
    if (!selectedAlbum) return;
    setCurrentImageIndex((prev) => (prev + direction + selectedAlbum.images.length) % selectedAlbum.images.length);
  };

  return (
    <div className="bg-white min-h-screen pb-20">
      <div className="bg-[#0F172A] py-24 px-4 sm:px-6 lg:px-8 text-center">
         <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6">MOMENTS</h1>
         <p className="text-slate-400 text-lg">Lưu giữ cảm xúc trên từng bước chạy.</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
         <div className="bg-white p-2 rounded-2xl shadow-lg inline-flex mb-12">
            {['All', 'Race', 'Training', 'Social'].map((f) => (
               <button
                 key={f}
                 onClick={() => setFilter(f as any)}
                 className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${
                   filter === f 
                    ? 'bg-teal-600 text-white shadow-md' 
                    : 'text-slate-500 hover:text-slate-900 hover:bg-gray-50'
                 }`}
               >
                 {f}
               </button>
             ))}
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAlbums.map((album) => (
               <div key={album.id} className="group relative cursor-pointer" onClick={() => openAlbum(album)}>
                  <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-sm relative">
                     <img src={album.coverUrl} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={album.title} />
                     <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>
                     
                     <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/30">
                           <Maximize2 size={24} />
                        </div>
                     </div>

                     <div className="absolute bottom-0 left-0 p-6 w-full">
                        <div className="text-white font-display font-bold text-2xl leading-tight mb-1">{album.title}</div>
                        <div className="text-white/80 text-sm font-medium flex items-center justify-between">
                           <span>{album.date}</span>
                           <span className="bg-white/20 px-2 py-0.5 rounded text-xs backdrop-blur-sm">{album.images.length} photos</span>
                        </div>
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </div>

      {/* Lightbox Overlay */}
      {isLightboxOpen && selectedAlbum && (
         <div className="fixed inset-0 z-[60] bg-black/95 flex flex-col animate-fade-in">
            <div className="flex justify-between items-center p-6 text-white">
               <div>
                  <h3 className="font-bold text-lg">{selectedAlbum.title}</h3>
                  <p className="text-sm text-slate-400">{currentImageIndex + 1} / {selectedAlbum.images.length}</p>
               </div>
               <button onClick={closeLightbox} className="p-2 bg-white/10 rounded-full hover:bg-white/20"><X size={24} /></button>
            </div>
            
            <div className="flex-1 flex items-center justify-center relative p-4">
               <button onClick={(e) => { e.stopPropagation(); navigateImage(-1); }} className="absolute left-4 p-4 text-white hover:bg-white/10 rounded-full"><ChevronLeft size={32} /></button>
               <img src={selectedAlbum.images[currentImageIndex].url} className="max-h-full max-w-full rounded shadow-2xl object-contain" alt="Gallery" />
               <button onClick={(e) => { e.stopPropagation(); navigateImage(1); }} className="absolute right-4 p-4 text-white hover:bg-white/10 rounded-full"><ChevronRight size={32} /></button>
            </div>

            <div className="h-20 bg-black/50 flex items-center justify-center space-x-2 overflow-x-auto p-2">
               {selectedAlbum.images.map((img, idx) => (
                  <div key={idx} 
                       className={`h-14 w-20 flex-shrink-0 rounded overflow-hidden cursor-pointer border-2 transition-all ${idx === currentImageIndex ? 'border-teal-500 opacity-100' : 'border-transparent opacity-50 hover:opacity-100'}`}
                       onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(idx); }}>
                     <img src={img.url} className="w-full h-full object-cover" />
                  </div>
               ))}
            </div>
         </div>
      )}
    </div>
  );
};

export default Gallery;