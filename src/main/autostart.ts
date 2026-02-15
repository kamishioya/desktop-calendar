import { app } from 'electron'

/**
 * Windows 起動時の自動起動を設定する。
 * Electron 公式の app.setLoginItemSettings() を使用し、
 * レジストリ Run キーと StartupApproved\Run キーの両方を正しく操作する。
 */
export function applyAutoStart(enabled: boolean): void {
  // 開発環境では空の Electron が登録されてしまうため、スキップする
  if (!app.isPackaged) {
    console.log('[autostart] Skipped: not packaged (development environment)')
    return
  }

  try {
    app.setLoginItemSettings({
      openAtLogin: enabled,
      // Windows: StartupApproved\Run キーも連動して有効/無効にする
      enabled,
      // レジストリのエントリ名（未指定の場合は AppUserModelId が使われる）
      name: 'DesktopCalendar'
    })

    const result = app.getLoginItemSettings()
    console.log('[autostart]', enabled ? 'Enabled' : 'Disabled', result)
  } catch (error) {
    console.error('[autostart] Failed to apply auto-start:', error)
  }
}
