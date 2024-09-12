import {
  boolean,
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { createSelectSchema, createInsertSchema } from "drizzle-zod";

export const jobs = pgTable("jobs", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: text("slug").unique().notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  type: varchar("type", { length: 255 }).notNull(),
  locationType: varchar("locationType", { length: 255 }).notNull(),
  location: varchar("location", { length: 255 }),
  description: text("description").notNull(),
  salary: integer("salary").notNull(),
  companyName: varchar("companyName", { length: 255 }).notNull(),
  applicationEmail: varchar("applicationEmail", { length: 255 }),
  applicationUrl: varchar("applicationUrl", { length: 255 }),
  companyLogoUrl: varchar("companyLogoUrl", { length: 255 }),
  approved: boolean("approved").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").$onUpdate(() => new Date()),
});

export const readJobsSchema = createSelectSchema(jobs).omit({
  updatedAt: true,
});

export const createJobsSchema = createInsertSchema(jobs).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});