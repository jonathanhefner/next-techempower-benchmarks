import { db } from "@/lib/db"
import { World } from "@/lib/schema"
import { NextRequest } from "next/server"

async function getWorld(id: number) {
  'use cache'
  return await db.selectFrom("CachedWorld").where("id", "=", id).selectAll().executeTakeFirst()
}

export async function GET(request: NextRequest) {
  const queriesParam = request.nextUrl.searchParams.get("queries")
  const queriesCount = Math.min(Math.max(Number(queriesParam) || 1, 1), 500)
  const results = Array<World | undefined>(queriesCount)

  for (let i = 0; i < queriesCount; i += 1) {
    const id = 1 + Math.floor(Math.random() * 10000)
    results[i] = await getWorld(id)
  }

  return Response.json(results)
}
