export interface MemoEntry {
  id: string
  date: string          // "YYYY-MM-DD"
  content: string
  createdAt: string     // ISO 8601
  updatedAt: string     // ISO 8601
}

export interface AppSettings {
  opacity: number           // 0.3 - 1.0
  alwaysOnTop: boolean
  position: { x: number; y: number }
  size: { width: number; height: number }
  theme: 'dark' | 'light'
  startWithWindows: boolean
  firstDayOfWeek: 0 | 1    // 0: Sunday, 1: Monday
}

export interface StoreSchema {
  memos: MemoEntry[]
  settings: AppSettings
}

export const DEFAULT_SETTINGS: AppSettings = {
  opacity: 0.85,
  alwaysOnTop: true,
  position: { x: 100, y: 100 },
  size: { width: 400, height: 500 },
  theme: 'dark',
  startWithWindows: false,
  firstDayOfWeek: 0
}
