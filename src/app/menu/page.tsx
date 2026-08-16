'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { User, Settings, LogOut, ChevronRight, HelpCircle, FileText, Bell } from 'lucide-react';
import LogoutModal from '@/components/LogoutModal';
import Image from 'next/image';

export default function MenuPage() {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const menuItems = [
    { id: 'profile', label: 'প্রোফাইল', icon: User, path: '/menu/profile', color: 'text-blue-500', bg: 'bg-blue-50' },
    { id: 'settings', label: 'সেটিংস', icon: Settings, path: '/menu/settings', color: 'text-purple-500', bg: 'bg-purple-50' },
    { id: 'notifications', label: 'নোটিফিকেশন সেটিংস', icon: Bell, path: '/menu/settings', color: 'text-amber-500', bg: 'bg-amber-50' },
    { id: 'help', label: 'সাহায্য ও সাপোর্ট', icon: HelpCircle, path: '#', color: 'text-green-500', bg: 'bg-green-50' },
    { id: 'terms', label: 'শর্তাবলী ও পলিসি', icon: FileText, path: '#', color: 'text-gray-500', bg: 'bg-gray-100' },
  ];

  return (
    <div className="flex flex-col min-h-[calc(100vh-64px-64px)] bg-gray-50 pb-6">
      
      {/* User Profile Summary */}
      <div className="bg-white p-6 border-b border-gray-100 flex items-center gap-4 mb-4">
        <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-gray-100">
          <Image 
            src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1974&auto=format&fit=crop" 
            alt="User Avatar" 
            fill 
            className="object-cover" 
          />
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900">মেহেদী হাসান</h2>
          <p className="text-sm text-gray-500">+880 1712-345678</p>
          <Link href="/menu/profile" className="text-xs text-blue-600 font-medium mt-1 inline-block hover:underline">
            প্রোফাইল দেখুন
          </Link>
        </div>
      </div>

      <div className="px-4">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 ml-2">অ্যাকাউন্ট ও সেটিংস</h3>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Link 
                key={item.id} 
                href={item.path}
                className={`flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition ${
                  index !== menuItems.length - 1 ? 'border-b border-gray-50' : ''
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2.5 rounded-xl ${item.bg} ${item.color}`}>
                    <Icon size={20} />
                  </div>
                  <span className="font-medium text-gray-800">{item.label}</span>
                </div>
                <ChevronRight size={18} className="text-gray-400" />
              </Link>
            );
          })}
        </div>

        <button 
          onClick={() => setIsLogoutModalOpen(true)}
          className="w-full flex items-center justify-center gap-2 p-4 bg-white rounded-2xl shadow-sm border border-gray-100 text-red-600 font-bold hover:bg-red-50 transition"
        >
          <LogOut size={20} />
          লগ আউট
        </button>
      </div>

      <LogoutModal isOpen={isLogoutModalOpen} onClose={() => setIsLogoutModalOpen(false)} />
    </div>
  );
}
