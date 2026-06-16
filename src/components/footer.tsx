"use client"

import Link from "next/link"
import { Code2, MessageCircle, Globe, Mail, MapPin, Phone, MessageSquare } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-background border-t border-white/10 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Company Info */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-16 h-16">
                <img src="/logo.webp" alt="Saroj Kranti Infotech" className="w-full h-full object-contain" />
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-white">Saroj Kranti</span>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest leading-none">Infotech</p>
              </div>
            </Link>
            <p className="text-muted-foreground leading-relaxed">
              Innovative Solutions. Real Business Impact. We help businesses transform with cutting-edge software and AI automation.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-primary-electric transition-all">
                <MessageCircle className="h-5 w-5" />
              </Link>
              <Link href="#" className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-primary-electric transition-all">
                <Globe className="h-5 w-5" />
              </Link>
              <Link href="#" className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-primary-electric transition-all">
                <Code2 className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li><Link href="/about" className="text-muted-foreground hover:text-primary-electric transition-colors">About Us</Link></li>
              <li><Link href="/services" className="text-muted-foreground hover:text-primary-electric transition-colors">Services</Link></li>
              <li><Link href="/portfolio" className="text-muted-foreground hover:text-primary-electric transition-colors">Portfolio</Link></li>
              <li><Link href="/blog" className="text-muted-foreground hover:text-primary-electric transition-colors">Latest News</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary-electric transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-6">Services</h3>
            <ul className="space-y-4">
              <li><Link href="/services" className="text-muted-foreground hover:text-primary-electric transition-colors">Software Development</Link></li>
              <li><Link href="/services" className="text-muted-foreground hover:text-primary-electric transition-colors">AI Automation</Link></li>
              <li><Link href="/services" className="text-muted-foreground hover:text-primary-electric transition-colors">Mobile App Dev</Link></li>
              <li><Link href="/services" className="text-muted-foreground hover:text-primary-electric transition-colors">Cloud Solutions</Link></li>
              <li><Link href="/services" className="text-muted-foreground hover:text-primary-electric transition-colors">IT Maintenance</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary-electric mt-1" />
                <span className="text-muted-foreground">Nanda Nagar Indore, M.P</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary-electric" />
                <a href="tel:+916261132091" className="text-muted-foreground hover:text-primary-electric transition-colors">+91 6261132091</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary-electric" />
                <a href="mailto:sarojkrantiinfotech@gmail.com" className="text-muted-foreground hover:text-primary-electric transition-colors">sarojkrantiinfotech@gmail.com</a>
              </li>
              <li className="flex items-center gap-3">
                <MessageSquare className="h-5 w-5 text-primary-electric" />
                <a href="https://wa.me/917772972720" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary-electric transition-colors">WhatsApp: +91 7772972720</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Saroj Kranti Infotech. All rights reserved.
          </p>
          <div className="flex gap-8">
            <Link href="/privacy" className="text-muted-foreground text-sm hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="text-muted-foreground text-sm hover:text-white">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
