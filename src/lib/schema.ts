import { z } from "zod"

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export const SignUpSchema = z
  .object({
    name: z.string().min(2, { message: "Too short name" }),
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password does not matching",
    path: ["confirmPassword"],
  })
