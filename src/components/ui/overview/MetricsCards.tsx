import React from 'react';

type CallReportMetric = {
  label: string;
  percentageValue: number; // For progress bar (0-100)
  displayValue: string; // Formatted string like "85% - 425/500"
};

function ProgressBar({ percentage }: { percentage: number }) {
  const cappedPercentage = Math.min(100, Math.max(0, percentage)); // Ensure percentage is between 0 and 100

  return (
    <div className="h-2 w-20 rounded-full bg-gray-200 dark:bg-gray-700">
      <div
        className="h-full rounded-full bg-indigo-600 dark:bg-indigo-500"
        style={{ width: `${cappedPercentage}%` }}
      />
    </div>
  );
}


const callReportMetrics: CallReportMetric[] = [
  {
    label: "Yanıtlanma Oranı", // Answer Rate
    percentageValue: 85,
    displayValue: "85% - 425/500",
  },
  {
    label: "Günlük Çağrı Hedefi", // Daily Call Target
    percentageValue: 75,
    displayValue: "75% - Ort. 750 / Hedef 1000",
  },
  {
    label: "Pozitif Memnuniyet", // Positive Satisfaction Rate
    percentageValue: 72,
    displayValue: "72% - 252/350",
  },
];

function CallReportMetricCard({ metric }: { metric: CallReportMetric }) {
  return (
    <div>
      <dt className="text-sm text-gray-500 dark:text-gray-500">
        {metric.label}
      </dt>
      <dd className="mt-1.5 flex items-center gap-2">
        <ProgressBar percentage={metric.percentageValue} />
        <p className="text-lg font-semibold text-gray-900 dark:text-gray-50">
          {metric.displayValue}
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
