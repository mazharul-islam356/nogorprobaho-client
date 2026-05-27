"use client";

import { useLanguage } from "@/context/lagnguageContext";
import { getTranslatedValue } from "@/hooks/getTranslatedValue";
import { getLatestNews } from "@/service/newsApi";

import Image from "next/image";
import Link from "next/link";

import { useEffect, useState } from "react";

import { ArrowUpRight, Clock3, Eye } from "lucide-react";

import { formatDateRelative } from "@/lib/formatDateRelative";

export default function LatestNews() {
  const [latest, setLatest] = useState([]);
  const [loading, setLoading] = useState(true);
  const { lang } = useLanguage();

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        setLoading(true);
        const data = await getLatestNews();
        setLatest(Array.isArray(data) ? data : []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchLatest();
  }, []);

  if (loading) {
    return (
      <section className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto">
          <div className="h-8 w-40 bg-gray-200 mb-2"></div>
          <div className="h-6 w-64 bg-gray-100 mb-8"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-gray-100 h-64"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // ভিন্ন স্লাইসিং - নতুন লেআউটের জন্য
  const mainNews = latest?.[0];
  const secondaryNews = latest?.slice(1, 3);
  const gridNews = latest?.slice(3, 9);
  const sideNews = latest?.slice(9, 12);

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* === হেডার - মিনিমাল === */}
        <div className="mb-8">
          <div className="flex items-baseline justify-between flex-wrap gap-3">
            <div>
              <span className="text-[#BC8734] text-sm font-bold uppercase tracking-wider">
                {lang === "en" ? "What's New" : "নতুন কী"}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">
                {lang === "en" ? "Latest Headlines" : "সর্বশেষ শিরোনাম"}
              </h2>
            </div>

            <Link
              href="/latest"
              className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-[#BC8734] border-b border-gray-300 hover:border-[#BC8734] pb-0.5"
            >
              {lang === "en" ? "View All" : "সব দেখুন"}
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>

        {/* === মেইন গ্রিড - 3 কলাম + 2:1 রেশিও === */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* বাম পাশে: বড় ফিচার (col-span-2) */}
          <div className="lg:col-span-2">
            {mainNews && (
              <Link href={`/news/${mainNews?._id}`}>
                <div className="group relative bg-gray-900">
                  <Image
                    src={mainNews?.featuredImage?.[0]}
                    alt="main"
                    width={800}
                    height={500}
                    className="w-full h-[320px] sm:h-[400px] object-cover opacity-90 group-hover:opacity-100 transition"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-[#BC8734] px-2 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider">
                        {getTranslatedValue(mainNews?.category, lang)}
                      </span>
                      <span className="text-white/60 text-xs flex items-center gap-1">
                        <Clock3 size={12} />
                        {formatDateRelative(
                          mainNews?.publishedAt || mainNews?.createdAt,
                          lang,
                        )}
                      </span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight line-clamp-2 group-hover:text-red-400 transition">
                      {getTranslatedValue(mainNews?.title, lang)}
                    </h2>

                    <p className="mt-2 text-gray-200 text-sm text-ellipsis line-clamp-4 ">
                      {getTranslatedValue(mainNews?.content, lang)}
                    </p>
                  </div>
                </div>
              </Link>
            )}

            {/* সেকেন্ডারি নিউজ - ২টা হরাইজন্টাল */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
              {secondaryNews.map((item) => (
                <Link key={item?._id} href={`/news/${item?._id}`}>
                  <div className="group flex gap-3 border-b border-gray-100 pb-4 hover:border-red-200 transition-all">
                    <div className="w-24 h-24 sm:w-28 sm:h-28 bg-gray-100 overflow-hidden flex-shrink-0">
                      <Image
                        src={item?.featuredImage?.[0]}
                        alt="sec"
                        width={120}
                        height={120}
                        className="w-full h-full object-cover group-hover:scale-105 transition"
                      />
                    </div>
                    <div className="flex-1">
                      <span className="text-[10px] text-[#BC8734] font-bold uppercase">
                        {getTranslatedValue(item?.category, lang)}
                      </span>
                      <h3 className="mt-1 text-base font-bold text-gray-800 line-clamp-2 text-ellipsis group-hover:text-[#BC8734]">
                        {getTranslatedValue(item?.title, lang)}
                      </h3>
                      <div className="mt-2 text-[10px] text-gray-400">
                        {formatDateRelative(
                          item?.publishedAt || item?.createdAt,
                          lang,
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* ডান পাশে: ছোট নিউজ লিস্ট (col-span-1) */}
          <div className="space-y-4">
            <div className="border-l-4 border-[#BC8734] pl-3 mb-3">
              <span className="text-xs font-bold text-gray-500 uppercase">
                Must Read
              </span>
            </div>

            {sideNews.map((item, idx) => (
              <Link key={item?._id} href={`/news/${item?._id}`}>
                <div className="group flex gap-3 items-start border-b border-gray-100 pb-3 last:border-0">
                  <div className="w-8 h-8 bg-gray-200 flex items-center justify-center text-sm font-bold text-gray-600 flex-shrink-0">
                    {idx + 1}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-gray-800 line-clamp-2 group-hover:text-[#BC8734]">
                      {getTranslatedValue(item?.title, lang)}
                    </h4>
                    <span className="text-[9px] text-gray-400 mt-1 block">
                      {formatDateRelative(
                        item?.publishedAt || item?.createdAt,
                        lang,
                      )}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* === নিচের গ্রিড - 3x2 লেআউট (ভিন্ন স্ট্রাকচার) === */}
        <div className="mt-10 pt-6 border-t border-gray-200">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-8 h-8 bg-[#BC8734] flex items-center justify-center">
              <Eye size={14} className="text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-800">
              {lang === "en" ? "More News" : "আরও খবর"}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {gridNews.map((item, idx) => (
              <Link key={item?._id} href={`/news/${item?._id}`}>
                <div className="group border border-gray-200 hover:border-gray-400 transition-all rounded-sm">
                  <div className="relative overflow-hidden bg-gray-100">
                    <Image
                      src={item?.featuredImage?.[0]}
                      alt="grid"
                      width={400}
                      height={250}
                      className="w-full h-[180px] object-cover group-hover:scale-105 rounded-sm transition"
                    />
                    <div className="absolute top-2 left-2 bg-black/70 text-white text-[9px] font-bold px-1.5 py-0.5">
                      {idx + 1}
                    </div>
                  </div>

                  <div className="p-3">
                    <span className="text-[9px] text-[#BC8734] font-bold uppercase tracking-wider">
                      {getTranslatedValue(item?.category, lang)}
                    </span>
                    <h4 className="mt-1 text-base font-bold text-gray-800 line-clamp-1 group-hover:text-[#BC8734]">
                      {getTranslatedValue(item?.title, lang)}
                    </h4>
                    <div className="mt-2 flex items-center gap-2 text-[10px] text-gray-400">
                      <Clock3 size={10} />
                      {formatDateRelative(
                        item?.publishedAt || item?.createdAt,
                        lang,
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
