import React from "react";

const ProductsFilter = ({ filters, setFilters }) => {
  const categories = ["All", "Men", "Women", "Kids"];
  const subCategories = ["Topwear", "Bottomwear", "Winterwear"];

  const handleClick = (value, type) => {
    if (value === "All") {
      setFilters({});
      return;
    }

    setFilters((prev) => {
      if (prev[type] === value) {
        const updated = { ...prev };
        delete updated[type];
        return updated;
      }
      return {
        ...prev,
        [type]: value,
      };
    });
  };

  return (
    <div className="flex gap-6 overflow-x-auto border-b pb-2">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => handleClick(category, "category")}
          className={`text-sm whitespace-nowrap ${
            (category === "All" && !filters.category && !filters.subCategory) ||
            filters.category === category
              ? "border-b-2 border-black font-semibold"
              : "text-gray-600"
          }`}
        >
          {category}
        </button>
      ))}

      {subCategories.map((subCategory) => (
        <button
          key={subCategory}
          onClick={() => handleClick(subCategory, "subCategory")}
          className={`text-sm whitespace-nowrap ${
            filters.subCategory === subCategory
              ? "border-b-2 border-black font-semibold"
              : "text-gray-600"
          }`}
        >
          {subCategory}
        </button>
      ))}
    </div>
  );
};

export default ProductsFilter;
