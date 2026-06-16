"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { PageHero } from "@/components/page-hero"
import { motion } from "framer-motion"
import { Calendar, User, ArrowRight, Tag } from "lucide-react"

const categories = ["All", "Technology", "AI", "Web Dev", "Mobile Dev", "Automation"]

const posts = [
  {
    title: "The Future of AI in Business Automation",
    excerpt: "Discover how AI agents are transforming the way modern businesses operate and scale.",
    category: "AI",
    author: "Saroj Kranti",
    date: "June 14, 2026",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Why Next.js 15 is a Game Changer",
    excerpt: "Exploring the new features of Next.js 15 and why you should migrate your projects today.",
    category: "Web Dev",
    author: "Saroj Kranti",
    date: "June 10, 2026",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Building Scalable Cloud Infrastructure",
    excerpt: "Learn the best practices for setting up a robust cloud environment for your SaaS.",
    category: "Technology",
    author: "Saroj Kranti",
    date: "June 05, 2026",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }
]

export default function BlogPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <PageHero 
        title="Insights &" 
        gradientText="Innovation"
        subtitle="Stay updated with the latest trends in technology, AI, and software development."
      />

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {categories.map(category => (
              <button
                key={category}
                className="px-6 py-2 rounded-full border border-white/10 text-sm font-medium hover:bg-white/5 transition-all"
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {posts.map((post, index) => (
              <motion.article
                key={post.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group flex flex-col"
              >
                <div className="relative aspect-[16/9] rounded-3xl overflow-hidden mb-6 border border-white/5">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 rounded-lg bg-primary-electric/90 backdrop-blur-md text-[10px] font-bold text-primary-royal uppercase tracking-wider">
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-6 text-xs text-muted-foreground mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {post.date}
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    {post.author}
                  </div>
                </div>

                <h3 className="text-2xl font-bold mb-4 group-hover:text-primary-electric transition-colors leading-tight">
                  {post.title}
                </h3>
                
                <p className="text-muted-foreground text-sm mb-6 flex-grow leading-relaxed">
                  {post.excerpt}
                </p>

                <button className="flex items-center gap-2 font-bold text-primary-electric group/btn">
                  Read Article <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
