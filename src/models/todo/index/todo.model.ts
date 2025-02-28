import type { TodoUuid } from '../todoUuid.model'

export interface ToDoDetail {
  uuid: TodoUuid
  title: string
  createdAt: Date
  updatedAt: Date
  isCompleted: boolean
  deadline: string | null
  description: string | null
}
