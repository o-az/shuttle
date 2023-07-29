import { env } from '#/environment.ts'
import { Root } from '#/components/root.tsx'

import { raw } from 'https://deno.land/x/hono@v3.1.2/middleware.ts'
import { CSS as gfmCSS, KATEX_CSS } from 'https://deno.land/x/gfm@0.2.5/mod.ts'

export function Layout(props: { children?: unknown }) {
  return Root({
    head: /*html*/ `
    <style>
       footer a, footer p {
        text-decoration: none;
        color: #8e9e9e;
      }

      footer a {
        border-bottom: 1px solid #8e9e9e;
      }

      footer a::active {
        color: #fff;
      }

      footer a::visited {
        color: #fff;
      }

      footer em {
        color: #f7f7f7;
        padding: 0 0.5rem;
      }

      footer {
        width: 97.5%;
        height: 0.35rem;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        font-size: 0.7rem;
        bottom: 0;
        right: 0;
        position: fixed;
        padding: 10px;
      }

      section {
        padding: 12px;
        border-radius: 8px;
      }

      markdown-body {
        border-radius: 5px;
      }
      ${raw(gfmCSS)}
      ${raw(KATEX_CSS)}  
    </style>
    `,
    children: /*html*/ `
      <main>
        <section
          data-color-mode='auto'
          data-light-theme='light'
          data-dark-theme='dark'
          class='markdown-body'
        >
          ${props.children}
        </section>
      </main>
      <footer>
        <a href='/feedback'>
          feedback
        </a>
        <em>-</em>
        <p>${env['ENVIRONMENT']}</p>
      </footer>
    `,
  })
}
