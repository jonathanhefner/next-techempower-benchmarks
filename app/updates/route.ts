import { db } from "@/lib/db"
import { World } from "@/lib/schema"
import { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  const queriesParam = request.nextUrl.searchParams.get("queries")
  const queriesCount = Math.min(Math.max(Number(queriesParam) || 1, 1), 500)

  const ids = new Set<number>()
  while (ids.size < queriesCount) {
    ids.add(1 + Math.floor(Math.random() * 10000))
  }

  const promises = new Array<Promise<World | undefined>>()
  for (const id of ids) {
    promises.push(db.selectFrom("World").where("id", "=", id).selectAll().executeTakeFirst())
  }

  const results = await Promise.all(promises) as World[]
  for (const result of results) {
    result.randomNumber = 1 + Math.floor(Math.random() * 10000)
  }

  await db.insertInto("World").values(results).onConflict(oc =>
    oc.column("id").doUpdateSet({ randomNumber: eb => eb.ref("excluded.randomNumber") })
  ).execute()

  return Response.json(results)
}
