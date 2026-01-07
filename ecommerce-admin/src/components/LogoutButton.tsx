"use client"

import { signOut } from "next-auth/react"

export default function LogOutButton(){
    return(
        <button onClick={() => signOut({
            callbackUrl: "/login"
        })} className="text-[0.9rem] text-red-600">Logout</button>
    );
}