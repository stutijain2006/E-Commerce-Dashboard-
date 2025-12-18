import ProductForm from "@/components/ProductForm";

export const runtime = "nodejs";

export default function CreateProductPage() {
    return (
        <div className="min-h-screen bg-slate-50 p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-slate-900 mb-8">Add New Product</h1>
                <ProductForm />
            </div>
        </div>
    );
}