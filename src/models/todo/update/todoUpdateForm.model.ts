import { z } from 'zod'

export const todoUpdateSchema = z.object({
  title: z.string().min(1),
  deadline: z.string().min(1),
  description: z.string().min(1),
  todoUuid: z.string().min(1),
})

export type ToDoUpdateForm = z.infer<typeof todoUpdateSchema>
