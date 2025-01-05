import { db } from "@/lib/db"
import { unstable_cacheLife as cacheLife } from "next/cache"
import { PHASE_PRODUCTION_BUILD } from "next/dist/shared/lib/constants"

async function getFortunes() {
  // 'use cache' is required when dynamicIO is active, but benchmark rules do
  // not allow caching for this test; therefore, immediately expire the cache.
  'use cache'
  cacheLife({ revalidate: 1e-9 })

  // Prevent database queries during build phase.  (Note that dynamicIO prohibits
  // the use of `export const dynamic = "force-dynamic"`.)
  if (process.env.NEXT_PHASE === PHASE_PRODUCTION_BUILD) return []

  return await db.selectFrom("Fortune").selectAll().execute()
}

export default async function Page() {
  const fortunes = await getFortunes()
  fortunes.push({ id: 0, message: "Additional fortune added at request time." })
  fortunes.sort((a, b) => a.message.localeCompare(b.message))

  return <>
    <title>Fortunes</title>

    <table>
      <thead>
        <tr>
          <th>id</th>
          <th>message</th>
        </tr>
      </thead>
      <tbody>
        {fortunes.map(fortune =>
          <tr key={fortune.id}>
            <td>{fortune.id}</td>
            <td>{fortune.message}</td>
          </tr>
        )}
      </tbody>
    </table>
  </>
}
