import { create } from 'zustand'
import { MemoEntry } from '../../shared/types'
import { v4 as uuidv4 } from 'uuid'

interface MemoState {
  memos: MemoEntry[]
  isLoading: boolean
  memoDates: Set<string>

  loadAllMemos: () => Promise<void>
  loadMemosByDate: (date: string) => Promise<MemoEntry[]>
  addMemo: (date: string, content: string) => Promise<void>
  updateMemo: (id: string, content: string) => Promise<void>
  deleteMemo: (id: string) => Promise<void>
}

export const useMemoStore = create<MemoState>((set, get) => ({
  memos: [],
  isLoading: false,
  memoDates: new Set<string>(),

  loadAllMemos: async (): Promise<void> => {
    if (!window.api?.memo) {
      set({ isLoading: false })
      return
    }
    set({ isLoading: true })
    try {
      const memos = await window.api.memo.getAll()
      const dates = new Set(memos.map((m) => m.date))
      set({ memos, memoDates: dates, isLoading: false })
    } catch (error) {
      console.error('[memoStore] Failed to load memos:', error)
      set({ isLoading: false })
      throw error
    }
  },

  loadMemosByDate: async (date: string): Promise<MemoEntry[]> => {
    try {
      const memos = await window.api.memo.getByDate(date)
      return memos
    } catch (error) {
      console.error('Failed to load memos by date:', error)
      return []
    }
  },

  addMemo: async (date: string, content: string): Promise<void> => {
    if (!window.api?.memo) {
      console.error('[memoStore] window.api.memo is not available')
      return
    }
    try {
      const now = new Date().toISOString()
      const memo: MemoEntry = {
        id: uuidv4(),
        date,
        content,
        createdAt: now,
        updatedAt: now
      }
      await window.api.memo.save(memo)
      await get().loadAllMemos()
    } catch (error) {
      console.error('[memoStore] Failed to add memo:', error)
      throw error
    }
  },

  updateMemo: async (id: string, content: string): Promise<void> => {
    if (!window.api?.memo) return
    try {
      const memos = get().memos
      const existing = memos.find((m) => m.id === id)
      if (!existing) return
      const updated: MemoEntry = {
        ...existing,
        content,
        updatedAt: new Date().toISOString()
      }
      await window.api.memo.save(updated)
      await get().loadAllMemos()
    } catch (error) {
      console.error('Failed to update memo:', error)
    }
  },

  deleteMemo: async (id: string): Promise<void> => {
    if (!window.api?.memo) return
    try {
      await window.api.memo.delete(id)
      await get().loadAllMemos()
    } catch (error) {
      console.error('Failed to delete memo:', error)
    }
  }
}))
