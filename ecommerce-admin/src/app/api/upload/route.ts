import cloudinary from "@/lib/cloudinary";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
    const {image} = await request.json();
    const upload = await cloudinary.uploader.upload(image, {
        folder: "products",
    });
    return NextResponse.json({url: upload.secure_url});
}