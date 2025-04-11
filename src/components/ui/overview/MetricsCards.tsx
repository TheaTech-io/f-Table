import React from 'react';

type Category = "red" | "orange" | "emerald" | "gray"
type CallReportMetric = {
  label: string;
  value: number; // Raw value (0-1) for indicator logic
  percentage: string; // Formatted percentage string (e.g., "85%")
  fraction: string; // Formatted fraction string (e.g., "425/500")
};

const getCategory = (value: number): Category => {
  if (value < 0.3) return "red"
  if (value < 0.7) return "orange"
  return "emerald"
}

const categoryConfig = {
  red: {
    activeClass: "bg-red-500 dark:bg-red-500",
    bars: 1,
  },
  orange: {
    activeClass: "bg-orange-500 dark:bg-orange-500",
    bars: 2,
  },
  emerald: {
    activeClass: "bg-emerald-500 dark:bg-emerald-500",
    bars: 3,
  },
  gray: {
    activeClass: "bg-gray-300 dark:bg-gray-800",
    bars: 0,
  },
} as const

function Indicator({ number }: { number: number }) {
  const category = getCategory(number)
  const config = categoryConfig[category]
  const inactiveClass = "bg-gray-300 dark:bg-gray-800"

  return (
    <div className="flex gap-0.5">
      {[0, 1, 2].map((index) => (
        <div
          key={index}
          className={`h-3.5 w-1 rounded-sm ${
            index < config.bars ? config.activeClass : inactiveClass
          }`}
        />
      ))}
    </div>
  )
}

const callReportMetrics: CallReportMetric[] = [
  {
    label: "Yanıtlanma Oranı", // Answer Rate
    value: 0.85, // 85% as 0.85
    percentage: "85%",
    fraction: "425/500",
  },
  {
    label: "Günlük Çağrı Hedefi", // Daily Call Target
    value: 0.75, // 75% as 0.75
    percentage: "75%",
    fraction: "Ort. 750 / Hedef 1000", // Keep the specific format
  },
  {
    label: "Pozitif Memnuniyet", // Positive Satisfaction Rate
    value: 0.72, // 72% as 0.72
    percentage: "72%",
    fraction: "252/350",
  },
];

function CallReportMetricCard({ metric }: { metric: CallReportMetric }) {
  return (
    <div>
      <dt className="text-sm text-gray-500 dark:text-gray-500">
        {metric.label}
      </dt>
      <dd className="mt-1.5 flex items-center gap-2">
        <Indicator number={metric.value} />
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
