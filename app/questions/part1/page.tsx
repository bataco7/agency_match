"use client";

import { useAnswersStore } from "@/app/store/answers";
import Link from "next/link";
import { useEffect } from "react";

export default function Part1() {
  const { answers, setAnswer, loadFromStorage } = useAnswersStore();

  useEffect(() => {
    loadFromStorage();
  }, []);

  const part1Questions = ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7"];
  const answeredCount = part1Questions.filter(
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
    <main className="min-h-screen bg-pink-50 px-6 py-10">
      {/* 進捗バー */}
      <div className="max-w-xl mx-auto mb-6">
        <div className="text-sm text-gray-700 mb-1">
          全体進捗：{totalAnswered} / {totalQuestions}
        </div>

        <div className="w-full bg-gray-300 h-3 rounded-full">
          <div
            className="bg-pink-500 h-3 rounded-full transition-all"
            style={{ width: `${(totalAnswered / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* Output ボタン */}
      <div className="max-w-xl mx-auto mb-6 text-right">
        <button
          onClick={handleOutput}
          className="px-4 py-2 bg-pink-600 text-white rounded shadow hover:bg-pink-700 transition"
        >
          Output（開発用）
        </button>
      </div>

      <h1 className="text-2xl font-bold text-center mb-6">
        あなたがどんな人か教えてください
      </h1>

      <div className="space-y-10 max-w-xl mx-auto">
        <QuestionBlock
          title="Q1. 歌には自信があるほうだ"
          leftLabel="まったく自信がない"
          rightLabel="とても自信がある"
          selected={answers.Q1}
          onSelect={(v) => handleSelect("Q1", v)}
        />

        <QuestionBlock
          title="Q2. 音楽に合わせて体を動かすのが好きだ"
          leftLabel="苦手…"
          rightLabel="大好き！"
          selected={answers.Q2}
          onSelect={(v) => handleSelect("Q2", v)}
        />

        <QuestionBlock
          title="Q3. 自撮り良くする？"
          leftLabel="全然しない"
          rightLabel="毎日してる"
          selected={answers.Q3}
          onSelect={(v) => handleSelect("Q3", v)}
        />

        <QuestionBlock
          title="Q4. ヘアメイクの研究に興味がある"
          leftLabel="まったく興味なし"
          rightLabel="とても興味がある"
          selected={answers.Q4}
          onSelect={(v) => handleSelect("Q4", v)}
        />

        <QuestionBlock
          title="Q5. しゃべりで人を楽しませるのが好きだ"
          leftLabel="苦手"
          rightLabel="おしゃべり大好き！"
          selected={answers.Q5}
          onSelect={(v) => handleSelect("Q5", v)}
        />

        <QuestionBlock
          title="Q6. 大勢の前に立つのがワクワクする"
          leftLabel="目立ちたくない…"
          rightLabel="目立つの大好き！"
          selected={answers.Q6}
          onSelect={(v) => handleSelect("Q6", v)}
        />

        <QuestionBlock
          title="Q7. クラスやクラブ活動でルールや礼儀を大切にできる"
          leftLabel="まったくできない"
          rightLabel="完璧にできる"
          selected={answers.Q7}
          onSelect={(v) => handleSelect("Q7", v)}
        />
      </div>

      {/* 次へ */}
      <div className="text-center mt-12">
        {answeredCount === part1Questions.length ? (
          <Link
            href="/questions/part2"
            className="px-8 py-3 bg-pink-500 text-white font-semibold rounded-full shadow hover:bg-pink-600 transition"
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
  leftLabel,
  rightLabel,
  selected,
  onSelect,
}: {
  title: string;
  leftLabel: string;
  rightLabel: string;
  selected: number | null;
  onSelect: (value: number) => void;
}) {
  const options = [1, 2, 3, 4, 5];

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
                  ? "bg-pink-500 text-white"
                  : "bg-white text-gray-700"
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
