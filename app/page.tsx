import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">Flowboard</h1>
      <p className="text-lg text-gray-500">Create and manage your flowcharts with ease</p>
      <Link href="/login">
        <Button className="mt-4">Get Started</Button>
      </Link>
    </div>
  );
}
