import LandingNavbar from "../components/LandingNavbar";
import Carousel from "../components/Carousel";
import Features from "../components/Features";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div>
      <LandingNavbar />

      <div className="pt-24">
        <Carousel />
        <Features />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}