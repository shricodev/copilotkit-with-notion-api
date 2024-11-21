import { NotionTable } from '@/components/notion-table'
import { fetchNotionDB } from '@/lib/notion'
import { isErrorResponse } from '@/lib/utils'
import { TRow } from '@/types/notion'

export default async function Home() {
  const response = await fetchNotionDB()
  console.log('response', response)

  if (isErrorResponse(response)) {
    return (
      <div className='mt-10 text-center text-rose-500'>
        Failed to fetch data. Please try again later.
      </div>
    )
  }
  const dbRows = response.results.map(row => ({
    id: row.id,
    // @ts-expect-error properties field definitely exists in each row.
    properties: row.properties,
  })) as TRow[]

  const formattedDBRows = dbRows.map(row => ({
    id: row.id,
    name: row.properties.name.title?.[0]?.text.content || '',
    meet_link: row.properties.meet_link?.url || '',
    dueDate: row.properties.dueDate?.date || { start: '', end: '' },
  }))

  console.log('this is formattedrows', formattedDBRows)

  return (
    <div className='mt-8 flex justify-center'>
      <div className='w-full max-w-4xl'>
        <NotionTable initialTableData={formattedDBRows} />
      </div>
    </div>
  )
}
