import { test, expect } from "@playwright/test";

test.describe("ホームページ", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("ページタイトルとヘッドラインが表示される", async ({ page }) => {
    // ページタイトルの確認
    await expect(page).toHaveTitle(/Playwright Testing Guide/);

    // メインヘッドラインの確認
    const headline = page.getByRole("heading", { level: 1 });
    await expect(headline).toBeVisible();
    await expect(headline).toContainText("Playwright Testing Guide");
  });

  test("すべての例ページへのリンクが表示される", async ({ page }) => {
    // 4つのカードリンクが存在することを確認
    const links = [
      { href: "/examples/forms", text: "フォームテスト" },
      { href: "/examples/navigation", text: "ナビゲーションテスト" },
      { href: "/examples/api", text: "API連携テスト" },
      { href: "/examples/interaction", text: "インタラクションテスト" },
    ];

    for (const link of links) {
      const linkElement = page.getByRole("link", {
        name: new RegExp(link.text),
      });
      await expect(linkElement).toBeVisible();
      await expect(linkElement).toHaveAttribute("href", link.href);
    }
  });

  test("クイックスタートセクションが表示される", async ({ page }) => {
    await expect(page.getByText("🚀 クイックスタート")).toBeVisible();
    await expect(page.getByText("npm run dev")).toBeVisible();
    await expect(page.getByText("npm test")).toBeVisible();
  });

  test("例ページへのナビゲーションが機能する", async ({ page }) => {
    // フォームページへのリンクをクリック
    await page.getByRole("link", { name: /フォームテスト/ }).click();

    // URLが変更されたことを確認
    await expect(page).toHaveURL("/examples/forms");

    // フォームページのコンテンツが表示されることを確認
    await expect(
      page.getByRole("heading", { name: "フォームテスト" }),
    ).toBeVisible();
  });
});
