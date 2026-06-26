import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Shield, ArrowRight, CheckCircle2, Loader2, LogIn } from "lucide-react";

const Login = () => {
  const [email, setEmail]   = useState("");
  const [code, setCode]     = useState("");
  const [step, setStep]     = useState<"email" | "otp" | "done">("email");
  const [error, setError]   = useState("");
  const [loading, setLoading] = useState(false);

  const { signInWithOtp, verifyOtp } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const returnTo = searchParams.get("return") || "/my-orders";

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) { setError("Enter your email address"); return; }
    setLoading(true);
    setError("");
    const { error: err } = await signInWithOtp(email.trim().toLowerCase());
    setLoading(false);
    if (err) { setError(err.message || "Failed to send code. Please try again."); return; }
    setStep("otp");
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length < 6) { setError("Enter the 6-digit code"); return; }
    setLoading(true);
    setError("");
    const { error: err } = await verifyOtp(email.trim().toLowerCase(), code.trim());
    setLoading(false);
    if (err) { setError("Invalid or expired code. Try requesting a new one."); return; }
    setStep("done");
    setTimeout(() => navigate(returnTo, { replace: true }), 1200);
  };

  return (
    <div className="min-h-screen bg-[#FDF5E6]">
      <Header />

      {/* Hero */}
      <div className="bg-[#1C0F00] pt-20 pb-16 text-center relative">
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
        <LogIn className="w-8 h-8 text-[#D4AF37] mx-auto mb-4 opacity-80" />
        <h1 className="text-4xl font-serif font-bold text-white">Sign In</h1>
        <p className="text-white/40 text-sm mt-2 max-w-xs mx-auto">
          We'll send a one-time code to your email — no password needed.
        </p>
      </div>

      <div className="container mx-auto px-4 -mt-6 pb-24 max-w-md">
        <div className="bg-white border border-[#D4AF37]/20 shadow-sm">

          {/* Step tabs */}
          <div className="flex border-b border-[#EAD7BB]">
            {[{ label: "Email", active: true },
              { label: "Verify", active: step === "otp" || step === "done" }].map((s, i) => (
              <div key={i} className={`flex-1 py-3 text-center text-[10px] font-bold uppercase tracking-widest border-b-2 transition-all ${s.active ? "border-[#D4AF37] text-[#D4AF37]" : "border-transparent text-gray-300"}`}>
                <span className="inline-flex items-center gap-1.5">
                  <span className={`w-4 h-4 rounded-full text-[8px] flex items-center justify-center ${s.active ? "bg-[#D4AF37] text-[#1C0F00]" : "bg-gray-100 text-gray-400"}`}>{i + 1}</span>
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          <div className="p-8">

            {/* ── Success ── */}
            {step === "done" && (
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-[#D4AF37] flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-[#1C0F00]" />
                </div>
                <h2 className="font-serif text-2xl font-bold text-[#1C0F00] mb-1">You're in!</h2>
                <p className="text-[#8B4513]/60 text-sm">Redirecting to your account…</p>
              </div>
            )}

            {/* ── Step 1: Email ── */}
            {step === "email" && (
              <form onSubmit={handleSendCode} className="space-y-5">
                <div className="text-center mb-2">
                  <div className="w-14 h-14 bg-[#FDF5E6] border border-[#D4AF37]/20 flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-6 h-6 text-[#D4AF37]" />
                  </div>
                  <h2 className="font-serif text-xl font-bold text-[#1C0F00] mb-1">Enter your email</h2>
                  <p className="text-xs text-[#8B4513]/50">We'll send a 6-digit verification code</p>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">Email Address</label>
                  <Input
                    type="email"
                    value={email}
                    onChange={e => { setEmail(e.target.value); setError(""); }}
                    placeholder="you@example.com"
                    autoFocus
                    className="rounded-none border-gray-200 focus:border-[#D4AF37] focus:ring-0 text-sm h-11"
                  />
                  {error && <p className="text-red-500 text-xs mt-1.5">{error}</p>}
                </div>

                <Button type="submit" disabled={loading}
                  className="w-full bg-[#1C0F00] hover:bg-[#D4AF37] hover:text-[#1C0F00] text-white rounded-none font-bold tracking-wider uppercase text-sm h-11 transition-all duration-300">
                  {loading
                    ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Sending…</>
                    : <>Send Code <ArrowRight className="w-4 h-4 ml-2" /></>}
                </Button>

                <div className="flex items-start gap-3 bg-[#FDF5E6] border border-[#EAD7BB] px-4 py-3">
                  <Shield className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                  <div className="text-xs text-[#8B4513]/70">
                    <p className="font-semibold text-[#1C0F00] mb-0.5">No password required</p>
                    A secure one-time code is sent to your email. Your account is created automatically on first sign-in.
                  </div>
                </div>

                <p className="text-center text-xs text-[#8B4513]/50">
                  Prefer to browse without signing in?{" "}
                  <button type="button" onClick={() => navigate("/")}
                    className="text-[#D4AF37] hover:underline font-semibold">
                    Continue as Guest
                  </button>
                </p>
              </form>
            )}

            {/* ── Step 2: OTP ── */}
            {step === "otp" && (
              <form onSubmit={handleVerify} className="space-y-5">
                <div className="text-center mb-2">
                  <div className="w-14 h-14 bg-[#FDF5E6] border border-[#D4AF37]/20 flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-6 h-6 text-[#D4AF37]" />
                  </div>
                  <h2 className="font-serif text-xl font-bold text-[#1C0F00] mb-1">Enter the code</h2>
                  <p className="text-xs text-[#8B4513]/60 mb-0.5">
                    Code sent to <strong className="text-[#1C0F00]">{email}</strong>
                  </p>
                  <p className="text-xs text-[#8B4513]/40">Check your spam folder if you don't see it.</p>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">6-digit Code</label>
                  <Input
                    type="text"
                    value={code}
                    onChange={e => { setCode(e.target.value.replace(/\D/g, "").slice(0, 6)); setError(""); }}
                    placeholder="000000"
                    autoFocus
                    inputMode="numeric"
                    className="rounded-none border-gray-200 focus:border-[#D4AF37] focus:ring-0 text-center text-3xl font-mono tracking-[0.6em] h-16"
                    maxLength={6}
                  />
                  {error && <p className="text-red-500 text-xs mt-1.5">{error}</p>}
                </div>

                <Button type="submit" disabled={loading || code.length < 6}
                  className="w-full bg-[#1C0F00] hover:bg-[#D4AF37] hover:text-[#1C0F00] text-white rounded-none font-bold tracking-wider uppercase text-sm h-11 transition-all duration-300 disabled:opacity-40">
                  {loading
                    ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Verifying…</>
                    : <>Verify &amp; Sign In <CheckCircle2 className="w-4 h-4 ml-2" /></>}
                </Button>

                <div className="flex items-center justify-between text-xs">
                  <button type="button" onClick={() => { setStep("email"); setCode(""); setError(""); }}
                    className="text-[#8B4513]/50 hover:text-[#D4AF37] transition-colors">
                    ← Wrong email?
                  </button>
                  <button type="button" onClick={handleSendCode} disabled={loading}
                    className="text-[#D4AF37] hover:underline font-semibold disabled:opacity-50">
                    Resend code
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Login;
