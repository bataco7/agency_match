"use client";

import { useAnswersStore } from "@/app/store/answers";
import Link from "next/link";
import { useEffect } from "react";

export default function Part4() {
  const { answers, setAnswer, loadFromStorage } = useAnswersStore();

  useEffect(() => {
    loadFromStorage();
  }, []);

  const part4Questions = [
    "Q16","Q17","Q18","Q19","Q20","Q21","Q22","Q23","Q24","Q25","Q26"
  ];

  const answeredCount = part4Questions.filter(
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
    <main className="min-h-screen bg-green-50 px-6 py-10">
      {/* 進捗バー */}
      <div className="max-w-xl mx-auto mb-6">
        <div className="text-sm text-gray-700 mb-1">
          全体進捗：{totalAnswered} / {totalQuestions}
        </div>

        <div className="w-full bg-gray-300 h-3 rounded-full">
          <div
            className="bg-green-500 h-3 rounded-full transition-all"
            style={{ width: `${(totalAnswered / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* Output ボタン */}
      <div className="max-w-xl mx-auto mb-6 text-right">
        <button
          onClick={handleOutput}
          className="px-4 py-2 bg-green-600 text-white rounded shadow hover:bg-green-700 transition"
        >
          Output（開発用）
        </button>
      </div>

      <h1 className="text-2xl font-bold text-center mb-6">
        アイドルとしてどうありたいか教えてください
      </h1>

      <div className="space-y-10 max-w-xl mx-auto">
        <QuestionBlock
          qid="Q16"
          title="Q16. 合格からデビューするまでたくさんレッスンをしていきたい"
          leftLabel="そう思わない"
          rightLabel="とてもそう思う"
          selected={answers.Q16}
          onSelect={(v) => handleSelect("Q16", v)}
          theme="green"
        />

        <QuestionBlock
          qid="Q17"
          title="Q17. ファンにどんな自分を見せたい？"
          leftLabel="成長していく自分"
          rightLabel="常に完璧な自分"
          selected={answers.Q17}
          onSelect={(v) => handleSelect("Q17", v)}
          theme="green"
        />

        <QuestionBlock
          qid="Q18"
          title="Q18. たくさん努力した人や実力がある人ほどチャンスがくるべきだ"
          leftLabel="まったくそう思わない"
          rightLabel="とてもそう思う"
          selected={answers.Q18}
          onSelect={(v) => handleSelect("Q18", v)}
          theme="green"
        />

        <QuestionBlock
          qid="Q19"
          title="Q19. 自分のアイデアや行動でチャンスをつかみたい"
          leftLabel="まったくそう思わない"
          rightLabel="とてもそう思う"
          selected={answers.Q19}
          onSelect={(v) => handleSelect("Q19", v)}
          theme="green"
        />

        {/* Q20 は逆スケールだが UI はそのまま */}
        <QuestionBlock
          qid="Q20"
          title="Q20. 細かく指示されるより自由にやりたい"
          leftLabel="まったくそう思わない"
          rightLabel="とてもそう思う"
          selected={answers.Q20}
          onSelect={(v) => handleSelect("Q20", v)}
          theme="green"
        />

        <QuestionBlock
          qid="Q21"
          title="Q21. 過去の名曲を歌い繋いで行くことに魅力を感じる"
          leftLabel="まったくそう思わない"
          rightLabel="とてもそう思う"
          selected={answers.Q21}
          onSelect={(v) => handleSelect("Q21", v)}
          theme="green"
        />

        <QuestionBlock
          qid="Q22"
          title="Q22. デビューしてからなるべく長くそのグループで活動したい"
          leftLabel="まったくそう思わない"
          rightLabel="とてもそう思う"
          selected={answers.Q22}
          onSelect={(v) => handleSelect("Q22", v)}
          theme="green"
        />

        <QuestionBlock
          qid="Q23"
          title="Q23. 露出の激しい衣装や水着も受け入れられる"
          leftLabel="無理"
          rightLabel="全然大丈夫"
          selected={answers.Q23}
          onSelect={(v) => handleSelect("Q23", v)}
          theme="green"
        />

        <QuestionBlock
          qid="Q24"
          title="Q24. アイドルである間は恋愛は我慢すべきだ"
          leftLabel="まったくそう思わない"
          rightLabel="とてもそう思う"
          selected={answers.Q24}
          onSelect={(v) => handleSelect("Q24", v)}
          theme="green"
        />

        <QuestionBlock
          qid="Q25"
          title="Q25. 厳しいことも言うけど卒業してもずっと応援してくれるファンこそ大切にしたい"
          leftLabel="まったくそう思わない"
          rightLabel="とてもそう思う"
          selected={answers.Q25}
          onSelect={(v) => handleSelect("Q25", v)}
          theme="green"
        />

        <QuestionBlock
          qid="Q26"
          title="Q26. 同世代の人たちの間で人気者になりたい"
          leftLabel="まったくそう思わない"
          rightLabel="とてもそう思う"
          selected={answers.Q26}
          onSelect={(v) => handleSelect("Q26", v)}
          theme="green"
        />
      </div>

      {/* 下部ボタン */}
      <div className="max-w-xl mx-auto mt-12 flex justify-between">
        <Link
          href="/questions/part3"
          className="px-6 py-3 bg-gray-300 rounded-full shadow hover:bg-gray-400 transition"
        >
          戻る
        </Link>

        {answeredCount === part4Questions.length ? (
          <Link
            href="/questions/part5"
            className="px-6 py-3 bg-green-500 text-white rounded-full shadow hover:bg-green-600 transition"
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
  theme: "green";
}) {
  const options = [1, 2, 3, 4, 5];

  const themeColor =
    theme === "green"
      ? "bg-green-500 text-white border-green-600"
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
