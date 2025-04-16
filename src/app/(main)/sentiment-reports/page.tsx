import { newSentimentColumns } from "@/components/ui/data-table/newSentimentColumns";
import { DataTable } from "@/components/ui/data-table/DataTable";
import { sentimentReports } from "@/data/data";

export default function SentimentReportsPage() {
  return (
    <>
      <h1 className="text-2xl font-semibold mb-6 sm:mb-8 lg:mb-10">
        Sentiment Reports
      </h1>
      <div className="mt-4 sm:mt-6 lg:mt-10">
        <DataTable data={sentimentReports} columns={newSentimentColumns} />
      </div>
    </>
  );
}
