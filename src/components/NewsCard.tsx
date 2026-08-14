import React from 'react';
import Image from 'next/image';
import { Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { NewsArticle } from '@/data/news';

interface NewsCardProps {
  article: NewsArticle;
  featured?: boolean;
}

export default function NewsCard({ article, featured = false }: NewsCardProps) {
  const timeAgo = formatDistanceToNow(new Date(article.date), { addSuffix: true });

  if (featured) {
    return (
      <article className="relative w-full h-[400px] overflow-hidden group cursor-pointer">
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
        <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
          <span className="inline-block px-2.5 py-1 text-xs font-semibold bg-blue-600 rounded-sm mb-3">
            {article.category}
          </span>
          <h2 className="text-2xl font-bold leading-tight mb-2 group-hover:text-blue-100 transition-colors">
            {article.title}
          </h2>
          <div className="flex items-center text-gray-300 text-xs font-medium mt-3">
            <span className="text-white font-semibold mr-3">{article.source}</span>
            <Clock size={12} className="mr-1" />
            <span>{timeAgo}</span>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="flex gap-4 p-4 border-b border-gray-100 group cursor-pointer hover:bg-gray-50 transition-colors">
      <div className="relative w-28 h-20 shrink-0 overflow-hidden rounded-md bg-gray-200">
        <Image
          src={article.imageUrl}
          alt={article.title}
          fill
          sizes="112px"
          quality={60}
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="flex flex-col justify-between flex-1">
        <div>
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
    </article>
  );
}
