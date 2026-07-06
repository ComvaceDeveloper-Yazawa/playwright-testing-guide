"use client";

import { useState } from "react";
import Link from "next/link";

interface User {
  id: number;
  name: string;
  email: string;
  username: string;
}

export default function APIPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users",
      );

      if (!response.ok) {
        throw new Error("データの取得に失敗しました");
      }

      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "エラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  const simulateError = () => {
    setLoading(true);
    setError(null);

    setTimeout(() => {
      setError("ネットワークエラー: サーバーに接続できません");
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/"
          className="text-blue-600 hover:underline mb-8 inline-block"
        >
          ← ホームに戻る
        </Link>

        <h1 className="text-4xl font-bold mb-2">API連携テスト</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          APIモック、レスポンス、エラーハンドリングのテスト例
        </p>

        <div className="space-y-6">
          <div className="flex gap-4">
            <button
              onClick={fetchUsers}
              disabled={loading}
              data-testid="fetch-users-button"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "読み込み中..." : "ユーザーを取得"}
            </button>

            <button
              onClick={simulateError}
              disabled={loading}
              data-testid="simulate-error-button"
              className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              エラーをシミュレート
            </button>
          </div>

          {loading && (
            <div
              data-testid="loading-spinner"
              className="flex items-center justify-center py-12"
            >
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          )}

          {error && (
            <div
              data-testid="error-message"
              className="p-4 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg text-red-800 dark:text-red-200"
            >
              <p className="font-semibold">エラー</p>
              <p>{error}</p>
            </div>
          )}

          {!loading && !error && users.length > 0 && (
            <div data-testid="users-list" className="space-y-4">
              <h2 className="text-2xl font-semibold">
                取得したユーザー ({users.length}件)
              </h2>
              <div className="grid gap-4">
                {users.map((user) => (
                  <div
                    key={user.id}
                    data-testid={`user-${user.id}`}
                    className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-blue-500 transition-colors"
                  >
                    <h3 className="font-semibold text-lg">{user.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      @{user.username}
                    </p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!loading && !error && users.length === 0 && (
            <div
              data-testid="empty-state"
              className="text-center py-12 text-gray-500"
            >
              <p>
                データがありません。上のボタンをクリックしてデータを取得してください。
              </p>
            </div>
          )}
        </div>

        <div className="mt-12 p-6 bg-gray-50 dark:bg-gray-900 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">💡 テストのポイント</h3>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li>• ローディング状態の表示確認</li>
            <li>• 成功時のデータ表示確認</li>
            <li>• エラー時のメッセージ表示確認</li>
            <li>• APIレスポンスのモック化</li>
            <li>• ネットワークエラーのシミュレーション</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
