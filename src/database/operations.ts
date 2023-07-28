import type { Row } from '#/types.ts'
import { database } from '#/database/index.ts'

import { ulid } from 'https://esm.sh/ulidx@2.1.0'

export async function getRecord(id: string) {
  const { rows: [row] } = await database.execute({
    sql: /* sql */ `SELECT * FROM json WHERE id = $id`,
    args: { id },
  })
  return row as Row | undefined
}

export async function getAllRecords() {
  const result = await database.execute(
    /* sql */ `SELECT * FROM json`,
  )
  console.log(result)
  return result.rows as unknown as Row[] | undefined
}

export async function insertNewRecord(json: string) {
  const id = ulid()
  const result = await database.execute({
    sql: /* sql */ `INSERT INTO json (id, json) VALUES ($id, $json)`,
    args: { id, json },
  })
  return { id, ...result }
}
