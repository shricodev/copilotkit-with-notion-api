import { NotionTable } from '@/components/notion-table'
import { fetchNotionDB } from '@/lib/notion'
import { isErrorResponse } from '@/lib/utils'
import { TRow } from '@/types/notion'

export default async function Home() {
  const response = await fetchNotionDB()

  if (isErrorResponse(response)) {
    return (
      <div className='mt-10 text-center text-rose-500'>
        Failed to fetch data. Please try again later.
      </div>
    )
  }
  // @ts-expect-error properties field definitely exists in each row.
  const dbRows = response.results.map(row => row.properties) as TRow[]

  const formattedDBRows = dbRows.map(row => ({
    name: row.name.title?.[0]?.text.content || '',
    meet_link: row.meet_link?.url || '',
    dueDate: row.dueDate?.date || { start: '', end: '' },
  }))

  return (
    <div className='mt-8 flex justify-center'>
      <div className='w-full max-w-4xl'>
        <NotionTable tableData={formattedDBRows} />
      </div>
    </div>
  )
}
