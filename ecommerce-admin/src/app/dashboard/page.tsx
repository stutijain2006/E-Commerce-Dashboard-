import type { Product } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import ProductBarCharts from "@/components/ProductBarCharts";
import ProductBarCharts1 from "@/components/ProductBarCharts1";

export const runtime = "nodejs";

export default async function Dashboard() {
    const products: Product[] = await prisma.product.findMany({
        orderBy: { createdAt: "desc" },
    });

    return (
        <div className="min-h-screen bg-slate-50 p-8 w-full">
            <div className="max-w-7xl mx-auto flex flex-col gap-8">
                <header className="flex items-center justify-between px-4">
                    <h1 className="text-3xl font-bold text-slate-900">Products</h1>
                    <p className="text-sm text-slate-500">
                        {products.length} product{products.length === 1 ? "" : "s"} in inventory
                    </p>
                </header>

                <div className="w-full overflow-x-auto rounded-xl bg-white shadow-sm border border-slate-200">
                    <table className="min-w-full divide-y divide-slate-200">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="px-6 py-4 text-left text-lg font-semibold uppercase tracking-wider text-slate-700">
                                    Name
                                </th>
                                <th className="px-6 py-4 text-left text-lg font-semibold uppercase tracking-wider text-slate-700">
                                    Description
                                </th>
                                <th className="px-6 py-4 text-left text-lg font-semibold uppercase tracking-wider text-slate-700">
                                    Price
                                </th>
                                <th className="px-6 py-4 text-left text-lg font-semibold uppercase tracking-wider text-slate-700">
                                    Stock
                                </th>
                                <th className="px-6 py-4 text-left text-lg font-semibold uppercase tracking-wider text-slate-700">
                                    Image
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 bg-white">
                            {products.map((product) => (
                                <tr key={product.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 text-base font-medium text-slate-900">
                                        {product.name}
                                    </td>
                                    <td className="px-6 py-4 text-base font-medium text-slate-900">
                                        {product.description}
                                    </td>
                                    <td className="px-6 py-4 text-base text-slate-700">
                                        ₹ {product.price}
                                    </td>
                                    <td className="px-6 py-4 text-base text-slate-700">
                                        {product.stock}
                                    </td>
                                    <td className="px-6 py-4">
                                        <img
                                            src={product.imageUrl}
                                            alt={product.name}
                                            className="h-[15vh] max-w-[25vw] rounded-md object-cover"
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

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