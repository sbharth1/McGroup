import { z } from "zod";

const phoneRegex = /^\+?\d{7,15}$/;

export const registerSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.email({ message: "Invalid email" }),            
  number: z.string().regex(phoneRegex, { message: "Invalid phone number" }), 
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  confirmPassword: z.string()
})
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});


export const loginSchema = z.object({
  email: z.email({message:"Invalid email"}),
  password: z.string().min(8),
});



export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
