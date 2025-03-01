import { createDocumentTableSchema, DocumentSchema, documentTable } from "@/src/db/documents";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { clerkMiddleware } from "@/middlewareAPIRoute";
import { generateDocUUID } from "@/lib/helper";
import { db } from "@/src/index"; // Ensure you have a db connection

const documentRoute = new Hono();

documentRoute.post(
  "/create",
  zValidator("json", createDocumentTableSchema),
  clerkMiddleware(),
  async (c) => {
    try {
      // Extract validated data from the request
      const { title, authorName, authorEmail } = c.req.valid("json") as DocumentSchema;

      // Generate a unique document ID
      const documentId = generateDocUUID();

      // Retrieve userId from the request headers
      const userId = c.req.header("user_id"); // Corrected method to access headers
      // Ensure userId is available
      if (!userId) {
        return c.json(
          {
            success: false,
            message: "User ID is missing from the request headers",
          },
          { status: 400 }
        );
      }

      // Construct the new document object with all required fields
      const newDoc = {
        title: title,
        documentId: documentId,
        userId: userId, // Add userId to match the schema requirements
        authorName: authorName,
        authorEmail: authorEmail,
      };

      // Insert the new document into the database
      const [data] = await db
        .insert(documentTable)
        .values(newDoc)
        .returning();

      // Return a successful response with the inserted data
      return c.json(
        {
          success: "ok",
          data,
        },
        { status: 200 }
      );
    } catch (error) {
      // Handle errors and return a failure response
      return c.json(
        {
          success: false,
          message: "Failed to save document",
          error: error,
        }
      );
    }
  }
);

export default documentRoute;
