'use server'

import { Client } from '@notionhq/client'
import { env } from '@/lib/env'
import { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints'
import { TErrResponse } from '@/types/notion'

const notion = new Client({
  auth: env.NOTION_SECRET_API_KEY,
})

export const fetchNotionDB = async (): Promise<
  QueryDatabaseResponse | TErrResponse
> => {
  try {
    const dbQuery = await notion.databases.query({
      database_id: env.NOTION_DB_ID,
    })

    return dbQuery
  } catch {
    console.error('DEBUG: Error in the function: `fetchNotionDB`')
    return {
      success: false,
      error: new Error('Error fetching Notion DB'),
    } as TErrResponse
  }
}

export const updateNotionDBRowTitle = async ({
  tableRowId,
  tableRowNewTitle,
}: {
  tableRowId: string
  tableRowNewTitle: string
}): Promise<{ success: boolean }> => {
  try {
    await notion.pages.update({
      page_id: tableRowId,
      properties: {
        name: {
          title: [{ text: { content: tableRowNewTitle } }],
        },
      },
    })
    return { success: true }
  } catch {
    return { success: false }
  }
}

export const updateNotionDBRowLink = async ({
  tableRowId,
  tableRowNewLink,
}: {
  tableRowId: string
  tableRowNewLink: string
}): Promise<{ success: boolean }> => {
  try {
    await notion.pages.update({
      page_id: tableRowId,
      properties: {
        meet_link: {
          url: tableRowNewLink,
        },
      },
    })
    return { success: true }
  } catch {
    return { success: false }
  }
}
