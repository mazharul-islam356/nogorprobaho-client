"use client";

import { useLanguage } from "@/context/lagnguageContext";
import { getTranslatedValue } from "@/hooks/getTranslatedValue";
import { formatDateRelative } from "@/lib/formatDateRelative";
import { getNewsByCategory } from "@/service/newsApi";

import Image from "next/image";
import Link from "next/link";

import React, { useEffect, useState } from "react";

import { Clock3 } from "lucide-react";

const National = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const { lang } = useLanguage();

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        const data = await getNewsByCategory("Sylhet", "en");

        setNews(data?.data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [lang]);

  // DATA
  const featuredNews = news?.[0];
  const sideNews = news?.slice(1, 4);
  const bottomNews = news?.slice(4, 7);

  const title = {
    title: {
      en: "Sylhet District",
      bn: "সিলেট জেলা",
    },
  };

  if (loading) {
    return (
      <section className="py-8 lg:py-10 bg-[#f5f5f5] animate-pulse">
        <div className="max-w-7xl mx-auto px-4 lg:px-0">
          <div className="h-8 w-40 bg-gray-300 mb-8"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-9 h-[340px] bg-gray-300"></div>

            <div className="lg:col-span-3 space-y-5">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-[95px] bg-gray-300"></div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-[260px] bg-gray-300"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 lg:py-10 bg-[#f5f5f5] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 lg:px-0">
        {/* TITLE */}
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-[#111]">
            {title.title[lang]}
          </h2>

          <div className="w-12 h-[2px] bg-[#BC8734] mt-2"></div>
        </div>

        {/* TOP SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* FEATURED */}
          <div className="lg:col-span-9 bg-[#ededed]">
            {featuredNews && (
              <Link href={`/news/${featuredNews?._id}`}>
                <article className="group grid grid-cols-1 md:grid-cols-2 items-stretch">
                  {/* CONTENT */}
                  <div className="pt-5 md:p-8 flex flex-col justify-center order-2 md:order-1">
                    <span className="text-[#BC8734] text-sm font-semibold">
                      {getTranslatedValue(featuredNews?.category, lang)}
                    </span>

                    <h2 className="mt-3 text-[26px] md:text-[40px] leading-[1.2] font-bold text-[#222] line-clamp-3 group-hover:text-[#BC8734] transition">
                      {getTranslatedValue(featuredNews?.title, lang)}
                    </h2>

                    <p className="mt-4 text-[16px] leading-8 text-gray-700 line-clamp-4">
                      {getTranslatedValue(featuredNews?.content, lang)}
                    </p>

                    <div className="mt-5 flex items-center gap-2 text-sm text-gray-500">
                      <Clock3 size={15} />

                      {formatDateRelative(featuredNews?.publishedAt, lang)}
                    </div>
                  </div>

                  {/* IMAGE */}
                  <div className="overflow-hidden order-1 md:order-2">
                    <Image
                      src={featuredNews?.featuredImage?.[0]}
                      alt="featured"
                      width={900}
                      height={700}
                      className="w-full h-52 md:h-full object-cover group-hover:scale-105 duration-700 transition"
                    />
                  </div>
                </article>
              </Link>
            )}
          </div>

          {/* RIGHT SIDE LIST */}
          <div className="lg:col-span-3 bg-[#ededed] divide-y divide-gray-300">
            {sideNews.map((item, index) => (
              <Link key={item?._id} href={`/news/${item?._id}`}>
                <article className="group p-5 flex gap-4">
                  {/* NUMBER */}
                  <div className="md:text-[58px] text-2xl leading-none font-bold text-gray-300 italic">
                    {index + 1}
                  </div>

                  {/* CONTENT */}
                  <div className="flex-1">
                    <h3 className="md:text-[22px] text-md leading-[1.5] font-semibold text-[#222] line-clamp-3 group-hover:text-[#BC8734] transition">
                      {getTranslatedValue(item?.title, lang)}
                    </h3>

                    <div className="md:mt-4 mt-1 flex items-center gap-2 md:text-sm text-xs text-gray-500">
                      <Clock3 size={14} />

                      {formatDateRelative(item?.publishedAt, lang)}
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>

        {/* BOTTOM NEWS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          {bottomNews.map((item) => (
            <Link key={item?._id} href={`/news/${item?._id}`}>
              <article className="group">
                {/* IMAGE */}
                <div className="overflow-hidden bg-gray-200">
                  <Image
                    src={item?.featuredImage?.[0]}
                    alt="news"
                    width={500}
                    height={350}
                    className="w-full h-[220px] object-cover group-hover:scale-105 transition duration-700"
                  />
                </div>

                {/* CONTENT */}
                <div className="pt-4">
                  <h3 className="text-[20px] md:text-[24px] leading-[1.5] font-semibold text-[#222] line-clamp-3 group-hover:text-[#BC8734] transition">
                    {getTranslatedValue(item?.title, lang)}
                  </h3>

                  <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
                    <Clock3 size={14} />

                    {formatDateRelative(item?.publishedAt, lang)}
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default National;
