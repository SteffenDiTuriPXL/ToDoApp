<script setup lang="ts">
import {
  VcDialog,
  VcTextField,
} from '@wisemen/vue-core'
import { useForm } from 'formango'
import { useI18n } from 'vue-i18n'
import { z } from 'zod'

import AppDialogActions from '@/components/app/dialog/AppDialogActions.vue'
import AppDialogContent from '@/components/app/dialog/AppDialogContent.vue'
import AppForm from '@/components/form/AppForm.vue'
import FormSubmitButton from '@/components/form/FormSubmitButton.vue'
import { useApiErrorToast } from '@/composables/api-error-toast/apiErrorToast.composable.ts'
import { toFormField } from '@/helpers/formango.helper'
import { useToDoCreateMutation } from '@/modules/todos/api/mutations/todoCreateMutation.model'

const emit = defineEmits<{
  close: []
}>()

const i18n = useI18n()

const apiErrorToast = useApiErrorToast()
const todoCreateMutation = useToDoCreateMutation()

const form = useForm({
  schema: z.object({
    title: z.string(),
    deadline: z.string(),
    description: z.string(),
  }),
  onSubmit: async (values) => {
    try {
      await todoCreateMutation.execute({
        body: values,
      })
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
      <AppForm :form="form">
        <VcTextField
          v-bind="toFormField(todoTitle)"
          label="Title"
        />
        <VcTextField
          v-bind="toFormField(description)"
          label="Description"
        />
        <VcTextField
          v-bind="toFormField(deadline)"
          label="Deadline"
        />
        <AppDialogActions>
          <FormSubmitButton
            :form="form"
            :label="i18n.t('shared.save')"
          />
        </AppDialogActions>
      </AppForm>
    </AppDialogContent>
  </VcDialog>
</template>
