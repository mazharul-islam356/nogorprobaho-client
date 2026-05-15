"use client";
import ProductCard from "./ProductCard";

export default function ProductCarousel({ products, title }) {
  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="flex gap-4 overflow-x-auto scrollbar-hide">
        {products.map((p) => (
          <ProductCard key={p._id} product={p} />
        ))}
      </div>
    </div>
  );
}
