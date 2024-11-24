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
import { updateNotionDBRowLink, updateNotionDBRowTitle } from '@/lib/actions'
import { TRowDetails } from '@/types/notion'
import { useCopilotAction, useCopilotReadable } from '@copilotkit/react-core'
import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'sonner'

interface NotionTableProps {
  initialTableData: TRowDetails[]
}

export const NotionTable = ({ initialTableData }: NotionTableProps) => {
  const [tableData, setTableData] = useState<TRowDetails[]>(initialTableData)

  useCopilotReadable({
    description:
      'All the rows in our notion database which holds the information for all the meetings I need to attend.',
    value: tableData,
  })

  useCopilotAction({
    name: 'updateRowName',
    description:
      'Update the title of the row (index starts from 0) in the notion database.',
    parameters: [
      {
        name: 'index',
        description: 'Index of the row to update.',
        required: true,
      },
      {
        name: 'newTitle',
        description: 'New title for the row.',
        required: true,
      },
    ],
    handler: async ({ index, newTitle }) => {
      const parsedIndex = parseInt(index, 10)
      if (isNaN(parsedIndex)) throw new Error('Invalid index')

      const { success } = await updateNotionDBRowTitle({
        tableRowId: tableData[parsedIndex].id,
        tableRowNewTitle: newTitle,
      })

      if (!success) return toast.error('Could not update the notion DB')

      toast.success('Successfully updated the notion DB')
      setTableData(prevData => {
        const updatedTableData = [...prevData]
        if (parsedIndex >= 0 && parsedIndex < updatedTableData.length) {
          updatedTableData[parsedIndex].name = newTitle
        }
        return updatedTableData
      })
    },
  })

  useCopilotAction({
    name: 'updateRowLink',
    description:
      'Update the link of the row (index starts from 0) in the notion database.',
    parameters: [
      {
        name: 'index',
        description: 'Index of the row to update.',
        required: true,
      },
      {
        name: 'newLink',
        description: 'New link to the row.',
        required: true,
      },
    ],
    handler: async ({ index, newLink }) => {
      const parsedIndex = parseInt(index, 10)
      if (isNaN(parsedIndex)) throw new Error('Invalid index')

      const { success } = await updateNotionDBRowLink({
        tableRowId: tableData[parsedIndex].id,
        tableRowNewLink: newLink,
      })

      if (!success) return toast.error('Could not update the notion DB')

      toast.success('Successfully updated the notion DB')
      setTableData(prevData => {
        const updatedTableData = [...prevData]
        if (parsedIndex >= 0 && parsedIndex < updatedTableData.length) {
          updatedTableData[parsedIndex].link = newLink
        }
        return updatedTableData
      })
    },
  })

  return (
    <Table className='rounded-sm shadow-sm'>
      <TableCaption className='py-4'>Notion Database</TableCaption>
      <TableHeader className='bg-zinc-100'>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Link</TableHead>
          <TableHead className='text-right'>Due Date</TableHead>
        </TableRow>
      </TableHeader>
      {initialTableData.length === 0 ? (
        <p className='text-center text-zinc-500'>No data found.</p>
      ) : (
        <TableBody>
          {tableData.map((dbRow, i) => (
            <TableRow key={`${dbRow.name}-${dbRow.id}-${i}`}>
              <TableCell className='font-medium'>
                {dbRow.name ? (
                  <span>{dbRow.name}</span>
                ) : (
                  <span className='text-zinc-500'>Unnamed</span>
                )}
              </TableCell>
              <TableCell>
                {dbRow.link ? (
                  <Link
                    href={dbRow.link}
                    aria-label={`Link for ${dbRow.name || 'Unnamed'}`}
                    target='_blank'
                    className='underline underline-offset-4'
                  >
                    {dbRow.link}
                  </Link>
                ) : (
                  <span className='text-zinc-500'>No Link</span>
                )}
              </TableCell>
              <TableCell className='text-right'>
                {dbRow.dueDate.start ? (
                  <span>{dbRow.dueDate.start}</span>
                ) : (
                  <span className='text-zinc-500'>No Due Date</span>
                )}
                {dbRow.dueDate.end ? ` - ${dbRow.dueDate.end}` : null}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      )}
    </Table>
  )
}
