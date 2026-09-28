import z from 'zod'
import i18n from '@/i18n/i18n'

const CategorySchema = z.object({
  id: z.string(),
  name: z.string(),
})

const TransactionSchema = z.object({
  id: z.string(),
  name: z
    .string({
      required_error: i18n.global.t('form.messages.required'),
    })
    .nonempty()
    .max(255)
    .trim(),
  description: z.string().max(1000),
  amount: z.number().min(0),
  isRecipient: z.boolean().default(false),
  registeredDate: z.date({
    required_error: i18n.global.t('form.messages.required'),
  }),
  category: CategorySchema,
  createdBy: z.string().uuid(),
  group: z.string().nullable().optional(),
})

export const TransactionCreateSchema = TransactionSchema.transform((data) => ({
  name: data.name,
  description: data.description,
  amount: data.amount,
  isRecipient: data.isRecipient,
  registeredData: data.registeredDate,
  category: data.category.id,
  createdBy: data.createdBy
}))

export type Category = z.infer<typeof CategorySchema>
export type Transaction = z.infer<typeof TransactionSchema>
