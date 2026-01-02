"use client";
import { Button } from "./button";
import { Input } from "./input";
import { Label } from "./label";
import { signup } from "@/lib/auth";
import { useActionState, useState } from "react";
import { SignupFormState } from "@/lib/definitions";

export function SignupForm() {
    const [state, action, pending] = useActionState(signup, {} as SignupFormState)
    const [formData, setFormData] = useState(
        {
            name: "",
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
                <Label htmlFor="name">Name</Label>
                <Input name="name" type="text" placeholder="Name" value={formData.name} onChange={handleChange} />
                {state?.errors?.name && <p className="text-xs text-red-500">{state.errors.name.join(", ")}</p>}
            </div>
            <div className="flex flex-col gap-2 w-full max-w-xs">
                <Label htmlFor="email">Email</Label>
                <Input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} />
                {state?.errors?.email && <p className="text-xs text-red-500">{state.errors.email.join(", ")}</p>}
            </div>
            <div className="flex flex-col gap-2 w-full max-w-xs">
                <Label htmlFor="password">Password</Label>
                <Input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} />
                {state?.errors?.password && <p className="text-xs text-red-500">{state.errors.password.join(", ")}</p>}
            </div>
            <Button disabled={pending} type="submit" className="w-full max-w-xs">Signup</Button>
            {state?.message && <p className="text-xs text-green-500">{state.message}</p>}
        </form>
    )
}