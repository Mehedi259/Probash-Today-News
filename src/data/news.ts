export interface NewsCategory {
  id: number;
  name: string;
  slug: string;
}

export interface NewsArticle {
  id: number;
  title: string;
  description: string;
  category: NewsCategory;
  image_url: string | null;
  image?: string;
  source: string;
  is_featured: boolean;
  is_trending: boolean;
  views: number;
  created_at: string;
}
