import { app, BrowserWindow, shell, screen, nativeImage, type NativeImage } from 'electron'
import path from 'path'
import fs from 'fs'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import { initStore, getSettings } from './store'
import { registerIpcHandlers } from './ipc'
import { createTray } from './tray'
import { applyAutoStart } from './autostart'

let mainWindow: BrowserWindow | null = null

function resolveWindowIcon(): NativeImage | undefined {
  const candidates = [
    path.join(process.cwd(), 'resources', 'icon.ico'),
    path.join(process.cwd(), 'resources', 'favicon.ico'),
    path.join(process.cwd(), 'resources', 'favicon-32x32.png'),
    path.join(app.getAppPath(), 'resources', 'icon.ico'),
    path.join(app.getAppPath(), 'resources', 'favicon.ico'),
    path.join(app.getAppPath(), 'resources', 'favicon-32x32.png'),
    path.join(process.resourcesPath, 'resources', 'icon.ico'),
    path.join(process.resourcesPath, 'resources', 'favicon.ico'),
    path.join(process.resourcesPath, 'resources', 'favicon-32x32.png'),
    path.join(__dirname, '../../resources/icon.ico'),
    path.join(__dirname, '../../resources/favicon.ico'),
    path.join(__dirname, '../../resources/favicon-32x32.png')
  ]

  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      const icon = nativeImage.createFromPath(candidate)
      if (!icon.isEmpty()) {
        return icon
      }
    }
  }

  return undefined
}

function validateWindowPosition(
  x: number,
  y: number,
  width: number,
  height: number
): { x: number; y: number } {
  const displays = screen.getAllDisplays()
  const isVisible = displays.some((display) => {
    const { x: dx, y: dy, width: dw, height: dh } = display.bounds
    return x + width > dx && x < dx + dw && y + height > dy && y < dy + dh
  })
  if (!isVisible) {
    const primary = screen.getPrimaryDisplay()
    return {
      x: Math.round(primary.bounds.x + (primary.bounds.width - width) / 2),
      y: Math.round(primary.bounds.y + (primary.bounds.height - height) / 2)
    }
  }
  return { x, y }
}

function createWindow(): void {
  const settings = getSettings()
  const icon = resolveWindowIcon()
  const { x, y } = validateWindowPosition(
    settings.position.x,
    settings.position.y,
    settings.size.width,
    settings.size.height
  )

  mainWindow = new BrowserWindow({
    width: settings.size.width,
    height: settings.size.height,
    x,
    y,
    transparent: true,
    frame: false,
    alwaysOnTop: settings.alwaysOnTop,
    resizable: true,
    skipTaskbar: false,
    hasShadow: false,
    icon,
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.cjs'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    if (mainWindow?.isMinimized()) {
      mainWindow.restore()
    }
    mainWindow?.show()
    mainWindow?.focus()
    // Open DevTools in development
    if (is.dev) {
      mainWindow?.webContents.openDevTools({ mode: 'detach' })
    }
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'))
  }
}

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.desktop-calendar.app')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  initStore()
  createWindow()
  registerIpcHandlers(mainWindow!)
  createTray(mainWindow!)

  // Sync auto-start setting
  const settings = getSettings()
  applyAutoStart(settings.startWithWindows)
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

export { mainWindow }
