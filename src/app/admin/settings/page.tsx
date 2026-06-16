"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { AdminSidebar } from "@/components/admin-sidebar"
import {
  Settings,
  User,
  Lock,
  Bell,
  Shield,
  Save,
  Loader2
} from "lucide-react"
import Link from "next/link"

export default function AdminSettingsPage() {
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    name: "Saroj Kranti Admin",
    email: "admin@skinfotech.com",
    notifications: true,
    twoFactor: false
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setTimeout(() => {
      setSaving(false)
      alert("Settings saved successfully!")
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-slate-950 flex">
      <AdminSidebar activePage="settings" />

      <main className="flex-grow p-10 overflow-y-auto">
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
          <p className="text-muted-foreground">Manage your admin profile and system preferences.</p>
        </header>

        <div className="max-w-3xl">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Profile Section */}
            <div className="glassmorphism rounded-[2rem] border border-white/5 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-primary-electric/10 text-primary-electric">
                  <User className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold text-white">Admin Profile</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground ml-1">Full Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-primary-electric transition-all text-white"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground ml-1">Email Address</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-primary-electric transition-all text-white"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Security Section */}
            <div className="glassmorphism rounded-[2rem] border border-white/5 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-purple-500/10 text-purple-500">
                  <Shield className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold text-white">Security</h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="flex items-center gap-3">
                    <Lock className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium text-white">Change Password</p>
                      <p className="text-xs text-muted-foreground">Update your administrative password</p>
                    </div>
                  </div>
                  <button type="button" className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-bold transition-all">Update</button>
                </div>

                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium text-white">Two-Factor Authentication</p>
                      <p className="text-xs text-muted-foreground">Add an extra layer of security to your account</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, twoFactor: !formData.twoFactor })}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${formData.twoFactor ? 'bg-primary-electric text-primary-royal' : 'bg-white/10'
                      }`}
                  >
                    {formData.twoFactor ? 'Enabled' : 'Enable'}
                  </button>
                </div>
              </div>
            </div>

            {/* Notifications Section */}
            <div className="glassmorphism rounded-[2rem] border border-white/5 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-orange-500/10 text-orange-500">
                  <Bell className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold text-white">Notifications</h3>
              </div>

              <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                <div>
                  <p className="text-sm font-medium text-white">Email Alerts</p>
                  <p className="text-xs text-muted-foreground">Receive email notifications for new leads and messages</p>
                </div>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, notifications: !formData.notifications })}
                  className={`w-12 h-6 rounded-full relative transition-all ${formData.notifications ? 'bg-primary-electric' : 'bg-white/10'
                    }`}
                >
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${formData.notifications ? 'right-1' : 'left-1'
                    }`} />
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="px-10 py-4 bg-gradient-to-r from-primary-royal to-primary-purple text-white rounded-2xl font-bold flex items-center gap-2 hover:shadow-[0_0_30px_rgba(0,35,102,0.4)] transition-all disabled:opacity-50"
              >
                {saving ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />}
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
