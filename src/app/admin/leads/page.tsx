"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { AdminSidebar } from "@/components/admin-sidebar"
import {
  Users,
  Search,
  Trash2,
  Loader2,
  Mail,
  Phone,
  Building,
} from "lucide-react"
import Link from "next/link"

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    fetchLeads()
  }, [])

  const fetchLeads = async () => {
    try {
      const res = await fetch('/api/admin/leads')
      const data = await res.json()
      setLeads(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error("Error fetching leads:", error)
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (id: string, status: string) => {
    try {
      await fetch('/api/admin/leads', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      })
      setLeads(leads.map(l => l.id === id ? { ...l, status } : l))
    } catch (error) {
      alert("Failed to update status")
    }
  }

  const deleteLead = async (id: string) => {
    if (!confirm("Are you sure you want to delete this lead?")) return
    try {
      await fetch('/api/admin/leads', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })
      setLeads(leads.filter(l => l.id !== id))
    } catch (error) {
      alert("Failed to delete lead")
    }
  }

  const filteredLeads = leads.filter(lead =>
    lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (lead.company && lead.company.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  if (loading) return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <Loader2 className="h-10 w-10 text-primary-electric animate-spin" />
    </div>
  )

  return (
    <div className="min-h-screen bg-slate-950 flex">
      <AdminSidebar activePage="leads" />

      <main className="flex-grow p-10 overflow-y-auto">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Lead Management</h1>
            <p className="text-muted-foreground">Manage and track your business inquiries.</p>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              className="pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-primary-electric w-64"
              placeholder="Search leads..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </header>

        <div className="glassmorphism rounded-[2rem] border border-white/5 p-8">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/5 text-muted-foreground text-sm font-medium">
                  <th className="pb-4 px-4">Contact</th>
                  <th className="pb-4 px-4">Project Details</th>
                  <th className="pb-4 px-4">Status</th>
                  <th className="pb-4 px-4">Date</th>
                  <th className="pb-4 px-4">Actions</th>
                </tr>
              </thead>
              <tbody className="text-white">
                {filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-10 text-center text-muted-foreground">
                      No leads found.
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((lead) => (
                    <tr key={lead.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                      <td className="py-4 px-4">
                        <div className="space-y-1">
                          <p className="font-bold">{lead.name}</p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground max-w-[200px] break-all">
                            <Mail className="h-3 w-3 shrink-0" /> {lead.email}
                          </div>
                          {lead.phone && (
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Phone className="h-3 w-3" /> {lead.phone}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-primary-electric">{lead.service}</p>
                          {lead.company && (
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Building className="h-3 w-3" /> {lead.company}
                            </div>
                          )}
                          <p className="text-xs text-muted-foreground line-clamp-1">{lead.message}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <select
                          value={lead.status}
                          onChange={(e) => updateStatus(lead.id, e.target.value)}
                          className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-transparent border border-white/10 focus:outline-none ${lead.status === 'PENDING' ? 'text-blue-500' :
                            lead.status === 'CONTACTED' ? 'text-orange-500' :
                              'text-emerald-500'
                            }`}
                        >
                          <option value="PENDING" className="bg-slate-900">Pending</option>
                          <option value="CONTACTED" className="bg-slate-900">Contacted</option>
                          <option value="CLOSED" className="bg-slate-900">Closed</option>
                        </select>
                      </td>
                      <td className="py-4 px-4 text-sm text-muted-foreground">
                        {new Date(lead.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-4">
                        <button onClick={() => deleteLead(lead.id)} className="p-2 hover:text-rose-500 transition-colors">
                          <Trash2 className="h-4 w-4" />
                        </button>
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
