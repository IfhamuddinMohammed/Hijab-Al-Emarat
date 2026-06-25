
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { Heart, Globe, Shield, Truck } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-[#FDF5E6]">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-[#1C0F00] text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23D4AF37' fill-opacity='0.4'%3E%3Ccircle cx='20' cy='20' r='1.5'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1C0F00]/80" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-3 mb-5">
            <div className="h-[1px] w-10 bg-[#D4AF37]" />
            <span className="text-[#D4AF37] text-xs tracking-[0.3em] font-medium uppercase">Who We Are</span>
            <div className="h-[1px] w-10 bg-[#D4AF37]" />
          </div>
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 leading-tight">Our Story</h1>
          <p className="text-white/70 text-lg max-w-3xl mx-auto leading-relaxed">
            Bringing Dubai's finest modest fashion to India with love, quality, and cultural respect
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-60" />
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-3 mb-5">
                  <div className="h-[1px] w-10 bg-[#D4AF37]" />
                  <span className="text-[#D4AF37] text-xs tracking-[0.3em] font-medium uppercase">Our Mission</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1C0F00] mb-5">
                  Bridging Cultures Through Fashion
                </h2>
                <div className="space-y-4 text-[#8B4513]/70 leading-relaxed text-base">
                  <p>
                    Based in the heart of Dubai, we understand the elegance and sophistication
                    that comes with authentic Middle Eastern modest fashion. Our journey began
                    with a simple vision: to make premium Dubai fashion accessible to our
                    sisters in India.
                  </p>
                  <p>
                    Every piece in our collection is carefully selected from Dubai's finest
                    boutiques and ateliers, ensuring that you receive nothing but the highest
                    quality fabrics, impeccable craftsmanship, and timeless designs.
                  </p>
                  <p>
                    We believe modest fashion should be beautiful, comfortable, and accessible.
                    That's why we've made it our mission to bring you authentic Dubai elegance
                    right to your doorstep in India.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -top-3 -right-3 w-full h-full border border-[#D4AF37]/30" />
                <img
                  src="https://res.cloudinary.com/df4autxjg/image/upload/v1751639266/Mission_o0rwu0.png"
                  alt="Dubai Fashion"
                  className="relative rounded-none shadow-lg w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-[#FDF5E6]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="h-[1px] w-10 bg-[#D4AF37]" />
              <span className="text-[#D4AF37] text-xs tracking-[0.3em] font-medium uppercase">Our Values</span>
              <div className="h-[1px] w-10 bg-[#D4AF37]" />
            </div>
            <h2 className="text-4xl font-serif font-bold text-[#1C0F00] mb-4">
              Why Choose Hijab Al Emarat?
            </h2>
            <p className="text-[#8B4513]/60 text-lg">Our commitment to excellence in every aspect</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Heart,
                title: "Authentic Quality",
                desc: "Every piece is sourced directly from Dubai's premium fashion houses, ensuring authentic quality and craftsmanship.",
              },
              {
                icon: Globe,
                title: "Cultural Respect",
                desc: "We understand and honor the cultural significance of modest fashion, bringing you pieces that celebrate tradition with modern elegance.",
              },
              {
                icon: Shield,
                title: "Trust & Safety",
                desc: "Secure transactions, quality assurance, and customer protection are our top priorities for your peace of mind.",
              },
              {
                icon: Truck,
                title: "Fast Delivery",
                desc: "Quick and reliable delivery across India, with cash on delivery options for your convenience.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white border border-[#EAD7BB] p-6 hover:border-[#D4AF37] transition-all duration-300 group"
              >
                <div className="w-12 h-12 border border-[#D4AF37]/30 flex items-center justify-center mb-4 group-hover:bg-[#D4AF37]/10 transition-colors">
                  <item.icon className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <h3 className="text-lg font-serif font-semibold text-[#1C0F00] mb-3">{item.title}</h3>
                <p className="text-[#8B4513]/60 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-[#1C0F00] text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-60" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-3 mb-5">
            <div className="h-[1px] w-10 bg-[#D4AF37]" />
            <span className="text-[#D4AF37] text-xs tracking-[0.3em] font-medium uppercase">Connect</span>
            <div className="h-[1px] w-10 bg-[#D4AF37]" />
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Ready to Experience Dubai Elegance?
          </h2>
          <p className="text-white/50 text-lg mb-8 max-w-2xl mx-auto">
            Connect with us on WhatsApp for personalized assistance, styling advice,
            or to place your order directly.
          </p>
          <button
            onClick={() => window.open("https://wa.me/971582109797", "_blank")}
            className="bg-[#25D366] hover:bg-[#1da851] text-white px-10 py-4 font-semibold text-base tracking-wide transition-colors duration-300 inline-flex items-center gap-3"
          >
            Chat with Us on WhatsApp
          </button>
        </div>
      </section>

      <WhatsAppFloat />
      <Footer />
    </div>
  );
};

export default About;
