"use client";

import { useAnswersStore } from "@/app/store/answers";
import Link from "next/link";
import { useEffect } from "react";

export default function Part2() {
  const { answers, setAnswer, loadFromStorage } = useAnswersStore();

  useEffect(() => {
    loadFromStorage();
  }, []);

  const part2Questions = ["Q8", "Q9", "Q10", "Q11", "Q12"];
  const answeredCount = part2Questions.filter(
    (q) => answers[q] !== null && answers[q] !== undefined
  ).length;

  // 全体進捗（分母 35）
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
    <main className="min-h-screen bg-blue-50 px-6 py-10">
      {/* 進捗バー（分母 35） */}
      <div className="max-w-xl mx-auto mb-6">
        <div className="text-sm text-gray-700 mb-1">
          全体進捗：{totalAnswered} / {totalQuestions}
        </div>

        <div className="w-full bg-gray-300 h-3 rounded-full">
          <div
            className="bg-blue-500 h-3 rounded-full transition-all"
            style={{ width: `${(totalAnswered / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* Output ボタン */}
      <div className="max-w-xl mx-auto mb-6 text-right">
        <button
          onClick={handleOutput}
          className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition"
        >
          Output（開発用）
        </button>
      </div>

      <h1 className="text-2xl font-bold text-center mb-6">
        アイドルになったらどんな活動をがんばりたいか教えてください
      </h1>

      <div className="space-y-10 max-w-xl mx-auto">
        <QuestionBlock
          title="歌番組やCM、バラエティにたくさん出たい"
          selected={answers.Q8}
          onSelect={(v) => handleSelect("Q8", v)}
        />

        <QuestionBlock
          title="とにかくたくさんライブをやりたい"
          selected={answers.Q9}
          onSelect={(v) => handleSelect("Q9", v)}
        />

        <QuestionBlock
          title="ファンとたくさん交流したい"
          selected={answers.Q10}
          onSelect={(v) => handleSelect("Q10", v)}
        />

        <QuestionBlock
          title="SNSやTikTokでバズりたい"
          selected={answers.Q11}
          onSelect={(v) => handleSelect("Q11", v)}
        />

        <QuestionBlock
          title="日本だけでなく海外にも進出していきたい"
          selected={answers.Q12}
          onSelect={(v) => handleSelect("Q12", v)}
        />
      </div>

      {/* 次へ */}
      <div className="text-center mt-12">
        {answeredCount === part2Questions.length ? (
          <Link
            href="/questions/part3"
            className="px-8 py-3 bg-blue-500 text-white font-semibold rounded-full shadow hover:bg-blue-600 transition"
          >
            次へ進む
          </Link>
        ) : (
          <p className="text-gray-500">すべての質問に回答してください</p>
        )}
      </div>
    </main>
  );
}

function QuestionBlock({
  title,
  selected,
  onSelect,
}: {
  title: string;
  selected: number | null;
  onSelect: (value: number) => void;
}) {
  const options = [1, 2, 3, 4, 5];

  return (
    <div>
      <h2 className="font-semibold mb-3">{title}</h2>
      <div className="flex space-x-3">
        {options.map((value) => (
          <button
            key={value}
            onClick={() => onSelect(value)}
            className={`w-10 h-10 rounded-full border flex items-center justify-center ${
              selected === value
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-700"
            }`}
          >
            {value}
          </button>
        ))}
      </div>
    </div>
  );
}
