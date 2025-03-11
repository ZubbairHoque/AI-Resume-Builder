import { AppType } from '@/app/api/[[...route]]/route';
import { hc } from 'hono/client';

export const client = hc<AppType>(process.env.HONO_API_URL!);

export const api = client.api;