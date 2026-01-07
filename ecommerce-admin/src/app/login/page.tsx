"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return(
        <div className="flex flex-col items-center justify-center min-h-screen"> 
            <form onSubmit={(e) => {
                e.preventDefault();
                signIn("credentials",{
                    email,
                    password,
                    callbackUrl: "/dashboard",
                })
            }}
            className="bg-white p-6 rounded-lg shadow w-[70vw]" >
                <h1 className="text-[1.2rem] font-bold mb-4">Admin Login</h1>

                <input className="border w-full p-2 mb-3" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />

                <input className="border w-full p-2 mb-3" placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />

                <button className="w-full bg-blue-600 text-white py-2">Login</button>
            </form>
        </div>
    )
}