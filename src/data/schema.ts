export type Usage = {
  owner: string
  status: string
  costs: number
  region: string
  stability: number
  lastEdited: string
}

export type CallReport = {
  id: string // Add an ID for key prop
  name: string // Replaces 'owner'
  date: string // Replaces 'lastEdited', format MM/DD/YYYY HH:MM
  audioRecordingUrl?: string // Placeholder for URL or identifier
  customerSatisfaction: "Positive" | "Negative" | "Neutral" // Replaces 'status' logic
  callStatus: "Answered" | "Busy" | "Missed" | "In Queue" | "Dialing" // Added "In Queue", "Dialing"
  customerNumber: string // New field, format +1 XXX-XXX-XXXX
  conversationNotes?: string // New field, placeholder text
  stability: number // Re-added field
}


export type OverviewData = {
  date: string
  "Rows written": number
  "Rows read": number
  Queries: number
  "Payments completed": number
  "Sign ups": number
  Logins: number
  "Sign outs": number
  "Support calls": number
}

export type SentimentReport = {
  id: string;
  duygular: { icon: string; text: "Olumlu" | "Olumsuz" | "Nötr" };
  memnuniyet: "Düşük" | "Orta" | "Yüksek";
  musteriMemnuniyeti: { icon: string; text: "Positive" | "Negative" | "Neutral" };
  oncelik: "Düşük" | "Kritik" | "Yüksek" | "Orta";
  istek: string; // e.g., "Fatura Sorunu", "Ürün Bilgisi", etc.
};
