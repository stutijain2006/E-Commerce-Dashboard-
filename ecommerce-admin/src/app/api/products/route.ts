import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const body = await request.json();
    const product = await prisma.product.create({
        data: body,
    });
    return NextResponse.json(product);
}