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
import { useActionState, useEffect, useState } from "react"
import { SpinningCircle } from "../spinning-circle"
import { Textarea } from "../textarea"
import { createTask } from "@/lib/actions/task"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getProjectsCache } from "@/lib/actions/project"

export function CreateTaskDialog({ trigger, title, description }: { trigger: React.ReactNode, title: string, description: string }) {
  const [state, action, pending] = useActionState(createTask, undefined)
  const [open, setOpen] = useState(false)
  const [projects, setProjects] = useState<Array<{ id: string; name: string }>>([])

  useEffect(() => {
    getProjectsCache().then((result) => {
      setProjects(result.projects)
    }).catch((error) => {
      console.error("Failed to load projects:", error)
    })
  }, [])

  useEffect(() => {
    if (state?.message) {
      const timer = setTimeout(() => {
        setOpen(false)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [state?.message])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">{trigger}</Button>
      </DialogTrigger>
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
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" />
              {state?.errors?.name && <p className="text-xs text-red-500">{state.errors.name.join(", ")}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" />
              {state?.errors?.description && <p className="text-xs text-red-500">{state.errors.description.join(", ")}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="projectId">Project</Label>
              <Select name="projectId">
                <SelectTrigger>
                  <SelectValue placeholder="Select a project" />
                </SelectTrigger>
                <SelectContent>
                  {projects.length > 0 ? (
                    projects.map((project) => (
                      <SelectItem key={project.id} value={project.id}>{project.name}</SelectItem>
                    ))
                  ) : (
                    <SelectItem value="loading" disabled>Loading projects...</SelectItem>
                  )}
                </SelectContent>
              </Select>
              {state?.errors?.projectId && <p className="text-xs text-red-500">{state.errors.projectId.join(", ")}</p>}
            </div>
            {state?.message && <p className="text-xs text-green-500">{state.message}</p>}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={pending}>
              {pending ? <SpinningCircle /> : "Create Task"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
