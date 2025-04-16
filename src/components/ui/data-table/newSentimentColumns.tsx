"use client"

import { ColumnDef, createColumnHelper } from "@tanstack/react-table"
import { ChevronDown, ChevronRight, MoreHorizontal } from "lucide-react"

import { SentimentReport } from "@/data/schema"
import { Button } from "@/components/Button"
import { Checkbox } from "@/components/Checkbox"
import { DataTableColumnHeader } from "./DataTableColumnHeader"
import { cx } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/Dropdown"

const columnHelper = createColumnHelper<SentimentReport>()

const colorMap = {
  "Olumlu": "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200",
  "Olumsuz": "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200",
  "Nötr": "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200",
  
  "Positive": "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200",
  "Negative": "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200",
  "Neutral": "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200",
  
  "Kritik": "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200",
  "Yüksek": "bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300",
  "Orta": "bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200",
  "Düşük": "bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300",
}

export const newSentimentColumns: ColumnDef<SentimentReport>[] = [
  columnHelper.display({
    id: "expand",
    header: () => null,
    cell: ({ row }) => {
      return (
        <Button
          variant="ghost"
          onClick={(e) => {
            e.stopPropagation()
            row.toggleExpanded()
          }}
          className="h-6 w-6 p-0"
        >
          {row.getIsExpanded() ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </Button>
      )
    },
    enableSorting: false,
    enableHiding: false,
  }),
  
  columnHelper.display({
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected()
            ? true
            : table.getIsSomeRowsSelected()
              ? "indeterminate"
              : false
        }
        onCheckedChange={() => table.toggleAllPageRowsSelected()}
        className="translate-y-0.5"
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={() => row.toggleSelected()}
        className="translate-y-0.5"
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
    meta: {
      displayName: "Select",
    },
  }),
  
  columnHelper.accessor("id", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ getValue }) => <div className="font-medium">{getValue()}</div>,
    enableSorting: true,
    enableHiding: false,
    meta: {
      className: "text-left",
      displayName: "ID",
    },
  }),
  
  columnHelper.accessor("duygular", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Duygular" />
    ),
    cell: ({ row }) => {
      const duygular = row.getValue("duygular") as SentimentReport["duygular"]
      const text = duygular.text
      const colorClass = colorMap[text] || ""
      
      return (
        <div className={cx("px-2 py-1 rounded-md inline-block", colorClass)}>
          {text}
        </div>
      )
    },
    enableSorting: true,
    enableHiding: true,
    meta: {
      displayName: "Duygular",
    },
  }),
  
  columnHelper.accessor("memnuniyet", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Memnuniyet" />
    ),
    cell: ({ getValue }) => {
      const value = getValue() as string
      const colorClass = colorMap[value] || ""
      
      return (
        <div className={cx("px-2 py-1 rounded-md inline-block", colorClass)}>
          {value}
        </div>
      )
    },
    enableSorting: true,
    enableHiding: true,
    meta: {
      displayName: "Memnuniyet",
    },
  }),
  
  columnHelper.accessor("musteriMemnuniyeti", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Müşteri Memnuniyeti" />
    ),
    cell: ({ row }) => {
      const musteriMemnuniyeti = row.getValue("musteriMemnuniyeti") as SentimentReport["musteriMemnuniyeti"]
      const text = musteriMemnuniyeti.text
      const colorClass = colorMap[text] || ""
      
      return (
        <div className={cx("px-2 py-1 rounded-md inline-block", colorClass)}>
          {text}
        </div>
      )
    },
    enableSorting: true,
    enableHiding: true,
    meta: {
      displayName: "Müşteri Memnuniyeti",
    },
  }),
  
  columnHelper.accessor("oncelik", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Öncelik" />
    ),
    cell: ({ getValue }) => {
      const value = getValue() as string
      const colorClass = colorMap[value] || ""
      
      return (
        <div className={cx("px-2 py-1 rounded-md inline-block", colorClass)}>
          {value}
        </div>
      )
    },
    enableSorting: true,
    enableHiding: true,
    meta: {
      displayName: "Öncelik",
    },
  }),
  
  columnHelper.accessor("istek", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="İstek" />
    ),
    cell: ({ getValue }) => <div>{getValue()}</div>,
    enableSorting: true,
    enableHiding: true,
    meta: {
      displayName: "İstek",
    },
  }),
  
  columnHelper.display({
    id: "actions",
    cell: ({ row }) => {
      const report = row.original

      return (
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className="h-8 w-8 p-0"
                onClick={(e) => e.stopPropagation()}
              >
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation()
                  navigator.clipboard.writeText(report.id)
                }}
              >
                Copy Report ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={(e) => e.stopPropagation()}>View details</DropdownMenuItem>
              <DropdownMenuItem onClick={(e) => e.stopPropagation()}>Edit report</DropdownMenuItem>
              <DropdownMenuItem onClick={(e) => e.stopPropagation()}>Export data</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
    enableSorting: false,
    enableHiding: false,
    meta: {
      displayName: "Actions",
    },
  }),
]
