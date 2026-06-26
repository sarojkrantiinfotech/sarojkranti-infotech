"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Send, MessageSquare } from "lucide-react"
import { FaWhatsapp } from "react-icons/fa"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "Web Development",
    budget: "Not Sure / Let's Discuss",
    message: ""
  })

  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })

      if (res.ok) {
        alert("Thank you for your message! We will get back to you soon.")
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          service: "Web Development",
          budget: "Not Sure / Let's Discuss",
          message: ""
        })
      } else {
        alert("Something went wrong. Please try again.")
      }
    } catch (error) {
      console.error(error)
      alert("Something went wrong. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen pt-32 pb-20">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-4"
          >
            Let's Build Something <span className="text-gradient">Amazing</span> Together
          </motion.h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Ready to take your business to the next level? Contact us today for a free consultation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-8">
            <div className="p-8 glassmorphism rounded-3xl border border-white/5">
              <h3 className="text-2xl font-bold mb-8">Contact Information</h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary-electric/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6 text-primary-electric" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email Us</p>
                    <a href="mailto:sarojkrantiinfotech@gmail.com" className="font-semibold text-white hover:text-primary-electric transition-colors">sarojkrantiinfotech@gmail.com</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary-purple/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="h-6 w-6 text-primary-purple" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Call Us</p>
                    <a href="tel:+916261132091" className="font-semibold text-white hover:text-primary-purple transition-colors">+91 6261132091</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary-royal/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-primary-royal" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Visit Us</p>
                    <p className="font-semibold text-white">Nanda Nagar Indore, M.P</p>
                  </div>
                </div>
              </div>

              <div className="mt-12 p-6 bg-gradient-to-br from-primary-royal to-primary-purple rounded-2xl">
                <h4 className="font-bold text-white mb-2">Need Immediate Help?</h4>
                <p className="text-white/80 text-sm mb-4">Chat with us on WhatsApp for faster response.</p>
                <a
                  href="https://wa.me/917772972720"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-white text-primary-royal rounded-xl font-bold flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all"
                >
                  <FaWhatsapp color="green" className="h-5 w-5 ml-2" />
                  +91-7772972720
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="p-8 md:p-12 glassmorphism rounded-[3rem] border border-white/5">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground ml-1">Full Name</label>
                    <input
                      type="text"
                      required
                      className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-primary-electric transition-all"
                      placeholder="Enter your Full Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground ml-1">Email Address</label>
                    <input
                      type="email"
                      required
                      className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-primary-electric transition-all"
                      placeholder="Enter your Email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground ml-1">Phone Number</label>
                    <input
                      type="tel"
                      className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-primary-electric transition-all"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground ml-1">Company Name</label>
                    <input
                      type="text"
                      className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-primary-electric transition-all"
                      placeholder="Your Company"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground ml-1">Service Interested In</label>
                    <select
                      className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-primary-electric transition-all appearance-none"
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    >
                      <option className="bg-slate-900">Web Development</option>
                      <option className="bg-slate-900">Mobile App Development</option>
                      <option className="bg-slate-900">AI Automation</option>
                      <option className="bg-slate-900">Custom Software</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground ml-1">Estimated Budget</label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-primary-electric transition-all appearance-none"
                    >
                      <option className="bg-slate-900">Less than $500 (₹50K)</option>
                      <option className="bg-slate-900">$500 - $1,500 (₹50K - ₹1.5L)</option>
                      <option className="bg-slate-900">$1,500 - $5,000 (₹1.5L - ₹5L)</option>
                      <option className="bg-slate-900">$5,000 - $10,000 (₹5L - ₹10L)</option>
                      <option className="bg-slate-900">More than $10,000</option>
                      <option className="bg-slate-900">Not Sure / Let's Discuss</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground ml-1">Your Message</label>
                  <textarea
                    required
                    rows={6}
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-primary-electric transition-all resize-none"
                    placeholder="Tell us about your requirement..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-5 bg-gradient-to-r from-primary-royal to-primary-purple text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-2 hover:shadow-[0_0_30px_rgba(0,35,102,0.4)] transition-all duration-300 disabled:opacity-70"
                >
                  {submitting ? (
                    <>
                      <span className="animate-pulse">Submitting...</span>
                    </>
                  ) : (
                    <>
                      Submit
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
