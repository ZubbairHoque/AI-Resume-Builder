import { relations } from "drizzle-orm";
import {
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod"; // Ensure Zod is imported
import { personalInfoTable } from "./personal-info";
import { experienceTable } from "./experience";
import { skillsTable } from "./skills";
import { educationTable } from "./education";

// Define the status enum
export const statusEnum = pgEnum("status", ["archived", "private", "public"]);

// Define the document table schema
export const documentTable = pgTable("document", {
  id: serial("id").notNull().primaryKey(),
  documentId: varchar("document_id").unique().notNull(),
  userId: varchar("user_id").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  summary: text("summary"),
  themeColor: varchar("theme_color", { length: 255 })
    .notNull()
    .default("#7c3aed"),
  thumbnail: text("thumbnail"),
  currentPosition: integer("current_position").notNull().default(1),
  status: statusEnum("status").notNull().default("private"),
  authorName: varchar("author_name", { length: 255 }).notNull(),
  authorEmail: varchar("author_email", { length: 255 }).notNull(),
  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});

// Define the document relations
export const documentRelations = relations(documentTable, ({ one, many }) => {
  return {
    personalInfo: one(personalInfoTable),
    experiences: many(experienceTable),
    education: many(educationTable),
    skills: many(skillsTable),
  };
});

// Create the document table schema using Zod
export const createDocumentTableSchema = createInsertSchema(documentTable, {
  title: z.string().min(1), // Use Zod's string method and apply min constraint
  themeColor: z.string().optional(), // Use Zod's string method and make it optional
  thumbnail: z.string().optional(), // Use Zod's string method and make it optional
  currentPosition: z.number().optional(), // Use Zod's number method and make it optional
}).pick({
  title: true,
  status: true,
  summary: true,
  themeColor: true,
  thumbnail: true,
  currentPosition: true,
});

// Define the document schema type
export type DocumentSchema = z.infer<typeof createDocumentTableSchema>;
