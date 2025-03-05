<!-- eslint-disable ts/explicit-function-return-type -->
<script setup lang="ts">
import { useDialog } from '@wisemen/vue-core'

import { useApiErrorToast } from '@/composables/api-error-toast/apiErrorToast.composable'
import type { TodoIndex } from '@/models/todo/index/todoIndex.model'
import type { TodoUuid } from '@/models/todo/todoUuid.model'
import { useToDoDeleteMutation } from '@/modules/todos/api/mutations/todoDeleteMutation.model'
import TodoCard from '@/modules/todos/features/overview/components/TodoCard.vue'

const props = defineProps<{
  todos: Array<TodoIndex>
}>()

const apiErrorToast = useApiErrorToast()
const deleteMutation = useToDoDeleteMutation()

const updateDialog = useDialog({
  component: () => import('@/modules/todos/features/overview/components/TodoUpdateDialog.vue'),
})

async function handleUpdate(todoUuid: TodoUuid) {
  await updateDialog.open({
    todoUuid,
  })
}

async function handleDelete(todoUuid: TodoUuid) {
  try {
    await deleteMutation.execute({
      body: todoUuid,
    })
  }
  catch (error) {
    apiErrorToast.show(error)
  }
}
</script>

<template>
  <div>
    <ul
      v-if="props.todos?.length > 0"
      class="space-y-4"
    >
      <li
        v-for="todo in props.todos"
        :key="todo.uuid"
        class="flex items-start justify-between gap-4 p-4 bg-gray-100 border border-gray-300 rounded-lg shadow-md"
      >
        <TodoCard
          :todo="todo"
          @update="handleUpdate"
          @delete="handleDelete"
        />
      </li>
    </ul>
  </div>
</template>
