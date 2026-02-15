import React, { useState, useRef, useEffect } from 'react'

interface MemoEditorProps {
  initialContent?: string
  onSave: (content: string) => void
  onCancel?: () => void
  placeholder?: string
  autoFocus?: boolean
}

const MemoEditor: React.FC<MemoEditorProps> = ({
  initialContent = '',
  onSave,
  onCancel,
  placeholder = 'メモを入力...',
  autoFocus = true
}) => {
  const [content, setContent] = useState(initialContent)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (autoFocus && textareaRef.current) {
      textareaRef.current.focus()
    }
  }, [autoFocus])

  const handleKeyDown = (e: React.KeyboardEvent): void => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault()
      if (content.trim()) {
        onSave(content.trim())
        setContent('')
      }
    }
    if (e.key === 'Escape' && onCancel) {
      onCancel()
    }
  }

  const handleSave = (): void => {
    if (content.trim()) {
      onSave(content.trim())
      setContent('')
    }
  }

  return (
    <div className="flex flex-col gap-1">
      <textarea
        ref={textareaRef}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="w-full bg-white/5 border border-white/10 rounded-md px-3 py-2 text-sm text-gray-200 placeholder-gray-500 resize-none focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/50"
        rows={3}
      />
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-600">Ctrl+Enter で保存</span>
        <div className="flex gap-1">
          {onCancel && (
            <button
              onClick={onCancel}
              className="text-xs text-gray-500 hover:text-gray-300 px-2 py-1 rounded hover:bg-white/5 transition-colors"
            >
              キャンセル
            </button>
          )}
          <button
            onClick={handleSave}
            disabled={!content.trim()}
            className="text-xs text-blue-400 hover:text-blue-300 px-2 py-1 rounded hover:bg-blue-500/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            保存
          </button>
        </div>
      </div>
    </div>
  )
}

export default React.memo(MemoEditor)
