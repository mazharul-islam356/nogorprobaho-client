"use client";

import { getNewsByCategory } from "@/service/newsApi";
import { getTranslatedValue } from "@/hooks/getTranslatedValue";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useLanguage } from "@/context/lagnguageContext";
import Link from "next/link";
import { History } from "lucide-react";
import { formatDateRelative } from "@/lib/formatDateRelative";

export default function Entertainment() {
  const [entertainment, setEntertainment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { lang } = useLanguage();

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getNewsByCategory("entertainment", "en");
        setEntertainment(data);
      } catch (error) {
        console.error(error);
        setError("Failed to load entertainment news");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const newsData = entertainment?.data || [];

  // ইউনিক লেআউট (বাম পাশে বড় কার্ড নেই)
  const topFeatured = newsData?.slice(0, 2) || []; // 2 টা বড় কার্ড
  const middleGrid = newsData?.slice(2, 10) || []; // 8 টা কার্ড (4x2 গ্রিড)
  const bottomCards = newsData?.slice(10, 18) || []; // 8 টা ছোট কার্ড (সব সমান হাইট)

  const t = {
    title: {
      en: "Entertainment",
      bn: "বিনোদন",
    },
  };

  // ---------------- LOADING ----------------
  if (loading) {
    return (
      <section className="py-10 animate-pulse">
        <div className="max-w-7xl mx-auto px-4">
          <div className="h-10 w-40 bg-gray-200 mb-6 mx-auto" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="h-[400px] bg-gray-200" />
            <div className="h-[400px] bg-gray-200" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-[280px] bg-gray-200" />
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-[200px] bg-gray-200" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // ---------------- ERROR ----------------
  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10 text-[#BC8734] text-center">
        {error}
      </div>
    );
  }

  return (
    <section className="py-10 bg-[#fafafa]">
      <div className="max-w-7xl mx-auto px-4">
        {/* HEADER - Same as politics */}
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-[#111]">
            {t.title[lang]}
          </h2>

          <div className="w-12 h-[2px] bg-[#BC8734] mt-2"></div>
        </div>

        {/* ROW 1: 2 BIG FEATURED CARDS SIDE BY SIDE */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {topFeatured.map((news) => (
            <Link key={news?._id} href={`/news/${news?._id || "#"}`}>
              <article className="group relative overflow-hidden bg-white border border-gray-200 hover:shadow-lg transition">
                <Image
                  src={news?.featuredImage?.[0] || "/placeholder.jpg"}
                  alt="featured"
                  width={800}
                  height={500}
                  className="w-full h-[300px] object-cover group-hover:scale-105 transition duration-700"
                />
                <div className="p-5">
                  <span className="bg-[#BC8734] text-white text-[10px] px-2 py-1 uppercase inline-block mb-2">
                    {getTranslatedValue(news?.category, lang)}
                  </span>
                  <h3 className="text-xl font-bold line-clamp-2 group-hover:text-[#BC8734] transition mb-2">
                    {getTranslatedValue(news?.title, lang)}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2 mb-2">
                    {getTranslatedValue(news?.excerpt, lang)}
                  </p>
                  <div className="text-xs text-gray-500 flex items-center gap-1">
                    <History size={12} />
                    {formatDateRelative(
                      news?.publishedAt || news?.createdAt,
                      lang,
                    )}
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* ROW 2: 4x2 GRID (8 CARDS) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {middleGrid.map((news, idx) => (
            <Link key={news?._id} href={`/news/${news?._id || "#"}`}>
              <article className="group bg-white border border-gray-200 overflow-hidden hover:shadow-lg transition h-[380px] flex flex-col">
                <div className="relative overflow-hidden h-[200px]">
                  <Image
                    src={news?.featuredImage?.[0] || "/placeholder.jpg"}
                    alt="news"
                    width={500}
                    height={250}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-[#BC8734] text-white text-[10px] px-2 py-1 uppercase">
                    {getTranslatedValue(news?.category, lang)}
                  </span>
                </div>
                <div className="p-4 flex-grow flex flex-col">
                  <h3 className="text-base font-semibold group-hover:text-[#BC8734] transition mb-2 line-clamp-2">
                    {getTranslatedValue(news?.title, lang)}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-3 mb-2">
                    {getTranslatedValue(news?.content, lang)}
                  </p>
                  <div className="mt-auto text-xs text-gray-500 flex items-center gap-1">
                    <History size={12} />
                    {formatDateRelative(
                      news?.publishedAt || news?.createdAt,
                      lang,
                    )}
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
