
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
            From the souks of Dubai to doorsteps across India — bringing authentic Emirati elegance
            to the women who deserve it most
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
                    Hijab Al Emarat was founded by a family rooted in both the UAE and India —
                    two worlds that share a deep reverence for modesty, dignity, and style.
                    Living between Dubai and India, we saw first-hand the gap between the
                    exquisite modest fashion available in Emirati boutiques and what was
                    accessible to women back home.
                  </p>
                  <p>
                    So we built the bridge. Every abaya, hijab, and niqab in our collection
                    is personally sourced from verified artisans and ateliers across Dubai and
                    the wider UAE. No middle-men, no compromises on quality. Just the real thing,
                    delivered to you.
                  </p>
                  <p>
                    We believe modest fashion is an expression of identity — not a limitation.
                    It's a choice made with pride, faith, and style. That belief drives every
                    piece we curate and every customer we serve.
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
                title: "Personally Curated",
                desc: "We don't list everything — we list the best. Each piece is individually reviewed before it joins our collection.",
              },
              {
                icon: Globe,
                title: "Cultural Authenticity",
                desc: "Our roots span both UAE and India. We understand the nuance of modest fashion and curate with genuine respect for that heritage.",
              },
              {
                icon: Shield,
                title: "Zero-Risk Shopping",
                desc: "Pay on delivery, 7-day returns, and a WhatsApp team ready to assist — shop with absolute confidence.",
              },
              {
                icon: Truck,
                title: "Reliable Delivery",
                desc: "Tracked, insured shipping across all Indian states. Every order is packed to protect the garment during transit.",
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
            Questions? We're Right Here.
          </h2>
          <p className="text-white/50 text-lg mb-8 max-w-2xl mx-auto">
            Not sure about sizing, fabric, or delivery timelines? Our team replies on WhatsApp
            within minutes — we're here to make sure you love what you receive.
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
