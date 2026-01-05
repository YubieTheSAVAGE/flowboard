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
import { updateTask } from "@/lib/actions/task"
import { useActionState, useEffect, useState } from "react"
import { SpinningCircle } from "../spinning-circle"
import { Textarea } from "../textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TaskStatus } from "@/generated/prisma/client"
import { toast } from "sonner"

const statuses = [
  { value: "TODO", label: "To Do" },
  { value: "IN_PROGRESS", label: "In Progress" },
  { value: "DONE", label: "Done" },
]

interface EditTaskDialogProps {
  trigger: React.ReactNode
  title: string
  description: string
  task: {
    id: string
    name: string
    description: string
    status: TaskStatus
  }
  canUpdateTask: boolean
}

export function EditTaskDialog({ trigger, title, description, task, canUpdateTask }: EditTaskDialogProps) {
  const [state, action, pending] = useActionState(updateTask.bind(null, task.id), undefined)
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
      {canUpdateTask ? (
        <DialogTrigger asChild>{trigger}</DialogTrigger>
      ) : (
        <span onClick={() => toast.error("You are not authorized to update this task")}>{trigger}</span>
      )}
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
              <Input id="name" name="name" defaultValue={task.name} />
              {state?.errors?.name && <p className="text-xs text-red-500">{state.errors.name.join(", ")}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" defaultValue={task.description} />
              {state?.errors?.description && <p className="text-xs text-red-500">{state.errors.description.join(", ")}</p>}
            </div>
            <div className="grid gap-2">
              <Label required htmlFor="status">Status</Label>
              <Select name="status" defaultValue={task.status}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map((status) => (
                    <SelectItem key={status.value} value={status.value}>{status.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {state?.message && <p className="text-xs text-red-500">{state.message}</p>}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={pending}>
              {pending ? <SpinningCircle /> : "Update Task"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

