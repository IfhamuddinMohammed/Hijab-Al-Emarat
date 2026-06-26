import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { useAuth } from "@/contexts/AuthContext";
import { useSiteSettings } from "@/contexts/SiteSettingsContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Package, ChevronDown, ChevronUp, MessageCircle,
  ShoppingBag, LogIn, Clock, Truck, CheckCircle2, XCircle
} from "lucide-react";

interface OrderItem {
  product_id: string;
  product_name: string;
  product_image: string;
  quantity: number;
  unit_price: number;
  total_price: number;
}

interface Order {
  id: string;
  order_number: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  address_line: string;
  city: string;
  state: string;
  pincode: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  payment_method: string;
  coupon_code: string;
  status: string;
  created_at: string;
}

const STATUS_MAP: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  pending:    { label: "Pending",    color: "bg-amber-50 text-amber-700 border-amber-200",   icon: <Clock className="w-3 h-3" /> },
  confirmed:  { label: "Confirmed",  color: "bg-blue-50 text-blue-700 border-blue-200",       icon: <CheckCircle2 className="w-3 h-3" /> },
  processing: { label: "Processing", color: "bg-purple-50 text-purple-700 border-purple-200", icon: <Package className="w-3 h-3" /> },
  shipped:    { label: "Shipped",    color: "bg-indigo-50 text-indigo-700 border-indigo-200", icon: <Truck className="w-3 h-3" /> },
  delivered:  { label: "Delivered",  color: "bg-green-50 text-green-700 border-green-200",    icon: <CheckCircle2 className="w-3 h-3" /> },
  cancelled:  { label: "Cancelled",  color: "bg-red-50 text-red-600 border-red-200",          icon: <XCircle className="w-3 h-3" /> },
};

const formatDate = (iso: string) => {
  const d = new Date(iso);
  return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
};

const MyOrders = () => {
  const { user, loading: authLoading } = useAuth();
  const { settings } = useSiteSettings();
  const navigate = useNavigate();
  const sym = settings.currencySymbol;

  const [orders, setOrders]         = useState<Order[]>([]);
  const [loading, setLoading]       = useState(true);
  const [expanded, setExpanded]     = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    loadOrders();
  }, [user]);

  const loadOrders = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("customer_email", user?.email ?? "")
      .order("created_at", { ascending: false });

    if (!error && data) setOrders(data as Order[]);
    setLoading(false);
  };

  const toggle = (id: string) => setExpanded(prev => prev === id ? null : id);

  // ── Not logged in ──
  if (!authLoading && !user) {
    return (
      <div className="min-h-screen bg-[#FDF5E6]">
        <Header />
        <div className="bg-[#1C0F00] pt-20 pb-14 text-center relative">
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
          <h1 className="text-4xl font-serif font-bold text-white">My Orders</h1>
        </div>
        <div className="container mx-auto px-4 py-20 max-w-md text-center">
          <LogIn className="w-14 h-14 text-[#D4AF37]/40 mx-auto mb-5" />
          <h2 className="font-serif text-2xl font-bold text-[#1C0F00] mb-2">Sign in to view orders</h2>
          <p className="text-[#8B4513]/60 text-sm mb-7">
            Your order history is linked to your account. Sign in to track your deliveries.
          </p>
          <Button
            onClick={() => navigate("/login?return=/my-orders")}
            className="bg-[#1C0F00] hover:bg-[#D4AF37] hover:text-[#1C0F00] text-white rounded-none font-bold tracking-wider uppercase text-sm h-11 px-8">
            <LogIn className="w-4 h-4 mr-2" /> Sign In
          </Button>
        </div>
        <Footer />
        <WhatsAppFloat />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDF5E6]">
      <Header />

      {/* Hero */}
      <div className="bg-[#1C0F00] pt-20 pb-14 text-center relative">
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
        <h1 className="text-4xl font-serif font-bold text-white mb-1">My Orders</h1>
        {user && (
          <p className="text-white/40 text-xs mt-1">{user.email}</p>
        )}
      </div>

      <div className="container mx-auto px-4 py-10 max-w-3xl">

        {/* Loading skeleton */}
        {loading && (
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white border border-[#EAD7BB] p-5 animate-pulse">
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-100 w-32" />
                    <div className="h-3 bg-gray-100 w-20" />
                  </div>
                  <div className="h-6 bg-gray-100 w-20 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && orders.length === 0 && (
          <div className="text-center py-20">
            <ShoppingBag className="w-14 h-14 text-[#D4AF37]/30 mx-auto mb-5" />
            <h2 className="font-serif text-2xl font-bold text-[#1C0F00] mb-2">No orders yet</h2>
            <p className="text-[#8B4513]/60 text-sm mb-7">
              Your orders will appear here once you place them. Make sure you enter your email address at checkout.
            </p>
            <Button onClick={() => navigate("/products")}
              className="bg-[#1C0F00] hover:bg-[#D4AF37] hover:text-[#1C0F00] text-white rounded-none font-bold tracking-wider uppercase text-sm h-11 px-8">
              <ShoppingBag className="w-4 h-4 mr-2" /> Browse Collection
            </Button>
          </div>
        )}

        {/* Order list */}
        {!loading && orders.length > 0 && (
          <div className="space-y-3">
            <p className="text-xs text-[#8B4513]/50 mb-4">{orders.length} order{orders.length !== 1 ? "s" : ""} found</p>

            {orders.map(order => {
              const status = STATUS_MAP[order.status] ?? STATUS_MAP.pending;
              const isOpen = expanded === order.id;
              const itemCount = Array.isArray(order.items)
                ? order.items.reduce((s: number, i: OrderItem) => s + i.quantity, 0)
                : 0;

              return (
                <div key={order.id} className="bg-white border border-[#EAD7BB]">
                  {/* Header row */}
                  <button
                    onClick={() => toggle(order.id)}
                    className="w-full text-left p-5 flex items-start justify-between gap-3 hover:bg-[#FDF5E6]/50 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 flex-wrap mb-1.5">
                        <span className="font-mono font-bold text-[#1C0F00] text-sm tracking-wider">{order.order_number}</span>
                        <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 border rounded-full ${status.color}`}>
                          {status.icon}{status.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-[#8B4513]/60">
                        <span>{formatDate(order.created_at)}</span>
                        <span>·</span>
                        <span>{itemCount} item{itemCount !== 1 ? "s" : ""}</span>
                        <span>·</span>
                        <span className="font-bold text-[#D4AF37]">{sym}{Number(order.total).toLocaleString()}</span>
                      </div>
                    </div>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-[#8B4513]/40 flex-shrink-0 mt-1" /> : <ChevronDown className="w-4 h-4 text-[#8B4513]/40 flex-shrink-0 mt-1" />}
                  </button>

                  {/* Expanded details */}
                  {isOpen && (
                    <div className="border-t border-[#EAD7BB] px-5 pb-5 pt-4 space-y-4">

                      {/* Items */}
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-[#8B4513] mb-3">Items</p>
                        <div className="space-y-2">
                          {Array.isArray(order.items) && order.items.map((item: OrderItem, i: number) => (
                            <div key={i} className="flex items-center gap-3">
                              <img
                                src={item.product_image}
                                alt={item.product_name}
                                className="w-12 h-14 object-cover flex-shrink-0 border border-[#EAD7BB]"
                                onError={e => { (e.target as HTMLImageElement).src = "https://res.cloudinary.com/df4autxjg/image/upload/v1751638933/ROYAL_BLACK_ABAYA_hrx8kd.png"; }}
                              />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-[#1C0F00] truncate">{item.product_name}</p>
                                <p className="text-xs text-[#8B4513]/60">Qty: {item.quantity}</p>
                              </div>
                              <span className="text-sm font-bold text-[#D4AF37] flex-shrink-0">{sym}{Number(item.total_price).toLocaleString()}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Price summary */}
                      <div className="border-t border-[#EAD7BB] pt-3 space-y-1.5 text-sm">
                        <div className="flex justify-between text-[#8B4513]/70">
                          <span>Subtotal</span><span>{sym}{Number(order.subtotal).toLocaleString()}</span>
                        </div>
                        {Number(order.discount) > 0 && (
                          <div className="flex justify-between text-green-600 font-semibold text-xs">
                            <span>Discount {order.coupon_code && `(${order.coupon_code})`}</span>
                            <span>− {sym}{Number(order.discount).toLocaleString()}</span>
                          </div>
                        )}
                        <div className="flex justify-between text-[#8B4513]/70">
                          <span>Shipping</span>
                          <span className={Number(order.shipping) === 0 ? "text-green-600 font-semibold" : ""}>
                            {Number(order.shipping) === 0 ? "Free" : `${sym}${Number(order.shipping).toLocaleString()}`}
                          </span>
                        </div>
                        <div className="flex justify-between font-bold text-[#1C0F00] border-t border-[#EAD7BB] pt-1.5">
                          <span>Total</span>
                          <span className="text-[#D4AF37]">{sym}{Number(order.total).toLocaleString()}</span>
                        </div>
                      </div>

                      {/* Delivery address */}
                      <div className="bg-[#FDF5E6] border border-[#EAD7BB] px-4 py-3 text-xs text-[#8B4513]/80">
                        <p className="font-bold text-[#1C0F00] mb-1 text-[10px] uppercase tracking-widest">Delivery Address</p>
                        <p className="font-semibold text-[#1C0F00]">{order.customer_name}</p>
                        <p>{order.address_line}, {order.city}, {order.state} — {order.pincode}</p>
                        <p className="mt-0.5 text-[#8B4513]/60">{order.customer_phone}</p>
                      </div>

                      {/* WhatsApp enquiry */}
                      <a
                        href={`https://wa.me/${settings.whatsappNumber}?text=Hi! I have a question about my order ${order.order_number}.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#1da855] text-white text-xs font-bold uppercase tracking-wider h-9 transition-colors"
                      >
                        <MessageCircle className="w-3.5 h-3.5" /> Ask about this order
                      </a>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default MyOrders;
