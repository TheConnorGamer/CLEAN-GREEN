import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Story from "./components/Story";
import Ticker from "./components/Ticker";
import Transformations from "./components/Transformations";
import Services from "./components/Services";
import Proof from "./components/Proof";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="bg-[#0c0c0a]">
      <Nav />
      <Hero />
      <Story />
      <Ticker />
      <Transformations />
      <Services />
      <Proof />
      <FinalCTA />
      <Footer />
    </main>
  );
}
