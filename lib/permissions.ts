import { Role } from "@/generated/prisma/client";

export function canCreateProject(role: Role): boolean {
  return role === Role.ADMIN;
}

export function canUpdateProject(
  role: Role,
  projectOwnerId: string,
  userId: string
): boolean {
  return role === Role.ADMIN || projectOwnerId === userId;
}

export function canDeleteProject(
  role: Role,
  projectOwnerId: string,
  userId: string
): boolean {
  return role === Role.ADMIN || projectOwnerId === userId;
}

export function canCreateTask(): boolean {
  return true;
}

export function canUpdateTask(
  role: Role,
  taskAssigneeId: string,
  userId: string
): boolean {
  return role === Role.ADMIN || taskAssigneeId === userId;
}

export function canDeleteTask(
  role: Role,
  taskAssigneeId: string,
  userId: string
): boolean {
  return role === Role.ADMIN || taskAssigneeId === userId;
}
