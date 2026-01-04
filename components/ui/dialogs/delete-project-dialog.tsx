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
import { useTransition } from "react"
import { SpinningCircle } from "../spinning-circle"

interface DeleteProjectDialogProps {
  trigger: React.ReactNode
  projectId: string
  projectName: string
}

export function DeleteProjectDialog({ trigger, projectId, projectName }: DeleteProjectDialogProps) {
  const [isPending, startTransition] = useTransition()

  const handleDelete = () => {
    startTransition(async () => {
      await deleteProject(projectId)
    })
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
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


