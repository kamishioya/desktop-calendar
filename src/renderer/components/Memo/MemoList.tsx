import React, { useState } from 'react'
import { MemoEntry } from '../../../shared/types'
import MemoEditor from './MemoEditor'

interface MemoListProps {
  memos: MemoEntry[]
  onUpdate: (id: string, content: string) => void
  onDelete: (id: string) => void
}

const MemoList: React.FC<MemoListProps> = ({ memos, onUpdate, onDelete }) => {
  const [editingId, setEditingId] = useState<string | null>(null)

  if (memos.length === 0) {
    return (
      <p className="text-gray-600 text-xs text-center py-2">
        メモはありません
      </p>
    )
  }

  return (
    <div className="flex flex-col gap-1">
      {memos.map((memo) => (
        <div
          key={memo.id}
          className="group bg-white/5 rounded-md px-3 py-2 hover:bg-white/8 transition-colors"
        >
          {editingId === memo.id ? (
            <MemoEditor
              initialContent={memo.content}
              onSave={(content) => {
                onUpdate(memo.id, content)
                setEditingId(null)
              }}
              onCancel={() => setEditingId(null)}
              autoFocus
            />
          ) : (
            <div className="flex items-start justify-between gap-2">
              <p
                className="text-sm text-gray-300 whitespace-pre-wrap flex-1 cursor-pointer"
                onClick={() => setEditingId(memo.id)}
              >
                {memo.content}
              </p>
              <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                <button
                  onClick={() => setEditingId(memo.id)}
                  className="text-gray-500 hover:text-blue-400 p-1 rounded hover:bg-white/5 transition-colors"
                  title="編集"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </button>
                <button
                  onClick={() => onDelete(memo.id)}
                  className="text-gray-500 hover:text-red-400 p-1 rounded hover:bg-white/5 transition-colors"
                  title="削除"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default React.memo(MemoList)
