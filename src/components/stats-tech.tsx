"use client"

import { motion } from "framer-motion"

const stats = [
  { label: "Projects Completed", value: "150+" },
  { label: "Happy Clients", value: "80+" },
  { label: "Years Experience", value: "5+" },
  { label: "Expert Developers", value: "25+" }
]

const techs = [
  "Next.js", "React", "TypeScript", "Node.js", "Python", 
  "PostgreSQL", "AWS", "OpenAI", "Docker", "Tailwind CSS",
  "Flutter", "Prisma", "MongoDB", "Express"
]

export function StatsSection() {
  return (
    <section className="py-20 bg-primary-royal/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <h3 className="text-4xl md:text-5xl font-bold text-gradient mb-2">{stat.value}</h3>
              <p className="text-muted-foreground font-medium uppercase tracking-widest text-xs">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function TechnologiesSection() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Technologies We Master</h2>
          <p className="text-muted-foreground">We use the best tools to build the best products.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          {techs.map((tech, index) => (
            <motion.div
              key={tech}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="px-6 py-3 rounded-xl glassmorphism border border-white/5 text-sm font-semibold hover:border-primary-electric/50 transition-colors"
            >
              {tech}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
