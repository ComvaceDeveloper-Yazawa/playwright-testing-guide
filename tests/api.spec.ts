import { test, expect } from "@playwright/test";

test.describe("API連携ページ", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/examples/api");
  });

  test("初期状態で空の状態が表示される", async ({ page }) => {
    await expect(page.getByTestId("empty-state")).toBeVisible();
    await expect(page.getByTestId("empty-state")).toContainText(
      "データがありません",
    );
  });

  test("ユーザーを取得ボタンでデータを取得できる", async ({ page }) => {
    // ボタンをクリック
    await page.getByTestId("fetch-users-button").click();

    // ローディングが表示される
    await expect(page.getByTestId("loading-spinner")).toBeVisible();

    // データが表示される（ローディングが消えるまで待つ）
    await expect(page.getByTestId("users-list")).toBeVisible({
      timeout: 10000,
    });

    // ユーザーリストが表示される
    await expect(page.getByText(/取得したユーザー/)).toBeVisible();
  });

  test("APIレスポンスをモックしてテストできる", async ({ page }) => {
    // APIレスポンスをモック
    await page.route("**/users", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify([
          {
            id: 1,
            name: "テストユーザー1",
            email: "test1@example.com",
            username: "testuser1",
          },
          {
            id: 2,
            name: "テストユーザー2",
            email: "test2@example.com",
            username: "testuser2",
          },
        ]),
      });
    });

    // データを取得
    await page.getByTestId("fetch-users-button").click();

    // モックデータが表示される
    await expect(page.getByTestId("users-list")).toBeVisible();
    await expect(page.getByText("テストユーザー1")).toBeVisible();
    await expect(page.getByText("テストユーザー2")).toBeVisible();
    await expect(page.getByText("取得したユーザー (2件)")).toBeVisible();
  });

  test("エラーシミュレーションが動作する", async ({ page }) => {
    // エラーボタンをクリック
    await page.getByTestId("simulate-error-button").click();

    // ローディングが表示される
    await expect(page.getByTestId("loading-spinner")).toBeVisible();

    // エラーメッセージが表示される
    await expect(page.getByTestId("error-message")).toBeVisible();
    await expect(page.getByTestId("error-message")).toContainText(
      "ネットワークエラー",
    );
  });

  test("APIエラーをモックしてテストできる", async ({ page }) => {
    // APIエラーをモック
    await page.route("**/users", async (route) => {
      await route.fulfill({
        status: 500,
        contentType: "application/json",
        body: JSON.stringify({ error: "Internal Server Error" }),
      });
    });

    // データ取得を試みる
    await page.getByTestId("fetch-users-button").click();

    // エラーメッセージが表示される
    await expect(page.getByTestId("error-message")).toBeVisible();
    await expect(page.getByTestId("error-message")).toContainText(
      "データの取得に失敗しました",
    );
  });

  test("ネットワーク遅延をシミュレートできる", async ({ page }) => {
    // 遅延付きのモック
    await page.route("**/users", async (route) => {
      // 2秒の遅延
      await new Promise((resolve) => setTimeout(resolve, 2000));

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

    await page.getByTestId("fetch-users-button").click();

    // ローディングが表示される
    await expect(page.getByTestId("loading-spinner")).toBeVisible();

    // 少なくとも1.5秒はローディングが表示されることを確認
    await page.waitForTimeout(1500);
    await expect(page.getByTestId("loading-spinner")).toBeVisible();

    // 最終的にデータが表示される
    await expect(page.getByTestId("users-list")).toBeVisible({ timeout: 5000 });
  });

  test("テストのポイントセクションが表示される", async ({ page }) => {
    await expect(page.getByText("💡 テストのポイント")).toBeVisible();
    await expect(page.getByText("ローディング状態の表示確認")).toBeVisible();
    await expect(page.getByText("APIレスポンスのモック化")).toBeVisible();
  });
});
