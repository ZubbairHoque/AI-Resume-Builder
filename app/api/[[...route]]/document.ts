import { createDocumentTableSchema } from "@/src/db/documents";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { clerkMiddleware } from "@/middlewareAPIRoute";

const documentRoute = new Hono();

documentRoute.post(
  "/create",
  zValidator("json", createDocumentTableSchema),
  clerkMiddleware(), // Apply the Clerk middleware for authentication
  async (c) => {
    try {
      const user = c.get('clerkAuth'); // Retrieve authenticated user information
      const { title, } = c.req.valid("json") as Document

      // Check if user information is available
      if (user) {
        console.log("Authenticated user:", user); // Use the user variable
        // Additional logic for handling the request can be added here
      } else {
        console.error("User authentication failed.");
      }
    } catch (error) {
      // Handle errors appropriately
      console.error("Error processing request:", error);
    }
  }
);

export default documentRoute;
