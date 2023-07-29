import { env } from '#/environment.ts'

import { Ratelimit } from 'https://esm.sh/@upstash/ratelimit@0.4.3'
import { Redis } from 'https://deno.land/x/upstash_redis@v1.22.0/mod.ts'

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  analytics: true,
  prefix: '@upstash/ratelimit',
  limiter: Ratelimit.fixedWindow(env['ENVIRONMENT'] === 'development' ? 70 : 7, '1m'),
})

export async function ratelimitReached({
  request,
  info,
}: {
  request: Request
  info: Deno.ServeHandlerInfo
}) {
  const { hostname: identifier } = info?.remoteAddr ?? 'anonymous'
  const { limit, remaining, reset, success, pending: _ } = await ratelimit.limit(identifier)
  console.log({ limit, remaining, reset, success })

  const headers = new Headers({
    ...request.headers,
    'X-RateLimit-Reached': `${!success}`,
    'X-RateLimit-Limit': limit.toString(),
    'X-RateLimit-Remaining': remaining.toString(),
    'X-RateLimit-Reset': new Date(reset).toISOString(),
  })

  return { reached: !success, headers }
}
