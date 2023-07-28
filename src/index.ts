import env from '#/environment.ts'

import { base64ToString } from '#/utilities.ts'
import { Landing } from '#/components/landing.tsx'
import { RenderJSON } from '#/components/json.tsx'
import { getRecord, insertNewRecord } from '#/database/operations.ts'

import { Hono } from 'https://deno.land/x/hono@v3.1.2/mod.ts'
import { HTTPException } from 'https://deno.land/x/hono@v3.1.2/http-exception.ts'
import {
  cache,
  compress,
  cors,
  logger,
  prettyJSON,
} from 'https://deno.land/x/hono@v3.1.2/middleware.ts'

const app = new Hono()

app.use('*', logger())
app.use('*', compress())
app.use('*', cors({ origin: '*' }))
app.use('*', prettyJSON({ space: 2 }))

app.use('*', async (context, next) => {
  await next()
  context.res.headers.set('X-Powered-By', 'https://github.com/o-az')
})

app.notFound(() => new Response('Not Found', { status: 404, statusText: 'Not Found' }))

app.onError((error, context) => {
  console.error(`-- app.onError [${context.req.url}]: ${error}`, context.error)
  if (error instanceof HTTPException) return error.getResponse()
  return context.json({ message: error.message }, 500)
})

app.get('/env', (context) => {
  if (env('ENVIRONMENT') !== 'development') {
    return new Response(JSON.stringify({ ENVIRONMENT: 'production' }, undefined, 2), {
      status: 418,
    })
  }
  console.log(JSON.stringify(env, undefined, 2))
  return context.json(env)
})

app.get('/error', (context) => {
  console.log({ path: context.req.path, url: context.req.url, error: context.error })
  return context.json({ message: 'ok' })
})

app.get('/', (context) => context.html(Landing()))

app.get('/:record-id', async (context) => {
  const id = context.req.param('record-id')
  const row = await getRecord(id)
  if (!row) return context.json({ message: 'Not Found' }, 404)
  return context.html(RenderJSON(row.json))
})

app.get('/api/:id', async (context) => {
  const id = context.req.param('id')
  const row = await getRecord(id)
  if (!row) return context.json({ message: 'Not Found' }, 404)
  return context.json(JSON.parse(row.json))
})

app.get('/api/new/:encoded-content', async (context) => {
  const content = context.req.param('encoded-content')
  const decoded = base64ToString(content)
  const result = await insertNewRecord(decoded)
  return context.text(result.id)
})

app.post('/api/new', async (context) => {
  const body = await context.req.json()
  const result = await insertNewRecord(JSON.stringify(body))
  return context.text(result.id)
})

const port = Number(Deno.env.get('PORT')) || 3034

Deno.serve({ port }, app.fetch)
