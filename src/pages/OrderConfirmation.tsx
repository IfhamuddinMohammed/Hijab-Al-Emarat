import { useLocation, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Package, MessageCircle, ShoppingBag, Home } from "lucide-react";
import { useSiteSettings } from "@/contexts/SiteSettingsContext";

const OrderConfirmation = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { settings } = useSiteSettings();

  const orderNumber   = state?.orderNumber   ?? "—";
  const customerName  = state?.customerName  ?? "";
  const total         = state?.total         ?? 0;
  const itemCount     = state?.itemCount     ?? 0;
  const paymentMethod = state?.paymentMethod ?? "WhatsApp Order";
  const sym           = settings.currencySymbol;

  return (
    <div className="min-h-screen bg-[#FDF5E6]">
      <Header />

      <div className="bg-[#1C0F00] pt-24 pb-12 text-center">
        <div className="h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mb-0" />
      </div>

      <div className="container mx-auto px-4 -mt-8 pb-20 max-w-lg">
        <div className="bg-white border border-[#D4AF37]/20 shadow-sm">

          {/* Success header */}
          <div className="bg-[#1C0F00] p-8 text-center">
            <div className="w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-[#1C0F00]" />
            </div>
            <h1 className="text-2xl font-serif font-bold text-white mb-1">Order Placed!</h1>
            <p className="text-white/50 text-sm">
              {customerName ? `Thank you, ${customerName.split(" ")[0]}` : "Thank you for your order"}
            </p>
          </div>

          <div className="p-7 space-y-5">

            {/* Order number */}
            <div className="text-center py-5 border border-[#D4AF37]/20 bg-[#FDF5E6]">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#8B4513] mb-2">Your Order Reference</p>
              <p className="font-mono font-bold text-[#1C0F00] text-2xl tracking-widest">{orderNumber}</p>
              <p className="text-xs text-[#8B4513]/50 mt-1">Keep this for tracking and enquiries</p>
            </div>

            {/* Summary */}
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-[#4A3728]">
                <span className="flex items-center gap-2"><Package className="w-3.5 h-3.5 text-[#D4AF37]" /> Items ordered</span>
                <span className="font-semibold text-[#1C0F00]">{itemCount} item{itemCount !== 1 ? "s" : ""}</span>
              </div>
              <div className="flex justify-between text-[#4A3728]">
                <span>Total paid / payable</span>
                <span className="font-bold text-[#D4AF37] text-base">{sym}{total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-[#4A3728]">
                <span>Payment method</span>
                <span className="font-semibold text-[#1C0F00]">{paymentMethod}</span>
              </div>
            </div>

            {/* What happens next */}
            <div className="border-t border-[#D4AF37]/10 pt-5">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#8B4513] mb-4">What happens next</p>
              <div className="space-y-3">
                {[
                  { step: "1", text: "Our team will confirm your order on WhatsApp within a few hours." },
                  { step: "2", text: "Once confirmed, your order is packed and dispatched within 1–2 business days." },
                  { step: "3", text: "You will receive a tracking link when your order ships." },
                ].map(({ step, text }) => (
                  <div key={step} className="flex items-start gap-3 text-sm text-[#4A3728]">
                    <span className="w-6 h-6 rounded-full border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] text-xs font-bold flex-shrink-0 mt-0.5">{step}</span>
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* WhatsApp follow-up */}
            <div className="bg-[#f0fdf4] border border-green-200 p-4 flex items-start gap-3">
              <MessageCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-semibold text-green-800 mb-0.5">Need help with your order?</p>
                <p className="text-green-700/70 text-xs">WhatsApp us with your order reference <strong>{orderNumber}</strong> and we'll assist you right away.</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3 pt-2">
              <Button
                onClick={() => window.open(`https://wa.me/${settings.whatsappNumber}?text=Hi! I placed an order with reference ${orderNumber}. Can you confirm the status?`, "_blank")}
                className="w-full bg-[#25D366] hover:bg-[#1da855] text-white rounded-none font-bold tracking-wider uppercase text-sm h-11"
              >
                <MessageCircle className="w-4 h-4 mr-2" /> Follow Up on WhatsApp
              </Button>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  onClick={() => navigate("/products")}
                  variant="outline"
                  className="rounded-none border-[#D4AF37]/30 text-[#8B4513] hover:border-[#D4AF37] text-sm h-10 flex items-center gap-2"
                >
                  <ShoppingBag className="w-3.5 h-3.5" /> Shop More
                </Button>
                <Button
                  onClick={() => navigate("/")}
                  variant="outline"
                  className="rounded-none border-[#D4AF37]/30 text-[#8B4513] hover:border-[#D4AF37] text-sm h-10 flex items-center gap-2"
                >
                  <Home className="w-3.5 h-3.5" /> Home
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default OrderConfirmation;
