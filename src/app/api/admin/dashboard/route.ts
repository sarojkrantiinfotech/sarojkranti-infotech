import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Fetch counts for the stats cards
    const [totalLeads, totalProjects, totalBlogs, recentLeads] = await Promise.all([
      prisma.lead.count().catch(() => 0),
      prisma.project.count().catch(() => 0),
      prisma.blog.count().catch(() => 0),
      prisma.lead.findMany({
        take: 10,
        orderBy: { createdAt: 'desc' },
      }).catch(() => []),
    ]);

    return NextResponse.json({
      stats: [
        { label: "Total Leads", value: totalLeads.toString(), icon: "Users", color: "text-blue-500", bg: "bg-blue-500/10" },
        { label: "Active Projects", value: totalProjects.toString(), icon: "Briefcase", color: "text-purple-500", bg: "bg-purple-500/10" },
        { label: "Blog Posts", value: totalBlogs.toString(), icon: "FileText", color: "text-emerald-500", bg: "bg-emerald-500/10" },
        { label: "New Messages", value: totalLeads.toString(), icon: "MessageSquare", color: "text-orange-500", bg: "bg-orange-500/10" },
      ],
      recentLeads,
    });
  } catch (error) {
    console.error("Dashboard API Error:", error);
    return NextResponse.json({ 
      error: "Failed to fetch dashboard data",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}
