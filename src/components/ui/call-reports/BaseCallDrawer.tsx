"use client"
import { CallReportDrawerFeed } from "@/components/ui/call-reports/CallReportDrawerFeed" // Correct path
import { Button } from "@/components/Button" // Correct path
import {
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/Drawer" // Correct path
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/Tabs" // Correct path
import { CallReport } from "@/data/schema" // Correct path for CallReport
import { satisfactionLevels } from "@/data/data" // Correct path for levels
import React from "react"

import { Badge, BadgeProps } from "@/components/Badge" // Correct path
import { format, parse } from "date-fns" // Correct path

interface BaseCallDrawerProps { // Renamed interface
  open: boolean
  onOpenChange: (open: boolean) => void
  datas: CallReport | undefined // Changed type to CallReport
}


export function BaseCallDrawer({ // Renamed component
  open,
  onOpenChange,
  datas,
}: BaseCallDrawerProps) {

  const satisfactionInfo = satisfactionLevels.find(
    (item: { value: string; label: string; icon?: any; variant?: string }) => item.value === datas?.customerSatisfaction, // Added type annotation
  )
  let satisfactionVariant: BadgeProps["variant"] = "neutral"
      if (satisfactionInfo?.value === "Positive") satisfactionVariant = "success"
      if (satisfactionInfo?.value === "Negative") satisfactionVariant = "error"


  let formattedDate = "N/A";
  if (datas?.date) {
      try {
          const parsedDate = parse(datas.date, "MM/dd/yyyy HH:mm", new Date());
          if (!isNaN(parsedDate.getTime())) {
              formattedDate = format(parsedDate, "MMM dd, yyyy 'at' hh:mm a"); // Added AM/PM
          }
      } catch (e) {
          console.error("Error parsing date:", datas.date, e);
      }
  }


  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      {datas ? (
        <DrawerContent className="overflow-x-hidden sm:max-w-lg dark:bg-gray-925">
          <DrawerHeader className="-px-6 w-full">
            {/* Updated Title and Subtitle */}
            <DrawerTitle className="flex w-full items-start justify-between"> {/* Align items start */}
              <div className="flex flex-col"> {/* Wrap title/subtitle */}
                <span>{`Çağrı Detayları: ${datas.name}`}</span>
                <span className="mt-1 text-left text-sm font-normal text-gray-500 dark:text-gray-500"> {/* Subtitle styling */}
                  {`${formattedDate} - ${datas.customerNumber}`}
                </span>
              </div>
              {/* Updated Status Badge */}
              <Badge variant={satisfactionVariant} className="ml-auto mt-1"> {/* Add margin-top */}
                {satisfactionInfo?.label}
              </Badge>
            </DrawerTitle>
            {/* Removed original date/amount row */}
          </DrawerHeader>
          <DrawerBody className="-mx-6 overflow-y-scroll">
            {/* Updated Tabs */}
            <Tabs defaultValue="metrics">
              <TabsList className="px-6">
                <TabsTrigger value="metrics" className="px-4">
                  Görüşme Metrikleri
                </TabsTrigger>
                <TabsTrigger value="sentiment" className="px-4">
                  Duygusal Analiz
                </TabsTrigger>
                 <TabsTrigger value="actions" className="px-4">
                  Aksiyon Önerileri
                </TabsTrigger>
              </TabsList>
              {/* Placeholder Content for Tabs */}
              <TabsContent value="metrics" className="space-y-6 px-6">
                 <div className="mt-6 text-center text-gray-500 dark:text-gray-400">
                    Görüşme Metrikleri Content Placeholder
                 </div>
                 {/* TODO: Add Audio Player, Transcript, Key Metrics */}
              </TabsContent>
              <TabsContent value="sentiment" className="space-y-6 px-6">
                 <div className="mt-6 text-center text-gray-500 dark:text-gray-400">
                    Duygusal Analiz Content Placeholder
                 </div>
                 {/* TODO: Add Sentiment Bars, Customer Mood */}
              </TabsContent>
              <TabsContent value="actions" className="space-y-6 px-6">
                 <h3 className="mt-6 text-sm font-medium text-gray-900 dark:text-gray-50">
                   Aksiyon Önerileri
                 </h3>
                 <CallReportDrawerFeed /> {/* Use the renamed feed component */}
                 {/* TODO: Add Comment Input per Action */}
              </TabsContent>
            </Tabs>
          </DrawerBody>
          {/* Updated Footer */}
          <DrawerFooter className="-mx-6 -mb-2 gap-2 bg-white px-6 dark:bg-gray-925">
            {/* Removed original buttons */}
            {/* Optional: Add Save button logic here */}
             <DrawerClose asChild>
               <Button variant="secondary" className="w-full">
                 Kapat {/* Close button */}
               </Button>
             </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      ) : null}
    </Drawer>
  )
}
