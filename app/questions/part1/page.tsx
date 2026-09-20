"use client";

import { useState } from "react";
import Link from "next/link";

export default function Part1() {
  // 各質問の回答を保持（後で Zustand に置き換え可能）
  const [answers, setAnswers] = useState({
    Q1: null,
    Q2: null,
    Q3: null,
    Q4: null,
    Q5: null,
    Q6: null,
    Q7: null,
  });

  const handleAnswer = (questionId: string, value: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const allAnswered = Object.values(answers).every((v) => v !== null);

  return (
    <main className="min-h-screen bg-pink-50 px-6 py-10">
      <h1 className="text-2xl font-bold text-center mb-6">
        あなたがどんな人か教えてください
      </h1>

      <div className="space-y-10 max-w-xl mx-auto">

        {/* Q1 */}
        <QuestionBlock
          title="歌には自信があるほうだ"
          options={[
            "まったく自信がない",
            "あまり自信がない",
            "どちらとも言えない",
            "ある程度自信がある",
            "とても自信がある",
          ]}
          onSelect={(v) => handleAnswer("Q1", v)}
          selected={answers.Q1}
        />

        {/* Q2 */}
        <QuestionBlock
          title="音楽に合わせて体を動かすのが好きだ"
          options={[
            "苦手…",
            "あまり好きじゃない",
            "どちらとも言えない",
            "けっこう好き",
            "大好き！",
          ]}
          onSelect={(v) => handleAnswer("Q2", v)}
          selected={answers.Q2}
        />

        {/* Q3 */}
        <QuestionBlock
          title="鏡に映った自分は…？"
          options={[
            "あまり見たくない",
            "できれば見たくない",
            "どちらとも言えない",
            "けっこう好き",
            "ずっと見ていられる",
          ]}
          onSelect={(v) => handleAnswer("Q3", v)}
          selected={answers.Q3}
        />

        {/* Q4 */}
        <QuestionBlock
          title="ヘアメイクの研究に興味がある"
          options={[
            "まったく興味なし",
            "あまり興味ない",
            "どちらとも言えない",
            "興味ある",
            "とても興味がある",
          ]}
          onSelect={(v) => handleAnswer("Q4", v)}
          selected={answers.Q4}
        />

        {/* Q5 */}
        <QuestionBlock
          title="しゃべりで人を楽しませるのが好きだ"
          options={[
            "苦手",
            "あまり好きじゃない",
            "どちらとも言えない",
            "けっこう好き",
            "おしゃべり大好き",
          ]}
          onSelect={(v) => handleAnswer("Q5", v)}
          selected={answers.Q5}
        />

        {/* Q6 */}
        <QuestionBlock
          title="大勢の前に立つのがワクワクする"
          options={[
            "目立ちたくない…",
            "できれば立ちたくない",
            "普通",
            "けっこうワクワクする",
            "目立つの大好き！",
          ]}
          onSelect={(v) => handleAnswer("Q6", v)}
          selected={answers.Q6}
        />

        {/* Q7 */}
        <QuestionBlock
          title="クラスやクラブ活動でルールや礼儀を大切にできる"
          options={[
            "まったくできない",
            "あまりできない",
            "どちらとも言えない",
            "できるほうだ",
            "完璧にできる",
          ]}
          onSelect={(v) => handleAnswer("Q7", v)}
          selected={answers.Q7}
        />

      </div>

      {/* 次へボタン */}
      <div className="text-center mt-12">
        {allAnswered ? (
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
  options,
  selected,
  onSelect,
}: {
  title: string;
  options: string[];
  selected: number | null;
  onSelect: (value: number) => void;
}) {
  return (
    <div>
      <h2 className="font-semibold mb-3">{title}</h2>
      <div className="flex flex-col space-y-2">
        {options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => onSelect(idx + 1)}
            className={`px-4 py-2 rounded border ${
              selected === idx + 1
                ? "bg-pink-400 text-white"
                : "bg-white text-gray-700"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
