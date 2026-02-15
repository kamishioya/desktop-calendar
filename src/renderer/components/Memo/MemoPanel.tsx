import React, { useState } from 'react'
import { format } from 'date-fns'
import { ja } from 'date-fns/locale'
import { MemoEntry } from '../../../shared/types'
import MemoEditor from './MemoEditor'
import MemoList from './MemoList'

interface MemoPanelProps {
  selectedDate: Date
  memos: MemoEntry[]
  onAdd: (content: string) => void
  onUpdate: (id: string, content: string) => void
  onDelete: (id: string) => void
}

const MemoPanel: React.FC<MemoPanelProps> = ({
  selectedDate,
  memos,
  onAdd,
  onUpdate,
  onDelete
}) => {
  const [showEditor, setShowEditor] = useState(false)
  const dateLabel = format(selectedDate, 'M/d (E)', { locale: ja })

  return (
    <div className="flex flex-col gap-2 px-2 pb-2 flex-1 min-h-0">
      {/* Header */}
      <div className="flex items-center justify-between border-t border-white/10 pt-2">
        <h3 className="text-xs text-gray-400 font-medium">
          📝 {dateLabel} のメモ
        </h3>
        <button
          onClick={() => setShowEditor(!showEditor)}
          className="text-xs text-blue-400 hover:text-blue-300 px-2 py-0.5 rounded hover:bg-blue-500/10 transition-colors"
        >
          {showEditor ? '閉じる' : '+ 追加'}
        </button>
      </div>

      {/* Editor */}
      {showEditor && (
        <MemoEditor
          onSave={(content) => {
            onAdd(content)
            setShowEditor(false)
          }}
          onCancel={() => setShowEditor(false)}
        />
      )}

      {/* Memo list */}
      <div className="flex-1 overflow-y-auto min-h-0">
        <MemoList
          memos={memos}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      </div>
    </div>
  )
}

export default React.memo(MemoPanel)
