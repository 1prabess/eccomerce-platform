import React from "react";
import { useLoaderData } from "react-router-dom";

const LatestCollections = () => {
  const collections = useLoaderData();
  console.log(collections);
  return (
    <div className="mt-10 py-12">
      <div className="mb-14 text-center">
        <h2 className="text-3xl font-semibold tracking-wide">
          Latest <span className="text-gray-600">Collections</span>
        </h2>
        <p className="mt-2 text-gray-600">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {collections.products.map((product, idx) => (
          <div key={idx} className="">
            <img
              src={product.images[0]}
              alt={product.title}
              className="h-[40rem] w-full bg-white object-cover"
            />
            <h3 className="mt-2 mb-4 text-lg font-medium">{product.name}</h3>
            <p className="text-2xl font-semibold text-gray-800">
              ${product.price}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestCollections;
