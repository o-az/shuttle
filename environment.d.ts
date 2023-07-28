interface ImportMetaEnv {
  readonly ENVIRONMENT: 'development' | 'production' | 'test'
  readonly DATABASE_URL: string
  readonly DATABASE_TOKEN: string
  readonly TURSO_AUTH_TOKEN: string
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
