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
      .string({
        required_error: t('form.messages.required'),
      })
      .nonempty()
      .max(255)
      .trim(),
    description: z.string().max(1000).optional(),
    amount: z
      .string()
      .min(1, 'Amount is required')
      .regex(/^\d+(\.\d{1,2})?$/, 'Enter a valid amount, up to 2 decimals')
      .transform(Number)
      .pipe(
        z.number().positive('Amount must be greater than 0').max(MAX_AMOUNT, 'Amount is too large'),
      ),
    isRecipient: z.boolean().default(false),
    registeredDate: z
      .date({
        required_error: t('form.messages.required'),
        invalid_type_error: t('form.messages.required'),
      })
      .refine((d) => d.getTime() <= Date.now(), t('form.messages.future-date')),
    category: CategorySchema,
    createdBy: z.string().uuid(),
    group: z.string().nullable().optional(),
  })

export const TransactionCreateSchema = () =>
  TransactionSchema().transform((data) => ({
    name: data.name,
    description: data.description,
    amount: data.amount,
    isRecipient: data.isRecipient,
    registeredDate: data.registeredDate,
    category: data.category.id,
    createdBy: data.createdBy,
  }))

export type Category = z.infer<typeof CategorySchema>
export type Transaction = z.infer<ReturnType<typeof TransactionSchema>>

export type TransactionCreate = z.infer<ReturnType<typeof TransactionCreateSchema>>
