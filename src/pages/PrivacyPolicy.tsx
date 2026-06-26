import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { Shield } from "lucide-react";
import { useSiteSettings } from "@/contexts/SiteSettingsContext";

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-10">
    <h2 className="text-xl font-serif font-semibold text-[#1C0F00] mb-3 flex items-center gap-3">
      <span className="w-5 h-[1px] bg-[#D4AF37] flex-shrink-0" />
      {title}
    </h2>
    <div className="text-[#4A3728] leading-relaxed space-y-3 text-[0.93rem]">{children}</div>
  </div>
);

const PrivacyPolicy = () => {
  const { settings } = useSiteSettings();
  return (
    <div className="min-h-screen bg-[#FDF5E6]">
      <Header />

      {/* Hero */}
      <div className="bg-[#1C0F00] pt-24 pb-14 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1C0F00]/60" />
        <div className="relative z-10 container mx-auto px-4">
          <div className="inline-flex items-center gap-3 mb-5">
            <div className="h-[1px] w-10 bg-[#D4AF37]/60" />
            <Shield className="w-4 h-4 text-[#D4AF37]" />
            <div className="h-[1px] w-10 bg-[#D4AF37]/60" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-3">Privacy Policy</h1>
          <p className="text-white/50 text-sm tracking-widest uppercase">Last updated: June 2026</p>
        </div>
      </div>

      {/* Body */}
      <div className="container mx-auto px-4 py-16 max-w-3xl">
        <div className="bg-white rounded-sm shadow-sm border border-[#D4AF37]/10 p-8 md:p-12">

          <p className="text-[#4A3728] mb-10 leading-relaxed text-[0.93rem]">
            At <strong className="text-[#1C0F00]">Hijab Al Emarat</strong>, we are committed to protecting your personal information and your right to privacy. This policy explains how we collect, use, and safeguard your data when you shop with us.
          </p>

          <Section title="Information We Collect">
            <p>When you place an order or interact with our store, we may collect:</p>
            <ul className="list-none space-y-2 mt-2">
              {[
                "Full name and contact details (phone number, email address)",
                "Delivery address and billing information",
                "Order history and product preferences",
                "Device and browser data for site performance (via cookies)",
                "WhatsApp messages and conversations when you contact us",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="text-[#D4AF37] mt-1 flex-shrink-0">✦</span>
                  {item}
                </li>
              ))}
            </ul>
          </Section>

          <Section title="How We Use Your Information">
            <p>Your information is used exclusively to:</p>
            <ul className="list-none space-y-2 mt-2">
              {[
                "Process and fulfil your orders",
                "Send order confirmations and delivery updates",
                "Respond to your queries and customer service requests",
                "Improve our website and product offerings",
                "Send promotional offers (only if you have opted in)",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="text-[#D4AF37] mt-1 flex-shrink-0">✦</span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-3">We will <strong>never sell, rent, or trade</strong> your personal information to third parties for marketing purposes.</p>
          </Section>

          <Section title="Information Sharing">
            <p>We share your data only with trusted partners who help us operate our business:</p>
            <ul className="list-none space-y-2 mt-2">
              {[
                "Shipping and logistics partners (to deliver your orders)",
                "Payment processors such as Razorpay (for secure transaction handling)",
                "WhatsApp Business (for order communication)",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="text-[#D4AF37] mt-1 flex-shrink-0">✦</span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-3">All partners are contractually required to protect your information and use it only for the specific purpose it was shared.</p>
          </Section>

          <Section title="Cookies">
            <p>Our website uses cookies to remember your cart, wishlist, and preferences across sessions. We do not use third-party advertising cookies. You may disable cookies in your browser settings, though some site features may not function correctly as a result.</p>
          </Section>

          <Section title="Data Security">
            <p>We take reasonable technical and organisational measures to protect your personal data from unauthorised access, loss, or misuse. Payment transactions are processed over encrypted connections (HTTPS/TLS). We do not store full card numbers on our servers.</p>
          </Section>

          <Section title="Your Rights">
            <p>You have the right to:</p>
            <ul className="list-none space-y-2 mt-2">
              {[
                "Request access to the personal data we hold about you",
                "Ask us to correct inaccurate information",
                "Request deletion of your data, subject to legal and operational requirements",
                "Opt out of marketing communications at any time",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="text-[#D4AF37] mt-1 flex-shrink-0">✦</span>
                  {item}
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Children's Privacy">
            <p>Our store is not directed to individuals under the age of 13. We do not knowingly collect personal information from children. If you believe we have inadvertently collected such information, please contact us and we will delete it promptly.</p>
          </Section>

          <Section title="Changes to This Policy">
            <p>We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. The revised version will be posted on this page with an updated date. We encourage you to review this policy periodically.</p>
          </Section>

          <Section title="Contact Us">
            <p>For any privacy-related questions or requests, please reach out:</p>
            <div className="mt-4 p-5 bg-[#FDF5E6] border border-[#D4AF37]/20 space-y-1">
              <p><strong className="text-[#1C0F00]">{settings.storeName}</strong></p>
              <p>{settings.address}</p>
              <p>Email: <a href={`mailto:${settings.email}`} className="text-[#8B4513] hover:text-[#D4AF37] transition-colors">{settings.email}</a></p>
              <p>WhatsApp: <a href={`https://wa.me/${settings.whatsappNumber}`} className="text-[#8B4513] hover:text-[#D4AF37] transition-colors">{settings.phone}</a></p>
            </div>
          </Section>

        </div>
      </div>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default PrivacyPolicy;
