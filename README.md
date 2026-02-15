# Desktop Calendar & Memo Widget

デスクトップ上に透過表示されるカレンダー＆メモウィジェットアプリケーション。

## 機能

- 📅 **カレンダー表示** - 月間カレンダーの表示、月ナビゲーション
- 📝 **メモ機能** - 日付ごとにメモを記録・編集・削除
- 🔍 **透過ウィンドウ** - デスクトップ上に半透明で表示
- 📌 **常時最前面** - 他のウィンドウの上に常に表示（トグル可能）
- 🖥️ **システムトレイ** - トレイに格納して常駐
- ⚙️ **設定** - 透過度、週開始日、自動起動などをカスタマイズ

## 技術スタック

- **Electron** + **electron-vite**
- **React 19** + **TypeScript**
- **Tailwind CSS 4**
- **Zustand** (状態管理)
- **electron-store** (データ永続化)
- **date-fns** (日付操作)

## 開発

### セットアップ

```bash
npm install
```

### 開発モード

```bash
npm run dev
```

### ビルド

```bash
npm run build
```

### パッケージング (Windows インストーラー)

```bash
npm run package
```

## ショートカット

| 操作 | キー |
|------|------|
| メモ保存 | Ctrl + Enter |
| メモ編集キャンセル | Escape |

## Windows 自動起動について

- 設定の「Windows起動時に起動」は、インストーラーで導入したアプリで有効化してください。
- 開発モード（`npm run dev`）や実行ファイル単体の一時配置では、Windows のログイン時自動起動が安定しない場合があります。

## プロジェクト構造

```
src/
├── main/          # Electron メインプロセス
├── preload/       # プリロードスクリプト
├── renderer/      # React フロントエンド
│   ├── components/
│   │   ├── Calendar/  # カレンダーコンポーネント
│   │   ├── Memo/      # メモコンポーネント
│   │   └── Widget/    # ウィジェットUI
│   ├── hooks/     # カスタムフック
│   ├── stores/    # Zustand ストア
│   └── styles/    # グローバルスタイル
└── shared/        # 共通型定義
```
