# Playwrightテストガイド

## 🎯 テストの書き方

### 基本的なテスト構造

```typescript
import { test, expect } from "@playwright/test";

test.describe("機能名", () => {
  test.beforeEach(async ({ page }) => {
    // 各テスト前の共通処理
    await page.goto("/target-page");
  });

  test("テストの説明", async ({ page }) => {
    // テストのアクション
    await page.getByTestId("button").click();

    // アサーション
    await expect(page.getByText("期待される結果")).toBeVisible();
  });
});
```

## 🔍 要素の選択方法

Playwrightでは複数の方法で要素を選択できます。

### 1. data-testid属性を使う（推奨）

```typescript
// HTML: <button data-testid="submit-button">送信</button>
await page.getByTestId("submit-button").click();
```

**推奨理由**:

- テストコードとUIの密結合を防ぐ
- CSSクラスやテキストの変更に影響されない
- 明確にテスト用の要素であることがわかる

### 2. ロール（Role）を使う

```typescript
await page.getByRole("button", { name: "送信" }).click();
await page.getByRole("heading", { level: 1 }).textContent();
await page.getByRole("link", { name: "ホームに戻る" }).click();
```

**利点**: アクセシビリティを意識したテストになる

### 3. テキストで選択

```typescript
await page.getByText("送信").click();
await expect(page.getByText("エラーメッセージ")).toBeVisible();
```

### 4. CSS・XPathセレクタ（非推奨）

```typescript
// できるだけ避ける
await page.locator(".submit-btn").click();
await page.locator('//button[@id="submit"]').click();
```

**避けるべき理由**: 実装の詳細に依存しすぎる

## ✅ アサーション（検証）

### 可視性の確認

```typescript
await expect(page.getByText("成功")).toBeVisible();
await expect(page.getByTestId("error")).toBeHidden();
```

### テキスト内容の確認

```typescript
await expect(page.getByTestId("message")).toHaveText("完全一致のテキスト");
await expect(page.getByTestId("message")).toContainText("部分一致");
```

### 属性の確認

```typescript
await expect(page.getByRole("link")).toHaveAttribute("href", "/home");
await expect(page.getByTestId("input")).toHaveValue("入力値");
```

### 状態の確認

```typescript
await expect(page.getByTestId("checkbox")).toBeChecked();
await expect(page.getByTestId("button")).toBeDisabled();
await expect(page.getByTestId("input")).toBeEnabled();
```

### URLの確認

```typescript
await expect(page).toHaveURL("/expected-path");
await expect(page).toHaveTitle("期待されるタイトル");
```

## 🎬 アクション

### クリック操作

```typescript
await page.getByTestId("button").click();
await page.getByTestId("button").dblclick(); // ダブルクリック
```

### 入力操作

```typescript
// テキスト入力
await page.getByTestId("input").fill("テキスト");

// 文字を一つずつ入力（タイプ効果）
await page.getByTestId("input").type("テキスト", { delay: 100 });

// クリア
await page.getByTestId("input").clear();
```

### 選択操作

```typescript
// ドロップダウン
await page.getByTestId("select").selectOption("option-value");
await page.getByTestId("select").selectOption({ label: "オプション名" });

// チェックボックス
await page.getByTestId("checkbox").check();
await page.getByTestId("checkbox").uncheck();

// ラジオボタン
await page.getByTestId("radio").check();
```

### ホバー操作

```typescript
await page.getByTestId("hover-target").hover();
```

### キーボード操作

```typescript
await page.keyboard.press("Enter");
await page.keyboard.press("Escape");
await page.keyboard.type("Hello");
```

## 🌐 ナビゲーション

```typescript
// ページ遷移
await page.goto("/path");

// 戻る・進む
await page.goBack();
await page.goForward();

// リロード
await page.reload();
```

## ⏱️ 待機

Playwrightは自動待機しますが、明示的な待機が必要な場合もあります。

```typescript
// 要素が表示されるまで待機（自動）
await expect(page.getByTestId("element")).toBeVisible();

// 明示的なタイムアウト設定
await expect(page.getByTestId("element")).toBeVisible({ timeout: 10000 });

// 特定の時間待機（できるだけ避ける）
await page.waitForTimeout(1000);

// ページの読み込み完了を待機
await page.waitForLoadState("networkidle");
```

## 🔌 APIのモック化

### 基本的なモック

```typescript
await page.route("**/api/users", async (route) => {
  await route.fulfill({
    status: 200,
    contentType: "application/json",
    body: JSON.stringify({ users: [] }),
  });
});
```

### リクエストの内容に応じた分岐

```typescript
await page.route("**/api/users", async (route) => {
  const request = route.request();

  if (request.method() === "GET") {
    await route.fulfill({
      status: 200,
      body: JSON.stringify([{ id: 1, name: "User 1" }]),
    });
  } else if (request.method() === "POST") {
    await route.fulfill({
      status: 201,
      body: JSON.stringify({ id: 2, name: "New User" }),
    });
  }
});
```

### エラーレスポンスのモック

```typescript
await page.route("**/api/users", async (route) => {
  await route.fulfill({
    status: 500,
    contentType: "application/json",
    body: JSON.stringify({ error: "Internal Server Error" }),
  });
});
```

### 遅延のシミュレーション

```typescript
await page.route("**/api/users", async (route) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  await route.fulfill({
    status: 200,
    body: JSON.stringify([]),
  });
});
```

## 📸 スクリーンショットとビデオ

### スクリーンショット

```typescript
// ページ全体
await page.screenshot({ path: "screenshot.png" });

// 特定の要素
await page.getByTestId("element").screenshot({ path: "element.png" });

// フルページ（スクロールを含む）
await page.screenshot({ path: "full-page.png", fullPage: true });
```

### ビデオ録画

`playwright.config.ts`で設定:

```typescript
use: {
  video: 'on', // 常に録画
  video: 'retain-on-failure', // 失敗時のみ
  video: 'on-first-retry', // リトライ時
}
```

## 🎭 複数のブラウザでテスト

### 設定ファイル（playwright.config.ts）

```typescript
projects: [
  { name: "chromium", use: { ...devices["Desktop Chrome"] } },
  { name: "firefox", use: { ...devices["Desktop Firefox"] } },
  { name: "webkit", use: { ...devices["Desktop Safari"] } },
];
```

### 特定のブラウザのみ実行

```bash
npx playwright test --project=chromium
```

## 📱 モバイルテスト

```typescript
projects: [
  { name: "Mobile Chrome", use: { ...devices["Pixel 5"] } },
  { name: "Mobile Safari", use: { ...devices["iPhone 12"] } },
];
```

## 🐛 デバッグ

### デバッグモードで実行

```bash
npm run test:debug
```

### 特定のテストのみデバッグ

```typescript
test.only("このテストのみ実行", async ({ page }) => {
  // テスト内容
});
```

### ブレークポイント

```typescript
test("テスト", async ({ page }) => {
  await page.goto("/");

  // ここで一時停止
  await page.pause();

  await page.getByTestId("button").click();
});
```

### トレース

```typescript
// テスト内でトレースを開始
await page.context().tracing.start({ screenshots: true, snapshots: true });

// テストの実行

// トレースを保存
await page.context().tracing.stop({ path: "trace.zip" });
```

トレースの確認:

```bash
npx playwright show-trace trace.zip
```

## 🎯 テストのベストプラクティス

### 1. 独立したテスト

各テストは他のテストに依存しない

```typescript
// ❌ 悪い例: 前のテストに依存
test("ユーザーを作成", async ({ page }) => {
  /* ... */
});
test("作成したユーザーを編集", async ({ page }) => {
  /* ... */
}); // 前のテストに依存

// ✅ 良い例: 独立したテスト
test("ユーザーを編集", async ({ page }) => {
  // テスト内でユーザーを作成してから編集
});
```

### 2. わかりやすいテスト名

```typescript
// ❌ 悪い例
test("test1", async ({ page }) => {
  /* ... */
});

// ✅ 良い例
test("無効なメールアドレスでエラーが表示される", async ({ page }) => {
  /* ... */
});
```

### 3. data-testid属性の使用

```typescript
// ❌ 悪い例: 実装の詳細に依存
await page.locator(".btn-primary.submit").click();

// ✅ 良い例: data-testid属性を使用
await page.getByTestId("submit-button").click();
```

### 4. 明示的な待機を避ける

```typescript
// ❌ 悪い例
await page.waitForTimeout(3000);

// ✅ 良い例: 自動待機を活用
await expect(page.getByTestId("result")).toBeVisible();
```

### 5. ページオブジェクトパターン（複雑な場合）

```typescript
// pages/LoginPage.ts
export class LoginPage {
  constructor(private page: Page) {}

  async login(email: string, password: string) {
    await this.page.getByTestId("email-input").fill(email);
    await this.page.getByTestId("password-input").fill(password);
    await this.page.getByTestId("login-button").click();
  }
}

// test.spec.ts
test("ログイン", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login("test@example.com", "password");
});
```

## 📊 レポート

テスト実行後、HTMLレポートが自動生成されます。

```bash
# レポートを表示
npx playwright show-report
```

## 🔄 CI/CDでの実行

### GitHub Actions例

```yaml
name: Playwright Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - name: Install dependencies
        run: npm ci
      - name: Install Playwright Browsers
        run: npx playwright install --with-deps
      - name: Run Playwright tests
        run: npm test
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30
```

## 📚 さらに学ぶ

- [Playwright公式ドキュメント](https://playwright.dev/)
- [Playwright API Reference](https://playwright.dev/docs/api/class-playwright)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Playwright GitHub](https://github.com/microsoft/playwright)
