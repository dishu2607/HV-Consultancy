import ScrollProgress from "./components/ScrollProgress";
import ServiceTicker from "./components/ServiceTicker";
import Nav from "./components/Nav";
import Hero from "./sections/Hero";
import Services from "./sections/Services";
import Deliverables from "./sections/Deliverables";
import FAQs from "./sections/FAQs";
import Testimonials from "./sections/Testimonials";
import About from "./sections/About";
import Contact from "./sections/Contact";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen">
      <ScrollProgress />
      <Nav />
      <Hero />
      <ServiceTicker />
      <About />
      <Services />
      <Deliverables />
      <FAQs />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}
