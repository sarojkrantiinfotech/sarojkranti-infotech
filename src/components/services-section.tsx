"use client"

import { motion } from "framer-motion"
import { Code2, Globe, Smartphone, Bot, Settings, Cloud, Database, BarChart3 } from "lucide-react"

const services = [
  {
    title: "Custom Software Development",
    description: "Tailored applications built with modern architectures to solve your unique business challenges.",
    icon: Code2,
    color: "from-blue-500/20 to-blue-600/20",
    iconColor: "text-blue-500"
  },
  {
    title: "Website Development",
    description: "High-performance, responsive websites that convert visitors into loyal customers.",
    icon: Globe,
    color: "from-cyan-500/20 to-cyan-600/20",
    iconColor: "text-cyan-500"
  },
  {
    title: "Mobile App Development",
    description: "Native and cross-platform mobile apps that provide seamless user experiences.",
    icon: Smartphone,
    color: "from-indigo-500/20 to-indigo-600/20",
    iconColor: "text-indigo-500"
  },
  {
    title: "AI Agents & Automation",
    description: "Intelligent AI agents and workflow automation to boost productivity and reduce costs.",
    icon: Bot,
    color: "from-purple-500/20 to-purple-600/20",
    iconColor: "text-purple-500"
  },
  {
    title: "IT Support & Maintenance",
    description: "Reliable 24/7 IT support and proactive maintenance to keep your systems running smoothly.",
    icon: Settings,
    color: "from-emerald-500/20 to-emerald-600/20",
    iconColor: "text-emerald-500"
  },
  {
    title: "Cloud Solutions",
    description: "Scalable cloud infrastructure and migration services for modern enterprises.",
    icon: Cloud,
    color: "from-sky-500/20 to-sky-600/20",
    iconColor: "text-sky-500"
  },
  {
    title: "CRM/ERP Development",
    description: "Custom management systems to streamline your business processes and data.",
    icon: Database,
    color: "from-orange-500/20 to-orange-600/20",
    iconColor: "text-orange-500"
  },
  {
    title: "Business Analytics",
    description: "Data-driven insights and dashboards to help you make informed business decisions.",
    icon: BarChart3,
    color: "from-rose-500/20 to-rose-600/20",
    iconColor: "text-rose-500"
  }
]

export function ServicesSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Our <span className="text-gradient">Core Services</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            We provide comprehensive technology solutions to help your business stay ahead in the digital age.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="p-8 rounded-[2rem] glassmorphism dark:glassmorphism-dark border border-white/5 group hover:border-primary-electric/50 transition-all duration-300"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <service.icon className={`h-7 w-7 ${service.iconColor}`} />
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-primary-electric transition-colors">{service.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                {service.description}
              </p>
              <button className="text-sm font-semibold text-primary-electric flex items-center gap-2 group/btn">
                Learn More 
                <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
