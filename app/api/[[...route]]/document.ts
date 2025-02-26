import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";

const documentRoute = new Hono().post(
    "/create",
    zValidator("json", createDocumentSchema)
);


export default documentRoute;