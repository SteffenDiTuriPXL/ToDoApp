<!-- eslint-disable ts/explicit-function-return-type -->
<script setup lang="ts">
import {
  useDialog,
  usePagination,
  VcIconButton,
} from '@wisemen/vue-core'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import AppSearchInputField from '@/components/app/AppSearchInputField.vue'
import AppErrorState from '@/components/app/error-state/AppErrorState.vue'
import AppPage from '@/components/layout/AppPage.vue'
import type { TodoIndex } from '@/models/todo/index/todoIndex.model'
import type { ToDoIndexFilters } from '@/models/todo/index/todoIndexFilters.model'
import { useTodoIndexQuery } from '@/modules/todos/api/queries/todoIndex.query'
import TodoList from '@/modules/todos/features/overview/components/TodoList.vue'

const i18n = useI18n()

const pagination = usePagination<ToDoIndexFilters>({
  isRouteQueryEnabled: true,
  key: 'todos',
})

const todoIndexQuery = useTodoIndexQuery(pagination.paginationOptions)
const todos = computed<TodoIndex[]>(() => todoIndexQuery.data.value?.data ?? [])

const isLoading = computed<boolean>(() => todoIndexQuery.isLoading.value)
const error = computed<unknown>(() => todoIndexQuery.error.value)

const createDialog = useDialog({
  component: () => import('@/modules/todos/features/overview/components/TodoCreateDialog.vue'),
})

async function openCreateDialog() {
  await createDialog.open({})
}
</script>

<template>
  <AppPage :title="i18n.t('todos.title')">
    <div v-if="error !== null">
      <AppErrorState :error="error" />
    </div>

    <div
      v-else
      class="flex flex-col gap-lg flex-1"
    >
      <AppSearchInputField
        :is-loading="todoIndexQuery.isLoading.value"
        :pagination="pagination"
        class="w-1/2 mx-auto"
      />

      <TodoList
        :todos="todos"
        :is-loading="isLoading"
        :pagination="pagination"
        :error="todoIndexQuery.error.value"
        class="w-1/2 mx-auto"
      />
    </div>
    <VcIconButton
      variant="secondary"
      icon="plus"
      label="NewTodo"
      class="!fixed !bottom-4 !right-4 !z-50"
      @click="openCreateDialog"
    />
  </AppPage>
</template>
