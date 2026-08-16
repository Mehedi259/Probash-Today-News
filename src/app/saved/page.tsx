'use client';

import React from 'react';
import NewsCard from '@/components/NewsCard';
import { Bookmark, BookmarkX } from 'lucide-react';
import { useSavedNews } from '@/context/SavedNewsContext';

export default function SavedPage() {
  const { savedArticles } = useSavedNews();

  return (
    <div className="flex flex-col min-h-[calc(100vh-64px-64px)] bg-gray-50 pb-6 pt-2">
      
      <div className="px-4 py-4 mb-2 flex items-center justify-between bg-white border-b border-gray-100 shadow-sm sticky top-[64px] z-30">
        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <Bookmark size={20} className="text-blue-600 fill-blue-100" /> 
          সংরক্ষিত খবর
        </h2>
        <span className="text-xs font-bold bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full">
          {savedArticles.length} টি
        </span>
      </div>

      <div className="flex flex-col bg-white border-y border-gray-100 divide-y divide-gray-50 min-h-[50vh]">
        {savedArticles.length > 0 ? (
          savedArticles.map((article) => (
            <NewsCard key={`saved-${article.id}`} article={article} />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400 gap-4">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center">
              <BookmarkX size={32} className="text-gray-300" />
            </div>
            <div className="text-center">
              <h3 className="text-lg font-bold text-gray-700 mb-1">কোন খবর সংরক্ষণ করা হয়নি</h3>
              <p className="text-sm">পরবর্তীতে পড়ার জন্য খবর সংরক্ষণ করুন।</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
