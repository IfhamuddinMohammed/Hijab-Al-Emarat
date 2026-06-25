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
}

const STORAGE_KEY = "hae_products_v1";

const DEFAULT_PRODUCTS: Product[] = [
  {
    id: "1", name: "Royal Black Abaya",
    description: "Elegant premium abaya crafted from luxurious Nida fabric. Timeless silhouette with subtle embroidery.",
    price: 3999, originalPrice: 8999, stock_quantity: 30,
    category: "Abayas",
    image_url: "https://res.cloudinary.com/df4autxjg/image/upload/v1751638933/ROYAL_BLACK_ABAYA_hrx8kd.png",
    is_featured: true, created_at: new Date().toISOString(),
  },
  {
    id: "2", name: "Premium Silk Hijab",
    description: "Ultra-soft silk hijab with a natural sheen. Breathable, wrinkle-resistant, and elegantly draping.",
    price: 1299, originalPrice: 4799, stock_quantity: 50,
    category: "Hijabs",
    image_url: "https://res.cloudinary.com/df4autxjg/image/upload/v1751638940/SILK_a4ceiv.png",
    is_featured: true, created_at: new Date().toISOString(),
  },
  {
    id: "3", name: "Elegant Evening Abaya",
    description: "Designed for special occasions — rich fabric, flowing cut, subtle shimmer throughout.",
    price: 4499, originalPrice: 9999, stock_quantity: 15,
    category: "Abayas",
    image_url: "https://res.cloudinary.com/df4autxjg/image/upload/v1751634770/Hjb1_bsiwjl.jpg",
    is_featured: true, created_at: new Date().toISOString(),
  },
  {
    id: "4", name: "Cotton Jersey Hijab",
    description: "Everyday comfort meet Dubai style. Stretchy, breathable, and perfect for all-day wear.",
    price: 799, originalPrice: 1999, stock_quantity: 80,
    category: "Hijabs",
    image_url: "https://res.cloudinary.com/df4autxjg/image/upload/v1751638474/Hijabs_zoej9q.png",
    is_featured: false, created_at: new Date().toISOString(),
  },
  {
    id: "5", name: "Classic Niqab",
    description: "A refined niqab in premium crepe fabric. Available in multiple colors.",
    price: 999, originalPrice: 2499, stock_quantity: 40,
    category: "Niqabs",
    image_url: "https://res.cloudinary.com/df4autxjg/image/upload/v1751638483/Niqabs_xwxnxb.png",
    is_featured: false, created_at: new Date().toISOString(),
  },
  {
    id: "6", name: "Hijab Accessories Set",
    description: "Premium pins, magnets, and underscarves sourced directly from Dubai.",
    price: 499, originalPrice: 1299, stock_quantity: 100,
    category: "Accessories",
    image_url: "https://res.cloudinary.com/df4autxjg/image/upload/v1751638633/accessories_ikyfjt.png",
    is_featured: false, created_at: new Date().toISOString(),
  },
];

interface ProductsContextType {
  products: Product[];
  addProduct: (p: Omit<Product, "id" | "created_at">) => void;
  updateProduct: (id: string, p: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  getFeatured: () => Product[];
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch {}
    return DEFAULT_PRODUCTS;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  }, [products]);

  const addProduct = (p: Omit<Product, "id" | "created_at">) => {
    const newProduct: Product = {
      ...p,
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
    };
    setProducts((prev) => [newProduct, ...prev]);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const getFeatured = () =>
    products.filter((p) => p.is_featured && p.stock_quantity > 0).slice(0, 6);

  return (
    <ProductsContext.Provider value={{ products, addProduct, updateProduct, deleteProduct, getFeatured }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const ctx = useContext(ProductsContext);
  if (!ctx) throw new Error("useProducts must be used inside ProductsProvider");
  return ctx;
};
