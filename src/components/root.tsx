/** @jsx jsx */
import { styleSheet } from '#/style.css.ts'

import { jsx, type JSXNode, raw } from 'https://deno.land/x/hono@v3.1.2/middleware.ts'

export function Root(props: { children?: JSXNode; head?: JSXNode }) {
  return (
    <html lang='en'>
      <head>
        <meta charset='UTF-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <title>shuttle</title>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossorigin='anonymous' />
        <link
          rel='stylesheet'
          type='text/css'
          href='https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,300;0,700;1,300&display=swap'
        />
        {raw(props.head || '')}
        <style>{raw(styleSheet)}</style>
        <meta property='og:title' content='shuttle' />
        <link
          rel='icon'
          href='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🚌</text></svg>'
        />
      </head>
      <body>
        {raw(props.children)}
      </body>
    </html>
  )
}
