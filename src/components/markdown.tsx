/** @jsx jsx */
import { Layout } from '#/components/layout.tsx'

import { render } from 'https://deno.land/x/gfm@0.2.5/mod.ts'
import { jsx, memo, raw } from 'https://deno.land/x/hono@v3.1.2/middleware.ts'
import 'https://esm.sh/prismjs@1.29.0/components/prism-bash.min.js?no-check&pin=v57'
import 'https://esm.sh/prismjs@1.29.0/components/prism-json.min.js?no-check&pin=v57'

export const Markdown = memo((
  content: (() => string) | string,
) => {
  const stringContent = typeof content === 'function' ? content() : content
  const rendered = render(stringContent, {
    allowIframes: true,
  })
  return (
    <Layout>
      {raw(rendered)}
    </Layout>
  )
})
