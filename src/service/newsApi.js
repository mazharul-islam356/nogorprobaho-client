import axiosInstance from "@/lib/axios";

// helper function
const fetchData = async (url) => {
  try {
    const res = await axiosInstance.get(url);
    return res.data;
  } catch (error) {
    console.error(`Error fetching ${url}:`, error);
    throw error;
  }
};

// ✅ All APIs
export const getBreakingTopNews = () => fetchData("/news/breaking-top-news");

export const getLatestNews = () => fetchData("/news/latest-news");

export const getBreakingNews = () => fetchData("/news/breaking-news");

export const getTrendingNews = () => fetchData("/news/trending-news");

export const getFeaturedNews = () => fetchData("/news/featured-news");

export const getNewsByCategory = (category, lang = "bn") => {
  return fetchData(`/news/category?category=${category}&lang=${lang}`);
};
