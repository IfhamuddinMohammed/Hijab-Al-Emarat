
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { ChevronDown, Star } from "lucide-react";
import { useSiteSettings } from "@/contexts/SiteSettingsContext";

export const Hero = () => {
  const navigate = useNavigate();
  const { settings } = useSiteSettings();

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${settings.heroBgImage}')` }}
      />

      {/* Layered Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1C0F00]/60 via-[#1C0F00]/50 to-[#1C0F00]/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#1C0F00]/40 via-transparent to-[#1C0F00]/20" />

      {/* Decorative gold corner accents */}
      <div className="absolute top-8 left-8 w-12 h-12 border-t-2 border-l-2 border-[#D4AF37] opacity-60 hidden md:block" />
      <div className="absolute top-8 right-8 w-12 h-12 border-t-2 border-r-2 border-[#D4AF37] opacity-60 hidden md:block" />
      <div className="absolute bottom-16 left-8 w-12 h-12 border-b-2 border-l-2 border-[#D4AF37] opacity-60 hidden md:block" />
      <div className="absolute bottom-16 right-8 w-12 h-12 border-b-2 border-r-2 border-[#D4AF37] opacity-60 hidden md:block" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        {/* Top label */}
        <div className="inline-flex items-center gap-3 mb-6 animate-fade-in">
          <div className="h-[1px] w-12 bg-[#D4AF37]" />
          <span className="text-[#D4AF37] text-xs tracking-[0.35em] font-medium uppercase">
            {settings.heroBadgeText}
          </span>
          <div className="h-[1px] w-12 bg-[#D4AF37]" />
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-4 leading-tight animate-fade-in">
          {settings.storeName.split(" ").slice(0, -1).join(" ")}{" "}
          <span className="text-[#D4AF37]">{settings.storeName.split(" ").slice(-1)[0]}</span>
        </h1>

        {/* Arabic */}
        <p className="text-[#D4AF37] text-lg md:text-xl mb-4 tracking-[0.2em] font-medium animate-fade-in" dir="rtl">
          {settings.storeTaglineArabic}
        </p>

        {/* Gold divider */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-[#D4AF37]" />
          <div className="text-[#D4AF37] text-lg">✦</div>
          <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-[#D4AF37]" />
        </div>

        {/* Subheading */}
        <p className="text-xl md:text-2xl text-white/90 mb-4 max-w-2xl mx-auto font-light leading-relaxed animate-fade-in">
          {settings.heroSubtitle}
        </p>
        <p className="text-base md:text-lg text-white/70 mb-10 max-w-xl mx-auto font-light animate-fade-in">
          {settings.heroBodyText}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-fade-in">
          <Button
            size="lg"
            className="bg-[#D4AF37] hover:bg-[#B8972A] text-[#1C0F00] font-semibold px-10 py-6 text-base tracking-wide shadow-[0_4px_24px_rgba(212,175,55,0.4)] hover:shadow-[0_6px_32px_rgba(212,175,55,0.5)] transition-all duration-300 rounded-none"
            onClick={() => navigate("/products")}
          >
            {settings.heroCtaPrimary}
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-white/60 text-white hover:bg-white hover:text-[#1C0F00] px-10 py-6 text-base tracking-wide transition-all duration-300 rounded-none bg-transparent"
            onClick={() => window.open(`https://wa.me/${settings.whatsappNumber}`, "_blank")}
          >
            WhatsApp Us
          </Button>
        </div>

        {/* Social Proof Row */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-10 text-white/70 text-sm animate-fade-in">
          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 text-[#D4AF37] fill-current" />
              ))}
            </div>
            <span>4.9 Rated</span>
          </div>
          <div className="w-1 h-1 bg-[#D4AF37] rounded-full hidden sm:block" />
          <div className="flex items-center gap-2">
            <span className="text-[#D4AF37] font-semibold">2000+</span>
            <span>Happy Customers</span>
          </div>
          <div className="w-1 h-1 bg-[#D4AF37] rounded-full hidden sm:block" />
          <div className="flex items-center gap-2">
            <span className="text-[#D4AF37] font-semibold">Pan-India</span>
            <span>Delivery</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#collections"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/50 hover:text-[#D4AF37] transition-colors duration-300 group"
      >
        <span className="text-[10px] tracking-widest uppercase">Scroll</span>
        <ChevronDown className="w-5 h-5 animate-bounce" />
      </a>
    </section>
  );
};
