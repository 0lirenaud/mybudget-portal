<script setup lang="ts">
import type { Transaction } from '../../models/transaction'
import { toTypedSchema } from '@vee-validate/zod'
import { TransactionCreateSchema } from '../../models/transaction'
import { computed } from 'vue'
import { useForm } from 'vee-validate'

interface Props {
  onSubmit: (event: Event) => void
  transaction: Transaction
}

const props = defineProps<Props>()
const validationSchema = computed(() => toTypedSchema(TransactionCreateSchema))

const { handleSubmit, errors, setFieldError, defineField, validateField, meta } = useForm({
  validationSchema,
})

const [name, nameProps] = defineField('name', {
  validateOnBlur: true,
})
const [description, descriptionProps] = defineField('description', {
  validateOnBlur: true,
})
const [amount, amountProps] = defineField('amount', {
  validateOnBlur: true,
})
const [isRecipient, isRecipientProps] = defineField('isRecipient')
const [registeredDate, registeredDateProps] = defineField('registeredDate')
const [category, categoryProps] = defineField('category')

const isFormValid = computed(() => meta.value.valid)
</script>

<template>
  <ElForm label-position="top" @submit.prevent="onSubmit">
    <ElFormItem :label="$t('labels.name')" :error="errors.name" :required="true">
      <ElInput
        v-model="name"
        v-bind="nameProps"
        :placeholder="$t('labels.name')"
        @input="setFieldError('name', undefined)"></ElInput>
    </ElFormItem>
  </ElForm>
</template>
