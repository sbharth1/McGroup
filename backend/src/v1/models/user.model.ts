import {
  integer,
  pgTable,
  varchar,
  text,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),

  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  number: varchar("number", { length: 15 }).notNull().unique(),

  passwordHash: text("password_hash").notNull(),

  isVerified: boolean("is_verified").default(false).notNull(),
  role: varchar("role", { length: 20 }).default("user").notNull(),
  lastLogin: timestamp("last_login", { withTimezone: true }),

  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});
