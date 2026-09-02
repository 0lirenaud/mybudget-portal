import i18n from '@/i18n/i18n'
import { useI18n } from 'vue-i18n'
import z from 'zod'

export const loginSchema = z.object({
  email: z.string({
    required_error: i18n.global.t('form.required', { field: 'email' }),
  }).email(),
  password: z.string({
    required_error: i18n.global.t('form.required', { field: 'password' }),
  }).trim().min(1, i18n.global.t('form.required', { field: 'password' })),
})

export const registerSchema = z.object({
  password: z
    .string()
    .min(8)
    .max(255, 'Cannot exceed 255 characters')
    .regex(/[a-z]/, 'Must include a lowercase letter')
    .regex(/[A-Z]/, 'Must include an uppercase letter')
    .regex(/[0-9]/, 'Must include a number')
    .regex(/[!@#$%^&*()\-+=]/, 'Must include a special character')
    .refine((val) => !/\s/.test(val), 'Spaces are not allowed'),
})
