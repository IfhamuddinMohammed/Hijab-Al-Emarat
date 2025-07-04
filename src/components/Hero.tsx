
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-cream via-sand to-desert-50 text-desert overflow-hidden">
      {/* Background Pattern with Arabic-inspired elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 border-2 border-gold rotate-45"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 border-2 border-gold rotate-12"></div>
        <div className="absolute top-1/3 right-1/4 w-16 h-16 border border-gold rotate-45"></div>
        <div className="absolute bottom-1/4 left-1/4 w-20 h-20 border border-gold rounded-full"></div>
      </div>

      {/* Decorative Islamic pattern overlay */}
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="animate-fade-in">
          <h1 className="text-6xl md:text-8xl font-serif font-bold mb-6 leading-tight text-desert">
            Hijabi <span className="text-gold">Al Emarat</span>
          </h1>
          
          {/* Arabic text */}
          <p className="text-lg md:text-xl text-desert-500 mb-4 font-medium tracking-wider">
            الحجاب الإماراتي
          </p>
          
          <p className="text-2xl md:text-3xl mb-8 max-w-3xl mx-auto leading-relaxed font-serif text-desert-700">
            Hijabs that Reflect Light, Faith & Fashion
          </p>
          
          <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto text-desert-600 font-light">
            Premium modest fashion from the heart of Dubai, delivered with love to India
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6 justify-center items-center animate-fade-in">
          <Button
            size="lg"
            className="bg-gold hover:bg-gold-600 text-desert font-semibold px-10 py-4 text-lg shadow-elegant hover:shadow-elegant-hover transition-all duration-300 transform hover:scale-105"
            onClick={() => navigate("/products")}
          >
            Explore Collection
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-2 border-desert text-desert hover:bg-desert hover:text-cream px-10 py-4 text-lg shadow-elegant hover:shadow-elegant-hover transition-all duration-300"
            onClick={() => window.open("https://wa.me/971XXXXXXXXX", "_blank")}
          >
            WhatsApp Us
          </Button>
        </div>

        {/* Trust indicators */}
        <div className="mt-16 flex flex-col md:flex-row justify-center items-center gap-8 text-desert-600">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-gold rounded-full"></span>
            <span className="text-sm font-medium">Premium Quality</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-gold rounded-full"></span>
            <span className="text-sm font-medium">Dubai Sourced</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-gold rounded-full"></span>
            <span className="text-sm font-medium">India Delivery</span>
          </div>
        </div>
      </div>

      {/* Elegant bottom gradient */}
      <div className="absolute -bottom-1 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
};
