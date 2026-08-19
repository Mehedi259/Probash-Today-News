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
  variant?: 'default' | 'featured' | 'large' | 'grid' | 'compact';
}

export default function NewsCard({ article, variant = 'default' }: NewsCardProps) {
  const { isSaved, saveArticle, removeArticle } = useSavedNews();
  const saved = isSaved(article.id);

  let timeAgo = 'কিছুক্ষণ আগে';
  try {
    timeAgo = formatDistanceToNow(new Date(article.created_at), { addSuffix: true });
  } catch (e) {
    // ignore
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

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (saved) {
      removeArticle(article.id);
    } else {
      saveArticle(article);
    }
  };

  // Carousel item
  if (variant === 'featured') {
    return (
      <Link href={`/news/${article.id}`} className="block w-full h-56 overflow-hidden rounded-2xl group relative shadow-sm border border-gray-100">
        <Image
          src={imageUrl}
          alt={article.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          quality={75}
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        <button onClick={handleSave} className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-black/30 backdrop-blur-md text-white hover:bg-black/50 transition-colors">
          <Bookmark size={20} className={saved ? 'fill-blue-500 text-blue-500' : ''} />
        </button>
        <div className="absolute bottom-0 left-0 right-0 p-5 text-white z-10">
          <span className="inline-block px-2.5 py-1 text-xs font-semibold bg-blue-600 rounded-sm mb-3 shadow-md shadow-blue-600/20">
            {article.category?.name}
          </span>
          <h2 className="text-xl font-bold leading-tight mb-2 group-hover:text-blue-100 transition-colors line-clamp-2">
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

  // Large Top Item (Middle East Section)
  if (variant === 'large') {
    return (
      <Link href={`/news/${article.id}`} className="flex flex-col group relative overflow-hidden bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="relative w-full h-56 md:h-64 overflow-hidden bg-gray-200">
          <Image
            src={imageUrl}
            alt={article.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            quality={75}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <button onClick={handleSave} className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/30 backdrop-blur-md text-white hover:bg-black/50 transition-colors">
            <Bookmark size={18} className={saved ? 'fill-blue-500 text-blue-500' : ''} />
          </button>
        </div>
        <div className="p-4">
          <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wide mb-2 block">
            {article.category?.name}
          </span>
          <h3 className="text-lg md:text-xl font-bold leading-snug text-gray-900 mb-2 group-hover:text-blue-700 transition-colors line-clamp-2">
            {article.title}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-2 mb-3">
            {article.description}
          </p>
          <div className="flex items-center text-gray-500 text-xs font-medium">
            <span className="mr-3 font-semibold text-gray-700">{article.source}</span>
            <Clock size={12} className="mr-1" />
            <span>{timeAgo}</span>
          </div>
        </div>
      </Link>
    );
  }

  // Grid item (half width)
  if (variant === 'grid') {
    return (
      <Link href={`/news/${article.id}`} className="flex flex-col group relative bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden h-full">
        <div className="relative w-full h-32 bg-gray-200 overflow-hidden">
          <Image
            src={imageUrl}
            alt={article.title}
            fill
            sizes="50vw"
            quality={60}
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        <div className="p-3 flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-[13px] md:text-sm font-bold leading-snug text-gray-900 line-clamp-3 group-hover:text-blue-700 transition-colors">
              {article.title}
            </h3>
          </div>
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center text-gray-500 text-[10px] font-medium">
              <Clock size={10} className="mr-1" />
              <span>{timeAgo}</span>
            </div>
            <button onClick={handleSave} className="text-gray-400 hover:text-blue-600">
              <Bookmark size={14} className={saved ? 'fill-blue-500 text-blue-500' : ''} />
            </button>
          </div>
        </div>
      </Link>
    );
  }

  // Compact List Item (for sidebars/right side)
  if (variant === 'compact') {
    return (
      <Link href={`/news/${article.id}`} className="flex gap-3 group relative py-3 border-b border-gray-100 last:border-0 hover:bg-gray-50 px-2 rounded-lg transition-colors">
        <div className="relative w-20 h-16 shrink-0 overflow-hidden rounded-md bg-gray-200">
          <Image
            src={imageUrl}
            alt={article.title}
            fill
            sizes="80px"
            quality={60}
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        <div className="flex flex-col justify-between flex-1">
          <h3 className="text-[13px] font-bold leading-tight text-gray-900 line-clamp-2 group-hover:text-blue-700 transition-colors pr-6">
            {article.title}
          </h3>
          <div className="flex items-center text-gray-500 text-[10px] mt-1 font-medium">
            <span className="mr-2">{article.source}</span>
          </div>
        </div>
        <button onClick={handleSave} className="absolute top-3 right-2 text-gray-400 hover:text-blue-600">
          <Bookmark size={14} className={saved ? 'fill-blue-500 text-blue-500' : ''} />
        </button>
      </Link>
    );
  }

  // Default List Item
  return (
    <Link href={`/news/${article.id}`} className="flex gap-4 p-4 border-b border-gray-100 group hover:bg-gray-50 transition-colors relative block">
      <div className="relative w-28 h-20 shrink-0 overflow-hidden rounded-lg bg-gray-200">
        <Image
          src={imageUrl}
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
            {article.category?.name}
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
      <button onClick={handleSave} className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-blue-600 transition-colors bg-white rounded-md hover:bg-blue-50 shadow-sm border border-gray-100">
        <Bookmark size={16} className={saved ? 'fill-blue-500 text-blue-500' : ''} />
      </button>
    </Link>
  );
}
