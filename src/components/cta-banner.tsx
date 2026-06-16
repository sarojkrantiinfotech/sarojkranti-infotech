"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function CTABanner() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-[3rem] bg-gradient-to-r from-primary-royal via-primary-purple to-primary-royal p-12 md:p-20 text-center"
        >
          {/* Animated circles */}
          <div className="absolute top-0 left-0 w-full h-full -z-0">
             <div className="absolute top-[-20%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary-electric/20 blur-[100px]" />
             <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-primary-electric/20 blur-[100px]" />
          </div>

          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight">
              Ready to Build Your <br /> Digital Future?
            </h2>
            <p className="text-white/80 text-xl max-w-2xl mx-auto mb-12">
              Join 100+ businesses that have transformed their operations with our smart software and AI solutions.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/contact"
                className="px-10 py-5 bg-white text-primary-royal rounded-2xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-primary-electric hover:text-primary-royal transition-all duration-300"
              >
                Book Free Consultation
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/contact"
                className="px-10 py-5 bg-transparent border-2 border-white/20 text-white rounded-2xl font-bold text-lg hover:bg-white/10 transition-all"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
