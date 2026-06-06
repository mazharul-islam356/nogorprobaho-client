"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import BreakingTicker from "../components/news/BreakingTicker";
import HeroSection from "../components/HeroBanner";
import AdBanner from "../components/AdBanner";
import FeaturedGrid from "../components/news/FeaturedGrid";
import ForYouSection from "./news/ForYouSection";
import AdBanner2 from "../components/AdBanner2";
import LatestNews from "../components/news/LatestNews";
import National from "./news/National";
import ThreeCategorySection from "../components/ThreeCategory";
import SportsSection from "../components/SportsSection";
import International from "../components/International";
import Politics from "../components/news/Politics";
import Economy from "../components/Economy";
import Entertainment from "../components/Entertainment";
export const categories = [
  { name: "Politics", slug: "politics" },
  { name: "Technology", slug: "technology" },
  { name: "Sports", slug: "sports" },
  { name: "International", slug: "international" },
  { name: "Business", slug: "business" },
  { name: "Entertainment", slug: "entertainment" },
];

export const bangladeshNewsHeadlines = [
  {
    _id: "1",
    slug: "dhaka-smart-traffic-system",
    title: {
      bn: "ঢাকায় যানজট কমাতে নতুন স্মার্ট ট্রাফিক সিস্টেম চালু করা হয়েছে",
      en: "New smart traffic system launched to reduce congestion in Dhaka",
    },
  },
  {
    _id: "2",
    slug: "padma-bridge-maintenance",
    title: {
      bn: "পদ্মা সেতুর রক্ষণাবেক্ষণে নতুন প্রযুক্তি ব্যবহার শুরু",
      en: "New technology introduced for maintenance of Padma Bridge",
    },
  },
  {
    _id: "3",
    slug: "export-growth-bangladesh",
    title: {
      bn: "বাংলাদেশের রপ্তানি আয় গত বছরের তুলনায় ১২% বৃদ্ধি পেয়েছে",
      en: "Bangladesh export earnings increased by 12% compared to last year",
    },
  },
  {
    _id: "4",
    slug: "digital-payment-growth",
    title: {
      bn: "দেশে ডিজিটাল পেমেন্ট ব্যবস্থার ব্যবহার দ্রুত বৃদ্ধি পাচ্ছে",
      en: "Digital payment usage is rapidly increasing in Bangladesh",
    },
  },
  {
    _id: "5",
    slug: "heavy-rain-warning",
    title: {
      bn: "আবহাওয়া অধিদপ্তর দেশের বিভিন্ন এলাকায় ভারী বৃষ্টির সতর্কতা জারি করেছে",
      en: "Meteorological department issues heavy rainfall warning across several regions",
    },
  },
  {
    _id: "6",
    slug: "digital-classroom-project",
    title: {
      bn: "সরকারি স্কুলগুলোতে ডিজিটাল ক্লাসরুম সম্প্রসারণ প্রকল্প চালু হয়েছে",
      en: "Digital classroom expansion project launched in government schools",
    },
  },
  {
    _id: "7",
    slug: "new-hospital-dhaka",
    title: {
      bn: "ঢাকায় নতুন বিশেষায়িত হাসপাতাল উদ্বোধনের প্রস্তুতি চলছে",
      en: "Preparation underway to inaugurate a new specialized hospital in Dhaka",
    },
  },
  {
    _id: "8",
    slug: "startup-investment-growth",
    title: {
      bn: "বাংলাদেশে স্টার্টআপ ইকোসিস্টেমে বিনিয়োগ বৃদ্ধি পাচ্ছে",
      en: "Investment in Bangladesh startup ecosystem is increasing",
    },
  },
];
export default function HomePage() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    api.get("/news").then((res) => setNews(res.data));
  }, []);

  const featured = news[0];

  const trending = [...news]
    .sort((a, b) => b.viewCount - a.viewCount)
    .slice(0, 5);

  return (
    <div>
      {/* <BreakingTicker news={news.slice(0, 5)} /> */}

      <HeroSection featured={featured} />
      <AdBanner imageUrl="/bks-ad.jpg" />
      <LatestNews />
      <National />
      <International />
      <AdBanner2
        link="https://www.youtube.com/watch?v=q3spaWr_NgE"
        imageUrl="/nagadad.gif"
      />
      <Politics />
      <Economy />
      {/* <National /> */}
      <SportsSection />
      <Entertainment />
      <AdBanner imageUrl="/Prothoma-wSlider-Gif-02.gif" />
      {/* <FeaturedGrid /> */}
      <ThreeCategorySection />
      <ForYouSection />
    </div>
  );
}
