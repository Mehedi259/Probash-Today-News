'use client';

import React, { useState, useEffect } from 'react';
import { Search, X, Clock, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const recentSearches = ['সৌদি আরব ভিসা', 'দুবাই ফ্লাইট', 'মালয়েশিয়া কর্মী নিয়োগ'];
  const trendingSearches = ['ইতালি স্পন্সর ভিসা', 'রেমিট্যান্স রেট', 'পাসপোর্ট রিনিউ'];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-[60] backdrop-blur-sm"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed top-0 left-0 right-0 bg-white z-[70] rounded-b-3xl shadow-xl max-w-2xl mx-auto overflow-hidden"
          >
            <div className="p-4 pt-safe">
              <div className="flex items-center gap-3 bg-gray-100 rounded-full px-4 py-3">
                <Search size={20} className="text-gray-400" />
                <input
                  type="text"
                  autoFocus
                  placeholder="খবর খুঁজুন..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-gray-800 placeholder-gray-400 text-base"
                />
                {query ? (
                  <button onClick={() => setQuery('')} className="text-gray-400 p-1">
                    <X size={18} />
                  </button>
                ) : null}
              </div>
            </div>

            <div className="px-5 pb-6 pt-2 h-[60vh] overflow-y-auto">
              {!query ? (
                <>
                  {/* Recent Searches */}
                  <div className="mb-6">
                    <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
                      <Clock size={16} className="text-gray-400" /> সাম্প্রতিক অনুসন্ধান
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {recentSearches.map((item, i) => (
                        <span key={i} className="px-3 py-1.5 bg-gray-100 text-gray-600 text-sm rounded-full cursor-pointer hover:bg-gray-200 transition">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Trending */}
                  <div>
                    <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
                      <TrendingUp size={16} className="text-blue-500" /> ট্রেন্ডিং
                    </h3>
                    <div className="flex flex-col gap-3">
                      {trendingSearches.map((item, i) => (
                        <div key={i} className="flex items-center gap-3 text-gray-600 cursor-pointer hover:text-blue-600 transition">
                          <Search size={16} className="text-gray-300" />
                          <span className="text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-40 text-gray-500">
                  <Search size={32} className="text-gray-200 mb-2" />
                  <p className="text-sm">&quot;{query}&quot; এর জন্য ফলাফল খোঁজা হচ্ছে...</p>
                </div>
              )}
            </div>

            {/* Close Button at bottom */}
            <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-center">
              <button 
                onClick={onClose}
                className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-500 shadow-sm hover:bg-gray-50 transition"
              >
                <X size={20} />
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
