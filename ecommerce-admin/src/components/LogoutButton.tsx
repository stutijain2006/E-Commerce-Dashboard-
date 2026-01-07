"use client"

import { signOut } from "next-auth/react"

export default function LogOutButton(){
    return(
        <button onClick={() => signOut({
            callbackUrl: "/login"
        })} className="text-[1rem] text-red-600 border px-4 py-2 rounded-lg">Logout</button>
    );
}