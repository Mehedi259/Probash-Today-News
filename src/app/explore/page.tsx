import React from 'react';
import { fetchNews, fetchCategories } from '@/services/api';
import ExploreClient from './ExploreClient';
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

  return <ExploreClient initialNews={allNews} categories={categories} />;
}
