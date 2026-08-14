import React from 'react';
import Image from 'next/image';
import { Bell, Search } from 'lucide-react';
import { format } from 'date-fns';
import { bn } from 'date-fns/locale';

export default function Header() {
  const currentDate = format(new Date(), 'EEEE, d MMMM, yyyy', { locale: bn });

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="flex items-center justify-between px-4 py-3 max-w-2xl mx-auto">
        <div className="flex flex-col">
          <Image src="/logo.png" alt="Probash Today Logo" width={140} height={40} className="object-contain h-7 w-auto mb-1" priority />
          <span className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">{currentDate}</span>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-gray-600 hover:text-blue-600 transition-colors">
            <Search size={20} />
          </button>
          <button className="text-gray-600 hover:text-blue-600 transition-colors relative">
            <Bell size={20} />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
          </button>
        </div>
      </div>
    </header>
  );
}
