# Playwright Testing Guide

Next.jsとPlaywrightを使ったE2Eテストの実践ガイド

## 📖 このリポジトリについて

このリポジトリは、Next.js (App Router) とPlaywrightを使ったE2Eテストの実装例を提供します。新規プロジェクトでPlaywrightを使用する際の環境構築から、実践的なテストパターンまでを網羅しています。

## ✨ 主な特徴

- **完全なセットアップ例**: Next.js + TypeScript + Tailwind CSS + Playwright
- **実践的なテスト例**: フォーム、ナビゲーション、API連携、インタラクション
- **ベストプラクティス**: データ属性の使用、モック化、エラーハンドリング
- **日本語対応**: コメントとドキュメントを日本語で記載

## 🚀 クイックスタート

### 前提条件

- Node.js 18以上
- npm または yarn

### インストール

```bash
# リポジトリをクローン
git clone https://github.com/yourusername/playwright-testing-guide.git
cd playwright-testing-guide

# 依存関係をインストール
npm install

# Playwrightのブラウザをインストール
npx playwright install
```

### 開発サーバーの起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開く

### テストの実行

```bash
# すべてのテストを実行
npm test

# UIモードでテストを実行（推奨）
npm run test:ui

# ヘッド付きモードでテストを実行
npm run test:headed

# デバッグモードでテストを実行
npm run test:debug

# テストコード生成ツールを起動
npm run test:codegen
```

## 📚 テスト例

### 1. フォームテスト (`tests/forms.spec.ts`)

- 入力フィールドのバリデーション
- エラーメッセージの表示
- フォーム送信の成功フロー
- リセット機能

```typescript
test("正常なフォーム送信が成功する", async ({ page }) => {
  await page.goto("/examples/forms");
  await page.getByTestId("name-input").fill("山田太郎");
  await page.getByTestId("email-input").fill("test@example.com");
  await page.getByTestId("message-input").fill("テストメッセージ");
  await page.getByTestId("submit-button").click();
  await expect(page.getByTestId("success-message")).toBeVisible();
});
```

### 2. ナビゲーションテスト (`tests/navigation.spec.ts`)

- タブの切り替え
- ページ遷移
- ブレッドクラム
- アクティブ状態のスタイル

```typescript
test("タブをクリックするとコンテンツが切り替わる", async ({ page }) => {
  await page.goto("/examples/navigation");
  await page.getByTestId("tab-features").click();
  await expect(page.getByTestId("content-features")).toBeVisible();
});
```

### 3. API連携テスト (`tests/api.spec.ts`)

- APIレスポンスのモック化
- ローディング状態の確認
- エラーハンドリング
- ネットワーク遅延のシミュレーション

```typescript
test("APIレスポンスをモックしてテストできる", async ({ page }) => {
  await page.route("**/users", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify([
        {
          id: 1,
          name: "テストユーザー",
          email: "test@example.com",
          username: "testuser",
        },
      ]),
    });
  });

  await page.goto("/examples/api");
  await page.getByTestId("fetch-users-button").click();
  await expect(page.getByText("テストユーザー")).toBeVisible();
});
```

### 4. インタラクションテスト (`tests/interaction.spec.ts`)

- クリック、ホバー操作
- テキスト入力とリアルタイム反映
- ドロップダウン選択
- チェックボックス、ラジオボタン

```typescript
test("クリックカウンターが動作する", async ({ page }) => {
  await page.goto("/examples/interaction");
  const button = page.getByTestId("increment-button");
  const count = page.getByTestId("click-count");

  await button.click();
  await expect(count).toHaveText("1");
});
```

## 🎯 Playwrightの主な機能

### 1. 自動待機

Playwrightは要素が表示されるまで自動的に待機します。

```typescript
await expect(page.getByText("読み込み中...")).toBeVisible();
// 要素が表示されるまで自動的に待機
```

### 2. 複数ブラウザ対応

Chromium、Firefox、WebKitでのテストをサポート（`playwright.config.ts`で設定）

### 3. モバイルエミュレーション

モバイルデバイスのビューポートをエミュレート可能

```typescript
projects: [
  { name: "Mobile Chrome", use: { ...devices["Pixel 5"] } },
  { name: "Mobile Safari", use: { ...devices["iPhone 12"] } },
];
```

### 4. スクリーンショットとビデオ

失敗時のデバッグに役立つスクリーンショットとビデオ録画

### 5. ネットワークのモック化

APIレスポンスを完全にコントロール

```typescript
await page.route("**/api/**", (route) => {
  route.fulfill({ status: 200, body: '{"success": true}' });
});
```

## 📁 プロジェクト構造

```
playwright-testing-guide/
├── app/                      # Next.js App Router
│   ├── examples/            # テスト用の例ページ
│   │   ├── forms/          # フォームページ
│   │   ├── navigation/     # ナビゲーションページ
│   │   ├── api/            # API連携ページ
│   │   └── interaction/    # インタラクションページ
│   ├── globals.css         # グローバルスタイル
│   ├── layout.tsx          # ルートレイアウト
│   └── page.tsx            # ホームページ
├── tests/                   # Playwrightテスト
│   ├── home.spec.ts        # ホームページのテスト
│   ├── forms.spec.ts       # フォームのテスト
│   ├── navigation.spec.ts  # ナビゲーションのテスト
│   ├── api.spec.ts         # API連携のテスト
│   └── interaction.spec.ts # インタラクションのテスト
├── playwright.config.ts     # Playwright設定
├── next.config.ts          # Next.js設定
├── tailwind.config.ts      # Tailwind CSS設定
└── tsconfig.json           # TypeScript設定
```

## 🛠️ ベストプラクティス

### 1. data-testid属性を使用

テストの安定性を高めるため、`data-testid`属性を使用

```tsx
<button data-testid="submit-button">送信</button>
```

```typescript
await page.getByTestId("submit-button").click();
```

### 2. ページオブジェクトパターン

複雑なページの場合、ページオブジェクトパターンを検討

### 3. 並列実行

テストを並列実行して時間短縮（`playwright.config.ts`で設定）

### 4. CI/CD統合

GitHubActionsやその他のCI/CDツールと統合可能

## 📖 参考リンク

- [Playwright公式ドキュメント](https://playwright.dev/)
- [Next.js公式ドキュメント](https://nextjs.org/)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)

## 📝 ライセンス

ISC

## 🤝 コントリビューション

プルリクエスト、イシューの報告を歓迎します！

---

**Happy Testing! 🎭**
