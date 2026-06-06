"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { ChevronRight } from "lucide-react";

import { useLanguage } from "@/context/lagnguageContext";
import { getTranslatedValue } from "@/hooks/getTranslatedValue";

import { getFeaturedNews } from "@/service/newsApi";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";

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

  if (loading) {
    return (
      <section className="relative h-screen bg-black animate-pulse">
        <div className="absolute inset-0 bg-gray-800" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 h-full flex items-end pb-20">
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

  if (!featured?.length) return null;

  return (
    <>
      <section className="relative h-screen overflow-hidden bg-black ">
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          loop={true}
          speed={1000}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          className="h-full"
        >
          {featured.map((news) => (
            <SwiperSlide key={news?._id}>
              <div className="relative h-screen">
                {/* Background Image */}
                <Image
                  src={news?.featuredImage?.[0]}
                  alt={getTranslatedValue(news?.title, lang)}
                  fill
                  priority
                  className="object-cover"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/55 z-10" />

                {/* Left Gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent z-10" />

                {/* Content */}
                <div className="relative z-20 h-full flex items-center pt-20 lg:pt-24">
                  <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl">
                      {/* Category */}
                      <span className="inline-flex items-center bg-[#57832A] text-white text-sm font-semibold px-4 py-1.5 rounded-full">
                        {getTranslatedValue(news?.category, lang)}
                      </span>

                      {/* Title */}
                      <h1 className="mt-4 text-white text-3xl sm:text-4xl lg:text-[55px] leading-tight lg:leading-[1.02] font-medium tracking-tight">
                        {getTranslatedValue(news?.title, lang)}
                      </h1>

                      {/* Description */}
                      <p className="mt-5 max-w-2xl text-white/75 text-sm sm:text-base lg:text-lg leading-7 line-clamp-3">
                        {getTranslatedValue(news?.content, lang)}
                      </p>

                      {/* Meta */}
                      <div className="mt-5 flex flex-wrap items-center gap-3 text-white/60 text-sm">
                        <span>{getTranslatedValue(news?.writer, lang)}</span>

                        <span className="w-1 h-1 rounded-full bg-white/50" />

                        <span>
                          {formatDate(
                            news?.publishedAt || news?.createdAt,
                            lang,
                          )}
                        </span>
                      </div>

                      {/* Button */}
                      <div className="mt-7">
                        <Link href={`/news/${news?._id}`}>
                          <button className="group flex items-center gap-1 bg-white hover:bg-[#57832A] cursor-pointer hover:text-white transition-all duration-300 text-black px-7 py-3 rounded-full font-semibold">
                            {lang === "en"
                              ? "Read Full Story"
                              : "বিস্তারিত পড়ুন"}

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
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <div className="hidden xl:block h-16 bg-white" />
    </>
  );
}
