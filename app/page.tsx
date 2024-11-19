import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchNotionDB } from "@/lib/notion";
import { isErrorResponse } from "@/lib/utils";
import { TRow } from "@/types/notion";
import Link from "next/link";

export default async function Home() {
  const response = await fetchNotionDB();

  if (isErrorResponse(response)) {
    return (
      <div className="text-center mt-10 text-rose-500">
        Failed to fetch data. Please try again later.
      </div>
    );
  }
  // @ts-expect-error properties field definitely exists in each row.
  const dbRows = response.results.map((row) => row.properties as TRow);

  const formattedDBRows = dbRows.map((row) => ({
    name: row.name.title?.[0]?.text.content || "",
    meet_link: row.meet_link?.url || "",
    dueDate: row.dueDate?.date || { start: "", end: "" },
  }));

  return (
    <div className="flex justify-center mt-8">
      <div className="max-w-4xl w-full">
        <Table className="rounded-sm shadow-sm">
          <TableCaption className="py-4">Notion Database</TableCaption>
          <TableHeader className="bg-zinc-100">
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Meet Link</TableHead>
              <TableHead className="text-right">Due Date</TableHead>
            </TableRow>
          </TableHeader>
          {formattedDBRows.length === 0 ? (
            <p className="text-center text-zinc-500">No data found.</p>
          ) : (
            <TableBody>
              {formattedDBRows.map((dbRow, i) => (
                <TableRow key={`${dbRow.name}-${i}`}>
                  <TableCell className="font-medium">{dbRow.name}</TableCell>
                  <TableCell>
                    {dbRow.meet_link ? (
                      <Link
                        href={dbRow.meet_link}
                        aria-label={`Meet link for ${dbRow.name}`}
                        target="_blank"
                        className="underline underline-offset-4"
                      >
                        {dbRow.meet_link}
                      </Link>
                    ) : (
                      <span className="text-gray-500">No Link</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    {dbRow.dueDate.start && `${dbRow.dueDate.start}`}
                    {dbRow.dueDate.end && ` - ${dbRow.dueDate.end}`}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </div>
    </div>
  );
}
