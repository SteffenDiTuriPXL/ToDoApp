<script setup>
defineProps({
  loading: {
    default: false,
    type: Boolean,
  },
  todos: {
    default: () => [],
    type: Array,
  },
})
</script>

<template>
  <div class="w-full">
    <ul
      v-if="todos?.length > 0"
      class="space-y-4"
    >
      <li
        v-for="todo in todos"
        :key="todo.uuid"
        class="flex items-center gap-4 p-4 bg-gray-100 border border-gray-300 rounded-lg shadow-md"
      >
        <input
          type="checkbox"
          class="w-5 h-5 text-blue-500 border-gray-300 rounded focus:ring focus:ring-blue-300"
        >

        <div class="flex flex-col">
          <span class="text-lg font-bold text-gray-900">{{ todo.title }}</span>
          <span class="text-sm text-gray-600">{{ todo.description }}</span>
          <span class="text-xs text-gray-500">{{ todo.deadline }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>
