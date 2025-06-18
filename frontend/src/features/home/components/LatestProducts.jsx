import React from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "@/components/Spinner";
import { useProducts } from "@/hooks/products/useProducts";
import { StarRating } from "@/components/StarRating";

const LatestProducts = () => {
  const { data, isPending, error } = useProducts({ limit: 6 });

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

  const products = data?.data?.products || [];

  const parseSizes = (sizesArray) => {
    if (!Array.isArray(sizesArray) || sizesArray.length === 0) return [];
    try {
      return JSON.parse(sizesArray[0]);
    } catch {
      return [];
    }
  };

  return (
    <div className="mt-10">
      {/* <div className="mb-10 text-center">
        <h2 className="text-3xl font-semibold tracking-wide md:text-4xl">
          Latest <span className="text-gray-600">Products</span>
        </h2>
        <p className="mt-2 text-gray-600">
          Discover our newest arrivals — curated styles, premium materials, and
          standout designs made for the season. Shop the latest trends now.
        </p>
      </div> */}

      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product, idx) => (
          <div
            key={product._id || idx}
            className="cursor-pointer overflow-hidden rounded border"
            onClick={() => handleSelectProduct(product.slug)}
          >
            <div className="group relative overflow-hidden">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full bg-white object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/10 opacity-0 transition-opacity duration-300 group-hover:opacity-20" />
            </div>

            <div className="p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">{product.name}</h3>
              </div>

              <p className="mt-1 line-clamp-2 text-sm text-gray-500">
                {product.description}
              </p>

              <div className="mt-2 flex items-center gap-2 text-sm">
                <StarRating rating={product.ratings} />
                <span className="text-gray-400">
                  ({product.numReviews} review
                  {product.numReviews !== 1 ? "s" : ""})
                </span>
              </div>

              <div className="mt-2 text-sm text-gray-600">
                Sizes: {parseSizes(product.sizes).join(", ")}
              </div>

              {product.discount > 0 && (
                <div className="mt-2 text-sm text-red-500">
                  Discount: {product.discount}%
                </div>
              )}

              <p className="mt-3 text-2xl font-bold text-gray-800">
                ${product.price}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestProducts;
