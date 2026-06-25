import { createContext, useContext, useState, ReactNode } from "react";

export type DiscountType = "percent" | "flat" | "freeship";

export interface Coupon {
  id: string;
  code: string;
  type: DiscountType;
  value: number;
  minOrder: number;
  active: boolean;
  description: string;
}

interface CouponsContextType {
  coupons: Coupon[];
  addCoupon: (c: Omit<Coupon, "id">) => void;
  updateCoupon: (id: string, updates: Partial<Coupon>) => void;
  deleteCoupon: (id: string) => void;
  validateCoupon: (code: string, orderTotal: number) => { valid: boolean; coupon?: Coupon; error?: string };
  calcDiscount: (coupon: Coupon, subtotal: number, shipping: number) => number;
}

const STORAGE_KEY = "hae_coupons_v1";

const DEFAULT_COUPONS: Coupon[] = [
  {
    id: "c1",
    code: "HIJABFIRST",
    type: "percent",
    value: 10,
    minOrder: 0,
    active: true,
    description: "10% off your first order",
  },
  {
    id: "c2",
    code: "SAVE200",
    type: "flat",
    value: 200,
    minOrder: 1500,
    active: true,
    description: "₹200 off on orders above ₹1500",
  },
  {
    id: "c3",
    code: "FREESHIP",
    type: "freeship",
    value: 0,
    minOrder: 0,
    active: true,
    description: "Free shipping on any order",
  },
];

const load = (): Coupon[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_COUPONS));
  return DEFAULT_COUPONS;
};

const save = (coupons: Coupon[]) => localStorage.setItem(STORAGE_KEY, JSON.stringify(coupons));

const CouponsContext = createContext<CouponsContextType | undefined>(undefined);

export const CouponsProvider = ({ children }: { children: ReactNode }) => {
  const [coupons, setCoupons] = useState<Coupon[]>(load);

  const set = (updated: Coupon[]) => { setCoupons(updated); save(updated); };

  const addCoupon = (c: Omit<Coupon, "id">) =>
    set([...coupons, { ...c, id: `c_${Date.now()}` }]);

  const updateCoupon = (id: string, updates: Partial<Coupon>) =>
    set(coupons.map(c => c.id === id ? { ...c, ...updates } : c));

  const deleteCoupon = (id: string) => set(coupons.filter(c => c.id !== id));

  const validateCoupon = (code: string, orderTotal: number) => {
    const coupon = coupons.find(c => c.code.toUpperCase() === code.toUpperCase() && c.active);
    if (!coupon) return { valid: false, error: "Invalid coupon code" };
    if (orderTotal < coupon.minOrder)
      return { valid: false, error: `Minimum order of ₹${coupon.minOrder.toLocaleString()} required` };
    return { valid: true, coupon };
  };

  const calcDiscount = (coupon: Coupon, subtotal: number, shipping: number): number => {
    if (coupon.type === "percent") return Math.round(subtotal * coupon.value / 100);
    if (coupon.type === "flat") return Math.min(coupon.value, subtotal);
    if (coupon.type === "freeship") return shipping;
    return 0;
  };

  return (
    <CouponsContext.Provider value={{ coupons, addCoupon, updateCoupon, deleteCoupon, validateCoupon, calcDiscount }}>
      {children}
    </CouponsContext.Provider>
  );
};

export const useCoupons = () => {
  const ctx = useContext(CouponsContext);
  if (!ctx) throw new Error("useCoupons must be used inside CouponsProvider");
  return ctx;
};
