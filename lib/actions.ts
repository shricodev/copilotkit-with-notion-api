'use server'

import {
  NOTION_DB_PROPERTY_LINK,
  NOTION_DB_PROPERTY_NAME,
} from '@/lib/constants'
import { env } from '@/lib/env'
import { TResponse } from '@/types/notion'
import { Client } from '@notionhq/client'
import { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints'

const notion = new Client({
  auth: env.NOTION_SECRET_API_KEY,
})

export const fetchNotionDB = async (): Promise<
  QueryDatabaseResponse | TResponse
> => {
  try {
    const dbQuery = await notion.databases.query({
      database_id: env.NOTION_DB_ID,
    })

    return dbQuery
  } catch (error) {
    return {
      success: false,
      error: error as Error,
    } as TResponse
  }
}

export const updateNotionDBRowTitle = async ({
  tableRowId,
  tableRowNewTitle,
}: {
  tableRowId: string
  tableRowNewTitle: string
}): Promise<TResponse> => {
  try {
    await notion.pages.update({
      page_id: tableRowId,
      properties: {
        [NOTION_DB_PROPERTY_NAME]: {
          title: [{ text: { content: tableRowNewTitle } }],
        },
      },
    })
    return { success: true, error: null } as TResponse
  } catch (error) {
    return { success: false, error: error as Error } as TResponse
  }
}

export const updateNotionDBRowLink = async ({
  tableRowId,
  tableRowNewLink,
}: {
  tableRowId: string
  tableRowNewLink: string
}): Promise<TResponse> => {
  try {
    await notion.pages.update({
      page_id: tableRowId,
      properties: {
        [NOTION_DB_PROPERTY_LINK]: {
          url: tableRowNewLink,
        },
      },
    })
    return { success: true, error: null } as TResponse
  } catch (error) {
    return { success: false, error: error as Error } as TResponse
  }
}
