"use server"
import { SigninFormState, SignupFormState, signupSchema } from "./definitions";
import bcrypt from "bcrypt";
import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import 'dotenv/config'
import { createSession, deleteSession } from "./session";
import { redirect } from "next/navigation";

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
})

const prisma = new PrismaClient({
    adapter,
});

export async function signin(state: SigninFormState, formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
        return {
            errors: ["Email and password are required"],
            message: "Email and password are required",
        };
    }

    const user = await prisma.user.findUnique({
        where: {
            email: email.trim(),
        },
    });

    if(!user) {
        return {
            errors: ["User not found"],
            message: "User not found",
        };
    }

    if (!user.password) {
        return {
            errors: ["Invalid user data"],
            message: "Invalid user data",
        };
    }

    const trimmedPassword = password.trim();
    const isPasswordValid = await bcrypt.compare(trimmedPassword, user.password);
    
    if (!isPasswordValid) {
        return {
            errors: ["Invalid password"],
            message: "Invalid password",
        };``
    }
    
    await createSession({
        id: user.id,
        email: user.email,
        role: user.role as "ADMIN" | "MEMBER",
    })

    redirect("/dashboard");
}

export async function signup(state: SignupFormState, formData: FormData) {
    const validatedFields = signupSchema.safeParse({
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const { name, email, password } = validatedFields.data;

    const trimmedPassword = password.trim();
    const hashedPassword = await bcrypt.hash(trimmedPassword, 10);

    const existingUser = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    if(existingUser) {
        return {
            errors: {
                email: ["Email already in use"],
            },
        };
    }

    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        },
    })

    if(!user) {
        return {
            message: "Failed to create user",
        };
    } 

    await createSession({
        id: user.id,
        email: user.email,
        role: user.role as "ADMIN" | "MEMBER",
    })

    redirect("/dashboard");
}

export async function signout() {
    await deleteSession()
    redirect('/')
}


