<!-- eslint-disable ts/explicit-function-return-type -->
<script setup lang="ts">
import {
  type DropdownMenuItem,
  VcButton,
  VcCheckbox,
  VcDropdownMenu,
} from '@wisemen/vue-core'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import type { TodoIndex } from '@/models/todo/index/todoIndex.model'
import type { TodoUuid } from '@/models/todo/todoUuid.model'
import { DateFormatUtil } from '@/utils/date.util'

const props = defineProps<{
  todo: TodoIndex
}>()

const emit = defineEmits<{
  delete: [TodoUuid]
  update: [TodoUuid]
}>()

function onEditTodo(todoId: TodoUuid): void {
  emit('update', todoId)
}

function onDeleteTodo(todoId: TodoUuid): void {
  emit('delete', todoId)
}

const i18n = useI18n()

const dropdownItems = computed<DropdownMenuItem[]>(() => [
  {
    icon: 'edit',
    label: i18n.t('module.todos.todo_list.edit_todo'),
    type: 'option',
    onSelect: () => {
      onEditTodo(props.todo.uuid)
    },
  },
  {
    isDestructive: true,
    icon: 'trash',
    label: i18n.t('module.todos.todo_list.delete_todo'),
    type: 'option',
    variant: 'destructive',
    onSelect: () => {
      onDeleteTodo(props.todo.uuid)
    },
  },
])

const model = ref<boolean>(false)

const formattedDeadline = computed<DateFormatUtil>(() => {
  return props.todo.deadline ? DateFormatUtil.toLongDate(new Date(props.todo.deadline)) : 'No deadline'
})
</script>

<template>
  <div class="flex items-start gap-4">
    <VcCheckbox
      v-model="model"
      class="'--checkbox-bg-color-checked': gray"
    />

    <div class="flex flex-col">
      <span class="text-lg font-bold text-gray-900">{{ props.todo.title }}</span>
      <span class="text-sm text-gray-500">{{ props.todo.description }}</span>
      <div>
        <!-- calendar icon -->
        <span class="text-xs text-gray-500">{{ formattedDeadline }}</span>
      </div>
    </div>
  </div>

  <VcDropdownMenu :items="dropdownItems">
    <template #trigger>
      <VcButton
        variant="tertiary"
        label="edit"
      >
        {{ $t('todos.edit') }}
      </VcButton>
    </template>
  </VcDropdownMenu>
</template>
