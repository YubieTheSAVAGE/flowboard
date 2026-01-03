import { jwtVerify } from "jose";
import { z } from "zod";

export type SessionPayload = {
    id: string;
    email: string;
    role: "ADMIN" | "MEMBER";
}

export const signupSchema = z.object({
    name: z
        .string()
        .min(3, { error: "Name must be at least 3 characters long" })
        .max(20, { error: "Name must be at most 20 characters long" }),
    email: z
        .string({ error: "Email is required" })
        .email({ error: "Invalid email address" }),
    password: z
        .string({ error: "Password is required" })
        .min(8, { error: "Password must be at least 8 characters long" }),
});

export type SignupFormState = 
{
    errors?: {  
        name?: string[];
        email?: string[];
        password?: string[];
    };
    message?: string;
}

export type SigninFormState = 
{
    errors?: string[];
    message?: string;
}

export const projectSchema = z.object({
    name: z
        .string()
        .min(1, { error: "Name is required" })
        .max(20, { error: "Name must be at most 20 characters long" }),
    description: z
        .string()
        .max(200, { error: "Description must be at most 200 characters long" }),
});

export type CreateProjectFormState = 
{
    errors?: {
        name?: string[];
        description?: string[];
    };
    message?: string;
}

export const taskSchema = z.object({
    name: z
        .string()
        .min(1, { error: "Name is required" })
        .max(20, { error: "Name must be at most 20 characters long" }),
    description: z
        .string()
        .max(200, { error: "Description must be at most 200 characters long" }),
    status: z
        .enum(["TODO", "IN_PROGRESS", "DONE"], { error: "Status is required" }),
    projectId: z
        .string()
        .min(1, { error: "Project is required" }),
});

export type CreateTaskFormState = 
{
    errors?: {
        name?: string[];
        description?: string[];
        projectId?: string[];
    };
    message?: string;
}
