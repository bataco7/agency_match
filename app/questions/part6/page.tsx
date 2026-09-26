"use client";

import { useAnswersStore } from "@/app/store/answers";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Part6() {
  const router = useRouter();
  const { answers, setAnswer, loadFromStorage, setDiagnosisResult, setDiagnosisDebug } = useAnswersStore();
  const store = useAnswersStore();

  async function handleDiagnose() {
    // 診断APIに回答を送信
    const res = await fetch("/api/diagnose", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answers }),
    });

    const data = await res.json();

    // debug データを Zustand に保存
    setDiagnosisDebug(data.debug);

    // 結果ページで使うデータ（top3）
    setDiagnosisResult(data.top3);

    // top3 は URL パラメータに載せて result ページへ遷移
    const top1 = data.top3[0];
    const top2 = data.top3[1];
    const top3 = data.top3[2];

    // 結果ページへ遷移
    router.push("/result");
  }

  useEffect(() => {
    loadFromStorage();
  }, []);

  const part6Questions = ["Q31", "Q32", "Q33", "Q34", "Q35"];
  const answeredCount = part6Questions.filter(
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
    <main className="min-h-screen bg-pink-100 px-6 py-10">
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
        あなたの覚悟を教えてください
      </h1>

      <div className="space-y-10 max-w-xl mx-auto">
        <QuestionBlock
          qid="Q31"
          title="Q31. たとえ人気がいまいちでも、もっと上を目指してがんばれる？"
          leftLabel="自信はない"
          rightLabel="絶対にがんばれる"
          selected={answers.Q31}
          onSelect={(v) => handleSelect("Q31", v)}
          theme="pink"
        />

        <QuestionBlock
          qid="Q32"
          title="Q32. 歌詞、振り付け、ポジション、たくさん覚えることがあってもついていける？"
          leftLabel="自信はない"
          rightLabel="絶対にがんばれる"
          selected={answers.Q32}
          onSelect={(v) => handleSelect("Q32", v)}
          theme="pink"
        />

        <QuestionBlock
          qid="Q33"
          title="Q33. 忙しい日々が続いても、体調管理できる？"
          leftLabel="自信はない"
          rightLabel="とても自信がある"
          selected={answers.Q33}
          onSelect={(v) => handleSelect("Q33", v)}
          theme="pink"
        />

        <QuestionBlock
          qid="Q34"
          title="Q34. どんな日でもSNSを毎日更新できる？"
          leftLabel="自信はない"
          rightLabel="とても自信がある"
          selected={answers.Q34}
          onSelect={(v) => handleSelect("Q34", v)}
          theme="pink"
        />

        <QuestionBlock
          qid="Q35"
          title="Q35. ファンと会話したり握手したりできる？"
          leftLabel="まったくできない"
          rightLabel="余裕でできる"
          selected={answers.Q35}
          onSelect={(v) => handleSelect("Q35", v)}
          theme="pink"
        />
      </div>

      {/* 下部ボタン */}
      <div className="max-w-xl mx-auto mt-12 flex justify-between">
        <Link
          href="/questions/part5"
          className="px-6 py-3 bg-gray-300 rounded-full shadow hover:bg-gray-400 transition"
        >
          戻る
        </Link>

        {answeredCount === part6Questions.length ? (
        <button
          onClick={handleDiagnose}
          className="px-6 py-3 bg-pink-500 text-white rounded-full shadow hover:bg-pink-600 transition"
        >
          診断結果へ
        </button>
        ) : (
          <p className="text-gray-500 py-3">すべての質問に回答してください</p>
        )}
      </div>
    </main>
  );
}

function QuestionBlock({
  qid,
  title,
  leftLabel,
  rightLabel,
  selected,
  onSelect,
  theme,
}: {
  qid: string;
  title: string;
  leftLabel: string;
  rightLabel: string;
  selected: number | null;
  onSelect: (value: number) => void;
  theme: "pink";
}) {
  const options = [1, 2, 3, 4, 5];

  const themeColor =
    theme === "pink"
      ? "bg-pink-500 text-white border-pink-600"
      : "bg-gray-500 text-white";

  return (
    <div>
      <h2 className="font-semibold mb-3">{title}</h2>

      <div className="flex items-center justify-between">
        <span className="text-gray-600 text-sm w-24">{leftLabel}</span>

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

        <span className="text-gray-600 text-sm w-24 text-right">
          {rightLabel}
        </span>
      </div>
    </div>
  );
}
