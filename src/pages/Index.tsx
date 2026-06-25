
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
            desc: "Sourced directly from Dubai's finest boutiques and ateliers.",
          },
          {
            icon: Truck,
            title: "Pan-India Delivery",
            desc: "Reliable shipping across all Indian states, with tracking.",
          },
          {
            icon: Shield,
            title: "Secure Payments",
            desc: "100% secure checkout with COD & UPI options available.",
          },
          {
            icon: RefreshCw,
            title: "Easy Returns",
            desc: "Hassle-free 7-day return policy for your peace of mind.",
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            name: "Fatima Rahman",
            city: "Mumbai",
            rating: 5,
            text: "The quality is absolutely stunning! My abaya arrived beautifully packed and the fabric is luxurious. Exactly like Dubai quality. Will definitely order again!",
            product: "Royal Black Abaya",
          },
          {
            name: "Aisha Khan",
            city: "Hyderabad",
            rating: 5,
            text: "I've been searching for premium hijabs in India and found Hijab Al Emarat. The silk hijab is incredibly soft and the color is exactly as shown. Fast delivery too!",
            product: "Premium Silk Hijab",
          },
          {
            name: "Zainab Siddiqui",
            city: "Delhi",
            rating: 5,
            text: "Amazing experience from start to finish. The WhatsApp support was super helpful in choosing the right size. The evening abaya is perfect for special occasions.",
            product: "Elegant Evening Abaya",
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
            We believe every woman deserves to experience the elegance of authentic Dubai fashion.
            Our curators personally select each piece from the finest boutiques in the UAE to ensure
            you receive nothing but the best.
          </p>
          <p className="text-[#8B4513]/70 text-base leading-relaxed mb-8">
            From luxurious silk hijabs to stunning abayas — each item tells a story of craftsmanship,
            faith, and timeless style.
          </p>
          <div className="grid grid-cols-3 gap-6">
            {[
              { number: "2000+", label: "Happy Customers" },
              { number: "50+", label: "Premium Styles" },
              { number: "4.9★", label: "Average Rating" },
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
