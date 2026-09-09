import i18n from '@/i18n/i18n'
import type { JwtPayload } from 'jwt-decode'
import { useI18n } from 'vue-i18n'
import z from 'zod'

export interface CustomJwtPayload extends JwtPayload {
  role: Role
}

export enum Role {
  Admin = 'ADMIN',
  User = 'USER',
}

export interface User {
  email: string
  role: Role
}

export const LoginSchema = () =>
  z.object({
    email: z
      .string({
        required_error: i18n.global.t('form.messages.required'),
      })
      .email({
        message: i18n.global.t('form.messages.email'),
      }),
    password: z
      .string({
        required_error: i18n.global.t('form.messages.required'),
      })
      .trim()
      .min(1, i18n.global.t('form.messages.required', { field: 'password' })),
  })

export const RegisterSchema = z.object({
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

export type Login = z.infer<ReturnType<typeof LoginSchema>>
