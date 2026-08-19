import React from 'react';
import { fetchNewsById } from '@/services/api';
import NewsDetailClient from './NewsDetailClient';
import { notFound } from 'next/navigation';

export default async function NewsDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  try {
    const article = await fetchNewsById(id);
    if (!article) {
      return notFound();
    }
    return <NewsDetailClient article={article} />;
  } catch (error) {
    console.error("Failed to fetch news article", id, error);
    return notFound();
  }
}
