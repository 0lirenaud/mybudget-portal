<script setup lang="ts">
import { loginSchema } from '@/models/auth'
import { toTypedSchema } from '@vee-validate/zod'
import { ElForm, ElFormItem } from 'element-plus'
import { useForm } from 'vee-validate'
import { ref } from 'vue'
import InputValidationIcon from '../form/InputValidationIcon.vue'
import { Message } from '@element-plus/icons-vue'

const validationSchema = toTypedSchema(loginSchema)

const { handleSubmit, errors, setFieldError, defineField, validateField } = useForm({
  validationSchema,
})

const emailValid = ref<boolean | undefined>(undefined)

const [email, emailProps] = defineField('email')
const [password, passwordProps] = defineField('password')

const isEmailValid = async () => {
  const result = await validateField('email')

  emailValid.value = result.valid
}
</script>

<template>
  <ElForm label-position="top">
    <ElFormItem label="Email" :error="errors.email" :required="true">
      <ElInput
        v-model="email"
        v-bind="emailProps"
        placeholder="you@example.com"
        @input="setFieldError('email', undefined)"
        @blur="isEmailValid"
        :prefix-icon="Message"
      >
        <template #suffix>
          <InputValidationIcon :error="errors.email" :is-valid="emailValid" />
        </template>
      </ElInput>
    </ElFormItem>
  </ElForm>
</template>
