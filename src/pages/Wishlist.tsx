
import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: "Royal Black Abaya",
      price: 4999,
      originalPrice: 6999,
      image: "https://res.cloudinary.com/df4autxjg/image/upload/v1751638933/ROYAL_BLACK_ABAYA_hrx8kd.png",
      colors: ["Black", "Navy", "Brown"],
      sizes: ["S", "M", "L", "XL"]
    },
    {
      id: 3,
      name: "Elegant Evening Abaya",
      price: 7499,
      originalPrice: 9999,
      image: "https://res.cloudinary.com/df4autxjg/image/upload/v1751634770/Hjb1_bsiwjl.jpg",
      colors: ["Black", "Maroon", "Peach"],
      sizes: ["S", "M", "L", "XL", "XXL"]
    }
  ]);

  const removeFromWishlist = (id: number) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== id));
  };

  const handleAddToCart = (product: any) => {
    alert(`${product.name} added to cart!`);
  };

  const handleWhatsAppOrder = (product: any) => {
    const message = `Hi! I'm interested in the ${product.name} from my wishlist (₹${product.price.toLocaleString()}). Can you please provide more details?`;
    const whatsappUrl = `https://wa.me/971582109797?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <Heart className="w-24 h-24 text-gray-300 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Your Wishlist is Empty</h1>
          <p className="text-gray-600 mb-8">Save items you love to your wishlist</p>
          <Button
            className="bg-purple-600 hover:bg-purple-700 text-white"
            onClick={() => window.location.href = "/products"}
          >
            Continue Shopping
          </Button>
        </div>
        <WhatsAppFloat />
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Page Header */}
      <section className="bg-purple-100 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-purple-800 text-center mb-4 flex items-center justify-center space-x-3">
            <Heart className="w-10 h-10 text-red-500" />
            <span>My Wishlist</span>
          </h1>
          <p className="text-gray-600 text-center">
            Your saved items ({wishlistItems.length} item{wishlistItems.length !== 1 ? 's' : ''})
          </p>
        </div>
      </section>

      {/* Wishlist Items */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {wishlistItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                {/* Product Image */}
                <div className="aspect-[3/4] overflow-hidden relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                  <Button
                    onClick={() => removeFromWishlist(item.id)}
                    className="absolute top-3 right-3 p-2 bg-red-500 hover:bg-red-600 text-white rounded-full"
                    size="icon"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {item.name}
                  </h3>
                  
                  {/* Colors & Sizes */}
                  <div className="text-sm text-gray-600 mb-3">
                    <p>Colors: {item.colors.join(", ")}</p>
                    <p>Sizes: {item.sizes.join(", ")}</p>
                  </div>

                  {/* Price */}
                  <div className="flex items-center mb-4">
                    <span className="text-xl font-bold text-purple-800">
                      ₹{item.price.toLocaleString()}
                    </span>
                    <span className="text-sm text-gray-500 line-through ml-2">
                      ₹{item.originalPrice.toLocaleString()}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2">
                    <Button
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center space-x-2"
                      onClick={() => handleAddToCart(item)}
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Cart</span>
                    </Button>
                    
                    <Button
                      variant="outline"
                      className="w-full border-green-600 text-green-600 hover:bg-green-50"
                      onClick={() => handleWhatsAppOrder(item)}
                    >
                      WhatsApp to Order
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WhatsAppFloat />
      <Footer />
    </div>
  );
};

export default Wishlist;
