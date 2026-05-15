import api from "@/lib/axios";
import { useState, useEffect } from "react";

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  // Helper to get token
  const getToken = () => localStorage.getItem("token");

  // Fetch categories (tree view)
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await api.get("/get-categories", { params: { tree: true } });
      if (res.data.success) setCategories(res.data.data);
    } catch (err) {
      console.error("Fetch categories error:", err);
    }
    setLoading(false);
  };

  // Add category/subcategory
  const addCategory = async (payload) => {
    try {
      const token = getToken();
      const res = await api.post("/create-category", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await fetchCategories();
      return res.data;
    } catch (err) {
      console.error("Add category error:", err);
      return { success: false, message: err.message };
    }
  };

  // Update category/subcategory
  const updateCategory = async (id, payload) => {
    try {
      const token = getToken();
      const res = await api.put(`/update-category/${id}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await fetchCategories();
      return res.data; // Fixed: return response data
    } catch (err) {
      console.error("Update category error:", err);
      return { success: false, message: err.message };
    }
  };

  // Delete category/subcategory
  const deleteCategory = async (id) => {
    try {
      const token = getToken();
      const res = await api.delete(`/delete-category/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await fetchCategories();
      return res.data;
    } catch (err) {
      console.error("Delete category error:", err);
      return { success: false, message: err.message };
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchCategories();
  }, []);

  return {
    categories,
    loading,
    fetchCategories,
    addCategory,
    updateCategory,
    deleteCategory,
  };
};
