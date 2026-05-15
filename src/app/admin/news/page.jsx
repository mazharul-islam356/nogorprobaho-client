"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { getNewsByCategory } from "@/service/newsApi";
import Image from "next/image";
import { Eye } from "lucide-react";

const categoriesList = [
  { name: { bn: "বাংলাদেশ", en: "Bangladesh" }, slug: "bangladesh" },
  { name: { bn: "বিশ্ব", en: "World" }, slug: "world" },
  { name: { bn: "আন্তর্জাতিক", en: "International" }, slug: "international" },
  { name: { bn: "রাজনীতি", en: "Politics" }, slug: "politics" },
  { name: { bn: "দুর্নীতি", en: "Corruption" }, slug: "corruption" },
  { name: { bn: "মতামত", en: "Opinion" }, slug: "opinion" },
  { name: { bn: "বাণিজ্য", en: "Business" }, slug: "business" },
  { name: { bn: "অর্থনীতি", en: "Economy" }, slug: "economy" },
  { name: { bn: "জাতীয়", en: "National" }, slug: "national" },
  { name: { bn: "প্রযুক্তি", en: "Technology" }, slug: "technology" },
  { name: { bn: "বিজ্ঞান", en: "Science" }, slug: "science" },
  { name: { bn: "খেলা", en: "Sports" }, slug: "sports" },
  { name: { bn: "বিনোদন", en: "Entertainment" }, slug: "entertainment" },
  { name: { bn: "লাইফস্টাইল", en: "Lifestyle" }, slug: "lifestyle" },
  { name: { bn: "শিক্ষা", en: "Education" }, slug: "education" },
  { name: { bn: "চাকরি", en: "Jobs" }, slug: "jobs" },
  { name: { bn: "ধর্ম", en: "Religion" }, slug: "religion" },
  { name: { bn: "স্বাস্থ্য", en: "Health" }, slug: "health" },
  { name: { bn: "পরিবেশ", en: "Environment" }, slug: "environment" },
  { name: { bn: "অপরাধ", en: "Crime" }, slug: "crime" },
  { name: { bn: "আইন ও আদালত", en: "Law & Court" }, slug: "law-court" },
  { name: { bn: "গণমাধ্যম", en: "Media" }, slug: "media" },
  { name: { bn: "প্রবাস", en: "Diaspora" }, slug: "diaspora" },
];

const ITEMS_PER_PAGE = 10;

export default function NewsList() {
  const [news, setNews] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const normalizeNews = (data) => {
    return (data || []).map((item) => ({
      ...item,
      category:
        typeof item.category === "object"
          ? item.category?.en || item.category?.bn
          : item.category,
    }));
  };

  const fetchNews = async (category = "all") => {
    setIsLoading(true);
    try {
      if (category === "all") {
        const allData = await Promise.all(
          categoriesList.map((cat) => getNewsByCategory(cat.slug, "en")),
        );

        const merged = allData.flatMap((r) => r?.data || r || []);
        setNews(normalizeNews(merged));
      } else {
        const res = await getNewsByCategory(category, "en");
        const data = res?.data || res;
        setNews(normalizeNews(data));
      }
      setCurrentPage(1); // Reset to first page when category changes
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNews(selectedCategory);
  }, [selectedCategory]);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await fetch(`${process.env.NEXT_PUBLIC_API_URL_V2}/news/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchNews(selectedCategory);
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(news.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentNews = news.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="p-4 poppins md:p-6 bg-gray-50 min-h-screen">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row-reverse md:items-center justify-between gap-3 mb-5">
        <select
          className="border px-3 py-2 rounded text-sm bg-white w-full md:w-auto"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="all">সব ক্যাটাগরি</option>
          {categoriesList.map((cat) => (
            <option key={cat.slug} value={cat.slug}>
              {cat.name.bn}
            </option>
          ))}
        </select>

        <Link href="/admin/news/create">
          <button className="bg-teal-600 cursor-pointer text-white px-4 py-1.5 rounded-xs text-sm w-full md:w-auto">
            + Add News
          </button>
        </Link>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
        </div>
      )}

      {/* ================= DESKTOP TABLE ================= */}
      {!isLoading && (
        <>
          <div className="hidden md:block bg-white border rounded-xl overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-100 text-left">
                <tr>
                  <th className="p-3">SL</th>
                  <th className="p-3">Image</th>
                  <th className="p-3">Title</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Views</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>

              <tbody>
                {currentNews.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="p-5 text-center text-gray-500">
                      No data found
                    </td>
                  </tr>
                ) : (
                  currentNews.map((item, index) => (
                    <tr key={item._id || index} className="border-t">
                      <td className="pl-5">{startIndex + index + 1}</td>

                      <td className="p-3">
                        <Image
                          src={item.featuredImage?.[0]}
                          alt="news"
                          width={100}
                          height={70}
                          className="rounded-xs"
                        />
                      </td>

                      <td className="p-3 bangla text-base">{item.title?.bn}</td>

                      <td className="p-3">
                        <span className="px-2 py-1 text-xs rounded bg-teal-100 text-teal-700">
                          {typeof item.category === "object"
                            ? item.category?.bn || item.category?.en
                            : item.category}
                        </span>
                      </td>

                      <td className="p-3 text-sm text-gray-500">
                        {item?.views}
                      </td>

                      <td className="p-3 text-right">
                        <div className="flex justify-end gap-2">
                          <Link href={`/news/${item?._id}`}>
                            <Eye size={18} />
                          </Link>

                          <Link href={`/admin/news/${item._id}`}>
                            <button className="px-3 py-1 text-xs border rounded">
                              Edit
                            </button>
                          </Link>

                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <button className="px-3 py-1 text-xs bg-red-50 text-red-600 rounded">
                                Delete
                              </button>
                            </AlertDialogTrigger>

                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Confirm delete?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>

                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(item._id)}
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* ================= MOBILE CARDS ================= */}
          <div className="md:hidden space-y-4">
            {currentNews.length === 0 ? (
              <p className="text-center text-gray-500">No data found</p>
            ) : (
              currentNews.map((item, index) => (
                <div
                  key={item._id || index}
                  className="bg-white border rounded-xl p-4 shadow-sm"
                >
                  <div className="flex gap-3">
                    <Image
                      src={item.featuredImage?.[0]}
                      alt="news"
                      width={80}
                      height={60}
                      className="rounded-md object-cover"
                    />

                    <div className="flex-1">
                      <h2 className="text-sm font-semibold line-clamp-2">
                        {item.title?.bn}
                      </h2>

                      <p className="text-xs text-gray-500 mt-1">
                        {typeof item.category === "object"
                          ? item.category?.bn || item.category?.en
                          : item.category}
                      </p>

                      <p className="text-xs text-gray-400 mt-1">{item.slug}</p>
                    </div>
                  </div>

                  <div className="flex justify-between mt-3">
                    <Link href={`/news/${item?._id}`}>
                      <button className="text-xs text-blue-600 flex items-center gap-1">
                        <Eye size={14} /> View
                      </button>
                    </Link>

                    <div className="flex gap-2">
                      <Link href={`/admin/news/${item._id}`}>
                        <button className="text-xs px-2 py-1 border rounded">
                          Edit
                        </button>
                      </Link>

                      <button
                        onClick={() => handleDelete(item._id)}
                        className="text-xs px-2 py-1 bg-red-50 text-red-600 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* ================= PAGINATION ================= */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-6">
              {/* Previous Button */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-2 rounded-full text-sm font-medium transition-colors
                  ${
                    currentPage === 1
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
              >
                Previous
              </button>

              {/* Page Numbers */}
              <div className="flex gap-1">
                {getPageNumbers().map((page, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      typeof page === "number" && handlePageChange(page)
                    }
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors
                      ${
                        currentPage === page
                          ? "bg-teal-600 text-white"
                          : page === "..."
                            ? "bg-transparent cursor-default"
                            : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                      }`}
                    disabled={page === "..."}
                  >
                    {page}
                  </button>
                ))}
              </div>

              {/* Next Button */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-2 rounded-full text-sm font-medium transition-colors
                  ${
                    currentPage === totalPages
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
              >
                Next
              </button>
            </div>
          )}

          {/* Results Info */}
          {news.length > 0 && (
            <div className="text-center text-sm text-gray-500 mt-4">
              Showing {startIndex + 1} to {Math.min(endIndex, news.length)} of{" "}
              {news.length} results
            </div>
          )}
        </>
      )}
    </div>
  );
}
