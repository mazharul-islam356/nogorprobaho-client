"use client";

import React, { useEffect, useState } from "react";
import api from "@/lib/axios";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { BasicInfoSection } from "./BasicInfoSection";
import { CategorySection } from "./CategorySection";
import { VariantsSection } from "./VariantsSection";
import { ImagesSection } from "./ImagesSection";
import { DiscountSection } from "./DiscountSection";
import { useProductForm } from "@/hooks/useProductForm";

export default function ProductForm({ mode = "create", productId = null }) {
  const isEditMode = mode === "edit" && !!productId;

  const {
    // Basic info
    name,
    setName,
    setPrice,
    description,
    setDescription,

    // Categories
    categories,
    categoryId,
    setCategoryId,
    subCategoryId,
    setSubCategoryId,

    // Variants
    variants,
    setVariants,

    // Images
    newImages,
    setNewImages,
    existingImages,
    setExistingImages,

    // Discount
    discountType,
    setDiscountType,
    discountValue,
    setDiscountValue,

    // Loading states
    loading,
    setLoading,
    initialLoading,

    // Methods
    uploadImages,
    resetForm,
  } = useProductForm({ isEditMode, productId });

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const uploadedNewImages = await uploadImages();
      const finalImages = [...existingImages, ...uploadedNewImages];

      if (!finalImages.length) {
        toast.error("At least one image is required");
        return;
      }

      const payload = {
        name,
        description,
        categoryId,
        subCategoryId: subCategoryId || null,
        variants: variants.map((v) => ({
          name: v.name,
          color: v.color,
          price: Number(v.price) || 0,
        })),
        discountType,
        discountValue: Number(discountValue) || 0,
        images: finalImages,
      };

      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;

      const config = token
        ? { headers: { Authorization: `Bearer ${token}` } }
        : {};

      if (isEditMode && productId) {
        await api.put(`/update-product/${productId}`, payload, config);
        toast.success("Product updated successfully");
      } else {
        await api.post("/add-product", payload, config);
        toast.success("Product created successfully");
        resetForm();
      }
    } catch (err) {
      console.error("Submit product failed:", err);
      toast.error(
        isEditMode ? "Failed to update product" : "Failed to create product",
      );
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <p>Loading...</p>
      </div>
    );
  }

  const selectedCategory = categories.find((c) => c._id === categoryId);

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* <h1 className="text-3xl font-bold mb-6">
        {isEditMode ? "Edit Product" : "Add Product"}
      </h1> */}

      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-5 gap-3 items-start">
          <div className="col-span-3">
            <BasicInfoSection
              name={name}
              setName={setName}
              setPrice={setPrice}
              description={description}
              setDescription={setDescription}
              categories={categories}
              categoryId={categoryId}
              setCategoryId={setCategoryId}
              subCategoryId={subCategoryId}
              setSubCategoryId={setSubCategoryId}
              selectedCategory={selectedCategory}
              discountType={discountType}
              setDiscountType={setDiscountType}
              discountValue={discountValue}
              setDiscountValue={setDiscountValue}
            />
          </div>

          <div className="col-span-2">
            <ImagesSection
              newImages={newImages}
              setNewImages={setNewImages}
              existingImages={existingImages}
              setExistingImages={setExistingImages}
            />
          </div>
        </div>

        <VariantsSection variants={variants} setVariants={setVariants} />

        <Button onClick={handleSubmit} disabled={loading}>
          {loading
            ? isEditMode
              ? "Updating..."
              : "Adding..."
            : isEditMode
              ? "Update Product"
              : "Add Product"}
        </Button>
      </div>
    </div>
  );
}
