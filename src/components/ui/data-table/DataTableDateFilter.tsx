"use client"

import React, { useState, useEffect } from "react"
import { format } from "date-fns"
import { DayPicker, DateRange } from "react-day-picker"
import { RiCalendarLine } from "@remixicon/react"

import { Popover, PopoverContent, PopoverTrigger } from "@/components/Popover"
import { Button } from "@/components/Button"
import { Column } from "@tanstack/react-table"
import { cn } from "@/lib/utils"

interface DataTableDateFilterProps<TData, TValue> {
  column: Column<TData, TValue> | undefined
  title?: string
}

export function DataTableDateFilter<TData, TValue>({
  column,
  title,
}: DataTableDateFilterProps<TData, TValue>) {
  const filterValue = column?.getFilterValue() as DateRange | undefined; // Extract filter value
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>(filterValue) // Initialize with extracted value
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setSelectedRange(filterValue) // Use extracted value
  }, [filterValue]) // Depend on the extracted value

  const handleApply = () => {
    column?.setFilterValue(selectedRange)
    setIsOpen(false) // Close popover on apply
  }

  const handleReset = () => {
    column?.setFilterValue(undefined)
    setSelectedRange(undefined)
    setIsOpen(false) // Close popover on reset
  }

  const displayValue = selectedRange?.from
    ? selectedRange.to
      ? `${format(selectedRange.from, "LLL dd, y")} - ${format(selectedRange.to, "LLL dd, y")}`
      : format(selectedRange.from, "LLL dd, y")
    : title || "Date Range"

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            "flex w-full items-center gap-x-1.5 whitespace-nowrap rounded-md border border-gray-300 px-2 py-1.5 font-medium text-gray-600 hover:bg-gray-50 sm:w-fit sm:text-xs dark:border-gray-700 dark:text-gray-400 hover:dark:bg-gray-900",
            selectedRange ? "" : "border-dashed",
            "outline outline-offset-2 outline-0 focus-visible:outline-2 outline-indigo-500 dark:outline-indigo-500" // Inline replacement for focusRing
          )}
        >
          <RiCalendarLine className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate">{displayValue}</span>
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" sideOffset={7} className="w-auto p-0">
        <div className="p-3">
          <DayPicker
            initialFocus
            mode="range"
            defaultMonth={selectedRange?.from}
            selected={selectedRange}
            onSelect={setSelectedRange}
            numberOfMonths={1}
            captionLayout="dropdown-buttons"
            fromYear={2020}
            toYear={new Date().getFullYear() + 1} // Allow selecting up to next year
          />
        </div>
        <div className="flex flex-col space-y-2 border-t border-gray-200 p-3 dark:border-gray-800">
          <Button onClick={handleApply} className="w-full sm:py-1">
            Apply
          </Button>
          {selectedRange && (
            <Button
              variant="secondary"
              className="w-full sm:py-1"
              onClick={handleReset}
            >
              Reset
            </Button>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
} // End of component definition
