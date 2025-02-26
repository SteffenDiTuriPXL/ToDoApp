<!-- eslint-disable ts/explicit-function-return-type -->
<script setup>
import { useDialog, VcIconButton } from '@wisemen/vue-core'
import { onMounted, ref } from 'vue'

import { getTodosControllerGetTodosV1 } from '@/client'
import AppPage from '@/components/layout/AppPage.vue'

import TodoList from '../components/TodoList.vue'

// eslint-disable-next-line require-explicit-generics/require-explicit-generics
const todos = ref([])
// eslint-disable-next-line require-explicit-generics/require-explicit-generics
const loading = ref(true)

async function fetchTodos() {
  try {
    const response = await getTodosControllerGetTodosV1()

    todos.value = response.data.todos
  }
  catch (error) {
    console.error('Error fetching todos:', error)
  }
  finally {
    loading.value = false
  }
}

onMounted(fetchTodos)

const dialog = useDialog({
  component: () => import('../components/TodoCreateDialog.vue'),
})

async function onClick() {
  await dialog.open()
}
</script>

<template>
  <AppPage :title="$t('todos.title')">
    <TodoList
      :todos="todos"
      :loading="loading"
      class="w-full"
    />

    <VcIconButton
      variant="secondary"
      icon="plus"
      label="NewToDO"
      @click="onClick"
    />
  </AppPage>
</template>
