"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Menu, X, Rocket, Cpu, Briefcase, Info, Mail, LayoutGrid, MessageSquare } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { FaWhatsapp } from "react-icons/fa";

const navItems = [
  { name: "Home", href: "/", icon: Rocket },
  { name: "About", href: "/about", icon: Info },
  { name: "Services", href: "/services", icon: Cpu },
  { name: "Portfolio", href: "/portfolio", icon: LayoutGrid },
  { name: "AI Solutions", href: "/ai-solutions", icon: Cpu },
  { name: "Careers", href: "/careers", icon: Briefcase },
  { name: "Freelancer", href: "/freelancer", icon: Briefcase },
  { name: "Blog", href: "/blog", icon: LayoutGrid },
  { name: "Contact", href: "/contact", icon: Mail },
]

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false)
  const pathname = usePathname()

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 glassmorphism dark:glassmorphism-dark border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center gap-3">
                <div className="w-50 h-20">
                  <img src="/logo.png" alt="Saroj Kranti Infotech" className="w-full h-full object-contain" />
                </div>
                <div className="hidden sm:block">
                  <span className="text-2xl font-bold tracking-tight text-white">Saroj Kranti</span>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest leading-none">Infotech</p>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:bg-white/10",
                    pathname === item.href
                      ? "text-primary-electric bg-white/5"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/contact"
                className="ml-4 px-6 py-2 bg-gradient-to-r from-primary-royal to-primary-purple text-white rounded-full text-sm font-semibold hover:shadow-[0_0_20px_rgba(0,35,102,0.4)] transition-all duration-300"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-md text-muted-foreground hover:text-foreground focus:outline-none"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-background/95 backdrop-blur-xl border-b border-white/10"
            >
              <div className="px-4 pt-2 pb-6 space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center gap-4 px-4 py-4 rounded-xl text-base font-medium transition-all",
                      pathname === item.href
                        ? "text-primary-electric bg-white/5"
                        : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.name}
                  </Link>
                ))}
                <div className="pt-4 px-4">
                  <Link
                    href="/contact"
                    onClick={() => setIsOpen(false)}
                    className="w-full flex justify-center px-6 py-3 bg-gradient-to-r from-primary-royal to-primary-purple text-white rounded-xl text-base font-semibold"
                  >
                    Book Free Consultation
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/917772972720"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full shadow-[0_0_20px_rgba(34,197,94,0.5)] hover:shadow-[0_0_30px_rgba(34,197,94,0.7)] hover:scale-110 transition-all duration-300"
      >
        <FaWhatsapp className="w-8 h-8 text-white" />
      </a>
    </>
  )
}
