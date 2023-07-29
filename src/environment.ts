import * as v from 'https://deno.land/x/valibot@v0.5.0/mod.ts'
import { load } from 'https://deno.land/std@0.196.0/dotenv/mod.ts'

const loaded = await load({ export: true })

Object.assign(loaded, {
  BASE_URL: Deno.env.get('DENO_DEPLOYMENT_ID') || Deno.env.get('DENO_REGION')
    ? 'https://shuttle.deno.dev'
    : 'http://localhost:3034',
})

const EnvironmentSchema = v.object({
  ENVIRONMENT: v.union([v.literal('development'), v.literal('production'), v.literal('test')]),
  DATABASE_URL: v.string([v.url()]),
  DATABASE_TOKEN: v.string(),
  BASE_URL: Deno.env.get('DENO_DEPLOYMENT_ID')
    ? v.string([v.url(), v.endsWith('.deno.dev')])
    : v.string([v.url()]),
  PORT: v.optional(v.string()),
  UPSTASH_REDIS_REST_URL: v.string([v.url()]),
  UPSTASH_REDIS_REST_TOKEN: v.string(),
})

export const env = v.parse(EnvironmentSchema, loaded) satisfies v.Output<
  typeof EnvironmentSchema
>
