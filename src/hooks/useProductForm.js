import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { toast } from "sonner";

export const useProductForm = ({ isEditMode, productId }) => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(null);
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [subCategoryId, setSubCategoryId] = useState("");
  const [variants, setVariants] = useState([
    { name: "", color: "", price: "" },
  ]);
  const [newImages, setNewImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [discountType, setDiscountType] = useState("percentage");
  const [discountValue, setDiscountValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(isEditMode);

  const fetchCategories = async () => {
    try {
      const res = await api.get("/get-categories");
      setCategories(res.data.data || []);
    } catch (err) {
      console.error("Fetch categories failed:", err);
      toast.error("Failed to load categories");
    }
  };

  const fetchProduct = async (id) => {
    try {
      const res = await api.get(`/get-product/${id}`);
      const product = res.data.data;

      setName(product.name || "");
      setPrice(product.price || "");
      setDescription(product.description || "");
      setCategoryId(product.categoryId || "");
      setSubCategoryId(product.subCategoryId || "");
      setExistingImages(product.images || []);

      if (product.variants && product.variants.length) {
        setVariants(
          product.variants.map((v) => ({
            name: v.name || "",
            color: v.color || "",
            price: v.price != null ? String(v.price) : "",
          })),
        );
      }

      if (product.discount) {
        setDiscountType(product.discount.type || "percentage");
        setDiscountValue(
          product.discount.value != null ? String(product.discount.value) : "",
        );
      }
    } catch (err) {
      console.error("Fetch product failed:", err);
      toast.error("Failed to load product");
    }
  };

  useEffect(() => {
    const init = async () => {
      await fetchCategories();
      if (isEditMode && productId) {
        await fetchProduct(productId);
      }
      setInitialLoading(false);
    };
    init();
  }, [isEditMode, productId]);

  const uploadImages = async () => {
    if (!newImages.length) return [];

    const formData = new FormData();
    newImages.forEach((img) => {
      formData.append("images", img);
    });

    try {
      const res = await api.post("/upload-images", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data.images || [];
    } catch (err) {
      console.error("Image upload failed:", err);
      toast.error("Image upload failed");
      return [];
    }
  };

  const resetForm = () => {
    setName("");
    setPrice(null);
    setDescription("");
    setCategoryId("");
    setSubCategoryId("");
    setVariants([{ name: "", color: "", price: "" }]);
    setNewImages([]);
    setExistingImages([]);
    setDiscountType("percentage");
    setDiscountValue("");
  };

  return {
    name,
    price,
    setName,
    description,
    setDescription,
    categories,
    categoryId,
    setCategoryId,
    subCategoryId,
    setSubCategoryId,
    variants,
    setVariants,
    newImages,
    setNewImages,
    existingImages,
    setExistingImages,
    discountType,
    setDiscountType,
    discountValue,
    setDiscountValue,
    loading,
    setLoading,
    initialLoading,
    uploadImages,
    resetForm,
  };
};
