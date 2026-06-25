
import { useState } from "react";
import { Button } from "./ui/button";
import { Star, Heart, ArrowRight, ShoppingBag, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useProducts } from "@/contexts/ProductsContext";
import { useSiteSettings } from "@/contexts/SiteSettingsContext";
import { useCart } from "@/contexts/CartContext";

const BADGE_COLORS = ["bg-[#D4AF37]", "bg-[#8B4513]", "bg-[#1C0F00]", "bg-[#D4AF37]", "bg-[#8B4513]", "bg-[#1C0F00]"];

export const FeaturedProducts = () => {
  const navigate = useNavigate();
  const { getFeatured } = useProducts();
  const { settings } = useSiteSettings();
  const { addToCart } = useCart();
  const featured = getFeatured();
  const [added, setAdded] = useState<string | null>(null);

  const handleAddToCart = (product: Parameters<typeof addToCart>[0]) => {
    addToCart(product);
    setAdded(product.id);
    setTimeout(() => setAdded(null), 1500);
  };

  const handleWhatsApp = (product: { name: string; price: number }) => {
    const message = `Hi! I'm interested in the ${product.name} (${settings.currencySymbol}${product.price.toLocaleString()}). Can you please provide more details?`;
    window.open(`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank");
  };

  if (featured.length === 0) return null;

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="h-[1px] w-10 bg-[#D4AF37]" />
            <span className="text-[#D4AF37] text-xs tracking-[0.3em] font-medium uppercase">Handpicked for You</span>
            <div className="h-[1px] w-10 bg-[#D4AF37]" />
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#1C0F00] mb-4">
            Featured Products
          </h2>
          <p className="text-[#8B4513]/70 text-lg">Premium pieces from our Dubai collection</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {featured.map((product, index) => {
            const discount = Math.round((1 - product.price / product.originalPrice) * 100);
            return (
              <div
                key={product.id}
                className="group relative bg-white border border-[#EAD7BB] overflow-hidden hover:border-[#D4AF37] transition-all duration-300 hover:shadow-[0_8px_40px_rgba(212,175,55,0.2)]"
              >
                {/* Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className={`${BADGE_COLORS[index % BADGE_COLORS.length]} text-white px-3 py-1 text-xs font-semibold tracking-wider uppercase`}>
                    {product.category || "Featured"}
                  </span>
                </div>

                {/* Discount */}
                {discount > 0 && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="bg-white/90 text-[#8B4513] px-2 py-1 text-xs font-bold border border-[#EAD7BB]">
                      {discount}% OFF
                    </span>
                  </div>
                )}

                {/* Image */}
                <div className="aspect-[3/4] overflow-hidden relative bg-[#FDF5E6]">
                  <img
                    src={product.image_url || "https://res.cloudinary.com/df4autxjg/image/upload/v1751638933/ROYAL_BLACK_ABAYA_hrx8kd.png"}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://res.cloudinary.com/df4autxjg/image/upload/v1751638933/ROYAL_BLACK_ABAYA_hrx8kd.png";
                    }}
                  />
                  <div className="absolute inset-0 bg-[#1C0F00]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                    <button
                      onClick={() => navigate("/products")}
                      className="bg-white text-[#1C0F00] px-6 py-2 text-sm font-semibold tracking-wider uppercase transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                    >
                      View Details
                    </button>
                  </div>
                </div>

                {/* Info */}
                <div className="p-5">
                  <h3 className="text-lg font-serif font-semibold text-[#1C0F00] mb-1 group-hover:text-[#8B4513] transition-colors line-clamp-1">
                    {product.name}
                  </h3>
                  {product.description && (
                    <p className="text-xs text-[#8B4513]/50 mb-2 line-clamp-1">{product.description}</p>
                  )}

                  {/* Rating */}
                  <div className="flex items-center mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 text-[#D4AF37] fill-current" />
                    ))}
                    <span className="ml-2 text-xs text-[#8B4513]">5.0</span>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-2 mb-5">
                    <span className="text-2xl font-bold text-[#D4AF37]">
                      {settings.currencySymbol}{product.price.toLocaleString()}
                    </span>
                    {product.originalPrice > product.price && (
                      <span className="text-sm text-[#8B4513]/50 line-through">
                        {settings.currencySymbol}{product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>

                  <div className="h-[1px] bg-gradient-to-r from-[#D4AF37]/40 to-transparent mb-4" />

                  <div className="flex gap-2">
                    <Button
                      className={`flex-1 text-xs tracking-wider font-semibold uppercase transition-all duration-300 rounded-none h-10 ${
                        added === product.id
                          ? "bg-green-600 hover:bg-green-600 text-white"
                          : "bg-[#1C0F00] hover:bg-[#D4AF37] text-white hover:text-[#1C0F00]"
                      }`}
                      onClick={() => handleAddToCart(product)}
                    >
                      <ShoppingBag className="w-3.5 h-3.5 mr-1.5" />
                      {added === product.id ? "Added!" : "Add to Cart"}
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      title="Quick WhatsApp enquiry"
                      className="border-[#EAD7BB] hover:border-green-500 hover:bg-green-50 text-[#8B4513] hover:text-green-600 rounded-none h-10 w-10 flex-shrink-0"
                      onClick={() => handleWhatsApp(product)}
                    >
                      <MessageCircle className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={() => navigate("/products")}
            className="inline-flex items-center gap-3 text-[#1C0F00] hover:text-[#D4AF37] font-semibold tracking-wide group transition-colors duration-300"
          >
            <span className="border-b-2 border-[#D4AF37] pb-0.5">View All Products</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </section>
  );
};
