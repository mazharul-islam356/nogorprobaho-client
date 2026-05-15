"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import AdBanner from "@/app/components/AdBanner";
import ForYouSection from "../../news/ForYouSection";
import { getNewsByCategory } from "@/service/newsApi";
import { useLanguage } from "@/context/lagnguageContext";
import { useParams } from "next/navigation";
import { Calendar, PenLine } from "lucide-react";

const categories = [
  { name: { bn: "সারাদেশ", en: "whole_country" }, slug: "bangladesh" },
  { name: { bn: "বিশ্ব", en: "World" }, slug: "world" },
  { name: { bn: "আন্তর্জাতিক", en: "International" }, slug: "international" },
  { name: { bn: "রাজনীতি", en: "Politics" }, slug: "politics" },
  { name: { bn: "মতামত", en: "Opinion" }, slug: "opinion" },
  { name: { bn: "জাতীয়", en: "National" }, slug: "national" },
  { name: { bn: "বাণিজ্য", en: "Business" }, slug: "business" },
  { name: { bn: "অর্থনীতি", en: "Economy" }, slug: "economy" },
  { name: { bn: "প্রযুক্তি", en: "Technology" }, slug: "technology" },
  { name: { bn: "বিজ্ঞান", en: "Science" }, slug: "science" },
  { name: { bn: "খেলা", en: "Sports" }, slug: "sports" },
  { name: { bn: "বিনোদন", en: "Entertainment" }, slug: "entertainment" },
  { name: { bn: "লাইফস্টাইল", en: "Lifestyle" }, slug: "lifestyle" },
  { name: { bn: "শিক্ষা", en: "Education" }, slug: "education" },
  { name: { bn: "চাকরি", en: "Jobs" }, slug: "jobs" },
  { name: { bn: "ধর্ম", en: "Religion" }, slug: "religion" },
  { name: { bn: "দুর্নীতি", en: "Corruption" }, slug: "corruption" },
  { name: { bn: "স্বাস্থ্য", en: "Health" }, slug: "health" },
  { name: { bn: "পরিবেশ", en: "Environment" }, slug: "environment" },
  { name: { bn: "অপরাধ", en: "Crime" }, slug: "crime" },
  { name: { bn: "আইন ও আদালত", en: "Law & Court" }, slug: "law-court" },
  { name: { bn: "গণমাধ্যম", en: "Media" }, slug: "media" },
  { name: { bn: "প্রবাস", en: "Diaspora" }, slug: "diaspora" },
];

export default function NewsPage() {
  const params = useParams();
  const slug = params?.slug;
  const { lang } = useLanguage();

  const [news, setNews] = useState([]);
  const [categoryInfo, setCategoryInfo] = useState(null);

  useEffect(() => {
    // Find category info based on slug
    const foundCategory = categories.find((cat) => cat.slug === slug);
    setCategoryInfo(foundCategory);
  }, [slug]);

  useEffect(() => {
    const loadNews = async () => {
      try {
        const data = await getNewsByCategory(slug, "en");
        setNews(data?.data || data || []);
      } catch (error) {
        console.log(error);
      }
    };

    loadNews();
  }, [slug, lang]);

  // Helper function to get localized category name
  const getCategoryName = () => {
    if (!categoryInfo) return slug;
    return lang === "bn" ? categoryInfo.name.bn : categoryInfo.name.en;
  };

  // Helper function to get localized title
  const getLocalizedTitle = (item) => {
    if (!item?.title) return "";
    return lang === "bn" && item.title?.bn
      ? item.title.bn
      : item.title?.en || item.title;
  };

  // Helper function to get localized content
  const getLocalizedContent = (item) => {
    if (!item?.content) return "";
    const content =
      lang === "bn" && item.content?.bn
        ? item.content.bn
        : item.content?.en || item.content;
    return content?.replace(/[#*]/g, "") || "";
  };

  // Helper function to get localized writer
  const getLocalizedWriter = (item) => {
    if (!item?.writer) return "";
    return lang === "bn" && item.writer?.bn
      ? item.writer.bn
      : item.writer?.en || item.writer;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 pb-10">
      <AdBanner imageUrl="/c-ad.jpg" />

      {/* PAGE TITLE */}
      <div className="py-6 border-b mb-6">
        <h1 className="text-3xl font-bold capitalize text-teal-600">
          {lang === "bn"
            ? `${getCategoryName()} খবর`
            : `${getCategoryName()} News`}
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ================= LEFT SIDE ================= */}
        <div className="lg:col-span-2 space-y-8">
          {/* TOP NEWS */}
          {news[0] && (
            <Link href={`/news/${news[0]._id}`}>
              <div className="group cursor-pointer">
                <div className="relative w-full h-[400px]">
                  <Image
                    src={news[0]?.featuredImage?.[0] || "/news02.jpg"}
                    alt=""
                    fill
                    className="object-cover rounded-xl"
                  />
                </div>

                <h2 className="text-3xl font-bold mt-4 group-hover:text-teal-500 transition">
                  {getLocalizedTitle(news[0])}
                </h2>

                <p className="text-gray-600 mt-3 line-clamp-3">
                  {getLocalizedContent(news[0])?.slice(0, 250)}
                  ...
                </p>

                <div className="flex items-center gap-4 mb-4 mt-2 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <PenLine size={15} />
                    <span>{getLocalizedWriter(news[0])}</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <Calendar size={15} />
                    <span>
                      {new Date(news[0]?.publishedAt).toLocaleDateString(
                        lang === "bn" ? "bn-BD" : "en-US",
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          )}

          {/* NEWS LIST */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {news.slice(1, 7).map((item) => (
              <Link href={`/news/${item._id}`} key={item._id}>
                <div className="group cursor-pointer border border-gray-200 rounded-sm overflow-hidden hover:shadow-lg transition duration-300 bg-white h-full flex flex-col">
                  {/* IMAGE */}
                  <div className="relative w-full h-44 overflow-hidden">
                    <Image
                      src={item?.featuredImage?.[0] || "/news04.jpg"}
                      alt={getLocalizedTitle(item)}
                      fill
                      className="object-cover group-hover:scale-105 transition duration-500"
                    />
                  </div>

                  {/* CONTENT */}
                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="text-lg md:text-xl font-bold leading-snug group-hover:text-teal-500 transition line-clamp-2">
                      {getLocalizedTitle(item)}
                    </h3>

                    <p className="text-gray-600 text-sm mt-3 line-clamp-3 flex-1">
                      {getLocalizedContent(item)?.slice(0, 150)}
                      ...
                    </p>

                    {/* FOOTER */}
                    <div className="flex items-center justify-between mt-4 text-xs md:text-sm text-gray-500 border-t pt-3">
                      <span className="truncate max-w-[120px]">
                        {getLocalizedWriter(item)}
                      </span>

                      <span>
                        {new Date(item?.publishedAt).toLocaleDateString(
                          lang === "bn" ? "bn-BD" : "en-US",
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* ================= RIGHT SIDEBAR ================= */}
        <div className="space-y-6">
          {/* CATEGORY CARD */}
          <div className="bg-teal-50 border border-teal-100 rounded-xl p-5">
            <h2 className="text-2xl font-bold text-teal-600 mb-2 capitalize">
              {lang === "bn"
                ? `${getCategoryName()} বিভাগ`
                : `${getCategoryName()} Category`}
            </h2>

            <p className="text-gray-600 text-sm">
              {lang === "bn"
                ? `${getCategoryName()} বিভাগের সর্বশেষ ব্রেকিং এবং ট্রেন্ডিং খবর।`
                : `Latest breaking and trending news from the ${getCategoryName()} category.`}
            </p>
          </div>

          {/* TRENDING */}
          <div className="border rounded-xl p-5">
            <h3 className="text-xl font-bold border-b pb-3 mb-4 text-teal-600">
              {lang === "bn" ? "ট্রেন্ডিং খবর" : "Trending News"}
            </h3>

            <div className="space-y-4">
              {news.slice(6, 11).map((item, index) => (
                <Link href={`/news/${item._id}`} key={item._id}>
                  <div className="flex gap-3 group">
                    <span className="text-2xl font-bold text-teal-500">
                      {index + 1}
                    </span>

                    <div>
                      <p className="font-medium text-sm group-hover:text-teal-500 transition line-clamp-2">
                        {getLocalizedTitle(item)}
                      </p>

                      <span className="text-xs text-gray-500">
                        {new Date(item?.publishedAt).toLocaleDateString(
                          lang === "bn" ? "bn-BD" : "en-US",
                        )}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* SMALL GRID */}
          <div className="grid grid-cols-2 gap-4">
            {news.slice(11, 15).map((item) => (
              <Link href={`/news/${item._id}`} key={item._id}>
                <div className="group">
                  <div className="relative w-full h-28">
                    <Image
                      src={item?.featuredImage?.[0] || "/img1.jpg"}
                      alt=""
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>

                  <p className="text-sm font-medium mt-2 line-clamp-2 group-hover:text-teal-500 transition">
                    {getLocalizedTitle(item)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <ForYouSection />
    </div>
  );
}
