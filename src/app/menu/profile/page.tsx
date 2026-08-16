'use client';

import React from 'react';
import { ArrowLeft, Camera, Mail, Phone, MapPin, User, Save } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function ProfilePage() {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-20">
      <div className="bg-white border-b border-gray-100 px-4 py-4 sticky top-0 z-30 flex items-center justify-between">
        <button onClick={() => router.back()} className="text-gray-600 p-2 -ml-2 rounded-full hover:bg-gray-100">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-bold text-gray-800">প্রোফাইল</h1>
        <div className="w-9" /> {/* Spacer for centering */}
      </div>

      <div className="flex flex-col items-center mt-6">
        <div className="relative">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md">
            <Image 
              src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1974&auto=format&fit=crop" 
              alt="User" 
              fill 
              className="object-cover" 
            />
          </div>
          <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full shadow-lg border-2 border-white hover:bg-blue-700 transition">
            <Camera size={16} />
          </button>
        </div>
        <h2 className="text-xl font-bold text-gray-900 mt-4">মেহেদী হাসান</h2>
        <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full mt-2">ফ্রি মেম্বার</span>
      </div>

      <div className="px-4 mt-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col gap-5">
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase flex items-center gap-2 mb-2">
              <User size={14} /> পূর্ণ নাম
            </label>
            <input 
              type="text" 
              defaultValue="মেহেদী হাসান" 
              className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-medium text-gray-800 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase flex items-center gap-2 mb-2">
              <Phone size={14} /> মোবাইল নম্বর
            </label>
            <input 
              type="tel" 
              defaultValue="+880 1712-345678" 
              className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-medium text-gray-800 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase flex items-center gap-2 mb-2">
              <Mail size={14} /> ইমেইল ঠিকানা
            </label>
            <input 
              type="email" 
              defaultValue="mehedi@example.com" 
              className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-medium text-gray-800 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase flex items-center gap-2 mb-2">
              <MapPin size={14} /> বর্তমান অবস্থান
            </label>
            <input 
              type="text" 
              defaultValue="ঢাকা, বাংলাদেশ" 
              className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-medium text-gray-800 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
            />
          </div>
          
          <button className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-600/30 hover:bg-blue-700 hover:shadow-blue-600/40 transition mt-2">
            <Save size={18} /> প্রোফাইল সেভ করুন
          </button>
        </div>
      </div>
    </div>
  );
}
