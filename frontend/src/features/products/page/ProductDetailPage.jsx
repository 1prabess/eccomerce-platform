import React, { useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProduct } from "@/hooks/products/useProduct";
import Reviews from "../components/Reviews";
import { StarRating } from "@/components/StarRating";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useAddItemToCart } from "@/hooks/cart/useAddItemToCart";
import { useSelector } from "react-redux";
import { useCart } from "@/hooks/cart/useCart";

const ProductDetailsPage = () => {
  const { productSlug } = useParams();
  const { data, isPending, error } = useProduct(productSlug);
  const { mutate: addToCart } = useAddItemToCart();
  const { data: cart } = useCart();
  const product = data?.product;

  const [currentImage, setCurrentImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const navigate = useNavigate();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const sizes = useMemo(() => {
    if (!product?.sizes) return [];
    return product.sizes.flatMap((s) => {
      try {
        const parsed = JSON.parse(s);
        if (Array.isArray(parsed)) return parsed;
        return [s];
      } catch {
        return [s];
      }
    });
  }, [product]);

  if (isPending) {
    return (
      <div className="flex h-screen items-center justify-center text-lg">
        Loading product...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center text-lg text-red-500">
        Failed to load product.
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex h-screen items-center justify-center text-lg text-gray-700">
        Product not found.
      </div>
    );
  }

  const finalPrice =
    product.discount && product.discount > 0
      ? (product.price * (100 - product.discount)) / 100
      : product.price;

  const prevImage = () => {
    setCurrentImage((prev) =>
      prev > 0 ? prev - 1 : product.images.length - 1,
    );
  };

  const nextImage = () => {
    setCurrentImage((prev) =>
      prev < product.images.length - 1 ? prev + 1 : 0,
    );
  };

  const handleAddToCart = (product) => {
    if (!isAuthenticated) {
      navigate("/signin");
      return;
    }
    addToCart({ productId: product._id, quantity: 1, size: selectedSize });
  };

  const isInCart = cart?.cartItems?.some(
    (item) => item.productId._id === product._id && item.size === selectedSize,
  );

  return (
    <div className="box grid min-h-screen grid-cols-1 bg-white md:grid-cols-2">
      {/* Desktop: Vertical scroll images */}
      <div className="hidden h-screen overflow-y-scroll md:block">
        {product.images.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`Product image ${idx + 1}`}
            className="w-full object-contain"
          />
        ))}
      </div>

      {/* Mobile: Horizontal slider with arrows */}
      <div className="relative block w-full bg-white md:hidden">
        {product.images.length > 1 && (
          <button
            onClick={prevImage}
            aria-label="Previous Image"
            className="absolute top-1/2 left-2 z-10 -translate-y-1/2"
          >
            <FiChevronLeft size={24} />
          </button>
        )}

        <img
          src={product.images[currentImage]}
          alt={`Product image ${currentImage + 1}`}
          className="h-full w-full object-contain"
        />

        {product.images.length > 1 && (
          <button
            onClick={nextImage}
            aria-label="Next Image"
            className="absolute top-1/2 right-2 z-10 -translate-y-1/2"
          >
            <FiChevronRight size={24} />
          </button>
        )}
      </div>

      {/* Right: Product details */}
      <div className="flex flex-col py-8 md:mt-4 md:p-8">
        <h1 className="text-4xl font-semibold">{product.name}</h1>

        <p className="mt-1 text-sm text-gray-500 capitalize">
          Category: {product.category} &mdash; {product.subCategory}
        </p>

        <div className="mt-2 flex items-center space-x-2">
          <StarRating rating={product.ratings} />
          <span className="text-sm text-gray-600">
            ({product.numReviews} review{product.numReviews !== 1 ? "s" : ""})
          </span>
        </div>

        <div className="mt-3 flex items-center space-x-4">
          {product.discount > 0 ? (
            <>
              <p className="text-2xl font-bold text-gray-900">
                ${finalPrice.toFixed(2)}
              </p>
              <p className="text-sm text-gray-500 line-through">
                ${product.price.toFixed(2)}
              </p>
              <p className="text-sm font-semibold text-red-600">
                Save {product.discount}%
              </p>
            </>
          ) : (
            <p className="text-2xl font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </p>
          )}
        </div>

        <p
          className={`mt-2 text-sm font-medium ${
            product.stock > 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          {product.stock > 0
            ? `In stock (${product.stock} available)`
            : "Out of stock"}
        </p>

        <p className="mt-4 text-gray-600">{product.description}</p>

        {product.colors && product.colors.length > 0 && (
          <div className="mt-6">
            <label className="mb-2 block text-sm font-semibold">Colors:</label>
            <div className="flex space-x-2">
              {product.colors.map((color, idx) => (
                <div
                  key={idx}
                  title={color}
                  className="h-6 w-6 border border-gray-300"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
        )}

        <div className="mt-4">
          <label className="mb-2 block text-sm font-semibold">SIZE:</label>
          <div className="grid grid-cols-4 gap-3">
            {sizes.length === 0 ? (
              <p className="text-sm text-gray-500">No sizes available</p>
            ) : (
              sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`border py-2 text-sm font-medium ${
                    selectedSize === size
                      ? "border-black bg-black text-white"
                      : "border-gray-300"
                  }`}
                >
                  {size}
                </button>
              ))
            )}
          </div>
        </div>

        <button
          disabled={!selectedSize || product.stock === 0 || isInCart}
          onClick={() => handleAddToCart(product)}
          className={`mt-4 w-full py-3 text-sm font-semibold uppercase ${
            !selectedSize || product.stock === 0 || isInCart
              ? "cursor-not-allowed bg-gray-300 text-gray-600"
              : "bg-black text-white hover:opacity-90"
          }`}
        >
          {isInCart ? "Added to Cart" : "Add to Cart"}
        </button>

        <div className="mt-8 space-y-2 text-sm text-gray-600">
          <p>Free express shipping</p>
          <p className="cursor-pointer underline hover:text-black">
            Find in boutique
          </p>
          <p className="cursor-pointer underline hover:text-black">
            Shipping & Returns
          </p>
          <p className="cursor-pointer underline hover:text-black">
            Contact Us
          </p>
        </div>

        {product.reviews && product.reviews.length > 0 && (
          <Reviews productId={product._id} />
        )}
      </div>
    </div>
  );
};

export default ProductDetailsPage;
