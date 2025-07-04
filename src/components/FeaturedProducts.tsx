
import { Button } from "./ui/button";
import { Star } from "lucide-react";

export const FeaturedProducts = () => {
  const featuredProducts = [
    {
      id: 1,
      name: "Royal Black Abaya",
      price: "₹3,999",
      originalPrice: "₹8,999",
      image: "https://res.cloudinary.com/df4autxjg/image/upload/v1751638933/ROYAL_BLACK_ABAYA_hrx8kd.png",
      rating: 4.8,
      reviews: 24000,
      badge: "Bestseller"
    },
    {
      id: 2,
      name: "Premium Silk Hijab",
      price: "₹1,299",
      originalPrice: "₹4,799",
      image: "https://res.cloudinary.com/df4autxjg/image/upload/v1751638940/SILK_a4ceiv.png",
      rating: 4.9,
      reviews: 1800,
      badge: "New Arrival"
    },
    {
      id: 3,
      name: "Elegant Evening Abaya",
      price: "₹4,499",
      originalPrice: "₹9,999",
      image: "https://res.cloudinary.com/df4autxjg/image/upload/v1751634770/Hjb1_bsiwjl.jpg",
      rating: 4.7,
      reviews: 3100,
      badge: "Limited Edition"
    }
  ];

  const handleWhatsAppOrder = (product: any) => {
    const message = `Hi! I'm interested in the ${product.name} (₹${product.price}). Can you please provide more details?`;
    const whatsappUrl = `https://wa.me/971XXXXXXXXX?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-purple-800 mb-4">
            Featured Products
          </h2>
          <p className="text-gray-600 text-lg">
            Handpicked premium pieces from our Dubai collection
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <div key={product.id} className="group relative bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              {/* Badge */}
              <div className="absolute top-4 left-4 z-10">
                <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {product.badge}
                </span>
              </div>

              {/* Product Image */}
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Product Info */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {product.name}
                </h3>
                
                {/* Rating */}
                <div className="flex items-center mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center mb-4">
                  <span className="text-2xl font-bold text-purple-800">
                    {product.price}
                  </span>
                  <span className="text-lg text-gray-500 line-through ml-2">
                    {product.originalPrice}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                    onClick={() => handleWhatsAppOrder(product)}
                  >
                    WhatsApp to Order
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 border-purple-600 text-purple-600 hover:bg-purple-50"
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            size="lg" 
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3"
          >
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
};
