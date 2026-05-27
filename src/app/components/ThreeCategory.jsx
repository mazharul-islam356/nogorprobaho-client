"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { History } from "lucide-react";

import { useLanguage } from "@/context/lagnguageContext";
import { getTranslatedValue } from "@/hooks/getTranslatedValue";
import { getNewsByCategory } from "@/service/newsApi";
import { formatDateRelative } from "@/lib/formatDateRelative";

export default function ThreeCategorySection() {
  const { lang } = useLanguage();

  const [campus, setCampus] = useState([]);
  const [tech, setTech] = useState([]);
  const [corporate, setCorporate] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [campusData, techData, corporateData] = await Promise.all([
          getNewsByCategory("religion", "en"),
          getNewsByCategory("technology", "en"),
          getNewsByCategory("education", "en"),
        ]);

        setCampus(campusData?.data || []);
        setTech(techData?.data || []);
        setCorporate(corporateData?.data || []);
      } catch (error) {
        console.error(error);
      }
    };

    loadData();
  }, []);

  const sections = [
    {
      title: {
        en: "Religion",
        bn: "ধর্ম",
      },
      data: campus,
    },
    {
      title: {
        en: "Tech World",
        bn: "টেক ওয়ার্ল্ড",
      },
      data: tech,
    },
    {
      title: {
        en: "Education",
        bn: "শিক্ষা",
      },
      data: corporate,
    },
  ];

  return (
    <section className="py-10 bg-[#fafafa]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {sections.map((section, idx) => {
            const mainNews = section?.data?.[0];
            const sideNews = section?.data?.slice(1, 5);

            return (
              <div key={idx}>
                {/* SECTION HEADER */}
                <div className="border-b-2 border-[#BC8734] mb-4 pb-2">
                  <h2 className="text-xl font-semibold text-gray-800 inline-block">
                    {section.title[lang]}
                  </h2>
                </div>

                {/* MAIN CARD */}
                {mainNews && (
                  <Link href={`/news/${mainNews?._id || "#"}`}>
                    <article className="group bg-white border border-gray-200 overflow-hidden hover:shadow-lg transition mb-4 flex flex-col">
                      <div className="relative overflow-hidden h-[220px]">
                        <Image
                          src={
                            mainNews?.featuredImage?.[0] || "/placeholder.jpg"
                          }
                          alt={getTranslatedValue(mainNews?.title, lang)}
                          width={600}
                          height={400}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        />
                        <span className="absolute top-3 left-3 bg-[#BC8734] text-white  text-[10px] px-2 py-1 uppercase">
                          {getTranslatedValue(mainNews?.category, lang)}
                        </span>
                      </div>

                      <div className="p-4">
                        <h3 className="text-lg font-bold line-clamp-1 group-hover:text-[#BC8734] transition mb-2 ">
                          {getTranslatedValue(mainNews?.title, lang)}
                        </h3>
                        <p className="text-gray-600 text-sm line-clamp-2 mb-2">
                          {getTranslatedValue(mainNews?.excerpt, lang)}
                        </p>
                        <div className="text-xs text-gray-500 flex items-center gap-1">
                          <History size={12} />
                          {formatDateRelative(
                            mainNews?.publishedAt || mainNews?.createdAt,
                            lang,
                          )}
                        </div>
                      </div>
                    </article>
                  </Link>
                )}

                {/* SIDE NEWS LIST */}
                <div className="space-y-3">
                  {sideNews.map((news, i) => (
                    <Link key={i} href={`/news/${news?._id || "#"}`}>
                      <article className="group flex gap-3 bg-white border border-gray-200 p-3 hover:shadow-lg transition">
                        <div className="relative w-24 h-20 flex-shrink-0 overflow-hidden">
                          <Image
                            src={news?.featuredImage?.[0] || "/placeholder.jpg"}
                            alt={getTranslatedValue(news?.title, lang)}
                            width={100}
                            height={80}
                            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-medium line-clamp-2 group-hover:text-[#BC8734] transition mb-1">
                            {getTranslatedValue(news?.title, lang)}
                          </h4>
                          <div className="text-xs text-gray-500 flex items-center gap-1">
                            <History size={10} />
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
            );
          })}
        </div>
      </div>
    </section>
  );
}
