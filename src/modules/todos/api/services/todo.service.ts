import type {
  PaginatedData,
  PaginationOptions,
} from '@wisemen/vue-core'

import {
  createTodoControllerCreateTodoV1,
  deleteTodoControllerDeleteTodoV1,
  getTodosControllerGetTodosV1,
  getTodosControllerGetTodoV1,
  updateTodoControllerUpdateTodoV1,
} from '@/client'
import type { TodoCreateFormSchema } from '@/models/todo/create/todoCreateForm.model'
import type { ToDoDetail } from '@/models/todo/index/todo.model'
import type { TodoIndex } from '@/models/todo/index/todoIndex.model'
import type { ToDoIndexFilters } from '@/models/todo/index/todoIndexFilters.model'
import {
  TodoCreateTransformer,
  ToDoIndexFiltersTransformer,
  TodoIndexTransformer,
  ToDoTransformer,
} from '@/models/todo/todo.transformer'
import type { TodoUuid } from '@/models/todo/todoUuid.model'
import { ObjectUtil } from '@/utils/object.util'
import { PaginationDtoBuilder } from '@/utils/paginationDtoBuilder.util'

export class TodoService {
  static async create(form: TodoCreateFormSchema): Promise<void> {
    await createTodoControllerCreateTodoV1({
      body: TodoCreateTransformer.toDto(form),
    })
  }

  static async deleteByUuid(todoUuid: TodoUuid): Promise<void> {
    await deleteTodoControllerDeleteTodoV1({
      path: {
        todoUuid,
      },
    })
  }

  static async getAll(paginationOptions: PaginationOptions<ToDoIndexFilters>): Promise<PaginatedData<TodoIndex>> {
    const response = await getTodosControllerGetTodosV1({
      query: new PaginationDtoBuilder(paginationOptions).build(ToDoIndexFiltersTransformer.toDto),
      querySerializer: ObjectUtil.serialize,
    })

    return {
      data: response.data.items.map(TodoIndexTransformer.fromDto),
      meta: response.data.meta,
    }
  }

  static async getByUuid(todoUuid: TodoUuid): Promise<ToDoDetail> {
    const response = await getTodosControllerGetTodoV1({
      path: {
        todoUuid,
      },
    })

    return ToDoTransformer.fromDto(response.data)
  }

  static async update(todoUuid: TodoUuid, form: TodoCreateFormSchema): Promise<void> {
    await updateTodoControllerUpdateTodoV1({
      body: TodoCreateTransformer.toDto(form),
      path: {
        todoUuid: todoUuid!,
      },
    })
  }
}
