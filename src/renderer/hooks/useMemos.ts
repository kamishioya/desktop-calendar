import { useEffect, useState, useCallback } from 'react'
import { format } from 'date-fns'
import { useMemoStore } from '../stores/memoStore'
import { MemoEntry } from '../../shared/types'

interface UseMemosReturn {
  dateMemos: MemoEntry[]
  memoDates: Set<string>
  isLoading: boolean
  addMemo: (content: string) => Promise<void>
  updateMemo: (id: string, content: string) => Promise<void>
  deleteMemo: (id: string) => Promise<void>
}

export function useMemos(selectedDate: Date): UseMemosReturn {
  const {
    memos,
    memoDates,
    isLoading,
    loadAllMemos,
    addMemo: storeAddMemo,
    updateMemo: storeUpdateMemo,
    deleteMemo: storeDeleteMemo
  } = useMemoStore()

  const [dateMemos, setDateMemos] = useState<MemoEntry[]>([])

  const dateStr = format(selectedDate, 'yyyy-MM-dd')

  // Load all memos on mount
  useEffect(() => {
    loadAllMemos()
  }, [])

  // Filter memos for selected date
  useEffect(() => {
    const filtered = memos.filter((m) => m.date === dateStr)
    setDateMemos(filtered)
  }, [memos, dateStr])

  const addMemo = useCallback(
    async (content: string): Promise<void> => {
      await storeAddMemo(dateStr, content)
    },
    [dateStr, storeAddMemo]
  )

  const updateMemo = useCallback(
    async (id: string, content: string): Promise<void> => {
      await storeUpdateMemo(id, content)
    },
    [storeUpdateMemo]
  )

  const deleteMemo = useCallback(
    async (id: string): Promise<void> => {
      await storeDeleteMemo(id)
    },
    [storeDeleteMemo]
  )

  return {
    dateMemos,
    memoDates,
    isLoading,
    addMemo,
    updateMemo,
    deleteMemo
  }
}
