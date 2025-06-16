import Spinner from "@/components/Spinner";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
  const { isAuthenticated, user, isLoading } = useSelector(
    (state) => state.auth,
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  if (user?.role?.toLowerCase() !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;
