'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, Bookmark } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { NewsArticle } from '@/data/news';
import { useSavedNews } from '@/context/SavedNewsContext';

interface NewsCardProps {
  article: NewsArticle;
  featured?: boolean;
}

export default function NewsCard({ article, featured = false }: NewsCardProps) {
  const { isSaved, saveArticle, removeArticle } = useSavedNews();
  const saved = isSaved(article.id);

  // Use a fallback date just in case article.date is invalid or not parsed correctly
  let timeAgo = 'কিছুক্ষণ আগে';
  try {
    timeAgo = formatDistanceToNow(new Date(article.date), { addSuffix: true });
  } catch (e) {
    // ignore
  }

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent triggering the Link wrapper
    e.stopPropagation();
    if (saved) {
      removeArticle(article.id);
    } else {
      saveArticle(article);
    }
  };

  if (featured) {
    return (
      <Link href={`/news/${article.id}`} className="block w-full h-[400px] overflow-hidden group relative">
        <Image
          src={article.imageUrl}
          alt={article.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          quality={75}
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        
        {/* Save Button Overlay */}
        <button 
          onClick={handleSave}
          className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-black/30 backdrop-blur-md text-white hover:bg-black/50 transition-colors"
        >
          <Bookmark size={20} className={saved ? 'fill-blue-500 text-blue-500' : ''} />
        </button>

        <div className="absolute bottom-0 left-0 right-0 p-5 text-white z-10">
          <span className="inline-block px-2.5 py-1 text-xs font-semibold bg-blue-600 rounded-sm mb-3 shadow-md shadow-blue-600/20">
            {article.category}
          </span>
          <h2 className="text-2xl font-bold leading-tight mb-2 group-hover:text-blue-100 transition-colors line-clamp-3">
            {article.title}
          </h2>
          <div className="flex items-center text-gray-300 text-xs font-medium mt-3">
            <span className="text-white font-semibold mr-3">{article.source}</span>
            <Clock size={12} className="mr-1" />
            <span>{timeAgo}</span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/news/${article.id}`} className="flex gap-4 p-4 border-b border-gray-100 group hover:bg-gray-50 transition-colors relative block">
      <div className="relative w-28 h-20 shrink-0 overflow-hidden rounded-lg bg-gray-200">
        <Image
          src={article.imageUrl}
          alt={article.title}
          fill
          sizes="112px"
          quality={60}
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="flex flex-col justify-between flex-1 py-0.5">
        <div className="pr-8">
          <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wide">
            {article.category}
          </span>
          <h3 className="text-[15px] font-bold leading-snug text-gray-900 mt-1 line-clamp-2 group-hover:text-blue-700 transition-colors">
            {article.title}
          </h3>
        </div>
        <div className="flex items-center text-gray-500 text-[11px] mt-2 font-medium">
          <span className="mr-3">{article.source}</span>
          <Clock size={10} className="mr-1" />
          <span>{timeAgo}</span>
        </div>
      </div>
      
      {/* Save Button absolute positioned on right */}
      <button 
        onClick={handleSave}
        className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-blue-600 transition-colors bg-white rounded-md hover:bg-blue-50"
      >
        <Bookmark size={18} className={saved ? 'fill-blue-500 text-blue-500' : ''} />
      </button>
    </Link>
  );
}
