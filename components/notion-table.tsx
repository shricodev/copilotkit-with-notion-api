'use client'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import Link from 'next/link'
import { useCopilotReadable } from '@copilotkit/react-core'

interface NotionTableProps {
  tableData: {
    name: string
    meet_link: string
    dueDate: {
      start: string
      end: string
    }
  }[]
}

export const NotionTable = ({ tableData }: NotionTableProps) => {
  useCopilotReadable({
    description:
      'All the rows in our notion database which holds the information for all the meetings I need to attend.',
    value: tableData,
  })

  return (
    <Table className='rounded-sm shadow-sm'>
      <TableCaption className='py-4'>Notion Database</TableCaption>
      <TableHeader className='bg-zinc-100'>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Meet Link</TableHead>
          <TableHead className='text-right'>Due Date</TableHead>
        </TableRow>
      </TableHeader>
      {tableData.length === 0 ? (
        <p className='text-center text-zinc-500'>No data found.</p>
      ) : (
        <TableBody>
          {tableData.map((dbRow, i) => (
            <TableRow key={`${dbRow.name}-${i}`}>
              <TableCell className='font-medium'>{dbRow.name}</TableCell>
              <TableCell>
                {dbRow.meet_link ? (
                  <Link
                    href={dbRow.meet_link}
                    aria-label={`Meet link for ${dbRow.name}`}
                    target='_blank'
                    className='underline underline-offset-4'
                  >
                    {dbRow.meet_link}
                  </Link>
                ) : (
                  <span className='text-gray-500'>No Link</span>
                )}
              </TableCell>
              <TableCell className='text-right'>
                {dbRow.dueDate.start && `${dbRow.dueDate.start}`}
                {dbRow.dueDate.end && ` - ${dbRow.dueDate.end}`}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      )}
    </Table>
  )
}
