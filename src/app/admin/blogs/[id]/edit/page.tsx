"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft, Save, Loader2, Image as ImageIcon, Type, Link as LinkIcon, User, Tag } from "lucide-react"
import Link from "next/link"

export default function EditBlogPage() {
  const router = useRouter()
  const params = useParams()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    image: "",
    category: "Technology",
    author: "Saroj Kranti",
    published: false
  })

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`/api/admin/blogs/${params.id}`)
        if (res.ok) {
          const data = await res.json()
          setFormData(data)
        } else {
          alert("Blog not found")
          router.push('/admin/blogs')
        }
      } catch (error) {
        console.error("Error fetching blog:", error)
      } finally {
        setLoading(false)
      }
    }
    if (params.id) fetchBlog()
  }, [params.id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const res = await fetch(`/api/admin/blogs/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        router.push('/admin/blogs')
      } else {
        const error = await res.json()
        alert(error.error || "Failed to update blog")
      }
    } catch (error) {
      console.error("Error updating blog:", error)
      alert("An error occurred")
    } finally {
      setSaving(false)
    }
  }

  if (loading) return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <Loader2 className="h-10 w-10 text-primary-electric animate-spin" />
    </div>
  )

  return (
    <div className="min-h-screen bg-slate-950 p-6 md:p-10">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-10">
          <div className="flex items-center gap-4">
            <Link href="/admin/blogs" className="p-2 hover:bg-white/5 rounded-xl transition-all">
              <ArrowLeft className="h-6 w-6 text-white" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-white">Edit Post</h1>
              <p className="text-muted-foreground">Update your technology insight.</p>
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
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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
                Published
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Link href="/admin/blogs" className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-2xl font-bold hover:bg-white/10 transition-all">
              Cancel
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="px-10 py-4 bg-gradient-to-r from-primary-royal to-primary-purple text-white rounded-2xl font-bold flex items-center gap-2 hover:shadow-[0_0_30px_rgba(0,35,102,0.4)] transition-all disabled:opacity-50"
            >
              {saving ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />}
              Update Post
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
