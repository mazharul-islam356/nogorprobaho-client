"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Heart, ShoppingCart, Eye, TrendingUp, Check } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [isAdding, setIsAdding] = useState(false);

  const selected = product.variants[selectedVariant];
  const finalPrice = selected?.price || product.variants[0]?.price;

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.variants[0]?.price) /
          product.originalPrice) *
          100,
      )
    : null;

  const handleAddToCart = (e) => {
    e.preventDefault();

    setIsAdding(true);

    addToCart({
      productId: product._id,
      name: product.name,
      image: product.images[0],
      variant: selected?.name || selected?.size || "Default",
      price: finalPrice,
      quantity: 1,
    });

    setTimeout(() => {
      setIsAdding(false);
    }, 700);
  };

  return (
    <div className="group flex flex-col h-full bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-[#a6804e] transition-all duration-300 hover:shadow-lg">
      {/* Image */}
      <div className="relative">
        <Link href={`/product/${product._id}`}>
          <div className="aspect-square overflow-hidden bg-gray-50">
            <Image
              src={product.images[0]}
              alt={product.name}
              width={500}
              height={500}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          {discount && discount > 0 && (
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md">
              {discount}% OFF
            </span>
          )}

          {product.isNew && (
            <span className="bg-[#a6804e] text-white text-xs font-bold px-2 py-1 rounded-md">
              NEW
            </span>
          )}

          {product.isTrending && (
            <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              HOT
            </span>
          )}
        </div>

        {/* Action buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsWishlisted(!isWishlisted);
            }}
            className={`p-2 rounded-full shadow-md transition ${
              isWishlisted
                ? "bg-[#a6804e] text-white"
                : "bg-white text-gray-600 hover:text-[#a6804e]"
            }`}
          >
            <Heart
              className={`w-4 h-4 ${isWishlisted ? "fill-current" : ""}`}
            />
          </button>

          <Link
            href={`/product/${product._id}`}
            className="p-2 rounded-full bg-white shadow-md text-gray-600 hover:text-[#a6804e] opacity-0 group-hover:opacity-100 transition"
          >
            <Eye className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow p-4">
        {/* Title */}
        <Link href={`/product/${product._id}`}>
          <h3 className="font-semibold text-gray-900 hover:text-[#a6804e] transition line-clamp-2 h-[48px]">
            {product.name}
          </h3>
        </Link>

        {/* Variant selector */}
        {product.variants?.length > 1 && (
          <div className="flex gap-1 mt-2 mb-3 flex-wrap">
            {product.variants.slice(0, 4).map((variant, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedVariant(idx)}
                className={`px-2 py-1 text-xs rounded border transition ${
                  selectedVariant === idx
                    ? "border-[#a6804e] bg-[#f5efe6] text-[#a6804e]"
                    : "border-gray-200 text-gray-600 hover:border-[#a6804e]"
                }`}
              >
                {variant.name || variant.size}
              </button>
            ))}
          </div>
        )}

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-xl font-bold text-gray-900">৳{finalPrice}</span>

          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">
              ৳{product.originalPrice}
            </span>
          )}
        </div>

        {/* Button */}
        <div className="mt-auto">
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`w-full py-2 rounded-md font-semibold flex items-center justify-center gap-2 transition ${
              product.stock === 0
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : isAdding
                  ? "bg-[#a6804e] text-white"
                  : "bg-[#a6804e] text-white hover:bg-[#8c693c]"
            }`}
          >
            {product.stock === 0 ? (
              "Out of Stock"
            ) : isAdding ? (
              <>
                <Check className="w-5 h-5" />
                Added!
              </>
            ) : (
              <>
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
