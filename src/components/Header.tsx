
import { useState, useEffect, useRef } from "react";
import { ShoppingBag, Menu, X, Heart, Search, User, LogOut, Package } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { useSiteSettings } from "@/contexts/SiteSettingsContext";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useAuth } from "@/contexts/AuthContext";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { settings } = useSiteSettings();
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (searchOpen) setTimeout(() => searchRef.current?.focus(), 80);
  }, [searchOpen]);

  // Close search on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") { setSearchOpen(false); setSearchQuery(""); setUserMenuOpen(false); } };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  // Close user menu on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) setUserMenuOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setSearchOpen(false);
    }
  };

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
      <header className={`bg-white transition-all duration-300 ${isScrolled ? "shadow-md border-b border-[#EAD7BB]" : "border-b border-[#F0E8D8]"}`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <button onClick={() => navigate("/")} className="flex flex-col items-start group">
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
                <button key={item.name} onClick={() => navigate(item.path)}
                  className="text-[#3D2B1F] hover:text-[#D4AF37] transition-colors duration-200 font-medium text-sm tracking-wide relative group">
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-[#D4AF37] group-hover:w-full transition-all duration-300" />
                </button>
              ))}
            </nav>

            {/* Icons */}
            <div className="flex items-center space-x-1 md:space-x-2">
              <Button variant="ghost" size="icon"
                className={`transition-colors ${searchOpen ? "text-[#D4AF37] bg-[#FDF5E6]" : "text-[#3D2B1F] hover:text-[#D4AF37] hover:bg-[#FDF5E6]"}`}
                onClick={() => { setSearchOpen(o => !o); if (searchOpen) setSearchQuery(""); }}>
                {searchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
              </Button>

              <Button variant="ghost" size="icon" onClick={() => navigate("/wishlist")}
                className="relative text-[#3D2B1F] hover:text-[#D4AF37] hover:bg-[#FDF5E6]">
                <Heart className="h-5 w-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#D4AF37] text-white text-[9px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
                    {wishlistCount > 9 ? "9+" : wishlistCount}
                  </span>
                )}
              </Button>

              <Button variant="ghost" size="icon" onClick={() => navigate("/cart")}
                className="relative text-[#3D2B1F] hover:text-[#D4AF37] hover:bg-[#FDF5E6]">
                <ShoppingBag className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#1C0F00] text-white text-[9px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
                    {cartCount > 9 ? "9+" : cartCount}
                  </span>
                )}
              </Button>

              {/* User / Login */}
              {user ? (
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setUserMenuOpen(o => !o)}
                    className="w-8 h-8 bg-[#1C0F00] hover:bg-[#D4AF37] text-[#D4AF37] hover:text-[#1C0F00] font-bold text-xs flex items-center justify-center transition-colors flex-shrink-0"
                    title={user.email ?? "My Account"}
                  >
                    {(user.email?.[0] ?? "U").toUpperCase()}
                  </button>
                  {userMenuOpen && (
                    <div className="absolute right-0 top-10 w-48 bg-white border border-[#EAD7BB] shadow-lg z-50">
                      <div className="px-3 py-2.5 border-b border-[#EAD7BB]">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-[#8B4513]/50 mb-0.5">Signed in as</p>
                        <p className="text-xs font-semibold text-[#1C0F00] truncate">{user.email}</p>
                      </div>
                      <button
                        onClick={() => { navigate("/my-orders"); setUserMenuOpen(false); }}
                        className="w-full text-left px-3 py-2.5 text-sm text-[#3D2B1F] hover:bg-[#FDF5E6] flex items-center gap-2 transition-colors"
                      >
                        <Package className="w-3.5 h-3.5 text-[#D4AF37]" /> My Orders
                      </button>
                      <button
                        onClick={() => { signOut(); setUserMenuOpen(false); setIsMenuOpen(false); }}
                        className="w-full text-left px-3 py-2.5 text-sm text-red-500 hover:bg-red-50 flex items-center gap-2 transition-colors border-t border-[#EAD7BB]"
                      >
                        <LogOut className="w-3.5 h-3.5" /> Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Button variant="ghost" size="icon" onClick={() => navigate("/login")}
                  className="text-[#3D2B1F] hover:text-[#D4AF37] hover:bg-[#FDF5E6]" title="Sign In">
                  <User className="h-5 w-5" />
                </Button>
              )}

              <Button variant="ghost" size="icon" className="md:hidden text-[#3D2B1F]"
                onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-[#EAD7BB] bg-white">
              <nav className="flex flex-col space-y-1">
                {menuItems.map((item) => (
                  <button key={item.name}
                    onClick={() => { navigate(item.path); setIsMenuOpen(false); }}
                    className="text-[#3D2B1F] hover:text-[#D4AF37] hover:bg-[#FDF5E6] transition-colors font-medium text-left px-3 py-2.5 rounded-md">
                    {item.name}
                  </button>
                ))}
                <div className="border-t border-[#EAD7BB] pt-2 mt-1">
                  {user ? (
                    <>
                      <button onClick={() => { navigate("/my-orders"); setIsMenuOpen(false); }}
                        className="w-full text-left flex items-center gap-2 text-[#3D2B1F] hover:text-[#D4AF37] hover:bg-[#FDF5E6] transition-colors font-medium px-3 py-2.5 rounded-md text-sm">
                        <Package className="w-4 h-4" /> My Orders
                      </button>
                      <button onClick={() => { signOut(); setIsMenuOpen(false); }}
                        className="w-full text-left flex items-center gap-2 text-red-500 hover:bg-red-50 transition-colors font-medium px-3 py-2.5 rounded-md text-sm">
                        <LogOut className="w-4 h-4" /> Sign Out
                      </button>
                    </>
                  ) : (
                    <button onClick={() => { navigate("/login"); setIsMenuOpen(false); }}
                      className="w-full text-left flex items-center gap-2 text-[#3D2B1F] hover:text-[#D4AF37] hover:bg-[#FDF5E6] transition-colors font-medium px-3 py-2.5 rounded-md text-sm">
                      <User className="w-4 h-4" /> Sign In
                    </button>
                  )}
                </div>
              </nav>
            </div>
          )}
        </div>

        {/* Gold accent line */}
        <div className="h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-60" />
      </header>

      {/* ── Search bar — drops below header, does NOT replace it ── */}
      <div className={`bg-white border-b border-[#EAD7BB] shadow-lg transition-all duration-300 overflow-hidden ${searchOpen ? "max-h-20 opacity-100" : "max-h-0 opacity-0 pointer-events-none"}`}>
        <form onSubmit={handleSearch} className="container mx-auto px-4 py-3 flex items-center gap-3">
          <Search className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
          <input
            ref={searchRef}
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search hijabs, abayas, accessories…"
            className="flex-1 bg-transparent text-[#1C0F00] placeholder:text-[#8B4513]/40 text-sm focus:outline-none"
          />
          {searchQuery && (
            <button type="button" onClick={() => setSearchQuery("")}
              className="text-[#8B4513]/40 hover:text-[#8B4513] transition-colors">
              <X className="w-4 h-4" />
            </button>
          )}
          <button type="submit"
            className="bg-[#1C0F00] hover:bg-[#D4AF37] hover:text-[#1C0F00] text-white px-5 h-9 text-xs font-bold uppercase tracking-wider transition-all flex-shrink-0">
            Search
          </button>
        </form>
      </div>

      {/* Backdrop — clicking outside closes search */}
      {searchOpen && (
        <div className="fixed inset-0 z-[-1]" onClick={() => { setSearchOpen(false); setSearchQuery(""); }} />
      )}
    </div>
  );
};
