// components/admin/AdminSidebar.jsx
"use client";

import Link from "next/link";

export default function AdminSidebar() {
  return (
    <div className="w-64 bg-gray-800 text-white flex flex-col p-4">
      <h1 className="text-xl font-bold mb-6">Rufaida Dashboard</h1>
      <Link href="/" className="mb-2 hover:text-gray-300">
        Home
      </Link>
      <Link href="/admin/dashboard" className="mb-2 hover:text-gray-300">
        Dashboard
      </Link>
      <Link href="/admin/news" className="mb-2 hover:text-gray-300">
        News
      </Link>
      <Link href="/admin/categories" className="mb-2 hover:text-gray-300">
        Categories
      </Link>
      <Link href="/admin/coupons" className="mb-2 hover:text-gray-300">
        Coupons
      </Link>
      <Link href="/admin/orders" className="mb-2 hover:text-gray-300">
        Orders
      </Link>
    </div>
  );
}
