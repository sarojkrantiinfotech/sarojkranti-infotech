"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { PageHero } from "@/components/page-hero"
import { motion } from "framer-motion"
import { Bot, MessageSquare, Mic, Zap, BarChart, Workflow } from "lucide-react"

const aiSolutions = [
  {
    title: "AI Chatbots",
    description: "Intelligent conversational agents that handle customer queries 24/7 with human-like understanding.",
    icon: MessageSquare,
    color: "from-blue-500/20 to-blue-600/20"
  },
  {
    title: "Voice Agents",
    description: "AI-powered voice systems for automated calling, appointment booking, and customer support.",
    icon: Mic,
    color: "from-purple-500/20 to-purple-600/20"
  },
  {
    title: "WhatsApp Automation",
    description: "Automate your business communication on WhatsApp with custom bots and workflow integrations.",
    icon: Bot,
    color: "from-green-500/20 to-green-600/20"
  },
  {
    title: "Workflow Automation",
    description: "Streamline your business processes by connecting your favorite tools with intelligent AI triggers.",
    icon: Workflow,
    color: "from-orange-500/20 to-orange-600/20"
  },
  {
    title: "Predictive Analytics",
    description: "Use your data to predict future trends and make informed business decisions with AI models.",
    icon: BarChart,
    color: "from-rose-500/20 to-rose-600/20"
  },
  {
    title: "Business Process Automation",
    description: "End-to-end automation of complex business tasks to reduce human error and increase efficiency.",
    icon: Zap,
    color: "from-yellow-500/20 to-yellow-600/20"
  }
]

export default function AISolutionsPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <PageHero 
        title="Future-Proof Your" 
        gradientText="Business with AI"
        subtitle="We help you integrate cutting-edge AI technologies to automate workflows and drive efficiency."
      />

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {aiSolutions.map((solution, index) => (
              <motion.div
                key={solution.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-10 rounded-[3rem] glassmorphism border border-white/5 hover:border-primary-electric/50 transition-all group"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${solution.color} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                  <solution.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-primary-electric transition-colors">{solution.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  {solution.description}
                </p>
                <button className="flex items-center gap-2 font-bold text-primary-electric group/btn">
                  Explore Solution <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Futuristic AI section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary-purple/10 via-transparent to-transparent" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glassmorphism rounded-[4rem] p-12 md:p-24 border border-white/10 flex flex-col items-center text-center">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight">How We Implement <br /><span className="text-gradient">AI For Your Business</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full mt-12">
              <div className="space-y-4">
                <div className="text-5xl font-bold text-white/10">01</div>
                <h4 className="text-xl font-bold">Analysis</h4>
                <p className="text-muted-foreground">We analyze your existing workflows to identify automation opportunities.</p>
              </div>
              <div className="space-y-4">
                <div className="text-5xl font-bold text-white/10">02</div>
                <h4 className="text-xl font-bold">Integration</h4>
                <p className="text-muted-foreground">We seamlessly integrate custom AI models into your current tech stack.</p>
              </div>
              <div className="space-y-4">
                <div className="text-5xl font-bold text-white/10">03</div>
                <h4 className="text-xl font-bold">Scaling</h4>
                <p className="text-muted-foreground">We continuously optimize and scale the AI solutions as your business grows.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
