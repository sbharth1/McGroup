import { z } from "zod";
import { parsePhoneNumberFromString } from "libphonenumber-js";

// const phonePreprocess = (val: unknown) => {
//   if (typeof val !== "string") return val;
//   const candidate = val.trim();
//   const phone = parsePhoneNumberFromString(candidate);
//   if (phone && phone.isValid()) return phone.number;
//   return candidate;
// };

export const registerSchema = z
  .object({
    name: z.string().min(2, { message: "Name must be at least 2 characters" }),
    email: z.email({ message: "Invalid email" }),
    number: z
      .string()
      .regex(/^\+\d{7,15}$/, { message: "Invalid phone number" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginSchema = z
  .object({
    email: z.email({ message: "Invalid email" }).optional(),
    number: z
      .string()
      .regex(/^\+\d{7,15}$/, { message: "Invalid phone number" })
      .optional(),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
  })
  .refine((data) => data.email || data.number, {
    message: "Email or phone number is required",
    path: ["email"],
  });

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
