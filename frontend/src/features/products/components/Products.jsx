import { useProducts } from "@/hooks/products/useProducts";
import ProductsFilter from "./ProductsFilter";

const Products = ({ filters, setFilters }) => {
  const { data } = useProducts(filters);

  return (
    <div>
      <div className="w-full">
        <ProductsFilter filters={filters} setFilters={setFilters} />
      </div>

      <div className="grid grid-cols-1 gap-x-4 gap-y-10 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {data?.products.map((product, idx) => (
          <div key={idx} className="overflow-hidden border">
            <img
              src={product.images[0]}
              alt={product.title}
              className="h-fit w-full object-cover"
            />
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
