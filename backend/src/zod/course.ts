import {z} from 'zod'

export const courseSchema = z.object({
    id:z.number().int().optional(),
    courseName:z.string().max(255),
    coursePrice:z.string().max(255),
    description:z.string().max(1024).default("")
})