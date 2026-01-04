"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/dialogs/alert-dialog"
import { deleteTask } from "@/lib/actions/task"
import { useTransition } from "react"
import { SpinningCircle } from "../spinning-circle"

interface DeleteTaskDialogProps {
  trigger: React.ReactNode
  taskId: string
  taskName: string
}

export function DeleteTaskDialog({ trigger, taskId, taskName }: DeleteTaskDialogProps) {
  const [isPending, startTransition] = useTransition()

  const handleDelete = () => {
    startTransition(async () => {
      await deleteTask(taskId)
    })
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Task</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete &quot;{taskName}&quot;? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isPending}
            className="border-destructive border text-destructive bg-background hover:bg-destructive/10"
          >
            {isPending ? <SpinningCircle /> : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
