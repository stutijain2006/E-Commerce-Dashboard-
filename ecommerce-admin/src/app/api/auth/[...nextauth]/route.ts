import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export const runtime = "nodejs";

const handler = NextAuth({
    providers: [
        Credentials({
            name: "Admin Login",
            credentials: {
                email: {label : "Email", type : "email"},
                password: {label : "Password", type : "password"}
            },
            async authorize(credentials){
                if (!credentials?.email || !credentials?.password) return null;
            
            const admin = await prisma.admin.findUnique({
                where: {
                    email: credentials.email
                }
            });

            if (!admin) return null;

            const passwordMatch = await bcrypt.compare(credentials.password, admin.password);

            if (!passwordMatch) return null;

            return{
                id: admin.id,
                email: admin.email
            };
            },
        }),
    ],

    session: {
        strategy: "jwt"
    },
    pages: {
        signIn: "/login"
    },
});

export { handler as GET, handler as POST };