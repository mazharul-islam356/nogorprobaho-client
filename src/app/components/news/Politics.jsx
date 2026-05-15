"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { History } from "lucide-react";

import { getNewsByCategory } from "@/service/newsApi";
import { getTranslatedValue } from "@/hooks/getTranslatedValue";
import { useLanguage } from "@/context/lagnguageContext";
import { formatDateRelative } from "@/lib/formatDateRelative";

export default function Politics() {
  const [politics, setPolitics] = useState([]);
  const [loading, setLoading] = useState(true);

  const { lang } = useLanguage();

  useEffect(() => {
    let mounted = true;

    const loadData = async () => {
      try {
        setLoading(true);
        const res = await getNewsByCategory("politics", "en");

        if (mounted) setPolitics(res?.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    loadData();
    return () => {
      mounted = false;
    };
  }, []);

  // Split data for unique layout without left big card
  const topRowCards = useMemo(() => politics?.slice(0, 4) || [], [politics]);
  const middleRowCards = useMemo(() => politics?.slice(4, 8) || [], [politics]);
  const bottomRowCards = useMemo(
    () => politics?.slice(8, 16) || [],
    [politics],
  );

  const t = {
    title: {
      en: "Politics",
      bn: "রাজনীতি",
    },
  };

  if (loading) {
    return (
      <section className="py-10 animate-pulse">
        <div className="max-w-7xl mx-auto px-4">
          <div className="h-10 w-40 bg-gray-200 mb-6 mx-auto" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-[320px] bg-gray-200 rounded-sm" />
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="h-[280px] bg-gray-200 rounded-sm" />
            <div className="h-[280px] bg-gray-200 rounded-sm" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-[260px] bg-gray-200 rounded-sm" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-10 bg-[#fafafa]">
      <div className="max-w-7xl mx-auto px-4">
        {/* HEADER */}
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-[#111]">
            {t.title[lang]}
          </h2>

          <div className="w-12 h-[2px] bg-red-600 mt-2"></div>
        </div>

        {/* ROW 1: 4 CARDS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {topRowCards.map((news) => (
            <Link key={news?._id} href={`/news/${news?._id}`}>
              <article className="group bg-white border border-gray-200 rounded-sm overflow-hidden hover:shadow-lg transition h-full flex flex-col">
                <div className="relative overflow-hidden">
                  <Image
                    src={news?.featuredImage?.[0]}
                    alt="news"
                    width={500}
                    height={300}
                    className="h-[200px] w-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-red-600 text-white text-[10px] px-2 py-1 uppercase rounded-sm">
                    {getTranslatedValue(news?.category, lang)}
                  </span>
                </div>
                <div className="p-4 flex-grow">
                  <h3 className="text-base font-semibold line-clamp-2 group-hover:text-red-600 transition mb-2">
                    {getTranslatedValue(news?.title, lang)}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2 mb-3">
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

        {/* ROW 2: 2 WIDE CARDS (HORIZONTAL LAYOUT) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {middleRowCards.slice(0, 2).map((news) => (
            <Link key={news?._id} href={`/news/${news?._id}`}>
              <article className="group bg-white border border-gray-200 rounded-sm overflow-hidden hover:shadow-lg transition h-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 h-full">
                  <div className="relative overflow-hidden h-[220px] sm:h-auto">
                    <Image
                      src={news?.featuredImage?.[0]}
                      alt="news"
                      width={400}
                      height={300}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                  </div>
                  <div className="p-5 flex flex-col justify-center">
                    <span className="bg-red-600 text-white text-[10px] px-2 py-1 uppercase rounded-sm w-fit mb-2">
                      {getTranslatedValue(news?.category, lang)}
                    </span>
                    <h3 className="text-lg font-bold line-clamp-2 group-hover:text-red-600 transition mb-2">
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
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* ROW 3: 4x2 GRID (MASONRY STYLE) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bottomRowCards.map((news, idx) => (
            <Link key={news?._id} href={`/news/${news?._id}`}>
              <article
                className={`group bg-white border border-gray-200 rounded-sm overflow-hidden hover:shadow-lg transition h-full flex flex-col ${
                  idx % 4 === 0 ? "lg:row-span-2" : ""
                }`}
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={news?.featuredImage?.[0]}
                    alt="news"
                    width={500}
                    height={idx % 4 === 0 ? 400 : 220}
                    className={`w-full object-cover group-hover:scale-105 transition duration-500 ${
                      idx % 4 === 0 ? "h-[280px]" : "h-[180px]"
                    }`}
                  />
                  <span className="absolute top-3 left-3 bg-red-600 text-white text-[10px] px-2 py-1 uppercase rounded-sm">
                    {getTranslatedValue(news?.category, lang)}
                  </span>
                </div>
                <div className="p-4 flex-grow">
                  <h3
                    className={`font-semibold group-hover:text-red-600 transition mb-2 ${
                      idx % 4 === 0 ? "text-lg" : "text-sm"
                    }`}
                  >
                    {getTranslatedValue(news?.title, lang)}
                  </h3>
                  {idx % 4 === 0 && (
                    <p className="text-gray-600 text-sm line-clamp-2 mb-2">
                      {getTranslatedValue(news?.excerpt, lang)}
                    </p>
                  )}
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
      </div>
    </section>
  );
}
