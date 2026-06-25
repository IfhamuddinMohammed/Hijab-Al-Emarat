
import { Instagram, Facebook, Mail, Phone, MapPin, Send } from "lucide-react";
import { useSiteSettings } from "@/contexts/SiteSettingsContext";

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.79a8.27 8.27 0 004.84 1.55V6.89a4.85 4.85 0 01-1.07-.2z" />
  </svg>
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
              <p className="text-white/50 text-sm mt-0.5">Get exclusive offers, new arrivals & styling tips</p>
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

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-10">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="mb-4">
              <h3 className="text-2xl font-serif font-bold text-white">{settings.storeName}</h3>
              <p className="text-[#D4AF37] text-sm tracking-widest mt-0.5" dir="rtl">{settings.storeTaglineArabic}</p>
            </div>
            <div className="h-[1px] w-16 bg-[#D4AF37] mb-5" />
            <p className="text-white/50 text-sm leading-relaxed max-w-xs mb-6">
              {settings.storeAbout}
            </p>
            <div className="flex space-x-3">
              {settings.instagram && (
                <a
                  href={settings.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 border border-[#D4AF37]/30 flex items-center justify-center text-white/50 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all duration-200"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              )}
              {settings.facebook && (
                <a
                  href={settings.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 border border-[#D4AF37]/30 flex items-center justify-center text-white/50 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all duration-200"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              )}
              {settings.tiktok && (
                <a
                  href={settings.tiktok}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 border border-[#D4AF37]/30 flex items-center justify-center text-white/50 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all duration-200"
                >
                  <TikTokIcon />
                </a>
              )}
              {/* Show placeholder icons if no social links set */}
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
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D4AF37] mb-5">Quick Links</h4>
            <ul className="space-y-2.5">
              {[
                { label: "All Products", href: "/products" },
                { label: "Hijabs", href: "/products?category=hijabs" },
                { label: "Abayas", href: "/products?category=abayas" },
                { label: "Accessories", href: "/products?category=accessories" },
                { label: "About Us", href: "/about" },
                { label: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/50 hover:text-[#D4AF37] transition-colors duration-200 text-sm flex items-center gap-2 group"
                  >
                    <span className="w-3 h-[1px] bg-[#D4AF37]/30 group-hover:bg-[#D4AF37] group-hover:w-4 transition-all duration-200" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D4AF37] mb-5">Contact Us</h4>
            <div className="space-y-4">
              <a
                href={`tel:${settings.phone}`}
                className="flex items-start gap-3 text-white/50 hover:text-[#D4AF37] transition-colors group"
              >
                <Phone className="w-4 h-4 text-[#D4AF37] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm">{settings.phone}</p>
                  <p className="text-xs text-white/30">UAE Number</p>
                </div>
              </a>
              <a
                href={`mailto:${settings.email}`}
                className="flex items-start gap-3 text-white/50 hover:text-[#D4AF37] transition-colors group"
              >
                <Mail className="w-4 h-4 text-[#D4AF37] mt-0.5 flex-shrink-0" />
                <span className="text-xs leading-relaxed break-all">{settings.email}</span>
              </a>
              <div className="flex items-start gap-3 text-white/50">
                <MapPin className="w-4 h-4 text-[#D4AF37] mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p>{settings.address}</p>
                  <p className="text-xs text-white/30 mt-0.5">Delivering across India</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#D4AF37]/10">
        <div className="container mx-auto px-4 py-5 flex flex-col md:flex-row justify-between items-center gap-2">
          <p className="text-white/30 text-xs">
            © 2025 {settings.storeName}. All rights reserved.
          </p>
          <p className="text-[#D4AF37]/50 text-xs tracking-wider">
            {settings.storeSlogan}
          </p>
        </div>
      </div>
    </footer>
  );
};
