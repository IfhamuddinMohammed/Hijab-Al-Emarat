import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, MapPin, Navigation, MessageCircle } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useSiteSettings } from "@/contexts/SiteSettingsContext";
import { useNavigate } from "react-router-dom";

interface AddressData {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  landmark: string;
  location: { lat: number; lng: number } | null;
}

const EMPTY_ADDRESS: AddressData = {
  fullName: "", phone: "", address: "", city: "",
  state: "", pincode: "", landmark: "", location: null,
};

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();
  const { settings } = useSiteSettings();
  const navigate = useNavigate();

  const [step, setStep] = useState<"cart" | "address">("cart");
  const [addr, setAddr] = useState<AddressData>(EMPTY_ADDRESS);
  const [addrError, setAddrError] = useState("");
  const [locLoading, setLocLoading] = useState(false);

  const sym = settings.currencySymbol;
  const shipping = cartTotal > 5000 ? 0 : 299;
  const total = cartTotal + shipping;

  const setField = (key: keyof AddressData, val: string) =>
    setAddr(prev => ({ ...prev, [key]: val }));

  const getLocation = () => {
    setLocLoading(true);
    navigator.geolocation?.getCurrentPosition(
      pos => {
        setAddr(prev => ({ ...prev, location: { lat: pos.coords.latitude, lng: pos.coords.longitude } }));
        setLocLoading(false);
      },
      () => { setLocLoading(false); }
    );
  };

  const handleProceed = () => {
    if (!addr.fullName || !addr.phone || !addr.address || !addr.city || !addr.state || !addr.pincode) {
      setAddrError("Please fill in all required fields.");
      return;
    }
    setAddrError("");

    const lines = cartItems
      .map(i => `🛍 ${i.product.name} × ${i.quantity} — ${sym}${(i.product.price * i.quantity).toLocaleString()}`)
      .join("\n");

    const locationLine = addr.location
      ? `\n📍 Location: https://maps.google.com/?q=${addr.location.lat},${addr.location.lng}`
      : "";

    const message =
      `Hi! I'd like to place an order:\n\n${lines}\n\n` +
      `Subtotal: ${sym}${cartTotal.toLocaleString()}\n` +
      `Shipping: ${shipping === 0 ? "Free" : `${sym}${shipping}`}\n` +
      `Total: ${sym}${total.toLocaleString()}\n\n` +
      `📦 Delivery Address:\n` +
      `${addr.fullName}\n` +
      `${addr.phone}\n` +
      `${addr.address}${addr.landmark ? `, near ${addr.landmark}` : ""}\n` +
      `${addr.city}, ${addr.state} — ${addr.pincode}` +
      locationLine +
      `\n\nPlease confirm availability and provide payment details.`;

    window.open(`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank");
    clearCart();
    navigate("/");
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#FDF5E6]">
        <Header />
        <div className="container mx-auto px-4 py-24 text-center">
          <ShoppingBag className="w-16 h-16 text-[#D4AF37]/40 mx-auto mb-6" />
          <h1 className="text-3xl font-serif font-bold text-[#1C0F00] mb-3">Your Cart is Empty</h1>
          <p className="text-[#8B4513]/60 mb-8">Add some beautiful pieces to your cart to get started.</p>
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

      {/* Page header */}
      <section className="bg-[#1C0F00] py-10 relative">
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-60" />
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-3 mb-2">
            <div className="h-[1px] w-8 bg-[#D4AF37]" />
            <span className="text-[#D4AF37] text-xs tracking-[0.3em] font-medium uppercase">
              {step === "cart" ? "Review Order" : "Delivery Details"}
            </span>
            <div className="h-[1px] w-8 bg-[#D4AF37]" />
          </div>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-white">
            {step === "cart" ? "Your Cart" : "Delivery Address"}
          </h1>

          {/* Step indicator */}
          <div className="flex items-center justify-center gap-3 mt-4">
            {(["cart", "address"] as const).map((s, i) => (
              <div key={s} className="flex items-center gap-3">
                {i > 0 && <div className="h-[1px] w-8 bg-[#D4AF37]/30" />}
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border transition-all ${
                  step === s ? "bg-[#D4AF37] border-[#D4AF37] text-[#1C0F00]" : "border-[#D4AF37]/30 text-[#D4AF37]/50"
                }`}>
                  {i + 1}
                </div>
                <span className={`text-xs uppercase tracking-wider ${step === s ? "text-[#D4AF37]" : "text-white/30"}`}>
                  {s === "cart" ? "Cart" : "Address"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="container mx-auto px-4">

          {/* ── STEP 1: CART ───────────────────────────────────── */}
          {step === "cart" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Items */}
              <div className="lg:col-span-2 space-y-3">
                {cartItems.map(({ product, quantity }) => (
                  <div key={product.id} className="bg-white border border-[#EAD7BB] p-4 flex gap-4">
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-20 h-24 object-cover flex-shrink-0"
                      onError={e => { (e.target as HTMLImageElement).src = "https://res.cloudinary.com/df4autxjg/image/upload/v1751638933/ROYAL_BLACK_ABAYA_hrx8kd.png"; }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-[10px] text-[#D4AF37] font-semibold uppercase tracking-widest">{product.category}</p>
                          <h3 className="font-serif font-semibold text-[#1C0F00] text-base leading-tight">{product.name}</h3>
                        </div>
                        <button
                          onClick={() => removeFromCart(product.id)}
                          className="text-gray-300 hover:text-red-400 transition-colors flex-shrink-0 mt-0.5"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-[#EAD7BB]">
                          <button
                            onClick={() => updateQuantity(product.id, quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center text-[#8B4513] hover:bg-[#FDF5E6] transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center text-sm font-semibold text-[#1C0F00]">{quantity}</span>
                          <button
                            onClick={() => updateQuantity(product.id, quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center text-[#8B4513] hover:bg-[#FDF5E6] transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="font-bold text-[#D4AF37] text-lg">
                          {sym}{(product.price * quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white border border-[#EAD7BB] p-5 sticky top-24">
                  <h2 className="font-serif font-bold text-[#1C0F00] text-lg mb-4 pb-3 border-b border-[#EAD7BB]">Order Summary</h2>

                  <div className="space-y-2.5 mb-4 text-sm">
                    <div className="flex justify-between text-[#8B4513]/70">
                      <span>Subtotal ({cartItems.reduce((s, i) => s + i.quantity, 0)} items)</span>
                      <span>{sym}{cartTotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-[#8B4513]/70">
                      <span>Shipping</span>
                      <span className={shipping === 0 ? "text-green-600 font-semibold" : ""}>
                        {shipping === 0 ? "Free" : `${sym}${shipping}`}
                      </span>
                    </div>
                    {shipping === 0 && (
                      <p className="text-[10px] text-green-600 bg-green-50 px-2 py-1">
                        🎉 You qualify for free shipping!
                      </p>
                    )}
                    {shipping > 0 && (
                      <p className="text-[10px] text-[#8B4513]/50">
                        Add {sym}{(5000 - cartTotal).toLocaleString()} more for free shipping
                      </p>
                    )}
                    <div className="border-t border-[#EAD7BB] pt-2.5 flex justify-between font-bold text-[#1C0F00]">
                      <span>Total</span>
                      <span className="text-[#D4AF37] text-lg">{sym}{total.toLocaleString()}</span>
                    </div>
                  </div>

                  <Button
                    className="w-full bg-[#1C0F00] hover:bg-[#D4AF37] hover:text-[#1C0F00] text-white rounded-none font-bold tracking-wider uppercase text-sm h-11 transition-all duration-300 mb-3"
                    onClick={() => setStep("address")}
                  >
                    Proceed to Checkout <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>

                  <div className="bg-[#FDF5E6] border border-[#EAD7BB] p-3">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#8B4513] mb-1.5">We accept</p>
                    <ul className="text-[11px] text-[#8B4513]/60 space-y-0.5">
                      <li>• Cash on Delivery (COD)</li>
                      <li>• UPI — PhonePe & Google Pay</li>
                      <li>• Order via WhatsApp</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── STEP 2: ADDRESS ────────────────────────────────── */}
          {step === "address" && (
            <div className="max-w-2xl mx-auto">
              <div className="bg-white border border-[#EAD7BB] p-6">
                <h2 className="font-serif font-bold text-[#1C0F00] text-xl mb-5 pb-3 border-b border-[#EAD7BB]">
                  Delivery Address
                </h2>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">Full Name *</label>
                      <Input value={addr.fullName} onChange={e => setField("fullName", e.target.value)}
                        placeholder="Your full name" className="rounded-none border-gray-200 focus:border-[#D4AF37] focus:ring-0 text-sm" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">Phone Number *</label>
                      <Input type="tel" value={addr.phone} onChange={e => setField("phone", e.target.value)}
                        placeholder="+91 XXXXX XXXXX" className="rounded-none border-gray-200 focus:border-[#D4AF37] focus:ring-0 text-sm" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">Street Address *</label>
                    <Input value={addr.address} onChange={e => setField("address", e.target.value)}
                      placeholder="House/Flat No., Street, Area" className="rounded-none border-gray-200 focus:border-[#D4AF37] focus:ring-0 text-sm" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">City *</label>
                      <Input value={addr.city} onChange={e => setField("city", e.target.value)}
                        placeholder="City" className="rounded-none border-gray-200 focus:border-[#D4AF37] focus:ring-0 text-sm" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">State *</label>
                      <Input value={addr.state} onChange={e => setField("state", e.target.value)}
                        placeholder="State" className="rounded-none border-gray-200 focus:border-[#D4AF37] focus:ring-0 text-sm" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">PIN Code *</label>
                      <Input value={addr.pincode} onChange={e => setField("pincode", e.target.value)}
                        placeholder="PIN Code" className="rounded-none border-gray-200 focus:border-[#D4AF37] focus:ring-0 text-sm" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">Landmark (Optional)</label>
                    <Input value={addr.landmark} onChange={e => setField("landmark", e.target.value)}
                      placeholder="Nearby landmark for easy delivery" className="rounded-none border-gray-200 focus:border-[#D4AF37] focus:ring-0 text-sm" />
                  </div>

                  {/* GPS location */}
                  <div className="border-t border-gray-100 pt-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs font-semibold text-[#1C0F00]">Share Exact Location <span className="text-gray-400 font-normal">(optional)</span></p>
                      <button
                        onClick={getLocation}
                        disabled={locLoading}
                        className="flex items-center gap-1.5 text-xs text-[#D4AF37] hover:text-[#B8972A] font-semibold transition-colors disabled:opacity-50"
                      >
                        <Navigation className="w-3.5 h-3.5" />
                        {locLoading ? "Getting…" : "Use My Location"}
                      </button>
                    </div>
                    {addr.location && (
                      <div className="flex items-center gap-2 bg-green-50 border border-green-200 px-3 py-2 text-xs text-green-700">
                        <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                        Location captured — will be included in your order
                      </div>
                    )}
                  </div>

                  {addrError && <p className="text-red-500 text-xs">{addrError}</p>}

                  {/* Order summary recap */}
                  <div className="bg-[#FDF5E6] border border-[#EAD7BB] p-4 text-sm">
                    <p className="font-semibold text-[#1C0F00] mb-2 text-xs uppercase tracking-wider">Order Total</p>
                    <div className="flex justify-between text-[#8B4513]/70 mb-1">
                      <span>Subtotal</span><span>{sym}{cartTotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-[#8B4513]/70 mb-2">
                      <span>Shipping</span>
                      <span className={shipping === 0 ? "text-green-600" : ""}>{shipping === 0 ? "Free" : `${sym}${shipping}`}</span>
                    </div>
                    <div className="flex justify-between font-bold text-[#1C0F00] border-t border-[#EAD7BB] pt-2">
                      <span>Total</span><span className="text-[#D4AF37]">{sym}{total.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <Button
                      onClick={handleProceed}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white rounded-none font-bold tracking-wider uppercase text-sm h-11 transition-all duration-300"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Place Order via WhatsApp
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setStep("cart")}
                      className="rounded-none border-[#EAD7BB] text-[#8B4513] hover:border-[#D4AF37] text-sm px-5"
                    >
                      Back
                    </Button>
                  </div>

                  <p className="text-[10px] text-center text-gray-400">
                    Your order details and delivery address will be sent to us via WhatsApp. We'll confirm within minutes.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <WhatsAppFloat />
      <Footer />
    </div>
  );
};

export default Cart;
