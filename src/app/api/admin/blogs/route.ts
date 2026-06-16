import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET all blogs
export async function GET() {
  try {
    const blogs = await prisma.blog.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(blogs);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
  }
}

// POST a new blog
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, slug, content, image, category, author, published } = body;

    const blog = await prisma.blog.create({
      data: {
        title,
        slug,
        content,
        image,
        category,
        author,
        published: published || false,
      },
    });

    return NextResponse.json(blog, { status: 201 });
  } catch (error) {
    console.error("Create Blog Error:", error);
    return NextResponse.json({ error: "Failed to create blog" }, { status: 500 });
  }
}
