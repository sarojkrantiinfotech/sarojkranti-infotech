import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: 'desc' },
    });
    // Parse techStack JSON strings to arrays
    const parsedProjects = projects.map(project => ({
      ...project,
      techStack: project.techStack ? JSON.parse(project.techStack) : [],
    }));
    return NextResponse.json(parsedProjects);
  } catch (error) {
    console.error("Portfolio API Error:", error);
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const project = await prisma.project.create({
      data: {
        title: body.title,
        description: body.description,
        image: body.image,
        category: body.category,
        techStack: JSON.stringify(body.techStack), // Stringify array to JSON
        industry: body.industry,
        link: body.link,
        featured: body.featured || false,
      },
    });
    // Parse back to array for response
    const parsedProject = {
      ...project,
      techStack: project.techStack ? JSON.parse(project.techStack) : [],
    };
    return NextResponse.json(parsedProject, { status: 201 });
  } catch (error) {
    console.error("Create Project Error:", error);
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const project = await prisma.project.update({
      where: { id: body.id },
      data: {
        title: body.title,
        description: body.description,
        image: body.image,
        category: body.category,
        techStack: JSON.stringify(body.techStack), // Stringify array to JSON
        industry: body.industry,
        link: body.link,
        featured: body.featured,
      },
    });
    // Parse back to array for response
    const parsedProject = {
      ...project,
      techStack: project.techStack ? JSON.parse(project.techStack) : [],
    };
    return NextResponse.json(parsedProject);
  } catch (error) {
    console.error("Update Project Error:", error);
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    await prisma.project.delete({
      where: { id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete Project Error:", error);
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
  }
}
