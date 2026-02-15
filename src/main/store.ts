import Store from 'electron-store'
import { StoreSchema, AppSettings, MemoEntry, DEFAULT_SETTINGS } from '../shared/types'

let store: Store<StoreSchema>

export function initStore(): void {
  store = new Store<StoreSchema>({
    defaults: {
      memos: [],
      settings: DEFAULT_SETTINGS
    }
  })
}

export function getStore(): Store<StoreSchema> {
  return store
}

// Settings
export function getSettings(): AppSettings {
  if (!store) {
    return DEFAULT_SETTINGS
  }
  return store.get('settings')
}

export function setSettings(settings: Partial<AppSettings>): AppSettings {
  const current = store.get('settings')
  const updated = { ...current, ...settings }
  store.set('settings', updated)
  return updated
}

// Memos
export function getAllMemos(): MemoEntry[] {
  if (!store) {
    console.error('[store] Store not initialized')
    return []
  }
  const memos = store.get('memos')
  return memos
}

export function getMemosByDate(date: string): MemoEntry[] {
  if (!store) {
    console.error('[store] Store not initialized')
    return []
  }
  const memos = store.get('memos')
  return memos.filter((m) => m.date === date)
}

export function saveMemo(memo: MemoEntry): MemoEntry {
  if (!store) {
    console.error('[store] Store not initialized')
    throw new Error('Store not initialized')
  }
  const memos = store.get('memos')
  let savedMemo: MemoEntry
  const index = memos.findIndex((m) => m.id === memo.id)
  if (index >= 0) {
    savedMemo = { ...memo, updatedAt: new Date().toISOString() }
    memos[index] = savedMemo
  } else {
    savedMemo = {
      ...memo,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    memos.push(savedMemo)
  }
  store.set('memos', memos)
  return savedMemo
}

export function deleteMemo(id: string): boolean {
  const memos = store.get('memos')
  const filtered = memos.filter((m) => m.id !== id)
  if (filtered.length === memos.length) return false
  store.set('memos', filtered)
  return true
}
