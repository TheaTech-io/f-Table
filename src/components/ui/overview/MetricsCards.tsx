import React from 'react';

type CallReportMetric = {
  label: string;
  value: number; // Raw value (0-1) for percentage calculation
  percentage: string; // Formatted percentage string (e.g., "85%")
  fraction: string; // Formatted fraction string (e.g., "425/500")
  color: string; // Tailwind CSS background color class (e.g., "bg-blue-500")
};

function Indicator({ value, color }: { value: number; color: string }) {
  const percentageWidth = `${Math.max(0, Math.min(100, value * 100))}%`; // Ensure width is between 0% and 100%

  return (
    <div className="w-20 h-2 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
      <div
        className={`h-full rounded-full ${color}`}
        style={{ width: percentageWidth }}
      />
    </div>
  );
}

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
      <dt className="text-sm text-gray-500 dark:text-gray-500">
        {metric.label}
      </dt>
      <dd className="mt-1.5 flex items-center gap-2">
        {/* Pass value and color to the Indicator */}
        <Indicator value={metric.value} color={metric.color} />
        <p className="text-lg font-semibold text-gray-900 dark:text-gray-50">
          {metric.percentage}{" "}
          <span className="font-medium text-gray-400 dark:text-gray-600">
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
