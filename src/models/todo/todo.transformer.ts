import type { ToDoCreateDto } from './create/todoCreateDto.model'
import type { TodoCreateForm } from './create/todoCreateForm.model'
import type { TodoIndex } from './index/todoIndex.model'
import type { TodoDto } from './index/todoIndexDto.model'
import type { ToDoIndexFilters } from './index/todoIndexFilters.model'
import type { ToDoIndexFiltersDto } from './index/todoIndexFiltersDto.model'

export class TodoTransformer {
  static fromDto(dto: TodoDto): TodoIndex {
    return {
      uuid: dto.uuid,
      title: dto.title,
      createdAt: dto.createdAt ? new Date(dto.createdAt) : new Date(),
      updatedAt: dto.updatedAt ? new Date(dto.updatedAt) : new Date(),
      completed: dto.completed,
      deadline: dto.deadline ?? '',
      description: dto.description ?? '',
    }
  }
}

export class ToDoIndexFiltersTransformer {
  static toDto(filters: ToDoIndexFilters): ToDoIndexFiltersDto {
    return filters
  }
}

export class TodoCreateTransformer {
  static toDto(form: TodoCreateForm): ToDoCreateDto {
    return {
      title: form.title,
      deadline: form.deadline,
      description: form.description,
    }
  }
}
