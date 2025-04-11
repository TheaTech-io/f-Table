"use client"

import { ColumnDef, createColumnHelper } from "@tanstack/react-table"
import { parse } from 'date-fns'; // Add this import at the top if not already present
import { DateRange } from 'react-day-picker'; // Ensure DateRange type is imported

import { RiPlayFill, RiFileListLine } from "@remixicon/react" // Use RiFileListLine for notes

import { CallReport } from "@/data/schema"
import { callStatuses } from "@/data/data" // Import callStatuses for color/label mapping
import { Badge, BadgeProps } from "@/components/Badge"
import { Button } from "@/components/Button"
import { Checkbox } from "@/components/Checkbox"
import { DataTableColumnHeader } from "./DataTableColumnHeader"
import { cx } from "@/lib/utils" // Import cx for conditional classes
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription, // Add DialogDescription import
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/Dialog" // Import Dialog components

const columnHelper = createColumnHelper<CallReport>()

export const columns: ColumnDef<CallReport>[] = [
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
    cell: ({ getValue }) => <div className="font-medium">{getValue()}</div>, // Added font-medium for consistency
    enableSorting: true,
    enableHiding: false, // Keep Name visible
    enableGlobalFilter: true, // Enable global filtering
    meta: {
      className: "text-left",
      displayName: "Name",
    },
  }),
  columnHelper.accessor("date", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ getValue }) => getValue(),
    enableSorting: true,
    filterFn: (row, columnId, filterValue: DateRange | undefined): boolean => { // Ensure filterValue can be undefined
      if (!filterValue?.from && !filterValue?.to) {
        return true; // No filter applied
      }

      const dateString = row.getValue(columnId) as string;
      let rowDate: Date;

      try {
        rowDate = parse(dateString, "MM/dd/yyyy HH:mm", new Date());
         if (isNaN(rowDate.getTime())) {
           console.warn(`Invalid date format for row ${row.id}: ${dateString}`);
           return false; // Treat invalid dates as not matching
         }
      } catch (e) {
        console.error(`Error parsing date for row ${row.id}: ${dateString}`, e);
        return false; // Treat errors as not matching
      }
        console.log(`Row ${row.id} (${dateString}): Parsed Date =`, rowDate);


      const startDate = filterValue.from;
      const endDate = filterValue.to;

      console.log(`Filter Range: From =`, filterValue.from, `To =`, filterValue.to);

      const rowDateOnly = new Date(rowDate.getFullYear(), rowDate.getMonth(), rowDate.getDate());
      const startDateOnly = startDate ? new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()) : null;
      const endDatePlusOne = endDate ? new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate() + 1) : null;

      const effectiveEndDatePlusOne = endDatePlusOne ?? (startDateOnly ? new Date(startDateOnly.getFullYear(), startDateOnly.getMonth(), startDateOnly.getDate() + 1) : null);

      const isAfterStart = startDateOnly ? rowDateOnly >= startDateOnly : true;
      const isBeforeEnd = effectiveEndDatePlusOne ? rowDateOnly < effectiveEndDatePlusOne : true;

      console.log(`Row ${row.id}: Comparing rowDateOnly (${rowDateOnly}) with startDateOnly (${startDateOnly}) and effectiveEndDatePlusOne (${effectiveEndDatePlusOne})`);

      console.log(`Row ${row.id}: isAfterStart = ${isAfterStart}, isBeforeEnd = ${isBeforeEnd}, Result = ${isAfterStart && isBeforeEnd}`);

      return isAfterStart && isBeforeEnd;
    },
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
        className="h-6 w-6 p-1"
        onClick={(e) => {
          e.stopPropagation()
          console.log(`Play/Download: ${row.original.audioRecordingUrl}`)
        }}
        disabled={!row.original.audioRecordingUrl}
        title={row.original.audioRecordingUrl ? "Play/Download Recording" : "No Recording Available"}
      >
        <RiPlayFill className="h-4 w-4" />
      </Button>
    ),
    enableSorting: false,
    meta: {
      className: "text-center", // Added centering
      displayName: "Audio Recording",
    },
  }),
  columnHelper.accessor("customerSatisfaction", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Customer Satisfaction" />
    ),
    cell: ({ getValue }) => {
      const satisfaction = getValue()
      let variant: BadgeProps["variant"] = "neutral"
      if (satisfaction === "Positive") variant = "success"
      if (satisfaction === "Negative") variant = "error"

      return <Badge variant={variant}>{satisfaction}</Badge>
    },
    enableSorting: true,
    filterFn: "arrIncludesSome",
    meta: {
      className: "text-center", // Added centering
      displayName: "Customer Satisfaction",
    },
  }),
  columnHelper.accessor("callStatus", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Call Status" />
    ),
    cell: ({ getValue }) => {
      const statusValue = getValue()
      const statusInfo = callStatuses.find((s) => s.value === statusValue) // Find status object
      if (!statusInfo) return null

      return (
        <div className="flex items-center">
          <span
            className={cx(
              "mr-2 h-2 w-2 shrink-0 rounded-full", // Dot indicator
              statusInfo.color, // Use color from status object
              statusValue === "Dialing" && "animate-blink", // Apply blink animation
            )}
          />
          <span className="truncate">{statusInfo.label}</span> {/* Display status text */}
        </div>
      )
    },
    enableSorting: true,
    filterFn: "arrIncludesSome",
    meta: {
      className: "text-center", // Added centering
      displayName: "Call Status",
    },
  }),
  columnHelper.accessor("customerNumber", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Customer Number" />
    ),
    cell: ({ getValue }) => getValue(),
    enableSorting: false, // Keep sorting disabled as per previous version
    enableGlobalFilter: true, // Enable global filtering
    meta: {
      className: "text-left", // Added alignment for consistency
      displayName: "Customer Number",
    },
  }),
    columnHelper.accessor("stability", {
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Call Attempts" />
      ),
      enableSorting: true, // Keep sorting enabled
      meta: {
        className: "text-center", // Ensure cell content can be centered
        displayName: "Call Attempts",
      },
      cell: ({ getValue }) => {
        const attempts = getValue() as number; // Get attempt count (0-3)

        function Indicator({ count }: { count: number }) {
          const getBarClass = (index: number) => {
            const filledClass = "bg-primary-accent dark:bg-primary-accent";
            const emptyClass = "bg-gray-300 dark:bg-gray-700";

            if (index < count) {
              return filledClass;
            }
            return emptyClass;
          };

          return (
            <div className="inline-flex items-center justify-center gap-0.5"> {/* Use inline-flex and ensure centering */}
              <div className={`h-3.5 w-1 rounded-sm ${getBarClass(0)}`} />
              <div className={`h-3.5 w-1 rounded-sm ${getBarClass(1)}`} />
              <div className={`h-3.5 w-1 rounded-sm ${getBarClass(2)}`} />
            </div>
          );
        }

        return <Indicator count={attempts} />;
      },
    }),

  columnHelper.accessor("conversationNotes", { // Changed to accessor to allow filtering/hiding if needed later
    id: "conversationNotes",
    header: "Conversation Notes",
    cell: ({ row }) => { // Use row from cell context
        const notes = row.original.conversationNotes; // Get notes from original row data
        if (!notes) return null;

        return (
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                className="h-6 w-6 p-1"
                onClick={(e) => e.stopPropagation()} // Prevent row selection, Dialog handles open
                title="View Notes"
              >
                <RiFileListLine className="h-4 w-4" /> {/* Notes Icon */}
              </Button>
            </DialogTrigger>
            <DialogContent onClick={(e) => e.stopPropagation()} /* Prevent closing on content click */ >
              <DialogHeader>
                <DialogTitle>Conversation Notes</DialogTitle>
                <DialogDescription className="sr-only"> {/* Add sr-only description for accessibility */}
                  Full conversation notes for this call.
                </DialogDescription>
              </DialogHeader>
              <div className="mt-4 max-h-60 overflow-y-auto text-sm text-gray-700 dark:text-gray-300"> {/* Added scroll */}
                {notes}
              </div>
              <DialogFooter className="mt-6">
                <DialogClose asChild>
                  <Button variant="secondary">Close</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        );
      },
    enableSorting: false,
    meta: {
      className: "text-center", // Added centering
      displayName: "Conversation Notes",
    },
  }),
] as ColumnDef<CallReport>[]
