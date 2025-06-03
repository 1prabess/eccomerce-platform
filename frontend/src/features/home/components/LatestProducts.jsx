import Spinner from "@/components/Spinner";
import { useProducts } from "@/hooks/products/useProducts";
import React from "react";
import { useNavigate } from "react-router-dom";

const LatestProducts = () => {
  const { data, isPending, error } = useProducts({
    limit: 6,
    page: 1,
  });

  const navigate = useNavigate();

  const handleSelectProduct = (productSlug) => {
    navigate(`/products/${productSlug}`);
  };

  if (isPending) return <Spinner />;

  if (error) {
    return (
      <div className="mt-10 text-center text-red-500">
        Failed to load products. Please try again later.
      </div>
    );
  }

  return (
    <div className="mt-10">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-semibold tracking-wide md:text-5xl">
          Latest <span className="text-gray-600">Products</span>
        </h2>
        <p className="mt-2 text-gray-600">
          Discover our newest arrivals — curated styles, premium materials, and
          standout designs made for the season. Shop the latest trends now.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {data?.products.map((product, idx) => (
          <div
            key={idx}
            className="cursor-pointer overflow-hidden border"
            onClick={() => handleSelectProduct(product.slug)}
          >
            <div className="group relative overflow-hidden">
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-full bg-white object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/10 opacity-0 transition-opacity duration-300 group-hover:opacity-20" />
            </div>

            <div className="flex justify-between p-4">
              <h3 className="mt-2 text-xl">{product.name}</h3>
              <h3 className="mt-2 text-sm text-gray-500 uppercase">
                {product.category}
              </h3>
            </div>
            <p className="px-4 pb-6 text-3xl font-medium text-gray-500">
              ${product.price}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestProducts;
