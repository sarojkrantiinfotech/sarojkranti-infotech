import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const leads = await prisma.lead.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(leads);
  } catch (error) {
    console.error("Leads API Error:", error);
    return NextResponse.json({
      error: "Failed to fetch leads",
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { id, status } = await req.json();
    const lead = await prisma.lead.update({
      where: { id },
      data: { status },
    });
    return NextResponse.json(lead);
  } catch (error) {
    console.error("Update Lead Error:", error);
    return NextResponse.json({
      error: "Failed to update lead",
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    await prisma.lead.delete({
      where: { id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete Lead Error:", error);
    return NextResponse.json({
      error: "Failed to delete lead",
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}
