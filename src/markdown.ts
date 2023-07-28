import { render } from 'https://deno.land/x/gfm@0.2.5/mod.ts'

export function stringToHTML(str: string) {
  const markdownToHTML = render(str, {
    allowMath: true,
    allowIframes: true,
    disableHtmlSanitization: false,
  })
  return markdownToHTML
}
