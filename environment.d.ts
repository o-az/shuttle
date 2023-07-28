interface ImportMetaEnv {
  readonly ENVIRONMENT: 'development' | 'production' | 'test'
  readonly DATABASE_URL: string
  readonly DATABASE_TOKEN: string
  readonly BASE_URL: string
  readonly PORT?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare namespace Deno {
  interface Env {
    toObject(): ImportMetaEnv
    get(key: keyof ImportMetaEnv): ImportMetaEnv[keyof ImportMetaEnv]
  }
}
