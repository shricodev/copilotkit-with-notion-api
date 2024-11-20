import { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { TErrResponse } from '@/types/notion'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isErrorResponse(
  response: QueryDatabaseResponse | TErrResponse,
): response is TErrResponse {
  return (response as TErrResponse).success === false
}
