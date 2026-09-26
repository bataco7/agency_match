"use client";

import { useAnswersStore } from "@/app/store/answers";

export default function ResultPage() {
  const { diagnosisResult, diagnosisDebug } = useAnswersStore();

  const handleDevOutput = async () => {
    await fetch("/api/dev/answers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(diagnosisDebug),
    });

    window.open("/dev", "_blank");
  };

  if (!diagnosisResult) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p>診断結果を読み込んでいます…</p>
      </main>
    );
  }

  const [first, second, third] = diagnosisResult;

  return (
    <main className="min-h-screen px-6 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">診断結果</h1>

      <div className="max-w-xl mx-auto space-y-8">
        <section className="p-6 bg-white shadow rounded">
          <h2 className="text-xl font-bold mb-2">1位：{first.name}</h2>
          <p>総合マッチ度：{first.totalMatch.toFixed(2)}%</p>
        </section>

        <section className="p-6 bg-white shadow rounded">
          <h2 className="text-xl font-bold mb-2">2位：{second.name}</h2>
          <p>総合マッチ度：{second.totalMatch.toFixed(2)}%</p>
        </section>

        <section className="p-6 bg-white shadow rounded">
          <h2 className="text-xl font-bold mb-2">3位：{third.name}</h2>
          <p>総合マッチ度：{third.totalMatch.toFixed(2)}%</p>
        </section>
      </div>

      <div className="text-center mt-10">
        <button
          onClick={handleDevOutput}
          className="px-4 py-2 bg-gray-700 text-white rounded shadow hover:bg-gray-800 transition"
        >
          開発用 Output
        </button>
      </div>
      
    </main>
  );
}
