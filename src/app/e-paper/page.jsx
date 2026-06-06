"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const pages = [
  "/e-papper1.jpg",
  "/e-papper2.jpg",
  "/e-papper3.jpg",
  "/e-papper4.jpg",
  "/e-papper5.jpg",
];

export default function EPaperSection() {
  const [selectedPage, setSelectedPage] = useState(0);
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();

      const formatted = now.toLocaleString("en-BD", {
        weekday: "short",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      setCurrentTime(formatted);
    };

    updateClock();

    const interval = setInterval(updateClock, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full font-sans bg-[#f8f9fa] min-h-screen pb-8">
      {/* Sticky Header */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between py-1">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 sm:gap-3">
              <div>
                <Image
                  src="/the_sylheti_black.png"
                  alt="Logo"
                  width={500}
                  height={500}
                  className="object-contain w-20 h-14 md:w-36 md:h-20"
                />
              </div>
            </Link>

            {/* Date/Time - Hidden on mobile, visible on md+ */}
            <div className="hidden md:flex flex-col items-end">
              <span className="text-xs text-gray-500 font-medium">
                Current Date & Time
              </span>
              <span className="text-sm font-semibold text-gray-800">
                {currentTime}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-6">
        {/* Thumbnail Strip - Horizontal Scroll */}
        <div className="relative mb-6">
          <div className="overflow-x-auto pb-3 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
            <div className="flex gap-3 sm:gap-4 min-w-max">
              {pages.map((page, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedPage(index)}
                  className={`relative flex-shrink-0 transition-all duration-200 rounded-lg overflow-hidden bg-white shadow-sm ${
                    selectedPage === index
                      ? "ring-2 ring-[#57832A] ring-offset-2 scale-[1.02]"
                      : "border border-gray-200 hover:border-gray-300 hover:shadow-md"
                  }`}
                >
                  <div className="relative w-20 h-28 sm:w-24 sm:h-32 md:w-28 md:h-40">
                    <Image
                      src={page}
                      alt={`Page ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 80px, (max-width: 768px) 96px, 112px"
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-[10px] sm:text-xs py-1 text-center font-medium backdrop-blur-[2px]">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Viewer Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Header with title and nav buttons */}
          <div className="p-4 sm:p-5 border-b border-gray-100">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 tracking-tight">
                  E-Newspaper
                </h1>
                <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                  Page {selectedPage + 1} of {pages.length}
                </p>
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  onClick={() =>
                    setSelectedPage((prev) =>
                      prev === 0 ? pages.length - 1 : prev - 1,
                    )
                  }
                  className="px-4 sm:px-5 py-2 text-sm font-medium rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all active:scale-[0.98]"
                >
                  ← Prev
                </button>
                <button
                  onClick={() =>
                    setSelectedPage((prev) =>
                      prev === pages.length - 1 ? 0 : prev + 1,
                    )
                  }
                  className="px-4 sm:px-5 py-2 text-sm font-medium rounded-lg bg-[#57832A] text-white hover:bg-[#456a21] transition-all active:scale-[0.98] shadow-sm"
                >
                  Next →
                </button>
              </div>
            </div>
          </div>

          {/* Paper Preview - Responsive aspect ratio */}
          <div className="p-4 sm:p-6 bg-gray-50">
            <div className="relative aspect-[3/4] md:aspect-[2/3] lg:aspect-[3/4] max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
              <Image
                src={pages[selectedPage]}
                alt={`Newspaper Page ${selectedPage + 1}`}
                fill
                priority
                className="object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1024px"
              />
            </div>
          </div>

          {/* Page Pagination Dots/Circles */}
          <div className="px-4 sm:px-6 py-4 sm:py-5 border-t border-gray-100 bg-white">
            <div className="flex flex-wrap justify-center gap-2">
              {pages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedPage(index)}
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
                    selectedPage === index
                      ? "bg-[#57832A] text-white shadow-md scale-105"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile-only date/time (shown only on small screens) */}
        <div className="mt-6 text-center md:hidden">
          <div className="inline-block bg-white/80 backdrop-blur-sm rounded-full px-4 py-1.5 shadow-sm border border-gray-100">
            <span className="text-xs text-gray-500 font-medium">
              {currentTime}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
