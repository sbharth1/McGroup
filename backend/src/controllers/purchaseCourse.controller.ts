import type { Response } from "express";
import type { AuthRequest } from "../middlewares/auth.middleware.ts";
import { db } from "../config/db.config.ts";
import { course } from "../models/course.model.ts";
import { and, eq } from "drizzle-orm";
import { purchase } from "../models/puchase.model.ts";
import { purchaseSchema } from "../zod/puchase.ts";

export const purchaseCourse = async (req: AuthRequest, res: Response) => {
  const user = req.user;
  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const parsed = purchaseSchema.safeParse(req.body);

  if (!parsed.success) {
    const errors = parsed.error.issues.map((issue) => ({
      path: issue.path[0],
      mesasge: issue.message,
    }));
    return res.status(422).json({
      errors
    })
  }
  
  const courseId = Number(req.params.id);
  if (Number.isNaN(courseId)) {
    return res.status(400).json({ message: "Invalid course id" });
  }

  try {
    const [existingCourse] = await db
      .select()
      .from(course)
      .where(eq(course.id, courseId));

    if (!existingCourse) {
      return res.status(400).json({ message: "Course not found" });
    }

    const [existingPurchase] = await db
      .select()
      .from(purchase)
      .where(
        and(eq(purchase.userId, user.id), eq(purchase.courseId, courseId))
      );

    if (existingPurchase) {
      return res.status(400).json({ message: "course already purchased" });
    }

    // payment gateway for purchase courses

    const [newPurchase] = await db
      .insert(purchase)
      .values({
        userId: user.id,
        courseId,
        pricePaid: existingCourse.coursePrice,
      })
      .returning();

    return res.status(201).json({
      messagea: "Course purchased successfully",
      course,
      purchase: newPurchase,
    });
  } catch (err) {}
};
