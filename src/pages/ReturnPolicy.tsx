import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { RotateCcw } from "lucide-react";

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-10">
    <h2 className="text-xl font-serif font-semibold text-[#1C0F00] mb-3 flex items-center gap-3">
      <span className="w-5 h-[1px] bg-[#D4AF37] flex-shrink-0" />
      {title}
    </h2>
    <div className="text-[#4A3728] leading-relaxed space-y-3 text-[0.93rem]">{children}</div>
  </div>
);

const Highlight = ({ icon, title, value }: { icon: string; title: string; value: string }) => (
  <div className="text-center p-5 border border-[#D4AF37]/20 bg-[#FDF5E6]">
    <div className="text-2xl mb-2">{icon}</div>
    <p className="text-xs uppercase tracking-widest text-[#8B4513] mb-1">{title}</p>
    <p className="font-semibold text-[#1C0F00]">{value}</p>
  </div>
);

const ReturnPolicy = () => {
  return (
    <div className="min-h-screen bg-[#FDF5E6]">
      <Header />

      {/* Hero */}
      <div className="bg-[#1C0F00] pt-24 pb-14 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1C0F00]/60" />
        <div className="relative z-10 container mx-auto px-4">
          <div className="inline-flex items-center gap-3 mb-5">
            <div className="h-[1px] w-10 bg-[#D4AF37]/60" />
            <RotateCcw className="w-4 h-4 text-[#D4AF37]" />
            <div className="h-[1px] w-10 bg-[#D4AF37]/60" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-3">Returns &amp; Refunds</h1>
          <p className="text-white/50 text-sm tracking-widest uppercase">Last updated: June 2026</p>
        </div>
      </div>

      {/* Body */}
      <div className="container mx-auto px-4 py-16 max-w-3xl">
        <div className="bg-white rounded-sm shadow-sm border border-[#D4AF37]/10 p-8 md:p-12">

          <p className="text-[#4A3728] mb-10 leading-relaxed text-[0.93rem]">
            Your satisfaction is our priority. If you are not completely happy with your purchase, we offer a straightforward returns and refund process. Please read the terms below carefully before initiating a return.
          </p>

          {/* Key highlights */}
          <div className="grid grid-cols-3 gap-3 mb-12">
            <Highlight icon="📅" title="Return window" value="7 days" />
            <Highlight icon="💳" title="Refund timeline" value="7–10 business days" />
            <Highlight icon="🔄" title="Exchanges" value="Available" />
          </div>

          <Section title="Return Eligibility">
            <p>To be eligible for a return, items must meet all of the following conditions:</p>
            <ul className="list-none space-y-2 mt-2">
              {[
                "Returned within 7 days of the delivery date",
                "Unworn, unwashed, and in original condition",
                "All original tags and labels still attached",
                "Returned in original packaging",
                "Not marked as final sale or part of a promotional clearance",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="text-[#D4AF37] mt-1 flex-shrink-0">✦</span>
                  {item}
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Non-Returnable Items">
            <p>The following items cannot be returned or exchanged for hygiene and safety reasons:</p>
            <ul className="list-none space-y-2 mt-2">
              {[
                "Underscarf liners, hijab caps, and intimate accessories",
                "Items that have been worn, altered, or washed",
                "Items without original tags or packaging",
                "Gift cards or store credit",
                "Items marked as 'Final Sale'",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="text-[#D4AF37] mt-1 flex-shrink-0">✦</span>
                  {item}
                </li>
              ))}
            </ul>
          </Section>

          <Section title="How to Initiate a Return">
            <p>To start a return, please follow these steps:</p>
            <ol className="space-y-4 mt-3">
              {[
                { step: "1", text: "Contact us via WhatsApp or email within 7 days of receiving your order. Include your order number and reason for return." },
                { step: "2", text: "Our team will review your request and send you a return authorisation and shipping instructions within 24–48 hours." },
                { step: "3", text: "Pack the item securely and ship it to the address we provide. Please keep the tracking number." },
                { step: "4", text: "Once we receive and inspect the item, we will process your refund or exchange." },
              ].map(({ step, text }) => (
                <li key={step} className="flex items-start gap-4">
                  <span className="w-7 h-7 rounded-full border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] font-serif text-sm flex-shrink-0 mt-0.5">{step}</span>
                  <span>{text}</span>
                </li>
              ))}
            </ol>
            <div className="mt-5 p-4 bg-[#FDF5E6] border border-[#D4AF37]/30 flex items-start gap-3">
              <span className="text-[#D4AF37] text-lg flex-shrink-0">✦</span>
              <p>Return shipping costs are the responsibility of the customer unless the item was received damaged or incorrect.</p>
            </div>
          </Section>

          <Section title="Damaged or Incorrect Items">
            <p>If you receive a damaged, defective, or wrong item, please notify us within <strong>48 hours</strong> of delivery with clear photographs. We will arrange a free return pickup and send the correct item or issue a full refund at no cost to you.</p>
          </Section>

          <Section title="Refund Processing">
            <p>Once your return is received and approved:</p>
            <ul className="list-none space-y-2 mt-2">
              {[
                "Refunds are processed within 2–3 business days of inspection",
                "For UPI / bank transfers, the amount appears in 5–7 business days",
                "For COD orders, refunds are issued via bank transfer or UPI — we will request your account details",
                "Original shipping charges are non-refundable unless the return is due to our error",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="text-[#D4AF37] mt-1 flex-shrink-0">✦</span>
                  {item}
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Exchanges">
            <p>We're happy to offer exchanges for a different size or colour, subject to availability. Please contact us within 7 days of delivery to arrange. If the requested item is out of stock, we will issue store credit or a refund.</p>
          </Section>

          <Section title="Contact for Returns">
            <div className="p-5 bg-[#FDF5E6] border border-[#D4AF37]/20 space-y-1">
              <p><strong className="text-[#1C0F00]">Hijab Al Emarat — Returns Team</strong></p>
              <p>WhatsApp: <a href="https://wa.me/971501234567" className="text-[#8B4513] hover:text-[#D4AF37] transition-colors">+971 50 123 4567</a></p>
              <p>Email: <a href="mailto:hijabalemarat@gmail.com" className="text-[#8B4513] hover:text-[#D4AF37] transition-colors">hijabalemarat@gmail.com</a></p>
              <p className="text-sm text-[#8B4513] mt-2">Please quote your order number in all correspondence.</p>
            </div>
          </Section>

        </div>
      </div>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default ReturnPolicy;
