import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  stock_quantity: number;
  category: string;
  image_url: string;
  is_featured: boolean;
  created_at: string;
  sizes?: string[];
  colors?: string[];
  material?: string;
  care_instructions?: string;
  images?: string[]; // all gallery images (index 0 = primary)
}

const STORAGE_KEY = "hae_products_v1";

const CL = "https://res.cloudinary.com/df4autxjg/image/upload";

// Apply a Cloudinary transformation inline to an existing full URL
const tf = (url: string, transform: string) =>
  url.replace(`${CL}/`, `${CL}/${transform}/`);

const RAW = {
  abaya1: `${CL}/v1751638933/ROYAL_BLACK_ABAYA_hrx8kd.png`,
  abaya2: `${CL}/v1751634770/Hjb1_bsiwjl.jpg`,
  silk:   `${CL}/v1751638940/SILK_a4ceiv.png`,
  jersey: `${CL}/v1751638474/Hijabs_zoej9q.png`,
  niqab:  `${CL}/v1751638483/Niqabs_xwxnxb.png`,
  acc:    `${CL}/v1751638633/accessories_ikyfjt.png`,
};

const DEFAULT_PRODUCTS: Product[] = [
  // ── FEATURED ──────────────────────────────────────────────────────────────
  {
    id: "1",
    name: "Royal Zari Abaya",
    description: "Our bestselling signature abaya — crafted from fluid Nida fabric with hand-applied zari embroidery along the cuffs and hem. The structured shoulder and flowing silhouette make it effortlessly elegant for both everyday wear and special occasions. A statement piece that embodies Dubai's timeless modesty aesthetic.",
    price: 3999, originalPrice: 8999, stock_quantity: 30,
    category: "Abayas",
    image_url: RAW.abaya1,
    is_featured: true, created_at: new Date().toISOString(),
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Jet Black", "Midnight Navy", "Charcoal Grey"],
    material: "Premium Nida Fabric with Zari Embroidery",
    care_instructions: "Dry clean recommended. Hang immediately after use to prevent creasing. Store in the garment bag provided. Do not wring or bleach.",
    images: [
      RAW.abaya1,
      tf(RAW.abaya1, "c_fill,g_north,ar_3:4,q_auto,f_auto"),
      tf(RAW.abaya1, "c_fill,g_south,ar_4:3,q_auto,f_auto"),
      tf(RAW.abaya1, "e_sharpen:80,e_vibrance:18,q_auto,f_auto"),
    ],
  },
  {
    id: "2",
    name: "Mulberry Silk Hijab",
    description: "Woven from 100% pure mulberry silk, this hijab drapes with an unmatched natural sheen. Lightweight, breathable, and naturally temperature-regulating — it stays cool in summer and warm in winter. The hand-rolled edges and subtle lustre elevate any outfit from modest to magnificent.",
    price: 1299, originalPrice: 4799, stock_quantity: 50,
    category: "Hijabs",
    image_url: RAW.silk,
    is_featured: true, created_at: new Date().toISOString(),
    sizes: ["Free Size (185 × 85 cm)"],
    colors: ["Ivory Cream", "Ebony Black", "Dusty Rose", "Midnight Navy", "Sage Olive", "Caramel Beige"],
    material: "100% Pure Mulberry Silk",
    care_instructions: "Hand wash in cold water using mild silk detergent. Roll in a towel to remove moisture — never wring. Lay flat to dry away from direct sunlight. Iron on lowest setting using a press cloth.",
    images: [
      RAW.silk,
      tf(RAW.silk, "c_fill,g_center,ar_1:1,q_auto,f_auto"),
      tf(RAW.silk, "c_fill,g_north,ar_4:3,q_auto,f_auto"),
      tf(RAW.silk, "e_sharpen:100,e_vibrance:25,q_auto,f_auto"),
    ],
  },
  {
    id: "3",
    name: "Aura Evening Abaya",
    description: "Designed exclusively for evenings that demand elegance. Sculpted from a rich chiffon-crepe blend with a subtle all-over shimmer thread, this abaya catches light beautifully without being overdone. The flared hem and concealed front zip make it as practical as it is breathtaking.",
    price: 4499, originalPrice: 9999, stock_quantity: 15,
    category: "Abayas",
    image_url: RAW.abaya2,
    is_featured: true, created_at: new Date().toISOString(),
    sizes: ["S", "M", "L", "XL"],
    colors: ["Midnight Black", "Deep Bordeaux", "Royal Ink Blue"],
    material: "Chiffon & Shimmer Crepe Blend",
    care_instructions: "Dry clean only. Handle with care — delicate shimmer threads can snag. Store flat or hanging in a cool, dry place.",
    images: [
      RAW.abaya2,
      tf(RAW.abaya2, "c_fill,g_north,ar_3:4,q_auto,f_auto"),
      tf(RAW.abaya2, "c_fill,g_south,ar_4:3,q_auto,f_auto"),
      tf(RAW.abaya2, "e_sharpen:80,e_vibrance:20,q_auto,f_auto"),
    ],
  },

  // ── HIJABS ──────────────────────────────────────────────────────────────
  {
    id: "4",
    name: "Everyday Cotton Jersey Hijab",
    description: "The most-loved hijab in our collection — and for good reason. Made from a premium double-knit cotton jersey with just the right amount of stretch, it holds its shape all day without pins. Wrinkle-free, breathable, and available in our core colour palette. The one you'll reach for every morning.",
    price: 799, originalPrice: 1999, stock_quantity: 80,
    category: "Hijabs",
    image_url: RAW.jersey,
    is_featured: false, created_at: new Date().toISOString(),
    sizes: ["Free Size (200 × 75 cm)"],
    colors: ["Classic Black", "Pure White", "Stone Grey", "Camel Brown", "Olive Green", "French Navy"],
    material: "Premium Double-Knit Cotton Jersey",
    care_instructions: "Machine wash cold, gentle cycle. Tumble dry low or air dry. Do not iron directly — steam from a distance if needed.",
    images: [
      RAW.jersey,
      tf(RAW.jersey, "c_fill,g_center,ar_1:1,q_auto,f_auto"),
      tf(RAW.jersey, "c_fill,g_north,ar_4:3,q_auto,f_auto"),
      tf(RAW.jersey, "e_sharpen:90,e_vibrance:22,q_auto,f_auto"),
    ],
  },
  {
    id: "5",
    name: "Chiffon Shayla Hijab",
    description: "The Shayla is the quintessential Gulf hijab — long, rectangular, and supremely versatile. Ours is crafted from georgette chiffon that floats and flows with every movement. Layer it, drape it, pin it — it does it all. A wardrobe essential that pairs beautifully with any outfit.",
    price: 949, originalPrice: 2499, stock_quantity: 60,
    category: "Hijabs",
    image_url: RAW.silk,
    is_featured: false, created_at: new Date().toISOString(),
    sizes: ["Free Size (200 × 70 cm)"],
    colors: ["Pearl White", "Sand Beige", "Blush Pink", "Dusty Mauve", "Emerald", "Midnight Blue"],
    material: "Soft Georgette Chiffon",
    care_instructions: "Hand wash in cold water. Air dry away from sunlight. Iron on low heat with a press cloth if needed.",
    images: [
      RAW.silk,
      tf(RAW.silk, "c_fill,g_south,ar_3:4,q_auto,f_auto"),
      tf(RAW.silk, "c_fill,g_center,ar_4:3,q_auto,f_auto"),
      tf(RAW.silk, "e_auto_brightness,e_sharpen:60,q_auto,f_auto"),
    ],
  },
  {
    id: "6",
    name: "Luxury Modal Wrap Hijab",
    description: "Modal — the fabric that changed modest fashion. Sourced from Austrian beech wood, this hijab is buttery-soft against the skin, naturally antibacterial, and stays vibrant wash after wash. The generous width makes for elegant, voluminous draping with minimal effort.",
    price: 1099, originalPrice: 2799, stock_quantity: 45,
    category: "Hijabs",
    image_url: RAW.jersey,
    is_featured: false, created_at: new Date().toISOString(),
    sizes: ["Free Size (190 × 90 cm)"],
    colors: ["Warm Ivory", "Charcoal", "Dusty Rose", "Sage", "Terracotta", "Plum"],
    material: "95% Modal, 5% Elastane",
    care_instructions: "Machine wash cold. Tumble dry on low. Modal softens further with each wash.",
    images: [
      RAW.jersey,
      tf(RAW.jersey, "c_fill,g_north,ar_3:4,q_auto,f_auto"),
      tf(RAW.jersey, "c_fill,g_south,ar_1:1,q_auto,f_auto"),
      tf(RAW.jersey, "e_vibrance:30,e_sharpen:70,q_auto,f_auto"),
    ],
  },

  // ── ABAYAS ──────────────────────────────────────────────────────────────
  {
    id: "7",
    name: "Structured Open Abaya",
    description: "A modern take on the classic open-front abaya. Clean lines, a subtle princess cut, and a tailored collar give this piece a polished, contemporary feel. Wear it over your existing wardrobe to instantly elevate any look. The medium-weight fabric drapes beautifully without feeling heavy.",
    price: 3299, originalPrice: 6999, stock_quantity: 20,
    category: "Abayas",
    image_url: RAW.abaya1,
    is_featured: false, created_at: new Date().toISOString(),
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Classic Black", "Warm Taupe", "Deep Forest Green"],
    material: "Scuba Crepe",
    care_instructions: "Dry clean or hand wash cold. Iron on medium heat. Hang immediately to preserve structure.",
    images: [
      RAW.abaya1,
      tf(RAW.abaya1, "c_fill,g_north,ar_2:3,q_auto,f_auto"),
      tf(RAW.abaya1, "c_fill,g_center,ar_1:1,q_auto,f_auto"),
      tf(RAW.abaya1, "e_vibrance:15,e_sharpen:90,q_auto,f_auto"),
    ],
  },
  {
    id: "8",
    name: "Butterfly Sleeve Abaya",
    description: "Named for its dramatic wide sleeves that flutter like wings when in motion, this abaya commands attention the moment you enter a room. The contrast between the structured body and flowing sleeves creates a silhouette that is equal parts graceful and bold. Popular for Eid, weddings, and formal gatherings.",
    price: 4999, originalPrice: 10999, stock_quantity: 10,
    category: "Abayas",
    image_url: RAW.abaya2,
    is_featured: false, created_at: new Date().toISOString(),
    sizes: ["S", "M", "L", "XL"],
    colors: ["Obsidian Black", "Champagne Gold", "Burgundy"],
    material: "Abaya Crepe with Chiffon Sleeves",
    care_instructions: "Dry clean only. Store flat or hanging. Avoid contact with rough surfaces that may snag the chiffon.",
    images: [
      RAW.abaya2,
      tf(RAW.abaya2, "c_fill,g_north,ar_2:3,q_auto,f_auto"),
      tf(RAW.abaya2, "c_fill,g_center,ar_1:1,q_auto,f_auto"),
      tf(RAW.abaya2, "e_vibrance:25,e_sharpen:80,q_auto,f_auto"),
    ],
  },

  // ── NIQABS ──────────────────────────────────────────────────────────────
  {
    id: "9",
    name: "Classic Half Niqab",
    description: "Simple, secure, and supremely comfortable — our classic half niqab is made from a premium nida crepe that lies flat against the face without stiffness. The single elastic band is adjustable and the fabric is breathable enough for all-day wear. Available in black and dark brown.",
    price: 799, originalPrice: 1999, stock_quantity: 55,
    category: "Niqabs",
    image_url: RAW.niqab,
    is_featured: false, created_at: new Date().toISOString(),
    sizes: ["Free Size (adjustable)"],
    colors: ["Classic Black", "Dark Brown"],
    material: "Premium Nida Crepe",
    care_instructions: "Hand wash in cold water with mild detergent. Air dry. Do not tumble dry or iron.",
    images: [
      RAW.niqab,
      tf(RAW.niqab, "c_fill,g_north,ar_3:4,q_auto,f_auto"),
      tf(RAW.niqab, "c_fill,g_center,ar_1:1,q_auto,f_auto"),
      tf(RAW.niqab, "e_sharpen:100,e_vibrance:10,q_auto,f_auto"),
    ],
  },
  {
    id: "10",
    name: "Dubai Style Full Niqab",
    description: "Modelled after the style popular among Emirati women, this full niqab features a double-layered face veil with a separate forehead piece for a neat, well-structured look. The fabric is both lightweight and opaque, ensuring modesty without compromising on breathability.",
    price: 1299, originalPrice: 2999, stock_quantity: 30,
    category: "Niqabs",
    image_url: RAW.niqab,
    is_featured: false, created_at: new Date().toISOString(),
    sizes: ["Free Size (adjustable)"],
    colors: ["Jet Black"],
    material: "Double-Layer Nida Crepe",
    care_instructions: "Hand wash cold. Reshape while damp and air dry flat.",
    images: [
      RAW.niqab,
      tf(RAW.niqab, "c_fill,g_south,ar_3:4,q_auto,f_auto"),
      tf(RAW.niqab, "c_fill,g_center,ar_4:3,q_auto,f_auto"),
      tf(RAW.niqab, "e_auto_brightness,e_sharpen:80,q_auto,f_auto"),
    ],
  },

  // ── OCCASION WEAR ────────────────────────────────────────────
  {
    id: "13",
    name: "Eid Special Embroidered Abaya",
    description: "A celebration-worthy abaya that marries traditional craftsmanship with contemporary silhouette. The chest yoke features intricate hand-embroidered threadwork in gold and ivory — each piece taking over 12 hours to complete. The full-length pleated skirt creates a dramatic sweep when in motion. Limited edition — only 8 pieces made.",
    price: 7999, originalPrice: 16999, stock_quantity: 8,
    category: "Occasion Wear",
    image_url: RAW.abaya2,
    is_featured: true, created_at: new Date().toISOString(),
    sizes: ["S", "M", "L", "XL"],
    colors: ["Midnight Black with Gold Embroidery", "Deep Ivory with Silver Embroidery"],
    material: "Heavy Crepe with Hand Embroidery Thread",
    care_instructions: "Dry clean only. Press with a cool iron through a cloth — never directly on embroidery. Store flat in the garment bag, never folded at the embroidered yoke.",
    images: [
      RAW.abaya2,
      tf(RAW.abaya2, "c_fill,g_north,ar_3:4,q_auto,f_auto"),
      tf(RAW.abaya2, "c_fill,g_center,ar_1:1,q_auto,f_auto"),
      tf(RAW.abaya2, "e_sharpen:80,e_vibrance:22,q_auto,f_auto"),
    ],
  },
  {
    id: "14",
    name: "Walima Kaftan Abaya",
    description: "The Walima deserves something extraordinary. This kaftan-style abaya is cut from a double-layered chiffon that moves like water and photographs beautifully. The wide boat neck, dramatic flared sleeves, and floor-grazing length make it the definitive choice for wedding functions, engagement celebrations, and Eid evenings.",
    price: 5999, originalPrice: 12999, stock_quantity: 12,
    category: "Occasion Wear",
    image_url: RAW.abaya1,
    is_featured: false, created_at: new Date().toISOString(),
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Rose Gold", "Pearl White", "Champagne Gold", "Deep Wine"],
    material: "Double-Layer Luxury Chiffon",
    care_instructions: "Dry clean only. Hang on a wide hanger to maintain shoulder shape. Store away from direct light to preserve colour.",
    images: [
      RAW.abaya1,
      tf(RAW.abaya1, "c_fill,g_north,ar_3:4,q_auto,f_auto"),
      tf(RAW.abaya1, "c_fill,g_south,ar_4:3,q_auto,f_auto"),
      tf(RAW.abaya1, "e_vibrance:25,e_sharpen:70,q_auto,f_auto"),
    ],
  },

  // ── MODEST DRESSES ────────────────────────────────────────────
  {
    id: "15",
    name: "Flowy Maxi Modest Dress",
    description: "The versatile modest dress that effortlessly takes you from morning errands to an evening dinner. A relaxed A-line silhouette in a satin-finish woven fabric ensures comfort throughout the day. The full-length sleeves, high neckline, and ankle-length hemline provide complete coverage without sacrificing elegance. Simply belt it at the waist to define your silhouette.",
    price: 2499, originalPrice: 5999, stock_quantity: 25,
    category: "Modest Dresses",
    image_url: RAW.abaya2,
    is_featured: false, created_at: new Date().toISOString(),
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Slate Blue", "Dusty Rose", "Forest Green", "Warm Ivory", "Plum"],
    material: "Woven Satin-finish Polyester",
    care_instructions: "Hand wash or delicate machine cycle in cold water. Hang to dry. Light steam if needed.",
    images: [
      RAW.abaya2,
      tf(RAW.abaya2, "c_fill,g_north,ar_2:3,q_auto,f_auto"),
      tf(RAW.abaya2, "c_fill,g_center,ar_1:1,q_auto,f_auto"),
      tf(RAW.abaya2, "e_vibrance:30,e_sharpen:80,q_auto,f_auto"),
    ],
  },
  {
    id: "16",
    name: "Linen Modest Shirt Dress",
    description: "Effortless summer dressing, refined. Cut from a premium stonewashed linen blend, this shirt dress is breathable and comfortable enough for a full day of wear. The classic shirt collar, concealed front buttons, and fitted cuffs give it a polished, put-together look that requires no styling effort at all. Our most popular warm-weather piece.",
    price: 1999, originalPrice: 4499, stock_quantity: 35,
    category: "Modest Dresses",
    image_url: RAW.abaya1,
    is_featured: false, created_at: new Date().toISOString(),
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Natural Linen", "Soft White", "Olive", "Terracotta", "Slate"],
    material: "55% Linen, 45% Viscose",
    care_instructions: "Machine wash cold. Tumble dry low or air dry. Linen wrinkles naturally — steam or iron on medium heat. Each wash softens the fabric further.",
    images: [
      RAW.abaya1,
      tf(RAW.abaya1, "c_fill,g_north,ar_3:4,q_auto,f_auto"),
      tf(RAW.abaya1, "c_fill,g_center,ar_4:3,q_auto,f_auto"),
      tf(RAW.abaya1, "e_auto_brightness,e_sharpen:70,q_auto,f_auto"),
    ],
  },

  // ── ACCESSORIES ──────────────────────────────────────────────
  {
    id: "11",
    name: "Hijab Pin & Magnet Set",
    description: "The finishing touch that makes all the difference. Our premium pin and magnet set includes 6 stainless-steel safety pins, 4 magnetic closures, and 2 spiral pins — everything you need for a secure, polished hijab look. Presented in a gold-accented velvet pouch, making it the perfect gift too.",
    price: 499, originalPrice: 1299, stock_quantity: 100,
    category: "Accessories",
    image_url: RAW.acc,
    is_featured: false, created_at: new Date().toISOString(),
    sizes: ["One Size"],
    colors: ["Gold Set", "Silver Set", "Rose Gold Set"],
    material: "Stainless Steel & Alloy",
    care_instructions: "Store in the velvet pouch provided. Keep away from moisture to prevent tarnishing.",
    images: [
      RAW.acc,
      tf(RAW.acc, "c_fill,g_center,ar_1:1,q_auto,f_auto"),
      tf(RAW.acc, "c_fill,g_north,ar_4:3,q_auto,f_auto"),
      tf(RAW.acc, "e_sharpen:90,e_vibrance:20,q_auto,f_auto"),
    ],
  },
  {
    id: "17",
    name: "Embellished Shayla — Eid Edition",
    description: "The hijab you'll save for your most special days. Our Eid Edition Shayla is a luxurious georgette chiffon rectangle hand-embellished with tiny Swarovski-inspired rhinestones along both short edges. Held up to light, the stones catch and scatter a warm glow. Worn on its own, it's understated glamour. Combined with the right abaya, it's breathtaking.",
    price: 1799, originalPrice: 3999, stock_quantity: 20,
    category: "Hijabs",
    image_url: RAW.silk,
    is_featured: false, created_at: new Date().toISOString(),
    sizes: ["Free Size (210 × 75 cm)"],
    colors: ["Ivory with Pearl Stones", "Black with Gold Stones", "Blush with Rose Gold Stones"],
    material: "Georgette Chiffon with Hand-Embellishment",
    care_instructions: "Dry clean only. Store flat in the tissue wrap provided. Do not fold over the embellished edges — roll instead.",
    images: [
      RAW.silk,
      tf(RAW.silk, "c_fill,g_north,ar_3:4,q_auto,f_auto"),
      tf(RAW.silk, "c_fill,g_center,ar_1:1,q_auto,f_auto"),
      tf(RAW.silk, "e_sharpen:100,e_vibrance:30,q_auto,f_auto"),
    ],
  },
  {
    id: "18",
    name: "Velvet Hijab Headband Set",
    description: "The small accessory that makes a big difference. Our velvet headband set keeps your inner hijab neatly in place and stops the dreaded forehead slip. Made from a non-slip velvet that grips firmly but comfortably — no headache, no marks. Each set contains 3 bands in complementary neutral shades. A must-have staple in every hijabi's collection.",
    price: 399, originalPrice: 999, stock_quantity: 150,
    category: "Accessories",
    image_url: RAW.acc,
    is_featured: false, created_at: new Date().toISOString(),
    sizes: ["One Size (adjustable)"],
    colors: ["Set A: Black + Grey + Brown", "Set B: Nude + Beige + White"],
    material: "Non-Slip Velvet",
    care_instructions: "Wipe clean with a damp cloth. Machine wash on delicate if needed. Air dry flat.",
    images: [
      RAW.acc,
      tf(RAW.acc, "c_fill,g_north,ar_3:4,q_auto,f_auto"),
      tf(RAW.acc, "c_fill,g_center,ar_1:1,q_auto,f_auto"),
      tf(RAW.acc, "e_sharpen:80,e_vibrance:18,q_auto,f_auto"),
    ],
  },
  {
    id: "12",
    name: "Satin Underscarves Set (3 pcs)",
    description: "A good undercap is the foundation of a great hijab look. Our satin-lined underscarves keep hair smooth and reduce frizz caused by friction. The wide coverage ensures no hair escapes at the neckline, and the snug-but-not-tight elastic band stays comfortable all day. Set of 3 in complementary neutrals.",
    price: 699, originalPrice: 1599, stock_quantity: 75,
    category: "Accessories",
    image_url: RAW.acc,
    is_featured: false, created_at: new Date().toISOString(),
    sizes: ["One Size (fits all)"],
    colors: ["3-Piece Set: Black + Beige + White"],
    material: "Satin-lined Bamboo Jersey",
    care_instructions: "Machine wash cold, gentle cycle. Air dry. Do not bleach.",
    images: [
      RAW.acc,
      tf(RAW.acc, "c_fill,g_south,ar_1:1,q_auto,f_auto"),
      tf(RAW.acc, "c_fill,g_center,ar_4:3,q_auto,f_auto"),
      tf(RAW.acc, "e_vibrance:25,e_sharpen:70,q_auto,f_auto"),
    ],
  },
];

interface ProductsContextType {
  products: Product[];
  addProduct: (p: Omit<Product, "id" | "created_at">) => void;
  updateProduct: (id: string, p: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  getFeatured: () => Product[];
  getById: (id: string) => Product | undefined;
  getRelated: (id: string, category: string, limit?: number) => Product[];
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: Product[] = JSON.parse(stored);
        return parsed.map(p => {
          const def = DEFAULT_PRODUCTS.find(d => d.id === p.id);
          return {
            sizes: def?.sizes,
            colors: def?.colors,
            material: def?.material,
            care_instructions: def?.care_instructions,
            images: def?.images,
            ...p,
          };
        });
      }
    } catch {}
    return DEFAULT_PRODUCTS;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  }, [products]);

  const addProduct = (p: Omit<Product, "id" | "created_at">) =>
    setProducts(prev => [{ ...p, id: Date.now().toString(), created_at: new Date().toISOString() }, ...prev]);

  const updateProduct = (id: string, updates: Partial<Product>) =>
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));

  const deleteProduct = (id: string) =>
    setProducts(prev => prev.filter(p => p.id !== id));

  const getFeatured = () =>
    products.filter(p => p.is_featured && p.stock_quantity > 0).slice(0, 6);

  const getById = (id: string) => products.find(p => p.id === id);

  const getRelated = (id: string, category: string, limit = 4) =>
    products.filter(p => p.id !== id && p.category === category && p.stock_quantity > 0).slice(0, limit);

  return (
    <ProductsContext.Provider value={{ products, addProduct, updateProduct, deleteProduct, getFeatured, getById, getRelated }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const ctx = useContext(ProductsContext);
  if (!ctx) throw new Error("useProducts must be used inside ProductsProvider");
  return ctx;
};
