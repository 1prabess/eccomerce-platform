import React, { useState } from "react";
import Orders from "../components/Orders";
import AddProduct from "../components/AddProduct";
import ListItems from "../components/ListItems";

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("orders");

  const renderContent = () => {
    switch (activeTab) {
      case "orders":
        return <Orders />;
      case "addProduct":
        return <AddProduct />;
      case "listItems":
        return <ListItems />;
      default:
        return null;
    }
  };

  return (
    <div className="box min-h-screen bg-gray-100 p-0">
      <div className="flex min-h-screen flex-col md:flex-row">
        {/* Sidebar / Top nav */}
        <nav className="flex w-full overflow-x-auto border-b border-gray-200 bg-white p-4 md:w-64 md:flex-col md:border-r md:border-b-0 md:p-6">
          <h2 className="mb-8 hidden text-2xl font-bold md:block">
            Admin Panel
          </h2>
          <ul className="flex w-full gap-1 md:flex-col">
            <li className="flex-1">
              <button
                onClick={() => setActiveTab("orders")}
                className={`w-full px-4 py-2 text-left whitespace-nowrap md:text-left ${
                  activeTab === "orders"
                    ? "bg-black text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                Orders
              </button>
            </li>
            <li className="flex-1">
              <button
                onClick={() => setActiveTab("addProduct")}
                className={`w-full px-4 py-2 text-left whitespace-nowrap md:text-left ${
                  activeTab === "addProduct"
                    ? "bg-black text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                Add Product
              </button>
            </li>
            <li className="flex-1">
              <button
                onClick={() => setActiveTab("listItems")}
                className={`w-full px-4 py-2 text-left whitespace-nowrap md:text-left ${
                  activeTab === "listItems"
                    ? "bg-black text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                List Items
              </button>
            </li>
          </ul>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-8">{renderContent()}</main>
      </div>
    </div>
  );
};

export default AdminPage;
