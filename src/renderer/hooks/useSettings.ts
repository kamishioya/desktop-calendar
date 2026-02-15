import { useEffect } from 'react'
import { useSettingsStore } from '../stores/settingsStore'
import { AppSettings } from '../../shared/types'

interface UseSettingsReturn {
  settings: AppSettings
  isLoaded: boolean
  updateSettings: (settings: Partial<AppSettings>) => Promise<void>
}

export function useSettings(): UseSettingsReturn {
  const { settings, isLoaded, loadSettings, updateSettings } = useSettingsStore()

  useEffect(() => {
    if (!isLoaded) {
      loadSettings()
    }
  }, [isLoaded, loadSettings])

  return { settings, isLoaded, updateSettings }
}
