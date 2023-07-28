import { env } from '#/environment.ts'

import { createClient } from 'https://esm.sh/@libsql/client@0.3.1/web'

export const database = createClient({
  'url': env['DATABASE_URL'],
  authToken: env['DATABASE_TOKEN'],
  'intMode': 'string',
})
