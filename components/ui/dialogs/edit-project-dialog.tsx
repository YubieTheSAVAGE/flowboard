"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { updateProject } from "@/lib/actions/project"
import { useActionState, useEffect, useState } from "react"
import { SpinningCircle } from "../spinning-circle"
import { Textarea } from "../textarea"
import { Project } from "@/generated/prisma/client"
import { toast } from "sonner"

interface EditProjectDialogProps {
  trigger: React.ReactNode
  title: string
  description: string
  project: Project
}

export function EditProjectDialog({ trigger, title, description, project }: EditProjectDialogProps) {
  const [state, action, pending] = useActionState(updateProject.bind(null, project.id), undefined)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    if (state?.success) {
      toast.success(state.message)
      setOpen(false)
      state.message = "";
    }
  }, [state])
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form action={action}>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>
              {description}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label required htmlFor="name">Name</Label>
              <Input id="name" name="name" defaultValue={project.name} />
              {state?.errors?.name && <p className="text-xs text-red-500">{state.errors.name.join(", ")}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" defaultValue={project.description} />
              {state?.errors?.description && <p className="text-xs text-red-500">{state.errors.description.join(", ")}</p>}
            </div>
            {state?.message && <p className="text-xs text-red-500">{state.message}</p>}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={pending}>
              {pending ? <SpinningCircle /> : "Update Project"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
