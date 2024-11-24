import {
  NOTION_DB_PROPERTY_DUE_DATE,
  NOTION_DB_PROPERTY_LINK,
  NOTION_DB_PROPERTY_NAME,
} from '@/lib/constants'

export type TResponse = {
  success: boolean
  error: Error | null
}

export type TRow = {
  id: string
  properties: {
    [NOTION_DB_PROPERTY_NAME]: {
      id: string
      title: { text: { content: string } }[]
    }
    [NOTION_DB_PROPERTY_LINK]: { id: string; url: string }
    [NOTION_DB_PROPERTY_DUE_DATE]: {
      id: string
      type: 'date'
      date?: { start: string; end: string }
    }
  }
}

export type TRowDetails = {
  id: string
  [NOTION_DB_PROPERTY_NAME]: string
  [NOTION_DB_PROPERTY_LINK]: string
  [NOTION_DB_PROPERTY_DUE_DATE]: {
    start: string
    end: string
  }
}
