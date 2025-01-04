import { db } from "@/lib/db"

export async function GET() {
  const id = 1 + Math.floor(Math.random() * 10000)
  const result = await db.selectFrom("World").where("id", "=", id).selectAll().executeTakeFirst()
  return Response.json(result)
}
