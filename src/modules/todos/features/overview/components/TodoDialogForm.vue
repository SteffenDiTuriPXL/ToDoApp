<!-- eslint-disable ts/explicit-function-return-type -->
<script setup lang="ts">
import {
  VcCheckbox,
  VcDateField,
  VcTextarea,
  VcTextField,
} from '@wisemen/vue-core'
import { useForm } from 'formango'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

import AppDialogActions from '@/components/app/dialog/AppDialogActions.vue'
import AppDialogHeader from '@/components/app/dialog/AppDialogHeader.vue'
import AppForm from '@/components/form/AppForm.vue'
import FormSubmitButton from '@/components/form/FormSubmitButton.vue'
import { useApiErrorToast } from '@/composables/api-error-toast/apiErrorToast.composable'
import { toFormField } from '@/helpers/formango.helper'
import { todoCreateFormSchema } from '@/models/todo/create/todoCreateForm.model'
import type { ToDoDetail } from '@/models/todo/index/todo.model'
import type { TodoUuid } from '@/models/todo/todoUuid.model'
import { useToDoCreateMutation } from '@/modules/todos/api/mutations/todoCreateMutation.model'
import { useToDoDeleteMutation } from '@/modules/todos/api/mutations/todoDeleteMutation.model'
import { useToDoUpdateMutation } from '@/modules/todos/api/mutations/todoUpdateMutation.model'

const props = defineProps<{
  todoDetail?: ToDoDetail
}>()

const emit = defineEmits<{
  close: []
}>()

const i18n = useI18n()

const apiErrorToast = useApiErrorToast()
const todoCreateMutation = useToDoCreateMutation()
const todoUpdateMutation = useToDoUpdateMutation()
const deleteMutation = useToDoDeleteMutation()

const form = useForm({
  schema: todoCreateFormSchema,
  onSubmit: async (values) => {
    try {
      if (props.todoDetail) {
        await todoUpdateMutation.execute({
          body: values,
          params: {
            todoUuid: props.todoDetail.uuid,
          },
        })
        emit('close')
        onClose()
      }
      else {
        await todoCreateMutation.execute({ body: values })
      }
    }
    catch (error) {
      apiErrorToast.show(error)
    }
  },
})

const todoTitle = form.register('title', props.todoDetail?.title)
const description = form.register('description', props.todoDetail?.description)
const deadline = form.register('deadline', props.todoDetail?.deadline)

function onClose(): void {
  emit('close')
}

async function handleDelete(todoUuid: TodoUuid) {
  try {
    await deleteMutation.execute({
      body: todoUuid,
    })

    emit('close')
    onClose()
  }
  catch (error) {
    apiErrorToast.show(error)
  }
}

const model = ref<boolean>(false)
</script>

<template>
  <div class="py-4">
    <div class="flex items-start gap-x-2">
      <VcCheckbox
        v-model="model"
      />
      <AppDialogHeader
        :title="i18n.t('module.todos.update_todo_dialog.title')"
        :description="i18n.t('module.todos.update_todo_dialog.description')"
      />
    </div>

    <AppForm :form="form">
      <VcTextField
        v-bind="toFormField(todoTitle)"
        :label="i18n.t('module.todos.create_todo_dialog.todo.title')"
      />
      <VcTextarea
        v-bind="toFormField(description)"
        :label="i18n.t('module.todos.create_todo_dialog.todo.description')"
      />
      <VcDateField
        v-bind="toFormField(deadline)"
        :label="i18n.t('module.todos.create_todo_dialog.todo.deadline')"
      />

      <AppDialogActions>
        <FormSubmitButton
          :form="form"
          :label="i18n.t('module.todos.todo_list.delete_todo')"
          variant="destructive-secondary"
          @delete="handleDelete"
        />
        <FormSubmitButton
          :form="form"
          :label="i18n.t('module.setting.roles_and_permissions.save_changes')"
          @confirm="onClose"
        />
      </AppDialogActions>
    </AppForm>
  </div>
</template>
