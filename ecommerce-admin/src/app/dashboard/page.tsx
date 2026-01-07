import type { Product } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import ProductBarCharts from "@/components/ProductBarCharts";
import ProductBarCharts1 from "@/components/ProductBarCharts1";
import ProductTable from "@/components/ProductTable";
import LogOutButton from "@/components/LogoutButton";

export const runtime = "nodejs";

export default async function Dashboard() {
    const products: Product[] = await prisma.product.findMany({
        orderBy: { createdAt: "desc" },
    });
    
    return (
        <div className="min-h-screen bg-slate-50 p-8 w-full">
            <div className="max-w-7xl mx-auto flex flex-col gap-8">
                <header className="flex items-center justify-between px-4">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">Products</h1>
                        <p className="text-sm text-slate-500">
                            {products.length} product{products.length === 1 ? "" : "s"} in inventory
                        </p>
                    </div>
                    <LogOutButton />
                </header>

                <ProductTable products={products} />

                <section className="mt-8 px-4 w-full">
                    <h2 className="text-2xl font-bold mb-6 text-slate-900">Visual Representation</h2>
                    <div className="flex flex-col justify-center items-center gap-10 w-full">
                        <ProductBarCharts products={products} />
                        <ProductBarCharts1 products={products} />
                    </div>
                </section>
            </div>
        </div>
    )
}