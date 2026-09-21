"use client";

import { useEffect, useState } from "react";

export default function DevPage() {
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    fetch("/api/dev/answers")
      .then((res) => res.json())
      .then((data) => setAnswers(data));
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-xl font-bold mb-4">開発用：回答状況</h1>

      <pre className="bg-white p-4 rounded shadow text-sm">
        {JSON.stringify(answers, null, 2)}
      </pre>
    </main>
  );
}
