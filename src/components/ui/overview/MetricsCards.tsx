import React from 'react';
import { SegmentedVerticalBarIndicator } from "@/components/ui/SegmentedVerticalBarIndicator"; // Import the new indicator

type CallReportMetric = {
  label: string;
  value: number; // Raw value (0-1) for percentage calculation
  percentage: string; // Formatted percentage string (e.g., "85%")
  fraction: string; // Formatted fraction string (e.g., "425/500")
  color: string; // Tailwind CSS background color class (e.g., "bg-blue-500")
};

const callReportMetrics: CallReportMetric[] = [
  {
    label: "Yanıtlanma Oranı", // Answer Rate
    value: 0.85,
    percentage: "85%",
    fraction: "425/500",
    color: "bg-blue-500 dark:bg-blue-600", // Blue for the first metric
  },
  {
    label: "Günlük Çağrı Hedefi", // Daily Call Target
    value: 0.75,
    percentage: "75%",
    fraction: "Ort. 750 / Hedef 1000",
    color: "bg-purple-500 dark:bg-purple-600", // Purple for the second metric
  },
  {
    label: "Pozitif Memnuniyet", // Positive Satisfaction Rate
    value: 0.72,
    percentage: "72%",
    fraction: "252/350",
    color: "bg-green-500 dark:bg-green-600", // Green for the third metric
  },
];

function CallReportMetricCard({ metric }: { metric: CallReportMetric }) {
  return (
    <div>
      <dt className="text-sm text-gray-500 dark:text-gray-400"> {/* Adjusted dark mode text */}
        {metric.label}
      </dt>
      <dd className="mt-1.5 flex items-center gap-2">
        {/* Use the new SegmentedVerticalBarIndicator */}
        <SegmentedVerticalBarIndicator
            value={metric.value}
            color={metric.color}
            isPercentage={true} // Value is percentage (0-1)
        />
        <p className="text-lg font-semibold text-gray-900 dark:text-gray-100"> {/* Adjusted dark text */}
          {metric.percentage}{" "}
          {/* Adjusted dark mode text and matched light mode color */}
          <span className="font-medium text-gray-500 dark:text-gray-400"> {/* Kept dark fraction text */}
            - {metric.fraction}
          </span>
        </p>
      </dd>
    </div>
  );
}

export function MetricsCards() {
  return (
    <>
      {/* Title can remain generic or be updated if needed */}
      {/* <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
        Overview
      </h1> */}
      <dl className="mt-6 flex flex-wrap items-center gap-x-12 gap-y-8">
        {callReportMetrics.map((metric) => (
          <CallReportMetricCard key={metric.label} metric={metric} />
        ))}
      </dl>
    </>
  );
}
