"use client";

import { useState } from "react";
import Link from "next/link";

const tabs = [
  { id: "overview", label: "概要", icon: "📋" },
  { id: "features", label: "機能", icon: "⚡" },
  { id: "pricing", label: "料金", icon: "💰" },
  { id: "contact", label: "お問い合わせ", icon: "📧" },
];

export default function NavigationPage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/"
          className="text-blue-600 hover:underline mb-8 inline-block"
        >
          ← ホームに戻る
        </Link>

        <h1 className="text-4xl font-bold mb-2">ナビゲーションテスト</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          ページ遷移、リンク、ルーティングのテスト例
        </p>

        {/* タブナビゲーション */}
        <div className="border-b border-gray-200 dark:border-gray-800 mb-8">
          <nav className="flex space-x-8" data-testid="tab-navigation">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                data-testid={`tab-${tab.id}`}
                className={`py-4 px-1 border-b-2 font-medium transition-colors ${
                  activeTab === tab.id
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* タブコンテンツ */}
        <div data-testid={`content-${activeTab}`}>
          {activeTab === "overview" && (
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">概要</h2>
              <p className="text-gray-600 dark:text-gray-400">
                このページはナビゲーションのテスト例を示しています。
                タブの切り替えやリンクのクリックをPlaywrightでテストできます。
              </p>
            </div>
          )}

          {activeTab === "features" && (
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">機能</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
                <li>シンプルで直感的なUI</li>
                <li>高速なページ遷移</li>
                <li>レスポンシブデザイン</li>
                <li>アクセシビリティ対応</li>
              </ul>
            </div>
          )}

          {activeTab === "pricing" && (
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">料金プラン</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-2">無料</h3>
                  <p className="text-3xl font-bold mb-4">¥0</p>
                  <p className="text-gray-600 dark:text-gray-400">
                    基本機能のみ
                  </p>
                </div>
                <div className="border-2 border-blue-600 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-2">プロ</h3>
                  <p className="text-3xl font-bold mb-4">¥1,000</p>
                  <p className="text-gray-600 dark:text-gray-400">
                    すべての機能
                  </p>
                </div>
                <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-2">
                    エンタープライズ
                  </h3>
                  <p className="text-3xl font-bold mb-4">お問い合わせ</p>
                  <p className="text-gray-600 dark:text-gray-400">
                    カスタマイズ可能
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "contact" && (
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">お問い合わせ</h2>
              <p className="text-gray-600 dark:text-gray-400">
                ご質問やご相談は、フォームページからお気軽にお問い合わせください。
              </p>
              <Link
                href="/examples/forms"
                className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                data-testid="contact-form-link"
              >
                お問い合わせフォームへ
              </Link>
            </div>
          )}
        </div>

        {/* ブレッドクラム */}
        <nav
          className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800"
          data-testid="breadcrumb"
        >
          <ol className="flex space-x-2 text-sm">
            <li>
              <Link href="/" className="text-blue-600 hover:underline">
                ホーム
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li>
              <Link
                href="/examples/navigation"
                className="text-blue-600 hover:underline"
              >
                ナビゲーション
              </Link>
            </li>
          </ol>
        </nav>
      </div>
    </div>
  );
}
