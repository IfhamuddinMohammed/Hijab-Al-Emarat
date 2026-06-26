import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { Truck } from "lucide-react";

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-10">
    <h2 className="text-xl font-serif font-semibold text-[#1C0F00] mb-3 flex items-center gap-3">
      <span className="w-5 h-[1px] bg-[#D4AF37] flex-shrink-0" />
      {title}
    </h2>
    <div className="text-[#4A3728] leading-relaxed space-y-3 text-[0.93rem]">{children}</div>
  </div>
);

const ShippingRow = ({
  method, time, cost, note,
}: {
  method: string; time: string; cost: string; note?: string;
}) => (
  <tr className="border-b border-[#D4AF37]/10 last:border-0">
    <td className="py-4 pr-4 font-semibold text-[#1C0F00] text-sm">{method}</td>
    <td className="py-4 pr-4 text-sm">{time}</td>
    <td className="py-4 pr-4 text-sm text-[#8B4513] font-medium">{cost}</td>
    <td className="py-4 text-xs text-[#8B4513]/70">{note ?? "—"}</td>
  </tr>
);

const ShippingPolicy = () => {
  return (
    <div className="min-h-screen bg-[#FDF5E6]">
      <Header />

      {/* Hero */}
      <div className="bg-[#1C0F00] pt-24 pb-14 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1C0F00]/60" />
        <div className="relative z-10 container mx-auto px-4">
          <div className="inline-flex items-center gap-3 mb-5">
            <div className="h-[1px] w-10 bg-[#D4AF37]/60" />
            <Truck className="w-4 h-4 text-[#D4AF37]" />
            <div className="h-[1px] w-10 bg-[#D4AF37]/60" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-3">Shipping Policy</h1>
          <p className="text-white/50 text-sm tracking-widest uppercase">Last updated: June 2026</p>
        </div>
      </div>

      {/* Body */}
      <div className="container mx-auto px-4 py-16 max-w-3xl">
        <div className="bg-white rounded-sm shadow-sm border border-[#D4AF37]/10 p-8 md:p-12">

          <p className="text-[#4A3728] mb-10 leading-relaxed text-[0.93rem]">
            We ship across India and to select international destinations. All orders are carefully packed and dispatched within 1–2 business days of payment confirmation.
          </p>

          {/* Free shipping banner */}
          <div className="mb-10 p-5 bg-[#1C0F00] text-center">
            <p className="text-[#D4AF37] font-serif text-lg font-semibold">Free Shipping on All Orders Over ₹2,999</p>
            <p className="text-white/50 text-sm mt-1">Applies automatically at checkout — no code needed</p>
          </div>

          <Section title="Domestic Shipping (India)">
            <div className="overflow-x-auto -mx-2">
              <table className="w-full text-left min-w-[480px]">
                <thead>
                  <tr className="border-b border-[#D4AF37]/20">
                    <th className="pb-3 text-xs uppercase tracking-wider text-[#8B4513] pr-4">Method</th>
                    <th className="pb-3 text-xs uppercase tracking-wider text-[#8B4513] pr-4">Delivery Time</th>
                    <th className="pb-3 text-xs uppercase tracking-wider text-[#8B4513] pr-4">Cost</th>
                    <th className="pb-3 text-xs uppercase tracking-wider text-[#8B4513]">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  <ShippingRow
                    method="Standard Shipping"
                    time="5–7 business days"
                    cost="₹99"
                    note="Free above ₹2,999"
                  />
                  <ShippingRow
                    method="Express Shipping"
                    time="2–3 business days"
                    cost="₹199"
                    note="Available in major cities"
                  />
                  <ShippingRow
                    method="Same-Day Delivery"
                    time="Same day"
                    cost="₹299"
                    note="Mumbai & Delhi only"
                  />
                </tbody>
              </table>
            </div>
            <p className="text-xs text-[#8B4513] mt-3">Business days exclude Sundays and public holidays. Delivery timelines are estimates and may vary during peak seasons.</p>
          </Section>

          <Section title="International Shipping">
            <div className="overflow-x-auto -mx-2">
              <table className="w-full text-left min-w-[480px]">
                <thead>
                  <tr className="border-b border-[#D4AF37]/20">
                    <th className="pb-3 text-xs uppercase tracking-wider text-[#8B4513] pr-4">Region</th>
                    <th className="pb-3 text-xs uppercase tracking-wider text-[#8B4513] pr-4">Delivery Time</th>
                    <th className="pb-3 text-xs uppercase tracking-wider text-[#8B4513] pr-4">Cost</th>
                    <th className="pb-3 text-xs uppercase tracking-wider text-[#8B4513]">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  <ShippingRow
                    method="UAE / GCC"
                    time="4–7 business days"
                    cost="₹499 / AED 25"
                    note="Free above ₹5,999"
                  />
                  <ShippingRow
                    method="UK & Europe"
                    time="8–12 business days"
                    cost="₹799 / £10"
                  />
                  <ShippingRow
                    method="USA & Canada"
                    time="10–14 business days"
                    cost="₹999 / $15"
                  />
                  <ShippingRow
                    method="Other Countries"
                    time="10–18 business days"
                    cost="Calculated at checkout"
                    note="Contact us to confirm"
                  />
                </tbody>
              </table>
            </div>
            <p className="text-xs text-[#8B4513] mt-3">International customers are responsible for any applicable customs duties and import taxes levied by their country.</p>
          </Section>

          <Section title="Order Processing">
            <ul className="list-none space-y-2">
              {[
                "Orders placed before 2:00 PM IST on business days are processed the same day",
                "Orders placed after 2:00 PM IST or on weekends are processed the next business day",
                "You will receive an order confirmation via WhatsApp or email after placing your order",
                "A shipping notification with tracking details is sent once your order is dispatched",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="text-[#D4AF37] mt-1 flex-shrink-0">✦</span>
                  {item}
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Order Tracking">
            <p>Once your order has been dispatched, you will receive a tracking link via WhatsApp or email. You can use this link to monitor your delivery in real time through our logistics partner's portal.</p>
            <p>If you haven't received a tracking update within 3 business days of your order confirmation, please contact us and we will investigate.</p>
          </Section>

          <Section title="Failed Delivery Attempts">
            <p>Our courier partner will attempt delivery up to 3 times. After 3 failed attempts:</p>
            <ul className="list-none space-y-2 mt-2">
              {[
                "The package is returned to our warehouse",
                "We will contact you to arrange re-delivery (additional shipping charge may apply)",
                "If re-delivery is not possible within 15 days, the order may be cancelled and a refund issued minus shipping fees",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="text-[#D4AF37] mt-1 flex-shrink-0">✦</span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-3">Please ensure your delivery address and phone number are accurate at checkout to avoid delays.</p>
          </Section>

          <Section title="Delivery to P.O. Boxes">
            <p>We currently do not ship to P.O. Box addresses. Please provide a full residential or commercial address when placing your order.</p>
          </Section>

          <Section title="Lost or Stolen Packages">
            <p>If your tracking shows 'Delivered' but you have not received your package, please contact us within 72 hours. We will liaise with the courier and work to resolve the issue promptly.</p>
          </Section>

          <Section title="Contact for Shipping Queries">
            <div className="p-5 bg-[#FDF5E6] border border-[#D4AF37]/20 space-y-1">
              <p><strong className="text-[#1C0F00]">Hijab Al Emarat</strong></p>
              <p>WhatsApp: <a href="https://wa.me/971501234567" className="text-[#8B4513] hover:text-[#D4AF37] transition-colors">+971 50 123 4567</a></p>
              <p>Email: <a href="mailto:hijabalemarat@gmail.com" className="text-[#8B4513] hover:text-[#D4AF37] transition-colors">hijabalemarat@gmail.com</a></p>
            </div>
          </Section>

        </div>
      </div>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default ShippingPolicy;
