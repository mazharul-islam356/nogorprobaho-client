"use client";

import Link from "next/link";

export default function Sidebar({ trending }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-semibold mb-3">Trending</h2>

        <div className="space-y-3">
          {trending.map((item, i) => (
            <Link key={item._id} href={`/news/${item.slug}`}>
              <div className="flex gap-3 items-start">
                <span className="text-xl font-bold text-gray-400">{i + 1}</span>
                <p className="text-sm hover:text-blue-600">{item.title_bn}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
