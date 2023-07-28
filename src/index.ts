import { env } from '#/environment.ts'
import { middlewareApp } from '#/middleware.ts'
import { Markdown } from '#/components/markdown.tsx'
import { getRecord, insertNewRecord } from '#/database/operations.ts'
import { base64ToString, decodeBufferFile, payloadSize } from '#/utilities.ts'

import { Hono } from 'https://deno.land/x/hono@v3.1.2/mod.ts'
import { HTTPException } from 'https://deno.land/x/hono@v3.1.2/http-exception.ts'

const app = new Hono()
app.route('*', middlewareApp)

app.notFound((context) => {
  const { url } = context.req
  console.log(`[-- app.notFound]`, url)
  return new Response(JSON.stringify({ message: `I can't find ${url}` }, null, 2), { status: 404 })
})

app.onError((error, context) => {
  console.error(`[-- app.onError]`, context.req.url, error, context.error)
  if (error instanceof HTTPException) return error.getResponse()
  return new Response(JSON.stringify({ message: error.message }, null, 2), { status: 500 })
})

app.get('/env', () => {
  const ENVIRONMENT = env['ENVIRONMENT']
  return new Response(JSON.stringify(ENVIRONMENT === 'development' ? { ENVIRONMENT } : env), {
    status: 418,
  })
})

app.get('/error', (context) => context.json({ message: context.error, url: context.req.url }))

app.get('/', (context) => {
  const LANDING_PATH = new URL('./components/landing.md', import.meta.url)
  return context.html(Markdown(
    () => Deno.readTextFileSync(LANDING_PATH).replaceAll('$BASE_URL', env['BASE_URL']),
  ))
})

app.get('/:record-id', async (context) => {
  const id = context.req.param('record-id')
  const row = await getRecord(id)
  if (!row) return context.json({ message: 'Not Found' }, 404)
  return context.html(
    Markdown(`\`\`\`json\n${JSON.stringify(JSON.parse(row.json), null, 2)}\n\`\`\``),
    200,
  )
})

app.get('/api/:id', async (context) => {
  const id = context.req.param('id')
  const row = await getRecord(id)
  if (!row) return context.json({ message: 'Not Found' }, 404)
  return context.json(JSON.parse(row.json), 200)
})

app.get('/api/new/:encoded-content', async (context) => {
  const content = context.req.param('encoded-content')
  const decoded = base64ToString(content)
  const _size = payloadSize(decoded)
  const result = await insertNewRecord(decoded)
  return context.text(result.id, 200)
})

app.post('/api/new', async (context) => {
  const body = await context.req.json()
  const _size = payloadSize(body)
  console.log({ _size })
  const result = await insertNewRecord(JSON.stringify(body))
  return context.text(result.id, 200)
})

app.post('/api/new/file', async (context) => {
  const arrayBuffer = await context.req.arrayBuffer()
  const decoded = decodeBufferFile(arrayBuffer)
  const parsed = JSON.parse(decoded)
  const _size = payloadSize(decoded)
  const result = await insertNewRecord(JSON.stringify(parsed))
  return context.text(result.id, 200)
})

const port = Number(Deno.env.get('PORT')) || 3034

Deno.serve({ port }, app.fetch)
