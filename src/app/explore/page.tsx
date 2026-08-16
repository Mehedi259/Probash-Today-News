'use client';

import React, { useState } from 'react';
import NewsCard from '@/components/NewsCard';
import { newsArticles, categories } from '@/data/news';
import { Search } from 'lucide-react';

export default function ExplorePage() {
  const [activeCategory, setActiveCategory] = useState('সব');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredArticles = newsArticles.filter(article => {
    const matchesCategory = activeCategory === 'সব' || article.category === activeCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          article.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col min-h-[calc(100vh-64px-64px)] bg-white pb-6">
      
      {/* Header / Search */}
      <div className="sticky top-[64px] z-30 bg-white border-b border-gray-100 shadow-sm px-4 py-3">
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="খবর খুঁজুন..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="sticky top-[125px] z-20 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-[0_4px_10px_-10px_rgba(0,0,0,0.1)]">
        <div className="flex overflow-x-auto hide-scrollbar px-4 py-3 gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
                activeCategory === category
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Results List */}
      <div className="flex flex-col mt-2">
        <div className="px-4 py-3 flex items-center justify-between">
          <h2 className="text-sm font-bold text-gray-500">
            {filteredArticles.length} টি খবর পাওয়া গেছে
          </h2>
        </div>

        <div className="flex flex-col divide-y divide-gray-50">
          {filteredArticles.length > 0 ? (
            filteredArticles.map((article) => (
              <NewsCard key={article.id} article={article} />
            ))
          ) : (
            <div className="p-12 text-center text-gray-400 flex flex-col items-center">
              <Search size={40} className="mb-3 text-gray-200" />
              <p className="font-medium text-sm">কোন খবর পাওয়া যায়নি।</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
