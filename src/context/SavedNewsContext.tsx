'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { NewsArticle } from '@/data/news';

interface SavedNewsContextType {
  savedArticles: NewsArticle[];
  saveArticle: (article: NewsArticle) => void;
  removeArticle: (id: number) => void;
  isSaved: (id: number) => boolean;
}

const SavedNewsContext = createContext<SavedNewsContextType | undefined>(undefined);

export function SavedNewsProvider({ children }: { children: ReactNode }) {
  const [savedArticles, setSavedArticles] = useState<NewsArticle[]>([]);
  const [mounted, setMounted] = useState(false);

  // Load from local storage on mount
  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('probash_saved_news');
    if (stored) {
      try {
        setSavedArticles(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse saved news", e);
      }
    }
  }, []);

  // Save to local storage whenever savedArticles changes
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('probash_saved_news', JSON.stringify(savedArticles));
    }
  }, [savedArticles, mounted]);

  const saveArticle = (article: NewsArticle) => {
    setSavedArticles(prev => {
      if (prev.some(a => a.id === article.id)) return prev;
      return [article, ...prev];
    });
  };

  const removeArticle = (id: number) => {
    setSavedArticles(prev => prev.filter(article => article.id !== id));
  };

  const isSaved = (id: number) => {
    return savedArticles.some(article => article.id === id);
  };

  return (
    <SavedNewsContext.Provider value={{ savedArticles, saveArticle, removeArticle, isSaved }}>
      {children}
    </SavedNewsContext.Provider>
  );
}

export function useSavedNews() {
  const context = useContext(SavedNewsContext);
  if (context === undefined) {
    throw new Error('useSavedNews must be used within a SavedNewsProvider');
  }
  return context;
}
