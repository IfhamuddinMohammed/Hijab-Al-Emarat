import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { ProductBadges } from "@/components/ProductBadges";
import { SizeChartModal } from "@/components/SizeChartModal";
import { ProductImageZoom } from "@/components/ProductImageZoom";
import { Star, Filter, ShoppingBag, Heart, Search, TrendingUp, Tag } from "lucide-react";


const Products = () => {
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState("all");

  // Set initial category from URL params
  useEffect(() => {
    const categoryFromUrl = searchParams.get('category');
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
    }
  }, [searchParams]);

  const products = [
    {
      id: 1,
      name: "Royal Black Abaya",
      price: "₹4,999",
      originalPrice: "₹6,999",
      category: "abayas",
      images: [
        "https://res.cloudinary.com/df4autxjg/image/upload/v1751634770/Hjb1_bsiwjl.jpg",
        "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=500&fit=crop"
      ],
      rating: 4.8,
      reviews: 24000,
      sizes: ["S", "M", "L", "XL"],
      colors: ["Black", "Navy", "Brown"],
      badges: ["Bestseller", "Premium"],
      fabricFeatures: ["Breathable", "Wrinkle-free"],
      fabric: "Premium Nida",
      inStock: true,
      isNew: false,
      isTrending: true
    },
    {
      id: 2,
      name: "Premium Silk Hijab",
      price: "₹1,299",
      originalPrice: "₹1,799",
      category: "hijabs",
      images: [
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=500&fit=crop"
      ],
      rating: 4.9,
      reviews: 18,
      sizes: ["One Size"],
      colors: ["Black", "White", "Beige", "Navy"],
      badges: ["New Arrival"],
      fabricFeatures: ["Lightweight", "Premium"],
      fabric: "Pure Silk",
      inStock: true,
      isNew: true,
      isTrending: false
    },
    {
      id: 3,
      name: "Elegant Evening Abaya",
      price: "₹7,499",
      originalPrice: "₹9,999",
      category: "abayas",
      images: [
        "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=500&fit=crop"
      ],
      rating: 4.7,
      reviews: 31,
      sizes: ["S", "M", "L", "XL", "XXL"],
      colors: ["Black", "Maroon", "Navy"],
      badges: ["Limited Edition"],
      fabricFeatures: ["Breathable", "Premium"],
      fabric: "Designer Crepe",
      inStock: true,
      isNew: false,
      isTrending: true
    },
    {
      id: 4,
      name: "Luxury Chiffon Scarf",
      price: "₹899",
      originalPrice: "₹1,299",
      category: "scarves",
      images: [
        "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=500&fit=crop"
      ],
      rating: 4.6,
      reviews: 12,
      sizes: ["One Size"],
      colors: ["Pink", "Blue", "Green", "Gold"],
      badges: ["New Arrival"],
      fabricFeatures: ["Lightweight", "Breathable"],
      fabric: "Pure Chiffon",
      inStock: true,
      isNew: true,
      isTrending: false
    }
  ];

  const categories = [
    { value: "all", label: "All Products" },
    { value: "hijabs", label: "Hijabs" },
    { value: "abayas", label: "Abayas" },
    { value: "scarves", label: "Scarves" },
    { value: "accessories", label: "Accessories" }
  ];

  const priceRanges = [
    { value: "all", label: "All Prices" },
    { value: "0-1000", label: "Under ₹1,000" },
    { value: "1000-3000", label: "₹1,000 - ₹3,000" },
    { value: "3000-6000", label: "₹3,000 - ₹6,000" },
    { value: "6000+", label: "₹6,000+" }
  ];

  const filteredProducts = products.filter(product => {
    // Category filter
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    
    // Search filter
    const matchesSearch = searchQuery === "" || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.fabric.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.colors.some(color => color.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Price filter
    let matchesPrice = true;
    if (priceRange !== "all") {
      const price = parseInt(product.price.replace(/[₹,]/g, ''));
      switch (priceRange) {
        case "0-1000":
          matchesPrice = price < 1000;
          break;
        case "1000-3000":
          matchesPrice = price >= 1000 && price < 3000;
          break;
        case "3000-6000":
          matchesPrice = price >= 3000 && price < 6000;
          break;
        case "6000+":
          matchesPrice = price >= 6000;
          break;
      }
    }
    
    return matchesCategory && matchesSearch && matchesPrice;
  });

  const handleWhatsAppOrder = (product: any) => {
    const message = `Hi! I'm interested in the ${product.name} (${product.price}). Can you please provide more details about sizes and colors?`;
    const whatsappUrl = `https://wa.me/971XXXXXXXXX?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleAddToCart = (product: any) => {
    // Placeholder for add to cart functionality
    alert(`${product.name} added to cart!`);
  };

  const handleAddToWishlist = (product: any) => {
    // Placeholder for add to wishlist functionality
    alert(`${product.name} added to wishlist!`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Elegant Page Header */}
      <section className="bg-gradient-to-r from-cream via-sand to-cream py-16 relative overflow-hidden">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-desert text-center mb-6">
            {selectedCategory === "all" ? "Our Collection" : 
             selectedCategory === "hijabs" ? "Hijabs Collection" :
             selectedCategory === "abayas" ? "Abayas Collection" :
             selectedCategory === "scarves" ? "Scarves Collection" :
             "Our Collection"}
          </h1>
          <p className="text-desert-600 text-xl text-center max-w-3xl mx-auto leading-relaxed">
            {selectedCategory === "hijabs" ? "Premium hijabs sourced directly from Dubai's finest fashion houses" :
             "Discover our complete range of premium modest fashion sourced directly from Dubai's finest fashion houses"}
          </p>
        </div>
      </section>

      {/* Enhanced Filters */}
      <section className="py-8 bg-white border-b border-sand shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-desert" />
                <span className="font-medium text-desert">Filters:</span>
              </div>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48 border-sand focus:border-gold">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent className="bg-cream border-gold">
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger className="w-48 border-sand focus:border-gold">
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent className="bg-cream border-gold">
                  {priceRanges.map((range) => (
                    <SelectItem key={range.value} value={range.value}>
                      {range.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-desert-500" />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64 border-sand focus:border-gold"
                />
              </div>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48 border-sand focus:border-gold">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-cream border-gold">
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <div key={product.id} className="group bg-white rounded-xl shadow-elegant hover:shadow-elegant-hover transition-all duration-300 overflow-hidden border border-sand hover:border-gold">
                
                {/* Product Image with Zoom */}
                <div className="relative">
                  <ProductImageZoom images={product.images} productName={product.name} />
                  
                  {/* Status badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {product.isNew && (
                      <span className="bg-gold text-desert px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        NEW
                      </span>
                    )}
                    {product.isTrending && (
                      <span className="bg-desert text-cream px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                        <Tag className="w-3 h-3" />
                        TRENDING
                      </span>
                    )}
                  </div>

                  <Button
                    onClick={() => handleAddToWishlist(product)}
                    className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300"
                    size="icon"
                    variant="ghost"
                  >
                    <Heart className="w-4 h-4 text-desert hover:text-red-500 transition-colors" />
                  </Button>

                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold">
                        Out of Stock
                      </span>
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <h3 className="text-xl font-serif font-semibold text-desert mb-3 group-hover:text-gold transition-colors">
                    {product.name}
                  </h3>
                  
                  {/* Product Badges */}
                  <ProductBadges badges={product.badges} fabricFeatures={product.fabricFeatures} />
                  
                  {/* Rating */}
                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating)
                              ? "text-gold fill-current"
                              : "text-sand"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-desert-600 font-medium">
                      {product.rating} ({product.reviews} reviews)
                    </span>
                  </div>

                  {/* Fabric & Details */}
                  <div className="text-sm text-desert-600 mb-4 space-y-1">
                    <p><span className="font-medium">Fabric:</span> {product.fabric}</p>
                    <p><span className="font-medium">Colors:</span> {product.colors.join(", ")}</p>
                    <p><span className="font-medium">Sizes:</span> {product.sizes.join(", ")}</p>
                  </div>

                  {/* Price */}
                  <div className="flex items-center mb-4">
                    <span className="text-2xl font-bold text-desert font-serif">
                      {product.price}
                    </span>
                    <span className="text-lg text-desert-400 line-through ml-3">
                      {product.originalPrice}
                    </span>
                    <span className="ml-auto bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-semibold">
                      SAVE {Math.round(((parseInt(product.originalPrice.replace(/[₹,]/g, '')) - parseInt(product.price.replace(/[₹,]/g, ''))) / parseInt(product.originalPrice.replace(/[₹,]/g, ''))) * 100)}%
                    </span>
                  </div>

                  {/* Size Chart */}
                  <div className="mb-4">
                    <SizeChartModal />
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <Button
                      className="w-full bg-desert hover:bg-desert-600 text-cream flex items-center justify-center space-x-2 font-semibold py-3"
                      onClick={() => handleAddToCart(product)}
                      disabled={!product.inStock}
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
                    </Button>
                    
                    <Button
                      variant="outline"
                      className="w-full border-2 border-green-600 text-green-600 hover:bg-green-50 font-semibold py-3"
                      onClick={() => handleWhatsAppOrder(product)}
                    >
                      WhatsApp to Order
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-serif font-semibold text-desert mb-2">
                No products found
              </h3>
              <p className="text-desert-600 text-lg">
                Try adjusting your filters or search terms
              </p>
            </div>
          )}
        </div>
      </section>

      <WhatsAppFloat />
      <Footer />
    </div>
  );
};

export default Products;
