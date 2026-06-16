"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { PageHero } from "@/components/page-hero"
import { motion } from "framer-motion"
import { CheckCircle2, Code, Server, Brain, Clock, Zap } from "lucide-react"

const skills = [
  {
    category: "Frontend",
    icon: Code,
    items: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"]
  },
  {
    category: "Backend",
    icon: Server,
    items: ["Node.js", "Express.js", "PostgreSQL", "Prisma", "MongoDB"]
  },
  {
    category: "AI & ML",
    icon: Brain,
    items: ["OpenAI", "LangChain", "AI Agents", "Python", "Automation"]
  }
]

const pricing = [
  {
    plan: "Hourly",
    price: "$50",
    unit: "per hour",
    description: "Best for small fixes and consultation.",
    features: ["Quick turnaround", "Direct communication", "Code review", "Technical support"]
  },
  {
    plan: "Project Based",
    price: "Custom",
    unit: "per project",
    description: "Best for complete product development.",
    features: ["End-to-end development", "UI/UX Design", "Deployment", "Maintenance period"],
    featured: true
  },
  {
    plan: "Dedicated",
    price: "$5k",
    unit: "per month",
    description: "Best for long-term partnerships.",
    features: ["40 hrs / week", "Priority support", "Strategic planning", "Team collaboration"]
  }
]

export default function FreelancerPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <PageHero 
        title="Hire Me As Your" 
        gradientText="Dedicated Developer"
        subtitle="Get enterprise-grade development expertise for your next big project."
      />

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-32">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-8 glassmorphism rounded-3xl border border-white/5"
              >
                <div className="w-12 h-12 rounded-xl bg-primary-electric/10 flex items-center justify-center mb-6">
                  <skill.icon className="h-6 w-6 text-primary-electric" />
                </div>
                <h3 className="text-2xl font-bold mb-6">{skill.category}</h3>
                <div className="space-y-4">
                  {skill.items.map(item => (
                    <div key={item} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary-electric" />
                      <span className="text-muted-foreground font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Flexible <span className="text-gradient">Pricing Models</span></h2>
            <p className="text-muted-foreground">Choose the plan that best fits your business needs.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricing.map((plan, index) => (
              <motion.div
                key={plan.plan}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`p-10 rounded-[3rem] border transition-all ${
                  plan.featured 
                    ? "bg-gradient-to-br from-primary-royal to-primary-purple border-transparent shadow-2xl scale-105" 
                    : "glassmorphism border-white/5 hover:border-white/20"
                }`}
              >
                <h3 className="text-xl font-bold mb-2">{plan.plan}</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-sm opacity-60">{plan.unit}</span>
                </div>
                <p className={`text-sm mb-8 ${plan.featured ? "text-white/80" : "text-muted-foreground"}`}>
                  {plan.description}
                </p>
                <div className="space-y-4 mb-10">
                  {plan.features.map(feature => (
                    <div key={feature} className="flex items-center gap-3">
                      <Zap className={`h-4 w-4 ${plan.featured ? "text-primary-electric" : "text-primary-electric"}`} />
                      <span className="text-sm font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
                <button className={`w-full py-4 rounded-2xl font-bold transition-all ${
                  plan.featured 
                    ? "bg-white text-primary-royal hover:bg-primary-electric" 
                    : "bg-white/5 hover:bg-white/10"
                }`}>
                  Get Started
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
