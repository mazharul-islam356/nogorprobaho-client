"use client";
import { useState } from "react";
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function AdBanner2({ imageUrl, link }) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="w-full max-w-6xl mx-auto my-6">
      {/* Title */}
      <p className="text-center text-gray-500 text-xs mb-2 tracking-wide">
        বিজ্ঞাপন
      </p>

      {/* Ad Wrapper */}
      <div className="relative bg-white py-4 px-4 md:px-5">
        <Link href={link || "#"} target="_blank" rel="noopener noreferrer">
          <Image
            src={imageUrl}
            alt="Advertisement"
            width={1500}
            height={90}
            className="
              mx-auto
              object-contain
              h-12           /* mobile (≈320x50) */
              md:h-20        /* tablet */
              lg:h-40        /* desktop */
            "
          />
        </Link>

        {/* Close Button */}
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white rounded-full p-1 transition"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
