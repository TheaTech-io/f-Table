"use client"

import { Button } from "@/components/Button"
import { Searchbar } from "@/components/Searchbar"
import { satisfactionLevels, callStatuses } from "@/data/data" // Updated imports for new filters
import { RiDownloadLine } from "@remixicon/react"
import { Table } from "@tanstack/react-table"
import { useState } from "react"
import { useDebouncedCallback } from "use-debounce"
import { DataTableFilter } from "./DataTableFilter"
import { ViewOptions } from "./DataTableViewOptions"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function Filterbar<TData>({ table }: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0
  const [searchTerm, setSearchTerm] = useState<string>("")

  const debouncedSetNameFilter = useDebouncedCallback((value) => {
    table.getColumn("name")?.setFilterValue(value) // Filter 'name' column
  }, 300)

  const debouncedSetCustomerNumberFilter = useDebouncedCallback((value) => {
    table.getColumn("customerNumber")?.setFilterValue(value) // Filter 'customerNumber' column
  }, 300)

  const handleNameSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setSearchTerm(value) // Keep using searchTerm for the primary search (Name)
    debouncedSetNameFilter(value)
  }

  const [customerNumberSearchTerm, setCustomerNumberSearchTerm] = useState<string>("")
  const handleCustomerNumberSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setCustomerNumberSearchTerm(value)
    debouncedSetCustomerNumberFilter(value)
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-x-6">
      <div className="flex w-full flex-col gap-2 sm:w-fit sm:flex-row sm:items-center">
        {/* Filter for Customer Satisfaction */}
        {table.getColumn("customerSatisfaction")?.getIsVisible() && (
          <DataTableFilter
            column={table.getColumn("customerSatisfaction")}
            title="Satisfaction" // Shortened title for space
            options={satisfactionLevels}
            type="checkbox" // Use checkbox for multi-select
          />
        )}
        {/* Filter for Call Status */}
        {table.getColumn("callStatus")?.getIsVisible() && (
          <DataTableFilter
            column={table.getColumn("callStatus")}
            title="Call Status"
            options={callStatuses}
            type="checkbox" // Use checkbox for multi-select
          />
        )}
         {/* Search by Name */}
        {table.getColumn("name")?.getIsVisible() && (
          <Searchbar
            type="search"
            placeholder="Search by name..." // Updated placeholder
            value={searchTerm}
            onChange={handleNameSearchChange} // Updated handler
            className="w-full sm:max-w-[180px] sm:[&>input]:h-[30px]" // Adjusted width
          />
        )}
         {/* Search by Customer Number */}
        {table.getColumn("customerNumber")?.getIsVisible() && (
           <Searchbar
             type="search"
             placeholder="Search by number..." // New placeholder
             value={customerNumberSearchTerm} // New state variable
             onChange={handleCustomerNumberSearchChange} // New handler
             className="w-full sm:max-w-[180px] sm:[&>input]:h-[30px]" // Adjusted width
           />
        )}
        {/* Clear Filters Button */}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => {
              table.resetColumnFilters()
              setSearchTerm("") // Reset search terms as well
              setCustomerNumberSearchTerm("")
            }}
            className="border border-gray-200 px-2 font-semibold text-indigo-600 sm:border-none sm:py-1 dark:border-gray-800 dark:text-indigo-500"
          >
            Clear filters
          </Button>
        )}
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="secondary"
          className="hidden gap-x-2 px-2 py-1.5 text-sm sm:text-xs lg:flex"
        >
          <RiDownloadLine className="size-4 shrink-0" aria-hidden="true" />
          Export
        </Button>
        <ViewOptions table={table} />
      </div>
    </div>
  )
}
