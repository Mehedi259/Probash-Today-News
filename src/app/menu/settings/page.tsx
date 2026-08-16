'use client';

import React, { useState } from 'react';
import { ArrowLeft, Moon, Globe, Bell, Shield, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SettingsPage() {
  const router = useRouter();
  const [pushEnabled, setPushEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-20">
      <div className="bg-white border-b border-gray-100 px-4 py-4 sticky top-0 z-30 flex items-center justify-between">
        <button onClick={() => router.back()} className="text-gray-600 p-2 -ml-2 rounded-full hover:bg-gray-100">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-bold text-gray-800">সেটিংস</h1>
        <div className="w-9" />
      </div>

      <div className="px-4 mt-6 flex flex-col gap-6">
        
        {/* App Settings */}
        <div>
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 ml-2">অ্যাপ সেটিংস</h3>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            
            {/* Push Notifications Toggle */}
            <div className="flex items-center justify-between p-4 border-b border-gray-50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 text-blue-500 rounded-lg">
                  <Bell size={18} />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 text-sm">পুশ নোটিফিকেশন</h4>
                  <p className="text-xs text-gray-400">খবরের আপডেট পান</p>
                </div>
              </div>
              <button 
                onClick={() => setPushEnabled(!pushEnabled)}
                className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-1 ${pushEnabled ? 'bg-blue-600' : 'bg-gray-300'}`}
              >
                <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${pushEnabled ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
            </div>

            {/* Dark Mode Toggle */}
            <div className="flex items-center justify-between p-4 border-b border-gray-50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-50 text-purple-500 rounded-lg">
                  <Moon size={18} />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 text-sm">ডার্ক মোড</h4>
                  <p className="text-xs text-gray-400">চোখের আরামের জন্য</p>
                </div>
              </div>
              <button 
                onClick={() => setDarkMode(!darkMode)}
                className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-1 ${darkMode ? 'bg-purple-600' : 'bg-gray-300'}`}
              >
                <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${darkMode ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
            </div>

            {/* Language Selection */}
            <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-50 text-green-500 rounded-lg">
                  <Globe size={18} />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 text-sm">ভাষা</h4>
                  <p className="text-xs text-gray-400">বাংলা</p>
                </div>
              </div>
              <ChevronRight size={18} className="text-gray-400" />
            </div>

          </div>
        </div>

        {/* Account & Security */}
        <div>
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 ml-2">অ্যাকাউন্ট ও নিরাপত্তা</h3>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition border-b border-gray-50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-50 text-amber-500 rounded-lg">
                  <Shield size={18} />
                </div>
                <h4 className="font-medium text-gray-800 text-sm">পাসওয়ার্ড পরিবর্তন</h4>
              </div>
              <ChevronRight size={18} className="text-gray-400" />
            </div>
            <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-red-50 transition text-red-600">
              <h4 className="font-medium text-sm">অ্যাকাউন্ট ডিলিট করুন</h4>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
