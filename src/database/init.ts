import { database } from '#/database/index.ts'

/**
 * database for online json storage. User can store json and share it with others.
 */
const databaseSchema = /* sql */ `
CREATE TABLE IF NOT EXISTS json (
  id TEXT PRIMARY KEY,
  json TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
`

if (import.meta.main) {
  initDatabase()
}

function initDatabase() {
  database.execute(databaseSchema)
  database.execute('PRAGMA journal_mode = WAL;')
  database.execute('PRAGMA synchronous = NORMAL;')
  database.execute('PRAGMA temp_store = MEMORY;')
  database.execute('PRAGMA wal_autocheckpoint = 1000;')
  database.execute('PRAGMA foreign_keys = ON;')
  database.execute('PRAGMA busy_timeout = 1000;')
  database.close()
}
