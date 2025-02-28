import type { UseMutationReturnType } from '@wisemen/vue-core-query'
import { useMutation } from '@wisemen/vue-core-query'

import type { TodoUuid } from '@/models/todo/todoUuid.model'

import { TodoService } from '../services/todo.service'

export function useToDoDeleteMutation(): UseMutationReturnType<TodoUuid, void> {
  return useMutation<TodoUuid, void>({
    queryFn: async ({ body }) => {
      await TodoService.deleteByUuid(body)
    },
    queryKeysToInvalidate: {
      todoIndex: {},
    },
  })
}
