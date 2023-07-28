import * as base64 from 'https://deno.land/std@0.196.0/encoding/base64.ts'

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
