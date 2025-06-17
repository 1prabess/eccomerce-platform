import React, { useState } from "react";
import { FaTrashAlt, FaEdit, FaSave, FaTimesCircle } from "react-icons/fa";
import { useProducts } from "@/hooks/products/useProducts";
import { useDeleteProduct } from "@/hooks/products/useDeleteProduct";
import { useUpdateProduct } from "@/hooks/products/useUpdateProduct";

const ProductList = () => {
  const [page, setPage] = useState(1);
  const [editMode, setEditMode] = useState({});
  const [editedData, setEditedData] = useState({});
  const limit = 10;

  const { data, isLoading, isError } = useProducts({ limit, page });
  const { mutate: deleteProduct } = useDeleteProduct();
  const { mutate: updateProduct } = useUpdateProduct();

  const products = data?.data?.products || [];
  const totalPages = data?.pagination?.totalPages || 1;

  const handleEditToggle = (id, product) => {
    setEditMode((prev) => ({ ...prev, [id]: true }));
    setEditedData((prev) => ({
      ...prev,
      [id]: {
        name: product.name,
        category: product.category,
        price: product.price,
        stock: product.stock,
      },
    }));
  };

  const handleCancel = (id) => {
    setEditMode((prev) => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
    setEditedData((prev) => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
  };

  const handleChange = (id, field, value) => {
    setEditedData((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  const handleSave = (id) => {
    const updateData = editedData[id];
    updateProduct({ productID: id, updateData });
    handleCancel(id);
  };

  const handleDelete = (id) => {
    deleteProduct(id);
  };

  const handlePreviousPage = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  if (isLoading) return <p className="text-center">Loading products...</p>;
  if (isError || !data)
    return <p className="text-center text-red-500">Failed to load products.</p>;

  return (
    <div>
      <h2 className="mb-4 text-lg font-semibold text-gray-800 sm:text-xl">
        All Products
      </h2>

      <div className="w-full overflow-x-auto rounded-md border">
        <table className="w-full min-w-[700px] divide-y divide-gray-200 bg-white text-sm sm:text-base">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">
                Image
              </th>
              <th className="min-w-[120px] px-4 py-3 text-left font-semibold text-gray-700">
                Name
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">
                Category
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">
                Price
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">
                Stock
              </th>
              <th className="px-4 py-3 text-center font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.map((product) => {
              const isEditing = editMode[product._id];
              const fields = editedData[product._id] || {};

              return (
                <tr key={product._id} className="transition hover:bg-gray-50">
                  {/* IMAGE */}
                  <td className="px-4 py-2">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="h-fit w-14 object-cover"
                    />
                  </td>

                  {/* NAME */}
                  <td className="max-w-xs px-4 py-2 break-words">
                    {isEditing ? (
                      <input
                        type="text"
                        value={fields.name}
                        onChange={(e) =>
                          handleChange(product._id, "name", e.target.value)
                        }
                        className="w-full rounded border px-2 py-1 text-sm"
                      />
                    ) : (
                      <span>{product.name}</span>
                    )}
                  </td>

                  {/* CATEGORY */}
                  <td className="px-4 py-2 capitalize">
                    {isEditing ? (
                      <select
                        value={fields.category}
                        onChange={(e) =>
                          handleChange(product._id, "category", e.target.value)
                        }
                        className="w-full rounded border px-2 py-1 text-sm"
                      >
                        <option value="men">men</option>
                        <option value="women">women</option>
                      </select>
                    ) : (
                      <span>{product.category}</span>
                    )}
                  </td>

                  {/* PRICE */}
                  <td className="px-4 py-2">
                    {isEditing ? (
                      <input
                        type="number"
                        value={fields.price}
                        onChange={(e) =>
                          handleChange(product._id, "price", e.target.value)
                        }
                        className="w-24 rounded border px-2 py-1 text-sm"
                      />
                    ) : (
                      <span>${product.price}</span>
                    )}
                  </td>

                  {/* STOCK */}
                  <td className="px-4 py-2">
                    {isEditing ? (
                      <input
                        type="number"
                        value={fields.stock}
                        onChange={(e) =>
                          handleChange(product._id, "stock", e.target.value)
                        }
                        className="w-20 rounded border px-2 py-1 text-sm"
                      />
                    ) : (
                      <span>{product.stock}</span>
                    )}
                  </td>

                  {/* ACTIONS */}
                  <td className="space-x-2 px-4 py-2 text-center">
                    {isEditing ? (
                      <>
                        <button
                          onClick={() => handleSave(product._id)}
                          className="inline-flex items-center justify-center rounded bg-green-500 p-1 text-white hover:bg-green-600"
                        >
                          <FaSave size={14} />
                        </button>
                        <button
                          onClick={() => handleCancel(product._id)}
                          className="inline-flex items-center justify-center rounded bg-gray-400 p-1 text-white hover:bg-gray-500"
                        >
                          <FaTimesCircle size={14} />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEditToggle(product._id, product)}
                          className="inline-flex items-center justify-center text-blue-600 hover:text-blue-800"
                        >
                          <FaEdit size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="inline-flex items-center justify-center text-red-600 hover:text-red-800"
                        >
                          <FaTrashAlt size={14} />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              );
            })}

            {products.length === 0 && (
              <tr>
                <td
                  colSpan="6"
                  className="py-6 text-center text-gray-400 italic"
                >
                  No products available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex flex-col items-center justify-between gap-2 text-sm sm:flex-row">
        <button
          onClick={handlePreviousPage}
          disabled={page === 1}
          className="rounded border px-4 py-1 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-gray-600">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={page === totalPages}
          className="rounded border px-4 py-1 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductList;
