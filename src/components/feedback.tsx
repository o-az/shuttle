/** @jsx jsx */
import { Root } from '#/components/root.tsx'

import { jsx } from 'https://deno.land/x/hono@v3.1.2/middleware.ts'

export function Feedback() {
  return (
    <Root>
      <main style='text-align: center;'>
        <h4 style='color: rgb(228, 228, 231);'>Share any feedback or feature requests</h4>
        <section>
          <script
            src='https://giscus.app/client.js'
            data-repo='o-az/shuttle'
            data-repo-id='R_kgDOKAoQVQ'
            data-mapping='number'
            data-term='9'
            data-reactions-enabled='1'
            data-emit-metadata='0'
            data-input-position='bottom'
            data-lang='en'
            data-strict='0'
            data-theme='preferred_color_scheme'
            data-loading='lazy'
            crossorigin='anonymous'
            async
          >
          </script>
        </section>
      </main>
    </Root>
  )
}
