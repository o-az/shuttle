/** @jsx jsx */
import { env } from '#/environment.ts'
import { Root } from '#/components/root.tsx'

import { jsx, type JSXNode, raw } from 'https://deno.land/x/hono@v3.1.2/middleware.ts'
import { CSS as GFM_CSS, KATEX_CSS } from 'https://deno.land/x/gfm@0.2.5/style.js'

const Footer = () => (
  <footer>
    <a href='/feedback'>
      feedback
    </a>
    <em>-</em>
    <p>{env['ENVIRONMENT']}</p>
  </footer>
)

export function Layout(props: { children?: JSXNode }) {
  return (
    <Root
      {...{
        head: (
          <style>
            {raw(GFM_CSS)}
            {raw(KATEX_CSS)}
          </style>
        ),
      }}
    >
      <main>
        <section
          data-color-mode='auto'
          data-light-theme='light'
          data-dark-theme='dark'
          class='markdown-body'
        >
          {raw(props.children)}
        </section>
      </main>
      <Footer />
    </Root>
  )
}
