"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema } from "@/schema/product.schema";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";

type ProductFormData = z.infer<typeof productSchema>;

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/png", "image/jpeg", "image/jpg", "image/webp"];

export default function ProductForm() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [imageError, setImageError] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const isSubmittingRef = useRef(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ProductFormData>({
        resolver: zodResolver(productSchema),
    });

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setImageError(null);
        setImageUrl(null);

        if (!file) {
            return;
        }

        // Validate file type
        if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
            setImageError(`Invalid file type. Please upload PNG, JPG, JPEG, or WEBP files only.`);
            return;
        }

        // Validate file size
        if (file.size > MAX_FILE_SIZE) {
            setImageError(`File size too large. Maximum size is ${MAX_FILE_SIZE / (1024 * 1024)}MB.`);
            return;
        }

        setUploading(true);
        try {
            const reader = new FileReader();
            reader.onload = async () => {
                try {
                    const response = await fetch('/api/upload', {
                        method: 'POST',
                        body: JSON.stringify({ image: reader.result }),
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });

                    if (!response.ok) {
                        throw new Error("Upload failed");
                    }

                    const data = await response.json();
                    setImageUrl(data.url);
                    setImageError(null);
                } catch (error) {
                    setImageError("Failed to upload image. Please try again.");
                } finally {
                    setUploading(false);
                }
            };
            reader.onerror = () => {
                setImageError("Failed to read file. Please try again.");
                setUploading(false);
            };
            reader.readAsDataURL(file);
        } catch (error) {
            setImageError("An error occurred while processing the file.");
            setUploading(false);
        }
    };

    const onSubmit = async (data: ProductFormData) => {
        // Prevent double submission
        if (isSubmittingRef.current) {
            return;
        }

        if (!imageUrl) {
            setImageError("Please upload an image");
            return;
        }

        isSubmittingRef.current = true;
        setLoading(true);
        setSuccessMessage(null);
        
        try {
            const response = await fetch('/api/products', {
                method: 'POST',
                body: JSON.stringify({
                    ...data,
                    imageUrl
                }),
                headers: {
                    "Content-Type": "application/json",
                }
            });

            if (!response.ok) {
                throw new Error("Failed to create product");
            }

            setSuccessMessage("Product added successfully! Redirecting...");
            
            // Wait a moment to show success message before redirecting
            setTimeout(() => {
                router.push('/dashboard');
                router.refresh();
            }, 1500);
        } catch (error) {
            setSuccessMessage(null);
            alert("Failed to create product. Please try again.");
            isSubmittingRef.current = false;
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-md p-8 space-y-6">
                <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-semibold text-slate-700">
                        Product Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        id="name"
                        {...register("name")}
                        placeholder="Enter product name"
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all"
                    />
                    {errors.name && (
                        <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <label htmlFor="description" className="block text-sm font-semibold text-slate-700">
                        Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        id="description"
                        {...register("description")}
                        placeholder="Enter product description"
                        rows={4}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all resize-none"
                    />
                    {errors.description && (
                        <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
                    )}
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label htmlFor="price" className="block text-sm font-semibold text-slate-700">
                            Price (₹) <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="price"
                            type="number"
                            step="0.01"
                            {...register("price", { valueAsNumber: true })}
                            placeholder="0.00"
                            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all"
                        />
                        {errors.price && (
                            <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="stock" className="block text-sm font-semibold text-slate-700">
                            Stock <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="stock"
                            type="number"
                            {...register("stock", { valueAsNumber: true })}
                            placeholder="0"
                            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all"
                        />
                        {errors.stock && (
                            <p className="text-red-500 text-sm mt-1">{errors.stock.message}</p>
                        )}
                    </div>
                </div>

                <div className="space-y-2">
                    <label htmlFor="image" className="block text-sm font-semibold text-slate-700">
                        Product Image <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-2">
                        <label
                            htmlFor="image"
                            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-300 rounded-lg cursor-pointer bg-slate-50 hover:bg-slate-100 hover:border-slate-400 transition-all"
                        >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg
                                    className="w-10 h-10 mb-3 text-slate-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                    />
                                </svg>
                                <p className="mb-2 text-sm text-slate-500">
                                    <span className="font-semibold">Click to upload</span> or drag and drop
                                </p>
                                <p className="text-xs text-slate-500">
                                    PNG, JPG, JPEG, WEBP (MAX. 5MB)
                                </p>
                            </div>
                            <input
                                id="image"
                                ref={fileInputRef}
                                type="file"
                                accept="image/png,image/jpeg,image/jpg,image/webp"
                                onChange={handleFileChange}
                                disabled={uploading}
                                className="hidden"
                            />
                        </label>
                    </div>
                    {uploading && (
                        <div className="flex items-center gap-2 text-blue-500 text-sm mt-2">
                            <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span>Uploading image...</span>
                        </div>
                    )}
                    {imageError && (
                        <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-red-600 text-sm">{imageError}</p>
                        </div>
                    )}
                    {imageUrl && !imageError && (
                        <div className="mt-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                            <p className="text-green-700 text-sm font-semibold mb-3">✓ Image uploaded successfully</p>
                            <img
                                src={imageUrl}
                                alt="Preview"
                                className="h-32 w-32 object-cover rounded-lg border-2 border-green-500"
                            />
                        </div>
                    )}
                </div>

                {successMessage && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <p className="text-green-700 font-semibold">{successMessage}</p>
                        </div>
                    </div>
                )}

                <div className="flex gap-4 pt-4">
                    <button
                        type="submit"
                        disabled={loading || uploading || isSubmittingRef.current}
                        className="flex-1 bg-slate-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Creating...
                            </span>
                        ) : (
                            "Add Product"
                        )}
                    </button>
                    <button
                        type="button"
                        onClick={() => router.back()}
                        disabled={loading || uploading || isSubmittingRef.current}
                        className="px-6 py-3 border border-slate-300 text-slate-700 rounded-lg font-semibold hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}