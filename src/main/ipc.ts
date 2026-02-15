import { ipcMain, BrowserWindow } from 'electron'
import { getAllMemos, getMemosByDate, saveMemo, deleteMemo, getSettings, setSettings } from './store'
import { MemoEntry, AppSettings } from '../shared/types'
import { applyAutoStart } from './autostart'

export function registerIpcHandlers(mainWindow: BrowserWindow): void {
  // Memo handlers
  ipcMain.handle('memo:getAll', () => {
    return getAllMemos()
  })

  ipcMain.handle('memo:getByDate', (_event, date: string) => {
    return getMemosByDate(date)
  })

  ipcMain.handle('memo:save', (_event, memo: MemoEntry) => {
    try {
      const result = saveMemo(memo)
      return result
    } catch (error) {
      console.error('[ipc] memo:save error:', error)
      throw error
    }
  })

  ipcMain.handle('memo:delete', (_event, id: string) => {
    return deleteMemo(id)
  })

  // Settings handlers
  ipcMain.handle('settings:get', () => {
    return getSettings()
  })

  ipcMain.handle('settings:set', (_event, settings: Partial<AppSettings>) => {
    const updated = setSettings(settings)
    if (settings.alwaysOnTop !== undefined) {
      mainWindow.setAlwaysOnTop(settings.alwaysOnTop)
    }
    if (settings.opacity !== undefined) {
      mainWindow.setOpacity(settings.opacity)
    }
    if (settings.startWithWindows !== undefined) {
      applyAutoStart(settings.startWithWindows)
    }
    return updated
  })

  // Window handlers
  ipcMain.on('window:minimize', () => {
    mainWindow.minimize()
  })

  ipcMain.on('window:close', () => {
    mainWindow.hide()
  })

  ipcMain.handle('window:togglePin', () => {
    const isOnTop = mainWindow.isAlwaysOnTop()
    mainWindow.setAlwaysOnTop(!isOnTop)
    setSettings({ alwaysOnTop: !isOnTop })
    return !isOnTop
  })

  // Save window position on move/resize
  mainWindow.on('moved', () => {
    const [x, y] = mainWindow.getPosition()
    setSettings({ position: { x, y } })
  })

  mainWindow.on('resized', () => {
    const [width, height] = mainWindow.getSize()
    setSettings({ size: { width, height } })
  })
}
