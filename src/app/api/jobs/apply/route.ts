import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, resume, coverLetter, jobId } = body;
    const application = await prisma.jobApplication.create({
      data: {
        name,
        email,
        phone,
        resume,
        coverLetter,
        jobId
      },
    });
    return NextResponse.json(application, { status: 201 });
  } catch (error) {
    console.error("Job Application Error:", error);
    return NextResponse.json({ error: "Failed to submit application" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { id, status } = await req.json();
    const application = await prisma.jobApplication.update({
      where: { id },
      data: { status },
    });
    return NextResponse.json(application);
  } catch (error) {
    console.error("Update Application Error:", error);
    return NextResponse.json({ error: "Failed to update application" }, { status: 500 });
  }
}
