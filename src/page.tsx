/** @jsx jsx */
/** @jsxFrag  Fragment */
import { jsx, memo, raw } from 'https://deno.land/x/hono@v3.1.2/middleware.ts'

import { CSS as gfmCSS, KATEX_CSS, render } from 'https://deno.land/x/gfm@0.2.5/mod.ts'
import 'https://esm.sh/prismjs@1.29.0/components/prism-json?no-check&pin=v57'
import 'https://esm.sh/prismjs@1.29.0/components/prism-diff?no-check&pin=v57'
import 'https://esm.sh/prismjs@1.29.0/components/prism-bash?no-check&pin=v57'

const customCSS = /*css*/ `
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400&display=swap');
* { font-family: 'IBM Plex Mono' !important; }
body { background-color: #1d1f28; padding: 12px; }
main { max-width: 850px; margin: 0 auto; }
section { padding: 14px; border-radius: 5px; }
`

function Page(props: { children?: unknown }) {
  return (
    <html lang='en'>
      <head>
        <meta charset='UTF-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <meta property='og:title' content='shuttle' />
        <title>shuttle</title>
        <style>
          {raw(customCSS)}
          {raw(gfmCSS)}
          {raw(KATEX_CSS)}
        </style>
        <link
          rel='icon'
          href={`data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🚌</text></svg>`}
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
            {props.children}
          </section>
        </main>
      </body>
    </html>
  )
}

function stringToHTML(str: string) {
  const markdownToHTML = render(str, {
    allowMath: true,
    allowIframes: true,
    disableHtmlSanitization: false,
  })
  return markdownToHTML
}

export function RenderJSON(content: string) {
  const Rendered = memo(() =>
    raw(
      stringToHTML(`\`\`\`json\n${JSON.stringify(JSON.parse(content), null, 2)}\n\`\`\``),
    )
  )
  return (
    <Page>
      <Rendered />
    </Page>
  )
}

export function Landing() {
  const Rendered = memo(() => raw(stringToHTML(`
  ## **Markdown render**

  *\`GET /:id\`* # gets record and renders markdown. Example:

  [\`https://shuttle.deno.dev/01H6D5KXV3FNDW7CQAABS27W86\`](https://shuttle.deno.dev/01H6D5KXV3FNDW7CQAABS27W86)

  ## **JSON API**

  *\`GET /api/:id\`* # gets record. Example:

  [\`https://shuttle.deno.dev/api/01H6D5KXV3FNDW7CQAABS27W86\`](http://shuttle.deno.dev/api/01H6D5KXV3FNDW7CQAABS27W86)

  *\`POST /api/new\`* # creates new record with JSON body. Example:

  \`\`\`sh
  curl -X POST http://shuttle.deno.dev/api/new -d '{"hello":"world"}'
  # returns new record id
  \`\`\`

  *\`GET /api/new/:encoded-content\`* # creates new record with base64 encoded content. Example:

  [\`https://shuttle.deno.dev/api/new/eyJmb28iOiJiYXIifQ==\`](https://shuttle.deno.dev/api/new/eyJmb28iOiJiYXIifQ==)

  \`\`\`sh
  curl -X GET "https://shuttle.deno.dev/api/new/$(echo '{"foo":"bar"}' | base64)"
  # returns new record id
  `)))
  return (
    <Page>
      <Rendered />
    </Page>
  )
}
