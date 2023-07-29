import { raw } from 'https://deno.land/x/hono@v3.1.2/middleware.ts'

export function Root(props: { children?: unknown; head?: unknown }) {
  return raw(
    /*html*/ `<!DOCTYPE html>
<html lang='en'>
  <head>
    <meta charset='UTF-8' />
    <meta name='viewport' content='width=device-width, initial-scale=1.0' />
    <title>shuttle</title>
    ${props.head || ''}
        <style>
    ${
      raw(/*css*/ `
      @import url("https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400&display=swap");

      * { font-family: "IBM Plex Mono" !important; scrollbar-width: thin; }

      html, body { height: 100%; min-height: 100%; }

      body {
        background-color: #1d1f28;
        padding: 12px;
      }

      main {
        max-width: 850px;
        margin: 0 auto;
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
    </style>
    <meta property='og:title' content='shuttle' />
    <link
      rel='icon'
      href='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🚌</text></svg>'
    />
  </head>
  <body>
      ${props.children}
  </body>
</html>
  `,
  )
}
