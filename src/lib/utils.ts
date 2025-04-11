import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const focusInput = [
  "focus:ring-2",
  "focus:ring-indigo-200 focus:dark:ring-indigo-700/30", // Restore original indigo ring
  "focus:border-indigo-500 focus:dark:border-indigo-700", // Restore original indigo border
]

export const focusRing = [
  "outline outline-offset-2 outline-0 focus-visible:outline-2",
  "outline-indigo-500 dark:outline-indigo-500", // Restore original indigo outline
]



export const hasErrorInput = [
  "ring-2",
  "border-red-500 dark:border-red-700",
  "ring-red-200 dark:ring-red-700/30",
]
