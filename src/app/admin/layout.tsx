"use client"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useSession } from "@/components/session-context"
import { Loader2 } from "lucide-react"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { session, loading } = useSession()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Don't redirect from login or register pages
    if (pathname === "/admin/login" || pathname === "/admin/register") {
      return
    }

    if (!loading && !session) {
      router.push("/admin/login")
    }
  }, [session, loading, router, pathname])

  // If on login/register, don't show loading
  if (pathname === "/admin/login" || pathname === "/admin/register") {
    return <>{children}</>
  }

  // Show loading while checking auth
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
      </div>
    )
  }

  // If authenticated, show children
  if (session) {
    return <>{children}</>
  }

  // Otherwise show nothing while redirecting
  return null
}
