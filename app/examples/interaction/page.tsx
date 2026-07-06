"use client";

import { useState } from "react";
import Link from "next/link";

export default function InteractionPage() {
  const [clickCount, setClickCount] = useState(0);
  const [hoverState, setHoverState] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/"
          className="text-blue-600 hover:underline mb-8 inline-block"
        >
          ← ホームに戻る
        </Link>

        <h1 className="text-4xl font-bold mb-2">インタラクションテスト</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          クリック、ホバー、入力操作のテスト例
        </p>

        <div className="space-y-8">
          {/* クリックテスト */}
          <section className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">クリックカウンター</h2>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setClickCount(clickCount + 1)}
                data-testid="increment-button"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                クリック
              </button>
              <span data-testid="click-count" className="text-2xl font-bold">
                {clickCount}
              </span>
              <button
                onClick={() => setClickCount(0)}
                data-testid="reset-button"
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 underline"
              >
                リセット
              </button>
            </div>
          </section>

          {/* ホバーテスト */}
          <section className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">ホバーエフェクト</h2>
            <div
              onMouseEnter={() => setHoverState(true)}
              onMouseLeave={() => setHoverState(false)}
              data-testid="hover-target"
              className={`p-8 rounded-lg text-center font-semibold transition-all duration-300 ${
                hoverState
                  ? "bg-purple-600 text-white scale-105"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
              }`}
            >
              {hoverState ? "✨ ホバー中！" : "マウスを乗せてみてください"}
            </div>
            <p data-testid="hover-state" className="text-sm text-gray-500 mt-2">
              状態: {hoverState ? "ホバー中" : "通常"}
            </p>
          </section>

          {/* 入力テスト */}
          <section className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">リアルタイム入力</h2>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              data-testid="text-input"
              placeholder="何か入力してください..."
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800"
            />
            <div
              data-testid="input-echo"
              className="mt-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg"
            >
              <p className="text-sm text-gray-500 mb-2">エコー:</p>
              <p className="font-mono">{inputValue || "(空)"}</p>
              <p className="text-sm text-gray-500 mt-2">
                文字数:{" "}
                <span data-testid="char-count">{inputValue.length}</span>
              </p>
            </div>
          </section>

          {/* セレクトボックステスト */}
          <section className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">ドロップダウン選択</h2>
            <select
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
              data-testid="select-dropdown"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800"
            >
              <option value="">選択してください</option>
              <option value="option1">オプション 1</option>
              <option value="option2">オプション 2</option>
              <option value="option3">オプション 3</option>
            </select>
            <p
              data-testid="selected-value"
              className="mt-4 text-gray-600 dark:text-gray-400"
            >
              選択された値: <strong>{selectedOption || "なし"}</strong>
            </p>
          </section>

          {/* チェックボックス・ラジオボタンテスト */}
          <section className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">
              チェックボックスとラジオボタン
            </h2>
            <div className="space-y-4">
              <div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    data-testid="checkbox-1"
                    className="w-4 h-4"
                  />
                  <span>オプション A</span>
                </label>
              </div>
              <div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    data-testid="checkbox-2"
                    className="w-4 h-4"
                  />
                  <span>オプション B</span>
                </label>
              </div>
              <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                <p className="text-sm font-medium mb-2">ラジオボタン:</p>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="radio-group"
                      value="choice1"
                      data-testid="radio-1"
                      className="w-4 h-4"
                    />
                    <span>選択肢 1</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="radio-group"
                      value="choice2"
                      data-testid="radio-2"
                      className="w-4 h-4"
                    />
                    <span>選択肢 2</span>
                  </label>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
