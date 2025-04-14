"use client"
import { Button } from "@/components/Button"
import {
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/Drawer"
import { RadioCardGroup, RadioCardItem } from "@/components/RadioCardGroup"
import {
  Select,
  SelectContent,
  SelectItemExtended,
  SelectTrigger,
  SelectValue,
} from "@/components/Select"
import {

  appIssueCategories,
  appIssuePriorities,
  appIssueTypes,
  type AppIssueCategory,
  type AppIssuePriority,
  type AppIssueType,
  type FeedbackReport,
} from "@/data/support/schema"
import React from "react"
import { Input } from "@/components/Input"
import { Label } from "@/components/Label"
import { Textarea } from "@/components/Textarea"

type FeedbackFormData = Partial<FeedbackReport>

interface TicketDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface FormPageProps {
  formData: FeedbackFormData
  onUpdateForm: (updates: Partial<FeedbackFormData>) => void
}

const SummaryItem = ({
  label,
  value,
}: {
  label: string
  value: string | number | null | undefined
}) => (
  <div className="space-y-1">
    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
      {label}
    </p>
    <p className="text-sm">{value ?? "Not provided"}</p>
  </div>
)

const FormField = ({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) => (
  <div>
    <Label className="font-medium">{label}</Label>
    <div className="mt-2">{children}</div>
  </div>
)

const FirstPage = ({ formData, onUpdateForm }: FormPageProps) => (
  <>
    <DrawerHeader>
      <DrawerTitle>
        <p>Report Issue: Step 1/3 - Define Issue</p>
        {/* Subtitle removed as requested */}
        <DrawerDescription className="sr-only">Dialog providing steps to report an application issue or feedback.</DrawerDescription>
      </DrawerTitle>
    </DrawerHeader>
    <DrawerBody className="-mx-6 space-y-6 overflow-y-scroll border-t border-gray-200 px-6 dark:border-gray-800">
      {/* Contact Type field removed */}

      <FormField label="Category">
        <Select
          required // Make required
          value={formData.category}
          onValueChange={(value: AppIssueCategory) => onUpdateForm({ category: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            {appIssueCategories.map((category) => (
              <SelectItemExtended
                key={category.value}
                value={category.value}
                option={category.name}
                description={category.description}
              />
            ))}
          </SelectContent>
        </Select>
      </FormField>

      <FormField label="Subject / Title">
        <Input
          required // Make required
          name="subject"
          value={formData.subject}
          onChange={(e) => onUpdateForm({ subject: e.target.value })}
          placeholder="Brief summary of the issue or feedback"
        />
      </FormField>

      <FormField label="Issue Type">
        <Select
          required // Make required
          value={formData.issueType}
          onValueChange={(value: AppIssueType) => onUpdateForm({ issueType: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Issue Type" />
          </SelectTrigger>
          <SelectContent>
            {appIssueTypes.map((type) => (
              <SelectItemExtended
                key={type.value}
                value={type.value}
                option={type.name}
                description={type.description}
              />
            ))}
          </SelectContent>
        </Select>
      </FormField>

      {/* Policy Type field removed */}
      {/* Policy Number field removed */}
    </DrawerBody>
  </>
)

const SecondPage = ({ formData, onUpdateForm }: FormPageProps) => (
  <>
    <DrawerHeader>
      <DrawerTitle>
        <p>Report Issue: Step 2/3 - Details & Priority</p>
        {/* Subtitle removed as requested */}
      </DrawerTitle>
    </DrawerHeader>
    <DrawerBody className="-mx-6 space-y-6 overflow-y-scroll border-t border-gray-200 px-6 dark:border-gray-800">
      <FormField label="Priority Level">
        <RadioCardGroup
          required // Make required
          value={formData.priority} // Use value instead of defaultValue for controlled component
          className="grid grid-cols-1 gap-2 text-sm"
          onValueChange={(value: AppIssuePriority) => onUpdateForm({ priority: value })}
        >
          {appIssuePriorities.map((priority) => (
            <RadioCardItem
              key={priority.value}
              value={priority.value}
              className="p-2.5 text-base duration-75 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 data-[state=checked]:border-transparent data-[state=checked]:bg-blue-500 data-[state=checked]:text-white sm:text-sm dark:focus:ring-blue-500"
            >
              {/* Removed SLA display */}
              <span>{priority.label}</span>
              <span className="block text-sm opacity-75 sm:text-xs">
                {priority.description}
              </span>
            </RadioCardItem>
          ))}
        </RadioCardGroup>
      </FormField>

      <FormField label="Description">
        <Textarea
          required // Make required
          name="description"
          value={formData.description}
          onChange={(e) => onUpdateForm({ description: e.target.value })}
          placeholder="Provide a detailed description of the issue, steps to reproduce, and expected behavior..."
          className="h-32" // Keep height or adjust as needed
        />
      </FormField>

      {/* Expected Call Duration field removed */}

      <FormField label="Attach Screenshot (Optional)">
        <Input
          name="screenshotFile"
          type="file"
          accept="image/*" // Accept only image files
          onChange={(e) => {
            const file = e.target.files ? e.target.files[0] : null;
            onUpdateForm({ screenshotFile: file })
          }}
        />
        {/* Display filename if a file is selected */}
        {formData.screenshotFile && (
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Selected file: {formData.screenshotFile.name}
          </p>
        )}
      </FormField>
    </DrawerBody>
  </>
)

const SummaryPage = ({ formData }: { formData: FeedbackFormData }) => (
  <>
    <DrawerHeader>
      <DrawerTitle>
        <p>Report Issue: Step 3/3 - Review & Submit</p>
        <span className="text-sm font-normal text-gray-500 dark:text-gray-500">
          Please review details before submitting
        </span>
      </DrawerTitle>
    </DrawerHeader>
    <DrawerBody className="-mx-6 space-y-4 overflow-y-scroll border-t border-gray-200 px-6 dark:border-gray-800">
      <div className="rounded-md border border-gray-200 dark:border-gray-800">
        <div className="border-b border-gray-200 p-4 dark:border-gray-800">
          <h3 className="font-medium">Issue Definition</h3>
          <div className="mt-4 space-y-4">
            {/* Display new fields */}
            <SummaryItem
              label="Issue Type"
              value={
                appIssueTypes.find((t) => t.value === formData.issueType)?.name ??
                undefined
              }
            />
            <SummaryItem
              label="Category"
              value={
                appIssueCategories.find((c) => c.value === formData.category)
                  ?.name ?? undefined
              }
            />
            <SummaryItem
              label="Subject"
              value={formData.subject || undefined}
            />
            {/* Removed Type, Policy Type */}
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-medium">Details & Priority</h3>
          <div className="mt-4 space-y-4">
            <SummaryItem
              label="Priority"
              value={
                appIssuePriorities.find((p) => p.value === formData.priority)?.label ??
                undefined
              }
            />
            <SummaryItem
              label="Description"
              value={formData.description || undefined}
            />
            <SummaryItem
              label="Attached File"
              value={formData.screenshotFile?.name ?? "None"}
            />
            {/* Removed Call Duration */}
            <SummaryItem
              label="Created"
              value={
                formData.created
                  ? new Date(formData.created).toLocaleString()
                  : undefined
              }
            />
          </div>
        </div>
      </div>
    </DrawerBody>
  </>
)

export function ReportErrorDrawer({ open, onOpenChange }: TicketDrawerProps) {
  const [formData, setFormData] = React.useState<FeedbackFormData>({
    category: appIssueCategories[0].value, // Default to first category
    subject: "",
    issueType: appIssueTypes[0].value, // Default to first issue type
    priority: appIssuePriorities[1].value, // Default to medium priority
    description: "",
    screenshotFile: null, // Optional file
    created: new Date().toISOString(),
  })

  const [currentPage, setCurrentPage] = React.useState(1)

  const handleUpdateForm = (updates: Partial<FeedbackFormData>) => {
    setFormData((prev: FeedbackFormData) => ({ ...prev, ...updates }))
  }

  const handleSubmit = () => {
    console.log("Ticket created:", formData)
    onOpenChange(false)
  }

  const renderPage = () => {
    switch (currentPage) {
      case 1:
        return <FirstPage formData={formData} onUpdateForm={handleUpdateForm} />
      case 2:
        return (
          <SecondPage formData={formData} onUpdateForm={handleUpdateForm} />
        )
      case 3:
        return <SummaryPage formData={formData} />
      default:
        return null
    }
  }

  const renderFooter = () => {
    if (currentPage === 1) {
      return (
        <>
          <DrawerClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DrawerClose>
          <Button onClick={() => setCurrentPage(2)}>Continue</Button>
        </>
      )
    }
    if (currentPage === 2) {
      return (
        <>
          <Button variant="secondary" onClick={() => setCurrentPage(1)}>
            Back
          </Button>
          <Button onClick={() => setCurrentPage(3)}>Review</Button>
        </>
      )
    }
    return (
      <>
        <Button variant="secondary" onClick={() => setCurrentPage(2)}>
          Back
        </Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </>
    )
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="overflow-x-hidden sm:max-w-lg">
        {renderPage()}
        <DrawerFooter className="-mx-6 -mb-2 gap-2 px-6 sm:justify-between">
          {renderFooter()}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
