import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import { Toaster } from "react-hot-toast";
import Footer from "./features/home/components/Footer";
import { useCheckAuth } from "./hooks/auth/useCheckAuth";
import { useDispatch } from "react-redux";
import { clearUser, setLoading, setUser } from "./store/authSlice";

function App() {
  const { data, isLoading } = useCheckAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [isLoading, dispatch]);

  useEffect(() => {
    if (data?.user) {
      dispatch(setUser(data.user));
    } else if (!isLoading && !data?.user) {
      dispatch(clearUser());
    }
  }, [data, isLoading, dispatch]);

  return (
    <div>
      <Navbar />
      <ScrollToTop />
      <Outlet />
      <div className="box">
        <Footer />
      </div>
      <Toaster
        reverseOrder={false}
        toastOptions={{
          success: {
            iconTheme: {
              primary: "black",
              secondary: "white",
            },
          },
        }}
      />
    </div>
  );
}

export default App;
