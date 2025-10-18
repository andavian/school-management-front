import Header from "../components/Header";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import FeaturesSection from "../components/FeaturesSection";
import TestimonialsSection from "../components/TestimonialsSection";
import ContactInfoSection from "../components/ContactInfoSection";
import ContactFormSection from "../components/ContactFormSection";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main>
        <Hero />
        <FeaturesSection />
        <TestimonialsSection />
        <ContactInfoSection />
        <ContactFormSection />
      </main>

      <Footer />
    </div>
  );
}
