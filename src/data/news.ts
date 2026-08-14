export interface NewsArticle {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  date: string;
  source: string;
}

export const categories = ["All", "Middle East", "Europe", "Visa & Immigration", "Jobs"];

export const newsArticles: NewsArticle[] = [
  {
    id: "1",
    title: "Saudi Arabia announces new digital Iqama for expats",
    description: "The General Directorate of Passports in Saudi Arabia has introduced a fully digital Iqama, allowing expatriates to carry their residency permits on their smartphones.",
    category: "Middle East",
    imageUrl: "https://images.unsplash.com/photo-1575294578144-8c838e53a362?q=80&w=2070&auto=format&fit=crop",
    date: "2026-08-14T09:00:00Z",
    source: "Saudi Gazette"
  },
  {
    id: "2",
    title: "Italy opens 40,000 seasonal work visas for non-EU citizens",
    description: "The Italian government has released the highly anticipated 'Decreto Flussi', offering tens of thousands of seasonal work visas for agricultural and tourism sectors.",
    category: "Europe",
    imageUrl: "https://images.unsplash.com/photo-1529154036614-a60975f5c760?q=80&w=2076&auto=format&fit=crop",
    date: "2026-08-13T14:30:00Z",
    source: "The Local Italy"
  },
  {
    id: "3",
    title: "Oman updates visa rules: What expatriates need to know",
    description: "New regulations in the Sultanate of Oman streamline the process for family joining visas and investor visas, aiming to attract foreign talent.",
    category: "Visa & Immigration",
    imageUrl: "https://images.unsplash.com/photo-1542615656-78d123a10111?q=80&w=2070&auto=format&fit=crop",
    date: "2026-08-12T10:15:00Z",
    source: "Times of Oman"
  },
  {
    id: "4",
    title: "Netherlands tightens student visa regulations for 2026",
    description: "International students planning to study in the Netherlands face stricter language requirements and financial proof thresholds starting next academic year.",
    category: "Europe",
    imageUrl: "https://images.unsplash.com/photo-1524047934617-cb782c24e5f3?q=80&w=2070&auto=format&fit=crop",
    date: "2026-08-11T08:45:00Z",
    source: "Dutch News"
  },
  {
    id: "5",
    title: "Qatar aims to hire 10,000 healthcare professionals by year-end",
    description: "In a major expansion of its medical sector, Qatar is heavily recruiting doctors and nurses from South Asia and the Philippines.",
    category: "Jobs",
    imageUrl: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2080&auto=format&fit=crop",
    date: "2026-08-10T16:20:00Z",
    source: "Gulf Times"
  },
  {
    id: "6",
    title: "US Diversity Visa Program (Green Card Lottery) dates announced",
    description: "The US Department of State has officially announced the registration dates for the 2028 Diversity Immigrant Visa Program.",
    category: "Visa & Immigration",
    imageUrl: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1974&auto=format&fit=crop",
    date: "2026-08-09T11:00:00Z",
    source: "USCIS"
  },
  {
    id: "7",
    title: "Kuwait introduces new biometric checks at all entry ports",
    description: "Expatriates returning to Kuwait will now have to undergo mandatory biometric scanning at the airport and land borders.",
    category: "Middle East",
    imageUrl: "https://images.unsplash.com/photo-1522031174624-9b160f607c74?q=80&w=1974&auto=format&fit=crop",
    date: "2026-08-08T09:30:00Z",
    source: "Kuwait Times"
  }
];
