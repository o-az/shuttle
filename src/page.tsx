import { CSS, render } from 'https://deno.land/x/gfm@0.2.5/mod.ts'
import 'https://esm.sh/prismjs@1.29.0/components/prism-json?no-check&pin=v57'

export function Page(jsonString: string) {
  const json = JSON.parse(jsonString)
  const markdown = `
  \`\`\`json
  ${JSON.stringify(json, null, 4)}
  \`\`\`
  `
  const rendered = render(markdown, { 'disableHtmlSanitization': true })

  return /*html*/ `<!DOCTYPE html>
<html lang="en" class="dark">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta property="og:title" content="shuttle">
    <style>
      @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300&display=swap');
      * { font-family: 'IBM Plex Mono' !important; font-size: 16px; }
      body {
        background-color: #1d1f28;
      }
      main {
        background-color: #f9f9f9;
        max-width: 800px;
        margin: 0 auto;
      }
      ${CSS}
    </style>
  </head>
  <body>
    <main data-color-mode="light" data-light-theme="light" data-dark-theme="dark" class="markdown-body">
      ${rendered}
    </main>
  </body>
</html>
`
}
