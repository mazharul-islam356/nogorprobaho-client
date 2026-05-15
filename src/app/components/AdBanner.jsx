"use client";

import { useState } from "react";
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function AdBanner({ imageUrl, link }) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-0 my-4 sm:my-6">
      {/* Banner Wrapper */}
      <div className="relative w-full h-16  md:h-20 lg:h-20 overflow-hidden shadow-sm">
        {/* Clickable Ad */}
        <Link href={link || "#"} target="_blank" rel="noopener noreferrer">
          <Image
            src={imageUrl || "/placeholder.jpg"}
            alt="Advertisement"
            fill
            className="object-cover"
          />
        </Link>

        {/* Close Button */}
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-2 right-2 bg-red-700/80 hover:bg-red-700 text-white rounded-full p-1 transition z-10"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
