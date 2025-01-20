import Navbar from "./components/Navbar/Navbar.js";
import BlogList from "./components/Blog-List/BlogList.js";
import Footer from "./components/Footer/Footer.js";
import Hero from "./components/HeroSection/Hero.js";

export default function Home() {
  return (
    <div>
      <Hero/>
      <BlogList/>
    </div>
  );
}
