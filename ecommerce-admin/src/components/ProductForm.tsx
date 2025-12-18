"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema } from "@/schema/product.schema";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useState } from "react";

type ProductFormData = z.infer<typeof productSchema>;


export default function ProductForm() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ProductFormData>({
        resolver: zodResolver(productSchema),
    });

    const onSubmit = async (data: ProductFormData) => {
        if (!imageUrl) {
            alert("Please upload an image");
            return;
        }
        setLoading(true);
        await fetch('/api/products', {
            method: 'POST',
            body: JSON.stringify({
                ...data,
                imageUrl
            }),
            headers: {
                "Content-Type": "application/json",
            }
        });

        setLoading(false);
        router.push('/dashboard');
        router.refresh();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
            <input {...register("name")} placeholder="Product Name" className="border w-full p-2" />
            {errors.name && <p className="text-red-500">{errors.name.message}</p>}

            <input type="text" {...register("description")} placeholder="Product Description" className="border w-full p-2" />
            <input type="number" {...register("price", { valueAsNumber: true })} placeholder="Product Price" className="border w-full p-2" />
            <input type="number" {...register("stock", { valueAsNumber: true })} placeholder="Product Stock" className="border w-full p-2" />

            <input type="file" accept="image/*" onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;

                const reader = new FileReader();
                reader.onload = async () => {
                    const response = await fetch('/api/upload', {
                        method: 'POST',
                        body: JSON.stringify({ image: reader.result }),
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });
                    const data = await response.json();
                    setImageUrl(data.url);
                };
                reader.readAsDataURL(file);
            }} />

            <button disabled={loading} className="bg-black text-white px-4 py-2">
                {loading ? "Saving" : "Add Product"}
            </button>
        </form>
    );
}