'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Bell, Search } from 'lucide-react';
import { format } from 'date-fns';
import { bn } from 'date-fns/locale';
import SearchModal from './SearchModal';
import NotificationsDropdown from './NotificationsDropdown';

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const currentDate = format(new Date(), 'EEEE, d MMMM, yyyy', { locale: bn });

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] w-full">
        <div className="flex items-center justify-between px-4 lg:px-8 py-3 w-full">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex flex-col">
              <div className="relative h-10 w-44 mb-1">
                <Image 
                  src="/logo.png" 
                  alt="Probash Today Logo" 
                  fill
                  className="object-contain object-left" 
                  priority 
                />
              </div>
              <span className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">{currentDate}</span>
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/" className="text-sm font-semibold text-gray-700 hover:text-blue-600 transition-colors">হোম</Link>
              <Link href="/explore" className="text-sm font-semibold text-gray-700 hover:text-blue-600 transition-colors">সব খবর</Link>
              <Link href="/saved" className="text-sm font-semibold text-gray-700 hover:text-blue-600 transition-colors">সেভড</Link>
            </nav>
          </div>

          <div className="flex items-center gap-4 relative">
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all"
            >
              <Search size={22} />
            </button>
            <div className="relative">
              <button 
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all relative"
              >
                <Bell size={22} />
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
              </button>
              
              <NotificationsDropdown 
                isOpen={isNotificationsOpen} 
                onClose={() => setIsNotificationsOpen(false)} 
              />
            </div>
          </div>
        </div>
      </header>

      <SearchModal 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />
    </>
  );
}
