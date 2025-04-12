"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@/components/Table"
import { useState } from "react"

import * as React from "react"

import { DataTableBulkEditor } from "./DataTableBulkEditor"
import { Filterbar } from "./DataTableFilterbar"
import { DataTablePagination } from "./DataTablePagination"

import { ReportErrorDrawer } from "@/components/ui/ReportErrorDrawer" // Added import

import { BaseCallDrawer } from "@/components/ui/call-reports/BaseCallDrawer"; // Use the new BaseCallDrawer
import { CallReport } from "@/data/schema"; // Import the data type

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { cn } from "@/lib/utils"


interface DataTableProps<TData> {
  columns: ColumnDef<TData>[]
  data: TData[]
}

export function DataTable<TData>({ columns, data }: DataTableProps<TData>) {
  const pageSize = 20
  const [rowSelection, setRowSelection] = useState({})
  const [globalFilter, setGlobalFilter] = useState("")
  const [isReportErrorOpen, setIsReportErrorOpen] = useState(false) // Added state for drawer

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState<CallReport | undefined>(undefined);

  const table = useReactTable({
    data,
    columns,
    state: {
      rowSelection,
      globalFilter, // Add global filter state
    },
    onGlobalFilterChange: setGlobalFilter, // Add handler
    globalFilterFn: (row, _columnId, filterValue) => { // Mark columnId as unused
      const rowData = row.original as any; // Use 'as any' or a specific type if available
      const name = rowData?.name as string | undefined;
      const customerNumber = rowData?.customerNumber as string | undefined;

      const filterLower = filterValue.toLowerCase();

      const nameMatch = name?.toLowerCase().includes(filterLower) ?? false;
      const numberMatch = customerNumber?.toLowerCase().includes(filterLower) ?? false;

      return nameMatch || numberMatch;
    },
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: pageSize,
      },
    },
    enableRowSelection: true,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  return (
    <>
      {/* Drawer Components */}
      <BaseCallDrawer
        open={isDrawerOpen}
        onOpenChange={setIsDrawerOpen}
        datas={selectedRowData}
      />
      <ReportErrorDrawer open={isReportErrorOpen} onOpenChange={setIsReportErrorOpen} />


      <div className="space-y-3">
        <Filterbar table={table} globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} setIsReportErrorOpen={setIsReportErrorOpen} />
        <div className="relative overflow-hidden overflow-x-auto">
          <Table>
            <TableHead>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow
                  key={headerGroup.id}
                  className="border-y border-gray-200 dark:border-gray-800"
                >
                  {headerGroup.headers.map((header) => (
                    <TableHeaderCell
                      key={header.id}
                      className={cn(
                        "whitespace-nowrap px-4 py-2 text-sm font-medium text-gray-500 dark:text-gray-400", // Adjusted padding, font, color
                        header.column.columnDef.meta?.className,
                      )}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                    </TableHeaderCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"} // Keep existing data-state
                    onClick={() => { // Add this onClick handler
                      setSelectedRowData(row.original as CallReport);
                      setIsDrawerOpen(true);
                    }}
                    className="group select-none hover:bg-gray-100 hover:dark:bg-gray-800 relative cursor-pointer" // Adjusted light and dark hover bg
                  >
                    {row.getVisibleCells().map((cell, index) => (
                      <TableCell
                        key={cell.id}
                        className={cn(
                          row.getIsSelected()
                            ? "bg-gray-100 dark:bg-gray-700" // Further adjusted dark selected bg for contrast
                            : "",
                          "relative whitespace-nowrap px-4 py-2 text-sm text-gray-700 first:w-10 dark:text-gray-100", // Adjusted dark text color for better contrast
                          cell.column.columnDef.meta?.className,
                        )}
                      >
                        {index === 0 && row.getIsSelected() && (
                          /* Use original indigo for selected row accent */
                          <div className="absolute inset-y-0 left-0 w-0.5 bg-indigo-600 dark:bg-indigo-500" />
                        )}
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          <DataTableBulkEditor table={table} rowSelection={rowSelection} setIsReportErrorOpen={setIsReportErrorOpen} />
        </div>
        <DataTablePagination table={table} pageSize={pageSize} />
      </div>
    </>
  )
}
