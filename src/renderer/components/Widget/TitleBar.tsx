import React from 'react'

interface TitleBarProps {
  isPinned: boolean
  onTogglePin: () => void | Promise<void>
  onToggleSettings: () => void
}

const TitleBar: React.FC<TitleBarProps> = ({ isPinned, onTogglePin, onToggleSettings }) => {

  const handleMinimize = (): void => {
    if (!window.api?.window) return
    window.api.window.minimize()
  }

  const handleClose = (): void => {
    if (!window.api?.window) return
    window.api.window.close()
  }

  const handleTogglePin = (): void => {
    void onTogglePin()
  }

  return (
    <div
      className="flex items-center justify-between pl-3 pr-1 py-1.5 rounded-t-lg border-b border-white/10"
      style={{ WebkitAppRegion: 'drag' } as React.CSSProperties}
    >
      {/* Left: Title */}
      <span className="text-xs text-gray-200 font-medium select-none">
        カレンダー & メモ
      </span>

      {/* Right: Window controls */}
      <div
        className="flex items-center gap-0.5"
        style={{ WebkitAppRegion: 'no-drag' } as React.CSSProperties}
      >
        <button
          onClick={handleMinimize}
          className="h-6 w-6 rounded text-gray-300 hover:bg-white/10 transition-colors leading-none"
          title="最小化"
        >
          −
        </button>
        <button
          onClick={handleTogglePin}
          className={`h-6 px-2 rounded text-[10px] leading-none transition-colors ${
            isPinned
              ? 'bg-blue-500/25 text-blue-300 hover:bg-blue-500/35'
              : 'text-gray-300 hover:bg-white/10'
          }`}
          title={isPinned ? '最前面表示を解除' : '最前面に固定'}
        >
          {isPinned ? '固定中' : '固定'}
        </button>
        <button
          onClick={onToggleSettings}
          className="h-6 px-2 rounded text-xs text-gray-300 hover:bg-white/10 transition-colors"
          title="設定"
        >
          設定
        </button>
        <button
          onClick={handleClose}
          className="h-6 w-6 rounded text-gray-300 hover:bg-red-500/80 hover:text-white transition-colors leading-none"
          title="トレイに格納"
        >
          ×
        </button>
      </div>
    </div>
  )
}

export default React.memo(TitleBar)
