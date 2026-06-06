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
        setError("Failed to load entertainment news");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const newsData = entertainment?.data || [];

  const topGrid = newsData?.slice(0, 4) || [];
  const bottomGrid = newsData?.slice(4, 10) || [];

  const t = {
    title: {
      en: "Entertainment",
      bn: "বিনোদন",
    },
  };

  if (loading) {
    return (
      <section className="py-6 md:py-10 animate-pulse">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-8 w-40 bg-gray-200 mb-6 rounded" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-[220px] sm:h-[260px] md:h-[320px] bg-gray-200 rounded"
              />
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-[260px] bg-gray-200 rounded" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  return (
    <section className="pb-6 md:py-10 bg-[#fafafa]">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-[#111]">
            {t.title[lang]}
          </h2>
          <div className="w-14 h-[3px] bg-[#57832A] mt-2"></div>
        </div>

        {/* TOP GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-10">
          {topGrid.map((news) => (
            <Link key={news?._id} href={`/news/${news?._id}`}>
              <article className="bg-white border overflow-hidden group hover:shadow-lg transition duration-300 h-full">
                <div className="overflow-hidden">
                  <Image
                    src={news?.featuredImage?.[0] || "/placeholder.jpg"}
                    alt={getTranslatedValue(news?.title, lang)}
                    width={800}
                    height={500}
                    className="w-full h-[220px] sm:h-[260px] md:h-[320px] object-cover group-hover:scale-105 transition duration-700"
                  />
                </div>

                <div className="p-4 md:p-5">
                  <span className="text-[10px] md:text-xs bg-[#57832A] text-white px-2 py-1 uppercase">
                    {getTranslatedValue(news?.category, lang)}
                  </span>

                  <h3 className="text-lg md:text-xl font-bold mt-3 line-clamp-2 group-hover:text-[#57832A] transition-colors">
                    {getTranslatedValue(news?.title, lang)}
                  </h3>

                  <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                    {getTranslatedValue(news?.excerpt, lang)}
                  </p>

                  <div className="text-xs text-gray-500 mt-3 flex items-center gap-1">
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

        {/* BOTTOM GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {bottomGrid.map((news) => (
            <Link key={news?._id} href={`/news/${news?._id}`}>
              <article className="bg-white border overflow-hidden group hover:shadow-lg transition duration-300 h-full">
                <div className="overflow-hidden">
                  <Image
                    src={news?.featuredImage?.[0] || "/placeholder.jpg"}
                    alt={getTranslatedValue(news?.title, lang)}
                    width={600}
                    height={400}
                    className="w-full h-[180px] sm:h-[200px] md:h-[220px] object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>

                <div className="p-4">
                  <span className="text-[10px] bg-[#57832A] text-white px-2 py-1 uppercase">
                    {getTranslatedValue(news?.category, lang)}
                  </span>

                  <h3 className="text-base md:text-lg font-semibold mt-2 line-clamp-2 group-hover:text-[#57832A] transition-colors">
                    {getTranslatedValue(news?.title, lang)}
                  </h3>

                  <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                    {getTranslatedValue(news?.excerpt, lang)}
                  </p>

                  <div className="text-xs text-gray-500 mt-3 flex items-center gap-1">
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
