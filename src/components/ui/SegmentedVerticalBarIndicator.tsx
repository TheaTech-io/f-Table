import React from 'react';
import { cx } from "@/lib/utils"; // Import cx utility

interface SegmentedVerticalBarIndicatorProps {
  value: number; // 0-3 for direct segments or 0-1 for percentage
  color: string; // Tailwind color class (e.g., "bg-blue-500 dark:bg-blue-600")
  isPercentage?: boolean; // Optional flag to indicate if value is a percentage
  className?: string; // Optional className for the container
}

export function SegmentedVerticalBarIndicator({
  value,
  color,
  isPercentage = false,
  className
}: SegmentedVerticalBarIndicatorProps) {
  let segmentsToHighlight: number;
  if (isPercentage) {
    const safeValue = Math.max(0, Math.min(1, value));
    if (safeValue === 0) {
        segmentsToHighlight = 0;
    } else if (safeValue <= 1/3) {
        segmentsToHighlight = 1;
    } else if (safeValue <= 2/3) {
        segmentsToHighlight = 2;
    } else {
        segmentsToHighlight = 3;
    }
  } else {
    segmentsToHighlight = Math.min(3, Math.max(0, Math.round(value))); // Round direct value
  }

  const getBarClass = (index: number) => {
    const filledClass = color;
    const emptyClass = "bg-gray-300 dark:bg-gray-700"; // Default empty color
    return index < segmentsToHighlight ? filledClass : emptyClass;
  };

  return (
    <div className={cx("inline-flex items-center justify-center gap-0.5", className)}>
      <div className={`h-3.5 w-1 rounded-sm ${getBarClass(0)}`} />
      <div className={`h-3.5 w-1 rounded-sm ${getBarClass(1)}`} />
      <div className={`h-3.5 w-1 rounded-sm ${getBarClass(2)}`} />
    </div>
  );
}
