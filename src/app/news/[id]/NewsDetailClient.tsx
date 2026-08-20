'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Clock, Bookmark, Share2, MessageCircle, Link as LinkIcon, Hash, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';
import { bn } from 'date-fns/locale';
import { NewsArticle } from '@/data/news';
import { useSavedNews } from '@/context/SavedNewsContext';

interface NewsDetailClientProps {
  article: NewsArticle;
  recentNews?: NewsArticle[];
}

export default function NewsDetailClient({ article, recentNews = [] }: NewsDetailClientProps) {
  const router = useRouter();
  const { isSaved, saveArticle, removeArticle } = useSavedNews();

  const saved = isSaved(article.id);

  const handleSave = () => {
    if (saved) {
      removeArticle(article.id);
    } else {
      saveArticle(article);
    }
  };

  let formattedDate = '';
  try {
    formattedDate = format(new Date(article.created_at), 'dd MMMM yyyy, hh:mm a', { locale: bn });
  } catch (e) {
    formattedDate = 'কিছুক্ষণ আগে';
  }

  const getImageUrl = (url: string | null | undefined, fallback: string | null) => {
    if (url) {
      try {
        return new URL(url).pathname;
      } catch (e) {
        return url;
      }
    }
    return fallback || '/images/news1.jpg';
  };

  const imageUrl = getImageUrl(article.image, article.image_url);

  return (
    <div className="min-h-screen bg-gray-50 pb-24 md:pb-12 pt-0 md:pt-6">
      <div className="container mx-auto max-w-7xl px-0 md:px-4">
        
        {/* App Bar overlay for mobile */}
        <div className="flex items-center justify-between p-4 md:mb-4 bg-white md:bg-transparent shadow-sm md:shadow-none sticky top-0 z-50 md:static">
          <button 
            onClick={() => router.back()}
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-gray-200 transition"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex gap-3">
            <button 
              onClick={handleSave}
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-gray-200 transition"
            >
              <Bookmark size={20} className={saved ? 'fill-blue-500 text-blue-500' : ''} />
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Main Article Content */}
          <div className="flex-1 w-full bg-white md:rounded-2xl shadow-sm overflow-hidden border border-gray-100">
            
            {/* Title & Meta */}
            <div className="p-5 md:p-8 border-b border-gray-100">
              <span className="inline-block px-3 py-1 text-xs font-bold bg-blue-50 text-blue-600 rounded-md mb-4 uppercase tracking-wider">
                {article.category?.name || 'News'}
              </span>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-snug md:leading-tight mb-6">
                {article.title}
              </h1>
              
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xl">
                    {article.source ? article.source.charAt(0) : 'P'}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{article.source || 'Probash Today'}</p>
                    <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                      <Clock size={12} /> {formattedDate}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Featured Image - Fully responsive, aspect-video */}
            <div className="relative w-full aspect-video bg-gray-100">
              <Image 
                src={imageUrl} 
                alt={article.title} 
                fill 
                className="object-cover" 
                priority 
              />
            </div>
            
            {/* Body */}
            <article className="p-5 md:p-8">
              <div className="prose prose-lg md:prose-xl prose-blue max-w-none text-gray-800">
                <p className="text-base md:text-lg font-medium leading-relaxed mb-6 text-gray-700 whitespace-pre-line">
                  {article.description}
                </p>
              </div>
              
              {/* Mobile Share Section (Only on mobile, since sidebar is for desktop) */}
              <div className="mt-8 pt-6 border-t border-gray-100 lg:hidden">
                <h3 className="text-base font-bold text-gray-800 mb-4">সংবাদটি শেয়ার করুন</h3>
                <div className="flex gap-3">
                  <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-blue-50 text-blue-600 font-semibold rounded-xl hover:bg-blue-100 transition">
                    <LinkIcon size={18} />
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#1DA1F2]/10 text-[#1DA1F2] font-semibold rounded-xl hover:bg-[#1DA1F2]/20 transition">
                    <Hash size={18} />
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#25D366]/10 text-[#25D366] font-semibold rounded-xl hover:bg-[#25D366]/20 transition">
                    <MessageCircle size={18} />
                  </button>
                </div>
              </div>

            </article>
          </div>

          {/* Right Sidebar */}
          <aside className="w-full lg:w-[350px] flex flex-col gap-6 px-4 md:px-0">
            
            {/* Share Section - Desktop */}
            <div className="hidden lg:block bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-800 mb-4 text-lg">সংবাদটি শেয়ার করুন</h3>
              <div className="flex flex-col gap-3">
                <button className="w-full flex items-center justify-center gap-2 py-3 bg-blue-50 text-blue-600 font-semibold rounded-xl hover:bg-blue-100 transition">
                  <LinkIcon size={18} /> কপি লিংক
                </button>
                <button className="w-full flex items-center justify-center gap-2 py-3 bg-[#1DA1F2]/10 text-[#1DA1F2] font-semibold rounded-xl hover:bg-[#1DA1F2]/20 transition">
                  <Hash size={18} /> এক্স (টুইটার)
                </button>
                <button className="w-full flex items-center justify-center gap-2 py-3 bg-[#25D366]/10 text-[#25D366] font-semibold rounded-xl hover:bg-[#25D366]/20 transition">
                  <MessageCircle size={18} /> হোয়াটসঅ্যাপ
                </button>
              </div>
            </div>

            {/* Recent News */}
            {recentNews.length > 0 && (
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
                  <h3 className="font-bold text-gray-800 text-lg">সাম্প্রতিক খবর</h3>
                </div>
                
                <div className="flex flex-col gap-5">
                  {recentNews.map((news) => (
                    <Link href={`/news/${news.id}`} key={news.id} className="group flex gap-4 items-center">
                      <div className="relative w-24 h-20 rounded-lg overflow-hidden shrink-0 bg-gray-100">
                        <Image 
                          src={getImageUrl(news.image, news.image_url)} 
                          alt={news.title}
                          fill
                          className="object-cover group-hover:scale-105 transition duration-300"
                        />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-gray-800 group-hover:text-blue-600 line-clamp-2 leading-snug">
                          {news.title}
                        </h4>
                        <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                          <Clock size={12} /> 
                          {news.created_at ? format(new Date(news.created_at), 'dd MMM', { locale: bn }) : 'কিছুক্ষণ আগে'}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
                
                <Link href="/explore" className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-center text-sm font-semibold text-blue-600 hover:text-blue-700 transition">
                  আরও খবর দেখুন <ChevronRight size={16} />
                </Link>
              </div>
            )}
            
          </aside>
          
        </div>
      </div>
    </div>
  );
}
