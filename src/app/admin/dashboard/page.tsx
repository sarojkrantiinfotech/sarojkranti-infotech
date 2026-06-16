"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { AdminSidebar } from "@/components/admin-sidebar"
import {
  Users,
  Briefcase,
  MessageSquare,
  Plus,
  Search,
  FileText,
  Loader2
} from "lucide-react"
import Link from "next/link"

const iconMap: Record<string, any> = {
  Users,
  Briefcase,
  FileText,
  MessageSquare
}

export default function AdminDashboard() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await fetch('/api/admin/dashboard')
        const result = await res.json()
        setData(result)
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchDashboardData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <Loader2 className="h-10 w-10 text-primary-electric animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 flex">
      <AdminSidebar activePage="dashboard" />

      {/* Main Content */}
      <main className="flex-grow p-10 overflow-y-auto">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back, Admin</h1>
            <p className="text-muted-foreground">Here's what's happening with your business today.</p>
          </div>
          <button className="px-6 py-3 bg-primary-electric text-primary-royal font-bold rounded-xl flex items-center gap-2 hover:shadow-[0_0_20px_rgba(125,249,255,0.3)] transition-all">
            <Plus className="h-5 w-5" />
            New Project
          </button>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {data?.stats?.map((stat: any) => {
            const Icon = iconMap[stat.icon] || Users
            return (
              <motion.div
                key={stat.label}
                whileHover={{ y: -5 }}
                className="p-6 glassmorphism rounded-3xl border border-white/5"
              >
                <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center mb-4`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <p className="text-muted-foreground text-sm font-medium mb-1">{stat.label}</p>
                <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
              </motion.div>
            )
          })}
        </div>

        {/* Recent Leads Table */}
        <div className="glassmorphism rounded-[2rem] border border-white/5 p-8">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold text-white">Recent Leads</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                className="pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-primary-electric w-64"
                placeholder="Search leads..."
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/5 text-muted-foreground text-sm font-medium">
                  <th className="pb-4 px-4">Name</th>
                  <th className="pb-4 px-4">Service</th>
                  <th className="pb-4 px-4">Status</th>
                  <th className="pb-4 px-4">Date</th>
                  <th className="pb-4 px-4">Action</th>
                </tr>
              </thead>
              <tbody className="text-white">
                {data?.recentLeads?.map((lead: any) => (
                  <tr key={lead.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                    <td className="py-4 px-4">
                      <p className="font-bold">{lead.name}</p>
                      <p className="text-xs text-muted-foreground">{lead.email}</p>
                    </td>
                    <td className="py-4 px-4 text-sm">{lead.service}</td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${lead.status === 'PENDING' ? 'bg-blue-500/20 text-blue-500' :
                        lead.status === 'CONTACTED' ? 'bg-orange-500/20 text-orange-500' :
                          'bg-emerald-500/20 text-emerald-500'
                        }`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm text-muted-foreground">
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-4">
                      <button className="text-xs font-bold text-primary-electric hover:underline">View Details</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}
