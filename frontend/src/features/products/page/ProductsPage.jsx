import { useState } from "react";
import Products from "../components/Products";

const ProductsPage = () => {
  const [filters, setFilters] = useState({
    category: "",
    subCategory: "",
    limit: 10,
  });

  return (
    <div className="box flex flex-col gap-6 lg:flex-col">
      <div className="w-full">
        <Products filters={filters} setFilters={setFilters} />
      </div>
    </div>
  );
};

export default ProductsPage;
