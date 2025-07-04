
import { Instagram, Facebook, Mail, Phone, MapPin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-purple-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">Hijabi Al Emarat</h3>
            <p className="text-purple-200 mb-4 max-w-md">
              Hijabs that Reflect Light, Faith & Fashion. Bringing the finest collection 
              of hijabs, abayas, and modest fashion from Dubai to India.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-purple-200 hover:text-yellow-300 transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-purple-200 hover:text-yellow-300 transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/products" className="text-purple-200 hover:text-yellow-300 transition-colors">All Products</a></li>
              <li><a href="/products?category=hijabs" className="text-purple-200 hover:text-yellow-300 transition-colors">Hijabs</a></li>
              <li><a href="/products?category=abayas" className="text-purple-200 hover:text-yellow-300 transition-colors">Abayas</a></li>
              <li><a href="/about" className="text-purple-200 hover:text-yellow-300 transition-colors">About Us</a></li>
              <li><a href="/contact" className="text-purple-200 hover:text-yellow-300 transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-purple-300" />
                <span className="text-purple-200">+971 582109797</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-purple-300" />
                <span className="text-purple-200 text-xs">contact.hijabialemarat@gmail.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-purple-300 mt-1" />
                <span className="text-purple-200">Dubai, UAE<br />Delivering across India</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-purple-800 mt-8 pt-8 text-center">
          <p className="text-purple-200">
            © 2024 Hijabi Al Emarat. All rights reserved. | Hijabs that Reflect Light, Faith & Fashion
          </p>
        </div>
      </div>
    </footer>
  );
};
