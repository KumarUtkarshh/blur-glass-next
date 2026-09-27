import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Compatibility from "@/components/Compatibility";
import ComfortZone from "@/components/ComfortZone";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="page-wrapper">
      <Header />
      <main>
        <Hero />
        <Compatibility />
        <ComfortZone />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
