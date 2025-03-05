import type { UseQueryReturnType } from '@wisemen/vue-core-query'
import { useQuery } from '@wisemen/vue-core-query'
import {
  computed,
  type ComputedRef,
} from 'vue'

import { assert } from '@/helpers/assert.helper'
import type { ToDoDetail } from '@/models/todo/index/todo.model'
import type { TodoUuid } from '@/models/todo/todoUuid.model'

import { TodoService } from '../services/todo.service'

export function useToDoDetailQuery(todoUuid: ComputedRef<TodoUuid | null>): UseQueryReturnType<ToDoDetail> {
  return useQuery<ToDoDetail>({
    isEnabled: computed<boolean>(() => todoUuid.value !== null),
    queryFn: () => {
      assert(todoUuid.value !== null, 'todoUuid is null')

      return TodoService.getByUuid(todoUuid.value)
    },
    queryKey: {
      todoDetail: {
        todoUuid,
      },
    },
  })
}
