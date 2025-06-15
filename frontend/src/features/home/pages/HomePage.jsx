import CategoryGrid from "../components/CategoryGrid";

import Hero from "../components/Hero";
import LatestProducts from "../components/LatestProducts";
import Services from "../components/Services";
import TestimonialSlider from "../components/TestimonialSlider";

function HomePage() {
  return (
    <div className="box">
      <Hero />
      {/* <Services /> */}
      <LatestProducts />
      <TestimonialSlider />
      <CategoryGrid />
    </div>
  );
}

export default HomePage;
