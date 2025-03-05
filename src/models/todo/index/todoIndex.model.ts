import type { TodoUuid } from '../todoUuid.model'

export interface TodoIndex {
  uuid: TodoUuid
  title: string
  createdAt: Date
  updatedAt: Date
  isCompleted: boolean
  deadline: string | null
  description: string | null
}
