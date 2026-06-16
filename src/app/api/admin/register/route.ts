import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()

    const existingAdmin = await prisma.admin.findUnique({
      where: { email },
    })

    if (existingAdmin) {
      return NextResponse.json(
        { error: "Admin already exists" },
        { status: 400 }
      )
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const admin = await prisma.admin.create({
      data: {
        email,
        password: hashedPassword,
      },
    })

    return NextResponse.json({ success: true, admin })
  } catch (error: any) {
    console.error("Register error:", error)
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "Admin already exists" },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
