"use client";

import Link from "next/link";
import { useAnswersStore } from "@/app/store/answers";

export default function Part2() {
  const { answers, setAnswer } = useAnswersStore();

  const handleSelect = (qid: string, value: number) => {
    setAnswer(qid, value);
  };

  const allAnswered =
    answers.Q8 &&
    answers.Q9 &&
    answers.Q10 &&
    answers.Q11 &&
    answers.Q12;

  return (
    <main className="min-h-screen bg-blue-50 px-6 py-10">
      <h1 className="text-2xl font-bold text-center mb-6">
        アイドルになったらどんな活動をがんばりたいか教えてください
      </h1>

      <div className="space-y-10 max-w-xl mx-auto">

        <Likert5
          title="歌番組やCM、バラエティにたくさん出たい"
          leftLabel="そう思う"
          rightLabel="そう思わない"
          selected={answers.Q8}
          onSelect={(v) => handleSelect("Q8", v)}
        />

        <Likert5
          title="とにかくたくさんライブをやりたい"
          leftLabel="そう思う"
          rightLabel="そう思わない"
          selected={answers.Q9}
          onSelect={(v) => handleSelect("Q9", v)}
        />

        <Likert5
          title="ファンとたくさん交流したい"
          leftLabel="そう思う"
          rightLabel="そう思わない"
          selected={answers.Q10}
          onSelect={(v) => handleSelect("Q10", v)}
        />

        <Likert5
          title="SNSやTikTokでバズりたい"
          leftLabel="そう思う"
          rightLabel="そう思わない"
          selected={answers.Q11}
          onSelect={(v) => handleSelect("Q11", v)}
        />

        <Likert5
          title="日本だけでなく海外にも進出していきたい"
          leftLabel="そう思う"
          rightLabel="そう思わない"
          selected={answers.Q12}
          onSelect={(v) => handleSelect("Q12", v)}
        />

      </div>

      {/* ボタン */}
      <div className="flex justify-between mt-12 max-w-xl mx-auto">

        {/* 戻る */}
        <Link
          href="/questions/part1"
          className="px-6 py-3 bg-gray-300 rounded-full shadow hover:bg-gray-400 transition"
        >
          戻る
        </Link>

        {/* 次へ */}
        {allAnswered ? (
          <Link
            href="/questions/part3"
            className="px-6 py-3 bg-blue-500 text-white rounded-full shadow hover:bg-blue-600 transition"
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

function Likert5({
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
  return (
    <div>
      <h2 className="font-semibold mb-3">{title}</h2>

      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-600">{leftLabel}</span>

        <div className="flex space-x-3">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              onClick={() => onSelect(value)}
              className={`
                w-8 h-8 rounded-full border 
                ${selected === value
                  ? "bg-blue-400 border-blue-500"
                  : "bg-white border-gray-300"
                }
              `}
            />
          ))}
        </div>

        <span className="text-sm text-gray-600">{rightLabel}</span>
      </div>
    </div>
  );
}
