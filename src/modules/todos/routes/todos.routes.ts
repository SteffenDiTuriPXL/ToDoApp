import type { Component } from 'vue'
import type { RouteRecordRaw } from 'vue-router'

const todosRoutes: RouteRecordRaw[] = [
  {
    path: '/todos',
    children: [
      {
        name: 'todo-overview',
        path: '',
        component: (): Component => import('@/modules/todos/features/overview/views/TodoOverviewView.vue'),
      },
    ],
  },
]

export default todosRoutes
