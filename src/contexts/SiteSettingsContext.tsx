import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface SiteSettings {
  storeName: string;
  storeTaglineArabic: string;
  storeSlogan: string;
  storeAbout: string;
  whatsappNumber: string;
  email: string;
  phone: string;
  address: string;
  instagram: string;
  facebook: string;
  tiktok: string;
  heroBadgeText: string;
  heroSubtitle: string;
  heroBodyText: string;
  heroBgImage: string;
  heroCtaPrimary: string;
  announcementEnabled: boolean;
  announcementText: string;
  currencySymbol: string;
  upiId: string;
  phonePeNumber: string;
}

const SETTINGS_KEY = "hae_settings_v1";

export const DEFAULT_SETTINGS: SiteSettings = {
  storeName: "Hijab Al Emarat",
  storeTaglineArabic: "الحجاب الإماراتي",
  storeSlogan: "Hijabs that Reflect Light, Faith & Fashion",
  storeAbout: "Bringing the finest collection of hijabs, abayas, and modest fashion from Dubai to India with love.",
  whatsappNumber: "971582109797",
  email: "contact.hijabialemarat@gmail.com",
  phone: "+971 582 109 797",
  address: "Dubai, UAE",
  instagram: "",
  facebook: "",
  tiktok: "",
  heroBadgeText: "Dubai's Finest Modest Fashion",
  heroSubtitle: "Hijabs that Reflect Light, Faith & Fashion",
  heroBodyText: "Premium modest fashion from the heart of Dubai, crafted for the modern woman",
  heroBgImage: "https://res.cloudinary.com/df4autxjg/image/upload/v1751638933/ROYAL_BLACK_ABAYA_hrx8kd.png",
  heroCtaPrimary: "Explore Collection",
  announcementEnabled: true,
  announcementText: "Free Shipping on Orders Over ₹2,999 · Authentic Dubai Collection",
  currencySymbol: "₹",
  upiId: "",
  phonePeNumber: "",
};

interface SiteSettingsContextType {
  settings: SiteSettings;
  updateSettings: (updates: Partial<SiteSettings>) => void;
  resetSettings: () => void;
}

const SiteSettingsContext = createContext<SiteSettingsContextType | undefined>(undefined);

export const SiteSettingsProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<SiteSettings>(() => {
    try {
      const stored = localStorage.getItem(SETTINGS_KEY);
      if (stored) return { ...DEFAULT_SETTINGS, ...JSON.parse(stored) };
    } catch {}
    return DEFAULT_SETTINGS;
  });

  useEffect(() => {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  }, [settings]);

  const updateSettings = (updates: Partial<SiteSettings>) => {
    setSettings(prev => ({ ...prev, ...updates }));
  };

  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS);
  };

  return (
    <SiteSettingsContext.Provider value={{ settings, updateSettings, resetSettings }}>
      {children}
    </SiteSettingsContext.Provider>
  );
};

export const useSiteSettings = () => {
  const ctx = useContext(SiteSettingsContext);
  if (!ctx) throw new Error("useSiteSettings must be used inside SiteSettingsProvider");
  return ctx;
};
