/** @jsx jsx */
import { Root } from '#/components/root.tsx'

import { jsx, memo } from 'https://deno.land/x/hono@v3.1.2/middleware.ts'

export const Feedback = memo(() => (
  <Root>
    <main>
      <h4>
        Share any feedback or feature requests
      </h4>
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
          crossOrigin='anonymous'
          async
        >
        </script>
      </section>
    </main>
  </Root>
))
