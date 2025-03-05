import { CalendarDateTransformer } from '@/models/date/calendarDate.transformer'

import type { CalendarDateDto } from '../date/calendarDateDto.model'
import type { ToDoCreateDto } from './create/todoCreateDto.model'
import type { TodoCreateFormSchema } from './create/todoCreateForm.model'
import type { ToDoDetail } from './index/todo.model'
import type { TodoDto } from './index/todoDto.model'
import type { TodoIndex } from './index/todoIndex.model'
import type { TodoIndexDto } from './index/todoIndexDto.model'
import type { ToDoIndexFilters } from './index/todoIndexFilters.model'
import type { ToDoIndexFiltersDto } from './index/todoIndexFiltersDto.model'
import type { TodoUuid } from './todoUuid.model'

export class TodoIndexTransformer {
  static fromDto(dto: TodoIndexDto): TodoIndex {
    return {
      uuid: dto.uuid as TodoUuid,
      title: dto.title,
      createdAt: dto.createdAt ? CalendarDateTransformer.fromDto(dto.createdAt as CalendarDateDto) : new Date(),
      updatedAt: dto.updatedAt ? CalendarDateTransformer.fromDto(dto.updatedAt as CalendarDateDto) : new Date(),
      isCompleted: dto.completed,
      deadline: dto.deadline,
      description: dto.description,
    }
  }
}

export class ToDoIndexFiltersTransformer {
  static toDto(filters: ToDoIndexFilters): ToDoIndexFiltersDto {
    return filters
  }
}

export class TodoCreateTransformer {
  static toDto(form: TodoCreateFormSchema): ToDoCreateDto {
    return {
      title: form.title,
      deadline: form.deadline ? CalendarDateTransformer.toDto(form.deadline) : null,
      description: form.description,
    }
  }
}

export class ToDoTransformer {
  static fromDto(dto: TodoDto): ToDoDetail {
    return {
      uuid: dto.uuid as TodoUuid,
      title: dto.title,
      createdAt: dto.createdAt ? CalendarDateTransformer.fromDto(dto.createdAt as CalendarDateDto) : new Date(),
      updatedAt: dto.updatedAt ? CalendarDateTransformer.fromDto(dto.createdAt as CalendarDateDto) : new Date(),
      isCompleted: dto.completed,
      deadline: dto.deadline
        ? CalendarDateTransformer.fromDto(dto.deadline)
        : null,
      description: dto.description,
    }
  }
}
