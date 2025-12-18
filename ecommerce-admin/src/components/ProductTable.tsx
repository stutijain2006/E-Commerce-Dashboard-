"use client"

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { Product } from "@prisma/client";

interface ProductTableProps {
    products: Product[];
}

export default function ProductTable({ products: initialProducts }: ProductTableProps) {
    const router = useRouter();
    const [products, setProducts] = useState(initialProducts);
    const [searchTerm, setSearchTerm] = useState("");
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

    // Update products when initialProducts changes (after refresh)
    useEffect(() => {
        setProducts(initialProducts);
    }, [initialProducts]);

    const filteredProducts = useMemo(() => {
        if (!searchTerm) return products;
        const searchLower = searchTerm.toLowerCase();
        return products.filter((product) => (
            product.id.toLowerCase().includes(searchLower) ||
            product.name.toLowerCase().includes(searchLower) ||
            product.description.toLowerCase().includes(searchLower) ||
            product.price.toString().includes(searchLower) ||
            product.stock.toString().includes(searchLower)
        ));
    }, [products, searchTerm]);

    const handleDelete = async (id: string) => {
        setDeletingId(id);
        try {
            const response = await fetch(`/api/products/${id}`, {
                method: "DELETE",
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to delete product");
            }

            setProducts(products.filter((p) => p.id !== id));
            // Use router.refresh() only if needed, but it causes full page reload
            // Instead, we'll update local state and let the parent handle refresh if needed
            setTimeout(() => {
                router.refresh();
            }, 100);
        } catch (error) {
            console.error("Delete error:", error);
            alert(`Failed to delete product: ${error instanceof Error ? error.message : "Unknown error"}`);
        } finally {
            setDeletingId(null);
            setShowDeleteConfirm(null);
        }
    };

    return (
        <div className="w-full flex flex-col gap-6">
            <div className="flex items-center justify-between gap-4 px-4">
                <div className="flex-1 max-w-md">
                    <input
                        type="text"
                        placeholder="Search by ID, name, description, price, or stock..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                    />
                </div>
                <a
                    href="/dashboard/create"
                    className="px-6 py-2 bg-slate-900 text-white rounded-lg font-semibold hover:bg-slate-800 transition-all"
                >
                    + Add Product
                </a>
            </div>

            <div className="w-full overflow-x-auto rounded-xl bg-white shadow-sm border border-slate-200">
                <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="px-6 py-4 text-left text-lg font-semibold uppercase tracking-wider text-slate-700">
                                Product ID
                            </th>
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
                            <th className="px-6 py-4 text-left text-lg font-semibold uppercase tracking-wider text-slate-700">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 bg-white">
                        {filteredProducts.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="px-6 py-8 text-center text-slate-500">
                                    {searchTerm ? "No products found matching your search." : "No products available."}
                                </td>
                            </tr>
                        ) : (
                            filteredProducts.map((product) => (
                                <tr key={product.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 text-sm font-mono text-slate-600">
                                        {product.id.substring(0, 8)}...
                                    </td>
                                    <td className="px-6 py-4 text-base font-medium text-slate-900">
                                        {product.name}
                                    </td>
                                    <td className="px-6 py-4 text-base text-slate-700 max-w-xs truncate">
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
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <a
                                                href={`/dashboard/edit/${product.id}`}
                                                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-all"
                                            >
                                                Edit
                                            </a>
                                            <button
                                                onClick={() => setShowDeleteConfirm(product.id)}
                                                disabled={deletingId === product.id}
                                                className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                {deletingId === product.id ? "Deleting..." : "Delete"}
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {showDeleteConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                        <h3 className="text-lg font-bold text-slate-900 mb-2">Confirm Delete</h3>
                        <p className="text-slate-600 mb-6">
                            Are you sure you want to delete this product? This action cannot be undone.
                        </p>
                        <div className="flex gap-4 justify-end">
                            <button
                                onClick={() => setShowDeleteConfirm(null)}
                                className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg font-semibold hover:bg-slate-50 transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleDelete(showDeleteConfirm)}
                                disabled={deletingId === showDeleteConfirm}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {deletingId === showDeleteConfirm ? "Deleting..." : "Delete"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

