import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <main className="max-w-4xl w-full space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Playwright Testing Guide
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Next.jsとPlaywrightを使ったE2Eテストの実践ガイド
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          <Link
            href="/examples/forms"
            className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-blue-500 transition-colors"
          >
            <h2 className="text-2xl font-semibold mb-2">フォームテスト 📝</h2>
            <p className="text-gray-600 dark:text-gray-400">
              入力フィールド、バリデーション、送信のテスト例
            </p>
          </Link>

          <Link
            href="/examples/navigation"
            className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-blue-500 transition-colors"
          >
            <h2 className="text-2xl font-semibold mb-2">
              ナビゲーションテスト 🧭
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              ページ遷移、リンク、ルーティングのテスト例
            </p>
          </Link>

          <Link
            href="/examples/api"
            className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-blue-500 transition-colors"
          >
            <h2 className="text-2xl font-semibold mb-2">API連携テスト 🔌</h2>
            <p className="text-gray-600 dark:text-gray-400">
              APIモック、レスポンス、エラーハンドリングのテスト例
            </p>
          </Link>

          <Link
            href="/examples/interaction"
            className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-blue-500 transition-colors"
          >
            <h2 className="text-2xl font-semibold mb-2">
              インタラクションテスト 🖱️
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              クリック、ホバー、ドラッグ&amp;ドロップのテスト例
            </p>
          </Link>
        </div>

        <div className="mt-12 p-6 bg-blue-50 dark:bg-blue-950 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">🚀 クイックスタート</h3>
          <div className="space-y-2 text-sm font-mono">
            <p>
              <span className="text-gray-500"># 開発サーバー起動</span>
            </p>
            <p className="text-blue-600 dark:text-blue-400">npm run dev</p>
            <p className="mt-4">
              <span className="text-gray-500"># テスト実行</span>
            </p>
            <p className="text-blue-600 dark:text-blue-400">npm test</p>
            <p className="mt-4">
              <span className="text-gray-500"># UIモードでテスト</span>
            </p>
            <p className="text-blue-600 dark:text-blue-400">npm run test:ui</p>
          </div>
        </div>
      </main>
    </div>
  );
}
