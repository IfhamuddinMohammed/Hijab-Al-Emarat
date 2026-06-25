import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { useWishlist } from "@/contexts/WishlistContext";
import { useCart } from "@/contexts/CartContext";
import { useSiteSettings } from "@/contexts/SiteSettingsContext";
import { useNavigate } from "react-router-dom";

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { settings } = useSiteSettings();
  const navigate = useNavigate();

  const handleWhatsApp = (product: { name: string; price: number }) => {
    const message = `Hi! I'm interested in the ${product.name} (${settings.currencySymbol}${product.price.toLocaleString()}). Can you please provide more details?`;
    window.open(`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank");
  };

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-[#FDF5E6]">
        <Header />
        <div className="container mx-auto px-4 py-24 text-center">
          <div className="w-20 h-20 border-2 border-[#EAD7BB] flex items-center justify-center mx-auto mb-6">
            <Heart className="w-10 h-10 text-[#D4AF37]" />
          </div>
          <h1 className="text-3xl font-serif font-bold text-[#1C0F00] mb-4">Your Wishlist is Empty</h1>
          <p className="text-[#8B4513]/60 mb-8">Tap the heart on any product to save it here.</p>
          <Button
            className="bg-[#1C0F00] hover:bg-[#D4AF37] hover:text-[#1C0F00] text-white rounded-none font-semibold tracking-wider uppercase text-sm transition-all duration-300 px-8 h-11"
            onClick={() => navigate("/products")}
          >
            Browse Collection
          </Button>
        </div>
        <WhatsAppFloat />
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDF5E6]">
      <Header />

      <section className="bg-[#1C0F00] py-12 relative">
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-60" />
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="h-[1px] w-10 bg-[#D4AF37]" />
            <span className="text-[#D4AF37] text-xs tracking-[0.3em] font-medium uppercase">Saved Items</span>
            <div className="h-[1px] w-10 bg-[#D4AF37]" />
          </div>
          <h1 className="text-4xl font-serif font-bold text-white flex items-center justify-center gap-3">
            <Heart className="w-7 h-7 text-[#D4AF37] fill-current" /> My Wishlist
          </h1>
          <p className="text-white/40 mt-2">{wishlist.length} item{wishlist.length !== 1 ? "s" : ""} saved</p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlist.map(product => {
              const discount = product.originalPrice > product.price
                ? Math.round((1 - product.price / product.originalPrice) * 100)
                : 0;
              return (
                <div key={product.id}
                  className="bg-white border border-[#EAD7BB] overflow-hidden hover:border-[#D4AF37] hover:shadow-[0_8px_32px_rgba(212,175,55,0.15)] transition-all duration-300 group"
                >
                  <div className="aspect-[3/4] overflow-hidden relative bg-[#FDF5E6]">
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      onError={e => { (e.target as HTMLImageElement).src = "https://res.cloudinary.com/df4autxjg/image/upload/v1751638933/ROYAL_BLACK_ABAYA_hrx8kd.png"; }}
                    />
                    {discount > 0 && (
                      <span className="absolute top-3 left-3 bg-[#D4AF37] text-white text-[10px] font-bold px-2 py-0.5 uppercase">
                        {discount}% OFF
                      </span>
                    )}
                    <button
                      onClick={() => removeFromWishlist(product.id)}
                      className="absolute top-3 right-3 w-8 h-8 bg-white/90 hover:bg-red-500 hover:text-white text-[#8B4513] flex items-center justify-center transition-all duration-200 border border-[#EAD7BB]"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="p-5">
                    <p className="text-[10px] text-[#D4AF37] font-semibold uppercase tracking-widest mb-1">{product.category}</p>
                    <h3 className="text-lg font-serif font-semibold text-[#1C0F00] mb-3 group-hover:text-[#8B4513] transition-colors line-clamp-1">
                      {product.name}
                    </h3>

                    <div className="h-[1px] bg-gradient-to-r from-[#D4AF37]/30 to-transparent mb-4" />

                    <div className="flex items-baseline gap-2 mb-5">
                      <span className="text-xl font-bold text-[#D4AF37]">
                        {settings.currencySymbol}{product.price.toLocaleString()}
                      </span>
                      {product.originalPrice > product.price && (
                        <span className="text-xs text-[#8B4513]/40 line-through">
                          {settings.currencySymbol}{product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Button
                        className="w-full bg-[#1C0F00] hover:bg-[#D4AF37] hover:text-[#1C0F00] text-white rounded-none font-semibold tracking-wider uppercase text-xs transition-all duration-300 h-9"
                        onClick={() => { addToCart(product); navigate("/cart"); }}
                      >
                        <ShoppingBag className="w-3.5 h-3.5 mr-1.5" />
                        Add to Cart
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full border-[#EAD7BB] hover:border-green-500 hover:text-green-700 text-[#8B4513] rounded-none text-xs h-9 uppercase tracking-wider transition-all"
                        onClick={() => handleWhatsApp(product)}
                      >
                        WhatsApp Enquiry
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-10 text-center">
            <button
              onClick={() => navigate("/products")}
              className="inline-flex items-center gap-2 text-[#1C0F00] hover:text-[#D4AF37] font-semibold text-sm tracking-wide group transition-colors duration-300"
            >
              <span className="border-b border-[#D4AF37] pb-0.5">Continue Shopping</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      <WhatsAppFloat />
      <Footer />
    </div>
  );
};

export default Wishlist;
