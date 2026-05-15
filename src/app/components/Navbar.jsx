"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { ChevronRight, Globe2, Menu, Play, X } from "lucide-react";

import { useLanguage } from "@/context/lagnguageContext";
import { getTranslatedValue } from "@/hooks/getTranslatedValue";

export default function NewsNavbar() {
  const { lang, toggleLanguage } = useLanguage();

  const [isOpen, setIsOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  const categories = [
    { name: { bn: "বাংলাদেশ", en: "Bangladesh" }, slug: "bangladesh" },
    { name: { bn: "রাজনীতি", en: "Politics" }, slug: "politics" },
    { name: { bn: "আন্তর্জাতিক", en: "International" }, slug: "international" },
    { name: { bn: "খেলা", en: "Sports" }, slug: "sports" },
    { name: { bn: "বিনোদন", en: "Entertainment" }, slug: "entertainment" },
    { name: { bn: "বাণিজ্য", en: "Business" }, slug: "business" },
    { name: { bn: "প্রযুক্তি", en: "Technology" }, slug: "technology" },
    { name: { bn: "ধর্ম", en: "Religion" }, slug: "religion" },
    { name: { bn: "স্বাস্থ্য", en: "Health" }, slug: "health" },
    { name: { bn: "চাকরি", en: "Jobs" }, slug: "jobs" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const formattedDate = new Intl.DateTimeFormat(
    lang === "bn" ? "bn-BD" : "en-US",
    {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  ).format(new Date());

  return (
    <>
      <header className="absolute top-0 left-0 w-full z-50">
        {/* TOP NAVBAR */}
        <div className="border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 lg:px-0 h-[80px] flex items-center justify-between">
            {/* LEFT */}
            <div className="flex items-center gap-4">
              {/* MOBILE MENU */}
              <button
                onClick={() => setIsOpen(true)}
                className="lg:hidden text-white"
              >
                <Menu size={28} />
              </button>

              {/* LOGO */}
              <Link href="/">
                <Image
                  src="/nogorprobaho_w.png"
                  alt="logo"
                  width={400}
                  height={400}
                  className="w-20 pt-1 object-cover"
                />
              </Link>
            </div>

            {/* DATE */}
            <div className="hidden lg:block">
              <p className="text-white/70 text-sm">{formattedDate}</p>
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-3">
              {/* LIVE BTN */}
              <button className="hidden sm:flex items-center gap-2 bg-[#9d600d] hover:bg-[#c58a1d] transition text-white text-sm font-medium px-5 py-2.5 rounded-full">
                <Play size={15} fill="white" />

                {lang === "en" ? "Live TV" : "লাইভ টিভি"}
              </button>

              {/* LANGUAGE */}
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-2 border border-white/15 hover:bg-white/10 transition rounded-full px-4 py-2 text-white"
              >
                <Globe2 size={16} />

                <span className="text-sm font-medium">
                  {lang === "en" ? "বাংলা" : "EN"}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* CATEGORY NAVBAR */}
        <div
          className={`w-full transition-all duration-300 ${
            isSticky
              ? "fixed top-0 left-0 bg-black/90 backdrop-blur-xl shadow-xl border-b border-white/10"
              : "relative bg-black/20 backdrop-blur-md border-b border-white/10"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 lg:px-0">
            <nav className="hidden lg:flex items-center justify-between h-[60px]">
              {/* LEFT */}
              <div className="flex items-center gap-8 overflow-x-auto no-scrollbar">
                {categories.map((category) => (
                  <Link
                    key={category.slug}
                    href={`/category/${category.slug}`}
                    className="text-white/80 hover:text-white text-[15px] font-medium whitespace-nowrap transition relative group"
                  >
                    {getTranslatedValue(category.name, lang)}

                    <span className="absolute left-0 -bottom-[19px] w-0 h-[2px] bg-red-500 transition-all duration-300 group-hover:w-full" />
                  </Link>
                ))}
              </div>

              {/* RIGHT */}
              <button className="flex items-center gap-2 text-white hover:text-red-400 transition">
                <span className="text-sm font-medium">
                  {lang === "en" ? "Latest News" : "সর্বশেষ"}
                </span>

                <ChevronRight size={18} />
              </button>
            </nav>

            {/* MOBILE CATEGORY */}
            <div className="lg:hidden flex items-center justify-between h-[55px]">
              <span className="text-white font-medium">
                {lang === "en" ? "Top Categories" : "জনপ্রিয় বিভাগ"}
              </span>

              <button onClick={() => setIsOpen(true)} className="text-white">
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* OVERLAY */}
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 bg-black/50 z-[60] transition-all duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* SIDEBAR */}
      <div
        className={`fixed top-0 left-0 w-[300px] h-full bg-[#0f0f0f] z-[70] transition-all duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* TOP */}
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <Image
            src="/nogorprobaho.png"
            alt="logo"
            width={400}
            height={400}
            className="w-28"
          />

          <button onClick={() => setIsOpen(false)} className="text-white">
            <X size={25} />
          </button>
        </div>

        {/* LINKS */}
        <div className="flex flex-col">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              onClick={() => setIsOpen(false)}
              className="px-5 py-4 border-b border-white/5 text-white/80 hover:bg-white/5 transition"
            >
              {getTranslatedValue(category.name, lang)}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
