/** @jsx jsx */
import { stringToHTML } from '#/markdown.ts'
import { Layout } from '#/components/layout.tsx'

import { jsx, memo, raw } from 'https://deno.land/x/hono@v3.1.2/middleware.ts'
import 'https://esm.sh/prismjs@1.29.0/components/prism-bash?no-check&pin=v57'

const LANDING_PATH = new URL('./landing.md', import.meta.url)

export function Landing() {
  const Rendered = memo(() => {
    const content = Deno.readTextFileSync(LANDING_PATH)
    return raw(stringToHTML(content))
  })
  return (
    <Layout>
      <Rendered />
    </Layout>
  )
}
