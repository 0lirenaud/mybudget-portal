<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import {
  MAX_AMOUNT,
  MAX_DESCRIPTION,
  TransactionCreateSchema,
  type TransactionCreate,
} from '../../models/transaction'
import { computed } from 'vue'
import { useForm } from 'vee-validate'
import { ElInput, ElFormItem, ElSwitch, ElDatePicker, ElSelect, ElOption } from 'element-plus'
import { getCategories } from '@/api/queries/categoryQueries'

interface Props {
  onSubmit: (data: TransactionCreate) => void
  transaction: TransactionCreate
}

const props = defineProps<Props>()
const validationSchema = computed(() => toTypedSchema(TransactionCreateSchema()))

const { data: categories, isLoading } = getCategories()

const { handleSubmit, errors, setFieldError, defineField, validateField, resetForm } = useForm({
  validationSchema,
})

const opts = { validateOnModelUpdate: false }
const [name] = defineField('name', opts)
const [description] = defineField('description', opts)
const [amount] = defineField('amount', opts)
const [isRecipient] = defineField('isRecipient', opts)
const [registeredDate] = defineField('registeredDate', opts)
const [category] = defineField('category', opts)

const hasErrors = computed(() => Object.keys(errors.value).length > 0)

const formatAmount = (value: string): string => {
  if (!value) return ''

  const [int = '', dec] = value.split('.')
  const grouped = int.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return `${grouped}${dec !== undefined ? `.${dec}` : ''}`
}

const parseAmount = (value?: string): string => {
  const digits = (value ?? '').replace(/\D/g, '').replace(/^0+/, '')
  if (!digits) return ''

  const padded = digits.padStart(3, '0')
  const next = `${padded.slice(0, -2)}.${padded.slice(-2)}`

  if (Number(next) > MAX_AMOUNT) return amount.value ?? ''
  return next
}

const disableFutureDates = (date: Date): boolean => {
  const endOfToday = new Date()
  endOfToday.setHours(23, 59, 59, 999)
  return date.getTime() > endOfToday.getTime()
}

const descriptionLength = computed(() => (description.value ?? '').length)
</script>

<template>
  <ElForm label-position="top" @submit.prevent="onSubmit">
    <ElFormItem :label="$t('labels.name')" :error="errors.name" :required="true">
      <ElInput
        v-model="name"
        :placeholder="$t('labels.name')"
        @input="setFieldError('name', undefined)"
        @blur="validateField('name')" />
    </ElFormItem>

    <ElFormItem
      :label="$t('labels.description')"
      :error="errors.description"
      style="position: relative">
      <ElInput
        :rows="4"
        type="textarea"
        v-model="description"
        :placeholder="$t('labels.description')"
        @input="setFieldError('description', undefined)"
        @blur="validateField('description')" />
      <span
        class="char-count"
        :class="{
          'char-count-over': descriptionLength > MAX_DESCRIPTION,
          'char-count-close': descriptionLength > 800,
        }">
        {{ descriptionLength }}/{{ MAX_DESCRIPTION }}
      </span>
    </ElFormItem>

    <ElFormItem :label="$t('labels.amount')" :error="errors.amount" :required="true">
      <ElInput
        v-model="amount"
        inputmode="decimal"
        placeholder="0.00"
        @input="setFieldError('amount', undefined)"
        @blur="validateField('amount')"
        :formatter="formatAmount"
        :parser="parseAmount"
        class="amount-input">
        <template #prefix>$</template>
      </ElInput>
    </ElFormItem>

    <ElFormItem :label="$t('labels.is-recipient')">
      <ElSwitch size="large" v-model="isRecipient" />
    </ElFormItem>

    <ElFormItem
      :label="$t('labels.registered-date')"
      :error="errors.registeredDate"
      :required="true">
      <ElDatePicker
        v-model="registeredDate"
        @blur="validateField('registeredDate')"
        type="date"
        placeholder="Pick a day"
        :disabled-date="disableFutureDates"
        size="large" />
    </ElFormItem>

    <ElFormItem :label="$t('labels.category')" :error="errors.category" :required="true">
      <ElSelect v-model="category" :placeholder="$t('labels.category')">
        <ElOption
          v-for="category of categories"
          :key="category.id"
          :label="category.name"
          :value="category.id" />
      </ElSelect>
    </ElFormItem>
  </ElForm>
</template>

<style scoped>
.amount-input :deep(.el-input__prefix) {
  color: var(--color-text);
  padding-right: 5px;
}

.char-count {
  font-size: 12px;
  color: var(--el-text-color-secondary);
  position: absolute;
  bottom: -30px;
  right: 0;
}

.char-count-over {
  color: var(--color-error) !important;
}

.char-count-close {
  color: var(--color-warning);
}
</style>
