import { createDocumentTableSchema, DocumentSchema, documentTable } from "@/src/db/documents";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { clerkMiddleware } from "@/middlewareAPIRoute";
import { generateDocUUID } from "@/lib/helper";
import { db } from "@/src/index"; // Ensure you have a db connection
import { usersTable } from "@/src/db/schema"; // Import the usersTable
import { eq } from "drizzle-orm";
import { UserDetailContext } from "@/app/_context/UserDetailContext";

const documentRoute = new Hono();

documentRoute.post(
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
      const userId = c.req.header("user_id");

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

      // Construct the new document object
      const newDoc = {
        title,
        documentId,
        userId: user.id.toString(),
        authorName: UserDetailContext?.name || "Unknown Author", // Avoid errors if context is undefined
        authorEmail: user.email,
      };

      // Insert into the database and return the inserted document
      const [data] = await db.insert(documentTable).values(newDoc).returning({
        documentId: documentTable.documentId, // Explicitly return documentId
      });

      // Ensure data contains documentId
      if (!data?.documentId) {
        return c.json(
          {
            success: false,
            message: "Failed to retrieve documentId after insertion",
          },
          { status: 500 }
        );
      }

      return c.json(
        {
          success: true,
          data: {
            documentId: data.documentId,
          },
        },
        { status: 200 }
      );
    } catch (error) {
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
