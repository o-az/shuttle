import { env } from '#/environment.ts'

import { Hono } from 'https://deno.land/x/hono@v3.1.2/mod.ts'
import { HTTPException } from 'https://deno.land/x/hono@v3.1.2/http-exception.ts'
import {
  //compress,
  cors,
  logger,
  prettyJSON,
} from 'https://deno.land/x/hono@v3.1.2/middleware.ts'

const middlewareApp = new Hono()

middlewareApp.use('*', logger())
middlewareApp.use('*', prettyJSON())
// compress shows weird characters in the browser
// middlewareApp.use('*', compress())

middlewareApp.use(
  '*',
  cors({
    origin: '*',
    allowMethods: ['GET', 'POST', 'HEAD', 'OPTIONS'],
  }),
)

middlewareApp.use('*', async (context, next) => {
  await next()
  context.res.headers.set('X-Powered-By', 'https://github.com/o-az/shuttle')
})

middlewareApp.notFound((context) => {
  const { url } = context.req
  console.log(`[middlewareApp.notFound]`, url)
  return context.json({ message: `I can't find ${url}` }, 404)
})

middlewareApp.onError((error, context) => {
  console.error(`[middlewareApp.onError]`, context.req.url, error, context.error)
  if (error instanceof HTTPException) return error.getResponse()
  return context.json({ message: `[onError] ${error.message}` }, 500)
})

middlewareApp.get('/env', (context) => {
  const ENVIRONMENT = env['ENVIRONMENT']
  return context.json(ENVIRONMENT === 'development' ? { env } : { env: { ENVIRONMENT } }, 418)
})

middlewareApp.get(
  '/error',
  (context) => context.json({ message: context, url: context.req.url }),
)

export { middlewareApp }
