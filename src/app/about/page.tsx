"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { PageHero } from "@/components/page-hero"
import { StatsSection } from "@/components/stats-tech"
import { motion } from "framer-motion"
import { Target, Eye, Shield, Users } from "lucide-react"

const values = [
  {
    title: "Our Mission",
    description: "To empower businesses through innovative technology solutions that drive real impact and growth.",
    icon: Target,
    color: "bg-blue-500/10 text-blue-500"
  },
  {
    title: "Our Vision",
    description: "To be the global leader in digital transformation, setting new standards for excellence and innovation.",
    icon: Eye,
    color: "bg-purple-500/10 text-purple-500"
  },
  {
    title: "Core Values",
    description: "Integrity, Innovation, and Excellence are at the heart of everything we do at Saroj Kranti.",
    icon: Shield,
    color: "bg-emerald-500/10 text-emerald-500"
  },
  {
    title: "Client First",
    description: "We believe in building long-term partnerships by putting our clients' success above all else.",
    icon: Users,
    color: "bg-orange-500/10 text-orange-500"
  }
]

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <PageHero 
        title="Our Story &" 
        gradientText="Mission"
        subtitle="We are a team of passionate developers, designers, and strategists dedicated to building the next generation of digital products."
      />

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-6">Innovative Solutions. <br /><span className="text-gradient">Real Business Impact.</span></h2>
              <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
                <p>
                  Founded with a vision to bridge the gap between complex technology and business needs, Saroj Kranti Infotech has grown into a full-service IT agency trusted by startups and enterprises alike.
                </p>
                <p>
                  We specialize in custom software development, AI automation, and cloud solutions. Our team combines technical expertise with creative thinking to deliver products that don't just work, but excel.
                </p>
                <p>
                  Whether you're a startup looking to launch your first MVP or an established business seeking to modernize your infrastructure, we have the skills and experience to help you succeed.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-video rounded-3xl overflow-hidden glassmorphism p-2"
            >
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                alt="Our Office"
                className="w-full h-full object-cover rounded-2xl opacity-80"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* <StatsSection /> */}

      <section className="py-24 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-8 rounded-[2rem] glassmorphism border border-white/5"
              >
                <div className={`w-14 h-14 rounded-2xl ${value.color} flex items-center justify-center mb-6`}>
                  <value.icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
