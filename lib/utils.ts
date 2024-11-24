import { TResponse } from '@/types/notion'
import { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isErrorResponse(
  data: QueryDatabaseResponse | TResponse,
): data is TResponse {
  if (
    typeof data === 'object' &&
    data !== null &&
    'success' in data &&
    typeof (data as TResponse).success === 'boolean'
  ) {
    return (data as TResponse).success === false
  }
  return false
}
