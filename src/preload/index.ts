import { contextBridge, ipcRenderer } from 'electron'
import { MemoEntry, AppSettings } from '../shared/types'

const api = {
  memo: {
    getAll: (): Promise<MemoEntry[]> => ipcRenderer.invoke('memo:getAll'),
    getByDate: (date: string): Promise<MemoEntry[]> => ipcRenderer.invoke('memo:getByDate', date),
    save: (memo: MemoEntry): Promise<MemoEntry> => ipcRenderer.invoke('memo:save', memo),
    delete: (id: string): Promise<boolean> => ipcRenderer.invoke('memo:delete', id)
  },
  settings: {
    get: (): Promise<AppSettings> => ipcRenderer.invoke('settings:get'),
    set: (settings: Partial<AppSettings>): Promise<AppSettings> =>
      ipcRenderer.invoke('settings:set', settings)
  },
  window: {
    minimize: (): void => ipcRenderer.send('window:minimize'),
    close: (): void => ipcRenderer.send('window:close'),
    togglePin: (): Promise<boolean> => ipcRenderer.invoke('window:togglePin')
  }
}

contextBridge.exposeInMainWorld('api', api)

export type ElectronAPI = typeof api
