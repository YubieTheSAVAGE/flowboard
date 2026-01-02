import { Button } from "@/components/ui/button";
import { signout } from "@/lib/auth";
import { getUser } from "@/lib/dal/dal";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
    title: "Dashboard",
    description: "Flowboard is a platform for creating and managing your flowcharts.",
};

export default async function Dashboard() {
    const user = await getUser();
    if (!user) {
        notFound();
    }
    return (
        <main className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-sm text-gray-500">Welcome, {user.name}</p>
            <Button onClick={signout} className="mt-4">Signout</Button>
        </main>
    )
}