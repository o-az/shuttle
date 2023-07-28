import { stringToBase64 } from '#/utilities.ts'

import { Ratelimit } from 'https://esm.sh/@upstash/ratelimit@0.4.3'
import { Context, Next } from 'https://deno.land/x/hono@v3.1.2/mod.ts'
import { Redis } from 'https://deno.land/x/upstash_redis@v1.22.0/mod.ts'

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  // TODO figure out a reasonable limit
  limiter: Ratelimit.slidingWindow(10, '10 s'),
  analytics: true,
  'timeout': 1_000,
  prefix: '@upstash/ratelimit',
})

export async function checkRatelimit({
  context: { req, res },
  next,
}: {
  context: Context
  next: Next
}) {
  const userAgent = req.headers.get('user-agent')
  const identifier = stringToBase64(userAgent ?? 'anonymous')
  const { limit, remaining, reset, success } = await ratelimit.limit(identifier)
  console.log({ limit, remaining, reset, success })

  res.headers.set('X-RateLimit-Reached', `${!success}`)
  res.headers.set('X-RateLimit-Limit', limit.toString())
  res.headers.set('X-RateLimit-Remaining', remaining.toString())
  res.headers.set('X-RateLimit-Reset', new Date(reset).toISOString())

  if (!success) {
    return new Response('Too Many Requests', { status: 429 })
  }

  await next()
}
