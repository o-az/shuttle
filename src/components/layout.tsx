import { env } from '#/environment.ts'

import { raw } from 'https://deno.land/x/hono@v3.1.2/middleware.ts'
import { CSS as gfmCSS, KATEX_CSS } from 'https://deno.land/x/gfm@0.2.5/mod.ts'

export function Layout(props: { children?: unknown }) {
  return raw(
    /*html*/ `<!DOCTYPE html>
<html lang='en'>
  <head>
    <meta charset='UTF-8' />
    <meta name='viewport' content='width=device-width, initial-scale=1.0' />
    <title>shuttle</title>
    <style>
    ${
      raw(/*css*/ `
      @import url("https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400&display=swap");

      * {
        font-family: "IBM Plex Mono" !important;
        scrollbar-width: thin;
      }

      body {
        background-color: #1d1f28;
        padding: 12px;
      }

      main {
        max-width: 850px;
        margin: 0 auto;
      }

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

      @-moz-document url-prefix() {
        * {
          scrollbar-width: none;
        }
      }

      ::-webkit-scrollbar {
        width: 0.5rem;
        height: 0.5rem;
      }

      ::-webkit-scrollbar-thumb {
        background-color: rgba(0, 0, 0, 0.3);
        border: 5px solid transparent;
        border-radius: 1rem;
      }

      ::-webkit-scrollbar-track {
        position: absolute;
        right: -3rem;
        top: -50rem;
        background: transparent;
      }`)
    }
    ${raw(gfmCSS)}
    ${raw(KATEX_CSS)}  
    </style>
    <meta property='og:title' content='shuttle' />
    <link
      rel='icon'
      href='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🚌</text></svg>'
    />
  </head>
  <body>
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
      <a href='https://github.com/o-az/shuttle/issues/8' target='_blank' rel='noopener noreferrer'>
        feedback
      </a>
      <em>-</em>
      <p>${env['ENVIRONMENT']}</p>
    </footer>
  </body>
</html>
  `,
  )
}
