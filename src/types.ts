export type Row = {
  id: string
  json: string
  createdAt: string
}

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type Pretty<T> =
  & {
    [K in keyof T]: T[K]
  }
  & {}
