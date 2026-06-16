"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft, Save, Loader2, Image as ImageIcon, Type, Link as LinkIcon, User, Tag } from "lucide-react"
import Link from "next/link"

export default function NewBlogPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    image: "",
    category: "Technology",
    author: "Saroj Kranti",
    published: false
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/admin/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        router.push('/admin/blogs')
      } else {
        const error = await res.json()
        alert(error.error || "Failed to create blog")
      }
    } catch (error) {
      console.error("Error creating blog:", error)
      alert("An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const generateSlug = () => {
    const slug = formData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '')
    setFormData({ ...formData, slug })
  }

  return (
    <div className="min-h-screen bg-slate-950 p-6 md:p-10">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-10">
          <div className="flex items-center gap-4">
            <Link href="/admin/blogs" className="p-2 hover:bg-white/5 rounded-xl transition-all">
              <ArrowLeft className="h-6 w-6 text-white" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-white">Create New Post</h1>
              <p className="text-muted-foreground">Draft your next technology insight.</p>
            </div>
          </div>
        </header>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="glassmorphism rounded-[2rem] border border-white/5 p-8 space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Type className="h-4 w-4" /> Post Title
              </label>
              <input
                type="text"
                required
                className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-primary-electric transition-all text-white text-lg"
                placeholder="The Future of AI Automation..."
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                onBlur={generateSlug}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <LinkIcon className="h-4 w-4" /> URL Slug
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-primary-electric transition-all text-white text-sm"
                  placeholder="future-of-ai-automation"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Tag className="h-4 w-4" /> Category
                </label>
                <select
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-primary-electric transition-all text-white appearance-none"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  <option className="bg-slate-900">Technology</option>
                  <option className="bg-slate-900">AI</option>
                  <option className="bg-slate-900">Web Development</option>
                  <option className="bg-slate-900">Mobile Development</option>
                  <option className="bg-slate-900">Automation</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <ImageIcon className="h-4 w-4" /> Cover Image URL
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-primary-electric transition-all text-white"
                placeholder="https://images.unsplash.com/..."
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <User className="h-4 w-4" /> Author Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-primary-electric transition-all text-white"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Content (Markdown supported)</label>
              <textarea
                required
                rows={12}
                className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-primary-electric transition-all text-white resize-none"
                placeholder="Write your amazing post here..."
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              />
            </div>

            <div className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/10">
              <input
                type="checkbox"
                id="published"
                className="w-5 h-5 rounded-md accent-primary-electric"
                checked={formData.published}
                onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
              />
              <label htmlFor="published" className="text-sm font-medium text-white cursor-pointer">
                Publish immediately
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Link href="/admin/blogs" className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-2xl font-bold hover:bg-white/10 transition-all">
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="px-10 py-4 bg-gradient-to-r from-primary-royal to-primary-purple text-white rounded-2xl font-bold flex items-center gap-2 hover:shadow-[0_0_30px_rgba(0,35,102,0.4)] transition-all disabled:opacity-50"
            >
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />}
              Save Post
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
