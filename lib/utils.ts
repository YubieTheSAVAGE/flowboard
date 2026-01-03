import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getStatusLabel(str: String) {
  switch (str) {
    case "TODO":
      return "To Do"
    case "IN_PROGRESS":
      return "In Progress"
    case "DONE":
      return "Done"
    default:
      return "To Do"
  }
}