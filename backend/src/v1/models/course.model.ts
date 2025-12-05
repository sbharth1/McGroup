import { integer, varchar } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";

export const course = pgTable("courses", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  courseName: varchar("course_name", { length: 255 }).notNull(),
  coursePrice: varchar("course_price", { length: 255 }).notNull(),
  description: varchar("description", { length: 1024 }).notNull().default(""),
});
