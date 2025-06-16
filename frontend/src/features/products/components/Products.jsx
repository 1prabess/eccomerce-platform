import { useProducts } from "@/hooks/products/useProducts";
import ProductsFilter from "./ProductsFilter";
import Spinner from "@/components/Spinner";
import { useNavigate } from "react-router-dom";
import { StarRating } from "@/components/StarRating";

const Products = ({ filters, setFilters }) => {
  const { data: products, isPending, error } = useProducts(filters);
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
      <h2 className="my-6 flex flex-col justify-between text-2xl font-semibold md:flex-row">
        <div>
          <span className="text-gray-500">Our </span>
          <span className="font-bold">Products</span>
          <hr className="mt-1 w-20 border-t-2 border-black sm:w-24" />
        </div>
        <div className="mt-6 md:mt-0">
          <ProductsFilter filters={filters} setFilters={setFilters} />
        </div>
      </h2>

      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {products?.products.map((product, idx) => (
          <div
            key={idx}
            className="cursor-pointer overflow-hidden border"
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
                Sizes: {JSON.parse(product.sizes).join(", ")}
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

export default Products;
