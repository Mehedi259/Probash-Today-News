'use client';

import React, { useState } from 'react';
import NewsCard from '@/components/NewsCard';
import NewsTicker from '@/components/NewsTicker';
import { newsArticles } from '@/data/news';
import { TrendingUp, ChevronRight, Globe2, Plane, Briefcase } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const featuredArticles = newsArticles.slice(0, 3);
  const trendingArticles = newsArticles.slice(3, 6);
  
  // Category specific slices
  const middleEastNews = newsArticles.filter(a => a.category === 'মধ্যপ্রাচ্য').slice(0, 3);
  const visaNews = newsArticles.filter(a => a.category === 'ভিসা ও ইমিগ্রেশন').slice(0, 4);
  const europeNews = newsArticles.filter(a => a.category === 'ইউরোপ').slice(0, 4);

  return (
    <div className="flex flex-col bg-gray-50 pb-6 pt-0">
      <NewsTicker />
      
      {/* Featured Carousel Section */}
      <section className="bg-white pt-4 pb-3 shadow-sm rounded-b-xl border-b border-gray-100 mb-4">
        <div className="px-4 mb-3 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <span className="text-blue-600">✨</span> শীর্ষ খবর
          </h2>
        </div>
        <div className="flex overflow-x-auto hide-scrollbar snap-x snap-mandatory px-4 gap-4 pb-2">
          {featuredArticles.map((article) => (
            <div key={article.id} className="min-w-[85vw] md:min-w-[400px] snap-center flex-shrink-0">
              <NewsCard article={article} variant="featured" />
            </div>
          ))}
        </div>
      </section>

      {/* Trending Section */}
      <section className="bg-white p-5 rounded-2xl mx-4 shadow-sm border border-gray-100">
        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <TrendingUp className="text-red-500" size={20} /> ট্রেন্ডিং
        </h2>
        <div className="flex flex-col gap-3">
          {trendingArticles.map((article, index) => (
            <Link href={`/news/${article.id}`} key={article.id} className="flex gap-3 items-center group cursor-pointer">
              <span className="text-2xl font-black text-gray-200 group-hover:text-blue-200 transition-colors">
                0{index + 1}
              </span>
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-gray-800 leading-tight group-hover:text-blue-600 transition-colors line-clamp-2">
                  {article.title}
                </h4>
                <p className="text-xs text-gray-400 mt-1">{article.source}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Middle East Section (Layout A: 1 Large Top, 2 Grid Bottom) */}
      <section className="bg-white py-5">
        <div className="px-4 mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900 border-l-4 border-blue-600 pl-2 flex items-center gap-2">
            <Globe2 size={18} className="text-blue-600" /> মধ্যপ্রাচ্য
          </h2>
          <Link href="/explore" className="text-sm text-blue-600 font-medium hover:underline">
            সব দেখুন
          </Link>
        </div>
        
        <div className="px-4 flex flex-col gap-4">
          {middleEastNews[0] && (
            <NewsCard article={middleEastNews[0]} variant="large" />
          )}
          
          <div className="grid grid-cols-2 gap-4">
            {middleEastNews.slice(1, 3).map(article => (
              <NewsCard key={article.id} article={article} variant="grid" />
            ))}
          </div>
        </div>
      </section>

      {/* Visa & Immigration Section (Layout B: 1 Large Left/Top, 3 Compact Right/Bottom) */}
      <section className="bg-white py-5">
        <div className="px-4 mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900 border-l-4 border-emerald-600 pl-2 flex items-center gap-2">
            <Plane size={18} className="text-emerald-600" /> ভিসা ও ইমিগ্রেশন
          </h2>
          <Link href="/explore" className="text-sm text-emerald-600 font-medium hover:underline">
            সব দেখুন
          </Link>
        </div>
        
        <div className="px-4 flex flex-col md:flex-row gap-4">
          <div className="md:w-1/2">
            {visaNews[0] && (
              <NewsCard article={visaNews[0]} variant="large" />
            )}
          </div>
          <div className="md:w-1/2 flex flex-col justify-between">
            {visaNews.slice(1, 4).map(article => (
              <NewsCard key={article.id} article={article} variant="compact" />
            ))}
          </div>
        </div>
      </section>

      {/* Europe Section (Layout C: Default List or Grid) */}
      <section className="bg-white py-5">
        <div className="px-4 mb-4 flex items-center justify-between border-b border-gray-50 pb-3">
          <h2 className="text-lg font-bold text-gray-900 border-l-4 border-purple-600 pl-2 flex items-center gap-2">
            <Briefcase size={18} className="text-purple-600" /> ইউরোপ
          </h2>
          <Link href="/explore" className="text-sm text-purple-600 font-medium flex items-center hover:underline bg-purple-50 px-3 py-1 rounded-full">
            সব দেখুন <ChevronRight size={16} />
          </Link>
        </div>
        
        <div className="flex flex-col divide-y divide-gray-50">
          {europeNews.map((article) => (
            <NewsCard key={article.id} article={article} variant="default" />
          ))}
        </div>
      </section>

    </div>
  );
}
