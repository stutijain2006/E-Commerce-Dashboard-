import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> | { id: string } }) {
    try {
        // Handle both Next.js 15+ (Promise) and older versions
        const resolvedParams = params instanceof Promise ? await params : params;
        const product = await prisma.product.findUnique({
            where: { id: resolvedParams.id },
        });
        if (!product) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 });
        }
        return NextResponse.json(product);
    } catch (error) {
        console.error("Error fetching product:", error);
        return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 });
    }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> | { id: string } }) {
    try {
        // Handle both Next.js 15+ (Promise) and older versions
        const resolvedParams = params instanceof Promise ? await params : params;
        const body = await request.json();
        const product = await prisma.product.update({
            where: { id: resolvedParams.id },
            data: body,
        });
        return NextResponse.json(product);
    } catch (error) {
        console.error("Error updating product:", error);
        return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
    }
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> | { id: string } }) {
    try {
        // Handle both Next.js 15+ (Promise) and older versions
        const resolvedParams = params instanceof Promise ? await params : params;
        const productId = resolvedParams.id;
        
        if (!productId) {
            return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
        }

        await prisma.product.delete({ where: { id: productId } });
        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("Error deleting product:", error);
        
        // Handle Prisma errors
        if (error?.code === 'P2025') {
            return NextResponse.json({ error: "Product not found" }, { status: 404 });
        }
        
        return NextResponse.json({ 
            error: error?.message || "Failed to delete product",
            details: process.env.NODE_ENV === 'development' ? error?.stack : undefined
        }, { status: 500 });
    }
}
