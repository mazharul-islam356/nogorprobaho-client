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
    <section className="w-full min-h-screen bg-[#f3f3f3] py-6">
      <div className="bg-white border border-gray-200  px-10 py-2 flex sticky top-0 items-center justify-between mb-6 z-500">
        {/* Left Logo */}
        <Link href={`/`} className="flex items-center gap-3">
          <div className="relative md:w-20 md:h-20 w-14 h-14">
            <Image
              src="/nogorprobaho.png"
              alt="Logo"
              fill
              className="object-contain"
            />
          </div>
        </Link>

        {/* Right Date Time */}
        <div className="hidden md:flex flex-col items-end">
          <span className="text-sm text-gray-500 font-medium">
            Current Date & Time
          </span>

          <span className="text-base font-semibold text-gray-800">
            {currentTime}
          </span>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4">
        {/* Top Thumbnail Pages */}
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
          {pages.map((page, index) => (
            <button
              key={index}
              onClick={() => setSelectedPage(index)}
              className={`relative min-w-[110px] border-2 transition-all duration-300 rounded-md overflow-hidden bg-white ${
                selectedPage === index
                  ? "border-red-500 shadow-lg scale-[1.02]"
                  : "border-gray-200 hover:border-gray-400"
              }`}
            >
              <div className="relative w-30 h-48 p-2">
                <Image
                  src={page}
                  alt={`Page ${index + 1}`}
                  fill
                  className="object-cover p-1"
                />
              </div>

              <div className="absolute bottom-0 left-0 w-full bg-black/70 text-white text-xs py-1 text-center font-medium">
                Page {String(index + 1).padStart(2, "0")}
              </div>
            </button>
          ))}
        </div>

        {/* Main Viewer */}
        <div className="mt-4 bg-white border border-gray-200 rounded-xl shadow-sm  md:pt-6">
          {/* Top Controls */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-5 px-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                Today Newspaper
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Viewing Page {selectedPage + 1} of {pages.length}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() =>
                  setSelectedPage((prev) =>
                    prev === 0 ? pages.length - 1 : prev - 1,
                  )
                }
                className="px-5 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-100 text-sm font-medium transition-all"
              >
                Prev Page
              </button>

              <button
                onClick={() =>
                  setSelectedPage((prev) =>
                    prev === pages.length - 1 ? 0 : prev + 1,
                  )
                }
                className="px-5 py-2.5 bg-black text-white rounded-lg hover:bg-gray-800 text-sm font-medium transition-all"
              >
                Next Page
              </button>
            </div>
          </div>

          {/* Large Paper Preview */}
          <div className="flex justify-center aspect-[3/4]">
            <div className="relative w-full max-w-5xl  bg-gray-100 border border-gray-200 rounded-xl overflow-hidden">
              <Image
                src={pages[selectedPage]}
                alt={`Page ${selectedPage + 1}`}
                fill
                priority
                className="object-contain"
              />
            </div>
          </div>

          {/* Bottom Pagination */}
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {pages.map((_, index) => (
              <button
                key={index}
                onClick={() => setSelectedPage(index)}
                className={`w-11 h-11 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  selectedPage === index
                    ? "bg-red-600 text-white shadow-md"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
