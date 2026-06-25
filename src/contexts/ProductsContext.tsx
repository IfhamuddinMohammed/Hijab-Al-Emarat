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
  // optional rich fields
  sizes?: string[];
  colors?: string[];
  material?: string;
  care_instructions?: string;
}

const STORAGE_KEY = "hae_products_v1";

const DEFAULT_PRODUCTS: Product[] = [
  {
    id: "1", name: "Royal Black Abaya",
    description: "Elegant premium abaya crafted from luxurious Nida fabric. Timeless silhouette with subtle embroidery details at the cuffs and hem. A wardrobe essential for every modest fashion lover.",
    price: 3999, originalPrice: 8999, stock_quantity: 30,
    category: "Abayas",
    image_url: "https://res.cloudinary.com/df4autxjg/image/upload/v1751638933/ROYAL_BLACK_ABAYA_hrx8kd.png",
    is_featured: true, created_at: new Date().toISOString(),
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Midnight Navy", "Charcoal"],
    material: "Premium Nida Fabric",
    care_instructions: "Dry clean only. Store hanging to preserve shape. Do not wring or bleach.",
  },
  {
    id: "2", name: "Premium Silk Hijab",
    description: "Ultra-soft silk hijab with a natural sheen. Breathable, wrinkle-resistant, and elegantly draping. Sourced from Dubai's finest textile houses.",
    price: 1299, originalPrice: 4799, stock_quantity: 50,
    category: "Hijabs",
    image_url: "https://res.cloudinary.com/df4autxjg/image/upload/v1751638940/SILK_a4ceiv.png",
    is_featured: true, created_at: new Date().toISOString(),
    sizes: ["Free Size"],
    colors: ["Cream", "Black", "Dusty Rose", "Navy Blue", "Olive"],
    material: "Pure Mulberry Silk",
    care_instructions: "Hand wash in cold water with gentle detergent. Lay flat to dry. Do not tumble dry.",
  },
  {
    id: "3", name: "Elegant Evening Abaya",
    description: "Designed for special occasions — rich fabric, flowing cut, subtle shimmer throughout. Pairs beautifully with statement jewellery.",
    price: 4499, originalPrice: 9999, stock_quantity: 15,
    category: "Abayas",
    image_url: "https://res.cloudinary.com/df4autxjg/image/upload/v1751634770/Hjb1_bsiwjl.jpg",
    is_featured: true, created_at: new Date().toISOString(),
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Deep Burgundy", "Midnight Blue"],
    material: "Chiffon & Crepe Blend",
    care_instructions: "Dry clean recommended. Handle delicate embellishments with care.",
  },
  {
    id: "4", name: "Cotton Jersey Hijab",
    description: "Everyday comfort meets Dubai style. Stretchy, breathable, and perfect for all-day wear. The most popular everyday hijab in our collection.",
    price: 799, originalPrice: 1999, stock_quantity: 80,
    category: "Hijabs",
    image_url: "https://res.cloudinary.com/df4autxjg/image/upload/v1751638474/Hijabs_zoej9q.png",
    is_featured: false, created_at: new Date().toISOString(),
    sizes: ["Free Size"],
    colors: ["Black", "White", "Grey", "Camel", "Olive", "Navy Blue"],
    material: "Premium Cotton Jersey",
    care_instructions: "Machine wash cold, gentle cycle. Tumble dry low. Do not iron directly.",
  },
  {
    id: "5", name: "Classic Niqab",
    description: "A refined niqab in premium crepe fabric. Lightweight, breathable, and designed for all-day elegance.",
    price: 999, originalPrice: 2499, stock_quantity: 40,
    category: "Niqabs",
    image_url: "https://res.cloudinary.com/df4autxjg/image/upload/v1751638483/Niqabs_xwxnxb.png",
    is_featured: false, created_at: new Date().toISOString(),
    sizes: ["Free Size"],
    colors: ["Black", "Dark Brown"],
    material: "Premium Nida Crepe",
    care_instructions: "Hand wash in cold water. Air dry away from direct sunlight.",
  },
  {
    id: "6", name: "Hijab Accessories Set",
    description: "Premium pins, magnets, and underscarves sourced directly from Dubai. Everything you need for a polished look.",
    price: 499, originalPrice: 1299, stock_quantity: 100,
    category: "Accessories",
    image_url: "https://res.cloudinary.com/df4autxjg/image/upload/v1751638633/accessories_ikyfjt.png",
    is_featured: false, created_at: new Date().toISOString(),
    sizes: ["One Size"],
    colors: ["Gold", "Silver", "Rose Gold"],
    material: "Stainless Steel & Fabric",
    care_instructions: "Wipe clean with a soft dry cloth. Store in the pouch provided.",
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
        // Merge in new optional fields for existing products without them
        return parsed.map(p => {
          const def = DEFAULT_PRODUCTS.find(d => d.id === p.id);
          return {
            sizes: def?.sizes,
            colors: def?.colors,
            material: def?.material,
            care_instructions: def?.care_instructions,
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

  const addProduct = (p: Omit<Product, "id" | "created_at">) => {
    const newProduct: Product = { ...p, id: Date.now().toString(), created_at: new Date().toISOString() };
    setProducts(prev => [newProduct, ...prev]);
  };

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
