import Header from "../components/Header";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import FeaturesSection from "../components/FeaturesSection";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main>
        <Hero />
        <FeaturesSection />
      </main>

      <Footer />
    </div>
  );
}
