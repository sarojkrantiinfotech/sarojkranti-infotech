"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Play, CheckCircle2 } from "lucide-react"

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden min-h-screen flex items-center">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary-royal/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-primary-purple/20 blur-[120px]" />
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] rounded-full bg-primary-electric/10 blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-electric opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary-electric"></span>
              </span>
              <span className="text-sm font-medium text-primary-electric">Next-Gen AI Automation is here</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
              Building Smart <span className="text-gradient">Software Solutions</span> That Drive Growth
            </h1>
            
            <p className="text-xl text-muted-foreground mb-10 max-w-xl leading-relaxed">
              We help startups and businesses build websites, mobile apps, custom software, AI agents, and automation solutions.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link
                href="/contact"
                className="group px-8 py-4 bg-gradient-to-r from-primary-royal to-primary-purple text-white rounded-2xl font-semibold flex items-center justify-center gap-2 hover:shadow-[0_0_30px_rgba(0,35,102,0.4)] transition-all duration-300"
              >
                Book Free Consultation
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/portfolio"
                className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-2xl font-semibold flex items-center justify-center gap-2 hover:bg-white/10 transition-all"
              >
                View Portfolio
              </Link>
            </div>

            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary-electric" />
                <span className="text-sm text-muted-foreground font-medium">99% Client Satisfaction</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary-electric" />
                <span className="text-sm text-muted-foreground font-medium">Enterprise Grade</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10 glassmorphism p-4 rounded-[2rem] border border-white/10 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                alt="Dashboard Preview"
                className="rounded-2xl w-full h-auto shadow-inner"
              />
              
              {/* Floating elements */}
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-10 -right-10 p-6 glassmorphism dark:glassmorphism-dark rounded-2xl border border-white/10 hidden md:block shadow-xl"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary-electric/20 rounded-xl flex items-center justify-center">
                    <Cpu className="h-6 w-6 text-primary-electric" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">AI Automation</p>
                    <p className="text-[10px] text-muted-foreground">Active Processing</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-10 -left-10 p-6 glassmorphism dark:glassmorphism-dark rounded-2xl border border-white/10 hidden md:block shadow-xl"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary-purple/20 rounded-xl flex items-center justify-center">
                    <Play className="h-6 w-6 text-primary-purple fill-primary-purple" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">Custom Software</p>
                    <p className="text-[10px] text-muted-foreground">Ready to Deploy</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Orbiting gradients */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] -z-10 animate-pulse">
               <div className="absolute top-0 left-0 w-full h-full rounded-full border border-white/5 opacity-20" />
               <div className="absolute top-[10%] left-[10%] w-[80%] h-[80%] rounded-full border border-white/5 opacity-40" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

import { Cpu } from "lucide-react"
