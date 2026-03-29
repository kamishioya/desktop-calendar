import { spawnSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import pngToIco from 'png-to-ico'
import { rcedit } from 'rcedit'

const rootDir = process.cwd()
const iconPath = path.join(rootDir, 'resources', 'icon.ico')
const fallbackPngPath = path.join(rootDir, 'resources', 'ms-icon-310x310.png')
const unpackedExePath = path.join(rootDir, 'dist', 'win-unpacked', 'Desktop Calendar.exe')

function run(command, args) {
  const result = spawnSync(command, args, {
    cwd: rootDir,
    stdio: 'inherit',
    shell: process.platform === 'win32'
  })

  if (result.status !== 0) {
    throw new Error(`${command} ${args.join(' ')} failed with exit code ${result.status}`)
  }
}

async function ensureIco() {
  if (fs.existsSync(iconPath) && fs.statSync(iconPath).size > 0) {
    return
  }

  if (!fs.existsSync(fallbackPngPath)) {
    throw new Error('resources/icon.ico が無く、変換元 resources/ms-icon-310x310.png も見つかりません')
  }

  const icoBuffer = await pngToIco(fallbackPngPath)
  fs.writeFileSync(iconPath, icoBuffer)
}

async function patchExecutableIcon() {
  if (!fs.existsSync(unpackedExePath)) {
    throw new Error(`実行ファイルが見つかりません: ${unpackedExePath}`)
  }

  await rcedit(unpackedExePath, {
    icon: iconPath
  })
}

function buildUnpacked() {
  run('npx', [
    'electron-builder',
    '--win',
    '--x64',
    '--dir',
    '--config.win.signAndEditExecutable=false',
    '--publish',
    'never'
  ])
}

function buildInstallersWithRetry() {
  const maxAttempts = 5

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    const result = spawnSync(
      'npx',
      [
        'electron-builder',
        '--win',
        'nsis',
        'portable',
        '--x64',
        '--prepackaged',
        'dist/win-unpacked',
        '--config.win.signAndEditExecutable=false',
        '--publish',
        'never'
      ],
      {
        cwd: rootDir,
        stdio: 'inherit',
        shell: process.platform === 'win32'
      }
    )

    if (result.status === 0) {
      return
    }

    if (attempt === maxAttempts) {
      throw new Error('インストーラー生成に失敗しました（リトライ上限到達）')
    }
  }
}

async function main() {
  await ensureIco()
  buildUnpacked()
  await patchExecutableIcon()
  buildInstallersWithRetry()
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
