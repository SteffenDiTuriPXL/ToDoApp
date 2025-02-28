import type { CalendarDate } from '@/models/date/calendarDate.model'

import type { TodoUuid } from '../todoUuid.model'

export interface ToDoDetail {
  uuid: TodoUuid
  title: string
  createdAt: Date
  updatedAt: Date
  isCompleted: boolean
  deadline: CalendarDate | null
  description: string | null
}
