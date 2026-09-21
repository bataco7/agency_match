"use client";

import Link from "next/link";
import { useAnswersStore } from "@/app/store/answers";

export default function Part1() {
  const { answers, setAnswer } = useAnswersStore();

  const handleSelect = (qid: string, value: number) => {
    setAnswer(qid, value);
  };

  // Part1 の質問一覧
  const part1Questions = ["Q1","Q2","Q3","Q4","Q5","Q6","Q7"];

  // 回答済み数
  const answeredCount = part1Questions.filter(q => answers[q] !== null && answers[q] !== undefined).length;

  // 全回答済み判定
  const allAnswered = answeredCount === part1Questions.length;

  return (
    <main className="min-h-screen bg-pink-50 px-6 py-10">

      {/* 進捗バー */}
      <div className="max-w-xl mx-auto mb-6">
        <div className="text-sm text-gray-700 mb-1">
          回答状況：{answeredCount} / {part1Questions.length}
        </div>

        <div className="w-full bg-gray-300 h-3 rounded-full">
          <div
            className="bg-pink-500 h-3 rounded-full transition-all"
            style={{ width: `${(answeredCount / part1Questions.length) * 100}%` }}
          />
        </div>
      </div>

      <h1 className="text-2xl font-bold text-center mb-6">
        あなたがどんな人か教えてください
      </h1>

      <div className="space-y-10 max-w-xl mx-auto">

        <QuestionBlock
          title="歌には自信があるほうだ"
          options={[
            "まったく自信がない",
            "あまり自信がない",
            "どちらとも言えない",
            "ある程度自信がある",
            "とても自信がある",
          ]}
          selected={answers.Q1}
          onSelect={(v) => handleSelect("Q1", v)}
        />

        <QuestionBlock
          title="音楽に合わせて体を動かすのが好きだ"
          options={[
            "苦手…",
            "あまり好きじゃない",
            "どちらとも言えない",
            "けっこう好き",
            "大好き！",
          ]}
          selected={answers.Q2}
          onSelect={(v) => handleSelect("Q2", v)}
        />

        <QuestionBlock
          title="鏡に映った自分は…？"
          options={[
            "あまり見たくない",
            "できれば見たくない",
            "どちらとも言えない",
            "けっこう好き",
            "ずっと見ていられる",
          ]}
          selected={answers.Q3}
          onSelect={(v) => handleSelect("Q3", v)}
        />

        <QuestionBlock
          title="ヘアメイクの研究に興味がある"
          options={[
            "まったく興味なし",
            "あまり興味ない",
            "どちらとも言えない",
            "興味ある",
            "とても興味がある",
          ]}
          selected={answers.Q4}
          onSelect={(v) => handleSelect("Q4", v)}
        />

        <QuestionBlock
          title="しゃべりで人を楽しませるのが好きだ"
          options={[
            "苦手",
            "あまり好きじゃない",
            "どちらとも言えない",
            "けっこう好き",
            "おしゃべり大好き",
          ]}
          selected={answers.Q5}
          onSelect={(v) => handleSelect("Q5", v)}
        />

        <QuestionBlock
          title="大勢の前に立つのがワクワクする"
          options={[
            "目立ちたくない…",
            "できれば立ちたくない",
            "普通",
            "けっこうワクワクする",
            "目立つの大好き！",
          ]}
          selected={answers.Q6}
          onSelect={(v) => handleSelect("Q6", v)}
        />

        <QuestionBlock
          title="クラスやクラブ活動でルールや礼儀を大切にできる"
          options={[
            "まったくできない",
            "あまりできない",
            "どちらとも言えない",
            "できるほうだ",
            "完璧にできる",
          ]}
          selected={answers.Q7}
          onSelect={(v) => handleSelect("Q7", v)}
        />

      </div>

      {/* 次へ */}
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
      <button  onClick={async () => {
        await fetch("/api/dev/answers", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(answers),
        });

        window.open("/dev", "_blank");
      }}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Output（開発用）
      </button>

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
