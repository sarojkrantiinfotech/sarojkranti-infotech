"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useRouter } from "next/navigation"
import { useSession } from "@/components/session-context"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  Settings,
  LogOut,
  MessageSquare,
  MessageCircle,
  Users,
} from "lucide-react"

interface AdminSidebarProps {
  activePage: string
}

export function AdminSidebar({ activePage }: AdminSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { checkSession } = useSession()

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" })
      await checkSession()
      router.push("/admin/login")
    } catch (error) {
      console.error("Logout failed:", error)
      router.push("/admin/login")
    }
  }

  const menuItems = [
    { id: "dashboard", label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { id: "leads", label: "Leads", href: "/admin/leads", icon: MessageSquare },
    { id: "portfolio", label: "Portfolio", href: "/admin/portfolio", icon: Briefcase },
    { id: "blogs", label: "Blog", href: "/admin/blogs", icon: FileText },
    { id: "jobs", label: "Jobs", href: "/admin/jobs", icon: Briefcase },
    { id: "settings", label: "Settings", href: "/admin/settings", icon: Settings },
  ]

  return (
    <aside className="w-64 border-r border-white/5 p-6 flex flex-col gap-8 h-screen sticky top-0 bg-slate-950">
      <div className="flex items-center gap-3 px-2">
        <div className="w-12 h-12">
          <img src="/logo.webp" alt="Saroj Kranti Infotech" className="w-full h-full object-contain" />
        </div>
        <span className="font-bold text-white">Admin Panel</span>
      </div>

      <nav className="flex-grow space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all",
              activePage === item.id
                ? "bg-white/5 text-primary-electric"
                : "text-muted-foreground hover:bg-white/5 hover:text-white"
            )}
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="pt-4 border-t border-white/5 space-y-2">
        <a
          href="https://wa.me/917772972720"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-4 py-3 text-green-500 hover:bg-green-500/10 rounded-xl font-medium transition-all"
        >
          <MessageCircle className="h-5 w-5" />
          WhatsApp Support
        </a>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-rose-500 hover:bg-rose-500/10 rounded-xl font-medium transition-all"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </div>
    </aside>
  )
}
