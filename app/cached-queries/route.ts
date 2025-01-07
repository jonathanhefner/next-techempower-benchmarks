import { db } from "@/lib/db"
import { World } from "@/lib/schema"
import { unstable_cache } from "next/cache"
import { NextRequest } from "next/server"

const findWorld = unstable_cache(async (id: number) =>
  await db.selectFrom("CachedWorld").where("id", "=", id).selectAll().executeTakeFirst()
)

export async function GET(request: NextRequest) {
  const queriesParam = request.nextUrl.searchParams.get("queries")
  const queriesCount = Math.min(Math.max(Number(queriesParam) || 1, 1), 500)
  const results = Array<World | undefined>(queriesCount)

  for (let i = 0; i < queriesCount; i += 1) {
    const id = 1 + Math.floor(Math.random() * 10000)
    results[i] = await findWorld(id)
  }

  return Response.json(results)
}
