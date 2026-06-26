import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";

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

const DEFAULT_COUPONS: Coupon[] = [
  { id: "c1", code: "HIJABFIRST", type: "percent",  value: 10,  minOrder: 0,    active: true, description: "10% off your first order" },
  { id: "c2", code: "SAVE200",    type: "flat",     value: 200, minOrder: 1500, active: true, description: "₹200 off on orders above ₹1500" },
  { id: "c3", code: "FREESHIP",   type: "freeship", value: 0,   minOrder: 0,    active: true, description: "Free shipping on any order" },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fromDB = (row: any): Coupon => ({
  id:          String(row.id),
  code:        String(row.code),
  type:        row.type as DiscountType,
  value:       Number(row.value),
  minOrder:    Number(row.min_order ?? 0),
  active:      Boolean(row.active),
  description: String(row.description ?? ""),
});

const CouponsContext = createContext<CouponsContextType | undefined>(undefined);

export const CouponsProvider = ({ children }: { children: ReactNode }) => {
  const [coupons, setCoupons] = useState<Coupon[]>(DEFAULT_COUPONS);

  useEffect(() => {
    const load = async () => {
      try {
        const { data, error } = await supabase.from("coupons").select("*").order("created_at");
        if (error) throw error;
        if (data && data.length > 0) setCoupons(data.map(fromDB));
      } catch (err) {
        console.warn("[Coupons] Supabase unavailable — using defaults:", err);
        try {
          const stored = localStorage.getItem("hae_coupons_v1");
          if (stored) setCoupons(JSON.parse(stored));
        } catch {}
      }
    };
    load();
  }, []);

  const addCoupon = async (c: Omit<Coupon, "id">) => {
    const row = { code: c.code, type: c.type, value: c.value, min_order: c.minOrder, active: c.active, description: c.description };
    const { data } = await supabase.from("coupons").insert(row).select().single();
    if (data) setCoupons(prev => [...prev, fromDB(data)]);
  };

  const updateCoupon = async (id: string, updates: Partial<Coupon>) => {
    const row: Record<string, unknown> = {};
    if (updates.code !== undefined) row.code = updates.code;
    if (updates.type !== undefined) row.type = updates.type;
    if (updates.value !== undefined) row.value = updates.value;
    if (updates.minOrder !== undefined) row.min_order = updates.minOrder;
    if (updates.active !== undefined) row.active = updates.active;
    if (updates.description !== undefined) row.description = updates.description;
    const { data } = await supabase.from("coupons").update(row).eq("id", id).select().single();
    if (data) setCoupons(prev => prev.map(c => c.id === id ? fromDB(data) : c));
  };

  const deleteCoupon = async (id: string) => {
    const { error } = await supabase.from("coupons").delete().eq("id", id);
    if (!error) setCoupons(prev => prev.filter(c => c.id !== id));
  };

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
