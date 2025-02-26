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
const todos = computed<TodoIndex[]>(() => todoIndexQuery.data.value?.data as TodoIndex[] || [])

const isLoading = computed<boolean>(() => todoIndexQuery.isLoading.value)
const error = computed<unknown>(() => todoIndexQuery.error.value)

const dialog = useDialog({
  component: () => import('@/modules/todos/features/overview/components/TodoCreateDialog.vue'),
})

async function onClick() {
  await dialog.open()
}
</script>

<template>
  <AppPage :title="i18n.t('todos.title')">
    <div
      v-if="error !== null"
      class="flex size-full flex-1 items-center justify-center"
    >
      <AppErrorState :error="error" />
    </div>

    <div
      v-else
      class="flex flex-col gap-lg flex-1"
    >
      <AppSearchInputField
        :is-loading="todoIndexQuery.isLoading.value"
        :pagination="pagination"
      />

      <TodoList
        :todos="todos"
        :is-loading="isLoading"
        :pagination="pagination"
        :error="todoIndexQuery.error.value"
        class="w-full"
      />

      <VcIconButton
        variant="secondary"
        icon="plus"
        label="NewToDO"
        @click="onClick"
      />
    </div>
  </AppPage>
</template>
