import { env } from '#/environment.ts'
import { middlewareApp } from '#/middleware.ts'
import { ratelimitReached } from '#/rate-limit.ts'
import { Markdown } from '#/components/markdown.tsx'
import { Feedback } from '#/components/feedback.tsx'
import { base64ToString, decodeBufferFile } from '#/utilities.ts'
import { getRecord, insertNewRecord } from '#/database/operations.ts'

import { Hono } from 'https://deno.land/x/hono@v3.1.2/mod.ts'

const app = new Hono()
app.route('*', middlewareApp)
app.route('/', middlewareApp)

app.get('/', (context) => {
  const LANDING_PATH = new URL('./components/landing.md', import.meta.url)
  return context.html(Markdown(
    () => Deno.readTextFileSync(LANDING_PATH).replaceAll('$BASE_URL', env['BASE_URL']),
  ))
})

app.get('/feedback', (context) => {
  return context.html(Feedback(), 200)
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
  const result = await insertNewRecord(decoded)
  return context.text(result.id, 200)
})

app.post('/api/new', async (context) => {
  const body = await context.req.json()
  const result = await insertNewRecord(JSON.stringify(body))
  return context.text(result.id, 200)
})

app.post('/api/new/file', async (context) => {
  const arrayBuffer = await context.req.arrayBuffer()
  const decoded = decodeBufferFile(arrayBuffer)
  const parsed = JSON.parse(decoded)
  const result = await insertNewRecord(JSON.stringify(parsed))
  return context.text(result.id, 200)
})

Deno.serve({
  port: Number(env['PORT']) ?? 3034,
}, async (request, info) => {
  const { reached, headers } = await ratelimitReached({ request, info })
  if (reached) {
    return new Response('Too Many Requests', { status: 429, headers })
  }
  return app.fetch(request, info)
})
