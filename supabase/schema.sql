-- ============================================================
-- Hijab Al Emarat — Supabase Schema
-- Run this once in your Supabase SQL Editor:
-- Dashboard → SQL Editor → New query → paste this → Run
-- ============================================================

-- ── Products ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS products (
  id           TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name         TEXT NOT NULL DEFAULT '',
  description  TEXT DEFAULT '',
  price        NUMERIC(10,2) NOT NULL DEFAULT 0,
  original_price NUMERIC(10,2) DEFAULT 0,
  stock_quantity INTEGER DEFAULT 0,
  category     TEXT DEFAULT '',
  image_url    TEXT DEFAULT '',
  images       TEXT[] DEFAULT ARRAY[]::TEXT[],
  is_featured  BOOLEAN DEFAULT false,
  material     TEXT DEFAULT '',
  care_instructions TEXT DEFAULT '',
  sizes        TEXT[] DEFAULT ARRAY[]::TEXT[],
  colors       TEXT[] DEFAULT ARRAY[]::TEXT[],
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  updated_at   TIMESTAMPTZ DEFAULT NOW()
);

-- ── Site Settings (single row, id always = 1) ───────────────
CREATE TABLE IF NOT EXISTS site_settings (
  id          INTEGER PRIMARY KEY DEFAULT 1,
  data        JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at  TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT  one_row CHECK (id = 1)
);

-- ── Coupons ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS coupons (
  id          TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  code        TEXT NOT NULL UNIQUE,
  type        TEXT NOT NULL DEFAULT 'percent'
                CHECK (type IN ('percent', 'flat', 'freeship')),
  value       NUMERIC(10,2) NOT NULL DEFAULT 0,
  min_order   NUMERIC(10,2) NOT NULL DEFAULT 0,
  active      BOOLEAN DEFAULT true,
  description TEXT DEFAULT '',
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ── Orders ───────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS orders (
  id              TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  order_number    TEXT UNIQUE NOT NULL,
  customer_name   TEXT NOT NULL DEFAULT '',
  customer_phone  TEXT NOT NULL DEFAULT '',
  customer_email  TEXT DEFAULT '',
  address_line    TEXT DEFAULT '',
  city            TEXT DEFAULT '',
  state           TEXT DEFAULT '',
  pincode         TEXT DEFAULT '',
  landmark        TEXT DEFAULT '',
  items           JSONB NOT NULL DEFAULT '[]'::jsonb,
  subtotal        NUMERIC(10,2) NOT NULL DEFAULT 0,
  shipping        NUMERIC(10,2) NOT NULL DEFAULT 0,
  discount        NUMERIC(10,2) NOT NULL DEFAULT 0,
  total           NUMERIC(10,2) NOT NULL DEFAULT 0,
  payment_method  TEXT DEFAULT 'whatsapp',
  coupon_code     TEXT DEFAULT '',
  status          TEXT DEFAULT 'pending'
                    CHECK (status IN ('pending','confirmed','processing','shipped','delivered','cancelled')),
  notes           TEXT DEFAULT '',
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ── Seed default coupons ─────────────────────────────────────
INSERT INTO coupons (id, code, type, value, min_order, active, description) VALUES
  ('c1', 'HIJABFIRST', 'percent',  10,    0,    true, '10% off your first order'),
  ('c2', 'SAVE200',    'flat',     200,   1500, true, '₹200 off on orders above ₹1500'),
  ('c3', 'FREESHIP',   'freeship', 0,     0,    true, 'Free shipping on any order')
ON CONFLICT (id) DO NOTHING;

-- ── Disable RLS (open for anon key — re-enable after adding proper auth) ──
ALTER TABLE products      DISABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings DISABLE ROW LEVEL SECURITY;
ALTER TABLE coupons       DISABLE ROW LEVEL SECURITY;
ALTER TABLE orders        DISABLE ROW LEVEL SECURITY;
