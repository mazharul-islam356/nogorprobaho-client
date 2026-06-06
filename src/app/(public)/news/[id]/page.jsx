"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
import {
  Facebook,
  Twitter,
  Link as LinkIcon,
  Share2,
  PenLine,
  Clock3,
} from "lucide-react";

import { useLanguage } from "@/context/lagnguageContext";

import {
  formatDateTime,
  shareOnFacebook,
  shareOnTwitter,
  copyLink,
} from "@/utils/newsHelpers";

import Image from "next/image";

export default function NewsDetailsPage() {
  const { id } = useParams();
  const pathname = usePathname();
  const { lang } = useLanguage();

  const [news, setNews] = useState(null);
  const [latestNews, setLatestNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fullUrl =
    typeof window !== "undefined" ? window.location.origin + pathname : "";

  const sidebarTitle = {
    en: "Latest News",
    bn: "সর্বশেষ খবর",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [newsRes, latestRes] = await Promise.all([
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/news/${id}`),
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/news`),
        ]);

        setNews(newsRes.data);
        setLatestNews(latestRes.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [id]);

  // ---------------- LOADING ----------------
  if (loading) {
    return (
      <div className="flex flex-col gap-2.5 items-center justify-center h-screen bg-white">
        <div className="flex flex-col items-center gap-4">
          <Image
            src="/the_sylheti_black.png"
            alt="logo"
            width={120}
            height={120}
          />
        </div>
        <div className="flex items-center justify-center min-h-screen">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-[#57832A] rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (!news) {
    return (
      <div className="text-center py-24 text-[#57832A]">News not found</div>
    );
  }

  return (
    <div className="bg-white md:mt-28 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-6 md:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT CONTENT */}
          <div className="lg:col-span-8">
            {/* CATEGORY */}
            <span className="inline-block text-[#57832A] text-sm font-medium border-b border-[#57832A] pb-1">
              {news.category?.[lang]}
            </span>

            {/* TITLE */}
            <h1 className="text-2xl sm:text-4xl font-bold leading-snug text-gray-900 mt-4">
              {news.title?.[lang]}
            </h1>

            {/* META + SHARE */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-5 border-b border-gray-200 pb-4">
              {/* META */}
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span className="flex items-center gap-1.5">
                  <PenLine size={14} />
                  {news.writer?.[lang]}
                </span>

                <span>•</span>

                <span className="flex items-center gap-1.5">
                  <Clock3 size={14} />
                  {formatDateTime(
                    news.publishedAt !== null
                      ? news.publishedAt
                      : news.updatedAt || news.createdAt,
                    lang,
                  )}
                </span>
              </div>

              {/* SHARE */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => shareOnFacebook(fullUrl)}
                  className="w-9 h-9 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:opacity-90 transition"
                >
                  <Facebook size={16} />
                </button>

                <button
                  onClick={() => shareOnTwitter(fullUrl, news.title?.[lang])}
                  className="w-9 h-9 rounded-full bg-[#1DA1F2] text-white flex items-center justify-center hover:opacity-90 transition"
                >
                  <Twitter size={16} />
                </button>

                <button
                  onClick={() => copyLink(fullUrl)}
                  className="w-9 h-9 rounded-full bg-gray-800 text-white flex items-center justify-center hover:opacity-90 transition"
                >
                  <LinkIcon size={16} />
                </button>

                <button
                  onClick={() =>
                    navigator.share?.({
                      title: news.title?.[lang],
                      url: fullUrl,
                    })
                  }
                  className="w-9 h-9 rounded-full bg-green-600 text-white flex items-center justify-center hover:opacity-90 transition"
                >
                  <Share2 size={16} />
                </button>
              </div>
            </div>

            {/* FEATURE IMAGE */}
            <div className="mt-6">
              <Image
                src={news.featuredImage?.[0] || "/placeholder.jpg"}
                width={1200}
                height={700}
                alt={news.title?.[lang]}
                className="w-full h-[230px] sm:h-[400px] md:h-[500px] object-cover"
              />
            </div>

            {/* CONTENT */}
            <div className="mt-6">
              <div className="text-[16px] sm:text-[18px] leading-8 text-gray-800 whitespace-pre-line">
                {news.content?.[lang]}
              </div>
            </div>
          </div>

          {/* SIDEBAR */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-5">
              {/* SIDEBAR TITLE */}
              <div className="flex items-center gap-3 mb-5">
                <div className="w-1 h-6 bg-teal-600 rounded-full"></div>

                <h2 className="text-xl font-bold text-gray-900">
                  {sidebarTitle[lang]}
                </h2>
              </div>

              {/* LATEST NEWS */}
              <div className="space-y-4">
                {latestNews.slice(0, 6).map((item) => (
                  <Link key={item._id} href={`/news/${item._id}`}>
                    <div className="flex gap-3 group border-b border-gray-200 pb-4">
                      {/* IMAGE */}
                      <div className="relative w-28 h-20 shrink-0 overflow-hidden rounded">
                        <Image
                          src={item.featuredImage?.[0] || "/placeholder.jpg"}
                          fill
                          alt={item.title?.[lang]}
                          className="object-cover group-hover:scale-105 transition duration-300"
                        />
                      </div>

                      {/* TITLE */}
                      <div>
                        <h3 className="text-sm sm:text-[15px] leading-6 font-medium text-gray-800 line-clamp-3 group-hover:text-teal-600 transition">
                          {item.title?.[lang]}
                        </h3>

                        <p className="text-xs text-gray-500 mt-1">
                          {formatDateTime(
                            item.publishedAt !== null
                              ? item.publishedAt
                              : item.updatedAt || item.createdAt,
                            lang,
                          )}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
