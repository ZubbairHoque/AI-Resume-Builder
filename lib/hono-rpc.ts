import { hc } from 'hono/client';
import { AppType } from "@/app/api/[[...route]]/route";

// Correct the environment variable name to match the defined variable
export const client = hc<AppType>(process.env.HONO_API_URL!);

export const api = client.api;
