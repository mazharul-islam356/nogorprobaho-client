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
          getNewsByCategory("economy", "en"),
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
    {
      news: entertainment[1],
      category: {
        en: "Entertainment",
        bn: "বিনোদন",
      },
    },
    {
      news: business[0],
      category: {
        en: "Whole Country",
        bn: "সারাদেশ",
      },
    },
    {
      news: corruption[3],
      category: {
        en: "Politics",
        bn: "রাজনীতি",
      },
    },
    {
      news: world[0],
      category: {
        en: "Economy",
        bn: "অর্থনীতি",
      },
    },
  ].filter((item) => item.news);

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

        {/* Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {newsData[0] && (
            <Link href={`/news/${newsData[0].news?._id}`}>
              <article className="group bg-white border border-gray-200 overflow-hidden hover:shadow-lg transition h-full flex flex-col">
                <div className="relative overflow-hidden h-[220px]">
                  <Image
                    src={
                      newsData[0].news?.featuredImage?.[0] || "/placeholder.jpg"
                    }
                    alt="news"
                    width={600}
                    height={400}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />

                  <span className="absolute top-3 left-3 bg-[#BC8734] text-white text-[10px] px-2 py-1 uppercase">
                    {newsData[0].category[lang]}
                  </span>
                </div>

                <div className="p-5 flex-grow">
                  <h3 className="text-xl font-bold line-clamp-2 group-hover:text-[#BC8734] transition mb-3">
                    {newsData[0].news?.title?.[lang]}
                  </h3>

                  <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                    {newsData[0].news?.excerpt?.[lang] ||
                      newsData[0].news?.content?.[lang]}
                  </p>

                  <div className="text-xs text-gray-500 flex items-center gap-1">
                    <History size={12} />
                    {formatDateRelative(
                      newsData[0].news?.publishedAt ||
                        newsData[0].news?.createdAt,
                      lang,
                    )}
                  </div>
                </div>
              </article>
            </Link>
          )}

          {newsData[1] && (
            <Link href={`/news/${newsData[1].news?._id}`}>
              <article className="group bg-white border border-gray-200 overflow-hidden hover:shadow-lg transition h-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 h-full">
                  <div className="relative overflow-hidden h-[200px] sm:h-full">
                    <Image
                      src={
                        newsData[1].news?.featuredImage?.[0] ||
                        "/placeholder.jpg"
                      }
                      alt="news"
                      width={400}
                      height={300}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                  </div>

                  <div className="p-5 flex flex-col justify-center">
                    <span className="bg-[#BC8734] text-white text-[10px] px-2 py-1 uppercase w-fit mb-2">
                      {newsData[1].category[lang]}
                    </span>

                    <h3 className="text-lg font-bold line-clamp-2 group-hover:text-[#BC8734] transition mb-2">
                      {newsData[1].news?.title?.[lang]}
                    </h3>

                    <p className="text-gray-600 text-sm line-clamp-2 mb-2">
                      {newsData[1].news?.excerpt?.[lang] ||
                        newsData[1].news?.content?.[lang]}
                    </p>

                    <div className="text-xs text-gray-500 flex items-center gap-1">
                      <History size={12} />
                      {formatDateRelative(
                        newsData[1].news?.publishedAt ||
                          newsData[1].news?.createdAt,
                        lang,
                      )}
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          )}
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {newsData.slice(2).map((item, index) => (
            <Link key={index} href={`/news/${item.news?._id}`}>
              <article className="group bg-white border border-gray-200 overflow-hidden hover:shadow-lg transition h-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 h-full">
                  <div className="relative overflow-hidden h-[200px] sm:h-full">
                    <Image
                      src={item.news?.featuredImage?.[0] || "/placeholder.jpg"}
                      alt="news"
                      width={400}
                      height={300}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                  </div>

                  <div className="p-5 flex flex-col justify-center">
                    <span className="bg-[#BC8734] text-white text-[10px] px-2 py-1 uppercase w-fit mb-2">
                      {item.category[lang]}
                    </span>

                    <h3 className="text-lg font-bold line-clamp-2 group-hover:text-[#BC8734] transition mb-2">
                      {item.news?.title?.[lang]}
                    </h3>

                    <p className="text-gray-600 text-sm line-clamp-2 mb-2">
                      {item.news?.excerpt?.[lang] || item.news?.content?.[lang]}
                    </p>

                    <div className="text-xs text-gray-500 flex items-center gap-1">
                      <History size={12} />
                      {formatDateRelative(
                        item.news?.publishedAt || item.news?.createdAt,
                        lang,
                      )}
                    </div>
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
