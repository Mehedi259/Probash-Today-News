'use client';

import React, { useState } from 'react';
import NewsCard from '@/components/NewsCard';
import { newsArticles, categories } from '@/data/news';

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('সব');

  const featuredArticle = newsArticles[0];
  
  const filteredArticles = newsArticles
    .slice(1) // exclude featured from the list
    .filter(article => activeCategory === 'সব' || article.category === activeCategory);

  return (
    <div className="flex flex-col min-h-screen bg-white pb-6">
      {/* Featured Section */}
      <section>
        <NewsCard article={featuredArticle} featured />
      </section>

      {/* Categories Scroll */}
      <section className="sticky top-[53px] z-40 bg-white border-b border-gray-100 shadow-[0_4px_10px_-10px_rgba(0,0,0,0.1)]">
        <div className="flex overflow-x-auto hide-scrollbar px-4 py-3 gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                activeCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Latest News List */}
      <section className="flex flex-col mt-2">
        <div className="px-4 py-3 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900 border-l-4 border-blue-600 pl-2">
            সর্বশেষ খবর
          </h2>
        </div>
        <div className="flex flex-col">
          {filteredArticles.length > 0 ? (
            filteredArticles.map((article) => (
              <NewsCard key={article.id} article={article} />
            ))
          ) : (
            <div className="p-8 text-center text-gray-500">
              এই বিভাগে কোন খবর পাওয়া যায়নি।
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
