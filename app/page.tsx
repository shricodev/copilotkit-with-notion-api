import { NotionTable } from '@/components/notion-table'
import { fetchNotionDB } from '@/lib/actions'
import {
  NOTION_DB_PROPERTY_DUE_DATE,
  NOTION_DB_PROPERTY_LINK,
  NOTION_DB_PROPERTY_NAME,
} from '@/lib/constants'
import { isErrorResponse } from '@/lib/utils'
import { TRow, TRowDetails } from '@/types/notion'

export default async function Home() {
  const response = await fetchNotionDB()

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
    properties: row.properties || {},
  })) as TRow[]

  const formattedDBRows: TRowDetails[] = dbRows.map(({ id, properties }) => {
    const name =
      properties?.[NOTION_DB_PROPERTY_NAME]?.title?.[0]?.text?.content || ''
    const link = properties?.[NOTION_DB_PROPERTY_LINK]?.url || ''
    const dueDate = properties?.[NOTION_DB_PROPERTY_DUE_DATE]?.date || {
      start: '',
      end: '',
    }

    return {
      id,
      [NOTION_DB_PROPERTY_NAME]: name,
      [NOTION_DB_PROPERTY_LINK]: link,
      [NOTION_DB_PROPERTY_DUE_DATE]: dueDate,
    }
  })

  return (
    <div className='mt-8 flex justify-center'>
      <div className='w-full max-w-4xl'>
        <NotionTable initialTableData={formattedDBRows} />
      </div>
    </div>
  )
}
