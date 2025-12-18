import ProductFormEdit from "@/components/ProductFormEdit";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export const runtime = "nodejs";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> | { id: string } }) {
    // Handle both Next.js 15+ (Promise) and older versions
    const resolvedParams = params instanceof Promise ? await params : params;
    
    const product = await prisma.product.findUnique({
        where: { id: resolvedParams.id },
    });

    if (!product) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-slate-50 p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-slate-900 mb-8">Edit Product</h1>
                <ProductFormEdit product={product} />
            </div>
        </div>
    );
}

