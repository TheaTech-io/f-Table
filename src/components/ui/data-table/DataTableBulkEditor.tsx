"use client"

import React from "react" // Add React import

import {
  CommandBar,
  CommandBarBar,
  CommandBarCommand,
  CommandBarSeperator,
  CommandBarValue,
} from "@/components/CommandBar"
import { RowSelectionState, Table } from "@tanstack/react-table"

type DataTableBulkEditorProps<TData> = {
  table: Table<TData>
  rowSelection: RowSelectionState
  setIsReportErrorOpen: React.Dispatch<React.SetStateAction<boolean>>
}

function DataTableBulkEditor<TData>({
  table, // Destructure table correctly
  rowSelection,
  setIsReportErrorOpen,
}: DataTableBulkEditorProps<TData>) {
  const hasSelectedRows = Object.keys(rowSelection).length > 0
  return (
    <CommandBar open={hasSelectedRows}>
      <CommandBarBar>
        <CommandBarValue>
          {Object.keys(rowSelection).length} selected
        </CommandBarValue>
        <CommandBarSeperator />
        <CommandBarCommand
          label="Tekrar ara"
          action={() => {
            console.log("Redial requested for call ID(s):", Object.keys(rowSelection))
          }}
          shortcut={{ shortcut: "" }} // Add placeholder shortcut

        />
        <CommandBarSeperator />
        <CommandBarCommand
          label="Hata Bildir"
          action={() => {
            setIsReportErrorOpen(true) // Use the prop here
          }}
          shortcut={{ shortcut: "" }} // Add placeholder shortcut

        />
        <CommandBarSeperator />
        <CommandBarCommand
          label="Detaylı Rapor"
          action={() => {
            console.log("Detailed report requested for call ID(s):", Object.keys(rowSelection))
          }}
          shortcut={{ shortcut: "" }} // Add placeholder shortcut
        />
        {/* Keep Reset functionality */}
        <CommandBarSeperator />
        <CommandBarCommand
          label="Reset Selection" // Renamed label
          action={() => {
            table.resetRowSelection()
          }}
          shortcut={{ shortcut: "Escape", label: "esc" }}
        />

      </CommandBarBar>
    </CommandBar>
  )
}

export { DataTableBulkEditor }
