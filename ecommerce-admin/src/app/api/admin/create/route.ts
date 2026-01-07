import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { getServerSession } from "next-auth";

export async function POST(request: Request) {
    const session = await getServerSession();

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { email, password } = await request.json();

    const hashedPassword = await bcrypt.hash(password, 10);
    
    await prisma.admin.create({
        data: {
            email,
            password: hashedPassword,
        },
    });
    return NextResponse.json({ message: "Admin created successfully" });
}