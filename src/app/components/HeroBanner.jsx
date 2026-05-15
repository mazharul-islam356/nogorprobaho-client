"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { ChevronRight } from "lucide-react";

import { useLanguage } from "@/context/lagnguageContext";
import { getTranslatedValue } from "@/hooks/getTranslatedValue";

import { getFeaturedNews } from "@/service/newsApi";

const formatDate = (dateString, lang) => {
  const date = new Date(dateString);

  return date.toLocaleDateString(lang === "bn" ? "bn-BD" : "en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

export default function HeroSection() {
  const { lang } = useLanguage();

  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await getFeaturedNews();

        setFeatured(Array.isArray(data) ? data : []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const heroNews = featured?.[0];
  const sideNews = featured?.slice(1, 5);

  if (loading) {
    return (
      <section className="relative h-screen bg-black animate-pulse">
        <div className="absolute inset-0 bg-gray-800" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-0 h-full flex items-end pb-20">
          <div className="w-full">
            <div className="h-5 w-28 bg-gray-600 rounded-full mb-5" />

            <div className="h-14 w-3/4 bg-gray-600 rounded mb-4" />
            <div className="h-14 w-2/4 bg-gray-600 rounded mb-6" />

            <div className="h-5 w-2/4 bg-gray-700 rounded" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* HERO */}
      <section className="relative h-screen overflow-hidden bg-black">
        {/* BG IMAGE */}
        {heroNews && (
          <>
            <Image
              src={heroNews?.featuredImage?.[0]}
              alt="hero-news"
              fill
              priority
              className="object-cover"
            />

            {/* OVERLAY */}
            <div className="absolute inset-0 bg-black/55 z-10" />

            {/* LEFT GRADIENT */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent z-10" />
          </>
        )}

        {/* CONTENT */}
        <div className="relative z-20 h-full flex items-center">
          <div className="max-w-7xl mx-auto w-full px-4 lg:px-0 pt-28 lg:pt-24">
            <div className="max-w-4xl space-y-5">
              {/* CATEGORY */}
              <span className="inline-flex items-center bg-[#9d600d] text-white text-sm font-semibold px-4 py-1.5 rounded-full">
                {getTranslatedValue(heroNews?.category, lang)}
              </span>

              {/* TITLE */}
              <h1 className="text-white text-[34px]  lg:text-[60px] leading-[1.02] font-black tracking-tight mt-3">
                {getTranslatedValue(heroNews?.title, lang)}
              </h1>

              {/* DESC */}
              <p className="max-w-2xl text-white/75 text-[15px] sm:text-lg leading-8 line-clamp-3">
                {getTranslatedValue(heroNews?.content, lang)}
              </p>

              {/* META */}
              <div className="flex flex-wrap items-center gap-3 text-white/60 text-sm">
                <span>{getTranslatedValue(heroNews?.writer, lang)}</span>

                <span className="w-1 h-1 rounded-full bg-white/50" />

                <span>
                  {formatDate(
                    heroNews?.publishedAt || heroNews?.createdAt,
                    lang,
                  )}
                </span>
              </div>

              {/* BUTTON */}
              <div>
                <Link href={`/news/${heroNews?._id}`}>
                  <button className="group flex items-center bg-white hover:bg-[#9d600d] cursor-pointer hover:text-white transition-all duration-300 text-black px-7 py-3 rounded-full font-semibold">
                    {lang === "en" ? "Read Full Story" : "বিস্তারিত পড়ুন"}

                    <ChevronRight
                      size={18}
                      className="group-hover:translate-x-1 transition"
                    />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM CARDS */}
      </section>

      {/* SPACE FOR FLOATING CARDS */}
      <div className="hidden xl:block h-44 bg-[#f5f5f5]" />
    </>
  );
}
