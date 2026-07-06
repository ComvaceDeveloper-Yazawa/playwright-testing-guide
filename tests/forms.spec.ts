import { test, expect } from "@playwright/test";

test.describe("フォームページ", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/examples/forms");
  });

  test("フォームが表示される", async ({ page }) => {
    await expect(page.getByTestId("name-input")).toBeVisible();
    await expect(page.getByTestId("email-input")).toBeVisible();
    await expect(page.getByTestId("message-input")).toBeVisible();
    await expect(page.getByTestId("submit-button")).toBeVisible();
  });

  test("バリデーションエラーが表示される", async ({ page }) => {
    // 空のフォームを送信
    await page.getByTestId("submit-button").click();

    // エラーメッセージが表示されることを確認
    await expect(page.getByTestId("name-error")).toBeVisible();
    await expect(page.getByTestId("name-error")).toContainText(
      "名前は必須です",
    );

    await expect(page.getByTestId("email-error")).toBeVisible();
    await expect(page.getByTestId("email-error")).toContainText(
      "メールアドレスは必須です",
    );

    await expect(page.getByTestId("message-error")).toBeVisible();
    await expect(page.getByTestId("message-error")).toContainText(
      "メッセージは必須です",
    );
  });

  test("無効なメールアドレスでエラーが表示される", async ({ page }) => {
    await page.getByTestId("name-input").fill("山田太郎");
    await page.getByTestId("email-input").fill("invalid-email@");
    await page
      .getByTestId("message-input")
      .fill("これはテストメッセージです。");

    await page.getByTestId("submit-button").click();

    await expect(page.getByTestId("email-error")).toBeVisible();
    await expect(page.getByTestId("email-error")).toContainText(
      "有効なメールアドレスを入力してください",
    );
  });

  test("短すぎるメッセージでエラーが表示される", async ({ page }) => {
    await page.getByTestId("name-input").fill("山田太郎");
    await page.getByTestId("email-input").fill("test@example.com");
    await page.getByTestId("message-input").fill("短い");

    await page.getByTestId("submit-button").click();

    await expect(page.getByTestId("message-error")).toBeVisible();
    await expect(page.getByTestId("message-error")).toContainText(
      "メッセージは10文字以上で入力してください",
    );
  });

  test("正常なフォーム送信が成功する", async ({ page }) => {
    // フォームに入力
    await page.getByTestId("name-input").fill("山田太郎");
    await page.getByTestId("email-input").fill("test@example.com");
    await page
      .getByTestId("message-input")
      .fill("これはテストメッセージです。10文字以上あります。");

    // フォームを送信
    await page.getByTestId("submit-button").click();

    // 成功メッセージが表示されることを確認
    await expect(page.getByTestId("success-message")).toBeVisible();
    await expect(page.getByTestId("success-message")).toContainText("送信完了");
  });

  test("送信後にリセットボタンでフォームに戻れる", async ({ page }) => {
    // フォームを送信
    await page.getByTestId("name-input").fill("山田太郎");
    await page.getByTestId("email-input").fill("test@example.com");
    await page
      .getByTestId("message-input")
      .fill("これはテストメッセージです。");
    await page.getByTestId("submit-button").click();

    // 成功画面でリセットボタンをクリック
    await page.getByTestId("reset-button").click();

    // フォームに戻ることを確認
    await expect(page.getByTestId("name-input")).toBeVisible();
    await expect(page.getByTestId("name-input")).toHaveValue("");
  });

  test("ホームに戻るリンクが機能する", async ({ page }) => {
    await page.getByRole("link", { name: /ホームに戻る/ }).click();
    await expect(page).toHaveURL("/");
  });
});
