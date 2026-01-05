# FlowBoard
Minimalist SaaS dashboard built with Next.js, TypeScript, Tailwind CSS, shadcn/ui.

## Features
- Authentication & Authorization (NextAuth + DAL)
- Project & Task management with CRUD
- Loading, error, and empty states for UX polish
- Minimalist dashboard with sidebar & header

## Role-Based UX & Authorization

FlowBoard implements role-based UI logic to improve usability and prevent invalid actions before reaching the backend.

- UI adapts based on user role (Owner / Member)
- Permissions are centralized and reusable
- Backend remains the source of truth
- Frontend improves clarity, safety, and performance

This approach mirrors real-world SaaS authorization patterns.

## Screenshots

### Sign In
![Sign In](/public/signin.png)

### Projects
![Projects](/public/projects.png)

### Create Project
![Create Project](/public/createproject.png)

### Tasks
![Tasks](/public/tasks.png)

### Create Task
![Create Task](/public/createtask.png)

## Status
🚧 In active development