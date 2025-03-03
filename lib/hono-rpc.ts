import { hc } from 'hono/client'
import { AppType } from "@/app/api/[[...route]]/route"

export const client = hc<AppType>(process.env.HONO_API_URl!) as { api: AppType };

export const api = client.api;