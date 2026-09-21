"use client";

import { useAnswersStore } from "@/app/store/answers";
import Link from "next/link";
import { useEffect } from "react";

export default function Part5() {
  const { answers, setAnswer, loadFromStorage } = useAnswersStore();

  useEffect(() => {
    loadFromStorage();
  }, []);

  const part5Questions = ["Q27", "Q28", "Q29", "Q30"];
  const answeredCount = part5Questions.filter(
    (q) => answers[q] !== null && answers[q] !== undefined
  ).length;

  const totalQuestions = 35;
  const totalAnswered = Object.values(answers).filter(
    (v) => v !== null && v !== undefined
  ).length;

  const handleSelect = (qid: string, value: number) => {
    setAnswer(qid, value);
  };

  const handleCheckbox = (value: string) => {
    const current = answers.Q30 || [];
    let updated;

    if (current.includes(value)) {
      updated = current.filter((v: string) => v !== value);
    } else {
      updated = [...current, value];
    }

    setAnswer("Q30", updated);
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
    <main className="min-h-screen bg-orange-50 px-6 py-10">
      {/* 進捗バー */}
      <div className="max-w-xl mx-auto mb-6">
        <div className="text-sm text-gray-700 mb-1">
          全体進捗：{totalAnswered} / {totalQuestions}
        </div>

        <div className="w-full bg-gray-300 h-3 rounded-full">
          <div
            className="bg-orange-500 h-3 rounded-full transition-all"
            style={{ width: `${(totalAnswered / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* Output ボタン */}
      <div className="max-w-xl mx-auto mb-6 text-right">
        <button
          onClick={handleOutput}
          className="px-4 py-2 bg-orange-600 text-white rounded shadow hover:bg-orange-700 transition"
        >
          Output（開発用）
        </button>
      </div>

      <h1 className="text-2xl font-bold text-center mb-6">
        あなたの希望を教えてください
      </h1>

      <div className="space-y-10 max-w-xl mx-auto">
        {/* Q27 */}
        <div>
          <h2 className="font-semibold mb-3">
            Q27. 予算が増えたら何に使ってほしい？
          </h2>

          <div className="grid grid-cols-2 gap-4">
            {["楽曲制作", "衣装", "ライブ演出", "MV"].map((label, index) => (
              <button
                key={index}
                onClick={() => handleSelect("Q27", index + 1)}
                className={`px-4 py-3 rounded-lg border text-center ${
                  answers.Q27 === index + 1
                    ? "bg-orange-500 text-white border-orange-600"
                    : "bg-white text-gray-700 border-gray-300"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Q28 */}
        <div>
          <h2 className="font-semibold mb-3">
            Q28. ファンと直接話すイベントはどのくらいの頻度でやりたい？
          </h2>

          <div className="grid grid-cols-1 gap-3">
            {[
              "やりたくない",
              "年に1〜2回",
              "2〜4ヶ月に1回",
              "毎月",
              "毎週",
            ].map((label, index) => (
              <button
                key={index}
                onClick={() => handleSelect("Q28", index + 1)}
                className={`px-4 py-3 rounded-lg border text-center ${
                  answers.Q28 === index + 1
                    ? "bg-orange-500 text-white border-orange-600"
                    : "bg-white text-gray-700 border-gray-300"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Q29 */}
        <div>
          <h2 className="font-semibold mb-3">
            Q29. 何人くらいのグループで活動したい？
          </h2>

          <div className="grid grid-cols-1 gap-3">
            {["ソロ", "2〜4人", "5〜7人", "8〜15人", "16人以上"].map(
              (label, index) => (
                <button
                  key={index}
                  onClick={() => handleSelect("Q29", index + 1)}
                  className={`px-4 py-3 rounded-lg border text-center ${
                    answers.Q29 === index + 1
                      ? "bg-orange-500 text-white border-orange-600"
                      : "bg-white text-gray-700 border-gray-300"
                  }`}
                >
                  {label}
                </button>
              )
            )}
          </div>
        </div>

        {/* Q30 チェックボックス */}
        <div>
          <h2 className="font-semibold mb-3">
            Q30. アイドルを卒業した後、どんな道に進みたい？
          </h2>

          <div className="grid grid-cols-2 gap-3">
            {[
              "歌手",
              "俳優",
              "モデル",
              "タレント",
              "声優",
              "インフルエンサー",
              "起業する",
              "一生アイドル",
              "普通の女の子にもどる",
            ].map((label) => (
              <label
                key={label}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={(answers.Q30 || []).includes(label)}
                  onChange={() => handleCheckbox(label)}
                  className="w-5 h-5"
                />
                <span>{label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* 下部ボタン */}
      <div className="max-w-xl mx-auto mt-12 flex justify-between">
        <Link
          href="/questions/part4"
          className="px-6 py-3 bg-gray-300 rounded-full shadow hover:bg-gray-400 transition"
        >
          戻る
        </Link>

        {answeredCount === part5Questions.length ? (
          <Link
            href="/questions/part6"
            className="px-6 py-3 bg-orange-500 text-white rounded-full shadow hover:bg-orange-600 transition"
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
