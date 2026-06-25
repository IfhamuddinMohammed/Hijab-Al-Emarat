
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { Categories } from "@/components/Categories";
import { Footer } from "@/components/Footer";
import { Shield, Truck, Award, RefreshCw, Star, Quote } from "lucide-react";

const WhyUs = () => (
  <section className="py-20 bg-[#1C0F00] text-white overflow-hidden relative">
    {/* Decorative */}
    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-60" />
    <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-60" />

    <div className="container mx-auto px-4">
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="h-[1px] w-10 bg-[#D4AF37]" />
          <span className="text-[#D4AF37] text-xs tracking-[0.3em] font-medium uppercase">Our Promise</span>
          <div className="h-[1px] w-10 bg-[#D4AF37]" />
        </div>
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-3">
          The Hijab Al Emarat Difference
        </h2>
        <p className="text-white/50 text-lg max-w-xl mx-auto">
          Every purchase is backed by our commitment to quality, authenticity and care
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            icon: Award,
            title: "Authentic Dubai Quality",
            desc: "Every piece is hand-picked from Dubai's finest boutiques and ateliers — not mass-produced replicas.",
          },
          {
            icon: Truck,
            title: "Pan-India Delivery",
            desc: "Reliable, tracked shipping to all 28 states within 5–7 business days. Free above ₹2,999.",
          },
          {
            icon: Shield,
            title: "Secure Payments",
            desc: "Pay by COD, UPI, PhonePe, or Google Pay — all transactions are 100% safe and verified.",
          },
          {
            icon: RefreshCw,
            title: "Easy Returns",
            desc: "Not happy? Our hassle-free 7-day return policy means you can shop with complete confidence.",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="border border-[#D4AF37]/20 p-6 hover:border-[#D4AF37]/60 transition-all duration-300 group relative"
          >
            <div className="w-12 h-12 border border-[#D4AF37]/30 flex items-center justify-center mb-5 group-hover:bg-[#D4AF37]/10 transition-colors duration-300">
              <item.icon className="w-5 h-5 text-[#D4AF37]" />
            </div>
            <h3 className="text-white font-serif text-lg font-semibold mb-2">{item.title}</h3>
            <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Testimonials = () => (
  <section className="py-20 bg-[#FDF5E6]">
    <div className="container mx-auto px-4">
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="h-[1px] w-10 bg-[#D4AF37]" />
          <span className="text-[#D4AF37] text-xs tracking-[0.3em] font-medium uppercase">Customer Love</span>
          <div className="h-[1px] w-10 bg-[#D4AF37]" />
        </div>
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#1C0F00] mb-3">
          What Our Customers Say
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            name: "Fatima Rahman",
            city: "Mumbai",
            rating: 5,
            text: "I ordered the Royal Zari Abaya for my cousin's wedding and received so many compliments. The fabric feels genuinely luxurious — I've bought abayas from Dubai in person and this is right up there. The packaging was beautiful too, felt like a gift.",
            product: "Royal Zari Abaya",
          },
          {
            name: "Aisha Mohammed",
            city: "Hyderabad",
            rating: 5,
            text: "The Mulberry Silk Hijab is everything I hoped for. The sheen is real, the drape is effortless, and it stays put all day. I messaged them on WhatsApp before ordering and they helped me choose the right colour for my skin tone. That kind of service is rare.",
            product: "Mulberry Silk Hijab",
          },
          {
            name: "Zainab Siddiqui",
            city: "New Delhi",
            rating: 5,
            text: "Ordered the Aura Evening Abaya for Eid and it arrived two days before the occasion — perfectly on time. The shimmer is subtle yet stunning under lights. The COD option made me feel safe ordering for the first time. Definitely not the last.",
            product: "Aura Evening Abaya",
          },
          {
            name: "Ruqayyah Shaikh",
            city: "Pune",
            rating: 5,
            text: "I was sceptical about buying a niqab online but the Classic Half Niqab fit perfectly. The nida crepe is breathable — I wore it through an outdoor event and it stayed comfortable throughout. Already recommended it to three friends.",
            product: "Classic Half Niqab",
          },
          {
            name: "Mariam Al-Rashid",
            city: "Chennai",
            rating: 5,
            text: "The everyday jersey hijab is my new go-to. No pins needed — it grips and stays. I ordered three colours at once and the discount code HIJABFIRST made it even better value. Shipping was fast and the tracking updates were reassuring.",
            product: "Everyday Cotton Jersey Hijab",
          },
          {
            name: "Safia Begum",
            city: "Bengaluru",
            rating: 5,
            text: "Gifted the pin and magnet set to my daughter and she absolutely loves it. The presentation in the velvet pouch is gorgeous — it looked expensive and thoughtful. The quality of the pins is far above what you'd find at a regular store. Will be ordering more as gifts.",
            product: "Hijab Pin & Magnet Set",
          },
        ].map((review) => (
          <div
            key={review.name}
            className="bg-white border border-[#EAD7BB] p-6 hover:border-[#D4AF37] hover:shadow-[0_4px_24px_rgba(212,175,55,0.1)] transition-all duration-300"
          >
            <Quote className="w-6 h-6 text-[#D4AF37]/40 mb-4" />
            <div className="flex mb-3">
              {[...Array(review.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-[#D4AF37] fill-current" />
              ))}
            </div>
            <p className="text-[#3D2B1F] text-sm leading-relaxed mb-5 font-light italic">
              "{review.text}"
            </p>
            <div className="border-t border-[#EAD7BB] pt-4">
              <p className="font-semibold text-[#1C0F00] font-serif">{review.name}</p>
              <p className="text-[#8B4513]/50 text-xs mt-0.5">{review.city} · Purchased: {review.product}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const DubaiExperience = () => (
  <section className="py-20 bg-white">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="h-[1px] w-10 bg-[#D4AF37]" />
            <span className="text-[#D4AF37] text-xs tracking-[0.3em] font-medium uppercase">Our Story</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#1C0F00] mb-6 leading-tight">
            The Dubai Experience,<br />
            <span className="text-[#D4AF37]">Delivered to India</span>
          </h2>
          <p className="text-[#8B4513]/70 text-base leading-relaxed mb-4">
            Hijab Al Emarat was born from a simple belief — that women in India deserve access to
            the same quality and craftsmanship that lines the boutiques of Dubai's finest souks and
            shopping districts. Our curators personally source every piece from verified UAE ateliers.
          </p>
          <p className="text-[#8B4513]/70 text-base leading-relaxed mb-8">
            From hand-rolled silk hijabs to zari-embroidered abayas, each item in our collection
            carries the spirit of Emirati elegance. Modest. Meaningful. Made for you.
          </p>
          <div className="grid grid-cols-3 gap-6">
            {[
              { number: "3,200+", label: "Happy Customers" },
              { number: "80+", label: "Premium Styles" },
              { number: "4.9 ★", label: "Average Rating" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-serif font-bold text-[#D4AF37]">{stat.number}</p>
                <p className="text-[#8B4513]/60 text-xs mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <div className="absolute -top-4 -left-4 w-full h-full border-2 border-[#D4AF37]/30" />
          <img
            src="https://res.cloudinary.com/df4autxjg/image/upload/v1751639266/Mission_o0rwu0.png"
            alt="Dubai Fashion"
            className="relative w-full h-auto object-cover"
          />
          {/* Gold corner accents */}
          <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-[#D4AF37]" />
          <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-[#D4AF37]" />
        </div>
      </div>
    </div>
  </section>
);

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Categories />
      <FeaturedProducts />
      <WhyUs />
      <DubaiExperience />
      <Testimonials />
      <WhatsAppFloat />
      <Footer />
    </div>
  );
};

export default Index;
