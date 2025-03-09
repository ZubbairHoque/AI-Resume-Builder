import { createDocumentTableSchema, DocumentSchema, documentTable } from "@/src/db/documents";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { clerkMiddleware } from "@/middlewareAPIRoute";
import { generateDocUUID } from "@/lib/helper";
import { db } from "@/src/index"; // Ensure you have a db connection
import { usersTable } from "@/src/db/schema"; // Import the usersTable
import { eq } from "drizzle-orm";
import { UserDetailContext } from "@/app/_context/UserDetailContext";

const documentRoute = new Hono()
  .post(
    "/create",
    zValidator("json", createDocumentTableSchema),
    clerkMiddleware(),
    async (c) => {
      try {
        // Extract validated data from the request
        const { title } = c.req.valid("json") as DocumentSchema;

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

        // Query the usersTable to get the name and email
        const [user] = await db.select().from(usersTable).where(eq(usersTable.id, Number(userId)));
        if (!user) {
          return c.json(
            {
              success: false,
              message: "User not found",
            },
            { status: 404 }
          );
        }

        // Construct the new document object with all required fields
        const newDoc = {
          title: title,
          documentId: documentId,
          userId: UserDetailContext.arguments, // Add userId from the usersTable
          authorName: UserDetailContext.name, // Add the user's name
          authorEmail: user?.email, // Add the user's email
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
            data: {
              ...data,
            },
          },
          { status: 200 }
        );
      } catch (error) {
        // Handle errors and return a failure response
        console.error("Error saving document:", error);
        return c.json(
          {
            success: false,
            message: "Failed to save document",
            error: error instanceof Error ? error.message : "Unknown error",
          },
          { status: 500 }
        );
      }
    }
  );

export default documentRoute;