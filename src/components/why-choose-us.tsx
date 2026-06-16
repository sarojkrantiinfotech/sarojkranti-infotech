"use client"

import { motion } from "framer-motion"
import { ShieldCheck, Zap, Users, Trophy, Rocket, Clock } from "lucide-react"

const features = [
  {
    title: "Innovative Solutions",
    description: "We use the latest technologies to build future-ready solutions.",
    icon: Rocket
  },
  {
    title: "Reliable & Secure",
    description: "Enterprise-grade security and reliability in every line of code.",
    icon: ShieldCheck
  },
  {
    title: "Client-Centric Approach",
    description: "Your success is our mission. We work closely with you to achieve it.",
    icon: Users
  },
  {
    title: "On-Time Delivery",
    description: "We respect your time and always deliver on our promises.",
    icon: Clock
  },
  {
    title: "Expert Team",
    description: "Our developers and designers are among the best in the industry.",
    icon: Trophy
  },
  {
    title: "Fast Performance",
    description: "We optimize for speed and efficiency in every project.",
    icon: Zap
  }
]

export function WhyChooseUs() {
  return (
    <section className="py-24 relative overflow-hidden bg-white/[0.01]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              Why Businesses <br />
              <span className="text-gradient">Choose Saroj Kranti</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground text-lg mb-10 leading-relaxed"
            >
              We don't just write code; we build solutions that drive your business forward. Our commitment to quality and innovation sets us apart.
            </motion.p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="mt-1 w-10 h-10 rounded-lg bg-primary-electric/10 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="h-5 w-5 text-primary-electric" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square rounded-[3rem] bg-gradient-to-br from-primary-royal/20 via-primary-purple/20 to-primary-electric/20 p-8">
              <div className="w-full h-full rounded-[2rem] glassmorphism flex items-center justify-center overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Our Team"
                  className="w-full h-full object-cover opacity-60 hover:scale-110 transition-transform duration-700"
                />
              </div>
            </div>
            
            {/* Stats overlay */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -bottom-6 -right-6 p-6 glassmorphism-dark rounded-2xl border border-white/10 shadow-2xl"
            >
              <p className="text-3xl font-bold text-gradient">100+</p>
              <p className="text-sm text-muted-foreground">Projects Delivered</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
