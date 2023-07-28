/** @jsx jsx */
import { stringToHTML } from '#/markdown.ts'
import { Layout } from '#/components/layout.tsx'

import { jsx, memo, raw } from 'https://deno.land/x/hono@v3.1.2/middleware.ts'
import 'https://esm.sh/prismjs@1.29.0/components/prism-json?no-check&pin=v57'

export function RenderJSON(content: string) {
  const Rendered = memo(() =>
    raw(
      stringToHTML(`\`\`\`json\n${JSON.stringify(JSON.parse(content), null, 2)}\n\`\`\``),
    )
  )
  return (
    <Layout>
      <Rendered />
    </Layout>
  )
}
