'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Clock, Bookmark, Share2, MessageCircle, Link as LinkIcon, Hash } from 'lucide-react';
import { format } from 'date-fns';
import { bn } from 'date-fns/locale';
import { NewsArticle } from '@/data/news';
import { useSavedNews } from '@/context/SavedNewsContext';

interface NewsDetailClientProps {
  article: NewsArticle;
}

export default function NewsDetailClient({ article }: NewsDetailClientProps) {
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

  const imageUrl = article.image 
    ? article.image.replace('http://46.225.103.236:8002', '') 
    : (article.image_url || '/images/news1.jpg');

  return (
    <div className="flex flex-col min-h-screen bg-white pb-20">
      {/* App Bar overlay */}
      <div className="fixed top-0 left-0 right-0 max-w-2xl mx-auto z-50 flex items-center justify-between p-4 bg-gradient-to-b from-black/60 to-transparent">
        <button 
          onClick={() => router.back()}
          className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/50 transition"
        >
          <ArrowLeft size={20} />
        </button>
        <div className="flex gap-3">
          <button 
            onClick={handleSave}
            className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/50 transition"
          >
            <Bookmark size={20} className={saved ? 'fill-blue-500 text-blue-500' : ''} />
          </button>
          <button className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/50 transition">
            <Share2 size={20} />
          </button>
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative w-full h-[45vh] bg-gray-200">
        <Image 
          src={imageUrl} 
          alt={article.title} 
          fill 
          className="object-cover" 
          priority 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
          <span className="inline-block px-3 py-1 text-xs font-bold bg-blue-600 text-white rounded mb-3 shadow-sm">
            {article.category?.name}
          </span>
          <h1 className="text-2xl md:text-3xl font-bold text-white leading-snug">
            {article.title}
          </h1>
        </div>
      </div>

      {/* Content */}
      <article className="p-5 bg-white -mt-4 relative z-20 rounded-t-2xl">
        
        {/* Meta */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-xl">
              {article.source.charAt(0)}
            </div>
            <div>
              <p className="font-bold text-gray-900 text-sm">{article.source}</p>
              <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                <Clock size={12} /> {formattedDate}
              </p>
            </div>
          </div>
        </div>

        {/* Article Body (Mock data extension since we only have description) */}
        <div className="prose prose-lg prose-blue max-w-none text-gray-800">
          <p className="text-lg font-medium leading-relaxed mb-6 text-gray-700">
            {article.description}
          </p>
          
          <p className="leading-relaxed mb-4">
            এটি একটি ডেমো নিউজ আর্টিকেল। মূল নিউজের বিস্তারিত অংশ এখানে থাকবে। প্রবাসীদের জন্য প্রতিনিয়ত নতুন নতুন আপডেট আসছে, আর সেই সব আপডেট সবার আগে পৌঁছে দিতেই আমাদের এই ক্ষুদ্র প্রয়াস।
          </p>
          <p className="leading-relaxed mb-4">
            সংবাদটি শেয়ার করে অন্যকে জানার সুযোগ করে দিন। আপনার যেকোনো মতামত বা পরামর্শ আমাদের জানাতে পারেন।
          </p>
        </div>

        {/* Share Section */}
        <div className="mt-8 pt-6 border-t border-gray-100">
          <h3 className="text-sm font-bold text-gray-800 mb-4">সংবাদটি শেয়ার করুন</h3>
          <div className="flex gap-3">
            <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-blue-50 text-blue-600 font-semibold rounded-xl hover:bg-blue-100 transition">
              <LinkIcon size={18} /> কপি লিংক
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#1DA1F2]/10 text-[#1DA1F2] font-semibold rounded-xl hover:bg-[#1DA1F2]/20 transition">
              <Hash size={18} /> এক্স
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#25D366]/10 text-[#25D366] font-semibold rounded-xl hover:bg-[#25D366]/20 transition">
              <MessageCircle size={18} /> হোয়াটসঅ্যাপ
            </button>
          </div>
        </div>

      </article>
    </div>
  );
}
