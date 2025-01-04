import { db } from "@/lib/db"
import { World } from "@/lib/schema"
import { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  const queriesParam = request.nextUrl.searchParams.get("queries")
  const queriesCount = Math.min(Math.max(Number(queriesParam) || 1, 1), 500)
  const promises = Array<Promise<World | undefined>>(queriesCount)

  for (let i = 0; i < queriesCount; i += 1) {
    const id = 1 + Math.floor(Math.random() * 10000)
    promises[i] = db.selectFrom("World").where("id", "=", id).selectAll().executeTakeFirst()
  }

  return Response.json(await Promise.all(promises))
}
