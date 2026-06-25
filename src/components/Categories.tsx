
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export const Categories = () => {
  const navigate = useNavigate();

  const categories = [
    {
      name: "ABAYAS",
      arabicName: "عباءات",
      description: "Elegant traditional abayas",
      image: "https://res.cloudinary.com/df4autxjg/image/upload/v1751638467/Abayas_wpbner.png",
      path: "/products?category=abayas",
      span: "md:col-span-2"
    },
    {
      name: "HIJABS",
      arabicName: "حجاب",
      description: "Premium quality hijabs",
      image: "https://res.cloudinary.com/df4autxjg/image/upload/v1751638474/Hijabs_zoej9q.png",
      path: "/products?category=hijabs",
      span: ""
    },
    {
      name: "NIQABS",
      arabicName: "نقاب",
      description: "Luxurious face veils",
      image: "https://res.cloudinary.com/df4autxjg/image/upload/v1751638483/Niqabs_xwxnxb.png",
      path: "/products?category=niqabs",
      span: ""
    },
    {
      name: "ACCESSORIES",
      arabicName: "إكسسوارات",
      description: "Beautiful accessories",
      image: "https://res.cloudinary.com/df4autxjg/image/upload/v1751638633/accessories_ikyfjt.png",
      path: "/products?category=accessories",
      span: "md:col-span-2"
    },
  ];

  return (
    <section id="collections" className="py-20 bg-[#FDF5E6]">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="h-[1px] w-10 bg-[#D4AF37]" />
            <span className="text-[#D4AF37] text-xs tracking-[0.3em] font-medium uppercase">Curated for You</span>
            <div className="h-[1px] w-10 bg-[#D4AF37]" />
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#1C0F00] mb-4">
            Our Collections
          </h2>
          <p className="text-[#8B4513]/70 text-lg max-w-2xl mx-auto">
            Discover our carefully curated selection of modest fashion sourced directly from Dubai
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {categories.map((category, index) => (
            <div
              key={category.name}
              className={`${category.span} group cursor-pointer relative overflow-hidden rounded-sm`}
              style={{ aspectRatio: category.span ? "2/1.3" : "1/1.3" }}
              onClick={() => navigate(category.path)}
            >
              {/* Image */}
              <img
                src={category.image}
                alt={category.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Gradient overlay - always visible */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C0F00]/80 via-[#1C0F00]/20 to-transparent" />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-[#1C0F00]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Border on hover */}
              <div className="absolute inset-0 border-2 border-[#D4AF37] opacity-0 group-hover:opacity-60 transition-opacity duration-300 pointer-events-none" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                {/* Arabic name */}
                <p className="text-[#D4AF37] text-xs tracking-widest mb-1 font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  {category.arabicName}
                </p>
                <h3 className="text-white text-lg md:text-xl font-bold tracking-[0.15em] mb-1">
                  {category.name}
                </h3>
                <p className="text-white/60 text-xs md:text-sm opacity-0 group-hover:opacity-100 transition-all duration-300">
                  {category.description}
                </p>
                {/* Arrow */}
                <div className="flex items-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <span className="text-[#D4AF37] text-xs tracking-widest uppercase">Shop Now</span>
                  <ArrowRight className="w-3 h-3 text-[#D4AF37]" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
