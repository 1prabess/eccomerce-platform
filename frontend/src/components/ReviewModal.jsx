import { useCreateReview } from "@/hooks/products/useCreateReview";
import { useState } from "react";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { IoClose } from "react-icons/io5"; // Close (X) icon

const ReviewModal = ({ product, onClose }) => {
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState("");

  const { mutate: createReview } = useCreateReview();

  const handleSubmit = () => {
    const data = {
      productID: product.productId,
      review: {
        rating,
        comment: description,
      },
    };
    createReview(data);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
      <div className="absolute inset-0 bg-black opacity-40" onClick={onClose} />

      <div className="relative z-10 w-[90%] max-w-md bg-white p-6 shadow-xl">
        {/* X Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl text-gray-600 hover:text-black"
        >
          <IoClose />
        </button>

        <h2 className="mb-4 text-xl font-bold">Write a Review</h2>

        <p className="mb-2 font-semibold text-gray-700">{product.name}</p>

        {/* Star Rating */}
        <div className="mb-4 flex gap-1 text-2xl text-yellow-500">
          {[1, 2, 3, 4, 5].map((star) =>
            rating >= star ? (
              <AiFillStar
                key={star}
                onClick={() => setRating(star)}
                className="cursor-pointer"
              />
            ) : (
              <AiOutlineStar
                key={star}
                onClick={() => setRating(star)}
                className="cursor-pointer"
              />
            ),
          )}
        </div>

        {/* Description */}
        <textarea
          rows="4"
          placeholder="Write your review..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mb-4 w-full border border-gray-300 p-2 focus:ring-2 focus:outline-none"
        />

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-sm text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-black px-4 py-1.5 text-sm font-medium text-white"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
