import React, { useState } from 'react'
import TitleBar from './TitleBar'
import SettingsPanel from './SettingsPanel'
import { AppSettings } from '../../../shared/types'

interface WidgetContainerProps {
  settings: AppSettings
  onUpdateSettings: (settings: Partial<AppSettings>) => void | Promise<void>
  children: React.ReactNode
}

const WidgetContainer: React.FC<WidgetContainerProps> = ({
  settings,
  onUpdateSettings,
  children
}) => {
  const [showSettings, setShowSettings] = useState(false)

  return (
    <div className="widget-container w-full h-screen flex flex-col">
      <TitleBar
        isPinned={settings.alwaysOnTop}
        onTogglePin={() => onUpdateSettings({ alwaysOnTop: !settings.alwaysOnTop })}
        onToggleSettings={() => setShowSettings(!showSettings)}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        {children}
      </div>
      {showSettings && (
        <SettingsPanel
          settings={settings}
          onUpdate={onUpdateSettings}
          onClose={() => setShowSettings(false)}
        />
      )}
    </div>
  )
}

export default React.memo(WidgetContainer)
