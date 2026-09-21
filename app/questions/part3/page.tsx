"use client";

import { useAnswersStore } from "@/app/store/answers";
import Link from "next/link";
import { useEffect } from "react";

export default function Part3() {
  const { answers, setAnswer, loadFromStorage } = useAnswersStore();

  useEffect(() => {
    loadFromStorage();
  }, []);

  const part3Questions = ["Q13", "Q14", "Q15"];
  const answeredCount = part3Questions.filter(
    (q) => answers[q] !== null && answers[q] !== undefined
  ).length;

  const totalQuestions = 35;
  const totalAnswered = Object.values(answers).filter(
    (v) => v !== null && v !== undefined
  ).length;

  const handleSelect = (qid: string, value: number) => {
    setAnswer(qid, value);
  };

  const handleOutput = async () => {
    await fetch("/api/dev/answers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(answers),
    });

    window.open("/dev", "_blank");
  };

  return (
    <main className="min-h-screen bg-purple-50 px-6 py-10">
      {/* 進捗バー */}
      <div className="max-w-xl mx-auto mb-6">
        <div className="text-sm text-gray-700 mb-1">
          全体進捗：{totalAnswered} / {totalQuestions}
        </div>

        <div className="w-full bg-gray-300 h-3 rounded-full">
          <div
            className="bg-purple-500 h-3 rounded-full transition-all"
            style={{ width: `${(totalAnswered / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* Output ボタン */}
      <div className="max-w-xl mx-auto mb-6 text-right">
        <button
          onClick={handleOutput}
          className="px-4 py-2 bg-purple-600 text-white rounded shadow hover:bg-purple-700 transition"
        >
          Output（開発用）
        </button>
      </div>

      <h1 className="text-2xl font-bold text-center mb-6">
        あなたのなりたいアイドルのイメージについて教えてください
      </h1>

      <div className="space-y-10 max-w-xl mx-auto">
        {/* Q13 */}
        <QuestionBlock
          title="清楚？個性的？"
          leftLabel="清楚"
          rightLabel="個性的"
          selected={answers.Q13}
          onSelect={(v) => handleSelect("Q13", v)}
          theme="purple"
        />

        {/* Q14 */}
        <QuestionBlock
          title="全力？スタイリッシュ？"
          leftLabel="全力がむしゃら"
          rightLabel="スタイリッシュ"
          selected={answers.Q14}
          onSelect={(v) => handleSelect("Q14", v)}
          theme="purple"
        />

        {/* Q15 */}
        <QuestionBlock
          title="かわいい？かっこいい？"
          leftLabel="かわいい"
          rightLabel="かっこいい"
          selected={answers.Q15}
          onSelect={(v) => handleSelect("Q15", v)}
          theme="purple"
        />
      </div>

      {/* 下部ボタン（戻る＋次へ） */}
      <div className="max-w-xl mx-auto mt-12 flex justify-between">
        <Link
          href="/questions/part2"
          className="px-6 py-3 bg-gray-300 rounded-full shadow hover:bg-gray-400 transition"
        >
          戻る
        </Link>

        {answeredCount === part3Questions.length ? (
          <Link
            href="/questions/part4"
            className="px-6 py-3 bg-purple-500 text-white rounded-full shadow hover:bg-purple-600 transition"
          >
            次へ進む
          </Link>
        ) : (
          <p className="text-gray-500 py-3">すべての質問に回答してください</p>
        )}
      </div>
    </main>
  );
}

function QuestionBlock({
  title,
  leftLabel,
  rightLabel,
  selected,
  onSelect,
  theme,
}: {
  title: string;
  leftLabel: string;
  rightLabel: string;
  selected: number | null;
  onSelect: (value: number) => void;
  theme: "purple";
}) {
  const options = [1, 2, 3, 4, 5];

  const themeColor =
    theme === "purple"
      ? "bg-purple-500 text-white border-purple-600"
      : "bg-gray-500 text-white";

  return (
    <div>
      <h2 className="font-semibold mb-3">{title}</h2>

      <div className="flex items-center justify-between">
        <span className="text-gray-600 text-sm w-20">{leftLabel}</span>

        <div className="flex space-x-3">
          {options.map((value) => (
            <button
              key={value}
              onClick={() => onSelect(value)}
              className={`w-10 h-10 rounded-full border flex items-center justify-center ${
                selected === value
                  ? themeColor
                  : "bg-white text-gray-700 border-gray-300"
              }`}
            >
              {value}
            </button>
          ))}
        </div>

        <span className="text-gray-600 text-sm w-20 text-right">
          {rightLabel}
        </span>
      </div>
    </div>
  );
}
