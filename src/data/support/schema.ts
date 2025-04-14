import { z } from "zod"


export const appIssueCategories = [
  { value: "general-ui", name: "General UI / Styling", description: "Issues related to the overall look and feel." },
  { value: "filtering-search", name: "Filtering / Search", description: "Problems with filtering or searching data." },
  { value: "table-data", name: "Table Data / Columns", description: "Issues with the data displayed in tables or columns." },
  { value: "overview-stats", name: "Overview Statistics", description: "Problems with the dashboard/overview metrics." },
  { value: "call-details-drawer", name: "Call Detail Drawer", description: "Issues within the call detail side panel." },
  { value: "export", name: "Export Functionality", description: "Problems exporting data." },
  { value: "performance", name: "Performance / Speed", description: "Issues related to application speed or responsiveness." },
  { value: "other", name: "Other", description: "Issues not covered by other categories." },
] as const;
export type AppIssueCategory = (typeof appIssueCategories)[number]["value"];

export const appIssueTypes = [
    { value: "bug", name: "Bug / Error", description: "Something is broken or not working as expected." },
    { value: "ui-visual", name: "UI / Visual Problem", description: "Something looks wrong or out of place." },
    { value: "performance", name: "Performance Issue", description: "The application is slow or unresponsive." },
    { value: "data-inconsistency", name: "Data Inconsistency", description: "The data shown seems incorrect or inconsistent." },
    { value: "feature-request", name: "Feature Request / Suggestion", description: "An idea for a new feature or improvement." },
    { value: "other", name: "Other", description: "An issue type not listed above." },
] as const;
export type AppIssueType = (typeof appIssueTypes)[number]["value"];

export const appIssuePriorities = [
  {
    value: "high",
    label: "High",
    description: "Blocks core functionality / Potential data loss",
  },
  {
    value: "medium",
    label: "Medium",
    description: "Affects usability but workaround exists / Significant UI issue",
  },
  {
    value: "low",
    label: "Low",
    description: "Minor issue / Cosmetic problem / Suggestion",
  },
] as const;
export type AppIssuePriority = (typeof appIssuePriorities)[number]["value"];


export const schemaFeedbackReport = z.object({
  category: z.enum(appIssueCategories.map(c => c.value) as [AppIssueCategory, ...AppIssueCategory[]]),
  subject: z.string().min(1, "Subject is required"),
  issueType: z.enum(appIssueTypes.map(t => t.value) as [AppIssueType, ...AppIssueType[]]),
  priority: z.enum(appIssuePriorities.map(p => p.value) as [AppIssuePriority, ...AppIssuePriority[]]),
  description: z.string().min(1, "Description is required"),
  screenshotFile: z.instanceof(File).optional().nullable(), // Store the File object directly
  created: z.string(), // Keep created date
});

export type FeedbackReport = z.infer<typeof schemaFeedbackReport>;
