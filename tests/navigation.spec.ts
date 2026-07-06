import { test, expect } from "@playwright/test";

test.describe("ナビゲーションページ", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/examples/navigation");
  });

  test("すべてのタブが表示される", async ({ page }) => {
    const tabs = ["overview", "features", "pricing", "contact"];

    for (const tab of tabs) {
      await expect(page.getByTestId(`tab-${tab}`)).toBeVisible();
    }
  });

  test("タブをクリックするとコンテンツが切り替わる", async ({ page }) => {
    // 最初は「概要」タブが選択されている
    await expect(page.getByTestId("content-overview")).toBeVisible();

    // 「機能」タブをクリック
    await page.getByTestId("tab-features").click();
    await expect(page.getByTestId("content-features")).toBeVisible();
    await expect(page.getByText("シンプルで直感的なUI")).toBeVisible();

    // 「料金」タブをクリック
    await page.getByTestId("tab-pricing").click();
    await expect(page.getByTestId("content-pricing")).toBeVisible();
    await expect(page.getByText("¥0")).toBeVisible();

    // 「お問い合わせ」タブをクリック
    await page.getByTestId("tab-contact").click();
    await expect(page.getByTestId("content-contact")).toBeVisible();
  });

  test("アクティブなタブにスタイルが適用される", async ({ page }) => {
    const overviewTab = page.getByTestId("tab-overview");
    const featuresTab = page.getByTestId("tab-features");

    // 最初のタブがアクティブ
    await expect(overviewTab).toHaveClass(/border-blue-600/);

    // 別のタブをクリック
    await featuresTab.click();

    // 新しいタブがアクティブになる
    await expect(featuresTab).toHaveClass(/border-blue-600/);
  });

  test("料金プランが正しく表示される", async ({ page }) => {
    await page.getByTestId("tab-pricing").click();

    // 3つのプランが表示される
    await expect(page.getByText("無料")).toBeVisible();
    await expect(page.getByText("プロ")).toBeVisible();
    await expect(page.getByText("エンタープライズ")).toBeVisible();

    // 価格が表示される
    await expect(page.getByText("¥0")).toBeVisible();
    await expect(page.getByText("¥1,000")).toBeVisible();
  });

  test("お問い合わせフォームへのリンクが機能する", async ({ page }) => {
    // お問い合わせタブに移動
    await page.getByTestId("tab-contact").click();

    // フォームページへのリンクをクリック
    await page.getByTestId("contact-form-link").click();

    // フォームページに遷移
    await expect(page).toHaveURL("/examples/forms");
  });

  test("ブレッドクラムが表示される", async ({ page }) => {
    const breadcrumb = page.getByTestId("breadcrumb");
    await expect(breadcrumb).toBeVisible();

    // ブレッドクラム内のリンクを確認
    const homeLink = breadcrumb.getByRole("link", { name: "ホーム" });
    await expect(homeLink).toHaveAttribute("href", "/");
  });

  test("ブレッドクラムからホームに戻れる", async ({ page }) => {
    await page
      .getByTestId("breadcrumb")
      .getByRole("link", { name: "ホーム" })
      .click();
    await expect(page).toHaveURL("/");
  });
});
