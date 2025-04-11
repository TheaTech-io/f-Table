"use client"
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
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"; // Path confirmed by shadcn output
import { Textarea } from "@/components/Textarea"; // Found in base components
import { Label } from "@/components/Label"; // Confirmed path from ls

import { Mic, Clock, Star, MessageSquareText, CircleCheck } from "lucide-react"; // Import icons (Removed Headphones)


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
              {/* Tab 1: Görüşme Metrikleri */}
              <TabsContent value="metrics" className="space-y-6 px-6 pt-4">
                {/* Audio Player */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-gray-50 mb-2">Ses Kaydı</h3>
                  {datas?.audioRecordingUrl ? (
                    <audio controls className="w-full h-10">
                      <source src={datas.audioRecordingUrl} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                  ) : (
                    <p className="text-sm text-gray-500 dark:text-gray-400">Ses kaydı bulunamadı.</p>
                  )}
                </div>

                {/* Transcript */}
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="transcript">
                    <AccordionTrigger className="text-sm font-medium text-gray-900 dark:text-gray-50">Görüşme Metni</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm text-gray-600 dark:text-gray-400 whitespace-pre-wrap">
                        {datas?.conversationNotes || "Görüşme metni bulunamadı."}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                {/* Key Metrics */}
                <div>
                   <h3 className="text-sm font-medium text-gray-900 dark:text-gray-50 mb-3">Önemli Metrikler</h3>
                   <dl className="grid grid-cols-2 gap-x-4 gap-y-4">
                     <div className="flex items-center gap-2">
                       <Mic className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                       <dt className="text-xs text-gray-500 dark:text-gray-400">Ton:</dt>
                       <dd className="text-xs font-medium text-gray-900 dark:text-gray-50">Nötr</dd> {/* Placeholder */}
                     </div>
                     <div className="flex items-center gap-2">
                       <Star className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                       <dt className="text-xs text-gray-500 dark:text-gray-400">Nezaket:</dt>
                       <dd className="text-xs font-medium text-gray-900 dark:text-gray-50">Yüksek</dd> {/* Placeholder */}
                     </div>
                     <div className="flex items-center gap-2">
                       <MessageSquareText className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                       <dt className="text-xs text-gray-500 dark:text-gray-400">Anahtar Kelimeler:</dt>
                       <dd className="text-xs font-medium text-gray-900 dark:text-gray-50">İptal, Fatura</dd> {/* Placeholder */}
                     </div>
                     <div className="flex items-center gap-2">
                       <Clock className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                       <dt className="text-xs text-gray-500 dark:text-gray-400">Süre:</dt>
                       <dd className="text-xs font-medium text-gray-900 dark:text-gray-50">03:45</dd> {/* Placeholder */}
                     </div>
                   </dl>
                </div>
              </TabsContent>
              {/* Tab 2: Duygusal Analiz */}
              <TabsContent value="sentiment" className="space-y-6 px-6 pt-4">
                 <h3 className="text-sm font-medium text-gray-900 dark:text-gray-50 mb-3">Duygusal Analiz Yüzdeleri</h3>
                 {/* Sentiment Bars - Placeholder Implementation */}
                 <div className="space-y-3">
                   {/* Example Bar 1: Olumlu */}
                   <div className="flex items-center gap-2">
                     <span className="text-xs text-gray-500 dark:text-gray-400 w-16 shrink-0">Olumlu</span>
                     <div className="h-2 flex-grow bg-gray-200 dark:bg-gray-700 rounded-full">
                       <div className="h-full bg-green-500 rounded-full" style={{ width: '65%' }}></div> {/* Placeholder % */}
                     </div>
                     <span className="text-xs font-medium text-gray-900 dark:text-gray-50">65%</span> {/* Placeholder % */}
                   </div>
                   {/* Example Bar 2: Olumsuz */}
                   <div className="flex items-center gap-2">
                     <span className="text-xs text-gray-500 dark:text-gray-400 w-16 shrink-0">Olumsuz</span>
                     <div className="h-2 flex-grow bg-gray-200 dark:bg-gray-700 rounded-full">
                       <div className="h-full bg-red-500 rounded-full" style={{ width: '15%' }}></div> {/* Placeholder % */}
                     </div>
                     <span className="text-xs font-medium text-gray-900 dark:text-gray-50">15%</span> {/* Placeholder % */}
                   </div>
                   {/* Example Bar 3: Nötr */}
                   <div className="flex items-center gap-2">
                     <span className="text-xs text-gray-500 dark:text-gray-400 w-16 shrink-0">Nötr</span>
                     <div className="h-2 flex-grow bg-gray-200 dark:bg-gray-700 rounded-full">
                       <div className="h-full bg-gray-500 rounded-full" style={{ width: '20%' }}></div> {/* Placeholder % */}
                     </div>
                     <span className="text-xs font-medium text-gray-900 dark:text-gray-50">20%</span> {/* Placeholder % */}
                   </div>
                    {/* Add more bars as needed (Acil, Kibar, etc.) */}
                 </div>

                 <div className="pt-4">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-gray-50 mb-2">Müşteri Duygu Durumu</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Orta, Sakin (Skor: 0.1)</p> {/* Placeholder */}
                 </div>
              </TabsContent>
              {/* Tab 3: Aksiyon Önerileri */}
              <TabsContent value="actions" className="space-y-6 px-6 pt-4">
                 <h3 className="text-sm font-medium text-gray-900 dark:text-gray-50 mb-3">
                   Aksiyon Önerileri
                 </h3>
                 {/* Action Items List - Placeholder Implementation */}
                 <ul role="list" className="space-y-6">
                   {/* Example Action Item 1 */}
                   <li className="relative flex flex-col gap-y-2">
                     <div className="flex gap-x-3 items-start">
                       <CircleCheck className="h-5 w-5 text-blue-500 mt-0.5 flex-none" aria-hidden="true" />
                       <p className="text-sm text-gray-700 dark:text-gray-300">Müşteriye geri ödeme süreci hakkında bilgi verin.</p> {/* Placeholder Action */}
                     </div>
                     {/* Comments for Action 1 */}
                     <div className="pl-8 space-y-2">
                       {/* Existing Comment Example */}
                       <div className="text-xs text-gray-500 dark:text-gray-400">
                         <span className="font-medium text-gray-600 dark:text-gray-300">Ahmet Yılmaz:</span> Bilgi verildi. (2 saat önce)
                       </div>
                       {/* Add Comment Form */}
                       <form className="relative">
                         <Label htmlFor="comment-1" className="sr-only">Add comment for action 1</Label>
                         <Textarea id="comment-1" name="comment-1" rows={2} placeholder="Add your comment..." className="text-xs"/>
                         {/* Add submit button if needed */}
                       </form>
                     </div>
                   </li>
                   {/* Example Action Item 2 */}
                   <li className="relative flex flex-col gap-y-2">
                     <div className="flex gap-x-3 items-start">
                       <CircleCheck className="h-5 w-5 text-blue-500 mt-0.5 flex-none" aria-hidden="true" />
                       <p className="text-sm text-gray-700 dark:text-gray-300">Teknik ekibe fatura hatasıyla ilgili bildirim yapın.</p> {/* Placeholder Action */}
                     </div>
                      {/* Comments for Action 2 */}
                     <div className="pl-8 space-y-2">
                       {/* No existing comments example */}
                       {/* Add Comment Form */}
                       <form className="relative">
                         <Label htmlFor="comment-2" className="sr-only">Add comment for action 2</Label>
                         <Textarea id="comment-2" name="comment-2" rows={2} placeholder="Add your comment..." className="text-xs"/>
                       </form>
                     </div>
                   </li>
                   {/* Add more action items as needed */}
                 </ul>
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
