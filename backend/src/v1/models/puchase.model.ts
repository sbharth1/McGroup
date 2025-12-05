import { integer, numeric, pgTable, timestamp } from "drizzle-orm/pg-core";
import { users } from "./user.model.ts";
import { course } from "./course.model.ts";

export const purchase = pgTable("purchases", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),

  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  courseId: integer("course_id")
    .notNull()
    .references(() => course.id, { onDelete: "cascade" }),

    pricePaid: numeric("price_paid",{precision:5,scale:2}).notNull(),
    purchaseAt: timestamp("purchase_at",{withTimezone:true}).defaultNow().notNull(),
});
