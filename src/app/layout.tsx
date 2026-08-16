import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import { SavedNewsProvider } from "@/context/SavedNewsContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Probash Today News",
  description: "Latest news and updates for expatriates around the world.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body className="bg-gray-50 text-gray-900 antialiased min-h-screen flex flex-col">
        {/* Full-width container for desktop */}
        <div className="w-full min-h-screen bg-white relative pb-20 md:pb-0 overflow-x-hidden">
          <SavedNewsProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <BottomNav />
          </SavedNewsProvider>
        </div>
      </body>
    </html>
  );
}
