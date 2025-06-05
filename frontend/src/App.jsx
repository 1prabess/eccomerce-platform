import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div>
      <Navbar />
      <ScrollToTop />
      <Outlet />
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
