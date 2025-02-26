import type {
  PaginatedData,
  PaginationOptions,
} from '@wisemen/vue-core'

import {
  createTodoControllerCreateTodoV1,
  getTodosControllerGetTodosV1,
} from '@/client'
import type { TodoIndex } from '@/models/todo/index/todoIndex.model'
import type { ToDoIndexFilters } from '@/models/todo/index/todoIndexFilters.model'
import {
  ToDoIndexFiltersTransformer,
  TodoTransformer,
} from '@/models/todo/todo.transformer'
import { ObjectUtil } from '@/utils/object.util'
import { PaginationDtoBuilder } from '@/utils/paginationDtoBuilder.util'

export class TodoService {
  static async create(title: string, description: string, deadline: string): Promise<void> {
    await createTodoControllerCreateTodoV1({
      body: {
        title,
        deadline,
        description,
      },
    })
  }

  static async getAll(paginationOptions: PaginationOptions<ToDoIndexFilters>): Promise<PaginatedData<TodoIndex>> {
    const response = await getTodosControllerGetTodosV1({
      query: new PaginationDtoBuilder(paginationOptions).build(ToDoIndexFiltersTransformer.toDto),
      querySerializer: ObjectUtil.serialize,
    })

    return {
      data: response.data.items.map(TodoTransformer.fromDto),
      meta: response.data.meta,
    }
  }
}
