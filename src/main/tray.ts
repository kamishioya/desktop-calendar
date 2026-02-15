import { Tray, Menu, BrowserWindow, app, nativeImage } from 'electron'
import path from 'path'
import fs from 'fs'

let tray: Tray | null = null

function resolveTrayIconPath(): string | null {
  const candidates = [
    'icon.ico',
    'favicon.ico',
    'icon.png',
    'favicon-32x32.png',
    'favicon-16x16.png',
    'ms-icon-70x70.png'
  ]

  const baseDirs = [
    path.join(__dirname, '../../resources'),
    path.join(process.resourcesPath, 'resources')
  ]

  for (const baseDir of baseDirs) {
    for (const fileName of candidates) {
      const fullPath = path.join(baseDir, fileName)
      if (fs.existsSync(fullPath)) {
        return fullPath
      }
    }
  }

  return null
}

export function createTray(mainWindow: BrowserWindow): void {
  const iconPath = resolveTrayIconPath()
  
  let trayIcon
  try {
    trayIcon = iconPath ? nativeImage.createFromPath(iconPath) : nativeImage.createEmpty()
    if (trayIcon.isEmpty()) {
      trayIcon = nativeImage.createEmpty()
    }
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
