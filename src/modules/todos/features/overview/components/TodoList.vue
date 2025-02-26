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
  <div>
    <ul v-if="todos?.length > 0">
      <li
        v-for="todo in todos"
        :key="todo.uuid"
        class="todo-item"
      >
        <span>{{ todo.title }}</span>
      </li>
    </ul>
  </div>
</template>
