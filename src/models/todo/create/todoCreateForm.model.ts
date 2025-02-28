import { z } from 'zod'

import { calendarDateSchema } from '@/models/date/calendarDate.model'

export const todoCreateSchema = z.object({
  title: z.string().min(1),
  deadline: calendarDateSchema.nullable(),
  description: z.string().min(1).nullable(),
})

export type TodoCreateForm = z.infer<typeof todoCreateSchema>
