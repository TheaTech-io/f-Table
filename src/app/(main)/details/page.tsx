import { columns } from "@/components/ui/data-table/columns"
import { DataTable } from "@/components/ui/data-table/DataTable"
import { callReports } from "@/data/data"
import { MetricsCards } from "@/components/ui/overview/MetricsCards"; // Added import

export default function Example() {
  return (
    <>
      {/* Added Overview Component */}
      <div className="mb-6 sm:mb-8 lg:mb-10">
        <MetricsCards />
      </div>

      <div className="mt-4 sm:mt-6 lg:mt-10">
        <DataTable data={callReports} columns={columns} />
      </div>
    </>
  )
}
