import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { FileText } from "lucide-react";

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-10">
    <h2 className="text-xl font-serif font-semibold text-[#1C0F00] mb-3 flex items-center gap-3">
      <span className="w-5 h-[1px] bg-[#D4AF37] flex-shrink-0" />
      {title}
    </h2>
    <div className="text-[#4A3728] leading-relaxed space-y-3 text-[0.93rem]">{children}</div>
  </div>
);

const Terms = () => {
  return (
    <div className="min-h-screen bg-[#FDF5E6]">
      <Header />

      {/* Hero */}
      <div className="bg-[#1C0F00] pt-24 pb-14 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1C0F00]/60" />
        <div className="relative z-10 container mx-auto px-4">
          <div className="inline-flex items-center gap-3 mb-5">
            <div className="h-[1px] w-10 bg-[#D4AF37]/60" />
            <FileText className="w-4 h-4 text-[#D4AF37]" />
            <div className="h-[1px] w-10 bg-[#D4AF37]/60" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-3">Terms of Service</h1>
          <p className="text-white/50 text-sm tracking-widest uppercase">Last updated: June 2026</p>
        </div>
      </div>

      {/* Body */}
      <div className="container mx-auto px-4 py-16 max-w-3xl">
        <div className="bg-white rounded-sm shadow-sm border border-[#D4AF37]/10 p-8 md:p-12">

          <p className="text-[#4A3728] mb-10 leading-relaxed text-[0.93rem]">
            By accessing or using the Hijab Al Emarat website and placing an order, you agree to be bound by these Terms of Service. Please read them carefully. If you do not agree with these terms, please do not use our site.
          </p>

          <Section title="1. About Us">
            <p><strong className="text-[#1C0F00]">Hijab Al Emarat</strong> is a modest fashion brand based in Dubai, UAE, offering premium hijabs, abayas, and Islamic modest wear delivered across India, the UAE, and internationally. References to "we", "us", or "our" in this document refer to Hijab Al Emarat.</p>
          </Section>

          <Section title="2. Use of This Website">
            <p>You agree to use this website only for lawful purposes. You must not:</p>
            <ul className="list-none space-y-2 mt-2">
              {[
                "Use the site in any way that violates applicable local, national, or international laws",
                "Transmit unsolicited or unauthorised advertising or promotional material",
                "Attempt to gain unauthorised access to any part of the website or its related systems",
                "Copy, reproduce, or redistribute any content without our written permission",
                "Misrepresent your identity or affiliation with any person or organisation",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="text-[#D4AF37] mt-1 flex-shrink-0">✦</span>
                  {item}
                </li>
              ))}
            </ul>
          </Section>

          <Section title="3. Product Information">
            <p>We take care to ensure all product descriptions, images, and pricing on this website are accurate. However:</p>
            <ul className="list-none space-y-2 mt-2">
              {[
                "Colours may appear slightly different depending on your screen's display settings",
                "We reserve the right to correct any errors, inaccuracies, or omissions at any time",
                "Product availability is subject to change without notice",
                "We do not guarantee that product descriptions are complete, reliable, or error-free",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="text-[#D4AF37] mt-1 flex-shrink-0">✦</span>
                  {item}
                </li>
              ))}
            </ul>
          </Section>

          <Section title="4. Pricing and Payment">
            <p>All prices are listed in Indian Rupees (₹) unless otherwise stated. We reserve the right to change prices at any time. In the event of a pricing error, we will contact you before processing your order.</p>
            <p>We accept Cash on Delivery (COD), UPI, and bank transfer. Payment must be completed or confirmed before an order is dispatched. We reserve the right to cancel orders where payment is not received within 48 hours of the order being placed.</p>
          </Section>

          <Section title="5. Order Acceptance">
            <p>Placing an order constitutes an offer to purchase. We reserve the right to accept or decline any order at our discretion. An order is considered accepted only when we send you an order confirmation. We may cancel orders due to:</p>
            <ul className="list-none space-y-2 mt-2">
              {[
                "Items being out of stock or discontinued",
                "Errors in pricing or product information",
                "Suspected fraudulent activity",
                "Failure to receive payment",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="text-[#D4AF37] mt-1 flex-shrink-0">✦</span>
                  {item}
                </li>
              ))}
            </ul>
          </Section>

          <Section title="6. Intellectual Property">
            <p>All content on this website — including text, images, logos, product photographs, design elements, and brand assets — is the intellectual property of Hijab Al Emarat and is protected under applicable copyright and trademark laws.</p>
            <p>You may not reproduce, distribute, or use any content from this site for commercial purposes without our express written permission.</p>
          </Section>

          <Section title="7. Limitation of Liability">
            <p>To the fullest extent permitted by law, Hijab Al Emarat shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your use of, or inability to use, this website or our products.</p>
            <p>Our total liability for any claim related to a purchase shall not exceed the amount paid for the product in question.</p>
          </Section>

          <Section title="8. Disclaimer of Warranties">
            <p>This website and its content are provided "as is" without warranty of any kind, express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement. We do not warrant that the website will be uninterrupted, error-free, or free of viruses or other harmful components.</p>
          </Section>

          <Section title="9. Third-Party Links">
            <p>Our website may contain links to third-party websites (such as WhatsApp, social media, or payment gateways). These are provided for your convenience only. We have no control over those websites and accept no responsibility for their content or privacy practices.</p>
          </Section>

          <Section title="10. Promotions and Discount Codes">
            <p>Discount codes and promotional offers are subject to specific terms and expiry dates. Unless stated otherwise, promotions:</p>
            <ul className="list-none space-y-2 mt-2">
              {[
                "Apply to regular-priced items only and cannot be combined with other offers",
                "Are valid for one-time use per customer unless stated otherwise",
                "Cannot be applied retrospectively to completed orders",
                "May be withdrawn at any time without notice",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="text-[#D4AF37] mt-1 flex-shrink-0">✦</span>
                  {item}
                </li>
              ))}
            </ul>
          </Section>

          <Section title="11. Governing Law">
            <p>These Terms of Service are governed by and construed in accordance with the laws of India. Any disputes arising out of or related to these terms or your use of our website shall be subject to the exclusive jurisdiction of the courts of India.</p>
          </Section>

          <Section title="12. Changes to These Terms">
            <p>We reserve the right to update or modify these Terms of Service at any time. Changes take effect immediately upon posting to the website. Your continued use of the site after any changes constitutes your acceptance of the revised terms.</p>
          </Section>

          <Section title="13. Contact Us">
            <div className="p-5 bg-[#FDF5E6] border border-[#D4AF37]/20 space-y-1">
              <p><strong className="text-[#1C0F00]">Hijab Al Emarat</strong></p>
              <p>Dubai, United Arab Emirates</p>
              <p>Email: <a href="mailto:hijabalemarat@gmail.com" className="text-[#8B4513] hover:text-[#D4AF37] transition-colors">hijabalemarat@gmail.com</a></p>
              <p>WhatsApp: <a href="https://wa.me/971501234567" className="text-[#8B4513] hover:text-[#D4AF37] transition-colors">+971 50 123 4567</a></p>
            </div>
          </Section>

        </div>
      </div>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default Terms;
