<script setup lang="ts">
import {
  VcDialog,
} from '@wisemen/vue-core'
import { computed } from 'vue'

import AppDialogContent from '@/components/app/dialog/AppDialogContent.vue'
import type { ToDoDetail } from '@/models/todo/index/todo.model'
import type { TodoUuid } from '@/models/todo/todoUuid.model'
import { useToDoDetailQuery } from '@/modules/todos/api/queries/todoDetail.query'
import ToDoDialogForm from '@/modules/todos/features/overview/components/TodoDialogForm.vue'

const props = defineProps<{
  todoUuid?: TodoUuid
}>()

const emit = defineEmits<{
  close: []
}>()

const todoDetailQuery = useToDoDetailQuery(
  computed<TodoUuid | null>(() => props.todoUuid ?? null),
)

const todoDetail = computed<ToDoDetail | null>(() => todoDetailQuery.data.value)

function onClose(): void {
  emit('close')
}
</script>

<template>
  <VcDialog @close="onClose">
    <AppDialogContent class="w-dialog-sm">
      <ToDoDialogForm
        v-if="todoDetail !== null"
        :todo-detail="todoDetail"
      />
    </AppDialogContent>
  </VcDialog>
</template>
