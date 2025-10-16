import Header from "../components/Header";
import Footer from "../components/Footer";
import Hero from "../components/Hero";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main>
        <Hero />
      </main>

      <Footer />
    </div>
  );
}
