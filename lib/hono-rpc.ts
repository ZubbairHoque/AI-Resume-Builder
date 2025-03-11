import {AppType} from '@/app/api/[[...route]]/route'
import { hc } from 'hono/client'

// 😃
export const client = hc<AppType>('http://localhost:3000') // Typed correctly

export const api = client.api
