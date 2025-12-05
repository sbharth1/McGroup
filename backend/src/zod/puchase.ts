import { number, z } from "zod";

export const purchaseSchema = z.object({
  id: z.number().int().optional(),
  userId: z.number().int(),
  courseId: z.number().int(),
  pricePaid: z.string(),
  purchaseAt: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid ISO datetime",
    }),
});
