"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { PageHero } from "@/components/page-hero"
import { ServicesSection } from "@/components/services-section"
import { CTABanner } from "@/components/cta-banner"
import { motion } from "framer-motion"
import { CheckCircle2 } from "lucide-react"

const detailedServices = [
  {
    title: "Custom Software Development",
    description: "We build scalable, robust, and secure software tailored to your specific business needs.",
    benefits: ["Scalable Architecture", "Modern Tech Stack", "Agile Development", "Full Support"],
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "AI Agents & Automation",
    description: "Leverage the power of AI to automate repetitive tasks and gain intelligent insights.",
    benefits: ["LLM Integration", "Workflow Automation", "Predictive Analytics", "Custom AI Models"],
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Mobile App Development",
    description: "Beautifully designed mobile applications that provide native experiences on iOS and Android.",
    benefits: ["Cross-Platform", "User-Centric Design", "Offline Support", "App Store Optimization"],
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }
]

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <PageHero 
        title="Solutions for the" 
        gradientText="Modern Era"
        subtitle="From concept to deployment, we provide end-to-end technology services that help you stay competitive."
      />

      <ServicesSection />

      <section className="py-24 space-y-32">
        {detailedServices.map((service, index) => (
          <div key={service.title} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={index % 2 !== 0 ? 'lg:order-2' : ''}
              >
                <h2 className="text-4xl font-bold mb-6">{service.title}</h2>
                <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                  {service.description}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {service.benefits.map(benefit => (
                    <div key={benefit} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary-electric" />
                      <span className="font-medium">{benefit}</span>
                    </div>
                  ))}
                </div>
                <button className="mt-10 px-8 py-4 bg-white/5 border border-white/10 rounded-2xl font-bold hover:bg-white/10 transition-all">
                  Discuss Project
                </button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className={`relative aspect-video rounded-[3rem] overflow-hidden glassmorphism p-2 ${index % 2 !== 0 ? 'lg:order-1' : ''}`}
              >
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover rounded-[2.5rem] opacity-70"
                />
              </motion.div>
            </div>
          </div>
        ))}
      </section>

      <CTABanner />
      <Footer />
    </main>
  )
}
