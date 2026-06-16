"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { PageHero } from "@/components/page-hero"
import { motion, AnimatePresence } from "framer-motion"
import { ExternalLink, Code2, Search } from "lucide-react"

const categories = ["All", "Websites", "Mobile Apps", "Software", "AI Projects"]

const projects = [
  {
    title: "AI CRM Platform",
    category: "Software",
    description: "An intelligent CRM with automated lead scoring and AI-powered email generation.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["Next.js", "OpenAI", "Prisma"],
    link: "#"
  },
  {
    title: "EcoCommerce App",
    category: "Mobile Apps",
    description: "A sustainable shopping app with real-time carbon footprint tracking.",
    image: "https://images.unsplash.com/photo-1512428559083-a401a30c9550?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["Flutter", "Firebase", "Node.js"],
    link: "#"
  },
  {
    title: "FinTech Dashboard",
    category: "Websites",
    description: "A complex financial dashboard with real-time stock data and predictive analytics.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["React", "D3.js", "PostgreSQL"],
    link: "#"
  },
  {
    title: "AI Voice Assistant",
    category: "AI Projects",
    description: "Custom voice assistant for customer support automation using Whisper and GPT-4.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["Python", "OpenAI", "WebRTC"],
    link: "#"
  }
]

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState("All")

  const filteredProjects = projects.filter(project =>
    activeCategory === "All" || project.category === activeCategory
  )

  return (
    <main className="min-h-screen">
      <Navbar />
      <PageHero
        title="Our Recent"
        gradientText="Work"
        subtitle="Explore our portfolio of successful projects delivered across various industries."
      />

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-8 py-3 rounded-full text-sm font-bold transition-all ${activeCategory === category
                  ? "bg-gradient-to-r from-primary-royal to-primary-purple text-white shadow-lg"
                  : "bg-white/5 text-muted-foreground hover:bg-white/10"
                  }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode='popLayout'>
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.title}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="group glassmorphism rounded-3xl overflow-hidden border border-white/5"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                      <a href={project.link} className="p-4 rounded-full bg-white text-primary-royal hover:scale-110 transition-transform">
                        <ExternalLink className="h-6 w-6" />
                      </a>
                      <a href="#" className="p-4 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 hover:scale-110 transition-transform">
                        <Code2 className="h-6 w-6" />
                      </a>
                    </div>
                  </div>

                  <div className="p-8">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-2xl font-bold group-hover:text-primary-electric transition-colors">{project.title}</h3>
                      <span className="text-[10px] font-bold text-primary-electric uppercase tracking-widest">{project.category}</span>
                    </div>
                    <p className="text-muted-foreground text-sm mb-6 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 rounded-md bg-white/5 text-[10px] text-muted-foreground font-medium border border-white/10">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
