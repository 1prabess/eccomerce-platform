import { useProducts } from "@/hooks/products/useProducts";
import ProductsFilter from "./ProductsFilter";
import Spinner from "@/components/Spinner";
import { useNavigate } from "react-router-dom";

const Products = ({ filters, setFilters }) => {
  const { data, isPending, error } = useProducts(filters);
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
    <div>
      <div className="w-full">
        <ProductsFilter filters={filters} setFilters={setFilters} />
      </div>

      <div className="grid grid-cols-1 gap-x-4 gap-y-10 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {data?.products.map((product, idx) => (
          <div
            key={idx}
            onClick={() => handleSelectProduct(product.slug)}
            className="cursor-pointer overflow-hidden border"
          >
            <div className="group relative overflow-hidden">
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/10 opacity-0 transition-opacity duration-300 group-hover:opacity-20" />
            </div>

            <div className="flex justify-between p-4">
              <h3 className="mt-2 text-lg">{product.name}</h3>
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

export default Products;
