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
        path: "/signin",
        Component: SigninPage,
      },

      { path: "/signup", Component: SignupPage },

      { path: "/forgot-password", Component: ForgotPasswordPage },

      {
        path: "/reset-password/:resetPasswordToken",
        Component: ResetPasswordPage,
      },

      { path: "/verify-account", Component: VerificationPage },

      {
        path: "/products",
        Component: ProductsPage,
      },
      {
        path: "/products/:productSlug",
        Component: ProductDetailsPage,
      },
    ],
  },
]);
