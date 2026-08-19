import React from 'react';
import Link from 'next/link';
import { NewsArticle } from '@/data/news';

interface NewsTickerProps {
  articles: NewsArticle[];
}

export default function NewsTicker({ articles }: NewsTickerProps) {
  const latestNews = articles.slice(0, 5);

  return (
    <div className="bg-white border-b border-gray-200 flex items-center overflow-hidden h-10 shadow-sm relative z-10">
      <div className="bg-red-600 h-full flex items-center px-4 text-xs md:text-sm font-bold text-white shrink-0 z-20 shadow-[2px_0_5px_rgba(0,0,0,0.1)] relative">
        <span className="flex h-2 w-2 relative mr-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
        </span>
        সর্বশেষ
        <div className="absolute -right-3 top-0 h-full w-4 bg-red-600" style={{ clipPath: 'polygon(0 0, 0% 100%, 100% 100%)' }}></div>
      </div>
      <div className="flex-1 overflow-hidden relative h-full flex items-center bg-white ml-2">
        <div className="animate-marquee hover:animation-play-state-paused whitespace-nowrap flex items-center">
          {latestNews.map((article, index) => (
            <React.Fragment key={article.id}>
              <Link 
                href={`/news/${article.id}`}
                className="text-[13px] md:text-sm font-medium text-gray-800 hover:text-blue-600 transition-colors mx-8"
              >
                {article.title}
              </Link>
              {index < latestNews.length - 1 && (
                <span className="text-gray-300">|</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
