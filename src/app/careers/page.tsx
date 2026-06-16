"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Briefcase, MapPin, Clock, DollarSign, CheckCircle2, Send, X, Loader2 } from "lucide-react"

export default function CareersPage() {
  const [jobs, setJobs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedJob, setSelectedJob] = useState<any>(null)
  const [submitting, setSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    resume: "",
    coverLetter: ""
  })

  useEffect(() => {
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
    fetchJobs()
  }, [])

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedJob) return
    setSubmitting(true)
    try {
      const res = await fetch('/api/jobs/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          jobId: selectedJob.id
        }),
      })
      if (res.ok) {
        alert("Application submitted successfully!")
        setSelectedJob(null)
        setFormData({ name: "", email: "", phone: "", resume: "", coverLetter: "" })
      }
    } catch (error) {
      alert("Failed to submit application")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="pt-32 pb-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
              Join Our Team
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              We're building the future of digital solutions. Come work with passionate people and make an impact.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="py-20 text-center">
              <Loader2 className="h-10 w-10 text-primary-electric animate-spin mx-auto mb-4" />
              <p className="text-muted-foreground">Loading opportunities...</p>
            </div>
          ) : jobs.length === 0 ? (
            <div className="py-20 text-center glassmorphism rounded-[2rem] border border-white/5">
              <Briefcase className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-bold text-white mb-2">No open positions at the moment</h3>
              <p className="text-muted-foreground">Check back soon for exciting new opportunities!</p>
            </div>
          ) : (
            <div className="space-y-6">
              {jobs.map((job) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="glassmorphism rounded-[1.5rem] border border-white/5 p-6 hover:border-primary-electric/30 transition-all group"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold text-white group-hover:text-primary-electric transition-colors">{job.title}</h3>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <MapPin className="h-4 w-4" /> {job.location}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="h-4 w-4" /> {job.type}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Briefcase className="h-4 w-4" /> {job.department}
                        </span>
                        {job.salary && (
                          <span className="flex items-center gap-1.5 text-primary-electric font-bold">
                            <DollarSign className="h-4 w-4" /> {job.salary}
                          </span>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedJob(job)}
                      className="px-6 py-3 bg-gradient-to-r from-primary-royal to-primary-purple text-white rounded-xl font-bold flex items-center gap-2 hover:shadow-[0_0_20px_rgba(0,35,102,0.4)] transition-all"
                    >
                      Apply Now
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <AnimatePresence>
        {selectedJob && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, y: 100, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.9 }}
              className="w-full max-w-2xl bg-slate-950 rounded-[2rem] border border-white/10 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              <div className="p-8 border-b border-white/10 sticky top-0 bg-slate-950 z-10">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-1">{selectedJob.title}</h2>
                    <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> {selectedJob.location}</span>
                      <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> {selectedJob.type}</span>
                    </div>
                  </div>
                  <button onClick={() => setSelectedJob(null)} className="p-2 hover:bg-white/5 rounded-lg">
                    <X className="h-5 w-5 text-muted-foreground" />
                  </button>
                </div>
              </div>

              <form onSubmit={handleApply} className="p-8 space-y-6">
                <div className="glassmorphism rounded-xl border border-white/5 p-6 mb-8">
                  <h3 className="text-lg font-bold text-white mb-3">About This Role</h3>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{selectedJob.description}</p>
                  <h4 className="font-semibold text-white mb-2 mt-4">Requirements</h4>
                  <ul className="space-y-2">
                    {selectedJob.requirements.map((req: string, i: number) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 text-primary-electric mt-0.5 flex-shrink-0" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground ml-1">Full Name</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-primary-electric transition-all text-white"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground ml-1">Email</label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-primary-electric transition-all text-white"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground ml-1">Phone</label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-primary-electric transition-all text-white"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground ml-1">Resume URL</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-primary-electric transition-all text-white"
                      placeholder="https://..."
                      value={formData.resume}
                      onChange={(e) => setFormData({ ...formData, resume: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground ml-1">Cover Letter</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-primary-electric transition-all text-white resize-none"
                    placeholder="Tell us why you're a great fit..."
                    value={formData.coverLetter}
                    onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                  />
                </div>

                <div className="flex justify-end gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setSelectedJob(null)}
                    className="px-6 py-3 bg-white/5 border border-white/10 text-white rounded-xl font-bold hover:bg-white/10 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-8 py-3 bg-gradient-to-r from-primary-royal to-primary-purple text-white rounded-xl font-bold flex items-center gap-2 hover:shadow-[0_0_20px_rgba(0,35,102,0.4)] transition-all disabled:opacity-50"
                  >
                    {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                    {submitting ? 'Submitting...' : 'Submit Application'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  )
}
