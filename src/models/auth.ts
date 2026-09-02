import z from 'zod'

export const loginSchema = z.object({
  email: z.string().email(),
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
