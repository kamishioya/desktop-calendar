import { create } from 'zustand'
import { AppSettings, DEFAULT_SETTINGS } from '../../shared/types'

interface SettingsState {
  settings: AppSettings
  isLoaded: boolean

  loadSettings: () => Promise<void>
  updateSettings: (settings: Partial<AppSettings>) => Promise<void>
}

export const useSettingsStore = create<SettingsState>((set, get) => ({
  settings: DEFAULT_SETTINGS,
  isLoaded: false,

  loadSettings: async (): Promise<void> => {
    if (!window.api?.settings) {
      console.warn('[settingsStore] window.api.settings is not available (preload not loaded)')
      set({ isLoaded: true })
      return
    }
    try {
      const settings = await window.api.settings.get()
      set({ settings, isLoaded: true })
    } catch (error) {
      console.error('Failed to load settings:', error)
      set({ isLoaded: true })
    }
  },

  updateSettings: async (partial: Partial<AppSettings>): Promise<void> => {
    if (!window.api?.settings) {
      console.error('[settingsStore] window.api.settings is not available')
      return
    }
    try {
      const updated = await window.api.settings.set(partial)
      set({ settings: updated })
    } catch (error) {
      console.error('Failed to update settings:', error)
    }
  }
}))
