import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, ShoppingBag, Heart, Search } from "lucide-react";
import { useProducts } from "@/contexts/ProductsContext";
import { useSiteSettings } from "@/contexts/SiteSettingsContext";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";

const Products = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { products } = useProducts();
  const { settings } = useSiteSettings();
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const [added, setAdded] = useState<string | null>(null);

  const handleAddToCart = (product: typeof products[0]) => {
    addToCart(product);
    setAdded(product.id);
    setTimeout(() => setAdded(null), 1500);
  };

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) setSelectedCategory(cat.toLowerCase());
  }, [searchParams]);

  // Unique categories from actual products
  const categories = ["all", ...Array.from(new Set(products.map(p => p.category).filter(Boolean)))];

  const filtered = products
    .filter((p) => {
      const matchCat = selectedCategory === "all" || p.category?.toLowerCase() === selectedCategory.toLowerCase();
      const matchSearch = !searchQuery ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.description?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
      return matchCat && matchSearch;
    })
    .sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "featured") return (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0);
      return 0;
    });

  const pageTitle = selectedCategory === "all"
    ? "Our Collection"
    : selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1) + " Collection";

  const handleWhatsApp = (p: { name: string; price: number }) => {
    const msg = `Hi! I'm interested in the ${p.name} (${settings.currencySymbol}${p.price.toLocaleString()}). Can you help me?`;
    window.open(`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#FDF5E6]">
      <Header />

      {/* Page Header */}
      <section className="py-14 bg-[#1C0F00] relative">
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-60" />
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-3 mb-3">
            <div className="h-[1px] w-10 bg-[#D4AF37]" />
            <span className="text-[#D4AF37] text-xs tracking-[0.3em] font-medium uppercase">Dubai Collection</span>
            <div className="h-[1px] w-10 bg-[#D4AF37]" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-2">{pageTitle}</h1>
          <p className="text-white/40 text-sm mt-2">{filtered.length} item{filtered.length !== 1 ? "s" : ""} found</p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-4 bg-white border-b border-[#EAD7BB] sticky top-[88px] z-30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row gap-3 items-center flex-wrap">
            {/* Search */}
            <div className="relative flex-1 min-w-[200px] max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8B4513]/40" />
              <Input
                placeholder="Search products…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 rounded-none border-[#EAD7BB] focus:border-[#D4AF37] focus:ring-0 text-sm h-9"
              />
            </div>

            {/* Category pills */}
            <div className="flex flex-wrap gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                    selectedCategory === cat
                      ? "bg-[#1C0F00] text-white"
                      : "bg-white border border-[#EAD7BB] text-[#8B4513] hover:border-[#D4AF37]"
                  }`}
                >
                  {cat === "all" ? "All" : cat}
                </button>
              ))}
            </div>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40 rounded-none border-[#EAD7BB] h-9 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured First</SelectItem>
                <SelectItem value="price-low">Price: Low → High</SelectItem>
                <SelectItem value="price-high">Price: High → Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          {filtered.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-[#8B4513]/50 text-lg font-serif">No products found.</p>
              <button onClick={() => { setSelectedCategory("all"); setSearchQuery(""); }}
                className="mt-4 text-[#D4AF37] text-sm underline">Clear filters</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {filtered.map((product) => (
                <div
                  key={product.id}
                  className="bg-white border border-[#EAD7BB] hover:border-[#D4AF37] hover:shadow-[0_8px_32px_rgba(212,175,55,0.15)] transition-all duration-300 overflow-hidden group"
                >
                  {/* Image */}
                  <div className="relative aspect-[3/4] overflow-hidden bg-[#FDF5E6]">
                    <img
                      src={product.image_url || "https://res.cloudinary.com/df4autxjg/image/upload/v1751638933/ROYAL_BLACK_ABAYA_hrx8kd.png"}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://res.cloudinary.com/df4autxjg/image/upload/v1751638933/ROYAL_BLACK_ABAYA_hrx8kd.png";
                      }}
                    />
                    {product.is_featured && (
                      <span className="absolute top-3 left-3 bg-[#D4AF37] text-white text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider">
                        Featured
                      </span>
                    )}
                    {product.stock_quantity < 10 && product.stock_quantity > 0 && (
                      <span className="absolute top-3 right-3 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 uppercase">
                        Low Stock
                      </span>
                    )}
                    {product.stock_quantity === 0 && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <span className="text-white font-semibold text-sm tracking-wider uppercase">Out of Stock</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-[#1C0F00]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="bg-white text-[#1C0F00] text-xs font-bold px-5 py-2 uppercase tracking-wider transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="p-4">
                    <p className="text-[#D4AF37] text-[10px] font-semibold tracking-widest uppercase mb-1">
                      {product.category || "Collection"}
                    </p>
                    <h3 className="font-serif text-base font-semibold text-[#1C0F00] mb-1 line-clamp-1 group-hover:text-[#8B4513] transition-colors">
                      {product.name}
                    </h3>
                    {product.description && (
                      <p className="text-xs text-[#8B4513]/50 mb-2 line-clamp-1">{product.description}</p>
                    )}

                    <div className="flex items-center gap-0.5 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 text-[#D4AF37] fill-current" />
                      ))}
                    </div>

                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-lg font-bold text-[#D4AF37]">{settings.currencySymbol}{product.price.toLocaleString()}</span>
                      {product.originalPrice > product.price && (
                        <span className="text-xs text-[#8B4513]/40 line-through">{settings.currencySymbol}{product.originalPrice.toLocaleString()}</span>
                      )}
                    </div>

                    <div className="h-[1px] bg-gradient-to-r from-[#D4AF37]/30 to-transparent mb-3" />

                    <div className="flex gap-2">
                      <Button
                        disabled={product.stock_quantity === 0}
                        className={`flex-1 rounded-none text-xs font-bold uppercase tracking-wider h-9 transition-all duration-300 disabled:opacity-40 ${
                          added === product.id
                            ? "bg-green-600 hover:bg-green-600 text-white"
                            : "bg-[#1C0F00] hover:bg-[#D4AF37] hover:text-[#1C0F00] text-white"
                        }`}
                        onClick={() => handleAddToCart(product)}
                      >
                        <ShoppingBag className="w-3.5 h-3.5 mr-1.5" />
                        {added === product.id ? "Added!" : "Add to Cart"}
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        title={isWishlisted(product.id) ? "Remove from wishlist" : "Add to wishlist"}
                        className={`rounded-none h-9 w-9 flex-shrink-0 transition-all ${
                          isWishlisted(product.id)
                            ? "bg-red-50 border-red-300 text-red-500 hover:bg-red-100"
                            : "border-[#EAD7BB] hover:border-[#D4AF37] hover:bg-[#FDF5E6] text-[#8B4513]"
                        }`}
                        onClick={() => toggleWishlist(product)}
                      >
                        <Heart className={`w-3.5 h-3.5 ${isWishlisted(product.id) ? "fill-current" : ""}`} />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <WhatsAppFloat />
      <Footer />
    </div>
  );
};

export default Products;
