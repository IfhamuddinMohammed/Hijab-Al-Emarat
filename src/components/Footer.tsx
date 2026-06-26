
import { Instagram, Facebook, Mail, Phone, MapPin, Send } from "lucide-react";
import { Link } from "react-router-dom";
import { useSiteSettings } from "@/contexts/SiteSettingsContext";

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.79a8.27 8.27 0 004.84 1.55V6.89a4.85 4.85 0 01-1.07-.2z" />
  </svg>
);

const FooterLink = ({ to, label }: { to: string; label: string }) => (
  <li>
    <Link
      to={to}
      className="text-white/50 hover:text-[#D4AF37] transition-colors duration-200 text-sm flex items-center gap-2 group"
    >
      <span className="w-3 h-[1px] bg-[#D4AF37]/30 group-hover:bg-[#D4AF37] group-hover:w-4 transition-all duration-200" />
      {label}
    </Link>
  </li>
);

export const Footer = () => {
  const { settings } = useSiteSettings();

  return (
    <footer className="bg-[#0E0700] text-white">
      {/* Gold top accent */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />

      {/* Newsletter Strip */}
      <div className="bg-[#1C0F00] border-b border-[#D4AF37]/20 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-serif font-semibold text-white">Join Our Inner Circle</h3>
              <p className="text-white/50 text-sm mt-0.5">Exclusive offers, new arrivals &amp; styling tips</p>
            </div>
            <div className="flex w-full md:w-auto max-w-sm gap-0">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 bg-white/5 border border-[#D4AF37]/30 text-white placeholder:text-white/30 px-4 py-2.5 text-sm outline-none focus:border-[#D4AF37] transition-colors"
              />
              <button className="bg-[#D4AF37] hover:bg-[#B8972A] text-[#1C0F00] px-5 py-2.5 font-semibold text-sm transition-colors duration-200 flex-shrink-0 flex items-center gap-2">
                <Send className="w-4 h-4" />
                <span className="hidden sm:inline">Subscribe</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Grid */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-10">

          {/* Brand */}
          <div className="md:col-span-1">
            <div className="mb-4">
              <h3 className="text-2xl font-serif font-bold text-white">{settings.storeName}</h3>
              <p className="text-[#D4AF37] text-sm tracking-widest mt-0.5" dir="rtl">{settings.storeTaglineArabic}</p>
            </div>
            <div className="h-[1px] w-16 bg-[#D4AF37] mb-5" />
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              Premium modest fashion crafted for the modern Muslim woman — rooted in Dubai, delivered across India and beyond.
            </p>
            <div className="flex space-x-3 mb-6">
              {settings.instagram && (
                <a href={settings.instagram} target="_blank" rel="noreferrer"
                  className="w-9 h-9 border border-[#D4AF37]/30 flex items-center justify-center text-white/50 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all duration-200">
                  <Instagram className="w-4 h-4" />
                </a>
              )}
              {settings.facebook && (
                <a href={settings.facebook} target="_blank" rel="noreferrer"
                  className="w-9 h-9 border border-[#D4AF37]/30 flex items-center justify-center text-white/50 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all duration-200">
                  <Facebook className="w-4 h-4" />
                </a>
              )}
              {settings.tiktok && (
                <a href={settings.tiktok} target="_blank" rel="noreferrer"
                  className="w-9 h-9 border border-[#D4AF37]/30 flex items-center justify-center text-white/50 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all duration-200">
                  <TikTokIcon />
                </a>
              )}
              {!settings.instagram && !settings.facebook && !settings.tiktok && (
                <>
                  <a href="#" className="w-9 h-9 border border-[#D4AF37]/30 flex items-center justify-center text-white/50 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all duration-200">
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a href="#" className="w-9 h-9 border border-[#D4AF37]/30 flex items-center justify-center text-white/50 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all duration-200">
                    <Facebook className="w-4 h-4" />
                  </a>
                </>
              )}
            </div>
            {/* Payment icons */}
            <div>
              <p className="text-xs uppercase tracking-widest text-white/25 mb-3">We Accept</p>
              <div className="flex flex-wrap gap-1.5">
                {["UPI", "COD", "GPay", "PhonePe", "Paytm"].map((m) => (
                  <span key={m} className="border border-white/10 px-2 py-0.5 text-[10px] text-white/30 tracking-wide">{m}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D4AF37] mb-5">Explore</h4>
            <ul className="space-y-2.5">
              <FooterLink to="/products" label="All Products" />
              <FooterLink to="/products?category=hijabs" label="Hijabs" />
              <FooterLink to="/products?category=abayas" label="Abayas" />
              <FooterLink to="/products?category=niqabs" label="Niqabs" />
              <FooterLink to="/products?category=accessories" label="Accessories" />
              <FooterLink to="/products?category=occasion-wear" label="Occasion Wear" />
              <FooterLink to="/about" label="Our Story" />
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D4AF37] mb-5">Customer Care</h4>
            <ul className="space-y-2.5">
              <FooterLink to="/contact" label="Contact Us" />
              <FooterLink to="/shipping-policy" label="Shipping Policy" />
              <FooterLink to="/return-policy" label="Returns &amp; Refunds" />
              <FooterLink to="/privacy-policy" label="Privacy Policy" />
              <FooterLink to="/terms" label="Terms of Service" />
            </ul>
            {/* Trust badge */}
            <div className="mt-7 p-3 border border-[#D4AF37]/15 space-y-2">
              {[
                { icon: "🔒", text: "Secure Checkout" },
                { icon: "🚚", text: "Free Shipping ₹2,999+" },
                { icon: "↩️", text: "7-Day Easy Returns" },
              ].map(({ icon, text }) => (
                <div key={text} className="flex items-center gap-2.5 text-xs text-white/40">
                  <span>{icon}</span>
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D4AF37] mb-5">Get in Touch</h4>
            <div className="space-y-4">
              <a href={`tel:${settings.phone}`}
                className="flex items-start gap-3 text-white/50 hover:text-[#D4AF37] transition-colors group">
                <Phone className="w-4 h-4 text-[#D4AF37] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm">{settings.phone}</p>
                  <p className="text-xs text-white/30">Call or WhatsApp</p>
                </div>
              </a>
              <a href={`mailto:${settings.email}`}
                className="flex items-start gap-3 text-white/50 hover:text-[#D4AF37] transition-colors group">
                <Mail className="w-4 h-4 text-[#D4AF37] mt-0.5 flex-shrink-0" />
                <span className="text-xs leading-relaxed break-all">{settings.email}</span>
              </a>
              <div className="flex items-start gap-3 text-white/50">
                <MapPin className="w-4 h-4 text-[#D4AF37] mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p>{settings.address}</p>
                  <p className="text-xs text-white/30 mt-0.5">Pan-India Delivery</p>
                </div>
              </div>
            </div>

            {/* Business hours */}
            <div className="mt-6 pt-5 border-t border-[#D4AF37]/10">
              <p className="text-xs uppercase tracking-widest text-white/25 mb-2">Business Hours</p>
              <p className="text-sm text-white/40">Mon – Sat: 10 AM – 8 PM IST</p>
              <p className="text-sm text-white/40">Sunday: 12 PM – 6 PM IST</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#D4AF37]/10">
        <div className="container mx-auto px-4 py-5 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-white/30 text-xs">
            © 2025 {settings.storeName}. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-[10px] text-white/20 uppercase tracking-wider">
            <Link to="/privacy-policy" className="hover:text-[#D4AF37]/60 transition-colors">Privacy</Link>
            <span>·</span>
            <Link to="/terms" className="hover:text-[#D4AF37]/60 transition-colors">Terms</Link>
            <span>·</span>
            <Link to="/return-policy" className="hover:text-[#D4AF37]/60 transition-colors">Returns</Link>
            <span>·</span>
            <Link to="/shipping-policy" className="hover:text-[#D4AF37]/60 transition-colors">Shipping</Link>
          </div>
          <p className="text-[#D4AF37]/50 text-xs tracking-wider">
            {settings.storeSlogan}
          </p>
        </div>
      </div>
    </footer>
  );
};
