import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomePage from "./features/home/pages/HomePage";
import Login from "./features/auth/pages/Login";
import Signup from "./features/auth/pages/Signup";
import ProductsPage from "./features/products/page/ProductsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        path: "/",
        Component: HomePage,
      },

      {
        path: "/login",
        Component: Login,
      },

      { path: "/signup", Component: Signup },

      {
        path: "/products",
        Component: ProductsPage,
      },
    ],
  },
]);
