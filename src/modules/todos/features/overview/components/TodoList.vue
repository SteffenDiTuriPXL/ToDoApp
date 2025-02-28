<script setup lang="ts">
import {
  VcButton,
  VcDropdownMenu,
} from '@wisemen/vue-core'

import type { TodoIndex } from '@/models/todo/index/todoIndex.model'
import type { TodoUuid } from '@/models/todo/todoUuid.model'

const props = defineProps<{
  todos: Array<TodoIndex>
}>()

// eslint-disable-next-line require-explicit-generics/require-explicit-generics
const emit = defineEmits([
  'delete',
  'update',
])

function onEditTodo(todoId: TodoUuid): void {
  emit('update', todoId)
}

function onDeleteTodo(todoId: TodoUuid): void {
  emit('delete', todoId)
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
        class="flex items-center justify-between gap-4 p-4 bg-gray-100 border border-gray-300 rounded-lg shadow-md"
      >
        <div class="flex items-center gap-4">
          <input
            type="checkbox"
            class="w-5 h-5 text-blue-500 border-gray-300 rounded focus:ring focus:ring-blue-300"
          >

          <div class="flex flex-col">
            <span class="text-lg font-bold text-gray-900">{{ todo.title }}</span>
            <span class="text-sm text-gray-700">{{ todo.description }}</span>
            <span class="text-xs text-gray-400">{{ todo.deadline }}</span>
          </div>
        </div>

        <VcDropdownMenu
          :items="[
            {
              icon: 'edit',
              label: 'Bewerk to do',
              type: 'option',
              onSelect: () => onEditTodo(todo.uuid),
            },
            {
              icon: 'trash',
              label: 'Verwijder to do',
              type: 'option',
              onSelect: () => onDeleteTodo(todo.uuid),
            },
          ]"
        >
          <template #trigger>
            <VcButton
              variant="tertiary"
              icon="more"
              label="edit"
              class="ml-auto"
            />
          </template>
        </VcDropdownMenu>
      </li>
    </ul>
  </div>
</template>
