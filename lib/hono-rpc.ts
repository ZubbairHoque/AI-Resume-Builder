import { AppType } from '@/app/api/[[...route]]/route';
import { hc } from 'hono/client';

console.log('HONO_API_URL:', process.env.HONO_API_URL);

export const client = hc<AppType>(process.env.HONO_API_URL!) ;

export const api = client.api;