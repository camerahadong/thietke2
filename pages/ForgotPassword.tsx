import React from 'react';
import { KeyRound, Mail, ArrowLeft } from 'lucide-react';

interface ForgotPasswordProps {
  onNavigate: (page: string) => void;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center p-4 bg-slate-50 animate-fade-in">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 text-orange-600 rounded-full mb-4">
                    <KeyRound className="w-8 h-8" />
                </div>
                <h1 className="text-2xl font-bold text-slate-900">Quên mật khẩu?</h1>
                <p className="text-slate-500 mt-2">Đừng lo lắng! Hãy nhập email đăng ký của bạn và chúng tôi sẽ gửi hướng dẫn khôi phục.</p>
            </div>

            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert('Link khôi phục đã được gửi vào email của bạn!'); }}>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Email đăng ký</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail className="text-gray-400 w-5 h-5" />
                        </div>
                        <input type="email" className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none" placeholder="runner@example.com" required />
                    </div>
                </div>

                <button type="submit" className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center">
                    Gửi link khôi phục
                </button>
            </form>

            <div className="mt-8 text-center">
                <button onClick={() => onNavigate('login')} className="text-sm font-medium text-slate-600 hover:text-slate-900 flex items-center justify-center mx-auto">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Quay lại đăng nhập
                </button>
            </div>
        </div>
    </div>
  );
};

export default ForgotPassword;