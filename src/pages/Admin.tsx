import { useState } from "react";
import { useProducts, type Product } from "@/contexts/ProductsContext";
import { useSiteSettings, DEFAULT_SETTINGS, type SiteSettings } from "@/contexts/SiteSettingsContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Package, Plus, Edit2, Trash2, Star, LogOut,
  AlertTriangle, TrendingUp, Eye, X, Settings, CheckCircle2
} from "lucide-react";

const ADMIN_PASSWORD = "hijab2024";
const CATEGORIES = ["Hijabs", "Abayas", "Niqabs", "Accessories", "Modest Dresses", "Occasion Wear"];

const emptyForm = {
  name: "", description: "", price: "", originalPrice: "",
  stock_quantity: "", category: "", image_url: "", is_featured: false,
};

// ─── Settings field helpers ────────────────────────────────────────────────────
const SF = ({
  label, value, onChange, note, placeholder, type = "text", span2 = false,
}: {
  label: string; value: string; onChange: (v: string) => void;
  note?: string; placeholder?: string; type?: string; span2?: boolean;
}) => (
  <div className={span2 ? "md:col-span-2" : ""}>
    <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">{label}</label>
    <Input
      type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
      className="rounded-none border-gray-200 focus:border-[#D4AF37] focus:ring-0 text-sm"
    />
    {note && <p className="text-[10px] text-gray-400 mt-1">{note}</p>}
  </div>
);

const SA = ({
  label, value, onChange, span2 = false,
}: {
  label: string; value: string; onChange: (v: string) => void; span2?: boolean;
}) => (
  <div className={span2 ? "md:col-span-2" : ""}>
    <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">{label}</label>
    <Textarea
      value={value} onChange={e => onChange(e.target.value)} rows={2}
      className="rounded-none border-gray-200 focus:border-[#D4AF37] focus:ring-0 text-sm resize-none"
    />
  </div>
);
// ──────────────────────────────────────────────────────────────────────────────

export default function Admin() {
  const { products, addProduct, updateProduct, deleteProduct, getFeatured } = useProducts();
  const { settings, updateSettings, resetSettings } = useSiteSettings();

  const [authed, setAuthed] = useState(() => sessionStorage.getItem("hae_admin") === "1");
  const [pwInput, setPwInput] = useState("");
  const [pwError, setPwError] = useState(false);
  const [activeTab, setActiveTab] = useState<"products" | "settings">("products");

  // ── Products form state ──────────────────────────────────────────────────
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [formError, setFormError] = useState("");

  // ── Settings form state ──────────────────────────────────────────────────
  const [sf, setSf] = useState<SiteSettings>(() => ({ ...settings }));
  const setSfField = <K extends keyof SiteSettings>(key: K, value: SiteSettings[K]) =>
    setSf(prev => ({ ...prev, [key]: value }));
  const [settingsSaved, setSettingsSaved] = useState(false);

  // ── Auth ─────────────────────────────────────────────────────────────────
  if (!authed) {
    return (
      <div className="min-h-screen bg-[#0E0700] flex items-center justify-center p-4">
        <div className="w-full max-w-sm">
          <div className="h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mb-0" />
          <div className="bg-[#1C0F00] border border-[#D4AF37]/20 p-8">
            <div className="text-center mb-7">
              <div className="w-10 h-10 border border-[#D4AF37]/30 flex items-center justify-center mx-auto mb-4">
                <Package className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <h1 className="text-xl font-serif font-bold text-white">Admin Portal</h1>
              <p className="text-[#D4AF37]/50 text-xs tracking-widest uppercase mt-1">Hijab Al Emarat</p>
            </div>
            <div className="space-y-4">
              <Input
                type="password"
                placeholder="Enter admin password"
                value={pwInput}
                onChange={(e) => { setPwInput(e.target.value); setPwError(false); }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    if (pwInput === ADMIN_PASSWORD) { sessionStorage.setItem("hae_admin", "1"); setAuthed(true); }
                    else setPwError(true);
                  }
                }}
                className={`bg-white/5 border-[#D4AF37]/20 text-white placeholder:text-white/20 rounded-none focus:border-[#D4AF37] focus:ring-0 ${pwError ? "border-red-500" : ""}`}
              />
              {pwError && <p className="text-red-400 text-xs">Incorrect password</p>}
              <Button
                className="w-full bg-[#D4AF37] hover:bg-[#B8972A] text-[#1C0F00] rounded-none font-bold tracking-widest uppercase text-sm h-10"
                onClick={() => {
                  if (pwInput === ADMIN_PASSWORD) { sessionStorage.setItem("hae_admin", "1"); setAuthed(true); }
                  else setPwError(true);
                }}
              >
                Sign In
              </Button>
            </div>
            <p className="text-[#D4AF37]/30 text-[10px] text-center mt-5 tracking-wider">Default password: hijab2024</p>
          </div>
          <div className="h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
        </div>
      </div>
    );
  }

  // ── Product form helpers ─────────────────────────────────────────────────
  const openAdd = () => { setEditingId(null); setForm(emptyForm); setFormError(""); setShowForm(true); };

  const openEdit = (p: Product) => {
    setEditingId(p.id);
    setForm({
      name: p.name, description: p.description,
      price: p.price.toString(), originalPrice: p.originalPrice.toString(),
      stock_quantity: p.stock_quantity.toString(),
      category: p.category, image_url: p.image_url, is_featured: p.is_featured,
    });
    setFormError(""); setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSave = () => {
    if (!form.name.trim()) { setFormError("Product name is required."); return; }
    if (!form.price || isNaN(Number(form.price))) { setFormError("Enter a valid price."); return; }
    if (!form.stock_quantity || isNaN(Number(form.stock_quantity))) { setFormError("Enter a valid stock quantity."); return; }
    const payload = {
      name: form.name.trim(), description: form.description.trim(),
      price: parseFloat(form.price),
      originalPrice: form.originalPrice ? parseFloat(form.originalPrice) : Math.round(parseFloat(form.price) * 1.6),
      stock_quantity: parseInt(form.stock_quantity),
      category: form.category, image_url: form.image_url.trim(), is_featured: form.is_featured,
    };
    if (editingId) updateProduct(editingId, payload); else addProduct(payload);
    setShowForm(false); setEditingId(null); setForm(emptyForm);
  };

  // ── Settings handlers ────────────────────────────────────────────────────
  const handleSaveSettings = () => {
    updateSettings(sf);
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 3000);
  };

  const handleResetSettings = () => {
    if (confirm("Reset all settings to defaults? This cannot be undone.")) {
      resetSettings();
      setSf({ ...DEFAULT_SETTINGS });
    }
  };

  const stats = [
    { label: "Total Products", value: products.length, icon: Package, color: "text-blue-400" },
    { label: "Featured", value: getFeatured().length, icon: Star, color: "text-[#D4AF37]" },
    { label: "Low Stock", value: products.filter(p => p.stock_quantity < 10).length, icon: AlertTriangle, color: "text-red-400" },
    { label: "In Stock", value: products.filter(p => p.stock_quantity > 0).length, icon: TrendingUp, color: "text-green-400" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#1C0F00] border-b border-[#D4AF37]/20 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 border border-[#D4AF37]/30 flex items-center justify-center">
              <Package className="w-3.5 h-3.5 text-[#D4AF37]" />
            </div>
            <div>
              <span className="text-white font-serif font-bold text-sm">Hijab Al Emarat</span>
              <span className="text-[#D4AF37]/40 text-[10px] tracking-widest uppercase ml-2">Admin</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a href="/" target="_blank" rel="noreferrer"
              className="text-[#D4AF37]/50 hover:text-[#D4AF37] text-xs flex items-center gap-1.5 transition-colors">
              <Eye className="w-3 h-3" /> View Store
            </a>
            <button
              onClick={() => { sessionStorage.removeItem("hae_admin"); setAuthed(false); }}
              className="text-[#D4AF37]/50 hover:text-[#D4AF37] text-xs flex items-center gap-1.5 transition-colors"
            >
              <LogOut className="w-3 h-3" /> Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-gray-200 sticky top-14 z-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex">
            {[
              { id: "products" as const, icon: Package, label: "Products" },
              { id: "settings" as const, icon: Settings, label: "Store Settings" },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-3.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${
                  activeTab === tab.id
                    ? "border-[#D4AF37] text-[#1C0F00]"
                    : "border-transparent text-gray-400 hover:text-gray-600"
                }`}
              >
                <tab.icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 py-6">

        {/* ══ PRODUCTS TAB ══════════════════════════════════════════════════ */}
        {activeTab === "products" && (
          <>
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              {stats.map(s => (
                <div key={s.label} className="bg-white border border-gray-200 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">{s.label}</p>
                    <s.icon className={`w-4 h-4 ${s.color}`} />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{s.value}</p>
                </div>
              ))}
            </div>

            {/* Add / Edit Form */}
            {showForm && (
              <div className="bg-white border border-[#D4AF37]/30 p-5 mb-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-serif font-bold text-[#1C0F00] text-base">
                    {editingId ? "Edit Product" : "Add New Product"}
                  </h3>
                  <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">Product Name *</label>
                    <Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      placeholder="e.g. Premium Silk Hijab" className="rounded-none border-gray-200 focus:border-[#D4AF37] focus:ring-0 text-sm" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">Category</label>
                    <Select value={form.category} onValueChange={v => setForm(f => ({ ...f, category: v }))}>
                      <SelectTrigger className="rounded-none border-gray-200 focus:border-[#D4AF37] text-sm h-9">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">
                      Price ({settings.currencySymbol}) *
                    </label>
                    <Input type="number" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
                      placeholder="e.g. 2499" className="rounded-none border-gray-200 focus:border-[#D4AF37] focus:ring-0 text-sm" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">
                      Original Price ({settings.currencySymbol})
                    </label>
                    <Input type="number" value={form.originalPrice} onChange={e => setForm(f => ({ ...f, originalPrice: e.target.value }))}
                      placeholder="Leave blank to auto-calculate" className="rounded-none border-gray-200 focus:border-[#D4AF37] focus:ring-0 text-sm" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">Stock Quantity *</label>
                    <Input type="number" value={form.stock_quantity} onChange={e => setForm(f => ({ ...f, stock_quantity: e.target.value }))}
                      placeholder="e.g. 50" className="rounded-none border-gray-200 focus:border-[#D4AF37] focus:ring-0 text-sm" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">Image URL</label>
                    <Input value={form.image_url} onChange={e => setForm(f => ({ ...f, image_url: e.target.value }))}
                      placeholder="https://res.cloudinary.com/..." className="rounded-none border-gray-200 focus:border-[#D4AF37] focus:ring-0 text-sm" />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">Description</label>
                  <Textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                    rows={2} placeholder="Short product description..." className="rounded-none border-gray-200 focus:border-[#D4AF37] focus:ring-0 text-sm resize-none" />
                </div>

                {form.image_url && (
                  <div className="mb-4">
                    <img src={form.image_url} alt="preview" className="w-20 h-20 object-cover border border-gray-200"
                      onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
                  </div>
                )}

                <div className="flex items-center gap-3 mb-4">
                  <button
                    type="button"
                    onClick={() => setForm(f => ({ ...f, is_featured: !f.is_featured }))}
                    className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold border transition-all ${form.is_featured ? "bg-[#D4AF37] border-[#D4AF37] text-[#1C0F00]" : "bg-white border-gray-200 text-gray-500 hover:border-[#D4AF37]"}`}
                  >
                    <Star className="w-3 h-3" />
                    {form.is_featured ? "Featured ✓" : "Mark as Featured"}
                  </button>
                  <span className="text-[10px] text-gray-400">Featured products show on the homepage</span>
                </div>

                {formError && <p className="text-red-500 text-xs mb-3">{formError}</p>}

                <div className="flex gap-2 border-t border-gray-100 pt-4">
                  <Button onClick={handleSave}
                    className="bg-[#D4AF37] hover:bg-[#B8972A] text-[#1C0F00] rounded-none font-bold text-xs tracking-widest uppercase">
                    {editingId ? "Save Changes" : "Add Product"}
                  </Button>
                  <Button variant="outline" onClick={() => setShowForm(false)} className="rounded-none text-xs">Cancel</Button>
                </div>
              </div>
            )}

            {/* Products Table */}
            <div className="bg-white border border-gray-200">
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                <div>
                  <h2 className="font-serif font-bold text-[#1C0F00]">Products</h2>
                  <p className="text-xs text-gray-400 mt-0.5">{products.length} total · changes save automatically</p>
                </div>
                <Button onClick={openAdd}
                  className="bg-[#1C0F00] hover:bg-[#D4AF37] hover:text-[#1C0F00] text-white rounded-none text-xs font-bold tracking-wider uppercase h-8 px-4 transition-all duration-300">
                  <Plus className="w-3.5 h-3.5 mr-1.5" /> Add Product
                </Button>
              </div>

              {products.length === 0 ? (
                <div className="py-16 text-center text-gray-400 text-sm">No products yet. Click "Add Product" to get started.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-100">
                        {["Image", "Product", "Category", "Price", "Stock", "Featured", "Actions"].map(h => (
                          <th key={h} className="text-left px-4 py-2.5 text-[10px] font-bold uppercase tracking-wider text-gray-400">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {products.map(p => (
                        <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50/80 transition-colors">
                          <td className="px-4 py-3">
                            {p.image_url ? (
                              <img src={p.image_url} alt={p.name} className="w-10 h-10 object-cover"
                                onError={e => { (e.target as HTMLImageElement).src = "https://res.cloudinary.com/df4autxjg/image/upload/v1751638933/ROYAL_BLACK_ABAYA_hrx8kd.png"; }} />
                            ) : (
                              <div className="w-10 h-10 bg-gray-100 flex items-center justify-center">
                                <Package className="w-4 h-4 text-gray-300" />
                              </div>
                            )}
                          </td>
                          <td className="px-4 py-3">
                            <p className="font-semibold text-[#1C0F00] text-sm leading-tight">{p.name}</p>
                            {p.description && <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{p.description}</p>}
                          </td>
                          <td className="px-4 py-3">
                            <span className="text-xs text-[#8B4513] font-medium">{p.category || "—"}</span>
                          </td>
                          <td className="px-4 py-3">
                            <span className="font-bold text-[#D4AF37]">{settings.currencySymbol}{p.price.toLocaleString()}</span>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`text-xs font-bold px-2 py-0.5 ${p.stock_quantity === 0 ? "bg-red-100 text-red-600" : p.stock_quantity < 10 ? "bg-amber-100 text-amber-700" : "bg-green-100 text-green-700"}`}>
                              {p.stock_quantity}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <button
                              onClick={() => updateProduct(p.id, { is_featured: !p.is_featured })}
                              className={`w-7 h-7 flex items-center justify-center border transition-all ${p.is_featured ? "bg-[#D4AF37] border-[#D4AF37] text-white" : "border-gray-200 text-gray-300 hover:border-[#D4AF37]"}`}
                              title={p.is_featured ? "Remove from featured" : "Mark as featured"}
                            >
                              <Star className="w-3.5 h-3.5" />
                            </button>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-1.5">
                              <button onClick={() => openEdit(p)}
                                className="w-7 h-7 border border-gray-200 hover:border-[#D4AF37] hover:text-[#D4AF37] flex items-center justify-center text-gray-400 transition-all">
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => { if (confirm(`Delete "${p.name}"?`)) deleteProduct(p.id); }}
                                className="w-7 h-7 border border-gray-200 hover:border-red-400 hover:text-red-500 flex items-center justify-center text-gray-400 transition-all">
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            <p className="text-center text-xs text-gray-400 mt-4">
              Products are saved in your browser. Visit{" "}
              <a href="/products" className="text-[#D4AF37] underline">/products</a> or{" "}
              <a href="/" className="text-[#D4AF37] underline">homepage</a> to see changes live.
            </p>
          </>
        )}

        {/* ══ SETTINGS TAB ══════════════════════════════════════════════════ */}
        {activeTab === "settings" && (
          <div className="space-y-5">

            {/* Store Information */}
            <div className="bg-white border border-gray-200 p-5">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100">
                <h3 className="font-serif font-bold text-[#1C0F00]">Store Information</h3>
                <span className="text-[10px] text-gray-400 bg-gray-100 px-2 py-0.5">Appears in header, footer & homepage</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SF label="Store Name" value={sf.storeName} onChange={v => setSfField("storeName", v)} placeholder="Hijab Al Emarat" />
                <SF label="Arabic Tagline" value={sf.storeTaglineArabic} onChange={v => setSfField("storeTaglineArabic", v)} placeholder="الحجاب الإماراتي" />
                <SF label="Store Slogan" value={sf.storeSlogan} onChange={v => setSfField("storeSlogan", v)} placeholder="Hijabs that Reflect Light, Faith & Fashion" span2 />
                <SF
                  label="Currency Symbol"
                  value={sf.currencySymbol}
                  onChange={v => setSfField("currencySymbol", v)}
                  placeholder="₹ or AED or $"
                  note="Shown next to all product prices"
                />
                <SA label="About Text (shown in footer)" value={sf.storeAbout} onChange={v => setSfField("storeAbout", v)} span2 />
              </div>
            </div>

            {/* Contact & Social */}
            <div className="bg-white border border-gray-200 p-5">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100">
                <h3 className="font-serif font-bold text-[#1C0F00]">Contact & Social Media</h3>
                <span className="text-[10px] text-gray-400 bg-gray-100 px-2 py-0.5">Used on all Order / WhatsApp buttons</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SF
                  label="WhatsApp Number"
                  value={sf.whatsappNumber}
                  onChange={v => setSfField("whatsappNumber", v)}
                  placeholder="971582109797"
                  note="Digits only — no +, spaces, or dashes"
                />
                <SF
                  label="Phone (display format)"
                  value={sf.phone}
                  onChange={v => setSfField("phone", v)}
                  placeholder="+971 582 109 797"
                  note="How it appears in footer and contact page"
                />
                <SF label="Email Address" value={sf.email} type="email" onChange={v => setSfField("email", v)} placeholder="contact@hijabalemarat.com" />
                <SF label="Address" value={sf.address} onChange={v => setSfField("address", v)} placeholder="Dubai, UAE" />
                <SF label="Instagram URL" value={sf.instagram} type="url" onChange={v => setSfField("instagram", v)} placeholder="https://instagram.com/hijabalemarat" />
                <SF label="Facebook URL" value={sf.facebook} type="url" onChange={v => setSfField("facebook", v)} placeholder="https://facebook.com/hijabalemarat" />
                <SF label="TikTok URL" value={sf.tiktok} type="url" onChange={v => setSfField("tiktok", v)} placeholder="https://tiktok.com/@hijabalemarat" />
              </div>
            </div>

            {/* Hero Banner */}
            <div className="bg-white border border-gray-200 p-5">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100">
                <h3 className="font-serif font-bold text-[#1C0F00]">Hero Banner</h3>
                <span className="text-[10px] text-gray-400 bg-gray-100 px-2 py-0.5">The large image section at the top of the homepage</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SF label="Badge Text (small label above title)" value={sf.heroBadgeText} onChange={v => setSfField("heroBadgeText", v)} placeholder="Dubai's Finest Modest Fashion" />
                <SF label="Primary Button Text" value={sf.heroCtaPrimary} onChange={v => setSfField("heroCtaPrimary", v)} placeholder="Explore Collection" />
                <SF label="Main Tagline" value={sf.heroSubtitle} onChange={v => setSfField("heroSubtitle", v)} placeholder="Hijabs that Reflect Light, Faith & Fashion" span2 />
                <SA label="Description Paragraph" value={sf.heroBodyText} onChange={v => setSfField("heroBodyText", v)} span2 />
                <SF label="Background Image URL" value={sf.heroBgImage} type="url" onChange={v => setSfField("heroBgImage", v)} placeholder="https://res.cloudinary.com/..." span2 />
                {sf.heroBgImage && (
                  <div className="md:col-span-2">
                    <img
                      src={sf.heroBgImage} alt="Hero preview"
                      className="h-28 object-cover border border-gray-200"
                      onError={e => { (e.target as HTMLImageElement).style.display = "none"; }}
                    />
                    <p className="text-[10px] text-gray-400 mt-1">Background image preview</p>
                  </div>
                )}
              </div>
            </div>

            {/* Announcement Bar */}
            <div className="bg-white border border-gray-200 p-5">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100">
                <h3 className="font-serif font-bold text-[#1C0F00]">Announcement Bar</h3>
                <span className="text-[10px] text-gray-400 bg-gray-100 px-2 py-0.5">The dark strip at the very top of every page</span>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSfField("announcementEnabled", !sf.announcementEnabled)}
                    className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold border transition-all ${sf.announcementEnabled ? "bg-[#D4AF37] border-[#D4AF37] text-[#1C0F00]" : "bg-white border-gray-200 text-gray-500 hover:border-[#D4AF37]"}`}
                  >
                    {sf.announcementEnabled ? "Visible ✓" : "Hidden"}
                  </button>
                  <span className="text-[10px] text-gray-400">Show or hide the announcement bar on all pages</span>
                </div>
                <div className="max-w-2xl">
                  <SF label="Announcement Text" value={sf.announcementText} onChange={v => setSfField("announcementText", v)} placeholder="Free Shipping · Authentic Dubai Collection · Premium Quality" />
                </div>
              </div>
            </div>

            {/* Save Bar */}
            <div className="flex items-center gap-4 bg-white border border-gray-200 p-4">
              <Button
                onClick={handleSaveSettings}
                className={`rounded-none font-bold text-xs tracking-widest uppercase transition-all ${
                  settingsSaved
                    ? "bg-green-600 hover:bg-green-700 text-white"
                    : "bg-[#D4AF37] hover:bg-[#B8972A] text-[#1C0F00]"
                }`}
              >
                {settingsSaved
                  ? <><CheckCircle2 className="w-3.5 h-3.5 mr-1.5 inline" />Settings Saved!</>
                  : "Save All Settings"}
              </Button>
              <span className="text-xs text-gray-400">Changes appear on the storefront immediately after saving.</span>
              <button
                onClick={handleResetSettings}
                className="ml-auto text-[10px] text-red-400 hover:text-red-600 transition-colors underline"
              >
                Reset to defaults
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
