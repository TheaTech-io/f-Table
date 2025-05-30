"use client"

import { Button } from "@/components/Button"
import { Searchbar } from "@/components/Searchbar"
import { satisfactionLevels, callStatuses } from "@/data/data"
import { RiDownloadLine } from "@remixicon/react"
import { Table } from "@tanstack/react-table"

import { useDebouncedCallback } from "use-debounce"
import { DataTableFilter } from "./DataTableFilter"
import { ViewOptions } from "./DataTableViewOptions"

import { DateRangePicker } from "@/components/DatePicker";
import { DateRange } from "react-day-picker";
import React, { useState, useEffect } from "react"; // Ensure useState, useEffect are imported

import * as XLSX from 'xlsx'; // Import xlsx
import { saveAs } from 'file-saver'; // Import file-saver




interface DataTableToolbarProps<TData> {
  table: Table<TData>
  globalFilter: string // Add global filter state
  setGlobalFilter: (value: string) => void // Add setter for global filter
  setIsReportErrorOpen: React.Dispatch<React.SetStateAction<boolean>> // Add prop for drawer state
}

export function Filterbar<TData>({
  table,
  globalFilter,
  setGlobalFilter,
  setIsReportErrorOpen, // Destructure new prop
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  const dateColumn = table.getColumn("date");
  const initialDateFilter = dateColumn?.getFilterValue() as DateRange | undefined;
  const [dateRange, setDateRange] = useState<DateRange | undefined>(initialDateFilter);

  const dateFilterValue = dateColumn?.getFilterValue() as DateRange | undefined;
  useEffect(() => {
    setDateRange(dateFilterValue);
  }, [dateFilterValue, dateColumn]); // Added dateColumn and used extracted variable


  // useEffect(() => {
  // }, [dateFilterValue, dateColumn]); // Added dateColumn and used extracted variable

  const debouncedSetGlobalFilter = useDebouncedCallback((value) => {
    setGlobalFilter(value || "") // Update global filter state
  }, 300)

  const handleGlobalSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    debouncedSetGlobalFilter(value)
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-x-6">
      <div className="flex w-full flex-col gap-2 sm:w-fit sm:flex-row sm:items-center">
         {/* Global Search */}
         <Searchbar
           type="search"
           placeholder="Search by name or number..." // Unified placeholder
           value={globalFilter ?? ""} // Use globalFilter state
           onChange={handleGlobalSearchChange} // Use unified handler
           className="w-full sm:max-w-[250px] [&>input]:h-[30px] h-[30px]" // Added h-[30px] to container
         />
        {/* Filter for Customer Satisfaction */}
        {table.getColumn("customerSatisfaction")?.getIsVisible() && (
          <DataTableFilter
            column={table.getColumn("customerSatisfaction")}
            title="Satisfaction"
            options={satisfactionLevels}
            type="checkbox"
          />
        )}
        {/* Filter for Call Status */}
        {table.getColumn("callStatus")?.getIsVisible() && (
          <DataTableFilter
            column={table.getColumn("callStatus")}
            title="Call Status"
            options={callStatuses}
            type="checkbox"
          />
        )}
          {/* Date Range Filter */}
          {dateColumn?.getIsVisible() && (
             <div className="flex items-center">
               <DateRangePicker
                 value={dateRange}
                 onChange={(newRange) => {
                   setDateRange(newRange); // Update local state
                   table.getColumn("date")?.setFilterValue(newRange); // Apply filter to table
                 }}
                 align="start" // Match overview style
                 placeholder="Select date range" // Add placeholder
                 enableYearNavigation={true}
                 className="[&>button]:py-1.5 [&>button]:px-2 [&>button]:text-xs [&>button]:h-[30px]"
               />
             </div>
           )}
        {/* Clear Filters Button */}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => {
              table.resetColumnFilters()
              setGlobalFilter("") // Reset global filter state
              setDateRange(undefined) // Reset date range state
            }}
            className="h-[30px] items-center border border-gray-200 px-2 font-semibold text-indigo-600 sm:border-none sm:py-1 dark:border-gray-800 dark:text-indigo-500" // Added h-[30px] and items-center
          >
            Clear filters
          </Button>
        )}
        <Button
          variant="secondary"
          onClick={() => setIsReportErrorOpen(true)}
          className="h-[30px] items-center gap-x-2 px-2 text-xs" // Match Export button style
        >
          Hata Bildir
        </Button>

      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="secondary"
          onClick={() => { // Add onClick handler for export
            const visibleData = table.getFilteredRowModel().rows.map(row => {
              return row.original;
            });

            const worksheet = XLSX.utils.json_to_sheet(visibleData);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "CallReports");

            const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
            const dataBlob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8" });

            saveAs(dataBlob, "call_reports_export.xlsx");
          }}
          className="h-[30px] items-center gap-x-2 px-2 text-xs hidden lg:flex" // Reverted to hidden lg:flex
        >
          <RiDownloadLine className="size-4 shrink-0" aria-hidden="true" />
          Export
        </Button>
        <ViewOptions table={table} />



      </div>
    </div>
  )
}
