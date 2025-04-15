import { columns } from "@/components/ui/data-table/columns"
import { DataTable } from "@/components/ui/data-table/DataTable"
import { callReports } from "@/data/data" // Import only callReports data
import { MetricsCards } from "@/components/ui/overview/MetricsCards";

export default function CallReportsPage() { // Renamed function for clarity
  return (
    <>
      {/* Overview Component */}
      <div className="mb-6 sm:mb-8 lg:mb-10">
        <MetricsCards />
      </div>

      {/* Original Call Reports Table */}
      <div className="mt-4 sm:mt-6 lg:mt-10">
        {/* Optional: Add title if needed <h2 className="text-lg font-semibold mb-4">Call Reports</h2> */}
        <DataTable data={callReports} columns={columns} />
      </div>
    </>
  )
}
