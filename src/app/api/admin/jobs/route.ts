import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const jobs = await prisma.job.findMany({
      where: { active: true },
      orderBy: { createdAt: 'desc' },
    });
    // Parse requirements JSON strings to arrays
    const parsedJobs = jobs.map(job => ({
      ...job,
      requirements: job.requirements ? JSON.parse(job.requirements) : [],
    }));
    return NextResponse.json(parsedJobs);
  } catch (error) {
    console.error("Jobs API Error:", error);
    return NextResponse.json({ error: "Failed to fetch jobs" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, department, location, type, description, requirements, salary, active } = body;
    const job = await prisma.job.create({
      data: {
        title,
        department,
        location,
        type,
        description,
        requirements: JSON.stringify(requirements), // Stringify array to JSON
        salary,
        active
      },
    });
    // Parse back to array for response
    const parsedJob = {
      ...job,
      requirements: job.requirements ? JSON.parse(job.requirements) : [],
    };
    return NextResponse.json(parsedJob, { status: 201 });
  } catch (error) {
    console.error("Create Job Error:", error);
    return NextResponse.json({ error: "Failed to create job" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, title, department, location, type, description, requirements, salary, active } = body;
    const job = await prisma.job.update({
      where: { id },
      data: {
        title,
        department,
        location,
        type,
        description,
        requirements: JSON.stringify(requirements), // Stringify array to JSON
        salary,
        active
      },
    });
    // Parse back to array for response
    const parsedJob = {
      ...job,
      requirements: job.requirements ? JSON.parse(job.requirements) : [],
    };
    return NextResponse.json(parsedJob);
  } catch (error) {
    console.error("Update Job Error:", error);
    return NextResponse.json({ error: "Failed to update job" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    await prisma.job.delete({
      where: { id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete Job Error:", error);
    return NextResponse.json({ error: "Failed to delete job" }, { status: 500 });
  }
}
