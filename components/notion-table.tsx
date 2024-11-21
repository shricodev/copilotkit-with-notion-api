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
import { useCopilotAction, useCopilotReadable } from '@copilotkit/react-core'
import { useState } from 'react'
import { updateNotionDBRowLink, updateNotionDBRowTitle } from '@/lib/notion'
import { toast } from 'sonner'
import { TRowDetails } from '@/types/notion'

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
          updatedTableData[parsedIndex].meet_link = newLink
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
          <TableHead>Meet Link</TableHead>
          <TableHead className='text-right'>Due Date</TableHead>
        </TableRow>
      </TableHeader>
      {initialTableData.length === 0 ? (
        <p className='text-center text-zinc-500'>No data found.</p>
      ) : (
        <TableBody>
          {tableData.map((dbRow, i) => (
            <TableRow key={`${dbRow.name}-${dbRow.id}-${i}`}>
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
