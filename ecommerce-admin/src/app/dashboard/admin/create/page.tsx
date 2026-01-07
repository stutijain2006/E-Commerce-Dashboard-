"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminCreatePage(){
    const router = useRouter();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false);
    
    const handleCreate = async(e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const res = await fetch("/api/admin/create", {
            method: "POST",
            body: JSON.stringify({email, password}),
            headers: {
                "Content-Type": "application/json"
            }
        });
        setLoading(false);

        if(res.ok){
            alert("Admin created successfully");
            router.push("/dashboard");
        }else{
            alert("Failed to create admin");
        }
    };

    return(
        <div className="flex max-w-6xl mx-auto mt-10 bg-white p-6 rounded-lg shadow">
            <h1 className="text-[1.2rem] font-bold mb-4">Create New Admin</h1>

            <form onSubmit={handleCreate} className="space-y-4">
                <input className="border w-full px-4 py-2 mb-3" placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

                <input className="border w-full px-4 py-2 mb-3" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

                <button className="w-full bg-blue-600 text-white py-2" disabled={loading}>{loading ? "Creating..." : "Create Admin"}</button>
            </form>
        </div>
    )
}