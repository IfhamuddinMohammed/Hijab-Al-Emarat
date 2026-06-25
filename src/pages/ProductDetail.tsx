import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { Button } from "@/components/ui/button";
import {
  Heart, ShoppingBag, MessageCircle, Star, Truck, RotateCcw, Shield,
  ChevronDown, ChevronUp, ChevronLeft, ChevronRight,
  ZoomIn, ZoomOut, X, Minus, Plus, CheckCircle2, Share2, Copy,
} from "lucide-react";
import { useProducts } from "@/contexts/ProductsContext";
import { useSiteSettings } from "@/contexts/SiteSettingsContext";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";

const FALLBACK =
  "https://res.cloudinary.com/df4autxjg/image/upload/v1751638933/ROYAL_BLACK_ABAYA_hrx8kd.png";

const COLOR_HEX: Record<string, string> = {
  black: "#1a1a1a", white: "#ffffff", cream: "#FDF5E6",
  navy: "#002147", "navy blue": "#002147", "midnight navy": "#0d1b40",
  olive: "#6B6B35", grey: "#808080", gray: "#808080",
  camel: "#C19A6B", beige: "#F5F5DC", gold: "#D4AF37",
  silver: "#C0C0C0", "rose gold": "#B76E79", "dusty rose": "#DCAE96",
  brown: "#8B4513", maroon: "#800000", burgundy: "#800020",
  "deep burgundy": "#5C0011", "midnight blue": "#191970",
  "dark brown": "#3D1C02", charcoal: "#36454F", purple: "#800080",
  pink: "#FFB6C1", red: "#DC143C", blue: "#4169E1", green: "#228B22",
  "off white": "#FAF9F6", ivory: "#FFFFF0", "warm ivory": "#FEFCE8",
  "pearl white": "#F8F6F0", "champagne gold": "#F7E7CE",
  "obsidian black": "#0B0B0B", "jet black": "#0a0a0a", "ebony black": "#1a1a1a",
  taupe: "#B8A99A", "warm taupe": "#C4A882", "stone grey": "#928B80",
  "caramel beige": "#C8A87A", "sage olive": "#8B9A6E", sage: "#8B9A6E",
  terracotta: "#C16A4A", plum: "#7A354A", "dusty mauve": "#A08088",
  emerald: "#007760", "french navy": "#002776", "deep bordeaux": "#6B1226",
  "royal ink blue": "#1a2856", "deep forest green": "#1B4332",
};
const getHex = (name: string) => COLOR_HEX[name.toLowerCase()] ?? "#D4AF37";
const isLight = (hex: string) => {
  const r = parseInt(hex.slice(1, 3), 16),
    g = parseInt(hex.slice(3, 5), 16),
    b = parseInt(hex.slice(5, 7), 16);
  return r * 0.299 + g * 0.587 + b * 0.114 > 186;
};

const Accordion = ({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-t border-[#EAD7BB]">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between py-4 text-left"
      >
        <span className="font-semibold text-[#1C0F00] text-sm tracking-wide">{title}</span>
        {open ? (
          <ChevronUp className="w-4 h-4 text-[#D4AF37]" />
        ) : (
          <ChevronDown className="w-4 h-4 text-[#D4AF37]" />
        )}
      </button>
      {open && (
        <div className="pb-4 text-sm text-[#8B4513]/80 leading-relaxed">{children}</div>
      )}
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

  // product selection
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [qty, setQty] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // gallery
  const [currentImg, setCurrentImg] = useState(0);
  const [hoverZoom, setHoverZoom] = useState(false);
  const [zoomOrigin, setZoomOrigin] = useState({ x: 50, y: 50 });

  // lightbox
  const [lbOpen, setLbOpen] = useState(false);
  const [lbZoom, setLbZoom] = useState(1);
  const [lbRot, setLbRot] = useState(0);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<{ sx: number; sy: number; ox: number; oy: number } | null>(null);
  const touchRef = useRef({ x: 0, y: 0 });

  if (!product) {
    return (
      <div className="min-h-screen bg-[#FDF5E6]">
        <Header />
        <div className="container mx-auto px-4 py-24 text-center">
          <p className="text-[#8B4513]/60 text-lg font-serif mb-6">Product not found.</p>
          <Button
            className="bg-[#1C0F00] hover:bg-[#D4AF37] hover:text-[#1C0F00] text-white rounded-none font-semibold tracking-wider uppercase text-sm h-11 px-8"
            onClick={() => navigate("/products")}
          >
            Back to Collection
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const sym = settings.currencySymbol;
  const discount =
    product.originalPrice > product.price
      ? Math.round((1 - product.price / product.originalPrice) * 100)
      : 0;
  const related = getRelated(product.id, product.category);
  const images =
    product.images && product.images.length > 0
      ? product.images
      : [product.image_url];

  // ── helpers ────────────────────────────────────────────────────────────────
  const prevImg = () => setCurrentImg((i) => (i - 1 + images.length) % images.length);
  const nextImg = () => setCurrentImg((i) => (i + 1) % images.length);

  const openLb = (idx: number) => {
    setCurrentImg(idx);
    setLbOpen(true);
    setLbZoom(1);
    setLbRot(0);
    setPan({ x: 0, y: 0 });
    document.body.style.overflow = "hidden";
  };

  const closeLb = () => {
    setLbOpen(false);
    setLbZoom(1);
    setLbRot(0);
    setPan({ x: 0, y: 0 });
    dragRef.current = null;
    setIsDragging(false);
    document.body.style.overflow = "";
  };

  const handleHoverMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setZoomOrigin({
      x: ((e.clientX - r.left) / r.width) * 100,
      y: ((e.clientY - r.top) / r.height) * 100,
    });
  };

  // drag-to-pan in lightbox
  const lbMouseDown = (e: React.MouseEvent) => {
    if (lbZoom > 1) {
      e.preventDefault();
      dragRef.current = { sx: e.clientX, sy: e.clientY, ox: pan.x, oy: pan.y };
      setIsDragging(true);
    }
  };
  const lbMouseMove = (e: React.MouseEvent) => {
    if (!dragRef.current) return;
    setPan({
      x: dragRef.current.ox + (e.clientX - dragRef.current.sx),
      y: dragRef.current.oy + (e.clientY - dragRef.current.sy),
    });
  };
  const lbMouseUp = () => {
    dragRef.current = null;
    setIsDragging(false);
  };

  // touch swipe (mobile)
  const lbTouchStart = (e: React.TouchEvent) => {
    touchRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };
  const lbTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchRef.current.x;
    const dy = e.changedTouches[0].clientY - touchRef.current.y;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
      if (dx > 0) prevImg();
      else nextImg();
      setPan({ x: 0, y: 0 });
      setLbZoom(1);
    }
  };

  // keyboard
  useEffect(() => {
    if (!lbOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLb();
      else if (e.key === "ArrowLeft") { setCurrentImg((i) => (i - 1 + images.length) % images.length); setPan({ x: 0, y: 0 }); setLbZoom(1); }
      else if (e.key === "ArrowRight") { setCurrentImg((i) => (i + 1) % images.length); setPan({ x: 0, y: 0 }); setLbZoom(1); }
      else if (e.key === "+" || e.key === "=") { setLbZoom((z) => Math.min(5, z + 0.5)); setPan({ x: 0, y: 0 }); }
      else if (e.key === "-") { setLbZoom((z) => Math.max(0.5, z - 0.5)); setPan({ x: 0, y: 0 }); }
      else if (e.key === "r" || e.key === "R") { setLbRot((r) => (r + 90) % 360); setPan({ x: 0, y: 0 }); }
    };
    window.addEventListener("keydown", handler);
    return () => { window.removeEventListener("keydown", handler); document.body.style.overflow = ""; };
  }, [lbOpen, images.length]);

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) addToCart(product);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleWhatsApp = () => {
    const parts = [
      selectedColor ? `Color: ${selectedColor}` : null,
      selectedSize ? `Size: ${selectedSize}` : null,
      `Qty: ${qty}`,
    ].filter(Boolean).join(", ");
    const msg = `Hi! I'm interested in *${product.name}* (${sym}${product.price.toLocaleString()}).${parts ? ` ${parts}.` : ""} Can you confirm availability?`;
    window.open(`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
    setShareOpen(false);
  };

  const shareWA = () => {
    const msg = `Check out *${product.name}* on Hijab Al Emarat!\n${sym}${product.price.toLocaleString()}\n\n${window.location.href}`;
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

            {/* ── IMAGE PANEL ─────────────────────────────────────────── */}
            <div className="space-y-3">
              <div className="flex gap-2 md:gap-3">

                {/* Vertical thumbnails — desktop */}
                {images.length > 1 && (
                  <div className="hidden md:flex flex-col gap-2 w-[68px] flex-shrink-0">
                    {images.map((img, i) => (
                      <button
                        key={i}
                        onMouseEnter={() => setCurrentImg(i)}
                        onClick={() => setCurrentImg(i)}
                        className={`aspect-[3/4] border-2 overflow-hidden transition-all duration-200 ${
                          i === currentImg
                            ? "border-[#D4AF37] shadow-[0_0_0_1px_#D4AF37]"
                            : "border-[#EAD7BB] opacity-50 hover:opacity-80 hover:border-[#D4AF37]/50"
                        }`}
                      >
                        <img
                          src={img}
                          alt={`View ${i + 1}`}
                          className="w-full h-full object-cover"
                          onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK; }}
                        />
                      </button>
                    ))}
                  </div>
                )}

                {/* Main image */}
                <div className="flex-1">
                  <div
                    className="relative bg-white border border-[#EAD7BB] overflow-hidden group cursor-zoom-in"
                    onMouseEnter={() => setHoverZoom(true)}
                    onMouseLeave={() => setHoverZoom(false)}
                    onMouseMove={handleHoverMove}
                    onClick={() => openLb(currentImg)}
                  >
                    <div className="aspect-[3/4]">
                      <img
                        src={images[currentImg]}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        style={{
                          transform: hoverZoom ? "scale(2.3)" : "scale(1)",
                          transformOrigin: `${zoomOrigin.x}% ${zoomOrigin.y}%`,
                          transition: hoverZoom ? "none" : "transform 0.4s ease",
                        }}
                        onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK; }}
                      />
                    </div>

                    {/* Zoom hint */}
                    <div className="absolute bottom-3 right-3 bg-white/95 border border-[#EAD7BB] px-2.5 py-1.5 flex items-center gap-1.5 text-[10px] text-[#8B4513] font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                      <ZoomIn className="w-3.5 h-3.5" /> Click to enlarge
                    </div>

                    {/* Image counter */}
                    {images.length > 1 && (
                      <div className="absolute top-3 right-3 bg-black/45 backdrop-blur-sm text-white text-[10px] px-2 py-0.5 font-medium pointer-events-none">
                        {currentImg + 1} / {images.length}
                      </div>
                    )}

                    {/* Discount badge */}
                    {discount > 0 && (
                      <div className="absolute top-4 left-4 bg-[#D4AF37] text-white text-[10px] font-bold px-3 py-1 uppercase tracking-wider shadow-sm pointer-events-none">
                        {discount}% OFF
                      </div>
                    )}

                    {/* Out of stock overlay */}
                    {product.stock_quantity === 0 && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center pointer-events-none">
                        <span className="text-white font-bold text-lg tracking-widest uppercase">Out of Stock</span>
                      </div>
                    )}

                    {/* Prev / Next on hover */}
                    {images.length > 1 && (
                      <>
                        <button
                          onClick={(e) => { e.stopPropagation(); prevImg(); }}
                          className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/85 hover:bg-white text-[#1C0F00] flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); nextImg(); }}
                          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/85 hover:bg-white text-[#1C0F00] flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Mobile horizontal thumbnails */}
              {images.length > 1 && (
                <div className="md:hidden flex gap-2 overflow-x-auto pb-1">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentImg(i)}
                      className={`flex-shrink-0 w-[60px] h-[75px] border-2 overflow-hidden transition-all ${
                        i === currentImg ? "border-[#D4AF37]" : "border-[#EAD7BB] opacity-55"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`View ${i + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK; }}
                      />
                    </button>
                  ))}
                </div>
              )}

              <p className="text-center text-[10px] text-[#8B4513]/35">
                {images.length > 1 ? `${images.length} photos · ` : ""}Hover to zoom · Click for fullscreen gallery
              </p>
            </div>

            {/* ── PRODUCT INFO ────────────────────────────────────────── */}
            <div className="flex flex-col">
              {/* Category + Share */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] text-[#D4AF37] font-bold uppercase tracking-widest">{product.category}</span>
                <div className="relative">
                  <button
                    onClick={() => setShareOpen((o) => !o)}
                    className={`flex items-center gap-1.5 text-[10px] font-semibold transition-colors ${shareOpen ? "text-[#D4AF37]" : "text-[#8B4513]/50 hover:text-[#D4AF37]"}`}
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    {copied ? "Copied!" : "Share"}
                  </button>
                  {shareOpen && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setShareOpen(false)} />
                      <div className="absolute right-0 top-6 z-20 bg-white border border-[#EAD7BB] shadow-lg w-44 py-1">
                        <p className="text-[9px] font-bold uppercase tracking-wider text-gray-400 px-3 pt-2 pb-1">Share this product</p>
                        <button onClick={copyLink} className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-[#1C0F00] hover:bg-[#FDF5E6]">
                          <Copy className="w-3.5 h-3.5 text-[#D4AF37]" /> Copy Link
                        </button>
                        <button onClick={shareWA} className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-[#1C0F00] hover:bg-[#FDF5E6]">
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
                    Color
                    {selectedColor
                      ? <span className="ml-2 text-[#1C0F00] normal-case font-semibold">{selectedColor}</span>
                      : <span className="ml-2 text-gray-400 normal-case font-normal">— select one</span>}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => {
                      const hex = getHex(color);
                      const light = isLight(hex);
                      const sel = selectedColor === color;
                      return (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          title={color}
                          className="flex flex-col items-center gap-1"
                        >
                          <div
                            className={`w-8 h-8 rounded-full border-2 transition-all ${sel ? "border-[#D4AF37] scale-110 shadow-md" : "border-gray-200 hover:border-[#D4AF37]/50"}`}
                            style={{ backgroundColor: hex, boxShadow: sel ? `0 0 0 2px white, 0 0 0 4px ${hex}` : undefined }}
                          >
                            {sel && (
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
                    Size
                    {selectedSize
                      ? <span className="ml-2 text-[#1C0F00] normal-case font-semibold">{selectedSize}</span>
                      : <span className="ml-2 text-gray-400 normal-case font-normal">— select one</span>}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
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
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="w-10 h-10 flex items-center justify-center text-[#8B4513] hover:bg-[#FDF5E6] transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-12 text-center font-bold text-[#1C0F00]">{qty}</span>
                  <button
                    onClick={() => setQty((q) => Math.min(product.stock_quantity || 99, q + 1))}
                    className="w-10 h-10 flex items-center justify-center text-[#8B4513] hover:bg-[#FDF5E6] transition-colors"
                  >
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
                  {product.stock_quantity === 0
                    ? "Out of Stock"
                    : addedToCart
                    ? "Added to Cart!"
                    : `Add to Cart — ${sym}${(product.price * qty).toLocaleString()}`}
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
                  { icon: Truck, text: "Free Shipping", sub: "on orders ₹2999+" },
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
                  {product.care_instructions
                    .split(". ")
                    .filter(Boolean)
                    .map((line, i) => (
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
                  `Free shipping on orders above ${sym}2,999.`,
                  `Flat ₹99 shipping on orders below ${sym}2,999.`,
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
                {related.map((r) => {
                  const d = r.originalPrice > r.price ? Math.round((1 - r.price / r.originalPrice) * 100) : 0;
                  return (
                    <div
                      key={r.id}
                      onClick={() => navigate(`/products/${r.id}`)}
                      className="bg-white border border-[#EAD7BB] hover:border-[#D4AF37] hover:shadow-[0_4px_20px_rgba(212,175,55,0.15)] transition-all duration-300 cursor-pointer group"
                    >
                      <div className="relative aspect-[3/4] overflow-hidden bg-[#FDF5E6]">
                        <img
                          src={r.image_url}
                          alt={r.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK; }}
                        />
                        {d > 0 && (
                          <span className="absolute top-2 left-2 bg-[#D4AF37] text-white text-[9px] font-bold px-2 py-0.5">
                            {d}% OFF
                          </span>
                        )}
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

      {/* ══ FULLSCREEN LIGHTBOX ══════════════════════════════════════════════ */}
      {lbOpen && (
        <div
          className="fixed inset-0 z-[200] bg-[#0a0a0a] flex flex-col"
          onTouchStart={lbTouchStart}
          onTouchEnd={lbTouchEnd}
        >
          {/* Top controls */}
          <div className="flex items-center justify-between px-4 h-14 bg-black/70 border-b border-white/10 flex-shrink-0">
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-white font-serif text-sm truncate max-w-[200px] hidden sm:block">{product.name}</span>
              {images.length > 1 && (
                <span className="text-white/40 text-xs flex-shrink-0">{currentImg + 1} / {images.length}</span>
              )}
            </div>

            <div className="flex items-center gap-0.5">
              {/* Zoom out */}
              <button
                onClick={() => { setLbZoom((z) => Math.max(0.5, +(z - 0.5).toFixed(1))); setPan({ x: 0, y: 0 }); }}
                className="w-9 h-9 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 rounded-md transition-colors"
                title="Zoom out (−)"
              >
                <ZoomOut className="w-4 h-4" />
              </button>

              {/* Zoom level (click to reset) */}
              <button
                onClick={() => { setLbZoom(1); setPan({ x: 0, y: 0 }); }}
                className="w-12 h-9 text-white/50 hover:text-white text-xs font-mono text-center transition-colors"
                title="Reset zoom"
              >
                {Math.round(lbZoom * 100)}%
              </button>

              {/* Zoom in */}
              <button
                onClick={() => { setLbZoom((z) => Math.min(5, +(z + 0.5).toFixed(1))); setPan({ x: 0, y: 0 }); }}
                className="w-9 h-9 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 rounded-md transition-colors"
                title="Zoom in (+)"
              >
                <ZoomIn className="w-4 h-4" />
              </button>

              <div className="w-px h-5 bg-white/20 mx-1" />

              {/* Rotate */}
              <button
                onClick={() => { setLbRot((r) => (r + 90) % 360); setPan({ x: 0, y: 0 }); }}
                className="w-9 h-9 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 rounded-md transition-colors"
                title="Rotate 90° (R)"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <div className="w-px h-5 bg-white/20 mx-1" />

              {/* Close */}
              <button
                onClick={closeLb}
                className="w-9 h-9 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 rounded-md transition-colors"
                title="Close (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Main image area */}
          <div
            className="flex-1 flex items-center justify-center overflow-hidden relative select-none"
            style={{ cursor: lbZoom > 1 ? (isDragging ? "grabbing" : "grab") : "default" }}
            onMouseDown={lbMouseDown}
            onMouseMove={lbMouseMove}
            onMouseUp={lbMouseUp}
            onMouseLeave={lbMouseUp}
          >
            <img
              src={images[currentImg]}
              alt={product.name}
              draggable={false}
              className="max-h-full max-w-full object-contain pointer-events-none"
              style={{
                transform: `translate(${pan.x}px, ${pan.y}px) scale(${lbZoom}) rotate(${lbRot}deg)`,
                transition: isDragging ? "none" : "transform 0.2s ease",
                willChange: "transform",
              }}
              onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK; }}
            />

            {/* Prev */}
            {images.length > 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); prevImg(); setPan({ x: 0, y: 0 }); setLbZoom(1); setLbRot(0); }}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-all backdrop-blur-sm border border-white/10"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}

            {/* Next */}
            {images.length > 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); nextImg(); setPan({ x: 0, y: 0 }); setLbZoom(1); setLbRot(0); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-all backdrop-blur-sm border border-white/10"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Bottom: thumbnail strip + keyboard hints */}
          <div className="bg-black/70 border-t border-white/10 flex-shrink-0">
            {images.length > 1 && (
              <div className="flex justify-center gap-2 pt-3 pb-2 overflow-x-auto px-4">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => { setCurrentImg(i); setPan({ x: 0, y: 0 }); setLbZoom(1); setLbRot(0); }}
                    className={`flex-shrink-0 w-12 h-14 border-2 overflow-hidden transition-all ${
                      i === currentImg
                        ? "border-[#D4AF37] opacity-100"
                        : "border-white/20 opacity-35 hover:opacity-70"
                    }`}
                  >
                    <img
                      src={img}
                      alt=""
                      className="w-full h-full object-cover"
                      onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK; }}
                    />
                  </button>
                ))}
              </div>
            )}
            <div className="hidden md:flex justify-center gap-5 text-white/20 text-[10px] pb-2.5 pt-1">
              {images.length > 1 && <span>← → Navigate</span>}
              <span>+ − Zoom</span>
              <span>R Rotate</span>
              <span>Esc Close</span>
            </div>
          </div>
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

      <div className="h-20 md:h-0" />
      <WhatsAppFloat />
      <Footer />
    </div>
  );
};

export default ProductDetail;
