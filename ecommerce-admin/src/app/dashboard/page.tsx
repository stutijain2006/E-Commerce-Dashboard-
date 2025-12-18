import type { Product } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export default async function Dashboard() {
    const products: Product[] = await prisma.product.findMany({
        orderBy: {createdAt : "desc"},
    });

    return(
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Products </h1>
            <table className="w-full border">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Stock</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.name}</td>
                            <td>Rupees: {product.price}</td>
                            <td>{product.stock}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}