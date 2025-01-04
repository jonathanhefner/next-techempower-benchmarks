import { Kysely, PostgresDialect } from "kysely"
import { Pool } from "pg"
import { Database } from "./schema.js"

export const db = new Kysely<Database>({
  dialect: new PostgresDialect({
    pool: new Pool({ connectionString: process.env.DATABASE_URL }),
  }),
})
