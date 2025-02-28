<script setup lang="ts">
import {
  VcDateField,
  VcTextarea,
  VcTextField,
} from '@wisemen/vue-core'
import { useForm } from 'formango'
import { useI18n } from 'vue-i18n'

import AppDialogActions from '@/components/app/dialog/AppDialogActions.vue'
import AppForm from '@/components/form/AppForm.vue'
import FormSubmitButton from '@/components/form/FormSubmitButton.vue'
import { useApiErrorToast } from '@/composables/api-error-toast/apiErrorToast.composable'
import { toFormField } from '@/helpers/formango.helper'
import { todoCreateSchema } from '@/models/todo/create/todoCreateForm.model'
import type { ToDoDetail } from '@/models/todo/index/todo.model'
import { useToDoCreateMutation } from '@/modules/todos/api/mutations/todoCreateMutation.model'
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

const form = useForm({
  schema: todoCreateSchema,
  onSubmit: async (values) => {
    try {
      if (props.todoDetail) {
        await todoUpdateMutation.execute({
          body: values,
          params: {
            todoUuid: props.todoDetail.uuid,
          },
        })
      }
      else {
        await todoCreateMutation.execute({ body: values })
      }

      emit('close')
      onClose()
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
</script>

<template>
  <div class="py-4">
    <AppForm :form="form">
      <VcTextField
        v-bind="toFormField(todoTitle)"
        label="Titel"
      />
      <VcTextarea
        v-bind="toFormField(description)"
        label="Opmerking"
      />
      <VcDateField
        v-bind="toFormField(deadline)"
        label="Deadline"
      />
      <AppDialogActions>
        <FormSubmitButton
          :form="form"
          :label="i18n.t('shared.save')"
          @confirm="onClose"
        />
      </AppDialogActions>
    </AppForm>
  </div>
</template>
