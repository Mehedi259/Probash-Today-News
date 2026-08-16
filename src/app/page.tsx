'use client';

import React, { useState, useEffect } from 'react';
import NewsCard from '@/components/NewsCard';
import { newsArticles, categories } from '@/data/news';
import { TrendingUp, Sparkles, ChevronRight } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('সব');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // Top 3 for Carousel
  const featuredArticles = newsArticles.slice(0, 3);
  
  // Trending articles
  const trendingArticles = newsArticles.slice(3, 5);

  // Filtered latest articles
  const latestArticles = newsArticles
    .slice(5)
    .filter(article => activeCategory === 'সব' || article.category === activeCategory);

  if (!mounted) return null; // Avoid hydration mismatch for motion/random

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-6">
      
      {/* Featured News Carousel (Scroll Snap) */}
      <section className="bg-white pt-2 pb-4">
        <div className="px-4 mb-3 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <Sparkles size={18} className="text-yellow-500" /> 
            শীর্ষ খবর
          </h2>
        </div>
        
        <div className="flex overflow-x-auto hide-scrollbar snap-x snap-mandatory px-4 gap-4 pb-2">
          {featuredArticles.map((article) => (
            <div key={article.id} className="min-w-[85vw] md:min-w-[400px] snap-center relative rounded-2xl overflow-hidden shadow-sm h-56 flex-shrink-0">
              <Image 
                src={article.imageUrl} 
                alt={article.title} 
                fill 
                className="object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-4">
                <span className="bg-blue-600 text-white text-xs font-bold px-2.5 py-1 rounded-md w-fit mb-2">
                  {article.category}
                </span>
                <h3 className="text-white font-bold text-lg leading-tight line-clamp-2">
                  {article.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trending Mini Section */}
      <section className="bg-white mt-2 py-4 px-4">
        <h2 className="text-base font-bold text-gray-800 flex items-center gap-2 mb-3">
          <TrendingUp size={18} className="text-red-500" /> 
          ট্রেন্ডিং
        </h2>
        <div className="flex flex-col gap-3">
          {trendingArticles.map((article, index) => (
            <div key={article.id} className="flex gap-3 items-center group cursor-pointer">
              <span className="text-2xl font-black text-gray-200 group-hover:text-blue-100 transition-colors">
                0{index + 1}
              </span>
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-gray-800 leading-tight group-hover:text-blue-600 transition-colors line-clamp-2">
                  {article.title}
                </h4>
                <p className="text-xs text-gray-400 mt-1">{article.source}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories Scroll Sticky */}
      <section className="sticky top-[64px] z-30 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-[0_4px_10px_-10px_rgba(0,0,0,0.1)] mt-2">
        <div className="flex overflow-x-auto hide-scrollbar px-4 py-3 gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
                activeCategory === category
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20 scale-105'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Latest News List */}
      <section className="flex flex-col bg-white">
        <div className="px-4 py-4 flex items-center justify-between border-b border-gray-50">
          <h2 className="text-lg font-bold text-gray-900 border-l-4 border-blue-600 pl-2">
            সর্বশেষ খবর
          </h2>
          <button className="text-sm text-blue-600 font-medium flex items-center hover:underline">
            সব দেখুন <ChevronRight size={16} />
          </button>
        </div>
        
        <div className="flex flex-col divide-y divide-gray-50">
          {latestArticles.length > 0 ? (
            latestArticles.map((article) => (
              <NewsCard key={article.id} article={article} />
            ))
          ) : (
            <div className="p-12 flex flex-col items-center justify-center text-gray-400 gap-3">
              <Sparkles size={32} className="text-gray-200" />
              <p className="text-sm font-medium">এই বিভাগে কোন খবর পাওয়া যায়নি।</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
