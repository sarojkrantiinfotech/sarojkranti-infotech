"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { AdminSidebar } from "@/components/admin-sidebar"
import {
  Plus,
  Edit2,
  Trash2,
  Eye,
  Loader2,
  X,
  Save,
  MapPin,
  Clock,
  Briefcase
} from "lucide-react"
import Link from "next/link"

export default function AdminJobsPage() {
  const [jobs, setJobs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingJob, setEditingJob] = useState<any>(null)
  const [formData, setFormData] = useState({
    title: "",
    department: "",
    location: "",
    type: "Full-time",
    description: "",
    requirements: "",
    salary: "",
    active: true
  })

  useEffect(() => {
    fetchJobs()
  }, [])

  const fetchJobs = async () => {
    try {
      const res = await fetch('/api/admin/jobs')
      const data = await res.json()
      setJobs(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error("Error fetching jobs:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const method = editingJob ? 'PUT' : 'POST'
    const body = {
      ...formData,
      id: editingJob?.id,
      requirements: formData.requirements.split('\n').map((s: string) => s.trim()).filter(Boolean)
    }

    try {
      const res = await fetch('/api/admin/jobs', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (res.ok) {
        fetchJobs()
        closeModal()
      }
    } catch (error) {
      alert("Failed to save job")
    }
  }

  const deleteJob = async (id: string) => {
    if (!confirm("Are you sure you want to delete this job?")) return
    try {
      await fetch('/api/admin/jobs', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })
      setJobs(jobs.filter((j: any) => j.id !== id))
    } catch (error) {
      alert("Failed to delete job")
    }
  }

  const openModal = (job: any = null) => {
    if (job) {
      setEditingJob(job)
      setFormData({
        title: job.title,
        department: job.department,
        location: job.location,
        type: job.type,
        description: job.description,
        requirements: job.requirements.join('\n'),
        salary: job.salary || "",
        active: job.active
      })
    } else {
      setEditingJob(null)
      setFormData({
        title: "",
        department: "",
        location: "",
        type: "Full-time",
        description: "",
        requirements: "",
        salary: "",
        active: true
      })
    }
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingJob(null)
  }

  return (
    <div className="min-h-screen bg-slate-950 flex">
      <AdminSidebar activePage="jobs" />

      <main className="flex-grow p-10 overflow-y-auto">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Job Openings</h1>
            <p className="text-muted-foreground">Manage your career opportunities</p>
          </div>
          <button onClick={() => openModal()} className="px-6 py-3 bg-primary-electric text-primary-royal font-bold rounded-xl flex items-center gap-2 hover:shadow-[0_0_20px_rgba(125,249,255,0.3)] transition-all">
            <Plus className="h-5 w-5" />
            New Job
          </button>
        </header>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-10 w-10 text-primary-electric animate-spin" />
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-20 glassmorphism rounded-[2rem] border border-white/5">
            <Briefcase className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-bold text-white mb-2">No jobs posted</h3>
            <p className="text-muted-foreground">Create your first job opening</p>
          </div>
        ) : (
          <div className="space-y-4">
            {jobs.map((job) => (
              <div key={job.id} className="glassmorphism rounded-[1.5rem] border border-white/5 p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl font-bold text-white">{job.title}</h3>
                      {!job.active && <span className="px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-500 text-xs font-bold uppercase">Draft</span>}
                    </div>
                    <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1.5"><Briefcase className="h-4 w-4" /> {job.department}</span>
                      <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> {job.location}</span>
                      <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> {job.type}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/careers`} className="p-2 hover:bg-white/5 rounded-lg text-muted-foreground hover:text-white transition-all">
                      <Eye className="h-4 w-4" />
                    </Link>
                    <button onClick={() => openModal(job)} className="p-2 hover:bg-white/5 rounded-lg text-muted-foreground hover:text-primary-electric transition-all">
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button onClick={() => deleteJob(job.id)} className="p-2 hover:bg-white/5 rounded-lg text-muted-foreground hover:text-rose-500 transition-all">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Job Modal */}
        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeModal}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              />
              <motion.div
                initial={{ opacity: 0, y: 100, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 100, scale: 0.9 }}
                className="relative w-full max-w-2xl bg-slate-950 rounded-[2rem] border border-white/10 shadow-2xl overflow-hidden overflow-y-auto max-h-[90vh]"
              >
                <div className="p-8 border-b border-white/10 sticky top-0 bg-slate-950 z-10 flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-white">{editingJob ? 'Edit Job' : 'New Job'}</h2>
                  <button onClick={closeModal} className="p-2 hover:bg-white/5 rounded-lg transition-all">
                    <X className="h-5 w-5 text-muted-foreground" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground ml-1">Job Title</label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-primary-electric transition-all text-white"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground ml-1">Department</label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-primary-electric transition-all text-white"
                        value={formData.department}
                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground ml-1">Location</label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-primary-electric transition-all text-white"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground ml-1">Employment Type</label>
                      <select
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-primary-electric transition-all text-white appearance-none"
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      >
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Contract">Contract</option>
                        <option value="Remote">Remote</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground ml-1">Salary Range (Optional)</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-primary-electric transition-all text-white"
                        placeholder="$80k - $100k"
                        value={formData.salary}
                        onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground ml-1">Job Description</label>
                    <textarea
                      required
                      rows={4}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-primary-electric transition-all text-white resize-none"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground ml-1">Requirements (One per line)</label>
                    <textarea
                      required
                      rows={6}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-primary-electric transition-all text-white resize-none"
                      placeholder="3+ years experience with React&#10;Strong problem-solving skills"
                      value={formData.requirements}
                      onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                    />
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/10">
                    <input
                      type="checkbox"
                      id="active"
                      className="w-5 h-5 rounded-md accent-primary-electric"
                      checked={formData.active}
                      onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                    />
                    <label htmlFor="active" className="text-sm font-medium text-white cursor-pointer">
                      Post this job publicly
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
                      className="px-8 py-3 bg-gradient-to-r from-primary-royal to-primary-purple text-white rounded-xl font-bold flex items-center gap-2 hover:shadow-[0_0_20px_rgba(0,35,102,0.4)] transition-all"
                    >
                      <Save className="h-4 w-4" />
                      {editingJob ? 'Update Job' : 'Post Job'}
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
