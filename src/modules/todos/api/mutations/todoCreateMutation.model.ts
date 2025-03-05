import type { UseMutationReturnType } from '@wisemen/vue-core-query'
import { useMutation } from '@wisemen/vue-core-query'

import type { TodoCreateFormSchema } from '@/models/todo/create/todoCreateForm.model'

import { TodoService } from '../services/todo.service'

export function useToDoCreateMutation(): UseMutationReturnType<TodoCreateFormSchema, void> {
  return useMutation<TodoCreateFormSchema, void>({
    queryFn: async ({ body }: { body: TodoCreateFormSchema }) => {
      await TodoService.create(body)
    },
    queryKeysToInvalidate: {
      todoIndex: {},
    },
  })
}
