import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET a single blog
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const blog = await prisma.blog.findUnique({
      where: { id: params.id },
    });
    if (!blog) return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    return NextResponse.json(blog);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch blog" }, { status: 500 });
  }
}

// PUT update a blog
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const { title, slug, content, image, category, author, published } = body;

    const blog = await prisma.blog.update({
      where: { id: params.id },
      data: {
        title,
        slug,
        content,
        image,
        category,
        author,
        published,
      },
    });

    return NextResponse.json(blog);
  } catch (error) {
    console.error("Update Blog Error:", error);
    return NextResponse.json({ error: "Failed to update blog" }, { status: 500 });
  }
}

// DELETE a blog
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.blog.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete blog" }, { status: 500 });
  }
}
