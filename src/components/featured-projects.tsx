"use client"

import { motion } from "framer-motion"
import { ExternalLink, Code2 } from "lucide-react"

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
    category: "Mobile App",
    description: "A sustainable shopping app with real-time carbon footprint tracking.",
    image: "https://images.unsplash.com/photo-1512428559083-a401a30c9550?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["Flutter", "Firebase", "Node.js"],
    link: "#"
  },
  {
    title: "FinTech Dashboard",
    category: "Web App",
    description: "A complex financial dashboard with real-time stock data and predictive analytics.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["React", "D3.js", "PostgreSQL"],
    link: "#"
  }
]

export function FeaturedProjects() {
  return (
    <section className="py-24 bg-white/[0.01]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-16">
          <div>
            <h2 className="text-4xl font-bold mb-4">Featured <span className="text-gradient">Projects</span></h2>
            <p className="text-muted-foreground">Some of our best work that delivered real results.</p>
          </div>
          <button className="px-6 py-3 border border-white/10 rounded-xl hover:bg-white/5 transition-all hidden md:block">
            View All Projects
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group glassmorphism rounded-3xl overflow-hidden border border-white/5"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-primary-royal/80 backdrop-blur-md text-[10px] font-bold text-white uppercase tracking-wider">
                    {project.category}
                  </span>
                </div>
              </div>

              <div className="p-8">
                <h3 className="text-2xl font-bold mb-3 group-hover:text-primary-electric transition-colors">{project.title}</h3>
                <p className="text-muted-foreground text-sm mb-6 line-clamp-2">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 rounded-md bg-white/5 text-[10px] text-muted-foreground font-medium border border-white/10">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4">
                  <a href={project.link} className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-all">
                    <ExternalLink className="h-5 w-5" />
                  </a>
                  <a href="#" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-all">
                    <Code2 className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
