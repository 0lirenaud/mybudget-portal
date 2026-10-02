import z from 'zod'
import i18n from '@/i18n/i18n'

export const MAX_AMOUNT = 1_000_000_000
export const MAX_DESCRIPTION = 1000

const t = i18n.global.t

const CategorySchema = z.object({
  id: z.string(),
  name: z.string(),
})

const TransactionSchema = () =>
  z.object({
    id: z.string(),
    name: z
      .string({ required_error: t('form.messages.required') })
      .nonempty()
      .max(255)
      .trim(),
    description: z.string().max(1000).optional(),
    amount: z
      .string({ required_error: t('form.messages.required') })
      .min(1, t('form.messages.required')),
    isRecipient: z.boolean(),
    registeredDate: z
      .date({
        required_error: t('form.messages.required'),
        invalid_type_error: t('form.messages.required'),
      }),
    category: CategorySchema,
    createdBy: z.string().uuid(),
    group: z.string().nullable().optional(),
  })

export const TransactionCreateSchema = () =>
  TransactionSchema()
    .pick({
      name: true,
      description: true,
      amount: true,
      isRecipient: true,
      registeredDate: true,
      createdBy: true,
    })
    .extend({
      category: z.string({
        required_error: t('form.messages.required'),
      }),
    })

export type Category = z.infer<typeof CategorySchema>
export type Transaction = z.infer<ReturnType<typeof TransactionSchema>>

export type TransactionCreate = z.infer<ReturnType<typeof TransactionCreateSchema>>
