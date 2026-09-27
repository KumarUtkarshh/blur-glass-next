import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Compatibility from "@/components/Compatibility";
import HowItWorks from "@/components/HowItWorks";
import ComfortZone from "@/components/ComfortZone";
import MenuBarSimulation from "@/components/MenuBarSimulation";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="page-wrapper">
      <Header />
      <main>
        <Hero />
        <Compatibility />
        <HowItWorks />
        <ComfortZone />
        <MenuBarSimulation />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
