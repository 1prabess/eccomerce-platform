import { useProducts } from "@/hooks/products/useProducts";
import React from "react";

const LatestProducts = () => {
  const { data } = useProducts({
    limit: 6,
    page: 1,
  });

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
          <div key={idx} className="border">
            <img
              src={product.images[0]}
              alt={product.title}
              className="w-full bg-white object-cover"
            />
            <div className="flex justify-between p-4">
              <h3 className="mt-2 text-lg">{product.name}</h3>
              <h3 className="mt-2 text-sm text-gray-500 uppercase">
                {product.category}
              </h3>
            </div>
            <p className="px-4 pb-4 text-3xl font-medium text-gray-800">
              ${product.price}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestProducts;
