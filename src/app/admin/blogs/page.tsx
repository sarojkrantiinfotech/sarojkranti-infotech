"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { AdminSidebar } from "@/components/admin-sidebar"
import { Plus, Edit2, Trash2, Loader2 } from "lucide-react"
import Link from "next/link"

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    try {
      const res = await fetch('/api/admin/blogs')
      const data = await res.json()
      setBlogs(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error("Error fetching blogs:", error)
    } finally {
      setLoading(false)
    }
  }

  const deleteBlog = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog?")) return
    try {
      await fetch(`/api/admin/blogs/${id}`, { method: 'DELETE' })
      setBlogs(blogs.filter(b => b.id !== id))
    } catch (error) {
      alert("Failed to delete blog")
    }
  }

  if (loading) return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <Loader2 className="h-10 w-10 text-primary-electric animate-spin" />
    </div>
  )

  return (
    <div className="min-h-screen bg-slate-950 flex">
      <AdminSidebar activePage="blogs" />

      <main className="flex-grow p-10 overflow-y-auto">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Manage Blogs</h1>
            <p className="text-muted-foreground">Create, edit, and delete your technology insights.</p>
          </div>
          <Link href="/admin/blogs/new" className="px-6 py-3 bg-primary-electric text-primary-royal font-bold rounded-xl flex items-center gap-2 hover:shadow-[0_0_20px_rgba(125,249,255,0.3)] transition-all">
            <Plus className="h-5 w-5" />
            New Post
          </Link>
        </header>

        <div className="glassmorphism rounded-[2rem] border border-white/5 p-8">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/5 text-muted-foreground text-sm font-medium">
                  <th className="pb-4 px-4">Title</th>
                  <th className="pb-4 px-4">Category</th>
                  <th className="pb-4 px-4">Status</th>
                  <th className="pb-4 px-4">Date</th>
                  <th className="pb-4 px-4">Actions</th>
                </tr>
              </thead>
              <tbody className="text-white">
                {blogs.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-10 text-center text-muted-foreground">
                      No blogs found. Create your first post!
                    </td>
                  </tr>
                ) : (
                  blogs.map((blog) => (
                    <tr key={blog.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                      <td className="py-4 px-4">
                        <p className="font-bold">{blog.title}</p>
                        <p className="text-xs text-muted-foreground">/{blog.slug}</p>
                      </td>
                      <td className="py-4 px-4 text-sm">{blog.category}</td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${blog.published ? 'bg-emerald-500/20 text-emerald-500' : 'bg-orange-500/20 text-orange-500'
                          }`}>
                          {blog.published ? 'Published' : 'Draft'}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-sm text-muted-foreground">
                        {new Date(blog.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex gap-3">
                          <Link href={`/admin/blogs/${blog.id}/edit`} className="p-2 hover:text-primary-electric transition-colors">
                            <Edit2 className="h-4 w-4" />
                          </Link>
                          <button onClick={() => deleteBlog(blog.id)} className="p-2 hover:text-rose-500 transition-colors">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}
