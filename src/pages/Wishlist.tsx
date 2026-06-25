
import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingBag, Trash2, ArrowRight } from "lucide-react";

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: "Royal Black Abaya",
      price: 4999,
      originalPrice: 6999,
      image: "https://res.cloudinary.com/df4autxjg/image/upload/v1751638933/ROYAL_BLACK_ABAYA_hrx8kd.png",
      colors: ["Black", "Navy", "Brown"],
      sizes: ["S", "M", "L", "XL"],
    },
    {
      id: 3,
      name: "Elegant Evening Abaya",
      price: 7499,
      originalPrice: 9999,
      image: "https://res.cloudinary.com/df4autxjg/image/upload/v1751634770/Hjb1_bsiwjl.jpg",
      colors: ["Black", "Maroon", "Peach"],
      sizes: ["S", "M", "L", "XL", "XXL"],
    },
  ]);

  const removeFromWishlist = (id: number) => {
    setWishlistItems(wishlistItems.filter((item) => item.id !== id));
  };

  const handleWhatsAppOrder = (product: { name: string; price: number }) => {
    const message = `Hi! I'm interested in the ${product.name} from my wishlist (₹${product.price.toLocaleString()}). Can you please provide more details?`;
    const whatsappUrl = `https://wa.me/971582109797?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#FDF5E6]">
        <Header />
        <div className="container mx-auto px-4 py-24 text-center">
          <div className="w-20 h-20 border-2 border-[#EAD7BB] flex items-center justify-center mx-auto mb-6">
            <Heart className="w-10 h-10 text-[#D4AF37]" />
          </div>
          <h1 className="text-3xl font-serif font-bold text-[#1C0F00] mb-4">Your Wishlist is Empty</h1>
          <p className="text-[#8B4513]/60 mb-8">Save items you love to your wishlist</p>
          <Button
            className="bg-[#1C0F00] hover:bg-[#D4AF37] hover:text-[#1C0F00] text-white rounded-none font-semibold tracking-wider uppercase text-sm transition-all duration-300 px-8 h-11"
            onClick={() => (window.location.href = "/products")}
          >
            Continue Shopping
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

      {/* Page Header */}
      <section className="bg-[#1C0F00] py-12 relative">
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-60" />
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="h-[1px] w-10 bg-[#D4AF37]" />
            <span className="text-[#D4AF37] text-xs tracking-[0.3em] font-medium uppercase">Saved</span>
            <div className="h-[1px] w-10 bg-[#D4AF37]" />
          </div>
          <h1 className="text-4xl font-serif font-bold text-white flex items-center justify-center gap-3">
            <Heart className="w-8 h-8 text-[#D4AF37]" />
            My Wishlist
          </h1>
          <p className="text-white/40 mt-2">
            {wishlistItems.length} item{wishlistItems.length !== 1 ? "s" : ""} saved
          </p>
        </div>
      </section>

      {/* Wishlist Items */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistItems.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-[#EAD7BB] overflow-hidden hover:border-[#D4AF37] hover:shadow-[0_8px_32px_rgba(212,175,55,0.15)] transition-all duration-300 group"
              >
                {/* Product Image */}
                <div className="aspect-[3/4] overflow-hidden relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="absolute top-3 right-3 w-8 h-8 bg-white/90 hover:bg-red-500 hover:text-white text-[#8B4513] flex items-center justify-center transition-all duration-200 border border-[#EAD7BB]"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Product Info */}
                <div className="p-5">
                  <h3 className="text-lg font-serif font-semibold text-[#1C0F00] mb-2 group-hover:text-[#8B4513] transition-colors">
                    {item.name}
                  </h3>

                  <div className="text-xs text-[#8B4513]/60 mb-3 space-y-0.5">
                    <p>Colors: {item.colors.join(", ")}</p>
                    <p>Sizes: {item.sizes.join(", ")}</p>
                  </div>

                  <div className="h-[1px] bg-gradient-to-r from-[#D4AF37]/30 to-transparent mb-4" />

                  <div className="flex items-baseline gap-2 mb-5">
                    <span className="text-xl font-bold text-[#D4AF37]">
                      ₹{item.price.toLocaleString()}
                    </span>
                    <span className="text-xs text-[#8B4513]/40 line-through">
                      ₹{item.originalPrice.toLocaleString()}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <Button
                      className="w-full bg-[#1C0F00] hover:bg-[#D4AF37] hover:text-[#1C0F00] text-white rounded-none font-semibold tracking-wider uppercase text-xs transition-all duration-300 h-9 flex items-center gap-2"
                      onClick={() => handleWhatsAppOrder(item)}
                    >
                      WhatsApp to Order
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-[#EAD7BB] hover:border-[#D4AF37] text-[#8B4513] hover:text-[#1C0F00] rounded-none text-xs h-9 uppercase tracking-wider"
                    >
                      <ShoppingBag className="w-3 h-3 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <button
              onClick={() => (window.location.href = "/products")}
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
