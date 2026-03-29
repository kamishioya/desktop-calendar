import { Tray, Menu, BrowserWindow, app, nativeImage, type NativeImage } from 'electron'
import path from 'path'
import fs from 'fs'

let tray: Tray | null = null

function resolveTrayIconPath(fileNames: string[]): string | null {
  const baseDirs = [
    process.resourcesPath,
    path.join(process.cwd(), 'resources'),
    path.join(app.getAppPath(), 'resources'),
    path.join(process.resourcesPath, 'resources'),
    path.join(__dirname, '../../resources')
  ]

  for (const baseDir of baseDirs) {
    for (const fileName of fileNames) {
      const fullPath = path.join(baseDir, fileName)
      if (fs.existsSync(fullPath)) {
        return fullPath
      }
    }
  }

  return null
}

function resolveTrayIcon(): string | NativeImage {
  const icoPath = resolveTrayIconPath(['icon.ico', 'favicon.ico'])
  if (process.platform === 'win32' && icoPath) {
    return icoPath
  }

  const pngPath = resolveTrayIconPath([
    'ms-icon-70x70.png',
    'favicon-32x32.png',
    'favicon-16x16.png',
    'icon.png'
  ])

  if (pngPath) {
    const icon = nativeImage.createFromPath(pngPath)
    if (!icon.isEmpty()) {
      return icon.resize({ width: 16, height: 16 })
    }
  }

  return nativeImage.createEmpty()
}

export function createTray(mainWindow: BrowserWindow): void {
  let trayIcon
  try {
    trayIcon = resolveTrayIcon()
  } catch {
    trayIcon = nativeImage.createEmpty()
  }

  tray = new Tray(trayIcon)
  tray.setToolTip('Desktop Calendar')

  const contextMenu = Menu.buildFromTemplate([
    {
      label: '表示',
      click: (): void => {
        mainWindow.show()
        mainWindow.focus()
      }
    },
    {
      label: '常に最前面',
      type: 'checkbox',
      checked: mainWindow.isAlwaysOnTop(),
      click: (menuItem): void => {
        mainWindow.setAlwaysOnTop(menuItem.checked)
      }
    },
    { type: 'separator' },
    {
      label: '終了',
      click: (): void => {
        app.quit()
      }
    }
  ])

  tray.setContextMenu(contextMenu)

  tray.on('click', () => {
    if (mainWindow.isVisible()) {
      mainWindow.hide()
    } else {
      mainWindow.show()
      mainWindow.focus()
    }
  })
}
