import { getUser } from "@/lib/dal";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();
  if (!user) {
    redirect("/signin");
  }
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      {children}
    </main>
  );
}
