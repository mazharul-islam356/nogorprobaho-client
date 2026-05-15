import api from "@/lib/axios";

// Get all products
export const getProducts = async () => {
  const res = await api.get("/get-product");
  return res.data;
};

// Get single product
export const getProduct = async (id) => {
  const res = await api.get(`/get-product/${id}`);
  return res.data;
};

// New arrivals
export const getNewArrivals = async () => {
  const res = await api.get("/products/new-arrivals");
  return res.data;
};

// Trending products
export const getTrendingProducts = async () => {
  const res = await api.get("/products/trending");
  return res.data;
};

// Admin: get products
export const getAdminProducts = async () => {
  const res = await api.get("/get-product");
  return res.data;
};

// Admin: add product
export const createProduct = async (formData) => {
  const res = await api.post("/add-product", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

// Admin: update product
export const updateProduct = async (id, formData) => {
  const res = await api.put(`/update-products/${id}`, formData);
  return res.data;
};

// Admin: delete product
export const deleteProduct = async (id) => {
  const res = await api.delete(`/delete-products/${id}`);
  return res.data;
};
