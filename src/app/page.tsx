import React from 'react';
import NewsCard from '@/components/NewsCard';
import NewsTicker from '@/components/NewsTicker';
import { TrendingUp, ChevronRight, Globe2, Plane, Briefcase } from 'lucide-react';
import Link from 'next/link';
import { fetchNews } from '@/services/api';
import { NewsArticle } from '@/data/news';

export default async function Home() {
  let allNews: NewsArticle[] = [];
  try {
    allNews = await fetchNews();
  } catch (error) {
    console.error("Failed to fetch news:", error);
  }

  // Fallback if empty array
  const featuredArticles = allNews.filter(a => a.is_featured).slice(0, 3);
  const trendingArticles = allNews.filter(a => a.is_trending).slice(0, 5);
  
  // If not enough featured/trending, fallback to latest
  const finalFeatured = featuredArticles.length > 0 ? featuredArticles : allNews.slice(0, 3);
  const finalTrending = trendingArticles.length > 0 ? trendingArticles : allNews.slice(3, 8);
  
  // Category specific slices
  const middleEastNews = allNews.filter(a => a.category?.slug === 'মধ্যপ্রাচ্য' || a.category?.name === 'মধ্যপ্রাচ্য').slice(0, 4);
  const visaNews = allNews.filter(a => a.category?.slug === 'ভিসা-ও-ইমিগ্রেশন' || a.category?.name === 'ভিসা ও ইমিগ্রেশন').slice(0, 5);
  const europeNews = allNews.filter(a => a.category?.slug === 'ইউরোপ' || a.category?.name === 'ইউরোপ').slice(0, 4);

  return (
    <div className="flex flex-col bg-gray-50 pb-6 pt-0">
      <NewsTicker articles={allNews} />
      
      {/* Hero Section: Featured & Trending for Desktop */}
      <div className="flex flex-col lg:flex-row gap-6 px-0 md:px-4 lg:px-8 mt-4">
        
        {/* Featured Section (Takes 2/3 space on large screens) */}
        <section className="bg-white pt-4 pb-3 shadow-sm rounded-xl border border-gray-100 mb-4 lg:mb-0 lg:w-2/3">
          <div className="px-4 mb-3 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <span className="text-blue-600">✨</span> শীর্ষ খবর
            </h2>
          </div>
          <div className="flex md:grid md:grid-cols-2 overflow-x-auto md:overflow-visible hide-scrollbar snap-x snap-mandatory px-4 gap-4 pb-2">
            {finalFeatured.map((article, idx) => (
              <div key={article.id} className={`min-w-[85vw] md:min-w-0 snap-center flex-shrink-0 ${idx === 0 ? 'md:col-span-2' : 'md:col-span-1'}`}>
                <NewsCard article={article} variant="featured" />
              </div>
            ))}
          </div>
        </section>

        {/* Trending Section (Takes 1/3 space on large screens) */}
        <section className="bg-white p-5 rounded-xl mx-4 md:mx-0 shadow-sm border border-gray-100 lg:w-1/3">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp className="text-red-500" size={20} /> ট্রেন্ডিং
          </h2>
          <div className="flex flex-col gap-3">
            {finalTrending.map((article, index) => (
              <Link href={`/news/${article.id}`} key={article.id} className="flex gap-3 items-center group cursor-pointer pb-3 border-b border-gray-50 last:border-0">
                <span className="text-2xl font-black text-gray-200 group-hover:text-blue-200 transition-colors">
                  0{index + 1}
                </span>
                <div className="flex-1">
                  <h4 className="text-[13px] md:text-sm font-semibold text-gray-800 leading-tight group-hover:text-blue-600 transition-colors line-clamp-2">
                    {article.title}
                  </h4>
                  <p className="text-[10px] md:text-xs text-gray-400 mt-1">{article.source}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>

      {/* Middle East Section */}
      <section className="bg-white py-5 mt-6 rounded-xl mx-0 md:mx-4 lg:mx-8 shadow-sm border border-gray-100">
        <div className="px-4 mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900 border-l-4 border-blue-600 pl-2 flex items-center gap-2">
            <Globe2 size={18} className="text-blue-600" /> মধ্যপ্রাচ্য
          </h2>
          <Link href="/explore" className="text-sm text-blue-600 font-medium hover:underline">
            সব দেখুন
          </Link>
        </div>
        
        <div className="px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="md:col-span-2 lg:col-span-2">
            {middleEastNews[0] && (
              <NewsCard article={middleEastNews[0]} variant="large" />
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-4 md:col-span-2 lg:col-span-2">
            {middleEastNews.slice(1, 5).map(article => (
              <NewsCard key={article.id} article={article} variant="grid" />
            ))}
          </div>
        </div>
      </section>

      {/* Visa & Immigration Section */}
      <section className="bg-white py-5 mt-6 rounded-xl mx-0 md:mx-4 lg:mx-8 shadow-sm border border-gray-100">
        <div className="px-4 mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900 border-l-4 border-emerald-600 pl-2 flex items-center gap-2">
            <Plane size={18} className="text-emerald-600" /> ভিসা ও ইমিগ্রেশন
          </h2>
          <Link href="/explore" className="text-sm text-emerald-600 font-medium hover:underline">
            সব দেখুন
          </Link>
        </div>
        
        <div className="px-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {visaNews[0] && (
              <NewsCard article={visaNews[0]} variant="large" />
            )}
          </div>
          <div className="flex flex-col justify-between h-full lg:col-span-1">
            {visaNews.slice(1, 5).map(article => (
              <NewsCard key={article.id} article={article} variant="compact" />
            ))}
          </div>
        </div>
      </section>

      {/* Europe Section */}
      <section className="bg-white py-5 mt-6 rounded-xl mx-0 md:mx-4 lg:mx-8 shadow-sm border border-gray-100">
        <div className="px-4 mb-4 flex items-center justify-between border-b border-gray-50 pb-3">
          <h2 className="text-lg font-bold text-gray-900 border-l-4 border-purple-600 pl-2 flex items-center gap-2">
            <Briefcase size={18} className="text-purple-600" /> ইউরোপ
          </h2>
          <Link href="/explore" className="text-sm text-purple-600 font-medium flex items-center hover:underline bg-purple-50 px-3 py-1 rounded-full">
            সব দেখুন <ChevronRight size={16} />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4">
          {europeNews.map((article) => (
            <NewsCard key={article.id} article={article} variant="grid" />
          ))}
        </div>
      </section>

    </div>
  );
}
