import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://plagldqvxqkkcszomnrj.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_FHCBjxBugLseXlf4sI2viQ_iq7fWt5x";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  stock_quantity: number;
  category: string | null;
  image_url: string | null;
  is_featured: boolean | null;
  created_at: string;
  updated_at: string;
}
