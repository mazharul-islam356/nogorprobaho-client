"use client";

// components/FeaturedGrid.jsx

import Image from "next/image";
import { useEffect, useState } from "react";
import { getNewsByCategory } from "@/service/newsApi";
import { useLanguage } from "@/context/lagnguageContext";

export default function FeaturedGrid() {
  const { lang } = useLanguage();

  const [entertainment, setEntertainment] = useState([]);
  const [business, setBusiness] = useState([]);
  const [corruption, setCorruption] = useState([]);
  const [world, setWorld] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [entertainmentData, businessData, corruptionData, worldData] =
          await Promise.all([
            getNewsByCategory("entertainment", "en"),
            getNewsByCategory("whole_country", "en"),
            getNewsByCategory("education", "en"),
            getNewsByCategory("opinion", "en"),
          ]);

        setEntertainment(entertainmentData?.data || []);
        setBusiness(businessData?.data || []);
        setCorruption(corruptionData?.data || []);
        setWorld(worldData?.data || []);
      } catch (error) {
        console.error(error);
      }
    };

    loadData();
  }, []);

  // prottek category theke first news
  const data = [entertainment[4], business[0], corruption[1], world[0]].filter(
    Boolean,
  );

  return (
    <section className="bg-[#ffffff] py-8 mt-14">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {data.map((item, index) => (
          <div
            key={item?._id || index}
            className="relative md:h-32 h-20 rounded-xs overflow-hidden group"
          >
            {/* Background Image */}
            <Image
              src={item?.featuredImage[0]}
              alt={
                typeof item?.description === "object"
                  ? item?.description?.[lang]
                  : item?.description
              }
              fill
              className="object-cover group-hover:scale-105 transition duration-300"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40"></div>

            {/* Content */}
            <div className="absolute inset-0  flex flex-col justify-center items-center">
              {/* Category */}
              <span className="text-white text-lg md:text-2xl font-semibold mb-1">
                {typeof item?.category === "object"
                  ? item?.category?.[lang]
                  : item?.category}
              </span>

              {/* Description */}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
