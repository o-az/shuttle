import * as esbuild from 'https://deno.land/x/esbuild@v0.18.17/mod.js'

import denoConfig from './deno.json' assert { type: 'json' }
import { removeFile } from '#/utilities.ts'

main()

async function main() {
  console.info('Building…')
  try {

    await removeFile('./dist', { recursive: true })

    await esbuild.build({
      entryPoints: ['./src/index.ts'],
      bundle: true,
      format: 'esm',
      outdir: './dist',
      target: 'deno1.35.3',
      tsconfigRaw: {
        compilerOptions: {
          ...denoConfig.compilerOptions,
          paths: { '#/*': ['./src/*'] },
        },
      },
    })

    await Deno.mkdir('./dist/components', { recursive: true })
    await Deno.copyFile('./src/components/landing.md', './dist/components/landing.md')

    console.info('Build successful!')
    Deno.exit(0)
  } catch (error) {
    console.error(error)
    Deno.exit(1)
  }
}
