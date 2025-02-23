import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';

export const runtime = 'edge';

const app = new Hono().basePath('/api')

app
  .get(
    '/hello',
    (c) => {
    return c.json({
      message: 'Hello Next.js!',
  })
})
.get(
  "/hello/:id", 
  
  zValidator(
    'param',
    z.object({
      id: z.string(),
    })
  ),
  (c) => {
  const { id } = c.req.valid("param");
  return c.json({
    message: "hello subcriber",
    id: id,
  });
});

  .post(
    "/create/:postid",

    zValidator(
      'param',
      z.object({
        postid: z.string(),
      }) 
    ),
    (c) => {
    return c.json({})
  }
);

export const GET = handle(app)
export const POST = handle(app)
export const PATCH = handle(app)
