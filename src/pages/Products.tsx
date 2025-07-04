import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { ProductBadges } from "@/components/ProductBadges";
import { SizeChartModal } from "@/components/SizeChartModal";
import { ProductImageZoom } from "@/components/ProductImageZoom";
import { Star, Filter, ShoppingBag, Heart, Search, TrendingUp, Tag } from "lucide-react";

const Products = () => {
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState("all");

  useEffect(() => {
    const categoryFromUrl = searchParams.get("category");
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
    }
  }, [searchParams]);

  const products = [
    {
      id: 1,
      name: "Royal Black Abaya",
      price: "₹4,999",
      originalPrice: "₹6,999",
      category: "abayas",
      images: [
        "https://res.cloudinary.com/df4autxjg/image/upload/v1751634671/hjb2_teldey.jpg",
        "https://res.cloudinary.com/df4autxjg/image/upload/v1751634770/Hjb1_bsiwjl.jpg"
      ],
      rating: 4.8,
      reviews: 24000,
      sizes: ["S", "M", "L", "XL"],
      colors: ["Black", "Navy", "Brown"],
      badges: ["Bestseller", "Premium"],
      fabricFeatures: ["Breathable", "Wrinkle-free"],
      fabric: "Premium Nida",
      inStock: true,
      isNew: false,
      isTrending: true
    }
  ];

  const pageHeaderStyle = {
    backgroundImage: "linear-gradient(to right, #fdf6ec, #fffaf4)",
    borderBottom: "1px solid #f3e6d2",
  };

  return (
    <div className="min-h-screen bg-[#FFFCF7] font-sans">
      <Header />

      {/* Elegant Page Header */}
      <section className="py-16 relative" style={pageHeaderStyle}>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-[#A3702B] text-center mb-4">
            {selectedCategory === "all"
              ? "Our Collection"
              : selectedCategory === "hijabs"
              ? "Hijabs Collection"
              : selectedCategory === "abayas"
              ? "Abayas Collection"
              : selectedCategory === "scarves"
              ? "Scarves Collection"
              : "Our Collection"}
          </h1>
          <p className="text-[#997A44] text-xl text-center max-w-3xl mx-auto leading-relaxed">
            {selectedCategory === "hijabs"
              ? "Premium hijabs sourced directly from Dubai's finest fashion houses"
              : "Discover our complete range of premium modest fashion sourced directly from Dubai's finest fashion houses"}
          </p>
        </div>
      </section>

      {/* Enhanced Filters */}
      <section className="py-8 bg-[#FFF8F0] border-t border-b border-[#f3e6d2]">
        <div className="container mx-auto px-4">
          {/* filters unchanged */}
        </div>
      </section>

      {/* Elegant Product Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map(product => (
              <div
                key={product.id}
                className="relative bg-white rounded-2xl border border-[#EAD7BB] shadow-[0_8px_24px_rgba(173,144,102,0.15)] hover:shadow-[0_12px_32px_rgba(173,144,102,0.25)] transition-all overflow-hidden group"
              >
                <div className="relative overflow-hidden">
                  <ProductImageZoom images={product.images} productName={product.name} />
                  {product.isNew && (
                    <span className="absolute top-3 left-3 bg-[#d4af37] text-white px-2 py-1 text-xs rounded-full font-semibold">
                      NEW
                    </span>
                  )}
                  {product.isTrending && (
                    <span className="absolute top-3 right-3 bg-[#A3702B] text-white px-2 py-1 text-xs rounded-full font-semibold">
                      TRENDING
                    </span>
                  )}

                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white text-sm bg-[#A3702B] px-4 py-2 rounded-full font-semibold">
                      View Details
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-serif text-lg font-semibold text-[#4D3B2F] mb-2 group-hover:text-[#A3702B] transition-colors">
                    {product.name}
                  </h3>
                  <ProductBadges badges={product.badges} fabricFeatures={product.fabricFeatures} />
                  <div className="flex items-center gap-2 my-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? "text-[#d4af37] fill-current"
                            : "text-[#EAD7BB]"
                        }`}
                      />
                    ))}
                    <span className="text-sm text-[#A3702B] font-medium">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>
                  <p className="text-sm text-[#7D5A3A] mb-1">
                    <strong>Fabric:</strong> {product.fabric}
                  </p>
                  <p className="text-sm text-[#7D5A3A] mb-1">
                    <strong>Colors:</strong> {product.colors.join(", ")}
                  </p>
                  <p className="text-sm text-[#7D5A3A] mb-4">
                    <strong>Sizes:</strong> {product.sizes.join(", ")}
                  </p>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xl font-bold text-[#A3702B]">
                      {product.price}
                    </span>
                    <span className="text-sm text-[#C0A375] line-through">
                      {product.originalPrice}
                    </span>
                  </div>
                  <SizeChartModal />
                  <Button className="w-full mt-2 bg-[#A3702B] hover:bg-[#8e5d1f] text-white">
                    <ShoppingBag className="w-4 h-4 mr-2" /> Add to Cart
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WhatsAppFloat />
      <Footer />
    </div>
  );
};

export default Products;
