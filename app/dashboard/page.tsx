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
        <main className="flex flex-col items-center justify-center h-full relative overflow-hidden">
            {/* Animated background grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]" />
            {/* Gradient orbs */}
            <div className="absolute top-1/4 -left-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-primary/3 rounded-full blur-3xl animate-pulse [animation-delay:1s]" />
            {/* Content */}
            <div className="relative z-10 flex flex-col items-center text-center px-6">
                {/* Icon */}
                <div className="mb-8 relative">
                    <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center">
                        <svg 
                            className="w-10 h-10 text-primary/60" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                            strokeWidth={1.5}
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42" 
                            />
                        </svg>
                    </div>
                    <span className="absolute -top-1 -right-1 flex h-4 w-4">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/40 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-4 w-4 bg-primary/60"></span>
                    </span>
                </div>
                {/* Text */}
                <h1 className="text-4xl font-semibold tracking-tight text-foreground mb-3">
                    Something great is brewing
                </h1>
                <p className="text-muted-foreground text-lg max-w-md mb-8">
                    We&apos;re crafting the dashboard experience. Check back soon, {user.name?.split(' ')[0]}.
                </p>
            </div>
        </main>
    )
}
