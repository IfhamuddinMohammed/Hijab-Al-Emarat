
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { Categories } from "@/components/Categories";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Categories />
      <FeaturedProducts />
      <WhatsAppFloat />
      <Footer />
    </div>
  );
};

export default Index;
