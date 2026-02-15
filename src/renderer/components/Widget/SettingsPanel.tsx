import React from 'react'
import { AppSettings } from '../../../shared/types'

interface SettingsPanelProps {
  settings: AppSettings
  onUpdate: (settings: Partial<AppSettings>) => void
  onClose: () => void
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ settings, onUpdate, onClose }) => {
  return (
    <div className="px-3 py-2 border-t border-white/10 bg-black/20">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xs text-gray-200 font-medium">設定</h3>
        <button
          onClick={onClose}
          className="h-6 w-6 rounded text-gray-400 hover:bg-white/10 hover:text-gray-200 text-xs transition-colors"
        >
          ✕
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {/* Opacity slider */}
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-300">
            透過度: {Math.round(settings.opacity * 100)}%
          </label>
          <input
            type="range"
            min="30"
            max="100"
            value={Math.round(settings.opacity * 100)}
            onChange={(e) => onUpdate({ opacity: Number(e.target.value) / 100 })}
            className="w-full h-1.5 bg-white/10 rounded appearance-none cursor-pointer accent-blue-500"
          />
        </div>

        {/* First day of week */}
        <div className="flex items-center justify-between">
          <label className="text-xs text-gray-300">週の開始日</label>
          <select
            value={settings.firstDayOfWeek}
            onChange={(e) => onUpdate({ firstDayOfWeek: Number(e.target.value) as 0 | 1 })}
            className="h-7 text-xs bg-zinc-800 border border-white/15 rounded px-2 text-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500/50"
          >
            <option value={0}>日曜日</option>
            <option value={1}>月曜日</option>
          </select>
        </div>

        {/* Always on top */}
        <div className="flex items-center justify-between">
          <label className="text-xs text-gray-300">常に最前面</label>
          <button
            onClick={() => onUpdate({ alwaysOnTop: !settings.alwaysOnTop })}
            className={`h-7 min-w-16 px-2 rounded border text-xs font-medium transition-colors ${
              settings.alwaysOnTop
                ? 'bg-blue-500/25 border-blue-400/40 text-blue-200'
                : 'bg-zinc-800 border-white/15 text-gray-200 hover:bg-zinc-700'
            }`}
          >
            {settings.alwaysOnTop ? 'オン' : 'オフ'}
          </button>
        </div>

        {/* Auto start */}
        <div className="flex items-center justify-between">
          <label className="text-xs text-gray-300">Windows起動時に起動</label>
          <button
            onClick={() => onUpdate({ startWithWindows: !settings.startWithWindows })}
            className={`h-7 min-w-16 px-2 rounded border text-xs font-medium transition-colors ${
              settings.startWithWindows
                ? 'bg-blue-500/25 border-blue-400/40 text-blue-200'
                : 'bg-zinc-800 border-white/15 text-gray-200 hover:bg-zinc-700'
            }`}
          >
            {settings.startWithWindows ? 'オン' : 'オフ'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default React.memo(SettingsPanel)
