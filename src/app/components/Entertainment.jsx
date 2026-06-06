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

  // SPLIT
  const topGrid = newsData?.slice(0, 4) || []; // 2x2 (big grid)
  const bottomGrid = newsData?.slice(4, 10) || []; // 3 columns

  const t = {
    title: {
      en: "Entertainment",
      bn: "বিনোদন",
    },
  };

  if (loading) {
    return (
      <section className="py-10 animate-pulse">
        <div className="max-w-7xl mx-auto">
          <div className="h-8 w-40 bg-gray-200 mb-6" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-[280px] bg-gray-200" />
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-[260px] bg-gray-200" />
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
    <section className="py-10 bg-[#fafafa]">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-[#111]">{t.title[lang]}</h2>
          <div className="w-14 h-[3px] bg-[#BC8734] mt-2"></div>
        </div>

        {/* ROW 1: 2 COLUMN BIG GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {topGrid.map((news) => (
            <Link key={news?._id} href={`/news/${news?._id}`}>
              <article className="bg-white border overflow-hidden group hover:shadow-lg transition">
                <Image
                  src={news?.featuredImage?.[0] || "/placeholder.jpg"}
                  alt=""
                  width={800}
                  height={500}
                  className="w-full h-[320px] object-cover group-hover:scale-105 transition duration-700"
                />

                <div className="p-5">
                  <span className="text-xs bg-[#BC8734] text-white px-2 py-1 uppercase">
                    {getTranslatedValue(news?.category, lang)}
                  </span>

                  <h3 className="text-xl font-bold mt-3 line-clamp-2 group-hover:text-[#BC8734]">
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

        {/* ROW 2: 3 COLUMN GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bottomGrid.map((news) => (
            <Link key={news?._id} href={`/news/${news?._id}`}>
              <article className="bg-white border overflow-hidden group hover:shadow-lg transition h-full">
                <Image
                  src={news?.featuredImage?.[0] || "/placeholder.jpg"}
                  alt=""
                  width={600}
                  height={400}
                  className="w-full h-[220px] object-cover group-hover:scale-105 transition duration-500"
                />

                <div className="p-4">
                  <span className="text-[10px] bg-[#BC8734] text-white px-2 py-1 uppercase">
                    {getTranslatedValue(news?.category, lang)}
                  </span>

                  <h3 className="font-semibold mt-2 line-clamp-2 group-hover:text-[#BC8734]">
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
