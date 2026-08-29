import React from 'react';
import { fetchNews, fetchCategories } from '@/services/api';
import ExploreClient from './ExploreClient';
import { Suspense } from 'react';
import { NewsArticle, NewsCategory } from '@/data/news';

export default async function ExplorePage() {
  let allNews: NewsArticle[] = [];
  let categories: NewsCategory[] = [];
  
  try {
    const [newsRes, catRes] = await Promise.all([
      fetchNews(),
      fetchCategories()
    ]);
    allNews = newsRes;
    categories = catRes;
  } catch (error) {
    console.error("Failed to fetch explore data:", error);
  }

  return (
    <Suspense fallback={<div className="p-8 text-center">লোড হচ্ছে...</div>}>
      <ExploreClient initialNews={allNews} categories={categories} />
    </Suspense>
  );
}
