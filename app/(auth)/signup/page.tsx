import { SignupForm } from "@/components/ui/signup-form";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Sign up",
};

export default function Signup() {
    return (
        <div className="flex flex-col items-center justify-center h-screen gap-8">
            <h1 className="text-2xl font-bold">Create an account</h1>
            <SignupForm />
            <Link href="/signin" className="text-sm text-gray-800">Already have an account?<span className="hover:underline"> Sign in</span></Link>
        </div>
    )
}