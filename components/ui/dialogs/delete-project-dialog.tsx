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
import { deleteProject } from "@/lib/actions/project"
import { useEffect, useState, useTransition } from "react"
import { SpinningCircle } from "../spinning-circle"
import { toast } from "sonner"

interface DeleteProjectDialogProps {
  trigger: React.ReactNode
  projectId: string
  projectName: string
  canDeleteProject: boolean
}

export function DeleteProjectDialog({ trigger, projectId, projectName, canDeleteProject }: DeleteProjectDialogProps) {
  const [isPending, startTransition] = useTransition()
  const [result, setResult] = useState<{ success?: boolean, message?: string } | null>(null)
  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteProject(projectId)
      setResult(result as { success: boolean, message: string })
    })
  }

  useEffect(() => {
    if (result?.success) 
      toast.success(result.message)
    else if (result?.message)
      toast.error(result?.message || "Failed to delete project")
    setResult(null)
  }, [result])

  return (
    <AlertDialog>
      {canDeleteProject ? (
        <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      ) : (
        <span className="text-destructive cursor-not-allowed" onClick={() => toast.error("You are not authorized to delete this project")}>{trigger}</span>
      )}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Project</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete &quot;{projectName}&quot;? This action cannot be undone.
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


