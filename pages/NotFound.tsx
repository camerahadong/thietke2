import React from 'react';
import { Home, ArrowLeft } from 'lucide-react';

interface NotFoundProps {
  onNavigate: (page: string) => void;
}

const NotFound: React.FC<NotFoundProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 items-center justify-center text-center px-4 animate-fade-in">
        <div className="max-w-lg w-full">
            <div className="text-9xl font-black text-slate-200 select-none mb-4">404</div>
            
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Lạc đường rồi Runner ơi!</h1>
            <p className="text-slate-500 text-lg mb-8">
                Có vẻ như bạn đã chạy quá xa khỏi lộ trình. Trang bạn đang tìm kiếm không tồn tại hoặc đã bị dời đi.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button onClick={() => onNavigate('home')} className="flex items-center justify-center px-8 py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg shadow-lg transition-all">
                    <Home className="w-5 h-5 mr-2" /> Quay về vạch xuất phát
                </button>
                <button onClick={() => window.history.back()} className="flex items-center justify-center px-8 py-3 bg-white border border-gray-300 hover:bg-gray-50 text-slate-700 font-bold rounded-lg transition-all">
                    <ArrowLeft className="w-5 h-5 mr-2" /> Quay lại
                </button>
            </div>
        </div>
    </div>
  );
};

export default NotFound;