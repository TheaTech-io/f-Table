"use client"

import { ColumnDef, createColumnHelper } from "@tanstack/react-table"
import { RiPlayFill, RiFileList2Line } from "@remixicon/react" // Icons are installed

import { CallReport } from "@/data/schema" // Updated schema import
import { Badge, BadgeProps } from "@/components/Badge" // Use existing Badge
import { Button } from "@/components/Button" // Use existing Button
import { Checkbox } from "@/components/Checkbox" // Use existing Checkbox
import { DataTableColumnHeader } from "./DataTableColumnHeader"

const columnHelper = createColumnHelper<CallReport>() // Updated type

export const columns: ColumnDef<CallReport>[] = [ // Updated type assertion
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
  columnHelper.accessor("name", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    enableSorting: true,
    enableHiding: false,
    filterFn: "includesString", // Enable basic text filtering
    meta: {
      className: "text-left",
      displayName: "Name",
    },
  }),
  columnHelper.accessor("date", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ getValue }) => getValue(), // Assuming pre-formatted MM/DD/YYYY HH:MM
    enableSorting: true,
    meta: {
      className: "tabular-nums",
      displayName: "Date",
    },
  }),
  columnHelper.display({
    id: "audioRecording",
    header: "Audio Recording",
    cell: ({ row }) => (
      <Button
        variant="ghost"
        className="h-6 w-6 p-1" // Adjusted padding for icon-like appearance
        onClick={(e) => {
          e.stopPropagation() // Prevent row selection if clicking button
          alert(`Playing/Downloading ${row.original.audioRecordingUrl}`) // Placeholder action
        }}
        disabled={!row.original.audioRecordingUrl} // Disable if no URL
        title={row.original.audioRecordingUrl ? "Play/Download Recording" : "No Recording Available"}
      >
        <RiPlayFill className="h-4 w-4" />
      </Button>
    ),
    enableSorting: false,
    meta: {
      displayName: "Audio Recording",
    },
  }),
  columnHelper.accessor("customerSatisfaction", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Customer Satisfaction" />
    ),
    cell: ({ getValue }) => {
      const satisfaction = getValue()
      let variant: BadgeProps["variant"] = "neutral" // Default: Neutral (Grey/Yellow)
      if (satisfaction === "Positive") variant = "success" // Green
      if (satisfaction === "Negative") variant = "error" // Corrected variant

      return <Badge variant={variant}>{satisfaction}</Badge>
    },
    enableSorting: true,
    filterFn: "arrIncludesSome", // Enable filtering based on predefined values
    meta: {
      displayName: "Customer Satisfaction",
    },
  }),
  columnHelper.accessor("callStatus", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Call Status" />
    ),
    cell: ({ getValue }) => {
      const status = getValue()
      let colorClass = "bg-yellow-500" // Default: Missed (Yellow/Orange)
      if (status === "Answered") colorClass = "bg-green-500" // Green
      if (status === "Busy") colorClass = "bg-red-500" // Red

      return (
        <span
          title={status} // Basic tooltip via title attribute
          className={`inline-block h-2.5 w-2.5 shrink-0 rounded-full ${colorClass}`}
        />
      )
    },
    enableSorting: true,
    filterFn: "arrIncludesSome", // Enable filtering based on predefined values
    meta: {
      displayName: "Call Status",
    },
  }),
  columnHelper.accessor("customerNumber", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Customer Number" />
    ),
    cell: ({ getValue }) => getValue(), // Add formatting if needed
    enableSorting: false, // Sorting might not be useful here
    filterFn: "includesString", // Enable basic text filtering
    meta: {
      displayName: "Customer Number",
    },
  }),
  columnHelper.display({
    id: "conversationNotes",
    header: "Conversation Notes",
    cell: ({ row }) => (
      <Button
        variant="ghost"
        className="h-6 w-6 p-1" // Adjusted padding
        onClick={(e) => {
          e.stopPropagation() // Prevent row selection
          alert(`Viewing notes: ${row.original.conversationNotes}`) // Placeholder action
        }}
        disabled={!row.original.conversationNotes} // Disable if no notes
        title={row.original.conversationNotes ? "View Notes" : "No Notes Available"}
      >
        <RiFileList2Line className="h-4 w-4" />
      </Button>
    ),
    enableSorting: false,
    meta: {
      displayName: "Conversation Notes",
    },
  }),
] as ColumnDef<CallReport>[] // Updated type assertion
