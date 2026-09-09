<script setup lang="ts">
import { LoginSchema, type Login } from '@/models/auth'
import { toTypedSchema } from '@vee-validate/zod'
import { ElForm, ElFormItem, ElLink } from 'element-plus'
import { useForm } from 'vee-validate'
import { computed, ref } from 'vue'
import InputValidationIcon from '../form/InputValidationIcon.vue'
import { Message, Lock } from '@element-plus/icons-vue'
import { useLogin } from '@/api/queries/authQueries.ts'

const { mutate: login, isPending, isError, reset } = useLogin()

const validationSchema = computed(() => toTypedSchema(LoginSchema()))

const { handleSubmit, errors, setFieldError, defineField, validateField } = useForm({
  validationSchema,
})

const emailValid = ref<boolean | undefined>(undefined)
const passwordValid = ref<boolean | undefined>(undefined)

const [email, emailProps] = defineField('email')
const [password, passwordProps] = defineField('password')

const isFormValid = computed(() => emailValid.value && passwordValid.value)

const isEmailValid = async () => {
  const result = await validateField('email')
  emailValid.value = result.valid
  reset
}

const isPasswordValid = async () => {
  const result = await validateField('password')
  passwordValid.value = result.valid
  reset
}

const onSubmit = handleSubmit((data: Login) => {
  login(data)
})
</script>

<template>
  <ElForm label-position="top" @submit.prevent="onSubmit">
    <ElFormItem :label="$t('labels.email')" :error="errors.email" :required="true">
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

    <ElFormItem
      :label="$t('labels.password')"
      :error="errors.password"
      :required="true"
      style="margin-bottom: 5px !important"
    >
      <ElInput
        type="password"
        v-model="password"
        v-bind="passwordProps"
        :placeholder="$t('labels.password')"
        @input="setFieldError('password', undefined)"
        @blur="isPasswordValid"
        :prefix-icon="Lock"
        show-password
      >
        <template #suffix>
          <InputValidationIcon :error="errors.password" :is-valid="passwordValid" />
        </template>
      </ElInput>
    </ElFormItem>

    <div class="link-box">
      <ElLink type="primary">{{ $t('links.forgot-password') }}</ElLink>
    </div>

    <div class="error-message" style="margin-top: 10px" v-show="isError">
      Email or password is invalid.
    </div>
    <ElButton
      type="primary"
      class="submit-button"
      native-type="submit"
      :disabled="!isFormValid || isPending"
      :loading="isPending"
    >
      Login
    </ElButton>
  </ElForm>
</template>

<style scoped>
.submit-button {
  width: 100%;
  height: 40px;
  margin-top: 10px;
}

.link-box {
  width: 100%;
  display: flex;
  justify-content: end;
}
</style>
