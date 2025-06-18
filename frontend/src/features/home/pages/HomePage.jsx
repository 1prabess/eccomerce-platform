import Hero from "../components/Hero";
import LatestProducts from "../components/LatestProducts";
import Services from "../components/Services";
import TestimonialSlider from "../components/TestimonialSlider";
import AboutUs from "../components/AboutUs";

function HomePage() {
  return (
    <div className="box">
      <Hero />
      <Services />
      <LatestProducts />
      <TestimonialSlider />
      <AboutUs />
    </div>
  );
}

export default HomePage;
