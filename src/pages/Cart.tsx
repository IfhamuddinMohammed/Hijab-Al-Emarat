
import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { AddressForm } from "@/components/AddressForm";
import { PaymentOptions } from "@/components/PaymentOptions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Royal Black Abaya",
      price: 3999,
      quantity: 1,
      size: "M",
      color: "Black",
      image: "https://res.cloudinary.com/df4autxjg/image/upload/v1751634671/hjb2_teldey.jpg"
    },
    {
      id: 2,
      name: "Premium Silk Hijab",
      price: 1299,
      quantity: 2,
      size: "One Size",
      color: "Navy",
      image: "https://res.cloudinary.com/df4autxjg/image/upload/v1751634770/Hjb1_bsiwjl.jpg"
    }
  ]);

  const [currentStep, setCurrentStep] = useState<"cart" | "address" | "payment">("cart");
  const [addressData, setAddressData] = useState(null);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      setCartItems(cartItems.filter(item => item.id !== id));
    } else {
      setCartItems(cartItems.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 5000 ? 0 : 299;
  const total = subtotal + shipping;

  const handleAddressSubmit = (data: any) => {
    setAddressData(data);
    setCurrentStep("payment");
  };

  const handlePaymentSelect = (method: string) => {
    const orderDetails = cartItems.map(item => 
      `${item.name} (${item.color}, ${item.size}) x${item.quantity} - ₹${item.price * item.quantity}`
    ).join('\n');
    
    const addressString = addressData ? 
      `\nDelivery Address:\n${addressData.fullName}\n${addressData.phone}\n${addressData.address}\n${addressData.city}, ${addressData.state} - ${addressData.pincode}` : '';
    
    const locationString = addressData?.location ? 
      `\nLocation: https://maps.google.com/?q=${addressData.location.lat},${addressData.location.lng}` : '';

    if (method === "whatsapp") {
      const message = `Hi! I'd like to place an order:\n\n${orderDetails}\n\nSubtotal: ₹${subtotal}\nShipping: ₹${shipping}\nTotal: ₹${total}${addressString}${locationString}\n\nPlease confirm my order and provide payment details.`;
      const whatsappUrl = `https://wa.me/971582109797?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, "_blank");
    } else {
      // Handle other payment methods
      alert(`Order confirmed! Payment method: ${method.toUpperCase()}\nTotal: ₹${total}\n\nYour order will be processed shortly.`);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8">Add some beautiful pieces to your cart to get started</p>
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
          <h1 className="text-4xl font-bold text-purple-800 text-center mb-4">
            {currentStep === "cart" && "Shopping Cart"}
            {currentStep === "address" && "Delivery Address"}
            {currentStep === "payment" && "Payment Method"}
          </h1>
          <p className="text-gray-600 text-center">
            {currentStep === "cart" && "Review your items and proceed to checkout"}
            {currentStep === "address" && "Enter your delivery address"}
            {currentStep === "payment" && "Choose your preferred payment method"}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {currentStep === "cart" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex flex-col md:flex-row gap-4">
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-32 h-40 object-cover rounded-lg"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-grow">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">
                          {item.name}
                        </h3>
                        <div className="text-sm text-gray-600 mb-4">
                          <p>Color: {item.color}</p>
                          <p>Size: {item.size}</p>
                        </div>
                        <div className="text-2xl font-bold text-purple-800 mb-4">
                          ₹{item.price.toLocaleString()}
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                            <Input
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                              className="w-20 text-center"
                            />
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>

                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-semibold">₹{subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-semibold">
                        {shipping === 0 ? "Free" : `₹${shipping}`}
                      </span>
                    </div>
                    {shipping === 0 && (
                      <p className="text-sm text-green-600">
                        🎉 Free shipping on orders above ₹5,000
                      </p>
                    )}
                    <hr />
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-purple-800">₹{total.toLocaleString()}</span>
                    </div>
                  </div>

                  <Button
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white mb-4"
                    onClick={() => setCurrentStep("address")}
                  >
                    Proceed to Checkout
                  </Button>

                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h3 className="font-semibold text-purple-800 mb-2">Payment Options:</h3>
                    <ul className="text-sm text-purple-700 space-y-1">
                      <li>• Cash on Delivery (COD)</li>
                      <li>• PhonePe & Google Pay</li>
                      <li>• WhatsApp for assistance</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === "address" && (
            <div className="max-w-2xl mx-auto">
              <AddressForm
                onSubmit={handleAddressSubmit}
                onCancel={() => setCurrentStep("cart")}
              />
            </div>
          )}

          {currentStep === "payment" && (
            <div className="max-w-md mx-auto">
              <PaymentOptions
                onPaymentSelect={handlePaymentSelect}
                onBack={() => setCurrentStep("address")}
              />
            </div>
          )}
        </div>
      </section>

      <WhatsAppFloat />
      <Footer />
    </div>
  );
};

export default Cart;
