import { SigninForm } from "@/components/ui/signin-form";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Sign in",
};

export default function Signin() {
    return (
        <div className="flex flex-col items-center justify-center h-screen gap-8">
            <h1 className="text-2xl font-bold">Sign in to your account</h1>
            <SigninForm />
            <Link href="/signup" className="text-sm text-gray-800">Don't have an account?<span className="hover:underline"> Sign up</span></Link>
        </div>
    )
}