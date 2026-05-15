"use client";

import { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import Image from "next/image";
import { Upload } from "lucide-react";
import { Trash2 } from "lucide-react";
import { ImageIcon } from "lucide-react";
import { X } from "lucide-react";

const initialState = {
  title_bn: "",
  title_en: "",
  // summary_bn: "",
  // summary_en: "",
  content_bn: "",
  content_en: "",
  writer_bn: "",
  writer_en: "",
  publishedAt: "",
  status: "draft",

  tags: "",
  category_en: "",
  category_bn: "",

  // NEW FLAGS
  isBreaking: 0,
  isBreakingTop: 0,
  isLatest: 0,
  isTrending: 0,
  isFeatured: 0,
};

const categories = [
  { bn: "সারাদেশ", en: "whole_country" },
  { bn: "বিশ্ব", en: "World" },
  { bn: "আন্তর্জাতিক", en: "International" },

  { bn: "রাজনীতি", en: "Politics" },
  { bn: "মতামত", en: "Opinion" },
  { bn: "জাতীয়", en: "National" },

  { bn: "বাণিজ্য", en: "Business" },
  { bn: "অর্থনীতি", en: "Economy" },

  { bn: "প্রযুক্তি", en: "Technology" },
  { bn: "বিজ্ঞান", en: "Science" },

  { bn: "খেলা", en: "Sports" },

  { bn: "বিনোদন", en: "Entertainment" },
  { bn: "লাইফস্টাইল", en: "Lifestyle" },

  { bn: "শিক্ষা", en: "Education" },
  { bn: "চাকরি", en: "Jobs" },

  { bn: "ধর্ম", en: "Religion" },
  { bn: "দুর্নীতি", en: "corruption" },

  { bn: "স্বাস্থ্য", en: "Health" },
  { bn: "পরিবেশ", en: "Environment" },
  { bn: "অপরাধ", en: "Crime" },
  { bn: "আইন ও আদালত", en: "Law & Court" },
  { bn: "গণমাধ্যম", en: "Media" },
  { bn: "প্রবাস", en: "Diaspora" },
];

export default function CreateNews() {
  const [form, setForm] = useState(initialState);
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [loading, setLoading] = useState(false);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFiles((prev) => [...prev, file]);
    setPreviews((prev) => [...prev, URL.createObjectURL(file)]);

    e.target.value = null;
  };

  const handleRemoveImage = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const data = new FormData();

      Object.entries(form).forEach(([key, value]) => {
        data.append(key, value);
      });

      files.forEach((file) => {
        data.append("images", file);
      });

      // console.log(data);
      // return;
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/news`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("News created");

      setForm(initialState);
      setFiles([]);
      setPreviews([]);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Error creating news");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl poppins mx-auto md:p-6 pt-10 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* LEFT */}
        <div className="md:col-span-3 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              className="rounded-sm"
              name="title_bn"
              value={form.title_bn}
              onChange={handleChange}
              placeholder="Title (Bangla)"
            />
            <Input
              className="rounded-sm"
              name="title_en"
              value={form.title_en}
              onChange={handleChange}
              placeholder="Title (English)"
            />

            {/* <Textarea
              name="summary_bn"
              value={form.summary_bn}
              onChange={handleChange}
              placeholder="Summary (Bangla)"
            />
            <Textarea
              name="summary_en"
              value={form.summary_en}
              onChange={handleChange}
              placeholder="Summary (English)"
            /> */}

            <Textarea
              rows={6}
              name="content_bn"
              value={form.content_bn}
              onChange={handleChange}
              placeholder="Content (Bangla)"
              className="min-h-37.5 rounded-sm max-h-100 resize-y"
            />

            <Textarea
              rows={6}
              name="content_en"
              value={form.content_en}
              onChange={handleChange}
              placeholder="Content (English)"
              className="min-h-37.5 max-h-100 rounded-sm resize-y"
            />
          </div>
        </div>

        {/* RIGHT */}

        <div className="border border-gray-200 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
          <input
            type="file"
            id="img"
            className="hidden"
            onChange={handleFileChange}
            accept="image/*"
            multiple
          />

          <label
            htmlFor="img"
            className="relative flex flex-col items-center justify-center w-full p-6 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-200 hover:bg-gray-50 border-gray-300 hover:border-blue-400 bg-gray-50/30 min-h-[200px]"
          >
            {previews.length === 0 ? (
              // Empty state - show upload UI
              <div className="flex flex-col items-center justify-center text-center">
                <Upload
                  className="w-10 h-10 mb-3 text-gray-400"
                  strokeWidth={1.5}
                />
                <p className="mb-1 text-sm font-medium text-gray-700">
                  Click to upload
                </p>
                <p className="text-xs text-gray-500">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            ) : (
              // Preview mode - show images inside upload area
              <div className="w-full space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ImageIcon
                      className="w-4 h-4 text-teal-500"
                      strokeWidth={1.5}
                    />
                    <span className="text-xs font-medium text-gray-600">
                      {previews.length} image{previews.length !== 1 ? "s" : ""}{" "}
                      selected
                    </span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      // Clear all images function
                      previews.forEach((_, i) => handleRemoveImage(i));
                    }}
                    className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Clear all
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {previews.map((img, i) => (
                    <div
                      key={i}
                      className="group relative aspect-square rounded-lg overflow-hidden bg-gray-100 border border-gray-200"
                    >
                      <Image
                        width={500}
                        height={500}
                        alt={`news_image_${i}`}
                        src={img}
                        className="h-full w-full object-cover"
                      />

                      {/* Remove button overlay */}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleRemoveImage(i);
                        }}
                        className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-md"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>

                      {/* Image count badge */}
                      <div className="absolute bottom-1 left-1 bg-black/60 backdrop-blur-sm text-white text-xs px-1.5 py-0.5 rounded">
                        {i + 1}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add more button */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("img").click();
                  }}
                  className="w-full mt-2 py-2 text-sm text-teal-600 hover:text-teal-700 font-medium transition-colors flex items-center justify-center gap-1"
                >
                  <Upload className="w-4 h-4" />
                  Add more images
                </button>
              </div>
            )}
          </label>
        </div>
      </div>
      <div className="space-y-4 grid md:grid-cols-2 gap-x-4">
        <div className="border p-4 rounded-sm space-y-4">
          <h2 className="text-sm font-semibold">News Flags</h2>

          {/* Breaking */}
          <div className="flex items-center justify-between">
            <span className="text-sm">Breaking</span>

            <div className="flex gap-3 text-sm">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="isBreaking"
                  checked={form.isBreaking === 1}
                  onChange={() =>
                    setForm((prev) => ({
                      ...prev,
                      isBreaking: 1,
                    }))
                  }
                />
                <span className="ml-1">Yes</span>
              </label>

              <label className="flex items-center">
                <input
                  type="radio"
                  name="isBreaking"
                  checked={form.isBreaking === 0}
                  onChange={() =>
                    setForm((prev) => ({
                      ...prev,
                      isBreaking: 0,
                    }))
                  }
                />
                <span className="ml-1">No</span>
              </label>
            </div>
          </div>

          {/* Latest */}
          <div className="flex items-center justify-between">
            <span className="text-sm">Latest News</span>

            <div className="flex gap-3 text-sm">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="isLatest"
                  checked={form.isLatest === 1}
                  onChange={() =>
                    setForm((prev) => ({
                      ...prev,
                      isLatest: 1,
                    }))
                  }
                />
                <span className="ml-1">Yes</span>
              </label>

              <label className="flex items-center">
                <input
                  type="radio"
                  name="isLatest"
                  checked={form.isLatest === 0}
                  onChange={() =>
                    setForm((prev) => ({
                      ...prev,
                      isLatest: 0,
                    }))
                  }
                />
                <span className="ml-1">No</span>
              </label>
            </div>
          </div>

          {/* Breaking Top */}
          <div className="flex items-center justify-between">
            <span className="text-sm">Breaking Top</span>

            <div className="flex gap-3 text-sm">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="isBreakingTop"
                  checked={form.isBreakingTop === 1}
                  onChange={() =>
                    setForm((prev) => ({
                      ...prev,
                      isBreakingTop: 1,
                    }))
                  }
                />
                <span className="ml-1">Yes</span>
              </label>

              <label className="flex items-center">
                <input
                  type="radio"
                  name="isBreakingTop"
                  checked={form.isBreakingTop === 0}
                  onChange={() =>
                    setForm((prev) => ({
                      ...prev,
                      isBreakingTop: 0,
                    }))
                  }
                />
                <span className="ml-1">No</span>
              </label>
            </div>
          </div>

          {/* Trending */}
          <div className="flex items-center justify-between">
            <span className="text-sm">Trending</span>

            <div className="flex gap-3 text-sm">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="isTrending"
                  checked={form.isTrending === 1}
                  onChange={() =>
                    setForm((prev) => ({
                      ...prev,
                      isTrending: 1,
                    }))
                  }
                />
                <span className="ml-1">Yes</span>
              </label>

              <label className="flex items-center">
                <input
                  type="radio"
                  name="isTrending"
                  checked={form.isTrending === 0}
                  onChange={() =>
                    setForm((prev) => ({
                      ...prev,
                      isTrending: 0,
                    }))
                  }
                />
                <span className="ml-1">No</span>
              </label>
            </div>
          </div>

          {/* Featured */}
          <div className="flex items-center justify-between">
            <span className="text-sm">Featured</span>

            <div className="flex gap-3 text-sm">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="isFeatured"
                  checked={form.isFeatured === 1}
                  onChange={() =>
                    setForm((prev) => ({
                      ...prev,
                      isFeatured: 1,
                    }))
                  }
                />
                <span className="ml-1">Yes</span>
              </label>

              <label className="flex items-center">
                <input
                  type="radio"
                  name="isFeatured"
                  checked={form.isFeatured === 0}
                  onChange={() =>
                    setForm((prev) => ({
                      ...prev,
                      isFeatured: 0,
                    }))
                  }
                />
                <span className="ml-1">No</span>
              </label>
            </div>
          </div>
        </div>
        <div className="border p-4 space-y-3 rounded-sm">
          {/* writer name */}
          <div className="md:flex items-center gap-2 space-y-2 md:space-y-0">
            <Input
              className="rounded-sm"
              name="writer_bn"
              value={form.writer_bn}
              onChange={handleChange}
              placeholder="Writer Name (Bangla)"
            />
            <Input
              className="rounded-sm"
              name="writer_en"
              value={form.writer_en}
              onChange={handleChange}
              placeholder="Writer Name (English)"
            />
          </div>

          {/* STATUS */}
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full border px-3 py-2 text-sm rounded-sm"
          >
            <option value="draft">Draft</option>
            <option value="published">Publish Now</option>
            <option value="scheduled">Schedule</option>
          </select>

          {/* PUBLISH DATE */}
          <Input
            className="rounded-sm"
            type="datetime-local"
            name="publishedAt"
            value={form.publishedAt}
            onChange={handleChange}
          />

          {/* CATEGORY */}
          <select
            name="category"
            value={form.category}
            onChange={(e) => {
              const selected = categories.find((c) => c.en === e.target.value);

              setForm({
                ...form,
                category: e.target.value,
                category_en: selected?.en || "",
                category_bn: selected?.bn || "",
              });
            }}
            className="w-full border px-3 py-2 text-sm rounded-sm"
          >
            <option value="">Select category</option>

            {categories.map((c) => (
              <option key={c.en} value={c.en}>
                {c.bn}
              </option>
            ))}
          </select>

          <Input
            className="rounded-sm"
            name="tags"
            value={form.tags}
            onChange={handleChange}
            placeholder="Tags (comma separated)"
          />
        </div>
      </div>

      <Button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-teal-700 rounded-sm cursor-pointer hover:font-semibold transition duration-300 py-5"
      >
        <Plus />
        {loading ? "Publishing..." : "Create News"}
      </Button>
    </div>
  );
}
