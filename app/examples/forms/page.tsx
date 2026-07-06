"use client";

import { useState } from "react";
import Link from "next/link";

export default function FormsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "名前は必須です";
    }

    if (!formData.email.trim()) {
      newErrors.email = "メールアドレスは必須です";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "有効なメールアドレスを入力してください";
    }

    if (!formData.message.trim()) {
      newErrors.message = "メッセージは必須です";
    } else if (formData.message.length < 10) {
      newErrors.message = "メッセージは10文字以上で入力してください";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setSubmitted(true);
      // 実際のアプリケーションではここでAPIリクエストを送信
      console.log("Form submitted:", formData);
    }
  };

  const handleReset = () => {
    setFormData({ name: "", email: "", message: "" });
    setSubmitted(false);
    setErrors({});
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8">
        <div className="max-w-2xl w-full space-y-6 text-center">
          <div className="text-6xl mb-4">✅</div>
          <h1
            className="text-3xl font-bold text-green-600"
            data-testid="success-message"
          >
            送信完了！
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            お問い合わせありがとうございます。
          </p>
          <div className="space-y-2">
            <button
              onClick={handleReset}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              data-testid="reset-button"
            >
              もう一度送信
            </button>
            <Link href="/" className="block text-blue-600 hover:underline">
              ホームに戻る
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/"
          className="text-blue-600 hover:underline mb-8 inline-block"
        >
          ← ホームに戻る
        </Link>

        <h1 className="text-4xl font-bold mb-2">フォームテスト</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          入力フィールド、バリデーション、送信のテスト例
        </p>

        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              名前 *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              data-testid="name-input"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800"
              placeholder="山田太郎"
            />
            {errors.name && (
              <p className="text-red-600 text-sm mt-1" data-testid="name-error">
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              メールアドレス *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              data-testid="email-input"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800"
              placeholder="example@example.com"
            />
            {errors.email && (
              <p
                className="text-red-600 text-sm mt-1"
                data-testid="email-error"
              >
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-2">
              メッセージ *
            </label>
            <textarea
              id="message"
              name="message"
              data-testid="message-input"
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              rows={5}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800"
              placeholder="お問い合わせ内容を入力してください"
            />
            {errors.message && (
              <p
                className="text-red-600 text-sm mt-1"
                data-testid="message-error"
              >
                {errors.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            data-testid="submit-button"
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            送信する
          </button>
        </form>
      </div>
    </div>
  );
}
