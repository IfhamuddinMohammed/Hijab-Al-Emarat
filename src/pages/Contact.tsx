
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, Phone, Mail, MapPin, Clock, Instagram } from "lucide-react";

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const whatsappMsg = "Hi! I've submitted a contact form on your website. Please get in touch!";
    window.open(`https://wa.me/971582109797?text=${encodeURIComponent(whatsappMsg)}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#FDF5E6]">
      <Header />

      {/* Page Header */}
      <section className="bg-[#1C0F00] py-14 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-60" />
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="h-[1px] w-10 bg-[#D4AF37]" />
            <span className="text-[#D4AF37] text-xs tracking-[0.3em] font-medium uppercase">Get In Touch</span>
            <div className="h-[1px] w-10 bg-[#D4AF37]" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-3">Contact Us</h1>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            We're here to help! Reach out through any channel below
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Methods */}
            <div>
              <h2 className="text-3xl font-serif font-bold text-[#1C0F00] mb-8">Reach Us</h2>

              <div className="space-y-6">
                {/* WhatsApp */}
                <div className="flex items-start gap-4 p-5 border border-[#EAD7BB] hover:border-[#D4AF37] transition-colors group">
                  <div className="w-10 h-10 bg-[#25D366]/10 flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-5 h-5 text-[#25D366]" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-[#1C0F00] mb-1">WhatsApp (Preferred)</h3>
                    <p className="text-[#8B4513]/60 text-sm mb-3">For quick responses and instant product inquiries</p>
                    <Button
                      className="bg-[#25D366] hover:bg-[#1da851] text-white text-sm font-medium rounded-none"
                      onClick={() => window.open("https://wa.me/971582109797", "_blank")}
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Chat on WhatsApp
                    </Button>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4 p-5 border border-[#EAD7BB] hover:border-[#D4AF37] transition-colors">
                  <div className="w-10 h-10 bg-[#D4AF37]/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-[#1C0F00] mb-1">Phone</h3>
                    <p className="text-[#8B4513]/70 text-sm">+971 582 109 797 (UAE)</p>
                    <p className="text-[#8B4513]/70 text-sm">+91 8686 850 232 (India)</p>
                    <p className="text-[#8B4513]/40 text-xs mt-1">Available: 9 AM – 8 PM GST</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4 p-5 border border-[#EAD7BB] hover:border-[#D4AF37] transition-colors">
                  <div className="w-10 h-10 bg-[#D4AF37]/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-[#1C0F00] mb-1">Email</h3>
                    <p className="text-[#8B4513]/70 text-sm">contact.hijabialemarat@gmail.com</p>
                    <p className="text-[#8B4513]/40 text-xs mt-1">We'll respond within 24 hours</p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-4 p-5 border border-[#EAD7BB] hover:border-[#D4AF37] transition-colors">
                  <div className="w-10 h-10 bg-[#D4AF37]/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-[#1C0F00] mb-1">Location</h3>
                    <p className="text-[#8B4513]/70 text-sm">Dubai, United Arab Emirates</p>
                    <p className="text-[#8B4513]/40 text-xs mt-1">Serving customers across all India</p>
                  </div>
                </div>

                {/* Social */}
                <div className="flex items-start gap-4 p-5 border border-[#EAD7BB] hover:border-[#D4AF37] transition-colors">
                  <div className="w-10 h-10 bg-[#D4AF37]/10 flex items-center justify-center flex-shrink-0">
                    <Instagram className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-[#1C0F00] mb-1">Follow Us</h3>
                    <p className="text-[#8B4513]/60 text-sm mb-2">Stay updated with our latest collections</p>
                    <Button variant="outline" size="sm" className="border-[#EAD7BB] hover:border-[#D4AF37] text-[#8B4513] rounded-none text-xs">
                      <Instagram className="w-3 h-3 mr-2" />
                      Instagram
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-[#FDF5E6] p-8 border border-[#EAD7BB]">
              <h2 className="text-3xl font-serif font-bold text-[#1C0F00] mb-6">Send a Message</h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-xs font-semibold text-[#8B4513] tracking-wider uppercase mb-2">
                    Full Name *
                  </label>
                  <Input
                    id="name"
                    type="text"
                    required
                    placeholder="Enter your full name"
                    className="rounded-none border-[#EAD7BB] focus:border-[#D4AF37] focus:ring-0 bg-white"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-semibold text-[#8B4513] tracking-wider uppercase mb-2">
                    Email Address *
                  </label>
                  <Input
                    id="email"
                    type="email"
                    required
                    placeholder="Enter your email address"
                    className="rounded-none border-[#EAD7BB] focus:border-[#D4AF37] focus:ring-0 bg-white"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-xs font-semibold text-[#8B4513] tracking-wider uppercase mb-2">
                    Phone Number
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Your phone number"
                    className="rounded-none border-[#EAD7BB] focus:border-[#D4AF37] focus:ring-0 bg-white"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-xs font-semibold text-[#8B4513] tracking-wider uppercase mb-2">
                    Subject *
                  </label>
                  <Input
                    id="subject"
                    type="text"
                    required
                    placeholder="What's this about?"
                    className="rounded-none border-[#EAD7BB] focus:border-[#D4AF37] focus:ring-0 bg-white"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-semibold text-[#8B4513] tracking-wider uppercase mb-2">
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    required
                    rows={5}
                    placeholder="Tell us how we can help you..."
                    className="rounded-none border-[#EAD7BB] focus:border-[#D4AF37] focus:ring-0 bg-white resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#1C0F00] hover:bg-[#D4AF37] hover:text-[#1C0F00] text-white rounded-none font-semibold tracking-wider uppercase text-sm h-11 transition-all duration-300"
                >
                  Send Message
                </Button>

                <p className="text-xs text-[#8B4513]/40 text-center">
                  For faster responses, consider reaching out via WhatsApp
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Business Hours */}
      <section className="py-12 bg-[#FDF5E6] border-t border-[#EAD7BB]">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-md mx-auto">
            <div className="w-12 h-12 border border-[#D4AF37]/30 flex items-center justify-center mx-auto mb-4">
              <Clock className="w-5 h-5 text-[#D4AF37]" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-[#1C0F00] mb-6">Business Hours</h3>
            <div className="space-y-1">
              <div className="flex justify-between py-3 border-b border-[#EAD7BB]">
                <span className="text-[#8B4513]/60 text-sm">Monday – Saturday</span>
                <span className="font-semibold text-[#1C0F00] text-sm">9:00 AM – 8:00 PM GST</span>
              </div>
              <div className="flex justify-between py-3">
                <span className="text-[#8B4513]/60 text-sm">Sunday</span>
                <span className="font-semibold text-[#1C0F00] text-sm">10:00 AM – 6:00 PM GST</span>
              </div>
            </div>
            <p className="text-xs text-[#8B4513]/40 mt-4">
              WhatsApp messages are usually answered within minutes during business hours
            </p>
          </div>
        </div>
      </section>

      <WhatsAppFloat />
      <Footer />
    </div>
  );
};

export default Contact;
