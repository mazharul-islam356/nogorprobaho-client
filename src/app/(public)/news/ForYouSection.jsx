"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { getNewsByCategory } from "@/service/newsApi";
import { useLanguage } from "@/context/lagnguageContext";
import Link from "next/link";
import { History } from "lucide-react";
import { formatDateRelative } from "@/lib/formatDateRelative";

export default function ForYouSection() {
  const [entertainment, setEntertainment] = useState([]);
  const [business, setBusiness] = useState([]);
  const [corruption, setCorruption] = useState([]);
  const [world, setWorld] = useState([]);

  const { lang } = useLanguage();

  useEffect(() => {
    const loadData = async () => {
      try {
        const [e, b, c, w] = await Promise.all([
          getNewsByCategory("entertainment", "en"),
          getNewsByCategory("whole_country", "en"),
          getNewsByCategory("politics", "en"),
          getNewsByCategory("jobs", "en"),
        ]);

        setEntertainment(e?.data || []);
        setBusiness(b?.data || []);
        setCorruption(c?.data || []);
        setWorld(w?.data || []);
      } catch (err) {
        console.error(err);
      }
    };

    loadData();
  }, []);

  const newsData = [
    entertainment[3],
    business[0],
    corruption[3],
    world[0],
  ].filter(Boolean);

  const t = {
    title: {
      en: "The Sylheti Special",
      bn: "দ্যা সিলেটি স্পেশাল",
    },
  };

  return (
    <section className="w-full py-10 bg-[#fafafa]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-[#111]">
            {t.title[lang]}
          </h2>

          <div className="w-12 h-[2px] bg-[#BC8734] mt-2"></div>
        </div>

        {/* ROW 1: 2 CARDS (Small + Medium) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* First Card - Small */}
          {newsData[0] && (
            <Link href={`/news/${newsData[0]?._id || "#"}`}>
              <article className="group bg-white border border-gray-200 overflow-hidden hover:shadow-lg transition h-full flex flex-col">
                <div className="relative overflow-hidden h-[220px]">
                  <Image
                    src={newsData[0]?.featuredImage?.[0] || "/placeholder.jpg"}
                    alt="news"
                    width={600}
                    height={400}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-[#BC8734] text-white text-[10px] px-2 py-1 uppercase">
                    Entertainment
                  </span>
                </div>
                <div className="p-5 flex-grow">
                  <h3 className="text-xl font-bold line-clamp-2 group-hover:text-[#BC8734] transition mb-3">
                    {newsData[0]?.title?.[lang]}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                    {newsData[0]?.excerpt?.[lang] ||
                      newsData[0]?.content?.[lang]}
                  </p>
                  <div className="text-xs text-gray-500 flex items-center gap-1">
                    <History size={12} />
                    {formatDateRelative(
                      newsData[0]?.publishedAt || newsData[0]?.createdAt,
                      lang,
                    )}
                  </div>
                </div>
              </article>
            </Link>
          )}

          {/* Second Card - Medium with horizontal layout */}
          {newsData[1] && (
            <Link href={`/news/${newsData[1]?._id || "#"}`}>
              <article className="group bg-white border border-gray-200 overflow-hidden hover:shadow-lg transition h-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 h-full">
                  <div className="relative overflow-hidden h-[200px] sm:h-full">
                    <Image
                      src={
                        newsData[1]?.featuredImage?.[0] || "/placeholder.jpg"
                      }
                      alt="news"
                      width={400}
                      height={300}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                  </div>
                  <div className="p-5 flex flex-col justify-center">
                    <span className="bg-[#BC8734] text-white text-[10px] px-2 py-1 uppercase w-fit mb-2">
                      Business
                    </span>
                    <h3 className="text-lg font-bold line-clamp-2 group-hover:text-[#BC8734] transition mb-2">
                      {newsData[1]?.title?.[lang]}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2 mb-2">
                      {newsData[1]?.excerpt?.[lang] ||
                        newsData[1]?.content?.[lang]}
                    </p>
                    <div className="text-xs text-gray-500 flex items-center gap-1">
                      <History size={12} />
                      {formatDateRelative(
                        newsData[1]?.publishedAt || newsData[1]?.createdAt,
                        lang,
                      )}
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          )}
        </div>

        {/* ROW 2: 2 CARDS (Horizontal layout both) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {newsData[2] && (
            <Link href={`/news/${newsData[2]?._id || "#"}`}>
              <article className="group bg-white border border-gray-200 overflow-hidden hover:shadow-lg transition h-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 h-full">
                  <div className="relative overflow-hidden h-[200px] sm:h-full">
                    <Image
                      src={
                        newsData[2]?.featuredImage?.[0] || "/placeholder.jpg"
                      }
                      alt="news"
                      width={400}
                      height={300}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                  </div>
                  <div className="p-5 flex flex-col justify-center">
                    <span className="bg-[#BC8734] text-white text-[10px] px-2 py-1 uppercase w-fit mb-2">
                      Politics
                    </span>
                    <h3 className="text-lg font-bold line-clamp-2 group-hover:text-[#BC8734] transition mb-2">
                      {newsData[2]?.title?.[lang]}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2 mb-2">
                      {newsData[2]?.excerpt?.[lang] ||
                        newsData[2]?.content?.[lang]}
                    </p>
                    <div className="text-xs text-gray-500 flex items-center gap-1">
                      <History size={12} />
                      {formatDateRelative(
                        newsData[2]?.publishedAt || newsData[2]?.createdAt,
                        lang,
                      )}
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          )}

          {newsData[3] && (
            <Link href={`/news/${newsData[3]?._id || "#"}`}>
              <article className="group bg-white border border-gray-200 overflow-hidden hover:shadow-lg transition h-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 h-full">
                  <div className="relative overflow-hidden h-[200px] sm:h-full">
                    <Image
                      src={
                        newsData[3]?.featuredImage?.[0] || "/placeholder.jpg"
                      }
                      alt="news"
                      width={400}
                      height={300}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                  </div>
                  <div className="p-5 flex flex-col justify-center">
                    <span className="bg-[#BC8734] text-white text-[10px] px-2 py-1 uppercase w-fit mb-2">
                      Jobs
                    </span>
                    <h3 className="text-lg font-bold line-clamp-2 group-hover:text-red-600 transition mb-2">
                      {newsData[3]?.title?.[lang]}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2 mb-2">
                      {newsData[3]?.excerpt?.[lang] ||
                        newsData[3]?.content?.[lang]}
                    </p>
                    <div className="text-xs text-gray-500 flex items-center gap-1">
                      <History size={12} />
                      {formatDateRelative(
                        newsData[3]?.publishedAt || newsData[3]?.createdAt,
                        lang,
                      )}
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
