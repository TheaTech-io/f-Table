"use client"
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/Drawer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/Tabs"
import { CallReport } from "@/data/schema" // Import CallReport instead of Transaction
import { Badge } from "@/components/Badge" // Re-add Badge import
import React from "react"

interface CallReportDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  datas: CallReport | undefined
}

import { format } from "date-fns" // Keep date-fns for now

export function CallReportDrawer({ // Renamed component
  open,
  onOpenChange,
  datas,
}: CallReportDrawerProps) { // Use updated interface name
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      {datas ? (
        <DrawerContent className="overflow-x-hidden sm:max-w-lg dark:bg-gray-925">
          <DrawerHeader className="-px-6 w-full">
            <DrawerTitle className="flex w-full items-center justify-between">
              {/* Display Agent Name */}
              <span>{datas.name}</span>
              {/* Display Customer Number */}
              <span className="text-sm font-normal text-gray-600 dark:text-gray-400">{datas.customerNumber}</span>
            </DrawerTitle>
            <div className="mt-1 flex items-center justify-between">
              {/* Display Call Date */}
              <span className="text-left text-sm text-gray-500 dark:text-gray-500">
                {format(
                  new Date(datas.date), // Use 'date' field
                  "MMM dd, yyyy 'at' HH:mm", // Use HH for 24-hour format
                )}
              </span>
              {/* Display Call Status and Satisfaction (Placeholder Badges) */}
              <div className="flex gap-2">
                <Badge variant={datas.customerSatisfaction === 'Positive' ? 'success' : datas.customerSatisfaction === 'Negative' ? 'error' : 'neutral'}>
                  {datas.customerSatisfaction}
                </Badge>
                 <Badge variant={datas.callStatus === 'Answered' ? 'success' : datas.callStatus === 'Missed' || datas.callStatus === 'In Queue' ? 'warning' : datas.callStatus === 'Busy' || datas.callStatus === 'Dialing' ? 'error' : 'default'}>
                  {datas.callStatus}
                </Badge>
              </div>
            </div>
          </DrawerHeader>
          <DrawerBody className="-mx-6 overflow-y-scroll">
            <Tabs defaultValue="details">
              <TabsList className="px-6">
                <TabsTrigger value="details" className="px-4">
                  Details
                </TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="space-y-6 px-6">
                {/* Content for Call Report details will go here */}
                {/* Display Conversation Notes if available */}
                {datas?.conversationNotes && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-gray-50">Conversation Notes</h4>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{datas.conversationNotes}</p>
                  </div>
                )}
                 {/* Placeholder for Audio Recording Player/Link */}
                 {datas?.audioRecordingUrl && (
                   <div>
                     <h4 className="text-sm font-medium text-gray-900 dark:text-gray-50">Audio Recording</h4>
                     {/* TODO: Implement player or download link */}
                     <a href={datas.audioRecordingUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline dark:text-indigo-400">
                       Listen to recording
                     </a>
                   </div>
                 )}
              </TabsContent>
            </Tabs>
          </DrawerBody>
        </DrawerContent>
      ) : null}
    </Drawer>
  )
}
