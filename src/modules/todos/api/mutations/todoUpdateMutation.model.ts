import type { UseMutationReturnType } from '@wisemen/vue-core-query'
import { useMutation } from '@wisemen/vue-core-query'

import type { TodoCreateFormSchema } from '@/models/todo/create/todoCreateForm.model'
import type { TodoUuid } from '@/models/todo/todoUuid.model'

import { TodoService } from '../services/todo.service'

interface Params {
  todoUuid: TodoUuid
}

export function useToDoUpdateMutation(): UseMutationReturnType<TodoCreateFormSchema, void, Params> {
  return useMutation<TodoCreateFormSchema, void, Params>({
    queryFn: async ({ body, params }) => {
      await TodoService.update(params.todoUuid, body)
    },
    queryKeysToInvalidate: {
      todoIndex: {},
    },
  })
}
