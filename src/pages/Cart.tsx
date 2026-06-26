import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Minus, Plus, Trash2, ShoppingBag, ArrowRight,
  MapPin, Navigation, MessageCircle, Truck, Smartphone, Copy, CheckCircle2,
  Shield, Lock, Phone, Tag, X, ChevronDown, ChevronUp, Gift
} from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useSiteSettings } from "@/contexts/SiteSettingsContext";
import { useCoupons, type Coupon } from "@/contexts/CouponsContext";
import { useNavigate } from "react-router-dom";

interface AddressData {
  fullName: string; phone: string; address: string;
  city: string; state: string; pincode: string;
  landmark: string; location: { lat: number; lng: number } | null;
}
const EMPTY_ADDRESS: AddressData = {
  fullName: "", phone: "", address: "", city: "",
  state: "", pincode: "", landmark: "", location: null,
};

type Step = "cart" | "address" | "payment";
type PayMethod = "whatsapp" | "cod" | "upi";

const STEPS: { id: Step; label: string }[] = [
  { id: "cart", label: "Cart" },
  { id: "address", label: "Address" },
  { id: "payment", label: "Payment" },
];

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();
  const { settings } = useSiteSettings();
  const { coupons, validateCoupon, calcDiscount } = useCoupons();
  const navigate = useNavigate();

  const [step, setStep] = useState<Step>("cart");
  const [addr, setAddr] = useState<AddressData>(EMPTY_ADDRESS);
  const [addrError, setAddrError] = useState("");
  const [locLoading, setLocLoading] = useState(false);
  const [payMethod, setPayMethod] = useState<PayMethod | null>(null);
  const [upiCopied, setUpiCopied] = useState(false);

  // Coupon state
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [couponError, setCouponError] = useState("");
  const [couponApplying, setCouponApplying] = useState(false);
  const [showCouponList, setShowCouponList] = useState(false);

  // Public coupons (active ones visible to customers)
  const publicCoupons = coupons.filter(c => c.active);

  const sym = settings.currencySymbol;
  const baseShipping = cartTotal > 5000 ? 0 : 299;
  const discount = appliedCoupon ? calcDiscount(appliedCoupon, cartTotal, baseShipping) : 0;
  const shipping = appliedCoupon?.type === "freeship" ? 0 : baseShipping;
  const total = cartTotal - (appliedCoupon?.type !== "freeship" ? discount : 0) + shipping;

  const setField = (key: keyof AddressData, val: string) =>
    setAddr(prev => ({ ...prev, [key]: val }));

  const getLocation = () => {
    setLocLoading(true);
    navigator.geolocation?.getCurrentPosition(
      pos => { setAddr(prev => ({ ...prev, location: { lat: pos.coords.latitude, lng: pos.coords.longitude } })); setLocLoading(false); },
      () => setLocLoading(false)
    );
  };

  const validateAddress = () => {
    if (!addr.fullName || !addr.phone || !addr.address || !addr.city || !addr.state || !addr.pincode) {
      setAddrError("Please fill in all required fields."); return false;
    }
    setAddrError(""); return true;
  };

  const applyCoupon = () => {
    if (!couponInput.trim()) return;
    setCouponApplying(true);
    setCouponError("");
    const result = validateCoupon(couponInput.trim(), cartTotal);
    setTimeout(() => {
      setCouponApplying(false);
      if (result.valid && result.coupon) {
        setAppliedCoupon(result.coupon);
        setCouponInput("");
        setCouponError("");
        setShowCouponList(false);
      } else {
        setCouponError(result.error || "Invalid code");
      }
    }, 400);
  };

  const applyDirectCoupon = (c: Coupon) => {
    const result = validateCoupon(c.code, cartTotal);
    if (result.valid && result.coupon) {
      setAppliedCoupon(result.coupon);
      setCouponError("");
      setShowCouponList(false);
    } else {
      setCouponError(result.error || "Cannot apply this coupon");
    }
  };

  const removeCoupon = () => { setAppliedCoupon(null); setCouponError(""); setCouponInput(""); setShowCouponList(false); };

  const generateOrderNumber = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let code = "";
    for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];
    return `HAE-${code}`;
  };

  const saveOrderToSupabase = async (paymentMethod: string): Promise<string> => {
    const orderNumber = generateOrderNumber();
    try {
      await supabase.from("orders").insert({
        order_number: orderNumber,
        customer_name: addr.fullName,
        customer_phone: addr.phone,
        address_line: addr.address,
        city: addr.city,
        state: addr.state,
        pincode: addr.pincode,
        landmark: addr.landmark,
        items: cartItems.map(i => ({
          product_id: i.product.id,
          product_name: i.product.name,
          product_image: i.product.image_url,
          quantity: i.quantity,
          unit_price: i.product.price,
          total_price: i.product.price * i.quantity,
        })),
        subtotal: cartTotal,
        shipping,
        discount,
        total,
        payment_method: paymentMethod,
        coupon_code: appliedCoupon?.code || "",
        status: "pending",
      });
    } catch (err) {
      console.warn("[Order] Supabase save failed:", err);
    }
    return orderNumber;
  };

  const buildOrderMessage = (method: string, orderNum?: string) => {
    const orderRef = orderNum ? `\n📋 Order Ref: ${orderNum}` : "";
    return buildOrderMessageBase(method) + orderRef;
  };

  const buildOrderMessageBase = (method: string) => {
    const lines = cartItems.map(i =>
      `🛍 ${i.product.name} × ${i.quantity} — ${sym}${(i.product.price * i.quantity).toLocaleString()}`
    ).join("\n");
    const locationLine = addr.location
      ? `\n📍 https://maps.google.com/?q=${addr.location.lat},${addr.location.lng}`
      : "";
    const discountLine = appliedCoupon
      ? `\nDiscount (${appliedCoupon.code}): -${sym}${discount.toLocaleString()}`
      : "";
    return (
      `Hi! I'd like to place an order (${method}):\n\n${lines}\n\n` +
      `Subtotal: ${sym}${cartTotal.toLocaleString()}${discountLine}\n` +
      `Shipping: ${shipping === 0 ? "Free" : `${sym}${shipping}`}\n` +
      `Total: ${sym}${total.toLocaleString()}\n\n` +
      `📦 Delivery Address:\n${addr.fullName}\n${addr.phone}\n` +
      `${addr.address}${addr.landmark ? `, near ${addr.landmark}` : ""}\n` +
      `${addr.city}, ${addr.state} — ${addr.pincode}${locationLine}\n\n` +
      `Please confirm my order.`
    );
  };

  const handleWhatsAppOrder = async () => {
    window.open(`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(buildOrderMessageBase("WhatsApp Order"))}`, "_blank");
    const orderNum = await saveOrderToSupabase("whatsapp");
    clearCart();
    navigate("/order-confirmation", { state: { orderNumber: orderNum, customerName: addr.fullName, total, itemCount: cartItems.reduce((s, i) => s + i.quantity, 0), paymentMethod: "WhatsApp Order" } });
  };

  const handleCOD = async () => {
    window.open(`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(buildOrderMessageBase("Cash on Delivery"))}`, "_blank");
    const orderNum = await saveOrderToSupabase("cod");
    clearCart();
    navigate("/order-confirmation", { state: { orderNumber: orderNum, customerName: addr.fullName, total, itemCount: cartItems.reduce((s, i) => s + i.quantity, 0), paymentMethod: "Cash on Delivery" } });
  };

  const handleUpiPaid = async () => {
    const msg = buildOrderMessageBase("UPI Payment") +
      `\n\nI have completed the UPI payment of ${sym}${total.toLocaleString()} to ${settings.upiId}. Please find the payment screenshot attached.`;
    window.open(`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(msg)}`, "_blank");
    const orderNum = await saveOrderToSupabase("upi");
    clearCart();
    navigate("/order-confirmation", { state: { orderNumber: orderNum, customerName: addr.fullName, total, itemCount: cartItems.reduce((s, i) => s + i.quantity, 0), paymentMethod: "UPI Payment" } });
  };

  const copyUpi = () => {
    navigator.clipboard.writeText(settings.upiId);
    setUpiCopied(true);
    setTimeout(() => setUpiCopied(false), 2500);
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#FDF5E6]">
        <Header />
        <div className="container mx-auto px-4 py-24 text-center">
          <ShoppingBag className="w-16 h-16 text-[#D4AF37]/40 mx-auto mb-6" />
          <h1 className="text-3xl font-serif font-bold text-[#1C0F00] mb-3">Your Cart is Empty</h1>
          <p className="text-[#8B4513]/60 mb-8">Add some beautiful pieces to get started.</p>
          <Button className="bg-[#1C0F00] hover:bg-[#D4AF37] hover:text-[#1C0F00] text-white rounded-none font-semibold tracking-wider uppercase text-sm h-11 px-8"
            onClick={() => navigate("/products")}>Browse Collection</Button>
        </div>
        <WhatsAppFloat /><Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDF5E6]">
      <Header />

      {/* Page header + step indicator */}
      <section className="bg-[#1C0F00] py-10 relative">
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-60" />
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
            {step === "cart" && "Your Cart"}
            {step === "address" && "Delivery Address"}
            {step === "payment" && "Choose Payment"}
          </h1>
          <div className="flex items-center justify-center gap-2">
            {STEPS.map((s, i) => (
              <div key={s.id} className="flex items-center gap-2">
                {i > 0 && <div className="h-[1px] w-6 bg-[#D4AF37]/30" />}
                <div className="flex items-center gap-1.5">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border transition-all ${
                    step === s.id ? "bg-[#D4AF37] border-[#D4AF37] text-[#1C0F00]"
                    : STEPS.findIndex(x => x.id === step) > i ? "bg-[#D4AF37]/30 border-[#D4AF37]/30 text-[#D4AF37]"
                    : "border-[#D4AF37]/20 text-[#D4AF37]/30"
                  }`}>{i + 1}</div>
                  <span className={`text-[10px] uppercase tracking-wider hidden sm:block ${step === s.id ? "text-[#D4AF37]" : "text-white/30"}`}>{s.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="container mx-auto px-4">

          {/* ── STEP 1: CART ─────────────────────────────────── */}
          {step === "cart" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-3">
                {cartItems.map(({ product, quantity }) => (
                  <div key={product.id} className="bg-white border border-[#EAD7BB] p-4 flex gap-4">
                    <img src={product.image_url} alt={product.name}
                      className="w-20 h-24 object-cover flex-shrink-0"
                      onError={e => { (e.target as HTMLImageElement).src = "https://res.cloudinary.com/df4autxjg/image/upload/v1751638933/ROYAL_BLACK_ABAYA_hrx8kd.png"; }} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-[10px] text-[#D4AF37] font-semibold uppercase tracking-widest">{product.category}</p>
                          <h3 className="font-serif font-semibold text-[#1C0F00] text-base leading-tight">{product.name}</h3>
                        </div>
                        <button onClick={() => removeFromCart(product.id)} className="text-gray-300 hover:text-red-400 transition-colors flex-shrink-0">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-[#EAD7BB]">
                          <button onClick={() => updateQuantity(product.id, quantity - 1)} className="w-8 h-8 flex items-center justify-center text-[#8B4513] hover:bg-[#FDF5E6]"><Minus className="w-3 h-3" /></button>
                          <span className="w-8 text-center text-sm font-semibold text-[#1C0F00]">{quantity}</span>
                          <button onClick={() => updateQuantity(product.id, quantity + 1)} className="w-8 h-8 flex items-center justify-center text-[#8B4513] hover:bg-[#FDF5E6]"><Plus className="w-3 h-3" /></button>
                        </div>
                        <span className="font-bold text-[#D4AF37] text-lg">{sym}{(product.price * quantity).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order summary sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-white border border-[#EAD7BB] p-5 sticky top-24 space-y-4">
                  <h2 className="font-serif font-bold text-[#1C0F00] text-lg pb-3 border-b border-[#EAD7BB]">Order Summary</h2>

                  {/* Coupon section */}
                  <div className="border border-[#EAD7BB]">
                    {appliedCoupon ? (
                      /* ── Coupon applied ── */
                      <div className="flex items-center gap-2 bg-green-50 px-3 py-2.5">
                        <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-green-700 text-xs">{appliedCoupon.code} applied!</p>
                          <p className="text-[10px] text-green-600">{appliedCoupon.description}</p>
                        </div>
                        <button onClick={removeCoupon} className="text-green-400 hover:text-red-400 transition-colors flex-shrink-0" title="Remove coupon">
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <>
                        {/* ── View coupons toggle ── */}
                        {publicCoupons.length > 0 && (
                          <button
                            onClick={() => setShowCouponList(o => !o)}
                            className="w-full flex items-center justify-between px-3 py-2.5 text-xs hover:bg-[#FDF5E6] transition-colors"
                          >
                            <span className="flex items-center gap-2 font-semibold text-[#1C0F00]">
                              <Gift className="w-3.5 h-3.5 text-[#D4AF37]" />
                              View {publicCoupons.length} available offer{publicCoupons.length > 1 ? "s" : ""}
                            </span>
                            {showCouponList ? <ChevronUp className="w-3.5 h-3.5 text-[#8B4513]/50" /> : <ChevronDown className="w-3.5 h-3.5 text-[#8B4513]/50" />}
                          </button>
                        )}

                        {/* ── Coupon list ── */}
                        {showCouponList && (
                          <div className="border-t border-[#EAD7BB] bg-[#FDF5E6] divide-y divide-[#EAD7BB]">
                            {publicCoupons.map(c => {
                              const eligible = cartTotal >= c.minOrder;
                              return (
                                <div key={c.id} className={`flex items-center justify-between px-3 py-2.5 gap-3 ${!eligible ? "opacity-50" : ""}`}>
                                  <div className="min-w-0">
                                    <div className="flex items-center gap-1.5 flex-wrap">
                                      <span className="font-mono font-bold text-[#1C0F00] text-[11px] bg-white border border-[#EAD7BB] px-1.5 py-0.5 tracking-wider">{c.code}</span>
                                      {c.type === "percent" && <span className="text-[10px] font-bold text-[#D4AF37]">{c.value}% off</span>}
                                      {c.type === "flat" && <span className="text-[10px] font-bold text-[#D4AF37]">{sym}{c.value} off</span>}
                                      {c.type === "freeship" && <span className="text-[10px] font-bold text-blue-500">Free shipping</span>}
                                    </div>
                                    <p className="text-[10px] text-[#8B4513]/60 mt-0.5">
                                      {c.description || (c.minOrder > 0 ? `Min order ${sym}${c.minOrder.toLocaleString()}` : "No minimum")}
                                    </p>
                                    {!eligible && c.minOrder > 0 && (
                                      <p className="text-[10px] text-amber-600 mt-0.5">
                                        Add {sym}{(c.minOrder - cartTotal).toLocaleString()} more to unlock
                                      </p>
                                    )}
                                  </div>
                                  <button
                                    onClick={() => eligible && applyDirectCoupon(c)}
                                    disabled={!eligible}
                                    className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 flex-shrink-0 transition-all ${
                                      eligible
                                        ? "bg-[#1C0F00] hover:bg-[#D4AF37] hover:text-[#1C0F00] text-white"
                                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                                    }`}
                                  >
                                    Apply
                                  </button>
                                </div>
                              );
                            })}
                          </div>
                        )}

                        {/* ── Manual code entry ── */}
                        <div className={`flex gap-0 ${publicCoupons.length > 0 ? "border-t border-[#EAD7BB]" : ""}`}>
                          <Input
                            value={couponInput}
                            onChange={e => { setCouponInput(e.target.value.toUpperCase()); setCouponError(""); }}
                            onKeyDown={e => e.key === "Enter" && applyCoupon()}
                            placeholder="Have a private code? Enter it"
                            className="rounded-none border-0 focus:border-0 focus:ring-0 text-xs uppercase h-9 flex-1 font-mono tracking-wider bg-white"
                          />
                          <button
                            onClick={applyCoupon}
                            disabled={couponApplying || !couponInput.trim()}
                            className="bg-[#1C0F00] hover:bg-[#D4AF37] hover:text-[#1C0F00] text-white text-xs font-bold uppercase tracking-wider px-4 h-9 transition-all disabled:opacity-40 flex-shrink-0"
                          >
                            {couponApplying ? "…" : "Apply"}
                          </button>
                        </div>
                        {couponError && (
                          <p className="text-red-500 text-[11px] px-3 pb-2 flex items-center gap-1">
                            <X className="w-3 h-3 flex-shrink-0" />{couponError}
                          </p>
                        )}
                      </>
                    )}
                  </div>

                  {/* Price breakdown */}
                  <div className="space-y-2.5 text-sm border-t border-[#EAD7BB] pt-4">
                    <div className="flex justify-between text-[#8B4513]/70">
                      <span>Subtotal ({cartItems.reduce((s, i) => s + i.quantity, 0)} items)</span>
                      <span>{sym}{cartTotal.toLocaleString()}</span>
                    </div>
                    {appliedCoupon && (
                      <div className="flex justify-between text-green-600 font-semibold">
                        <span className="flex items-center gap-1"><Tag className="w-3 h-3" />{appliedCoupon.code}</span>
                        <span>− {sym}{discount.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-[#8B4513]/70">
                      <span>Shipping</span>
                      <span className={shipping === 0 ? "text-green-600 font-semibold" : ""}>{shipping === 0 ? "Free" : `${sym}${shipping}`}</span>
                    </div>
                    {!appliedCoupon && shipping > 0 && cartTotal < 5000 && (
                      <p className="text-[10px] text-[#8B4513]/50">
                        Add {sym}{(5000 - cartTotal).toLocaleString()} more for free shipping
                      </p>
                    )}
                    <div className="border-t border-[#EAD7BB] pt-2.5 flex justify-between font-bold text-[#1C0F00]">
                      <span>Total</span>
                      <span className="text-[#D4AF37] text-lg">{sym}{total.toLocaleString()}</span>
                    </div>
                    {appliedCoupon && (
                      <p className="text-[10px] text-green-600 bg-green-50 px-2 py-1.5 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 flex-shrink-0" />
                        You saved {sym}{discount.toLocaleString()} with coupon {appliedCoupon.code}!
                      </p>
                    )}
                  </div>

                  <Button className="w-full bg-[#1C0F00] hover:bg-[#D4AF37] hover:text-[#1C0F00] text-white rounded-none font-bold tracking-wider uppercase text-sm h-11 transition-all duration-300"
                    onClick={() => setStep("address")}>
                    Proceed to Checkout <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>

                  {/* Accepted payment methods */}
                  <div className="bg-[#FDF5E6] border border-[#EAD7BB] p-3">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#8B4513] mb-2">We accept</p>
                    <div className="space-y-1">
                      {["Cash on Delivery (COD)", "UPI — PhonePe & Google Pay", "Order via WhatsApp"].map(m => (
                        <div key={m} className="flex items-center gap-1.5 text-[11px] text-[#8B4513]/70">
                          <CheckCircle2 className="w-3 h-3 text-green-500 flex-shrink-0" />{m}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── STEP 2: ADDRESS ─────────────────────────────── */}
          {step === "address" && (
            <div className="max-w-2xl mx-auto">
              <div className="bg-white border border-[#EAD7BB] p-6">
                <h2 className="font-serif font-bold text-[#1C0F00] text-xl mb-5 pb-3 border-b border-[#EAD7BB]">Delivery Address</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">Full Name *</label>
                      <Input value={addr.fullName} onChange={e => setField("fullName", e.target.value)} placeholder="Your full name" className="rounded-none border-gray-200 focus:border-[#D4AF37] focus:ring-0 text-sm" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">Phone Number *</label>
                      <Input type="tel" value={addr.phone} onChange={e => setField("phone", e.target.value)} placeholder="+91 XXXXX XXXXX" className="rounded-none border-gray-200 focus:border-[#D4AF37] focus:ring-0 text-sm" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">Street Address *</label>
                    <Input value={addr.address} onChange={e => setField("address", e.target.value)} placeholder="House/Flat No., Street, Area" className="rounded-none border-gray-200 focus:border-[#D4AF37] focus:ring-0 text-sm" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">City *</label>
                      <Input value={addr.city} onChange={e => setField("city", e.target.value)} placeholder="City" className="rounded-none border-gray-200 focus:border-[#D4AF37] focus:ring-0 text-sm" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">State *</label>
                      <Input value={addr.state} onChange={e => setField("state", e.target.value)} placeholder="State" className="rounded-none border-gray-200 focus:border-[#D4AF37] focus:ring-0 text-sm" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">PIN Code *</label>
                      <Input value={addr.pincode} onChange={e => setField("pincode", e.target.value)} placeholder="PIN Code" className="rounded-none border-gray-200 focus:border-[#D4AF37] focus:ring-0 text-sm" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">Landmark (Optional)</label>
                    <Input value={addr.landmark} onChange={e => setField("landmark", e.target.value)} placeholder="Nearby landmark" className="rounded-none border-gray-200 focus:border-[#D4AF37] focus:ring-0 text-sm" />
                  </div>
                  <div className="border-t border-gray-100 pt-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs font-semibold text-[#1C0F00]">Share Exact Location <span className="text-gray-400 font-normal">(optional)</span></p>
                      <button onClick={getLocation} disabled={locLoading}
                        className="flex items-center gap-1.5 text-xs text-[#D4AF37] hover:text-[#B8972A] font-semibold transition-colors disabled:opacity-50">
                        <Navigation className="w-3.5 h-3.5" />{locLoading ? "Getting…" : "Use My Location"}
                      </button>
                    </div>
                    {addr.location && (
                      <div className="flex items-center gap-2 bg-green-50 border border-green-200 px-3 py-2 text-xs text-green-700">
                        <MapPin className="w-3.5 h-3.5 flex-shrink-0" />Location captured — will be included in your order
                      </div>
                    )}
                  </div>
                  {addrError && <p className="text-red-500 text-xs">{addrError}</p>}

                  {/* Mini order recap with coupon savings */}
                  {appliedCoupon && (
                    <div className="bg-green-50 border border-green-200 px-3 py-2 flex items-center gap-2 text-xs text-green-700">
                      <Tag className="w-3.5 h-3.5 flex-shrink-0" />
                      Coupon <strong>{appliedCoupon.code}</strong> applied — saving {sym}{discount.toLocaleString()}
                    </div>
                  )}

                  <div className="flex gap-3 pt-2">
                    <Button onClick={() => { if (validateAddress()) setStep("payment"); }}
                      className="flex-1 bg-[#1C0F00] hover:bg-[#D4AF37] hover:text-[#1C0F00] text-white rounded-none font-bold tracking-wider uppercase text-sm h-11">
                      Continue to Payment <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                    <Button variant="outline" onClick={() => setStep("cart")} className="rounded-none border-[#EAD7BB] text-[#8B4513] hover:border-[#D4AF37] text-sm px-5">Back</Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── STEP 3: PAYMENT ─────────────────────────────── */}
          {step === "payment" && (
            <div className="max-w-lg mx-auto">

              {/* Secure checkout badge */}
              <div className="flex items-center justify-center gap-2 mb-4 bg-green-50 border border-green-200 py-2.5 px-4">
                <Lock className="w-3.5 h-3.5 text-green-600 flex-shrink-0" />
                <span className="text-green-700 text-xs font-semibold">Secure Checkout — Your information is safe</span>
              </div>

              {/* Order recap */}
              <div className="bg-white border border-[#EAD7BB] p-4 mb-4">
                <div className="flex items-center justify-between mb-3">
                  <p className="font-bold text-[#1C0F00] text-xs uppercase tracking-wider">Order Summary</p>
                  <button onClick={() => setStep("cart")} className="text-[10px] text-[#D4AF37] hover:underline">Edit cart</button>
                </div>
                <div className="space-y-1 text-sm mb-3">
                  {cartItems.map(({ product, quantity }) => (
                    <div key={product.id} className="flex justify-between text-[#8B4513]/70">
                      <span className="truncate mr-2">{product.name} × {quantity}</span>
                      <span className="flex-shrink-0">{sym}{(product.price * quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-[#EAD7BB] pt-2 space-y-1 text-sm">
                  {appliedCoupon && (
                    <div className="flex justify-between text-green-600 font-semibold text-xs">
                      <span className="flex items-center gap-1"><Tag className="w-3 h-3" />{appliedCoupon.code}</span>
                      <span>− {sym}{discount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-[#8B4513]/60">
                    <span>Shipping</span>
                    <span className={shipping === 0 ? "text-green-600 font-semibold" : ""}>{shipping === 0 ? "Free" : `${sym}${shipping}`}</span>
                  </div>
                  <div className="flex justify-between font-bold text-[#1C0F00]">
                    <span>Total</span><span className="text-[#D4AF37] text-base">{sym}{total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Delivery recap */}
              <div className="bg-[#FDF5E6] border border-[#EAD7BB] px-4 py-3 mb-5 flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37] mt-0.5 flex-shrink-0" />
                <div className="text-xs text-[#8B4513]/80 leading-relaxed">
                  <span className="font-semibold text-[#1C0F00]">{addr.fullName}</span>
                  <span className="mx-1">·</span>{addr.address}, {addr.city} — {addr.pincode}
                </div>
              </div>

              <p className="text-xs font-bold uppercase tracking-widest text-[#8B4513] text-center mb-3">Select Payment Method</p>

              <div className="space-y-3">

                {/* ── WhatsApp Order ── */}
                <div
                  onClick={() => setPayMethod("whatsapp")}
                  className={`bg-white border-2 p-4 cursor-pointer transition-all rounded-sm ${payMethod === "whatsapp" ? "border-green-500 shadow-sm" : "border-[#EAD7BB] hover:border-green-300"}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 bg-[#25D366] flex items-center justify-center flex-shrink-0 rounded-sm">
                      <MessageCircle className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-[#1C0F00] text-sm">Order via WhatsApp</p>
                      <p className="text-xs text-[#8B4513]/60 mt-0.5">Chat directly — pay on delivery or via transfer</p>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${payMethod === "whatsapp" ? "border-green-500 bg-green-500" : "border-gray-300"}`}>
                      {payMethod === "whatsapp" && <div className="w-2 h-2 bg-white rounded-full" />}
                    </div>
                  </div>
                </div>

                {/* ── Cash on Delivery ── */}
                <div
                  onClick={() => setPayMethod("cod")}
                  className={`bg-white border-2 p-4 cursor-pointer transition-all rounded-sm ${payMethod === "cod" ? "border-[#D4AF37] shadow-sm" : "border-[#EAD7BB] hover:border-[#D4AF37]/60"}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 bg-[#1C0F00] flex items-center justify-center flex-shrink-0 rounded-sm">
                      <Truck className="w-5 h-5 text-[#D4AF37]" />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-[#1C0F00] text-sm">Cash on Delivery (COD)</p>
                      <p className="text-xs text-[#8B4513]/60 mt-0.5">Pay <strong className="text-[#1C0F00]">{sym}{total.toLocaleString()}</strong> when your order arrives</p>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${payMethod === "cod" ? "border-[#D4AF37] bg-[#D4AF37]" : "border-gray-300"}`}>
                      {payMethod === "cod" && <div className="w-2 h-2 bg-white rounded-full" />}
                    </div>
                  </div>
                  {payMethod === "cod" && (
                    <div className="mt-3 pt-3 border-t border-gray-100 flex items-start gap-2" onClick={e => e.stopPropagation()}>
                      <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-[#8B4513]/70">
                        Your order will be confirmed on WhatsApp. Our team will call before delivery. Keep exact change ready if possible.
                      </p>
                    </div>
                  )}
                </div>

                {/* ── UPI / PhonePe / Google Pay ── */}
                <div
                  onClick={() => setPayMethod("upi")}
                  className={`bg-white border-2 cursor-pointer transition-all rounded-sm ${payMethod === "upi" ? "border-[#D4AF37] shadow-sm" : "border-[#EAD7BB] hover:border-[#D4AF37]/60"}`}
                >
                  <div className="p-4 flex items-center gap-3">
                    <div className="w-11 h-11 bg-[#F5F5F5] border border-gray-200 flex items-center justify-center flex-shrink-0 rounded-sm">
                      <Smartphone className="w-5 h-5 text-[#5f259f]" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-bold text-[#1C0F00] text-sm">UPI Payment</p>
                        <span className="text-[10px] font-bold bg-[#5f259f] text-white px-2 py-0.5 rounded-full">PhonePe</span>
                        <span className="text-[10px] font-bold bg-[#4285F4] text-white px-2 py-0.5 rounded-full">GPay</span>
                        <span className="text-[10px] font-bold bg-[#002970] text-white px-2 py-0.5 rounded-full">Paytm</span>
                      </div>
                      <p className="text-xs text-[#8B4513]/60 mt-0.5">Pay instantly using any UPI app</p>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${payMethod === "upi" ? "border-[#D4AF37] bg-[#D4AF37]" : "border-gray-300"}`}>
                      {payMethod === "upi" && <div className="w-2 h-2 bg-white rounded-full" />}
                    </div>
                  </div>

                  {payMethod === "upi" && (
                    <div className="px-4 pb-4 border-t border-gray-100 pt-4" onClick={e => e.stopPropagation()}>
                      {settings.upiId ? (
                        <div className="space-y-4">
                          {/* Amount callout */}
                          <div className="bg-[#FDF5E6] border border-[#EAD7BB] px-4 py-3 flex items-center justify-between">
                            <p className="text-xs text-[#8B4513]/70">Amount to pay</p>
                            <p className="font-bold text-[#1C0F00] text-lg">{sym}{total.toLocaleString()}</p>
                          </div>

                          {/* Steps */}
                          <div className="space-y-2">
                            {[
                              "Copy the UPI ID below",
                              "Open PhonePe, Google Pay, or Paytm",
                              `Send exactly ${sym}${total.toLocaleString()} to this UPI ID`,
                              "Take a screenshot of the payment success screen",
                              "Click \"I've Paid\" to send us the confirmation",
                            ].map((s, i) => (
                              <div key={i} className="flex items-start gap-2.5">
                                <div className="w-4 h-4 rounded-full bg-[#D4AF37] text-[#1C0F00] flex items-center justify-center text-[9px] font-bold flex-shrink-0 mt-0.5">{i + 1}</div>
                                <p className="text-xs text-[#8B4513]/80">{s}</p>
                              </div>
                            ))}
                          </div>

                          {/* UPI ID copy box */}
                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">UPI ID</p>
                            <div className="flex items-center border border-[#EAD7BB] overflow-hidden">
                              <span className="flex-1 font-mono font-bold text-[#1C0F00] px-3 py-2.5 text-sm bg-[#FDF5E6] select-all">
                                {settings.upiId}
                              </span>
                              <button
                                onClick={copyUpi}
                                className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 flex-shrink-0 ${
                                  upiCopied ? "bg-green-500 text-white" : "bg-[#1C0F00] text-white hover:bg-[#D4AF37] hover:text-[#1C0F00]"
                                }`}
                              >
                                {upiCopied ? <><CheckCircle2 className="w-3.5 h-3.5" /> Copied!</> : <><Copy className="w-3.5 h-3.5" /> Copy</>}
                              </button>
                            </div>
                          </div>

                          {/* PhonePe deep link */}
                          <a
                            href={`phonepe://pay?pa=${settings.upiId}&pn=HijabAlEmarat&am=${total}&cu=INR`}
                            className="flex items-center justify-center gap-2 w-full bg-[#5f259f] hover:bg-[#4a1d7a] text-white text-xs font-bold uppercase tracking-wider h-10 transition-colors"
                          >
                            <Smartphone className="w-3.5 h-3.5" /> Open PhonePe Directly
                          </a>

                          <div className="flex items-center gap-1.5 bg-blue-50 border border-blue-100 px-3 py-2">
                            <Shield className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                            <p className="text-[11px] text-blue-600">After payment, click below to send us the screenshot on WhatsApp for confirmation.</p>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 px-3 py-3">
                          <Phone className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                          <p className="text-xs text-amber-700">
                            UPI ID not set up yet. Please contact us on WhatsApp and we'll share payment details directly.
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Action CTA */}
              <div className="mt-5 space-y-3">
                {payMethod === "whatsapp" && (
                  <Button onClick={handleWhatsAppOrder}
                    className="w-full bg-[#25D366] hover:bg-[#1da855] text-white rounded-none font-bold tracking-wider uppercase text-sm h-12">
                    <MessageCircle className="w-4 h-4 mr-2" /> Send Order via WhatsApp
                  </Button>
                )}
                {payMethod === "cod" && (
                  <Button onClick={handleCOD}
                    className="w-full bg-[#1C0F00] hover:bg-[#D4AF37] hover:text-[#1C0F00] text-white rounded-none font-bold tracking-wider uppercase text-sm h-12">
                    <Truck className="w-4 h-4 mr-2" /> Confirm COD Order
                  </Button>
                )}
                {payMethod === "upi" && settings.upiId && (
                  <Button onClick={handleUpiPaid}
                    className="w-full bg-[#D4AF37] hover:bg-[#B8972A] text-[#1C0F00] rounded-none font-bold tracking-wider uppercase text-sm h-12">
                    <CheckCircle2 className="w-4 h-4 mr-2" /> I've Paid — Send Screenshot
                  </Button>
                )}
                {payMethod === "upi" && !settings.upiId && (
                  <Button onClick={handleWhatsAppOrder}
                    className="w-full bg-[#25D366] hover:bg-[#1da855] text-white rounded-none font-bold tracking-wider uppercase text-sm h-12">
                    <MessageCircle className="w-4 h-4 mr-2" /> Contact us on WhatsApp
                  </Button>
                )}
                {!payMethod && (
                  <Button disabled className="w-full bg-gray-100 text-gray-400 rounded-none font-bold tracking-wider uppercase text-sm h-12 cursor-not-allowed">
                    Select a payment method above
                  </Button>
                )}

                <Button variant="outline" onClick={() => setStep("address")}
                  className="w-full rounded-none border-[#EAD7BB] text-[#8B4513] hover:border-[#D4AF37] text-sm h-9">
                  ← Back to Address
                </Button>

                {/* Trust footer */}
                <div className="flex items-center justify-center gap-4 pt-2 border-t border-[#EAD7BB]">
                  <div className="flex items-center gap-1 text-[10px] text-gray-400">
                    <Shield className="w-3 h-3" /> Safe & Secure
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-gray-400">
                    <CheckCircle2 className="w-3 h-3" /> Verified Seller
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-gray-400">
                    <Truck className="w-3 h-3" /> Fast Delivery
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </section>

      <WhatsAppFloat /><Footer />
    </div>
  );
};

export default Cart;
