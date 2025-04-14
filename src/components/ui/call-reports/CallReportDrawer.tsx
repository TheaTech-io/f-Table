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
import { Textarea } from "@/components/Textarea"; // Found in base components
import { Label } from "@/components/Label"; // Confirmed path from ls

import { Mic, Clock, Star, MessageSquareText, CircleCheck } from "lucide-react"; // Import icons (Mic, Clock, Star, MessageSquareText used in Tab 2)


import { Badge, BadgeProps } from "@/components/Badge" // Correct path
import { format, parse } from "date-fns" // Correct path

interface CallReportDrawerProps { // Renamed interface
  open: boolean
  onOpenChange: (open: boolean) => void
  datas: CallReport | undefined // Changed type to CallReport
}


export function CallReportDrawer({ // Renamed component
  open,
  onOpenChange,
  datas,
}: CallReportDrawerProps) {

  const [actionComments, setActionComments] = React.useState<{ [key: number]: string[] }>({
    0: ["Ahmet Yılmaz: Bilgi verildi. (2 saat önce)"], // Pre-populate with example
    2: ["Ayşe Demir: Talep alındı, ilgili birime iletildi. (Dün 15:30)", "Mehmet Kaya: İptal işlemi tamamlandı. (Bugün 09:15)"] // Pre-populate with example
  });
  const [tempComments, setTempComments] = React.useState<{ [key: number]: string }>({});

  const handleSaveComments = () => {
    const newActionComments = { ...actionComments };
    Object.keys(tempComments).forEach((keyStr) => {
      const key = parseInt(keyStr, 10);
      const comment = tempComments[key];
      if (comment && comment.trim() !== "") {
        if (!newActionComments[key]) {
          newActionComments[key] = [];
        }
        newActionComments[key].push(`You: ${comment.trim()}`); // Trim comment
      }
    });
    setActionComments(newActionComments);
    setTempComments({}); // Clear temporary input fields
  };

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
        <DrawerContent className="overflow-x-hidden sm:max-w-lg dark:bg-gray-900">
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

                {/* Transcript Section */}
                <div className="mt-4">
                  <h4 className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Görüşme Metni</h4>
                  <div className="max-h-[300px] overflow-y-auto p-3 rounded bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                    <div className="text-sm text-gray-600 dark:text-gray-400 whitespace-pre-wrap">
                      <p><strong>Agent:</strong> Merhaba, TheaTech'e hoş geldiniz, ben Ayşe, nasıl yardımcı olabilirim?</p>
                      <p><strong>User:</strong> Merhaba Ayşe Hanım, geçen hafta sipariş ettiğim ürünle ilgili bir sorun yaşıyorum.</p>
                      <p><strong>Agent:</strong> Anladım efendim, sipariş numaranızı alabilir miyim lütfen?</p>
                      <p><strong>User:</strong> Tabii, 123456789. Ürün elime ulaştı ama yanlış renk gönderilmiş.</p>
                      <p><strong>Agent:</strong> Hemen kontrol ediyorum... Evet, sistemde bir hata olmuş görünüyor, çok özür dileriz. Doğru ürünün gönderimi için hemen yeni bir kayıt oluşturuyorum.</p>
                      <p><strong>User:</strong> Ne kadar sürede elimde olur?</p>
                      <p><strong>Agent:</strong> Standart kargo ile 2-3 iş günü içinde size ulaşacaktır efendim. Gecikme için tekrar kusura bakmayın. Size bir indirim kuponu tanımlamamı ister misiniz?</p>
                      <p><strong>User:</strong> Olur, teşekkür ederim.</p>
                      <p><strong>Agent:</strong> Rica ederim, başka yardımcı olabileceğim bir konu var mıydı?</p>
                      <p><strong>User:</strong> Hayır, teşekkürler.</p>
                      <p><strong>Agent:</strong> İyi günler dileriz efendim.</p>
                      <p><strong>Agent:</strong> Merhaba, TheaTech'e hoş geldiniz, ben Ayşe, nasıl yardımcı olabilirim?</p>
                      <p><strong>User:</strong> Merhaba Ayşe Hanım, geçen hafta sipariş ettiğim ürünle ilgili bir sorun yaşıyorum.</p>
                      <p><strong>Agent:</strong> Anladım efendim, sipariş numaranızı alabilir miyim lütfen?</p>
                      <p><strong>User:</strong> Tabii, 123456789. Ürün elime ulaştı ama yanlış renk gönderilmiş.</p>
                      <p><strong>Agent:</strong> Hemen kontrol ediyorum... Evet, sistemde bir hata olmuş görünüyor, çok özür dileriz. Doğru ürünün gönderimi için hemen yeni bir kayıt oluşturuyorum.</p>
                      <p><strong>User:</strong> Ne kadar sürede elimde olur?</p>
                      <p><strong>Agent:</strong> Standart kargo ile 2-3 iş günü içinde size ulaşacaktır efendim. Gecikme için tekrar kusura bakmayın. Size bir indirim kuponu tanımlamamı ister misiniz?</p>
                      <p><strong>User:</strong> Olur, teşekkür ederim.</p>
                      <p><strong>Agent:</strong> Rica ederim, başka yardımcı olabileceğim bir konu var mıydı?</p>
                      <p><strong>User:</strong> Hayır, teşekkürler.</p>
                      <p><strong>Agent:</strong> İyi günler dileriz efendim.</p>
                    </div>
                  </div>
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
                  </div>
                   {/* Example Bar 4: Acil */}
                   <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 dark:text-gray-400 w-16 shrink-0">Acil</span>
                    <div className="h-2 flex-grow bg-gray-200 dark:bg-gray-700 rounded-full">
                      <div className="h-full bg-orange-500 rounded-full" style={{ width: '5%' }}></div> {/* Placeholder % */}
                    </div>
                    <span className="text-xs font-medium text-gray-900 dark:text-gray-50">5%</span> {/* Placeholder % */}
                  </div>
                   {/* Example Bar 5: Kibar */}
                   <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 dark:text-gray-400 w-16 shrink-0">Kibar</span>
                    <div className="h-2 flex-grow bg-gray-200 dark:bg-gray-700 rounded-full">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: '80%' }}></div> {/* Placeholder % */}
                    </div>
                    <span className="text-xs font-medium text-gray-900 dark:text-gray-50">80%</span> {/* Placeholder % */}
                  </div>
                </div> {/* End of Sentiment Bars */}

                {/* Key Metrics Section (Moved to bottom) */}
                <div className="p-4 border rounded-md border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/30 mt-6"> {/* Added mt-6 for spacing */}
                  <h3 className="text-base font-semibold mb-4 text-gray-800 dark:text-gray-100">Önemli Metrikler</h3>
                  <div className="space-y-3">
                    {/* Ton */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-x-2">
                        <Mic className="size-5 text-blue-500" />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Ton</span>
                      </div>
                      <Badge variant="neutral">Nötr</Badge>
                    </div>
                    {/* Nezaket Düzeyi */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-x-2">
                        <Star className="size-5 text-green-500" />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Nezaket Düzeyi</span>
                      </div>
                      <Badge variant="success">Yüksek</Badge>
                    </div>
                    {/* Öne Çıkan Kelimeler */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-x-2">
                        <MessageSquareText className="size-5 text-purple-500" />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Öne Çıkan Kelimeler</span>
                      </div>
                      <span className="text-sm text-gray-800 dark:text-gray-200">İptal, Fatura</span>
                    </div>
                    {/* Çağrı Süresi */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-x-2">
                        <Clock className="size-5 text-orange-500" />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Çağrı Süresi</span>
                      </div>
                      <span className="text-sm font-medium text-gray-800 dark:text-gray-200">03:45</span>
                    </div>
                     {/* Müşteri Duygu Durumu (Moved inside) */}
                    <div className="flex items-center justify-between pt-2 border-t border-blue-100 dark:border-blue-800/50"> {/* Added separator */}
                       <div className="flex items-center gap-x-2">
                         {/* Consider adding an icon here if desired */}
                         <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Müşteri Duygu Durumu</span>
                       </div>
                       <span className="text-sm text-gray-600 dark:text-gray-400">Orta, Sakin (Skor: 0.1)</span> {/* Placeholder */}
                    </div>
                  </div>
                </div>
             </TabsContent>
             {/* Tab 3: Aksiyon Önerileri */}
             <TabsContent value="actions" className="space-y-6 px-6 pt-4">
                <h3 className="text-sm font-medium text-gray-900 dark:text-gray-50 mb-3">
                  Aksiyon Önerileri
                </h3>
                {/* Action Items List - Placeholder Implementation */}
                <ul role="list" className="space-y-6">
                  {/* Action Items List - Placeholder Implementation */}
                  {[
                    "Müşteriye geri ödeme süreci hakkında bilgi verin.",
                    "Teknik ekibe fatura hatasıyla ilgili bildirim yapın.",
                    "Müşterinin abonelik iptal talebini işleme alın."
                  ].map((actionText, index) => (
                    <li key={index} className="relative flex flex-col gap-y-2">
                      <div className="flex gap-x-3 items-start">
                        <CircleCheck className="h-5 w-5 text-blue-500 mt-0.5 flex-none" aria-hidden="true" />
                        <p className="text-sm text-gray-700 dark:text-gray-300">{actionText}</p>
                      </div>
                      {/* Comments Section */}
                      <div className="pl-8 space-y-2">
                        {/* Display Existing Comments */}
                        {actionComments[index]?.map((comment, commentIndex) => (
                          <div key={commentIndex} className="text-xs text-gray-500 dark:text-gray-400">
                            {/* Basic parsing for display */}
                            {comment.startsWith("You:") ? (
                              <>
                                <span className="font-medium text-gray-600 dark:text-gray-300">You:</span>
                                {comment.substring(4)}
                              </>
                            ) : (
                              comment // Display pre-populated/other comments as is
                            )}
                          </div>
                        ))}
                        {/* Add Comment Form */}
                        <div className="relative"> {/* Removed form tag */}
                          <Label htmlFor={`comment-${index}`} className="sr-only">Add comment for action {index + 1}</Label>
                          <Textarea
                            id={`comment-${index}`}
                            name={`comment-${index}`}
                            rows={2}
                            placeholder="Add your comment..."
                            className="text-xs"
                            value={tempComments[index] || ""}
                            onChange={(e) => {
                              const newTempComments = { ...tempComments };
                              newTempComments[index] = e.target.value;
                              setTempComments(newTempComments);
                            }}
                          />
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
             </TabsContent>
           </Tabs>
         </DrawerBody>
          {/* Updated Footer */}
          <DrawerFooter className="-mx-6 -mb-2 gap-2 bg-white px-6 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700"> {/* Added border */}
            {/* Save Button */}
            <Button className="w-full" onClick={handleSaveComments}>
              Kaydet
            </Button>
            {/* Close Button */}
            <DrawerClose asChild>
              <Button variant="secondary" className="w-full">
                Kapat
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      ) : null}
    </Drawer>
  )
}
