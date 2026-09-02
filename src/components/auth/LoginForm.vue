<script setup lang="ts">
import { loginSchema } from '@/models/auth'
import { toTypedSchema } from '@vee-validate/zod'
import { ElForm, ElFormItem } from 'element-plus'
import { useForm } from 'vee-validate'
import { ref } from 'vue'
import InputValidationIcon from '../form/InputValidationIcon.vue'
import { Message, Lock } from '@element-plus/icons-vue'

const validationSchema = toTypedSchema(loginSchema)

const { handleSubmit, errors, setFieldError, defineField, validateField } = useForm({
  validationSchema,
})

const emailValid = ref<boolean | undefined>(undefined)
const passwordValid = ref<boolean | undefined>(undefined)

const [email, emailProps] = defineField('email')
const [password, passwordProps] = defineField('password')

const isEmailValid = async () => {
  const result = await validateField('email')
  emailValid.value = result.valid
}

const isPasswordValid = async () => {
  const result = await validateField('password')
  passwordValid.value = result.valid
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

    <ElFormItem label="Password" :error="errors.password" :required="true">
      <ElInput 
        type="password"
        v-model="password" 
        v-bind="passwordProps" 
        placeholder="Password" 
        @input="setFieldError('password', undefined)"
        @blur="isPasswordValid"
        :prefix-icon="Lock"
      >
        <template #suffix>
          <InputValidationIcon :error="errors.password" :is-valid="passwordValid" />
        </template>
      </ElInput>
    </ElFormItem>
  </ElForm>
</template>
