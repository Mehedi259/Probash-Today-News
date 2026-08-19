const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://46.225.103.236:8002';

export async function fetchNews() {
  const res = await fetch(`${API_BASE_URL}/api/news/`, {
    next: { revalidate: 60 } // Revalidate every 60 seconds
  });
  if (!res.ok) throw new Error('Failed to fetch news');
  return res.json();
}

export async function fetchNewsById(id: string) {
  const res = await fetch(`${API_BASE_URL}/api/news/${id}/`, {
    next: { revalidate: 60 }
  });
  if (!res.ok) throw new Error(`Failed to fetch news ${id}`);
  return res.json();
}

export async function fetchCategories() {
  const res = await fetch(`${API_BASE_URL}/api/categories/`, {
    next: { revalidate: 3600 } // Categories don't change often
  });
  if (!res.ok) throw new Error('Failed to fetch categories');
  return res.json();
}
