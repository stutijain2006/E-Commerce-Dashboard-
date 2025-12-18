import ProductForm  from "@/components/ProductForm";

export const runtime = "nodejs";

export default function CreateProductPage() {
    return(
        <div className="p-6">
            <h1 className="text-xl font-bold mb-4">Add Product</h1>
            <ProductForm />
        </div>
    );
}