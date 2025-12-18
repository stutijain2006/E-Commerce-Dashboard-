import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(_: Request, { params }: any) {
    await prisma.product.delete({ where: { id: params.id } });
    return NextResponse.json({success : true});
}
