import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://qzpwrwvdlsiubijwrwkj.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF6cHdyd3ZkbHNpdWJpandyd2tqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE2MjgzMzEsImV4cCI6MjA2NzIwNDMzMX0.C9LSboaspuH1qxDfE0JwtxWOxRpnV3T6cxm5IC5WQFo";

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
