"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { ChevronRight, Globe2, Menu, Play, X } from "lucide-react";

import { useLanguage } from "@/context/lagnguageContext";
import { getTranslatedValue } from "@/hooks/getTranslatedValue";
import { Newspaper } from "lucide-react";
import { usePathname } from "next/navigation";

export default function NewsNavbar() {
  const { lang, toggleLanguage } = useLanguage();

  const [isOpen, setIsOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  const categories = [
    { name: { bn: "বাংলাদেশ", en: "Bangladesh" }, slug: "bangladesh" },
    { name: { bn: "রাজনীতি", en: "Politics" }, slug: "politics" },
    { name: { bn: "সিলেট", en: "Sylhet" }, slug: "sylhet" },
    { name: { bn: "সুনামগঞ্জ", en: "Sunamganj" }, slug: "sunamganj" },
    { name: { bn: "মৌলভীবাজার", en: "Moulvibazar" }, slug: "moulvibazar" },
    { name: { bn: "হবিগঞ্জ", en: "Habiganj" }, slug: "habiganj" },
    { name: { bn: "আন্তর্জাতিক", en: "International" }, slug: "international" },
    { name: { bn: "খেলা", en: "Sports" }, slug: "sports" },
    { name: { bn: "বিনোদন", en: "Entertainment" }, slug: "entertainment" },
    { name: { bn: "বাণিজ্য", en: "Business" }, slug: "business" },

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
  const pathname = usePathname();

  const isDarkBg =
    pathname.startsWith("/categories") || pathname.startsWith("/news");
  return (
    <>
      <header className="absolute  top-0 left-0 w-full z-50">
        {/* TOP NAVBAR */}
        <div
          className={`border-b ${
            isDarkBg ? "bg-black/80" : "bg-black/20"
          } backdrop-blur-md border-white/10`}
        >
          <div className="max-w-7xl mx-auto px-4 lg:px-0 h-16 flex items-center justify-between">
            {/* LEFT */}
            <div className="flex items-center gap-4">
              {/* LOGO */}
              <Link href="/">
                <Image
                  src="/the-syltheti.png"
                  alt="logo"
                  width={400}
                  height={400}
                  className="w-28 pt-1 object-cover"
                />
              </Link>
            </div>

            <div className="hidden lg:block">
              <p className="text-white/70 text-sm">{formattedDate}</p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href={`/e-paper`}
                className="hidden sm:flex items-center gap-2 bg-[#57832A] hover:bg-[#092F12] transition text-white text-sm font-medium px-5 py-2 rounded-full"
              >
                <Newspaper size={15} />

                {lang === "en" ? "E-Paper" : "ই-পেপার"}
              </Link>

              <button
                onClick={toggleLanguage}
                className="flex items-center gap-2 border border-white/15 hover:bg-white/10 transition rounded-full md:px-4 px-3 py-1.5 md:py-2 text-white cursor-pointer"
              >
                <Globe2 size={15} />

                <span className="md:text-sm text-xs font-medium mt-1 md:mt-0">
                  {lang === "en" ? "বাংলা" : "EN"}
                </span>
              </button>

              {/* MOBILE MENU */}
              <button
                onClick={() => setIsOpen(true)}
                className="lg:hidden text-white"
              >
                <Menu size={26} />
              </button>
            </div>
          </div>
        </div>

        <div
          className={`w-full transition-all duration-300 ${
            isSticky
              ? "fixed top-0 left-0 bg-black/90 backdrop-blur-xl shadow-xl border-b border-white/10"
              : `relative ${
                  isDarkBg ? "bg-black/80" : "bg-black/20"
                } backdrop-blur-md border-b border-white/10`
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 lg:px-0">
            <nav className="hidden lg:flex items-center justify-between h-[60px]">
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

              <button className="flex items-center gap-2 text-white cursor-pointer hover:text-[#70a938] transition">
                <span className="text-sm font-medium">
                  {lang === "en" ? "Latest News" : "সর্বশেষ"}
                </span>

                <ChevronRight size={18} />
              </button>
            </nav>
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
            src="/the-syltheti.png"
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
