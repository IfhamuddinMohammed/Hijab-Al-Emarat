
import { useState, useEffect } from "react";
import { ShoppingBag, Menu, X, Heart, Search } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { useSiteSettings } from "@/contexts/SiteSettingsContext";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const { settings } = useSiteSettings();
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Hijabs", path: "/products?category=hijabs" },
    { name: "Abayas", path: "/products?category=abayas" },
    { name: "Accessories", path: "/products?category=accessories" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <div className="sticky top-0 z-50">
      {/* Announcement Bar */}
      {settings.announcementEnabled && (
        <div className="bg-[#1C0F00] text-cream text-center py-2 px-4 text-xs tracking-widest font-medium uppercase">
          {settings.announcementText}
        </div>
      )}

      {/* Main Header */}
      <header
        className={`bg-white transition-all duration-300 ${
          isScrolled ? "shadow-md border-b border-[#EAD7BB]" : "border-b border-[#F0E8D8]"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <button
              onClick={() => navigate("/")}
              className="flex flex-col items-start group"
            >
              <span className="text-xl md:text-2xl font-serif font-bold text-[#1C0F00] leading-tight group-hover:text-[#D4AF37] transition-colors duration-300">
                {settings.storeName}
              </span>
              <span className="text-[9px] tracking-[0.25em] text-[#D4AF37] font-medium uppercase hidden sm:block">
                {settings.storeTaglineArabic}
              </span>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {menuItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => navigate(item.path)}
                  className="text-[#3D2B1F] hover:text-[#D4AF37] transition-colors duration-200 font-medium text-sm tracking-wide relative group"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-[#D4AF37] group-hover:w-full transition-all duration-300"></span>
                </button>
              ))}
            </nav>

            {/* Icons */}
            <div className="flex items-center space-x-1 md:space-x-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-[#3D2B1F] hover:text-[#D4AF37] hover:bg-[#FDF5E6]"
                onClick={() => navigate("/products")}
              >
                <Search className="h-5 w-5" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/wishlist")}
                className="relative text-[#3D2B1F] hover:text-[#D4AF37] hover:bg-[#FDF5E6]"
              >
                <Heart className="h-5 w-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#D4AF37] text-white text-[9px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
                    {wishlistCount > 9 ? "9+" : wishlistCount}
                  </span>
                )}
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/cart")}
                className="relative text-[#3D2B1F] hover:text-[#D4AF37] hover:bg-[#FDF5E6]"
              >
                <ShoppingBag className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#1C0F00] text-white text-[9px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
                    {cartCount > 9 ? "9+" : cartCount}
                  </span>
                )}
              </Button>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-[#3D2B1F]"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-[#EAD7BB] bg-white">
              <nav className="flex flex-col space-y-1">
                {menuItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => {
                      navigate(item.path);
                      setIsMenuOpen(false);
                    }}
                    className="text-[#3D2B1F] hover:text-[#D4AF37] hover:bg-[#FDF5E6] transition-colors font-medium text-left px-3 py-2.5 rounded-md"
                  >
                    {item.name}
                  </button>
                ))}
              </nav>
            </div>
          )}
        </div>

        {/* Gold accent line */}
        <div className="h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-60"></div>
      </header>
    </div>
  );
};
