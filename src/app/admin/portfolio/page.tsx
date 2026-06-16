"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { AdminSidebar } from "@/components/admin-sidebar"
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  ExternalLink,
  Loader2,
  X,
  Image as ImageIcon,
  Link as LinkIcon,
  Tag,
  Rocket
} from "lucide-react"
import Link from "next/link"

export default function AdminPortfolioPage() {
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<any>(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    category: "Websites",
    techStack: "",
    industry: "",
    link: "",
    featured: false
  })

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/admin/portfolio')
      const data = await res.json()
      setProjects(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error("Error fetching projects:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const method = editingProject ? 'PUT' : 'POST'
    const body = {
      ...formData,
      id: editingProject?.id,
      techStack: formData.techStack.split(',').map(s => s.trim())
    }

    try {
      const res = await fetch('/api/admin/portfolio', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (res.ok) {
        fetchProjects()
        closeModal()
      }
    } catch (error) {
      alert("Failed to save project")
    }
  }

  const deleteProject = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return
    try {
      await fetch('/api/admin/portfolio', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })
      setProjects(projects.filter(p => p.id !== id))
    } catch (error) {
      alert("Failed to delete project")
    }
  }

  const openModal = (project: any = null) => {
    if (project) {
      setEditingProject(project)
      setFormData({
        title: project.title,
        description: project.description,
        image: project.image,
        category: project.category,
        techStack: project.techStack.join(', '),
        industry: project.industry || "",
        link: project.link || "",
        featured: project.featured
      })
    } else {
      setEditingProject(null)
      setFormData({
        title: "",
        description: "",
        image: "",
        category: "Websites",
        techStack: "",
        industry: "",
        link: "",
        featured: false
      })
    }
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingProject(null)
  }

  if (loading) return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <Loader2 className="h-10 w-10 text-primary-electric animate-spin" />
    </div>
  )

  return (
    <div className="min-h-screen bg-slate-950 flex">
      <AdminSidebar activePage="portfolio" />

      <main className="flex-grow p-10 overflow-y-auto">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Portfolio Manager</h1>
            <p className="text-muted-foreground">Showcase your best work to the world.</p>
          </div>
          <button onClick={() => openModal()} className="px-6 py-3 bg-primary-electric text-primary-royal font-bold rounded-xl flex items-center gap-2 hover:shadow-[0_0_20px_rgba(125,249,255,0.3)] transition-all">
            <Plus className="h-5 w-5" />
            New Project
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.length === 0 ? (
            <div className="col-span-full py-20 text-center text-muted-foreground glassmorphism rounded-[2rem] border border-white/5">
              No projects found. Add your first project!
            </div>
          ) : (
            projects.map((project) => (
              <motion.div
                key={project.id}
                layout
                className="group glassmorphism rounded-3xl overflow-hidden border border-white/5"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button onClick={() => openModal(project)} className="p-2 rounded-lg bg-white/10 backdrop-blur-md text-white hover:bg-primary-electric hover:text-primary-royal transition-all">
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button onClick={() => deleteProject(project.id)} className="p-2 rounded-lg bg-white/10 backdrop-blur-md text-white hover:bg-rose-500 transition-all">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-white group-hover:text-primary-electric transition-colors">{project.title}</h3>
                    {project.featured && (
                      <span className="px-2 py-0.5 rounded-md bg-primary-electric/20 text-[8px] font-bold text-primary-electric uppercase tracking-widest border border-primary-electric/20">Featured</span>
                    )}
                  </div>
                  <p className="text-muted-foreground text-xs mb-4 line-clamp-2">{project.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {project.techStack.map((tech: string) => (
                      <span key={tech} className="px-2 py-0.5 rounded-md bg-white/5 text-[9px] text-muted-foreground border border-white/5">{tech}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Project Modal */}
        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeModal}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative w-full max-w-2xl bg-slate-900 rounded-[2.5rem] border border-white/10 p-8 shadow-2xl overflow-y-auto max-h-[90vh]"
              >
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-bold text-white">{editingProject ? 'Edit Project' : 'New Project'}</h2>
                  <button onClick={closeModal} className="p-2 hover:bg-white/5 rounded-xl transition-all">
                    <X className="h-6 w-6 text-muted-foreground" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground ml-1">Project Title</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-primary-electric transition-all text-white"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground ml-1">Category</label>
                      <select
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-primary-electric transition-all text-white appearance-none"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      >
                        <option value="Websites" className="bg-slate-900">Websites</option>
                        <option value="Mobile Apps" className="bg-slate-900">Mobile Apps</option>
                        <option value="Software" className="bg-slate-900">Software</option>
                        <option value="AI Projects" className="bg-slate-900">AI Projects</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground ml-1">Industry</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-primary-electric transition-all text-white"
                        value={formData.industry}
                        onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground ml-1">Description</label>
                    <textarea
                      required
                      rows={3}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-primary-electric transition-all text-white resize-none"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground ml-1">Tech Stack (comma separated)</label>
                    <input
                      type="text"
                      required
                      placeholder="Next.js, Tailwind, Prisma"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-primary-electric transition-all text-white"
                      value={formData.techStack}
                      onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground ml-1 flex items-center gap-2"><ImageIcon className="h-3 w-3" /> Image URL</label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-primary-electric transition-all text-white"
                        value={formData.image}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground ml-1 flex items-center gap-2"><LinkIcon className="h-3 w-3" /> Live Link</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-primary-electric transition-all text-white"
                        value={formData.link}
                        onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/10">
                    <input
                      type="checkbox"
                      id="featured"
                      className="w-5 h-5 rounded-md accent-primary-electric"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    />
                    <label htmlFor="featured" className="text-sm font-medium text-white cursor-pointer flex items-center gap-2">
                      <Rocket className="h-4 w-4 text-primary-electric" /> Featured Project
                    </label>
                  </div>

                  <div className="flex justify-end gap-4 pt-4">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="px-6 py-3 bg-white/5 border border-white/10 text-white rounded-xl font-bold hover:bg-white/10 transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-10 py-3 bg-gradient-to-r from-primary-royal to-primary-purple text-white rounded-xl font-bold flex items-center gap-2 hover:shadow-[0_0_20px_rgba(125,249,255,0.3)] transition-all"
                    >
                      {editingProject ? 'Update Project' : 'Create Project'}
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}
