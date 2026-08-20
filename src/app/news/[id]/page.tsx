import React from 'react';
import { fetchNewsById, fetchNews } from '@/services/api';
import NewsDetailClient from './NewsDetailClient';
import { notFound } from 'next/navigation';

export default async function NewsDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  try {
    const [article, allNewsRes] = await Promise.all([
      fetchNewsById(id),
      fetchNews().catch(() => null)
    ]);
    if (!article) {
      return notFound();
    }
    
    // Extract recent news
    const allNewsList = Array.isArray(allNewsRes) ? allNewsRes : allNewsRes?.results || [];
    const recentNews = allNewsList.filter((n: any) => n.id.toString() !== id).slice(0, 5);

    return <NewsDetailClient article={article} recentNews={recentNews} />;
  } catch (error) {
    console.error("Failed to fetch news article", id, error);
    return notFound();
  }
}
