import 'https://deno.land/std@0.196.0/dotenv/load.ts'

/**
 * ```ts
 * console.log(env('DATABASE_URL'), env('DATABASE_TOKEN')) // both work
 * ```
 */

export const env = Deno.env.toObject()

export default (
  key: keyof typeof env,
) => env[key as keyof typeof env]
