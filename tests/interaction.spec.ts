import { test, expect } from "@playwright/test";

test.describe("インタラクションページ", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/examples/interaction");
  });

  test("クリックカウンターが動作する", async ({ page }) => {
    const button = page.getByTestId("increment-button");
    const count = page.getByTestId("click-count");

    // 初期値は0
    await expect(count).toHaveText("0");

    // クリックするとカウントが増える
    await button.click();
    await expect(count).toHaveText("1");

    await button.click();
    await expect(count).toHaveText("2");

    await button.click();
    await expect(count).toHaveText("3");
  });

  test("リセットボタンでカウンターが0に戻る", async ({ page }) => {
    const incrementButton = page.getByTestId("increment-button");
    const resetButton = page.getByTestId("reset-button");
    const count = page.getByTestId("click-count");

    // カウントを増やす
    await incrementButton.click();
    await incrementButton.click();
    await expect(count).toHaveText("2");

    // リセット
    await resetButton.click();
    await expect(count).toHaveText("0");
  });

  test("ホバーエフェクトが動作する", async ({ page }) => {
    const hoverTarget = page.getByTestId("hover-target");
    const hoverState = page.getByTestId("hover-state");

    // 初期状態
    await expect(hoverState).toContainText("状態: 通常");

    // ホバー
    await hoverTarget.hover();
    await expect(hoverState).toContainText("状態: ホバー中");
    await expect(hoverTarget).toContainText("✨ ホバー中！");
  });

  test("テキスト入力がリアルタイムで反映される", async ({ page }) => {
    const input = page.getByTestId("text-input");
    const echo = page.getByTestId("input-echo");
    const charCount = page.getByTestId("char-count");

    // 初期状態
    await expect(echo).toContainText("(空)");
    await expect(charCount).toHaveText("0");

    // テキスト入力
    await input.fill("Hello, Playwright!");

    // エコーと文字数が更新される
    await expect(echo).toContainText("Hello, Playwright!");
    await expect(charCount).toHaveText("18");
  });

  test("テキスト入力の文字数カウントが正確", async ({ page }) => {
    const input = page.getByTestId("text-input");
    const charCount = page.getByTestId("char-count");

    const testTexts = [
      { text: "a", count: "1" },
      { text: "Hello", count: "5" },
      { text: "こんにちは", count: "5" },
      { text: "123456789", count: "9" },
    ];

    for (const { text, count } of testTexts) {
      await input.fill(text);
      await expect(charCount).toHaveText(count);
    }
  });

  test("ドロップダウン選択が動作する", async ({ page }) => {
    const select = page.getByTestId("select-dropdown");
    const selectedValue = page.getByTestId("selected-value");

    // 初期状態
    await expect(selectedValue).toContainText("なし");

    // オプションを選択
    await select.selectOption("option1");
    await expect(selectedValue).toContainText("option1");

    await select.selectOption("option2");
    await expect(selectedValue).toContainText("option2");

    await select.selectOption("option3");
    await expect(selectedValue).toContainText("option3");
  });

  test("チェックボックスがトグルできる", async ({ page }) => {
    const checkbox1 = page.getByTestId("checkbox-1");
    const checkbox2 = page.getByTestId("checkbox-2");

    // 初期状態（チェックなし）
    await expect(checkbox1).not.toBeChecked();
    await expect(checkbox2).not.toBeChecked();

    // チェックする
    await checkbox1.check();
    await expect(checkbox1).toBeChecked();

    await checkbox2.check();
    await expect(checkbox2).toBeChecked();

    // チェックを外す
    await checkbox1.uncheck();
    await expect(checkbox1).not.toBeChecked();
  });

  test("ラジオボタンが排他的に選択される", async ({ page }) => {
    const radio1 = page.getByTestId("radio-1");
    const radio2 = page.getByTestId("radio-2");

    // 初期状態
    await expect(radio1).not.toBeChecked();
    await expect(radio2).not.toBeChecked();

    // ラジオボタン1を選択
    await radio1.check();
    await expect(radio1).toBeChecked();
    await expect(radio2).not.toBeChecked();

    // ラジオボタン2を選択すると1は解除される
    await radio2.check();
    await expect(radio1).not.toBeChecked();
    await expect(radio2).toBeChecked();
  });
});
