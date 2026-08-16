'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Compass, Bookmark, Menu } from 'lucide-react';
import { motion } from 'framer-motion';

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { id: 'home', path: '/', icon: Home, label: 'হোম' },
    { id: 'explore', path: '/explore', icon: Compass, label: 'খবর' },
    { id: 'saved', path: '/saved', icon: Bookmark, label: 'সেভড' },
    { id: 'menu', path: '/menu', icon: Menu, label: 'মেন্যু' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 mx-auto w-full max-w-md bg-white border-t border-gray-100 pb-safe shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.1)] z-50">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path;
          
          return (
            <Link
              href={item.path}
              key={item.id}
              className="flex flex-col items-center justify-center w-full h-full relative"
            >
              {isActive && (
                <motion.div
                  layoutId="bottom-nav-indicator"
                  className="absolute top-0 w-10 h-1 bg-blue-600 rounded-b-md"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              <Icon 
                size={22} 
                className={`mb-1 transition-colors ${isActive ? 'text-blue-600' : 'text-gray-400'}`} 
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span className={`text-[10px] font-medium transition-colors ${isActive ? 'text-blue-600' : 'text-gray-500'}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
