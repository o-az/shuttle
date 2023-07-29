import * as base64 from 'https://deno.land/std@0.196.0/encoding/base64.ts'

export const MILLISECOND = 1
export const SECOND = 1_000 * MILLISECOND
export const MINUTE = 60 * SECOND
export const HOUR = 60 * MINUTE
export const DAY = 24 * HOUR
export const milliseconds = (n: number) => n * MILLISECOND
export const seconds = (n: number) => n * SECOND
export const minutes = (n: number) => n * MINUTE
export const hours = (n: number) => n * HOUR

export function stringToBase64(str: string): string {
  return base64.encode(str)
}

export function base64ToString(base64Str: string): string {
  const decoded = base64.decode(base64Str)
  return new TextDecoder().decode(decoded)
}

export function payloadSize(payload: string): number {
  return new TextEncoder().encode(payload).length
}

export function decodeBufferFile(arrayBuffer: ArrayBuffer): string {
  const decoder = new TextDecoder()
  const decoded = decoder.decode(arrayBuffer).split('\n').slice(4, -2).join('\n')
  return decoded
}
