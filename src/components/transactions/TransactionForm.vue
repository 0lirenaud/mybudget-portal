<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import {
  MAX_AMOUNT,
  MAX_DESCRIPTION,
  TransactionCreateSchema,
  type TransactionCreate,
} from '../../models/transaction'
import { computed, ref } from 'vue'
import { useForm } from 'vee-validate'
import {
  ElInput,
  ElFormItem,
  ElDatePicker,
  ElSelect,
  ElOption,
  ElRadioGroup,
  ElRadioButton,
  ElTimePicker,
  ElIcon,
} from 'element-plus'
import { getCategories } from '@/api/queries/categoryQueries'
import { useI18n } from 'vue-i18n'
import { Wallet } from '@element-plus/icons-vue'
import { formatAmount } from '@/utils/moneyUtils'

interface Props {
  onSubmit: (data: TransactionCreate) => void
  transaction: Partial<TransactionCreate>
}

const props = defineProps<Props>()
const i18n = useI18n()
const validationSchema = computed(() => toTypedSchema(TransactionCreateSchema()))

const { data: categories, isLoading } = getCategories()

const { handleSubmit, errors, setFieldError, defineField, validateField, resetForm } = useForm({
  validationSchema,
  initialValues: props.transaction,
})

const opts = { validateOnModelUpdate: false }
const [name] = defineField('name', opts)
const [description] = defineField('description', opts)
const [amount] = defineField('amount', opts)
const [isRecipient] = defineField('isRecipient', opts)
const [registeredDate] = defineField('registeredDate', opts)
const [category] = defineField('category', opts)
const time = defineModel<string>({ default: '0' })
const timeErrors = ref()

const hasErrors = computed(() => Object.keys(errors.value).length > 0)

const submit = handleSubmit((values) => props.onSubmit(values))

const parseAmount = (value?: string): string => {
  const digits = (value ?? '').replace(/\D/g, '').replace(/^0+/, '')
  if (!digits) return ''

  const padded = digits.padStart(3, '0')
  const next = `${padded.slice(0, -2)}.${padded.slice(-2)}`

  if (Number(next) > MAX_AMOUNT) return String(amount.value) ?? ''
  return next
}

const descriptionLength = computed(() => (description.value ?? '').length)

const validateTime = () => {
  if (!time.value)
    timeErrors.value = i18n.t("form.messages.required")
}

</script>

<template>
  <div class="title-section" style="display: flex; align-items: center; gap: 15px">
    <ElIcon class="icon-title"><Wallet /></ElIcon>
    <div>
      <h2 class="title">New transaction</h2>
      <span class="subtitle">Add a new transaction to your budget</span>
    </div>
  </div>

  <ElForm label-position="top" @submit.prevent="submit" style="margin-top: 20px;" id="transaction-form">
    <ElFormItem :label="$t('labels.name')" :error="errors.name" :required="true">
      <ElInput
        v-model="name"
        :placeholder="$t('form.placeholders.transaction-name')"
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
        :placeholder="$t('form.placeholders.transaction-description')"
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

    <ElFormItem :label="$t('labels.category')" :error="errors.category" :required="true">
      <ElSelect
        v-model="category"
        :placeholder="$t('form.placeholders.transaction-category')"
        size="large"
        popper-class="select-options"
        @blur="validateField('category')">
        <ElOption
          v-for="category of categories"
          :key="category.id"
          :label="category.name"
          :value="category.id" />
      </ElSelect>
    </ElFormItem>

    <ElFormItem :label="$t('labels.is-recipient')">
      <ElRadioGroup v-model="isRecipient" size="large" class="switch-input">
        <ElRadioButton :label="$t('form.placeholders.transaction-expense')" :value="false" />
        <ElRadioButton :label="$t('form.placeholders.transaction-revenu')" :value="true" />
      </ElRadioGroup>
    </ElFormItem>

    <div style="display: flex; justify-content: space-between; gap: 30px">
      <ElFormItem :label="$t('labels.date')" :error="errors.registeredDate" :required="true" style="width: 100%">
        <ElDatePicker
          style="width: 100%"
          v-model="registeredDate"
          @blur="validateField('registeredDate')"
          type="date"
          :placeholder="$t('form.placeholders.date')"
          size="large" />
      </ElFormItem>

      <ElFormItem :label="$t('labels.time')" :error="timeErrors" style="width: 100%" required>
        <ElTimePicker
          style="width: 100%"
          v-model="time"
          value="0"
          format="HH:mm"
          :placeholder="$t('form.placeholders.time')"
          @blur="validateTime"
          size="large" />
      </ElFormItem>
    </div>
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
