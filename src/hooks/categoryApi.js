import api from "@/lib/axios";

// get category tree (for mega menu)
export const getCategoryTree = async () => {
  const res = await api.get("/categories/tree");
  return res.data;
};

// admin get categories
export const getAdminCategories = async () => {
  const res = await api.get("/admin/categories");
  return res.data;
};

// create category
export const createCategory = async (data) => {
  const res = await api.post("/admin/categories", data);
  return res.data;
};
