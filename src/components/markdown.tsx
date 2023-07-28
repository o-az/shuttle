/** @jsx jsx */
import { Layout } from '#/components/layout.tsx'

import { render } from 'https://deno.land/x/gfm@0.2.5/mod.ts'
import { jsx, memo, raw } from 'https://deno.land/x/hono@v3.1.2/middleware.ts'
import 'https://esm.sh/prismjs@1.29.0/components/prism-bash?no-check&pin=v57'

export function Markdown(
  content: (() => string) | string,
) {
  const Rendered = memo(() => {
    const stringContent = typeof content === 'function' ? content() : content
    const markdownToHTML = render(stringContent, {
      allowMath: true,
      allowIframes: true,
    })
    return raw(markdownToHTML)
  })
  return (
    <Layout>
      <Rendered />
    </Layout>
  )
}
