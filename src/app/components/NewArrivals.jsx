"use client";

import useNewArrivals from "@/hooks/useNewArrivals";
import ProductCard from "./ProductCard";
import Title from "./Title";

const NewArrivals = () => {
  const { products, loading, error } = useNewArrivals();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading products</p>;

  return (
    <section className="container mx-auto py-5">
      <Title text="New Arrival" />
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default NewArrivals;
