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
import { useEffect, useState, useTransition } from "react"
import { SpinningCircle } from "../spinning-circle"
import { toast } from "sonner"

interface DeleteTaskDialogProps {
  trigger: React.ReactNode
  taskId: string
  taskName: string
  canDeleteTask: boolean
}

export function DeleteTaskDialog({ trigger, taskId, taskName, canDeleteTask }: DeleteTaskDialogProps) {
  const [isPending, startTransition] = useTransition()
  const [result, setResult] = useState<{ success?: boolean, message?: string } | null>(null)

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteTask(taskId)
      setResult(result as { success: boolean, message: string })
    })
  }

  useEffect(() => {
    if (result?.success) 
      toast.success(result.message)
    else if (result?.message)
      toast.error(result?.message || "Failed to delete task")
    setResult(null)
  }, [result])

  return (
    <AlertDialog>
      {canDeleteTask ? (
        <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      ) : (
        <span onClick={() => toast.error("You are not authorized to delete this task")}>{trigger}</span>
      )}
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
