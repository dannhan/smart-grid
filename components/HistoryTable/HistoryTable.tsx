"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/shadcn/table";

import type { RepairHistory } from "@/lib/schema";

interface HistoryTableProps {
  columns: ColumnDef<RepairHistory>[];
  data: RepairHistory[];
}

const HistoryTable = ({ columns, data }: HistoryTableProps) => {
  // TODO: ssr?
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  // TODO: fix the inconsistent width of this element
  return (
    <Table className="border-collapse text-xs">
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <TableHead
                  key={header.id}
                  className="border-2 border-primary bg-secondary py-2 text-center text-secondary-foreground"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </TableHead>
              );
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && "selected"}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell
                  key={cell.id}
                  className={cn(
                    "border-2 border-primary text-center",
                    cell.column.id === "date" && "min-w-[94px]",
                    // cell.column.id === "name" && "min-w-24",
                    // cell.column.id === "action_type" && "min-w-[100px]",
                    // TODO: reduce the width of description column
                    cell.column.id === "description" && "min-w-[80px]",
                    cell.column.id === "technical-specification" &&
                      "min-w-[80px]",
                    cell.column.id === "image" && "min-w-[90px]",
                  )}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className="h-24 text-center">
              No results.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default HistoryTable;
