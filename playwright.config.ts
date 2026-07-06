import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright Test Configuration
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: "./tests",

  /* 並列実行の最大数 */
  fullyParallel: true,

  /* CI環境でのみfailOnConsoleError */
  forbidOnly: !!process.env.CI,

  /* テスト失敗時のリトライ回数 */
  retries: process.env.CI ? 2 : 0,

  /* CI環境では並列実行を制限 */
  workers: process.env.CI ? 1 : undefined,

  /* レポーター設定 */
  reporter: [["html"], ["list"]],

  /* 共通設定 */
  use: {
    /* ベースURL - テスト内で相対パスを使用可能 */
    baseURL: "http://localhost:3000",

    /* 失敗時のスクリーンショット */
    screenshot: "only-on-failure",

    /* 失敗時のビデオ録画 */
    video: "retain-on-failure",

    /* トレース設定 */
    trace: "on-first-retry",
  },

  /* プロジェクト設定 - 各ブラウザでのテスト */
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },

    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },

    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },

    /* モバイルビューポートのテスト */
    {
      name: "Mobile Chrome",
      use: { ...devices["Pixel 5"] },
    },
    {
      name: "Mobile Safari",
      use: { ...devices["iPhone 12"] },
    },
  ],

  /* テスト実行前にNext.jsの開発サーバーを起動 */
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    stdout: "ignore",
    stderr: "pipe",
  },
});
