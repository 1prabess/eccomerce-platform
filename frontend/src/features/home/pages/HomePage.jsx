import { useSelector } from "react-redux";
import CategoryGrid from "../components/CategoryGrid";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import LatestProducts from "../components/LatestProducts";
import Services from "../components/Services";
import TestimonialSlider from "../components/TestimonialSlider";

function HomePage() {
  return (
    <div className="box">
      <Hero />
      <LatestProducts />
      <Services />
      <CategoryGrid />
      <TestimonialSlider />
      <Footer />
    </div>
  );
}

export default HomePage;
