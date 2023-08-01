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
  const headers = new Headers(request.headers)
  const { hostname: identifier } = info?.remoteAddr ?? 'anonymous'
  if (env['ENVIRONMENT'] === 'development') return { reached: false, headers }
  const { limit, remaining, reset, success } = await ratelimit.limit(identifier)
  console.log({ limit, remaining, reset, success })

  headers.set('X-RateLimit-Reached', `${!success}`)
  headers.set('X-RateLimit-Limit', limit.toString())
  headers.set('X-RateLimit-Remaining', remaining.toString())
  headers.set('X-RateLimit-Reset', new Date(reset).toISOString())

  return { reached: !success, headers }
}
