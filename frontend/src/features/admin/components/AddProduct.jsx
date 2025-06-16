import { useCreateProduct } from "@/hooks/products/useCreateProduct";
import React, { useRef, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import CreatingProductOverlay from "@/components/CreatingProductOverlay";

const sizes = ["S", "M", "L", "XL", "XXL"];

const AddProduct = () => {
  const [images, setImages] = useState([null, null, null, null]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("men");
  const [subCategory, setSubCategory] = useState("topwear");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState([]);

  const fileInputs = useRef([]);
  const { mutate: createProduct, isPending } = useCreateProduct();

  const handleImageChange = (e, index) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const newImages = [...images];
    newImages[index] = file;
    setImages(newImages);
  };

  const triggerFileSelect = (index) => {
    fileInputs.current[index]?.click();
  };

  const toggleSize = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size],
    );
  };

  const handleSubmit = () => {
    if (
      !name ||
      !description ||
      !category ||
      !subCategory ||
      !price ||
      !stock ||
      selectedSizes.length === 0
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const formData = new FormData();
    images.forEach((img) => {
      if (img) formData.append("images", img);
    });

    formData.append("name", name);
    formData.append("description", description);
    formData.append("category", category.toLowerCase());
    formData.append("subCategory", subCategory.toLowerCase());
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("isFeatured", isFeatured);
    formData.append("sizes", JSON.stringify(selectedSizes));

    createProduct(formData);
  };

  if (isPending) return <CreatingProductOverlay />;

  return (
    <div className="space-y-8">
      <div>
        <label className="mb-3 block font-semibold text-gray-800">
          Upload Images
        </label>
        <div className="grid grid-cols-2 gap-5 md:flex">
          {images.map((img, idx) => (
            <div
              key={idx}
              onClick={() => triggerFileSelect(idx)}
              className="relative flex h-24 cursor-pointer items-center justify-center border-2 border-dashed border-gray-300 bg-white transition hover:bg-gray-50 md:w-34"
            >
              <input
                type="file"
                accept="image/*"
                hidden
                ref={(el) => (fileInputs.current[idx] = el)}
                onChange={(e) => handleImageChange(e, idx)}
              />
              {img ? (
                <img
                  src={URL.createObjectURL(img)}
                  alt="preview"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center text-gray-400 select-none">
                  <FaCloudUploadAlt size={26} />
                  <span className="mt-1 text-xs">Upload</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className="mb-2 block font-semibold text-gray-800">
          Product name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Type here"
          className="w-full border border-gray-300 bg-white px-4 py-2 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-gray-300 focus:outline-none md:w-96"
        />
      </div>

      <div>
        <label className="mb-2 block font-semibold text-gray-800">
          Product description
        </label>
        <textarea
          rows="6"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Write content here"
          className="w-full resize-none border border-gray-300 bg-white px-4 py-2 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-gray-300 focus:outline-none"
        />
      </div>

      <div className="flex flex-wrap gap-6">
        <div className="min-w-[140px] flex-1">
          <label className="mb-2 block font-semibold text-gray-800">
            Product category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:ring-2 focus:ring-gray-300 focus:outline-none"
          >
            <option value="men">Men</option>
            <option value="women">Women</option>
          </select>
        </div>

        <div className="min-w-[140px] flex-1">
          <label className="mb-2 block font-semibold text-gray-800">
            Sub category
          </label>
          <select
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
            className="w-full border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:ring-2 focus:ring-gray-300 focus:outline-none"
          >
            <option value="topwear">Topwear</option>
            <option value="bottomwear">Bottomwear</option>
          </select>
        </div>

        <div className="min-w-[140px] flex-1">
          <label className="mb-2 block font-semibold text-gray-800">
            Product Price
          </label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="25"
            className="w-full border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-gray-300 focus:outline-none"
          />
        </div>

        <div className="min-w-[140px] flex-1">
          <label className="mb-2 block font-semibold text-gray-800">
            Stock
          </label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            placeholder="100"
            className="w-full border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-gray-300 focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label className="mb-3 block font-semibold text-gray-800">
          Product Sizes
        </label>
        <div className="flex flex-wrap gap-4">
          {sizes.map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => toggleSize(size)}
              className={`border px-4 py-1 text-sm font-medium ${
                selectedSizes.includes(size)
                  ? "border-gray-500 bg-white text-gray-900"
                  : "border-gray-300 bg-gray-100 text-gray-700"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="inline-flex items-center space-x-3 font-semibold text-gray-800">
          <input
            type="checkbox"
            checked={isFeatured}
            onChange={() => setIsFeatured(!isFeatured)}
            className="form-checkbox border-gray-300"
          />
          <span>Add to featured product</span>
        </label>
      </div>

      <button
        onClick={handleSubmit}
        className="bg-black px-8 py-3 text-white transition hover:opacity-90"
      >
        ADD
      </button>
    </div>
  );
};

export default AddProduct;
