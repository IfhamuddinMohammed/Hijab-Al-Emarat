import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { Button } from "@/components/ui/button";
import {
  Heart, ShoppingBag, MessageCircle, Star, Truck,
  RotateCcw, Shield, ChevronDown, ChevronUp,
  ZoomIn, X, Minus, Plus, CheckCircle2, Share2, Copy, Link
} from "lucide-react";
import { useProducts } from "@/contexts/ProductsContext";
import { useSiteSettings } from "@/contexts/SiteSettingsContext";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";

const COLOR_HEX: Record<string, string> = {
  black: "#1a1a1a", white: "#ffffff", cream: "#FDF5E6", navy: "#002147",
  "navy blue": "#002147", "midnight navy": "#0d1b40", olive: "#6B6B35",
  grey: "#808080", gray: "#808080", camel: "#C19A6B", beige: "#F5F5DC",
  gold: "#D4AF37", silver: "#C0C0C0", "rose gold": "#B76E79",
  "dusty rose": "#DCAE96", brown: "#8B4513", maroon: "#800000",
  burgundy: "#800020", "deep burgundy": "#5C0011", "midnight blue": "#191970",
  "dark brown": "#3D1C02", charcoal: "#36454F", purple: "#800080",
  pink: "#FFB6C1", red: "#DC143C", blue: "#4169E1", green: "#228B22",
  "off white": "#FAF9F6",
};

const getColorHex = (name: string) =>
  COLOR_HEX[name.toLowerCase()] ?? "#D4AF37";

const isLight = (hex: string) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return r * 0.299 + g * 0.587 + b * 0.114 > 186;
};

const Accordion = ({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-t border-[#EAD7BB]">
      <button onClick={() => setOpen(o => !o)} className="w-full flex items-center justify-between py-4 text-left">
        <span className="font-semibold text-[#1C0F00] text-sm tracking-wide">{title}</span>
        {open ? <ChevronUp className="w-4 h-4 text-[#D4AF37]" /> : <ChevronDown className="w-4 h-4 text-[#D4AF37]" />}
      </button>
      {open && <div className="pb-4 text-sm text-[#8B4513]/80 leading-relaxed">{children}</div>}
    </div>
  );
};

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getById, getRelated } = useProducts();
  const { settings } = useSiteSettings();
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  const product = getById(id!);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [qty, setQty] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#FDF5E6]">
        <Header />
        <div className="container mx-auto px-4 py-24 text-center">
          <p className="text-[#8B4513]/60 text-lg font-serif mb-6">Product not found.</p>
          <Button className="bg-[#1C0F00] hover:bg-[#D4AF37] hover:text-[#1C0F00] text-white rounded-none font-semibold tracking-wider uppercase text-sm h-11 px-8"
            onClick={() => navigate("/products")}>Back to Collection</Button>
        </div>
        <Footer />
      </div>
    );
  }

  const sym = settings.currencySymbol;
  const discount = product.originalPrice > product.price
    ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;
  const related = getRelated(product.id, product.category);

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) addToCart(product);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleWhatsApp = () => {
    const details = [
      selectedColor ? `Color: ${selectedColor}` : null,
      selectedSize ? `Size: ${selectedSize}` : null,
      `Qty: ${qty}`,
    ].filter(Boolean).join(", ");
    const msg = `Hi! I'm interested in the *${product.name}* (${sym}${product.price.toLocaleString()}). ${details ? `Details — ${details}.` : ""} Can you please confirm availability?`;
    window.open(`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true); setTimeout(() => setCopied(false), 2500);
    setShareOpen(false);
  };

  const shareWhatsApp = () => {
    const msg = `Check out this beautiful product from Hijab Al Emarat:\n\n*${product.name}*\n${settings.currencySymbol}${product.price.toLocaleString()}\n\n${window.location.href}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, "_blank");
    setShareOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#FDF5E6]">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-[#EAD7BB]">
        <div className="container mx-auto px-4 py-3 flex items-center gap-2 text-xs text-[#8B4513]/60">
          <button onClick={() => navigate("/")} className="hover:text-[#D4AF37] transition-colors">Home</button>
          <span>/</span>
          <button onClick={() => navigate("/products")} className="hover:text-[#D4AF37] transition-colors">Collection</button>
          <span>/</span>
          <button onClick={() => navigate(`/products?category=${product.category.toLowerCase()}`)} className="hover:text-[#D4AF37] transition-colors">{product.category}</button>
          <span>/</span>
          <span className="text-[#1C0F00] font-medium truncate">{product.name}</span>
        </div>
      </div>

      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14">

            {/* ── Image panel ── */}
            <div>
              <div
                className="relative bg-white border border-[#EAD7BB] overflow-hidden cursor-zoom-in group"
                onClick={() => setLightboxOpen(true)}
              >
                <div className="aspect-[3/4]">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    onError={e => { (e.target as HTMLImageElement).src = "https://res.cloudinary.com/df4autxjg/image/upload/v1751638933/ROYAL_BLACK_ABAYA_hrx8kd.png"; }}
                  />
                </div>
                {/* Zoom hint */}
                <div className="absolute bottom-3 right-3 bg-white/90 border border-[#EAD7BB] px-2.5 py-1.5 flex items-center gap-1.5 text-[10px] text-[#8B4513] font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  <ZoomIn className="w-3.5 h-3.5" /> Click to zoom
                </div>
                {discount > 0 && (
                  <div className="absolute top-4 left-4 bg-[#D4AF37] text-white text-[10px] font-bold px-3 py-1 uppercase tracking-wider">
                    {discount}% OFF
                  </div>
                )}
                {product.stock_quantity === 0 && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-white font-bold text-lg tracking-widest uppercase">Out of Stock</span>
                  </div>
                )}
              </div>
              <p className="text-center text-[10px] text-[#8B4513]/40 mt-2">Click image to view full size</p>
            </div>

            {/* ── Product info panel ── */}
            <div className="flex flex-col">
              {/* Category + Share */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] text-[#D4AF37] font-bold uppercase tracking-widest">{product.category}</span>
                <div className="relative">
                  <button
                    onClick={() => setShareOpen(o => !o)}
                    className={`flex items-center gap-1.5 text-[10px] font-semibold transition-colors ${shareOpen ? "text-[#D4AF37]" : "text-[#8B4513]/50 hover:text-[#D4AF37]"}`}
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    {copied ? "Copied!" : "Share"}
                  </button>
                  {shareOpen && (
                    <>
                      {/* backdrop */}
                      <div className="fixed inset-0 z-10" onClick={() => setShareOpen(false)} />
                      <div className="absolute right-0 top-6 z-20 bg-white border border-[#EAD7BB] shadow-lg w-44 py-1">
                        <p className="text-[9px] font-bold uppercase tracking-wider text-gray-400 px-3 pt-2 pb-1">Share this product</p>
                        <button
                          onClick={copyLink}
                          className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-[#1C0F00] hover:bg-[#FDF5E6] transition-colors"
                        >
                          <Copy className="w-3.5 h-3.5 text-[#D4AF37]" /> Copy Link
                        </button>
                        <button
                          onClick={shareWhatsApp}
                          className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-[#1C0F00] hover:bg-[#FDF5E6] transition-colors"
                        >
                          <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" /> Share on WhatsApp
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#1C0F00] mb-3 leading-tight">{product.name}</h1>

              {/* Stars */}
              <div className="flex items-center gap-1.5 mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-[#D4AF37] fill-current" />)}
                <span className="text-xs text-[#8B4513]/60 ml-1">5.0 · Premium Quality</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-1">
                <span className="text-3xl font-bold text-[#D4AF37]">{sym}{product.price.toLocaleString()}</span>
                {product.originalPrice > product.price && (
                  <span className="text-lg text-[#8B4513]/40 line-through">{sym}{product.originalPrice.toLocaleString()}</span>
                )}
                {discount > 0 && (
                  <span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-0.5">Save {sym}{(product.originalPrice - product.price).toLocaleString()}</span>
                )}
              </div>

              {product.material && (
                <p className="text-xs text-[#8B4513]/60 mb-4">Material: <span className="font-semibold text-[#1C0F00]">{product.material}</span></p>
              )}

              <div className="h-[1px] bg-gradient-to-r from-[#D4AF37]/40 to-transparent my-4" />

              {/* Color selector */}
              {product.colors && product.colors.length > 0 && (
                <div className="mb-5">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-2.5">
                    Color{selectedColor ? <span className="ml-2 text-[#1C0F00] normal-case font-semibold">{selectedColor}</span> : <span className="ml-2 text-gray-400 normal-case font-normal">— select one</span>}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map(color => {
                      const hex = getColorHex(color);
                      const light = isLight(hex);
                      const selected = selectedColor === color;
                      return (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          title={color}
                          className={`group relative flex flex-col items-center gap-1`}
                        >
                          <div className={`w-8 h-8 rounded-full border-2 transition-all ${selected ? "border-[#D4AF37] scale-110 shadow-md" : "border-gray-200 hover:border-[#D4AF37]/50"}`}
                            style={{ backgroundColor: hex, boxShadow: selected ? `0 0 0 2px white, 0 0 0 4px ${hex}` : undefined }}>
                            {selected && (
                              <div className="w-full h-full rounded-full flex items-center justify-center">
                                <div className={`w-2 h-2 rounded-full ${light ? "bg-gray-700" : "bg-white"}`} />
                              </div>
                            )}
                          </div>
                          <span className="text-[9px] text-[#8B4513]/60 max-w-[36px] text-center leading-tight">{color.split(" ")[0]}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Size selector */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-5">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-2.5">
                    Size{selectedSize ? <span className="ml-2 text-[#1C0F00] normal-case font-semibold">{selectedSize}</span> : <span className="ml-2 text-gray-400 normal-case font-normal">— select one</span>}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map(size => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-1.5 text-xs font-bold border transition-all ${
                          selectedSize === size
                            ? "bg-[#1C0F00] border-[#1C0F00] text-white"
                            : "bg-white border-[#EAD7BB] text-[#8B4513] hover:border-[#D4AF37]"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="mb-5">
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-2.5">Quantity</p>
                <div className="flex items-center border border-[#EAD7BB] w-fit">
                  <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-10 h-10 flex items-center justify-center text-[#8B4513] hover:bg-[#FDF5E6] transition-colors">
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-12 text-center font-bold text-[#1C0F00]">{qty}</span>
                  <button onClick={() => setQty(q => Math.min(product.stock_quantity || 99, q + 1))} className="w-10 h-10 flex items-center justify-center text-[#8B4513] hover:bg-[#FDF5E6] transition-colors">
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
                {product.stock_quantity > 0 && product.stock_quantity < 10 && (
                  <p className="text-xs text-red-500 mt-1">Only {product.stock_quantity} left!</p>
                )}
              </div>

              {/* CTAs */}
              <div className="flex flex-col gap-3 mb-5">
                <Button
                  disabled={product.stock_quantity === 0}
                  onClick={handleAddToCart}
                  className={`w-full h-12 rounded-none font-bold tracking-wider uppercase text-sm transition-all duration-300 ${
                    addedToCart
                      ? "bg-green-600 hover:bg-green-600 text-white"
                      : "bg-[#1C0F00] hover:bg-[#D4AF37] hover:text-[#1C0F00] text-white"
                  } disabled:opacity-40`}
                >
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  {product.stock_quantity === 0 ? "Out of Stock" : addedToCart ? "Added to Cart!" : `Add to Cart — ${sym}${(product.price * qty).toLocaleString()}`}
                </Button>

                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    onClick={() => toggleWishlist(product)}
                    className={`h-11 rounded-none font-semibold text-xs uppercase tracking-wider transition-all ${
                      isWishlisted(product.id)
                        ? "bg-red-50 border-red-300 text-red-500 hover:bg-red-100"
                        : "border-[#EAD7BB] text-[#8B4513] hover:border-[#D4AF37]"
                    }`}
                  >
                    <Heart className={`w-4 h-4 mr-1.5 ${isWishlisted(product.id) ? "fill-current" : ""}`} />
                    {isWishlisted(product.id) ? "Wishlisted" : "Wishlist"}
                  </Button>
                  <Button
                    onClick={handleWhatsApp}
                    className="h-11 bg-[#25D366] hover:bg-[#1da855] text-white rounded-none font-semibold text-xs uppercase tracking-wider"
                  >
                    <MessageCircle className="w-4 h-4 mr-1.5" /> WhatsApp
                  </Button>
                </div>
              </div>

              {/* Trust signals */}
              <div className="grid grid-cols-3 gap-2 border-t border-[#EAD7BB] pt-4">
                {[
                  { icon: Truck, text: "Free Shipping", sub: "on orders ₹5000+" },
                  { icon: RotateCcw, text: "Easy Returns", sub: "within 7 days" },
                  { icon: Shield, text: "Secure Pay", sub: "UPI / COD" },
                ].map(({ icon: Icon, text, sub }) => (
                  <div key={text} className="flex flex-col items-center text-center gap-1">
                    <Icon className="w-4 h-4 text-[#D4AF37]" />
                    <p className="text-[10px] font-bold text-[#1C0F00] uppercase tracking-wide">{text}</p>
                    <p className="text-[9px] text-[#8B4513]/50">{sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Accordions ── */}
          <div className="max-w-2xl mt-12 mx-auto md:mx-0">
            <Accordion title="Description" defaultOpen>
              <p>{product.description}</p>
            </Accordion>

            {product.care_instructions && (
              <Accordion title="Care Instructions">
                <div className="space-y-2">
                  {product.care_instructions.split(". ").filter(Boolean).map((line, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                      <span>{line.endsWith(".") ? line : `${line}.`}</span>
                    </div>
                  ))}
                </div>
              </Accordion>
            )}

            <Accordion title="Shipping & Returns">
              <div className="space-y-2">
                {[
                  "Delivered in 5–8 business days across India.",
                  `Free shipping on orders above ${sym}5,000.`,
                  "₹299 flat shipping on orders below ₹5,000.",
                  "Cash on Delivery available at checkout.",
                  "Easy returns within 7 days of delivery on unworn, original-packaged items.",
                  "WhatsApp our team to initiate any return or exchange.",
                ].map((line, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                    <span>{line}</span>
                  </div>
                ))}
              </div>
            </Accordion>
          </div>

          {/* ── Related products ── */}
          {related.length > 0 && (
            <div className="mt-16">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-[1px] w-8 bg-[#D4AF37]" />
                <span className="text-[10px] text-[#D4AF37] font-bold uppercase tracking-widest">You May Also Like</span>
                <div className="h-[1px] flex-1 bg-[#D4AF37]/20" />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {related.map(r => {
                  const d = r.originalPrice > r.price ? Math.round((1 - r.price / r.originalPrice) * 100) : 0;
                  return (
                    <div
                      key={r.id}
                      onClick={() => navigate(`/products/${r.id}`)}
                      className="bg-white border border-[#EAD7BB] hover:border-[#D4AF37] hover:shadow-[0_4px_20px_rgba(212,175,55,0.15)] transition-all duration-300 cursor-pointer group"
                    >
                      <div className="relative aspect-[3/4] overflow-hidden bg-[#FDF5E6]">
                        <img src={r.image_url} alt={r.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={e => { (e.target as HTMLImageElement).src = "https://res.cloudinary.com/df4autxjg/image/upload/v1751638933/ROYAL_BLACK_ABAYA_hrx8kd.png"; }} />
                        {d > 0 && <span className="absolute top-2 left-2 bg-[#D4AF37] text-white text-[9px] font-bold px-2 py-0.5">{d}% OFF</span>}
                      </div>
                      <div className="p-3">
                        <p className="text-[9px] text-[#D4AF37] font-bold uppercase tracking-widest mb-0.5">{r.category}</p>
                        <p className="font-serif text-sm font-semibold text-[#1C0F00] line-clamp-1">{r.name}</p>
                        <p className="font-bold text-[#D4AF37] text-sm mt-1">{sym}{r.price.toLocaleString()}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── Lightbox ── */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            className="absolute top-4 right-4 text-white/70 hover:text-white bg-white/10 rounded-full p-2 transition-colors"
            onClick={() => setLightboxOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={product.image_url}
            alt={product.name}
            className="max-h-[90vh] max-w-[90vw] object-contain"
            onClick={e => e.stopPropagation()}
            onError={e => { (e.target as HTMLImageElement).src = "https://res.cloudinary.com/df4autxjg/image/upload/v1751638933/ROYAL_BLACK_ABAYA_hrx8kd.png"; }}
          />
          <p className="absolute bottom-4 left-0 right-0 text-center text-white/50 text-xs">{product.name} — Click anywhere to close</p>
        </div>
      )}

      {/* ── Mobile sticky bar ── */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#EAD7BB] p-3 md:hidden z-40 flex gap-3">
        <button
          onClick={() => toggleWishlist(product)}
          className={`w-12 h-12 border flex items-center justify-center flex-shrink-0 transition-all ${
            isWishlisted(product.id) ? "bg-red-50 border-red-300 text-red-500" : "border-[#EAD7BB] text-[#8B4513]"
          }`}
        >
          <Heart className={`w-5 h-5 ${isWishlisted(product.id) ? "fill-current" : ""}`} />
        </button>
        <Button
          disabled={product.stock_quantity === 0}
          onClick={handleAddToCart}
          className={`flex-1 h-12 rounded-none font-bold tracking-wider uppercase text-sm transition-all ${
            addedToCart ? "bg-green-600 text-white" : "bg-[#1C0F00] hover:bg-[#D4AF37] hover:text-[#1C0F00] text-white"
          } disabled:opacity-40`}
        >
          <ShoppingBag className="w-4 h-4 mr-2" />
          {product.stock_quantity === 0 ? "Out of Stock" : addedToCart ? "Added!" : "Add to Cart"}
        </Button>
      </div>

      <div className="h-20 md:h-0" /> {/* spacer for mobile bar */}
      <WhatsAppFloat />
      <Footer />
    </div>
  );
};

export default ProductDetail;
