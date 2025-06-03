import React, { useState } from "react";
import { useReviews } from "@/hooks/products/useReviews";
import { StarRating } from "@/components/StarRating";

const Reviews = ({ productId }) => {
  const [starFilter, setStarFilter] = useState("all");

  const {
    data: reviews,
    isPending,
    error,
  } = useReviews(productId, starFilter === "all" ? undefined : starFilter);

  return (
    <div className="mt-10 py-2">
      {/* Filter buttons */}
      <div className="mb-8 flex flex-col justify-between gap-4 space-x-2 text-sm text-gray-600 lg:mb-4 lg:flex-row lg:items-center">
        <h2 className="text-xl font-semibold">Customer Reviews</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setStarFilter("all")}
            className={`rounded border px-2 py-1 ${
              starFilter === "all"
                ? "border-black bg-black text-white"
                : "border-gray-300 hover:border-black"
            }`}
          >
            All
          </button>
          {[5, 4, 3, 2, 1].map((stars) => (
            <button
              key={stars}
              onClick={() => setStarFilter(stars)}
              className={`rounded border px-2 py-1 ${
                starFilter === stars
                  ? "border-black bg-black text-white"
                  : "border-gray-300 hover:border-black"
              }`}
            >
              {stars} ★
            </button>
          ))}
        </div>
      </div>

      {/* States */}
      {isPending ? (
        <p className="text-gray-500">Loading reviews...</p>
      ) : error ? (
        <p className="text-red-500">Failed to load reviews.</p>
      ) : reviews?.length > 0 ? (
        reviews.map((review, idx) => (
          <div key={idx} className="mb-4 border-b pb-4">
            <div className="flex items-center justify-between">
              <p className="font-semibold">{review.user || "Anonymous"}</p>
              <StarRating rating={review.rating || 0} />
            </div>
            <p className="mt-1 text-gray-700">{review.comment}</p>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No reviews found.</p>
      )}
    </div>
  );
};

export default Reviews;
