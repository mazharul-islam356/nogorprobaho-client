"use client";

import { useLanguage } from "@/context/lagnguageContext";
import { getTranslatedValue } from "@/hooks/getTranslatedValue";
import { formatDateRelative } from "@/lib/formatDateRelative";
import { getNewsByCategory } from "@/service/newsApi";

import Image from "next/image";
import Link from "next/link";

import { Globe2, History } from "lucide-react";

import { useEffect, useState } from "react";

export default function International() {
  const [international, setInternational] = useState([]);
  const [loading, setLoading] = useState(true);

  const { lang } = useLanguage();

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        const data = await getNewsByCategory("world", "en");

        setInternational(data?.data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // DATA
  const featuredNews = international?.[0];
  const leftList = international?.slice(1, 4);
  const rightGrid = international?.slice(4, 8);

  const t = {
    title: {
      en: "International",
      bn: "আন্তর্জাতিক",
    },
  };

  // LOADING
  if (loading) {
    return (
      <section className="py-8 lg:py-12 animate-pulse">
        <div className="max-w-7xl mx-auto px-4 lg:px-0">
          <div className="h-10 w-52 bg-gray-200 mb-8"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 h-[500px] bg-gray-200"></div>

            <div className="lg:col-span-5 space-y-5">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-[150px] bg-gray-200"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-10 lg:py-12 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-0">
        {/* TITLE */}
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-[#111]">
            {t.title[lang]}
          </h2>

          <div className="w-12 h-[2px] bg-[#57832A] mt-2"></div>
        </div>

        {/* MAIN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT SIDE */}
          <div className="lg:col-span-7">
            {featuredNews && (
              <Link href={`/news/${featuredNews?._id}`}>
                <article className="group relative overflow-hidden">
                  {/* IMAGE */}
                  <div className="overflow-hidden">
                    <Image
                      src={featuredNews?.featuredImage?.[0]}
                      alt="featured"
                      width={1000}
                      height={700}
                      className="w-full h-[270px] md:h-[500px] object-cover group-hover:scale-105 duration-700 transition"
                    />
                  </div>

                  {/* OVERLAY */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                  {/* CONTENT */}
                  <div className="absolute bottom-0 left-0 p-5 md:p-8 w-full">
                    <div className="flex items-center gap-2 text-white/80 text-xs uppercase tracking-[2px]">
                      <Globe2 size={14} />

                      {getTranslatedValue(featuredNews?.category, lang)}
                    </div>

                    <h2 className="mt-3 text-[24px] md:text-[42px] leading-[1.2] font-bold text-white line-clamp-3">
                      {getTranslatedValue(featuredNews?.title, lang)}
                    </h2>

                    <p className="hidden md:block mt-4 text-[15px] leading-7 text-white/80 line-clamp-2 max-w-3xl">
                      {getTranslatedValue(featuredNews?.content, lang)}
                    </p>

                    <div className="mt-5 flex items-center gap-2 text-sm text-white/70">
                      <History size={14} />

                      {formatDateRelative(
                        featuredNews?.publishedAt || featuredNews?.createdAt,
                        lang,
                      )}
                    </div>
                  </div>
                </article>
              </Link>
            )}
          </div>

          {/* RIGHT SIDE */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            {/* TOP LIST */}
            <div className="space-y-4">
              {leftList.map((news, index) => (
                <Link key={news?._id} href={`/news/${news?._id}`}>
                  <article className="group flex gap-4 border-b border-gray-200 pb-4">
                    {/* NUMBER */}
                    <div className="text-[40px] leading-none font-bold text-gray-200 italic">
                      0{index + 1}
                    </div>

                    {/* CONTENT */}
                    <div className="flex-1">
                      <h3 className="text-[18px] leading-7 font-bold text-[#111] line-clamp-2 group-hover:text-[#57832A] transition">
                        {getTranslatedValue(news?.title, lang)}
                      </h3>

                      <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
                        <History size={13} />

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
            <div className="grid grid-cols-2 gap-4 pt-2">
              {rightGrid.map((news) => (
                <Link key={news?._id} href={`/news/${news?._id}`}>
                  <article className="group">
                    {/* IMAGE */}
                    <div className="overflow-hidden">
                      <Image
                        src={news?.featuredImage?.[0]}
                        alt="news"
                        width={400}
                        height={260}
                        className="w-full h-[120px] md:h-[140px] object-cover group-hover:scale-105 transition duration-700"
                      />
                    </div>

                    {/* CONTENT */}
                    <div className="pt-3">
                      <h4 className="text-[14px] md:text-[16px] leading-6 font-semibold text-[#111] line-clamp-3 group-hover:text-[#57832A] transition">
                        {getTranslatedValue(news?.title, lang)}
                      </h4>

                      <div className="mt-2 flex items-center gap-1 text-[11px] text-gray-500">
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
        </div>
      </div>
    </section>
  );
}
