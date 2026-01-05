# FlowBoard

## What Problem Does It Solve?

FlowBoard helps small teams manage projects and tasks with role-based access, reducing user errors and improving clarity in multi-user SaaS environments.

## Why This Architecture?

**App Router** — Next.js 16's App Router gives us layouts, loading states, and error boundaries out of the box. Each route segment handles its own data fetching, which keeps things modular.

**Server Actions** — Instead of building a separate API layer, server actions let us mutate data directly from the UI. Less boilerplate, fewer moving parts.

**Data Access Layer (DAL)** — All database queries go through a single layer. This keeps business logic separate from UI code and makes authorization checks consistent.

**Role-based UX** — The UI adapts to what you can actually do. If you're not the owner, you won't see the delete button—no confusing error messages, just a cleaner experience.

## Key Engineering Decisions

- Role-based UX to prevent invalid user actions before reaching the backend
- Centralized permission logic for maintainability
- Backend-enforced authorization for security
- Focus on predictable UI states (loading, error, empty)

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui
- Prisma
- NextAuth.js

## Screenshots

![Projects](/public/projects.png)

![Tasks](/public/tasks.png)

![Sign In](/public/signin.png)
