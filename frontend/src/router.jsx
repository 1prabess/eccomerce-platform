import { createBrowserRouter } from "react-router-dom";

import App from "./App";
import HomePage from "./features/home/pages/HomePage";
import ProductsPage from "./features/products/page/ProductsPage";
import ProductDetailsPage from "./features/products/page/ProductDetailPage";
import SigninPage from "./features/auth/pages/SigninPage";
import SignupPage from "./features/auth/pages/SignupPage";
import VerificationPage from "./features/auth/pages/VerificationPage";
import ForgotPasswordPage from "./features/auth/pages/ForgotPasswordPage";
import ResetPasswordPage from "./features/auth/pages/ResetPasswordPage";
import CartPage from "./features/cart/pages/CartPage";
import OrderPage from "./features/order/pages/OrderPage";
import OrdersPage from "./features/order/pages/OrdersPage";
import AdminRoute from "./features/admin/AdminRoute";
import AdminPage from "./features/admin/pages/AdminPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "signin", element: <SigninPage /> },
      { path: "signup", element: <SignupPage /> },
      { path: "forgot-password", element: <ForgotPasswordPage /> },
      {
        path: "reset-password/:resetPasswordToken",
        element: <ResetPasswordPage />,
      },
      { path: "verify-account", element: <VerificationPage /> },
      { path: "products", element: <ProductsPage /> },
      {
        path: "products/:productSlug",
        element: <ProductDetailsPage />,
      },
      { path: "cart", element: <CartPage /> },
      { path: "order", element: <OrderPage /> },
      { path: "orders", element: <OrdersPage /> },

      {
        element: <AdminRoute />,
        children: [{ path: "admin", element: <AdminPage /> }],
      },
    ],
  },
]);
