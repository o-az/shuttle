import { checkRatelimit } from '#/rate-limit.ts'

import { Hono } from 'https://deno.land/x/hono@v3.1.2/mod.ts'
import { compress, cors, logger, prettyJSON } from 'https://deno.land/x/hono@v3.1.2/middleware.ts'

const middlewareApp = new Hono()

middlewareApp.use('*', logger())
middlewareApp.use('*', compress())
middlewareApp.use('*', cors({ origin: '*' }))
middlewareApp.use('*', prettyJSON({ space: 2 }))

middlewareApp.use('*', async (context, next) => {
  await next()
  context.res.headers.set('X-Powered-By', 'https://github.com/o-az')
})

middlewareApp.use('*', async (context, next) => await checkRatelimit({ context, next }))

export { middlewareApp }
