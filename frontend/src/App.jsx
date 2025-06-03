import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <div>
      <Navbar />
      <ScrollToTop />
      <Outlet />
    </div>
  );
}

export default App;
