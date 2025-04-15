"use client"

import React from "react"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"

import { Button } from "@/components/Button" // Assuming Button is directly under components
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/Dropdown" // Assuming Dropdown is directly under components
import { DataTableColumnHeader } from "./DataTableColumnHeader"
import { SentimentReport } from "@/data/schema" // Correct path alias

const renderIconText = (icon: string, text: string) => (
  <div className="flex items-center">
    <span className="mr-2">{icon}</span>
    {text}
  </div>
)

const headerStyle = "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200";

export const sentimentColumns: ColumnDef<SentimentReport>[] = [
  {
    accessorKey: "isim",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="İsim" />
    ),
    cell: ({ row }) => <div>{row.getValue("isim")}</div>,
    enableSorting: true,
    enableHiding: true,
    meta: {
      className: headerStyle, // Apply header style
      displayName: "İsim",
    },
  },
  {
    accessorKey: "numara",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Numara" />
    ),
    cell: ({ row }) => <div>{row.getValue("numara")}</div>,
    enableSorting: true,
    enableHiding: true,
    meta: {
      className: headerStyle, // Apply header style
      displayName: "Numara",
    },
  },
  {
    accessorKey: "tarihSaat",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tarih Saat" />
    ),
    cell: ({ row }) => <div>{row.getValue("tarihSaat")}</div>,
    enableSorting: true,
    enableHiding: true,
    meta: {
      className: headerStyle, // Apply header style
      displayName: "Tarih Saat",
    },
  },
  {
    accessorKey: "duygular",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Duygular" />
    ),
    cell: ({ row }) => {
      const { text } = row.getValue("duygular") as SentimentReport["duygular"] // Removed unused icon
      let iconToShow = "❓"; // Default icon
      if (text === "Olumlu") iconToShow = "✓";
      if (text === "Olumsuz") iconToShow = "✕"; // Using '✕' (multiplication sign) for 'x'
      if (text === "Nötr") iconToShow = "-";
      return renderIconText(iconToShow, text)
    },
    enableSorting: true,
    enableHiding: true,
    meta: {
      className: headerStyle, // Apply header style
      displayName: "Duygular",
    },
  },
  {
    accessorKey: "memnuniyet",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Memnuniyet" />
    ),
    cell: ({ row }) => <div>{row.getValue("memnuniyet")}</div>,
    enableSorting: true,
    enableHiding: true,
    meta: {
      className: headerStyle, // Apply header style
      displayName: "Memnuniyet",
    },
  },
  {
    accessorKey: "musteriMemnuniyeti",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Müşteri Memnuniyeti" />
    ),
    cell: ({ row }) => {
      const { text } = row.getValue("musteriMemnuniyeti") as SentimentReport["musteriMemnuniyeti"] // Removed unused icon
      let iconToShow = "❓"; // Default icon
      if (text === "Positive") iconToShow = "✓";
      if (text === "Negative") iconToShow = "✕"; // Using '✕' (multiplication sign) for 'x'
      if (text === "Neutral") iconToShow = "-";
      return renderIconText(iconToShow, text)
    },
    enableSorting: true,
    enableHiding: true,
    meta: {
      className: headerStyle, // Apply header style
      displayName: "Müşteri Memnuniyeti",
    },
  },
  {
    accessorKey: "oncelik",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Öncelik" />
    ),
    cell: ({ row }) => <div>{row.getValue("oncelik")}</div>,
    enableSorting: true,
    enableHiding: true,
    meta: {
      className: headerStyle, // Apply header style
      displayName: "Öncelik",
    },
  },
  {
    accessorKey: "istek",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="İstek" />
    ),
    cell: ({ row }) => <div>{row.getValue("istek")}</div>,
    enableSorting: true,
    enableHiding: true,
    meta: {
      className: headerStyle, // Apply header style
      displayName: "İstek",
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const report = row.original

      return (
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(report.id)}
              >
                Copy Report ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View details</DropdownMenuItem>
              {/* Add more actions as needed */}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
    enableSorting: false,
    enableHiding: false,
    meta: {
      className: headerStyle, // Apply header style
      displayName: "Actions",
    },
  },
]
