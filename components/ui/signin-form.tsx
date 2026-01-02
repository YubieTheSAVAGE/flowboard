"use client";
import { SigninFormState } from "@/lib/definitions";
import { Button } from "./button";
import { Input } from "./input";
import { Label } from "./label";
import { signin } from "@/lib/auth";
import { useActionState, useState } from "react";
import { SpinningCircle } from "./spinning-circle";

export function SigninForm() {
    const [state, action, pending] = useActionState(signin, {} as SigninFormState)    
    const [formData, setFormData] = useState(
        {
            email: "",
            password: "",
        }
    )
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }
    return (
        <form 
          className="flex flex-col items-center justify-center gap-4 w-full"
          action={action}
        >
            <div className="flex flex-col gap-2 w-full max-w-xs">
                <Label htmlFor="email">Email</Label>
                <Input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} />
            </div>
            <div className="flex flex-col gap-2 w-full max-w-xs">
                <Label htmlFor="password">Password</Label>
                <Input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} />
            </div>
            <Button disabled={pending} type="submit" className="w-full max-w-xs">
                {pending ? <SpinningCircle /> : "Signin"}
            </Button>
            {state?.message && <p className="text-xs text-red-500">{state.message}</p>}
        </form>
    )
}