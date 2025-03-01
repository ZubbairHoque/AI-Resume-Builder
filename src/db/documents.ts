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
import { personalInfoTable , personalInfoTableSchema } from "./personal-info";
import { experienceTable, experienceTableSchema } from "./experience";
import { skillsTable, skillsTableSchema } from "./skills";
import { educationTable, educationTableSchema } from "./education";

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

// Add authorName and authorEmail to the schema
export const createDocumentTableSchema = createInsertSchema(documentTable, {
  title: z.string().min(1),
  themeColor: z.string().optional(),
  thumbnail: z.string().optional(),
  currentPosition: z.number().optional(),
  authorName: z.string().min(1), // Ensure authorName is a required string
  authorEmail: z.string().email(), // Ensure authorEmail is a valid email
}).pick({
  title: true,
  status: true,
  summary: true,
  themeColor: true,
  thumbnail: true,
  currentPosition: true,
  authorName: true,
  authorEmail: true,
});

export const updateCombinedSchema = z.object({
  title: createDocumentTableSchema.shape.title.optional(),
  status: createDocumentTableSchema.shape.status.optional(),
  thumbnail: createDocumentTableSchema.shape.thumbnail.optional(),
  summary: createDocumentTableSchema.shape.summary.optional(),
  themeColor: createDocumentTableSchema.shape.themeColor.optional(),
  currentPosition: createDocumentTableSchema.shape.currentPosition.optional(),
  personalInfo: personalInfoTableSchema.optional(),
  education: z.array(educationTableSchema).optional(),
  experience: z.array(experienceTableSchema).optional(),
  skills: z.array(skillsTableSchema).optional(),
});


// Define the document schema type
export type DocumentSchema = z.infer<typeof createDocumentTableSchema>;
