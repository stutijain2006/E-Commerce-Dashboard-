import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import AdminCreatePage from "./create/page";

export default async function AdminPage(){
    const session = await getServerSession();
    if (!session){
        redirect("/login");
    }

    return(
        <div className="p-8 max-w-6xl mx-auto">
            <h1 className="text-[1.2rem] font-bold mb-6">Create new Admin </h1>
            <AdminCreatePage />
        </div>
    )
}