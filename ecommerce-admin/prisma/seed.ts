import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main(){
    const email= "admin.example@gmail.com";
    const password= "admin1234";

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.admin.create({data:{email, password: hashedPassword}});
    
    console.log("Admin created", email);
}

main().catch(console.error).finally(() => prisma.$disconnect());