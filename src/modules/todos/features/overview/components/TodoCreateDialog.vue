<script setup lang="ts">
import {
  VcDateField,
  VcDialog,
  VcTextarea,
  VcTextField,
} from '@wisemen/vue-core'
import { useForm } from 'formango'
import { useI18n } from 'vue-i18n'

import AppDialogActions from '@/components/app/dialog/AppDialogActions.vue'
import AppDialogContent from '@/components/app/dialog/AppDialogContent.vue'
import AppDialogHeader from '@/components/app/dialog/AppDialogHeader.vue'
import AppForm from '@/components/form/AppForm.vue'
import FormSubmitButton from '@/components/form/FormSubmitButton.vue'
import { useApiErrorToast } from '@/composables/api-error-toast/apiErrorToast.composable.ts'
import { toFormField } from '@/helpers/formango.helper'
import { todoCreateFormSchema } from '@/models/todo/create/todoCreateForm.model'
import { useToDoCreateMutation } from '@/modules/todos/api/mutations/todoCreateMutation.model'

const emit = defineEmits<{
  close: []
}>()

const i18n = useI18n()

const apiErrorToast = useApiErrorToast()
const todoCreateMutation = useToDoCreateMutation()

const form = useForm({
  schema: todoCreateFormSchema,
  onSubmit: async (values) => {
    try {
      await todoCreateMutation.execute({ body: values })
      emit('close')
      onClose()
    }
    catch (error) {
      apiErrorToast.show(error)
    }
  },
})

const todoTitle = form.register('title')
const description = form.register('description')
const deadline = form.register('deadline')

function onClose(): void {
  emit('close')
}
</script>

<template>
  <VcDialog @close="onClose">
    <AppDialogContent class="w-dialog-sm">
      <AppDialogHeader
        :title="i18n.t('module.todos.create_todo_dialog.dialog_title')"
        :description="i18n.t('module.todos.create_todo_dialog.dialog_description')"
      />
      <div class="py-4">
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
              :label="i18n.t('shared.save')"
              variant="default"
              @confirm="onClose"
            />
          </AppDialogActions>
        </AppForm>
      </div>
    </AppDialogContent>
  </VcDialog>
</template>
