
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { Heart, Globe, Shield, Truck } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Our Story</h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed">
            Bringing Dubai's finest modest fashion to India with love, quality, and cultural respect
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-purple-800 mb-6">Our Mission</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-semibold text-purple-800 mb-6">
                  Bridging Cultures Through Fashion
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Based in the heart of Dubai, we understand the elegance and sophistication 
                  that comes with authentic Middle Eastern modest fashion. Our journey began 
                  with a simple vision: to make premium Dubai fashion accessible to our 
                  sisters in India.
                </p>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Every piece in our collection is carefully selected from Dubai's finest 
                  boutiques and ateliers, ensuring that you receive nothing but the highest 
                  quality fabrics, impeccable craftsmanship, and timeless designs.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  We believe modest fashion should be beautiful, comfortable, and accessible. 
                  That's why we've made it our mission to bring you authentic Dubai elegance 
                  right to your doorstep in India.
                </p>
              </div>
              <div className="text-center">
                <img
                  src="https://res.cloudinary.com/df4autxjg/image/upload/v1751639266/Mission_o0rwu0.png"
                  alt="Dubai Fashion"
                  className="rounded-lg shadow-lg mx-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-purple-800 mb-4">Why Choose Dubai Elegance?</h2>
            <p className="text-gray-600 text-lg">Our commitment to excellence in every aspect</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-purple-800 mb-3">Authentic Quality</h3>
              <p className="text-gray-600">
                Every piece is sourced directly from Dubai's premium fashion houses, 
                ensuring authentic quality and craftsmanship.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-purple-800 mb-3">Cultural Respect</h3>
              <p className="text-gray-600">
                We understand and honor the cultural significance of modest fashion, 
                bringing you pieces that celebrate tradition with modern elegance.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-purple-800 mb-3">Trust & Safety</h3>
              <p className="text-gray-600">
                Secure transactions, quality assurance, and customer protection 
                are our top priorities for your peace of mind.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-purple-800 mb-3">Fast Delivery</h3>
              <p className="text-gray-600">
                Quick and reliable delivery across India, with cash on delivery 
                options for your convenience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-purple-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Experience Dubai Elegance?</h2>
          <p className="text-purple-200 text-lg mb-8 max-w-2xl mx-auto">
            Connect with us on WhatsApp for personalized assistance, styling advice, 
            or to place your order directly.
          </p>
          <button
            onClick={() => window.open("https://wa.me/971XXXXXXXXX", "_blank")}
            className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-300"
          >
            Chat with Us on WhatsApp
          </button>
        </div>
      </section>

      <WhatsAppFloat />
      <Footer />
    </div>
  );
};

export default About;
