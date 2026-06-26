"use client"

import Link from "next/link"
import { Code2, MessageCircle, Globe, Mail, MapPin, Phone, MessageSquare } from "lucide-react"
import { FaFacebook, FaGithub, FaInstagramSquare, FaLinkedin, FaWhatsapp } from "react-icons/fa"

export function Footer() {
  return (
    <footer className="bg-background border-t border-white/10 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-12 mb-16">

          {/* ================= Company Info ================= */}
          <div className="space-y-6">
            <Link href="/" className="inline-flex items-center gap-4">
              <div className="w-28 h-28 shrink-0">
                <img
                  src="/logo.png"
                  alt="Saroj Kranti Infotech"
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="leading-none">
                <h1 className="text-[24px] font-black uppercase ">
                  <span className="bg-gradient-to-r from-[#0047AB] via-[#1565C0] to-[#1E88E5] bg-clip-text text-transparent">
                    SAROJ
                  </span>{" "}
                  <span className="ml-2 bg-gradient-to-r from-[#4F46E5] via-[#6366F1] to-[#7C3AED] bg-clip-text text-transparent">
                    KRANTI
                  </span>
                </h1>

                <div className="flex items-center mt-1">
                  <div className="w-5 h-[2px] bg-gradient-to-r from-[#0047AB] to-[#1565C0]" />

                  <span className="mx-3 text-[13px] font-semibold tracking-[0.6em] text-gray-400 uppercase">
                    INFOTECH
                  </span>

                  <div className="w-5 h-[2px] bg-gradient-to-r from-[#6366F1] to-[#7C3AED]" />
                </div>
              </div>
            </Link>

            <p className="text-muted-foreground leading-relaxed max-w-md">
              Innovative Solutions. Real Business Impact. We help businesses transform
              with cutting-edge software and AI automation.
            </p>

            <div className="flex gap-3">

              {/* Instagram */}
              <Link
                href="https://www.instagram.com/sarojkrantiinfotech/"
                className="group p-3 rounded-xl bg-white/5 transition-all duration-300 hover:bg-gradient-to-r hover:from-[#F58529] hover:via-[#DD2A7B] hover:to-[#8134AF]"
              >
                <FaInstagramSquare className="w-5 h-5 text-gray-400 group-hover:text-white transition-all duration-300 group-hover:scale-110" />
              </Link>

              {/* Facebook */}
              <Link
                href="#"
                className="group p-3 rounded-xl bg-white/5 hover:bg-[#1877F2]/10 transition-all duration-300"
              >
                <FaFacebook className="w-5 h-5 text-gray-400 group-hover:text-[#1877F2] group-hover:scale-110 transition-all" />
              </Link>

              {/* LinkedIn */}
              <Link
                href="#"
                className="group p-3 rounded-xl bg-white/5 hover:bg-[#0A66C2]/10 transition-all duration-300"
              >
                <FaLinkedin className="w-5 h-5 text-gray-400 group-hover:text-[#0A66C2] group-hover:scale-110 transition-all" />
              </Link>

              {/* GitHub */}
              <Link
                href="https://github.com/sarojkrantiinfotech"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300"
              >
                <FaGithub className="w-5 h-5 text-gray-400 group-hover:text-white group-hover:scale-110 transition-all duration-300" />
              </Link>

              {/* WhatsApp */}
              <Link
                href="https://wa.me/917772972720"
                target="_blank"
                className="group p-3 rounded-xl bg-white/5 transition-all duration-300 hover:bg-[#25D366]/10"
              >
                <FaWhatsapp className="w-5 h-5 text-gray-400 group-hover:text-[#25D366] transition-all duration-300 group-hover:scale-110" />
              </Link>

            </div>
          </div>

          {/* ================= Right Side ================= */}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

            {/* Quick Links */}

            <div>
              <h3 className="text-white font-semibold text-lg mb-5">
                Quick Links
              </h3>

              <ul className="space-y-3">
                <li><Link href="/about" className="text-muted-foreground hover:text-primary-electric transition-colors">About Us</Link></li>
                <li><Link href="/services" className="text-muted-foreground hover:text-primary-electric transition-colors">Services</Link></li>
                <li><Link href="/portfolio" className="text-muted-foreground hover:text-primary-electric transition-colors">Portfolio</Link></li>
                <li><Link href="/blog" className="text-muted-foreground hover:text-primary-electric transition-colors">Latest News</Link></li>
                <li><Link href="/contact" className="text-muted-foreground hover:text-primary-electric transition-colors">Contact</Link></li>
              </ul>
            </div>

            {/* Services */}

            <div>
              <h3 className="text-white font-semibold text-lg mb-5">
                Services
              </h3>

              <ul className="space-y-3">
                <li><Link href="/services" className="text-muted-foreground hover:text-primary-electric transition-colors">Software Development</Link></li>
                <li><Link href="/services" className="text-muted-foreground hover:text-primary-electric transition-colors">AI Automation</Link></li>
                <li><Link href="/services" className="text-muted-foreground hover:text-primary-electric transition-colors">Mobile App Development</Link></li>
                <li><Link href="/services" className="text-muted-foreground hover:text-primary-electric transition-colors">Cloud Solutions</Link></li>
                <li><Link href="/services" className="text-muted-foreground hover:text-primary-electric transition-colors">IT Maintenance</Link></li>
              </ul>
            </div>

            {/* Contact */}

            <div>
              <h3 className="text-white font-semibold text-lg mb-5">
                Contact Us
              </h3>

              <ul className="space-y-4">
                <li className="flex gap-3">
                  <MapPin className="w-5 h-5 text-primary-electric mt-1 shrink-0" />
                  <span className="text-muted-foreground">
                    Nanda Nagar, Indore, M.P.
                  </span>
                </li>

                <li className="flex gap-3">
                  <Phone className="w-5 h-5 text-primary-electric shrink-0" />
                  <a
                    href="tel:+916261132091"
                    className="text-muted-foreground hover:text-primary-electric"
                  >
                    +91 6261132091
                  </a>
                </li>

                <li className="flex gap-3">
                  <Mail className="w-5 h-5 text-primary-electric shrink-0" />
                  <a
                    href="mailto:sarojkrantiinfotech@gmail.com"
                    className="text-muted-foreground hover:text-primary-electric break-all"
                  >
                    sarojkrantiinfotech@gmail.com
                  </a>
                </li>

                <li className="flex gap-3">
                  <FaWhatsapp className="w-5 h-5 text-primary-electric shrink-0" />
                  <a
                    href="https://wa.me/917772972720"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary-electric"
                  >
                    +91 7772972720
                  </a>
                </li>
              </ul>
            </div>
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
