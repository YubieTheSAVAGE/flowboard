import LogsData from "@/components/ui/data/logs-data";
import { getUser } from "@/lib/dal/dal";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
    title: "Logs",
    description: "Flowboard is a platform for creating and managing your flowcharts.",
};

export default async function LogsPage() {
    const user = await getUser();
    if (user?.role !== "ADMIN") {
        notFound();
    }
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Audit Logs</h1>
            <LogsData />
        </div>
    );
}