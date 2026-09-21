"use client";

import { useAnswersStore } from "@/store/answers";

export default function DevAnswersClient() {
  const { answers } = useAnswersStore();

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-xl font-bold mb-4">回答状況（開発用）</h1>

      <pre className="bg-white p-4 rounded shadow text-sm">
        {JSON.stringify(answers, null, 2)}
      </pre>
    </main>
  );
}
